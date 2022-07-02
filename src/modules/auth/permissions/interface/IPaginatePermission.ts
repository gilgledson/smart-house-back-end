import Permissions from '../typeorm/entities/permission';

interface IPaginatePermission {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: Permissions[];
}
export default IPaginatePermission;
