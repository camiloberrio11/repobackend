import { responseHttpService } from '../helpers/responseHttp';
import { ResponseHttpService } from '../interfaces/Http';
import Rol from '../models/Rol';
import User from '../models/User';
import { loginExternal } from '../utils/external';

export async function login(req: any, res: any): Promise<ResponseHttpService> {
  try {
    const loginExt = await loginExternal(req?.body?.username, req?.body?.password);
    if (loginExt) {
      const [rolCurrent] = loginExt?.groups;
      const roles = await Rol.find({});
      const existPqrRol = roles.filter((rol: any) => rol.Name === rolCurrent);
      if (existPqrRol?.length < 1) {
        return responseHttpService(400, null, 'No tiene rol asociado', false, res);
      }
      const existAdmin = existPqrRol.find((item: any) => item?.Name?.includes('ADMIN'));
      const user: any = await User.findOneAndUpdate(
        { Nameuser: req?.body?.username },
        {
          Nameuser: req?.body?.username,
          Role: existPqrRol[0]?._id,
          Name: `${loginExt?.first_name} ${loginExt?.last_name}`,
        },
        { upsert: true, new: true }
      );
      return responseHttpService(
        200,
        {
          admin: !!existAdmin,
          manager: !existAdmin,
          user: user?._id,
          nameuser: user?.Name,
        },

        '',
        true,
        res
      );
    }
    return responseHttpService(400, null, 'Login fallido', false, res);
  } catch (error: any) {
    return responseHttpService(500, null, error?.message, false, res);
  }
}
