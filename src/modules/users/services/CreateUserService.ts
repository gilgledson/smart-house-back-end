import { getCustomRepository } from 'typeorm';
import UserRepository from '../typeorm/repositories/UserRepository';
import User from '../typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { hash } from 'bcrypt';
interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const userExists = await userRepository.findByEmail(email);
    if (userExists) {
      throw new AppError(`E-mail ${email} já cadastrado`, 422);
    }
    const hasPassword = await hash(password, 8);
    const user = await userRepository.create({
      name,
      email,
      password: hasPassword,
    });
    await userRepository.save(user);
    return user;
  }
}

export default CreateUserService;
