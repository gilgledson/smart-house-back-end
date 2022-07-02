import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import RoleRepository from '../typeorm/repositories/RoleRepository';

export default class DeleteRoleService {
  public async execute(id: string): Promise<[]> {
    const roleRepository = getCustomRepository(RoleRepository);
    const role = await roleRepository.findOne(id);
    if (!role) {
      throw new AppError(`role not found`);
    }
    await roleRepository.remove(role);
    return [];
  }
}
