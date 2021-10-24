import { responseHttpService } from '../helpers/responseHttp';
import { ResponseHttpService } from '../interfaces/Http';
import Rol from '../models/Rol';
import User from '../models/User';

export async function getUsersInRoles(req: any, res: any): Promise<ResponseHttpService> {
  try {
    const usersRol = await User.find({}).populate({ path: 'Role', model: 'Rol' });
    return responseHttpService(200, usersRol, '', true, res);
  } catch (error: any) {
    return responseHttpService(500, null, error?.message, false, res);
  }
}
