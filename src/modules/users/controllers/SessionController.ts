import CreateSessionService from '../services/CreateSessionService';
import { Request, Response } from 'express';

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body;
      const createSessionService = new CreateSessionService();
      const session = await createSessionService.execute({ email, password });
      return response.json(session);
    } catch (error) {
      return response.json(error);
    }
  }
}
