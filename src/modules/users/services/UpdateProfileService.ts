import UserRepository from '../typeorm/repositories/UserRepository';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import bcrypt, { hash } from 'bcrypt';
import RoleRepository from '@modules/auth/role/typeorm/repositories/RoleRepository';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
  role_id: string;
}

class UpdateProfileService {
  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
    role_id,
  }: IRequest): Promise<User> {
    const userRepository = await getCustomRepository(UserRepository);
    const roleRepository = await getCustomRepository(RoleRepository);
    const user = await userRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    const roleExists = await roleRepository.findOne(role_id);

    if (!roleExists) {
      throw new AppError(`Role not found`);
    }
    const userExists = await userRepository.findByEmail(email);
    if (userExists && userExists.id != user_id) {
      throw new AppError('There is already one user with email');
    }
    if (password && !old_password) {
      throw new AppError('old password is required');
    }
    if (password && old_password) {
      const checkPassword = await bcrypt.compare(old_password, user.password);
      if (!checkPassword) {
        throw new AppError('Old password is incorrect');
      }
      user.password = await hash(password, 8);
    }
    user.name = name;
    user.email = email;
    user.role_id = role_id;
    await userRepository.save(user);
    return user;
  }
}
export default UpdateProfileService;
