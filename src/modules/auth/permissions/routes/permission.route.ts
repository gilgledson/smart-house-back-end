import isAuthenticated from '@modules/users/middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import PermissionController from '../controllers/PermissionController';

const permissionRoute = Router();
const permissionController = new PermissionController();

permissionRoute.use(isAuthenticated);
permissionRoute.get('/', permissionController.list);
permissionRoute.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      label: Joi.string().required(),
    },
  }),
  permissionController.save,
);
permissionRoute.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
    [Segments.BODY]: {
      title: Joi.string().required(),
      label: Joi.string().required(),
    },
  }),
  permissionController.update,
);
permissionRoute.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  permissionController.delete,
);
export default permissionRoute;
