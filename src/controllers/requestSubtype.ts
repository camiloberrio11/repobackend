import { responseHttpService } from '../helpers/responseHttp';
import { ResponseHttpService } from '../interfaces/Http';
import RequestSubType from '../models/RequestSubType';

export async function geSubtypeRequest(req: any, res: any): Promise<ResponseHttpService> {
  try {
    const requestSubtypes = await RequestSubType.find();
    return responseHttpService(200, requestSubtypes, '', true, res);
  } catch (error: any) {
    return responseHttpService(500, null, error?.message, false, res);

  }
}