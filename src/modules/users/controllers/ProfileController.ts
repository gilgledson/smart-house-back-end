import User from '../typeorm/entities/User';
import { Request, Response } from 'express';
import ProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';
import { classToClass } from 'class-transformer';

class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const userService = new ProfileService();
    const user_id = await request.user.id;
    const users = await userService.execute({ user_id });
    return response.json(classToClass(users));
  }
  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, password, old_password } = request.body;
    const user_id = request.user.id;
    const userService = new UpdateProfileService();
    const user = await userService.execute({
      user_id,
      name,
      password,
      email,
      old_password,
    });
    return response.json(classToClass(user));
  }
}

export default ProfileController;
