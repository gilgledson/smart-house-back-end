import AppError from '@shared/errors/AppError';
import path from 'path';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';
import UploadConfig from '@config/upload';
import fs from 'fs';
interface IRequest {
  id: string;
  avatarFilename?: string;
}
class UpdateUserAvatarService {
  public async execute({ id, avatarFilename }: IRequest): Promise<User> {
    const userRepository = await getCustomRepository(UserRepository);
    const user = await userRepository.findById(id);
    if (!user) {
      throw new AppError(`User not found`);
    }
    if (user.avatar) {
      const userAvatarFilePath = path.join(
        `${UploadConfig.directory}/avatar/`,
        user.avatar,
      );
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    if (avatarFilename) {
      user.avatar = avatarFilename;
      await userRepository.save(user);
    }

    return user;
  }
}
export default UpdateUserAvatarService;
