import Company from '../typeorm/entities/Company';

interface IPaginateCompany {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: Company[];
}
export default IPaginateCompany;
