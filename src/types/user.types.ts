import { Role } from 'src/models/role.enum';

export interface User {
  id: string;
  username: string;
  password: string;
  email: string;
  roles: Role[];
}

export interface UserSearch {
  id: string;
  username: string;
  email: string;
  roles: Role[];
}
