import { getCustomRepository } from 'typeorm';
import IPaginatePermission from '../interface/IPaginatePermission';
import PermissionRepository from '../typeorm/repositories/PermissionRepository';

export default class ListPermissionService {
  public async execute(): Promise<IPaginatePermission> {
    const permisionRepository = await getCustomRepository(PermissionRepository);
    const permissions = await permisionRepository
      .createQueryBuilder('permissions')
      .paginate();
    return permissions as IPaginatePermission;
  }
}
