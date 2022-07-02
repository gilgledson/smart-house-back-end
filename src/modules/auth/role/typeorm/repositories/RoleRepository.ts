import AppError from '@shared/errors/AppError';
import { EntityRepository, Repository } from 'typeorm';
import Role from '../entities/Role';

@EntityRepository(Role)
export default class RoleRepository extends Repository<Role> {
  public async findById(id: string): Promise<Role> {
    const role = await this.findOne(id);
    if (!role) {
      throw new AppError(`role not found`);
    }
    return role;
  }
  public async findByLabel(label: string): Promise<Role | undefined> {
    const role = await this.findOne({ label });
    return role;
  }
}
