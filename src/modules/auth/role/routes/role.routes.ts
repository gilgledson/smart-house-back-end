import isAuthenticated from '@modules/users/middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import RoleController from '../controller/RoleController';

const roleRouter = Router();
const roleController = new RoleController();

roleRouter.use(isAuthenticated);
roleRouter.get('/', roleController.list);
roleRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      label: Joi.string().required(),
    },
  }),
  roleController.save,
);
roleRouter.post(
  '/assoc',
  celebrate({
    [Segments.BODY]: {
      role_id: Joi.string().required(),
      permission_id: Joi.string().required(),
    },
  }),
  roleController.assoc,
);
roleRouter.delete(
  '/disassociate',
  celebrate({
    [Segments.BODY]: {
      role_id: Joi.string().required(),
      permission_id: Joi.string().required(),
    },
  }),
  roleController.disassociate,
);
roleRouter.put(
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
  roleController.update,
);
roleRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  roleController.delete,
);
export default roleRouter;
