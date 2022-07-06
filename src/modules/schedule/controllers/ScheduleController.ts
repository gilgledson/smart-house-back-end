import { classToClass } from 'class-transformer';
import CreateScheduleService from '../services/CreateScheduleService';
import { Request, Response } from 'express';

export default class ScheduleController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { equipment_id, date_schedule, action } = request.body;
    const user_id = await request.user.id;
    const createScheduleService = new CreateScheduleService();
    const schedule = await createScheduleService.execute({
      equipment_id,
      date_schedule,
      action,
      user_id,
    });
    return response.json(classToClass(schedule));
  }
}
