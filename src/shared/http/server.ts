import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import { errors } from 'celebrate';
import AppError from '../errors/AppError';
import '@shared/typeorm';
import UploadConfig from '@config/upload';
import { pagination } from 'typeorm-pagination';
import MqttSubscribeUpdateEquipmentService from '../../modules/mqtt/service/MqttSubscribeEquipmentTopicService';
const app = express();
const mqttSubscribeUpdateEquipmentService =
  new MqttSubscribeUpdateEquipmentService();
app.use(cors());
app.use(express.json());
app.use(pagination);
app.use(routes);
app.use('/files', express.static(UploadConfig.directory));
app.use(errors());
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
        error: true,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error_message: error.message,
    });
  },
);

app.listen(3333, () => {
  mqttSubscribeUpdateEquipmentService.execute();
  console.log('server run on http://localhost:3333 🚀🚀');
});
