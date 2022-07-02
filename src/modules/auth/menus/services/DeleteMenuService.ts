import Menu from '../typeorm/entities/Menu';
import { getCustomRepository } from 'typeorm';
import MenuRepository from '../typeorm/repositories/MenuRepository';
import AppError from '@shared/errors/AppError';

export default class DeleteMenuService {
  public async execute(id: string): Promise<[]> {
    const menuRepository = getCustomRepository(MenuRepository);
    const menu = await menuRepository.findOne(id);
    if (!menu) {
      throw new AppError(`menu not found`);
    }
    await menuRepository.remove(menu);
    return [];
  }
}
