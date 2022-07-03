import UserRepository from '../typeorm/repositories/UserRepository';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
}
interface ProfileUser {
  user: User;
}

class ShowProfileService {
  public async execute({ user_id }: IRequest): Promise<ProfileUser> {
    const userRepository = await getCustomRepository(UserRepository);
  
    const users = await userRepository.findById(user_id);
    if (!users) {
      throw new AppError('User not found', 404);
    }


    return {
      user: users
    };
  }
}
export default ShowProfileService;
