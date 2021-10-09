import { responseHttpService } from '../helpers/responseHttp';
import { ResponseHttpService } from '../interfaces/Http';
import DocumentType from '../models/DocumentType';

export async function getDocumentsTypes(req: any, res: any): Promise<ResponseHttpService> {
  try {
    const types = await DocumentType.find();
    return responseHttpService(200, types, '', true, res);
  } catch (error: any) {
    return responseHttpService(500, null, error?.message, false, res);

  }
}