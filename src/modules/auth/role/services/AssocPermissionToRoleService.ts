import { getCustomRepository } from 'typeorm';
import RolePermissionRepository from '../typeorm/repositories/RolePermissionRepository';
import RolePermission from '../typeorm/entities/RolePermission';
import AppError from '@shared/errors/AppError';

interface IRequest {
  role_id: string;
  permission_id: string;
}

export default class AssocPermissionToRoleService {
  public async execute({
    role_id,
    permission_id,
  }: IRequest): Promise<RolePermission> {
    const roleAssocRepository = await getCustomRepository(
      RolePermissionRepository,
    );
    const roleAssocExists = await roleAssocRepository.findByRolePermission(
      role_id,
      permission_id,
    );
    if (roleAssocExists) {
      throw new AppError(`permission already assoc to role`, 422);
    }
    const roleAsso = await roleAssocRepository.create({
      role_id,
      permission_id,
    });
    await roleAssocRepository.save(roleAsso);
    return roleAsso;
  }
}
