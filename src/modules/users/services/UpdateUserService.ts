import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';

interface IRequest {
  id: string;
  name: string;
  password: string;
  email: string;
}

class UpdateUserService {
  public async execute({ id, name, password, email }: IRequest): Promise<User> {
    const userRepository = await getCustomRepository(UserRepository);
    const user = await userRepository.findById(id);
    if (!user) {
      throw new AppError(`User not found`);
    }
    user.name = name;
    user.password = password;
    user.email = email;
    return await userRepository.save(user);
  }
}
export default UpdateUserService;
