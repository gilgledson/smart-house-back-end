import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import { celebrate, Joi, Segments } from 'celebrate';
const loginRouters = Router();
const loginController = new LoginController();

loginRouters.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    },
  }),
  loginController.create,
);
loginRouters.delete(
  '/',
  loginController.create,
);

export default loginRouters;
