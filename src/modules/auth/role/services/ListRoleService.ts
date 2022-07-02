import { getCustomRepository } from 'typeorm';
import RoleRepository from '../typeorm/repositories/RoleRepository';
import Role from '../typeorm/entities/Role';

export default class ListRoleService {
  public async execute(): Promise<Role[]> {
    const roleRepository = await getCustomRepository(RoleRepository);
    const roles = await roleRepository.find({ relations: ['permissions'] });
    return roles;
  }
}
