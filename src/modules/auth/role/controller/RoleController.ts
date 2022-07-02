import { Request, Response } from 'express';
import AssocPermissionToRoleService from '../services/AssocPermissionToRoleService';
import CreateRoleService from '../services/CreateRoleService';
import DeleteRoleService from '../services/DeleteRoleService';
import DisassociatePermissionRoleService from '../services/DisassociatePermissionRoleService';
import ListRoleService from '../services/ListRoleService';
import UpdateRoleService from '../services/UpdateRoleService';

export default class RoleController {
  public async save(request: Request, response: Response): Promise<Response> {
    const roleService = new CreateRoleService();
    const { title, label } = await request.body;
    const role = await roleService.execute({
      title,
      label,
    });
    return response.json(role);
  }
  public async update(request: Request, response: Response): Promise<Response> {
    const roleService = new UpdateRoleService();
    const roleId = await request.params.id;
    const { title, label } = await request.body;
    const role = await roleService.execute(roleId, {
      title,
      label,
    });
    return response.json(role);
  }
  public async list(request: Request, response: Response): Promise<Response> {
    const roleService = new ListRoleService();
    const roles = await roleService.execute();
    return response.json(roles);
  }
  public async delete(request: Request, response: Response): Promise<Response> {
    const roleService = new DeleteRoleService();
    const roleId = await request.params.id;
    const roles = roleService.execute(roleId);
    return response.json(roles);
  }
  public async assoc(request: Request, response: Response): Promise<Response> {
    const assocPermissionToRoleService = new AssocPermissionToRoleService();
    const { role_id, permission_id } = await request.body;
    const roleAssoc = await assocPermissionToRoleService.execute({
      role_id,
      permission_id,
    });
    return response.json(roleAssoc);
  }
  public async disassociate(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const assocPermissionToRoleService =
      new DisassociatePermissionRoleService();
    const { role_id, permission_id } = await request.body;
    await assocPermissionToRoleService.execute({
      role_id,
      permission_id,
    });
    return response.json({});
  }
}
