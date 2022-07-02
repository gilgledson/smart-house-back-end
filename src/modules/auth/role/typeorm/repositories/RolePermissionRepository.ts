import AppError from '@shared/errors/AppError';
import { EntityRepository, Repository } from 'typeorm';
import Role from '../entities/Role';
import RolePermission from '../entities/RolePermission';

@EntityRepository(RolePermission)
export default class RoleRepository extends Repository<RolePermission> {
  public async findById(id: string): Promise<RolePermission> {
    const role = await this.findOne(id);
    if (!role) {
      throw new AppError(`role not found`);
    }
    return role;
  }
  public async findByRole(
    role_id: string,
  ): Promise<RolePermission[] | undefined> {
    const role = await this.find({
      where: { role_id },
      relations: ['menu'],
    });
    return role;
  }
  public async findByRolePermission(
    role_id: string,
    permission_id: string,
  ): Promise<RolePermission | undefined> {
    const role = await this.findOne({ role_id, permission_id });
    return role;
  }
}
