import { Router } from 'express';
import SessionController from '../controllers/SessionController';
import { celebrate, Joi, Segments } from 'celebrate';
const sessionRouters = Router();
const sessionController = new SessionController();

sessionRouters.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    },
  }),
  sessionController.create,
);

export default sessionRouters;
