import Menu from '../typeorm/entities/Menu';
import { getCustomRepository } from 'typeorm';
import MenuRepository from '../typeorm/repositories/MenuRepository';

interface IPaginateMenu {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: Menu[];
}
export default class ListMenuService {
  public async execute(): Promise<IPaginateMenu> {
    const menuRepository = getCustomRepository(MenuRepository);
    const menus = await menuRepository
      .createQueryBuilder('menus')
      .leftJoinAndSelect('menus.permission', 'permissions')
      .paginate();
    return menus as IPaginateMenu;
  }
}
