import Role from '../typeorm/entities/Role';
import { getCustomRepository } from 'typeorm';
import RoleRepository from '../typeorm/repositories/RoleRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  title: string;
  label: string;
}

export default class CreateRoleService {
  public async execute({ title, label }: IRequest): Promise<Role> {
    const roleRepository = getCustomRepository(RoleRepository);
    const roleExists = await roleRepository.findByLabel(label);
    if (roleExists) {
      throw new AppError(`Label ${label} already used !`);
    }
    const role = await roleRepository.create({
      title: title,
      label: label,
    });
    await roleRepository.save(role);
    return role;
  }
}
