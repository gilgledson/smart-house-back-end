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

export default class UpdateMenuService {
  public async execute(
    id: string,
    { name, url, icon, permission_id }: IRequest,
  ): Promise<Menu> {
    const menuRepository = getCustomRepository(MenuRepository);
    const permissionRepository = getCustomRepository(PermissionRepository);
    const menu = await menuRepository.findOne(id);
    if (!menu) {
      throw new AppError('Menu not found');
    }
    const permission = permissionRepository.findOne(permission_id);
    if (!permission) {
      throw new AppError(`permission not found`);
    }
    const menuExists = await menuRepository.findByPermission(permission_id);
    if (menuExists && menuExists.id != menu.id) {
      throw new AppError(`Already menu assoc to permission`, 422);
    }
    menu.name = name;
    menu.url = url;
    menu.icon = icon;
    menu.permission_id = permission_id;
    await menuRepository.save(menu);
    return menu;
  }
}
