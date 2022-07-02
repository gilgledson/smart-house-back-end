import isAuthenticated from '@modules/users/middlewares/isAuthenticated';
import { Router } from 'express';
import CompanyController from '../controllers/CompanyController';
import { Joi, Segments, celebrate } from 'celebrate';

const routerCompany = Router();
const companyController = new CompanyController();

// routerCompany.use(isAuthenticated);

routerCompany.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      withTrashed: Joi.boolean(),
      page: Joi.number(),
      per_page: Joi.number(),
    },
  }),
  companyController.list,
);

routerCompany.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  companyController.show,
);

routerCompany.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      document_number: Joi.string().required(),
      status: Joi.number().required(),
      domain: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      street: Joi.string().required(),
    },
  }),
  companyController.save,
);

routerCompany.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      document_number: Joi.string().required(),
      status: Joi.number().required(),
      domain: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      street: Joi.string().required(),
    },
  }),
  companyController.update,
);
routerCompany.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  companyController.delete,
);
routerCompany.patch('/:id/restore', companyController.restore);
export default routerCompany;
