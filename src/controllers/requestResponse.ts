import { responseHttpService } from '../helpers/responseHttp';
import { ResponseHttpService } from '../interfaces/Http';
import Request from '../models/Request';
import RequestResponse from '../models/RequestResponse';

export async function responseRequest(req: any, res: any): Promise<ResponseHttpService> {
  try {
    const { idrequest } = req.params;
    const update = await Request.findOneAndUpdate({ _id: idrequest }, { Finally: true }, { new: true });
    const responseRequest = new RequestResponse({
      IdRequest: idrequest,
      Answer: req.body?.answer,
      AnswerDate: new Date().toISOString(),
      AttachmentOne: req?.body?.attachmentOne,
      AttachmentTwo: req?.body?.attachmentTwo,
      AttachmentThree: req?.body?.attachmentThree,
    });
    await responseRequest.save()
    return responseHttpService(200, update, 'Actualizado', true, res);
  } catch (error: any) {
    return responseHttpService(500, null, error?.message, false, res);
  }
}
