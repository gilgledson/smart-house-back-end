import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import IPaginatePermission from '../interface/IPaginatePermission';
import PermissionRepository from '../typeorm/repositories/PermissionRepository';

export default class DeletePermissionService {
  public async execute(id: string): Promise<[]> {
    const permisionRepository = await getCustomRepository(PermissionRepository);
    const permission = await permisionRepository.findOne(id);
    if (!permission) {
      throw new AppError(`permission not found`);
    }
    await permisionRepository.remove(permission);
    return [];
  }
}
