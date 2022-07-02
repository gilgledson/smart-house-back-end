import Menu from '../typeorm/entities/Menu';
import { getCustomRepository } from 'typeorm';
import MenuRepository from '../typeorm/repositories/MenuRepository';
import AppError from '@shared/errors/AppError';

export default class ShowMenuService {
  public async execute(id: string): Promise<Menu> {
    const menuRepository = await getCustomRepository(MenuRepository);
    const menu = await menuRepository.findById(id);

    if (!menu) {
      throw new AppError(`menu not found`);
    }
    return menu;
  }
}
