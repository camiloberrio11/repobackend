import { responseHttpService } from '../helpers/responseHttp';
import { ResponseHttpService } from '../interfaces/Http';
import RequestType from '../models/RequestType';

export async function getTypeRequest(req: any, res: any): Promise<ResponseHttpService> {
  try {
    const requestTypes = await RequestType.find();
    return responseHttpService(200, requestTypes, '', true, res);
  } catch (error: any) {
    return responseHttpService(500, null, error?.message, false, res);

  }
}