import Schedule from '../entities/Schedule';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Schedule)
class ScheduleRepository extends Repository<Schedule> {
  public async findById(id: string): Promise<Schedule | undefined> {
    const schedule = await this.findOne(id);
    return schedule;
  }
  public async findByEquipmentId(
    equipment_id: string,
  ): Promise<Schedule | undefined> {
    const schedule = await this.findOne({ where: { equipment_id } });
    return schedule;
  }
}

export default ScheduleRepository;
