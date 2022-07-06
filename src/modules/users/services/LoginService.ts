import { getCustomRepository } from 'typeorm';
import UserRepository from '../typeorm/repositories/UserRepository';
import User from '../typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class LoginAuthService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new AppError(`Incorrect email or password combination`, 401);
    }
    const passwordConfirmation = await compare(password, user.password);
    if (!passwordConfirmation) {
      throw new AppError(`Incorrect email or password combination`, 401);
    }
    const token = await sign(
      { id: user.id, name: user.name },
      authConfig.jwt.secret,
      {
        subject: user.id,
        expiresIn: authConfig.jwt.expiresIn,
      },
    );
    return { user, token };
  }
}

export default LoginAuthService;
