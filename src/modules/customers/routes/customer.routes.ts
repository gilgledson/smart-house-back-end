import isAuthenticated from '@modules/users/middlewares/isAuthenticated';
import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import Joi from 'joi';
import CustomerController from '../controllers/CustomerController';

const customerRoute = Router();
const customerController = new CustomerController();

customerRoute.use(isAuthenticated);
customerRoute.get('/', customerController.show);
customerRoute.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  customerController.create,
);
customerRoute.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
);
customerRoute.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  customerController.delete,
);

export default customerRoute;
