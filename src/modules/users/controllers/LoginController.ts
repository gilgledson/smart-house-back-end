import LoginService from '../services/LoginService'
import { Request, Response } from 'express';

export default class loginController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body;
      const createLoginService = new LoginService();
      const login = await createLoginService.execute({ email, password });
      return response.json(login);
    } catch (error) {
      return response.json(error);
    }
  }
}
