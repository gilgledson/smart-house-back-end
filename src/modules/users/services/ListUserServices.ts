import UserRepository from '../typeorm/repositories/UserRepository';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';

class ListUserServices {
  public async execute(): Promise<User[]> {
    const userRepository = await getCustomRepository(UserRepository);
    const users = await userRepository.find();

    return users;
  }
}
export default ListUserServices;
