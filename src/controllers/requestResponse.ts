import { responseHttpService } from '../helpers/responseHttp';
import { ResponseHttpService } from '../interfaces/Http';
import RequestResponse from '../models/RequestResponse';

export async function responseRequest(req: any, res: any): Promise<ResponseHttpService> {
  try {
    const { idrequest } = req.params;
    // Actualizar finally en request
    const responseRequest = new RequestResponse({})

    // const requestFind = await Request.findOne({Id: code, IdSender: idsender});
    return responseHttpService(200, requestFind, '', true, res);
  } catch (error: any) {
    return responseHttpService(500, null, error?.message, false, res);
  }
}