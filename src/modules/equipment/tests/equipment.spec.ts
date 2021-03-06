import { faker } from '@faker-js/faker';
import CreateUserService from '@modules/users/services/CreateUserService';
import User from '@modules/users/typeorm/entities/User';
import connection from '../../../shared/typeorm/connection';
import CreateEquipmentService from '../services/CreateEquipmentService';
import ListEquipmentService from '../services/ListEquipmentService';
import Equipment from '../typeorm/entities/Equipment';
import UpdateEquipmentService from '../services/UpdateEquipmentService';
import DeleteEquipmentService from '../services/DeleteEquipmentService';
import AppError from '@shared/errors/AppError';

describe('Equipamentos', () => {
  let createEquipment: CreateEquipmentService;
  let updateEquipment: UpdateEquipmentService;
  let listEquipment: ListEquipmentService;
  let deleteEquipment: DeleteEquipmentService;
  let currentEquipment: Equipment;
  let createUser: CreateUserService;
  let currentUser: User;
  beforeAll(async () => {
    await connection.create();
    await connection.clear();
    createUser = new CreateUserService();
    currentUser = await createUser.execute({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
  });

  afterAll(async () => {
    await connection.clear();
  });

  beforeEach(async () => {
    createEquipment = new CreateEquipmentService();
    listEquipment = new ListEquipmentService();
    updateEquipment = new UpdateEquipmentService();
    deleteEquipment = new DeleteEquipmentService();
  });

  test('Criando Equipamento', async () => {
    currentEquipment = await createEquipment.execute({
      name: faker.commerce.productName(),
      latitude: faker.address.latitude(),
      longitude: faker.address.longitude(),
      region: faker.address.state(),
      user_id: currentUser.id,
      neighborhood: faker.address.streetPrefix(),
      city: faker.address.city(),
      address: faker.address.street(),
      country: faker.address.countryCode(),
    });
    expect(currentEquipment).toHaveProperty('id');
  });
  it('listando equipamento do usuario', async () => {
    const equipaments = await listEquipment.execute(currentUser.id);
    expect(equipaments?.length).toBe(1);
  });

  it('atualizando equipamento do usuario', async () => {
    const name = faker.commerce.productName();
    const equipament = await updateEquipment.execute({
      id: currentEquipment.id,
      name: name,
      latitude: faker.address.latitude(),
      longitude: faker.address.longitude(),
      region: faker.address.state(),
      user_id: currentUser.id,
      neighborhood: faker.address.streetPrefix(),
      city: faker.address.city(),
      address: faker.address.street(),
      country: faker.address.countryCode(),
    });
    expect(equipament.name).toBe(name);
  });
  it('tentar deletar equipamento com usuario errado', async () => {
    try {
      await deleteEquipment.execute({
        id: faker.datatype.uuid(),
        user_id: currentUser.id,
      });
    } catch (error) {
      expect(error).toEqual({
        message: 'Equipment not found',
        statusCode: 404,
      });
    }
  });
  it('deletar equipamento do usuario', async () => {
    const equipaments = await deleteEquipment.execute({
      id: currentEquipment.id,
      user_id: currentUser.id,
    });
    expect(equipaments?.length).toBe(0);
  });
});
