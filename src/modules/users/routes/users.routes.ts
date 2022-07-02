import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UserController from '../controllers/UserController';
import isAuthenticated from '../middlewares/isAuthenticated';
import UserAvatarController from '../controllers/UserAvatarController';
import multer from 'multer';
import UploadConfig from '@config/upload';

const usersRoutes = Router();

const userController = new UserController();
const userAvatarController = new UserAvatarController();
const upload = multer(UploadConfig);

usersRoutes.use(isAuthenticated);
usersRoutes.get('/', userController.index);
usersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      role_id: Joi.string().required(),
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
      role_id: Joi.string().required(),
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
usersRoutes.patch(
  '/avatar',
  upload.single('avatar'),
  userAvatarController.update,
);
export default usersRoutes;
