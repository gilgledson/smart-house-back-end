import { getCustomRepository } from 'typeorm';
import EquipmentRepository from '../typeorm/repositories/EquipmentRepository';
import Equipment from '../typeorm/entities/Equipment';
interface IRequest {
  name: string;
  latitude: string;
  longitude: string;
  user_id: string;
  region: string;
  country: string;
  city: string;
  neighborhood: string;
  address: string;
}
class CreateEquipmentService {
  public async execute({
    name,
    latitude,
    longitude,
    user_id,
    region,
    country,
    city,
    neighborhood,
    address,
  }: IRequest): Promise<Equipment> {
    const equipmentRepository = getCustomRepository(EquipmentRepository);

    const equipment = await equipmentRepository.create({
      name,
      latitude,
      longitude,
      user_id,
      region,
      country,
      city,
      neighborhood,
      address,
    });
    await equipmentRepository.save(equipment);
    return equipment;
  }
}

export default CreateEquipmentService;
