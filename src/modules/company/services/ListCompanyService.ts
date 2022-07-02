import Company from '../typeorm/entities/Company';
import { getCustomRepository } from 'typeorm';
import CompanyRepository from '../typeorm/repositories/CompanyRepository';
import IPaginateCompany from '@modules/company/interfaces/IPaginateCompany';

class ListCompanyService {
  public async execute(withTrashed = false): Promise<IPaginateCompany> {
    const companyRepository = await getCustomRepository(CompanyRepository);
    const companies = companyRepository.findWithTrashed(withTrashed);
    return companies;
  }
}
export default ListCompanyService;
