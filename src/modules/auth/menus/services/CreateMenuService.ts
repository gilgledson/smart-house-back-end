import Menu from '../typeorm/entities/Menu';
import { getCustomRepository } from 'typeorm';
import MenuRepository from '../typeorm/repositories/MenuRepository';
import AppError from '@shared/errors/AppError';
import PermissionRepository from '../../permissions/typeorm/repositories/PermissionRepository';

interface IRequest {
  name: string;
  url: string;
  icon: string;
  permission_id: string;
}

export default class CreateMenuService {
  public async execute({
    name,
    url,
    icon,
    permission_id,
  }: IRequest): Promise<Menu> {
    const menuRepository = await getCustomRepository(MenuRepository);
    const permissionRepository = await getCustomRepository(
      PermissionRepository,
    );
    const permission = permissionRepository.findOne({ id: permission_id });
    if (!permission) {
      throw new AppError(`permission not found`);
    }
    const menuExists = await menuRepository.findByPermission(permission_id);
    if (menuExists) {
      throw new AppError(`Already menu assoc to permission`, 422);
    }
    const menu = await menuRepository.create({
      name,
      url,
      icon,
      permission_id,
    });
    await menuRepository.save(menu);
    return menu;
  }
}
