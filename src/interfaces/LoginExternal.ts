export interface LoginAuthExternal {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  empresa: string;
  email: string;
  documento: string;
  telefono?: any;
  token: string;
  secondary_hash: string;
  groups: string[];
  permissions: any[];
}
