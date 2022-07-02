import User from '../entities/User';
import { EntityRepository, Repository } from 'typeorm';

interface IRequest {
  name: string;
}

@EntityRepository(User)
class UserRepository extends Repository<User> {
  public async findByName(name: string): Promise<User | undefined> {
    const user = await this.findOne({ where: { name } });
    return user;
  }
  public async findById(id: string): Promise<User | undefined> {
    const user = await this.findOne(id, { relations: ['role'] });
    return user;
  }
  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.findOne({ where: { email } });
    return user;
  }
}

export default UserRepository;
