import { getCustomRepository } from 'typeorm';
import EquipmentRepository from '../typeorm/repositories/EquipmentRepository';
import Equipment from '../typeorm/entities/Equipment';
import AppError from '@shared/errors/AppError';
interface IRequest {
  id: string;
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
class UpdateEquipmentService {
  public async execute({
    id,
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
    const equipment = await equipmentRepository.findByIdAndUser(id, user_id);
    if (!equipment) {
      throw new AppError('Equipment not found');
    }
    equipment.name = name;
    equipment.latitude = latitude;
    equipment.longitude = longitude;
    equipment.region = region;
    equipment.country = country;
    equipment.neighborhood = neighborhood;
    equipment.city = city;
    equipment.address = address;
    await equipmentRepository.save(equipment);
    return equipment;
  }
}

export default UpdateEquipmentService;
