import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import { celebrate, Joi, Segments } from 'celebrate';
const authRouters = Router();
const authController = new AuthController();

authRouters.post(
  '/login',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    },
  }),
  authController.login,
);
authRouters.post(
  '/signup',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().required(),
    },
  }),
  authController.create,
);

export default authRouters;
