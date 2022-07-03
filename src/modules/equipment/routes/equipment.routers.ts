import { Router } from 'express';
import EquipmentController from '../controllers/EquipmentController';
import { celebrate, Joi, Segments } from 'celebrate';
const equipmentRouters = Router();
const equipmentController = new EquipmentController();

equipmentRouters.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            latitude: Joi.string().required(), 
            longitude: Joi.string().required()
        },
    }),
    equipmentController.create,
);
equipmentRouters.put(
    '/',
    celebrate({
        [Segments.PARAMS]:{
            id: Joi.string().required()
        },
        [Segments.BODY]: {
            name: Joi.string().required(),
            latitude: Joi.string().required(), 
            longitude: Joi.string().required()
        },
    }),
    equipmentController.update,
);
equipmentRouters.delete(
    '/',
    celebrate({
        [Segments.PARAMS]:{
            id: Joi.string().required()
        }
    }),
    equipmentController.delete,
);
equipmentRouters.get(
    '/',
    equipmentController.list,
);

export default equipmentRouters;
