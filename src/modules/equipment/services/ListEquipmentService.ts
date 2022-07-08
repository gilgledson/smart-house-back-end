import { getCustomRepository } from 'typeorm';
import EquipmentRepository from '../typeorm/repositories/EquipmentRepository';
import Equipment from '../typeorm/entities/Equipment';

class ListEquipmentService {
  public async execute(user_id: string): Promise<Array<Equipment> | undefined> {
    const equipmentRepository = getCustomRepository(EquipmentRepository);
    const equipments = await equipmentRepository.findByUser(user_id);
    return equipments;
  }
}

export default ListEquipmentService;
