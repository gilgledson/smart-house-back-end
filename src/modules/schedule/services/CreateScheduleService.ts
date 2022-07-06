import * as Schedule from 'node-schedule';
import * as moment from 'moment';
import { getCustomRepository } from 'typeorm';
import ScheduleRepository from '../typeorm/repositories/ScheduleRepository';
import EquipmentRepository from '../../equipment/typeorm/repositories/EquipmentRepository';
import AppError from '@shared/errors/AppError';
import MQTTPublishTopicService from '@modules/mqtt/service/MqttPublishTopicService';

interface IRequest {
  user_id: string;
  equipment_id: string;
  action: string;
  date_schedule: Date;
}
export default class CreateScheduleService {
  public async execute({
    user_id,
    equipment_id,
    date_schedule,
    action,
  }: IRequest) {
    const mqttService = new MQTTPublishTopicService();
    const equipmentRepository = getCustomRepository(EquipmentRepository);
    const equipmentExist = await equipmentRepository.findByIdAndUser(
      equipment_id,
      user_id,
    );
    if (!equipmentExist) {
      throw new AppError(`Equipamento não encontrado !`);
    }
    const scheduleRepository = getCustomRepository(ScheduleRepository);
    const schedule = await scheduleRepository.create({
      equipment_id,
      date_schedule,
      action,
    });
    await scheduleRepository.save(schedule);
    const date = new Date(date_schedule);
    const job = Schedule.scheduleJob(date, async () => {
      await mqttService.execute(
        `/schedule/equipment/${equipment_id}`,
        JSON.stringify(schedule),
      );
    });
    console.log(job.nextInvocation());
    return schedule;
  }
}
