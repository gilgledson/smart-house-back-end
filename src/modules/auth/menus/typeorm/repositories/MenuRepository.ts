import { EntityRepository, Repository } from 'typeorm';
import Menu from '../entities/Menu';

@EntityRepository(Menu)
export default class MenuRepository extends Repository<Menu> {
  public async findByPermission(
    permission_id: string,
  ): Promise<Menu | undefined> {
    const menu = await this.findOne({ where: { permission_id } });
    console.log(permission_id);
    console.log(menu);
    return menu;
  }
  public async findById(id: string): Promise<Menu | undefined> {
    const menu = await this.findOne(id, { relations: ['permission'] });
    return menu;
  }
}
