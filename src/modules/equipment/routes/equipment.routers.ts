import { Router } from 'express';
import EquipmentController from '../controllers/EquipmentController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@modules/users/middlewares/isAuthenticated';
const equipmentRouters = Router();
const equipmentController = new EquipmentController();
equipmentRouters.use(isAuthenticated);
equipmentRouters.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      latitude: Joi.string().required(),
      longitude: Joi.string().required(),
      country: Joi.string().required(),
      city: Joi.string().required(),
      region: Joi.string().required(),
      neighborhood: Joi.string().required(),
      address: Joi.string().required(),
    },
  }),
  equipmentController.create,
);
equipmentRouters.put(
  '/',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      latitude: Joi.string().required(),
      longitude: Joi.string().required(),
      country: Joi.string().required(),
      city: Joi.string().required(),
      neighborhood: Joi.string().required(),
      address: Joi.string().required(),
    },
  }),
  equipmentController.update,
);
equipmentRouters.patch(
  '/',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
    [Segments.BODY]: {
      power: Joi.string().required().valid('ON', 'OFF'),
      temperature: Joi.number().required(),
    },
  }),
  equipmentController.update,
);
equipmentRouters.delete(
  '/',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  equipmentController.delete,
);
equipmentRouters.get('/', equipmentController.list);

export default equipmentRouters;
