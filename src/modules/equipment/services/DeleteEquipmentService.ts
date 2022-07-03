import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import EquipmentRepository from '../typeorm/repositories/EquipmentRepository';

interface IRequest {
    id: string;
    user_id: string;
}

class DeleteUserService {
    public async execute({ id, user_id }: IRequest): Promise<[]> {
        const equipmentRepository = await getCustomRepository(EquipmentRepository);
        const equipment = await equipmentRepository.findByIdAndUser(id, user_id);
        if (!equipment) {
            throw new AppError(`Equipment not found`);
        }
        await equipmentRepository.remove(equipment);
        return [];
    }
}

export default DeleteUserService;
