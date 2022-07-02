import { Request, Response } from 'express';
import CreateMenuService from '../services/CreateMenuService';
import UpdateMenuService from '../services/UpdateMenuService';
import ShowMenuService from '../services/ShowMenuService';
import DeleteMenuService from '../services/DeleteMenuService';
import ListMenuService from '../services/ListMenuService';

export default class MenuController {
  public async save(request: Request, response: Response): Promise<Response> {
    const menuService = new CreateMenuService();
    const { name, url, icon, permission_id } = await request.body;
    const menu = await menuService.execute({ name, url, icon, permission_id });
    return response.json(menu);
  }
  public async update(request: Request, response: Response): Promise<Response> {
    const menuService = new UpdateMenuService();
    const menuId = await request.params.id;
    const { name, url, icon, permission_id } = await request.body;
    const menu = await menuService.execute(menuId, {
      name,
      url,
      icon,
      permission_id,
    });
    return response.json(menu);
  }
  public async show(request: Request, response: Response): Promise<Response> {
    const menuService = new ShowMenuService();
    const menuId = await request.params.id;
    const menu = await menuService.execute(menuId);
    return response.json(menu);
  }
  public async delete(request: Request, response: Response): Promise<Response> {
    const menuService = new DeleteMenuService();
    const menuId = await request.params.id;
    const menu = menuService.execute(menuId);
    return response.json(menu);
  }
  public async list(request: Request, response: Response): Promise<Response> {
    const menuService = new ListMenuService();
    const menu = await menuService.execute();
    return response.json(menu);
  }
}
