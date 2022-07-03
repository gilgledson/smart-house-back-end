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
}
class UpdateEquipmentService {
    public async execute({
        id,
        name,
        latitude,
        longitude,
        user_id
    }: IRequest): Promise<Equipment> {
        const equipmentRepository = getCustomRepository(EquipmentRepository);
        const equipment = await equipmentRepository.findByIdAndUser(id, user_id);
        if (!equipment){
            throw new AppError('Equipment not found');
        }
        equipment.name = name;
        equipment.latitude = latitude;
        equipment.longitude = longitude;
        await equipmentRepository.save(equipment);
        return equipment;
    }
}

export default UpdateEquipmentService;
