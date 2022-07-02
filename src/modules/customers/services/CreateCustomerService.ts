import Customer from '../typeorm/entities/Customer';
import { getCustomRepository } from 'typeorm';
import CustomerRepository from '../typeorm/repositories/CustomerRepository';
interface IRequest {
  name: string;
  email: string;
}

export default class CreateCustomerService {
  public async execute({ name, email }: IRequest): Promise<Customer> {
    const customerRepository = await getCustomRepository(CustomerRepository);
    const customer = customerRepository.create({ name, email });
    await customerRepository.save(customer);
    return customer;
  }
}
