import { Request, Response } from 'express';
import CreateCustomerService from '../services/CreateCustomerService';
import ShowCustomerService from '../services/ShowCustomerService';
import UpdateCustomerService from '../services/UpdateCustomerService';
import DeleteCustomerService from '../services/DeleteCustomerService';

export default class CustomerController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createCustomerService = new CreateCustomerService();
    const { name, email } = await request.body;
    const customer = await createCustomerService.execute({ name, email });
    return response.json(customer);
  }
  public async update(request: Request, response: Response): Promise<Response> {
    const updateCustomerService = new UpdateCustomerService();
    const { name, email } = await request.body;
    const id = await request.params.id;
    const customer = await updateCustomerService.execute({ id, name, email });
    return response.json(customer);
  }
  public async show(request: Request, response: Response): Promise<Response> {
    const showCustomerService = new ShowCustomerService();
    const id = await request.params.id;
    const customers = await showCustomerService.execute(id);
    return response.json(customers);
  }
  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteCustomerService = new DeleteCustomerService();
    const customer = await deleteCustomerService.execute(request.params.id);
    return response.json(customer);
  }
}
