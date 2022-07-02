import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Role from '../typeorm/entities/Role';
import RoleRepository from '../typeorm/repositories/RoleRepository';

interface IRequest {
  title: string;
  label: string;
}
export default class UpdateRoleService {
  public async execute(id: string, { title, label }: IRequest): Promise<Role> {
    const roleRepository = await getCustomRepository(RoleRepository);
    const role = await roleRepository.findOne(id);
    if (!role) {
      throw new AppError(`role not found 2`);
    }
    const roleExists = await roleRepository.findByLabel(label);
    if (roleExists && roleExists.id != id) {
      throw new AppError(`role label already used`, 422);
    }
    role.title = title;
    role.label = label;
    await roleRepository.save(role);
    return role;
  }
}
