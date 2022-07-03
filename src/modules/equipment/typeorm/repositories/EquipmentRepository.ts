import Equipment from '../entities/Equipment';
import { EntityRepository, Repository } from 'typeorm';

interface IRequest {
    name: string;
}

@EntityRepository(Equipment)
class EquipmentRepository extends Repository<Equipment> {
    /**
    * GET EQUIPMENT BY ID
    */
    public async findById(id: string): Promise<Equipment | undefined> {
        const user = await this.findOne(id);
        return user;
    }
    /**
    * GET EQUIPMENT BY ID AND USER ID
    */
    public async findByIdAndUser(id: string, user_id: string): Promise<Equipment | undefined> {
        const user = await this.findOne({where: { id, user_id}});
        return user;
    }
    /**
    * GET EQUIPMENT BY USER ID
    */
    public async findByUser(user_id: string): Promise<Array<Equipment> | undefined> {
        const user = await this.find({where: {user_id: user_id}});
        return user;
    }
   
  
}

export default EquipmentRepository;
