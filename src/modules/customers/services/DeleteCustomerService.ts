import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import CustomerRepository from '../typeorm/repositories/CustomerRepository';

export default class DeleteCustomerService {
  public async execute(id: string): Promise<[]> {
    const customerRepository = await getCustomRepository(CustomerRepository);
    const customer = await customerRepository.findById(id);
    if (!customer) {
      throw new AppError('Customer not found');
    }
    await customerRepository.remove(customer);
    return [];
  }
}
