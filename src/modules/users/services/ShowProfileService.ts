import UserRepository from '../typeorm/repositories/UserRepository';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import RolePermission from '@modules/auth/role/typeorm/entities/RolePermission';
import RolePermissionRepository from '@modules/auth/role/typeorm/repositories/RolePermissionRepository';

interface IRequest {
  user_id: string;
}
interface ProfileUser {
  user: User;
  menus: RolePermission[] | undefined;
}

class ShowProfileService {
  public async execute({ user_id }: IRequest): Promise<ProfileUser> {
    const userRepository = await getCustomRepository(UserRepository);
    const rolePermissionRepository = await getCustomRepository(
      RolePermissionRepository,
    );
    const users = await userRepository.findById(user_id);
    if (!users) {
      throw new AppError('User not found', 404);
    }
    const rolesPermission = await rolePermissionRepository.findByRole(
      users.role_id,
    );

    return {
      user: users,
      menus: rolesPermission,
    };
  }
}
export default ShowProfileService;
