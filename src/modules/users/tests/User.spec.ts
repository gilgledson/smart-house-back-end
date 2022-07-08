import CreateUserService from '../services/CreateUserService';
import { faker } from '@faker-js/faker';
import { createConnection } from 'typeorm';
import connection from '../../../shared/typeorm/connection';
import ListUserServices from '../services/ListUserServices';

describe('Usuario do Sistema', () => {
  let createUser: CreateUserService;
  let listUser: ListUserServices;

  beforeAll(async () => {
    await connection.create();
    await connection.clear();
  });

  afterAll(async () => {
    await connection.clear();
  });

  beforeEach(async () => {
    createUser = new CreateUserService();
    listUser = new ListUserServices();
  });

  it('Criando usuario', async () => {
    const user = await createUser.execute({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
    expect(user).toHaveProperty('id');
  });
  it('listar usuario', async () => {
    const user = await listUser.execute();
    expect(user.length).toBe(1);
  });
});
