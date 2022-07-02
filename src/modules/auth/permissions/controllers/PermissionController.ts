import { Request, Response } from 'express';
import CreatePermissionService from '../services/CreatePermissionService';
import DeletePermissionService from '../services/DeletePermissionService';
import ListPermissionService from '../services/ListPermissionService';
import UpdatePermissionService from '../services/UpdatePermissionService';

export default class PermissionController {
  public async save(request: Request, response: Response): Promise<Response> {
    const permissionService = new CreatePermissionService();
    const { title, label } = await request.body;
    const permission = await permissionService.execute({
      title,
      label,
    });
    return response.json(permission);
  }
  public async update(request: Request, response: Response): Promise<Response> {
    const permissionService = new UpdatePermissionService();
    const permissionId = await request.params.id;
    const { title, label } = await request.body;
    const permission = await permissionService.execute(permissionId, {
      title,
      label,
    });
    return response.json(permission);
  }
  public async list(request: Request, response: Response): Promise<Response> {
    const permissionService = new ListPermissionService();
    const permissions = await permissionService.execute();
    return response.json(permissions);
  }
  public async delete(request: Request, response: Response): Promise<Response> {
    const permissionService = new DeletePermissionService();
    const permissionId = await request.params.id;
    const roles = await permissionService.execute(permissionId);
    return response.json(roles);
  }
}
