import IPaginateCompany from '@modules/company/interfaces/IPaginateCompany';
import AppError from '@shared/errors/AppError';
import { EntityRepository, Repository } from 'typeorm';
import Company from '../entities/Company';

@EntityRepository(Company)
class CompanyRepository extends Repository<Company> {
  public async findCompanyById(id: string): Promise<Company> {
    const company = await this.findOne({ id });
    if (!company) {
      throw new AppError(`Company not found`);
    }
    return company;
  }
  public async findWithTrashed(
    withDeleted: boolean,
  ): Promise<IPaginateCompany> {
    const query = this.createQueryBuilder('company');
    if (withDeleted) await query.softDelete();
    const companies = await query.paginate();
    return companies as IPaginateCompany;
  }
  public async findOneWithTrashed(
    id: string,
    withDeleted: boolean,
  ): Promise<Company | undefined> {
    return await this.findOne(id, {
      withDeleted: withDeleted,
    });
  }
  public async findCompanyByDocumentNumber(
    documentNumber: string,
  ): Promise<Company | undefined> {
    return await this.findOne({ document_number: documentNumber });
  }
}
export default CompanyRepository;
