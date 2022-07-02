import isAuthenticated from '@modules/users/middlewares/isAuthenticated';
import { Joi, Segments, celebrate } from 'celebrate';
import { Router } from 'express';
import MenuController from '../controllers/MenuController';

const menuRoter = Router();
const menuController = new MenuController();

menuRoter.use(isAuthenticated);
menuRoter.get('/', menuController.list);
menuRoter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  menuController.show,
);
menuRoter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  menuController.delete,
);
menuRoter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      url: Joi.string().required(),
      icon: Joi.string().required(),
      permission_id: Joi.string().required(),
    },
  }),
  menuController.save,
);
menuRoter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      url: Joi.string().required(),
      icon: Joi.string().required(),
      permission_id: Joi.string().required(),
    },
  }),
  menuController.update,
);
export default menuRoter;
