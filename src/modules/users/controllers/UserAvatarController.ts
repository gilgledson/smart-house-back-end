import { Request, Response } from 'express';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import { classToClass } from 'class-transformer';
class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const userAvatar = new UpdateUserAvatarService();
      const user_id = await request.user.id;
      const user = await userAvatar.execute({
        id: user_id,
        avatarFilename: request.file?.filename,
      });
      return response.status(200).json({
        user: classToClass(user),
        message: 'user updated successfully',
      });
    } catch (err) {
      console.error(err);
      return response.status(500).json({ user: null, message: err });
    }
  }
}
export default UserAvatarController;
