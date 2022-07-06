import LoginService from '../services/LoginService';
import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import { classToClass } from 'class-transformer';

export default class AuthController {
  public async login(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const createLoginService = new LoginService();
    const login = await createLoginService.execute({ email, password });
    return response.json(login);
  }
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const userService = new CreateUserService();
    const user = await userService.execute({ name, email, password });
    return response.status(201).json({
      user: classToClass(user),
      message: 'user created successfully',
    });
  }
}
