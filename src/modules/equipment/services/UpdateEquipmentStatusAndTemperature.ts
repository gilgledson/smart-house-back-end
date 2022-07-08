import { getCustomRepository } from 'typeorm';
import EquipmentRepository from '../typeorm/repositories/EquipmentRepository';
import Equipment from '../typeorm/entities/Equipment';
import AppError from '@shared/errors/AppError';
import MqttPublishTopicService from '../../mqtt/service/MqttPublishTopicService';
interface IRequest {
  id: string;
  user_id: string;
  power: boolean;
  temperature: number;
  sendEvent?: boolean;
}
class UpdateEquipmentStatusAndTemperature {
  public async execute({
    id,
    user_id,
    power,
    temperature,
    sendEvent = false,
  }: IRequest): Promise<void> {
    const mqttService = new MqttPublishTopicService();
    const equipmentRepository = getCustomRepository(EquipmentRepository);
    const equipment = await equipmentRepository.findByIdAndUser(id, user_id);
    if (!equipment) {
      throw new AppError('Equipment not found');
    }
    /**
     *  verifica se o evento foi enviado por o microcontrolador e verifica a temperatura
     * para ligar/desligar equipmento
     */
    if (!sendEvent && temperature >= 22) {
      power = true;
    }
    if (!sendEvent && temperature <= 15) {
      power = false;
    }
    equipment.power = power;
    equipment.temperature = temperature;
    if (sendEvent) {
      await mqttService.execute(
        `/schedule/equipment/${equipment.id}`,
        JSON.stringify({
          action: power,
          equipment_id: equipment.id,
          temperature: temperature,
        }),
      );
    }
    await equipmentRepository.save(equipment);
  }
}

export default UpdateEquipmentStatusAndTemperature;
