import { getCustomRepository } from 'typeorm';
import RolePermissionRepository from '../typeorm/repositories/RolePermissionRepository';
import RolePermission from '../typeorm/entities/RolePermission';
import AppError from '@shared/errors/AppError';

interface IRequest {
  role_id: string;
  permission_id: string;
}

export default class DisassociatePermissionRoleService {
  public async execute({
    role_id,
    permission_id,
  }: IRequest): Promise<RolePermission> {
    const roleAssocRepository = await getCustomRepository(
      RolePermissionRepository,
    );
    const roleAsso = await roleAssocRepository.findByRolePermission(
      role_id,
      permission_id,
    );
    if (!roleAsso) {
      throw new AppError(`permission not assoc to role`, 422);
    }
    await roleAssocRepository.remove(roleAsso);
    return roleAsso;
  }
}
