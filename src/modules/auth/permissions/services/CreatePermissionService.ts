import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Permissions from '../typeorm/entities/permission';
import PermissionRepository from '../typeorm/repositories/PermissionRepository';
interface IRequest {
  title: string;
  label: string;
}
export default class CreatePermissionService {
  public async execute({ title, label }: IRequest): Promise<Permissions> {
    const permisionRepository = await getCustomRepository(PermissionRepository);
    const permisssionExists = await permisionRepository.findByLabel(label);
    if (permisssionExists) {
      throw new AppError(`Permission label ${label} already used`);
    }
    const permission = await permisionRepository.create({
      title: title,
      label: label,
    });
    await permisionRepository.save(permission);
    return permission;
  }
}
