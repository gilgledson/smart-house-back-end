import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';

interface IRequest {
  id: string;
  name: string;
  password: string;
  email: string;
  role_id: string;
}

class UpdateUserService {
  public async execute({
    id,
    name,
    password,
    email,
    role_id,
  }: IRequest): Promise<User> {
    const userRepository = await getCustomRepository(UserRepository);
    const user = await userRepository.findById(id);
    if (!user) {
      throw new AppError(`User not found`);
    }
    user.name = name;
    user.password = password;
    user.email = email;
    user.role_id = role_id;
    return await userRepository.save(user);
  }
}
export default UpdateUserService;
