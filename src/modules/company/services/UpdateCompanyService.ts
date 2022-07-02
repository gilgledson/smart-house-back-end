import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Company from "../typeorm/entities/Company";
import CompanyRepository from '../typeorm/repositories/CompanyRepository';
interface IRequest {
    name: string;
    document_number: string;
    status: number;
    domain: string;
    city: string;
    state: string;
    street: string;
}
class UpdateCompanyService {
    public async execute(id: string, {name, document_number, status, domain, city, state, street}: IRequest): Promise<Company> {
        const companyRepository = getCustomRepository(CompanyRepository);
        const company = await companyRepository.findCompanyById(id);
        if(!company){
            throw new AppError(`company not found`);
        }
        const companyExists = await companyRepository.findCompanyByDocumentNumber(document_number);
        if(companyExists && companyExists.id !== id){
            throw new AppError(`document number ${document_number} already used`, 422);
        }
        company.name            = name;
        company.document_number = document_number;
        company.status          = status;
        company.domain          = domain;
        company.city            = city;
        company.state           = state;
        company.street          = street;
        await companyRepository.save(company);
        return company;
    }
}
export default UpdateCompanyService;