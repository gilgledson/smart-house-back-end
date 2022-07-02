import AppError from '@shared/errors/AppError';
import { EntityRepository, Repository } from 'typeorm';
import Permissions from '../entities/permission';
@EntityRepository(Permissions)
export default class PermissionRepository extends Repository<Permissions> {
  public async findById(id: string): Promise<Permissions> {
    const role = await this.findOne(id);
    if (!role) {
      throw new AppError(`permission not found`);
    }
    return role;
  }
  public async findByLabel(label: string): Promise<Permissions | undefined> {
    const role = await this.findOne({ label: label });
    return role;
  }
}
