import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Permissions from '../typeorm/entities/permission';
import PermissionRepository from '../typeorm/repositories/PermissionRepository';
interface IRequest {
  title: string;
  label: string;
}
export default class UpdatePermissionService {
  public async execute(
    id: string,
    { title, label }: IRequest,
  ): Promise<Permissions> {
    const permisionRepository = await getCustomRepository(PermissionRepository);
    const permission = await permisionRepository.findOne(id);
    if (!permission) {
      throw new AppError('Permissions not found');
    }
    const permisssionExists = await permisionRepository.findByLabel(label);
    if (permisssionExists && permisssionExists.id != permission.id) {
      throw new AppError(`Permission label ${label} already used`);
    }
    permission.title = title;
    permission.label = label;
    await permisionRepository.save(permission);
    return permission;
  }
}
