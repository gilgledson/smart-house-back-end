import { Request, Response } from 'express';
import CreateCompanyService from '../services/CreateCompanyService';
import DeleteCompanyService from '../services/DeleteCompanyService';
import ListCompanyService from '../services/ListCompanyService';
import RestoreCompanyService from '../services/RestoreCompanyService';
import ShowCompanyService from '../services/ShowCompanyService';
import UpdateCompanyService from '../services/UpdateCompanyService';

export default class CompanyController {
  public async save(request: Request, response: Response): Promise<Response> {
    const companyService = new CreateCompanyService();
    const { name, document_number, state, domain, city, status, street } =
      await request.body;
    const company = await companyService.execute({
      name,
      document_number,
      state,
      domain,
      city,
      status,
      street,
    });
    return response.json(company);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const companyService = new UpdateCompanyService();
    const companyId = await request.params.id;
    const { name, document_number, state, domain, city, status, street } =
      await request.body;
    const company = await companyService.execute(companyId, {
      name,
      document_number,
      state,
      domain,
      city,
      status,
      street,
    });
    return response.json(company);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const companyService = new ListCompanyService();
    const witTrashed = (await request.query.withTrashed) ? true : false;
    const companies = await companyService.execute(witTrashed);
    return response.json(companies);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const companyService = new ShowCompanyService();
    const company = await companyService.execute(request.params.id);
    return response.json(company);
  }
  public async restore(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const companyService = new RestoreCompanyService();
    const company = await companyService.execute(request.params.id);
    return response.json(company);
  }
  public async delete(request: Request, response: Response): Promise<Response> {
    const companyService = new DeleteCompanyService();
    const company = await companyService.execute(request.params.id);
    return response.json(company);
  }
}
