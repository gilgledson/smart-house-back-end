import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UserController from '../controllers/UserController';
import isAuthenticated from '../middlewares/isAuthenticated';

const usersRoutes = Router();

const userController = new UserController();

usersRoutes.use(isAuthenticated);
usersRoutes.get('/', userController.index);
usersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  userController.create,
);
usersRoutes.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  userController.show,
);
usersRoutes.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string(),
    },
  }),
  userController.update,
);
usersRoutes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  userController.delete,
);

export default usersRoutes;
