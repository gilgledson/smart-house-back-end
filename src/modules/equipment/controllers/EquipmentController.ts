import Equipment from '../typeorm/entities/Equipment';
import { Request, Response } from 'express';
import CreateEquipmentService from '../services/CreateEquipmentService';
import UpdateEquipmentService from '../services/UpdateEquipmentService';
import ListEquipmentService from '../services/ListEquipmentService';
import DeleteEquipmentService from '../services/DeleteEquipmentService';
import { classToClass } from 'class-transformer';

class EquipmentController {
    public async list(request: Request, response: Response): Promise<Response> {
        const equipmentService = new ListEquipmentService();
        const user_id = await request.user.id;
        const users = await equipmentService.execute(user_id);
        return response.json(classToClass(users));
    }
    public async update(request: Request, response: Response): Promise<Response> {
        const { name, latitude, longitude } = request.body;
        const user_id = await request.user.id;
        const id = request.params.id;
        const equipmentService = new UpdateEquipmentService();
        const equipment = await equipmentService.execute({
            name,
            latitude,
            longitude, 
            user_id,
            id
        });
        return response.json(classToClass(equipment));
    }
    public async create(request: Request, response: Response): Promise<Response> {
        const { name, latitude, longitude } = request.body;
        const user_id = await request.user.id;
        const equipmentService = new CreateEquipmentService();
        const equipment = await equipmentService.execute({
            name,
            latitude,
            longitude, 
            user_id
        });
        return response.json(classToClass(equipment));
    }
    public async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const user_id = await request.user.id;
        const equipmentService = new DeleteEquipmentService();
        const equipment = await equipmentService.execute({ id, user_id });
        return response.json(classToClass(equipment));
    }
}

export default EquipmentController;
