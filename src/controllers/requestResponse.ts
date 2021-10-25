import { fixMongoDate } from '../helpers/formatDates';
import { responseHttpService } from '../helpers/responseHttp';
import { ResponseHttpService } from '../interfaces/Http';
import Request from '../models/Request';
import RequestResponse from '../models/RequestResponse';
import { sendEmail } from '../utils/sendEmail';
import {uploadFile} from '../utils/aws';

export async function responseRequest(req: any, res: any): Promise<ResponseHttpService> {
  try {
    const { idrequest } = req.params;
    const update: any = await Request.findOneAndUpdate(
      { _id: idrequest },
      { Finally: true },
      { new: true }
    );
    const infoRequest: any = await Request.findOne({_id: idrequest});
    const folder = `${infoRequest?.Id}/respuesta`
    const attachementOne = await uploadFile(req?.body?.attachmentOne, folder);
    const attachementTwo = await uploadFile(req?.body?.attachmentTwo, folder);
    const attachementThree = await uploadFile(req?.body?.attachmentThree, folder);

    const responseRequest = new RequestResponse({
      IdRequest: idrequest,
      Answer: req.body?.answer,
      AnswerDate:fixMongoDate(new Date().toISOString()),
      AttachmentOne: attachementOne,
      AttachmentTwo: attachementTwo,
      AttachmentThree: attachementThree,
    });
    await responseRequest.save();
    sendEmail(
      update?.EmailSender,
      `Respuesta a tu solicitud ${update?.Id}`,
      `Hemos actualizado el estado de tu solicitud, te invitamos a revisar la página web,
      en la cual mediante tu codigo de solicitud y número de documento registrado podrás ver el nuevo estado de su solicitud. <br> <br> Recuerda que tu código de solicitud es <b>${update.Id}</b>`
    );
    return responseHttpService(200, update, 'Actualizado', true, res);
  } catch (error: any) {
    return responseHttpService(500, null, error?.message, false, res);
  }
}

export async function getResponseByIdRequest(req: any, res: any): Promise<ResponseHttpService> {
  try {
    const { idrequest } = req.params;
    const response = await RequestResponse.findOne({ IdRequest: idrequest });
    return responseHttpService(200, response, '', true, res);
  } catch (error: any) {
    return responseHttpService(500, null, error?.message, false, res);
  }
}

export async function getAllInfoResponseAndRequest(
  req: any,
  res: any
): Promise<ResponseHttpService> {
  try {
    const { idresponse } = req.params;
    const response = await RequestResponse.findOne({ _id: idresponse }).populate({
      path: 'IdRequest',
      populate: [
        { path: 'CodeRequestType', model: 'RequestType' },
        { path: 'CodeRequestSubtype', model: 'RequestSubtype' },
        { path: 'Origin', model: 'Journey' },
        { path: 'Departure', model: 'Journey' },
        { path: 'DocumentTypeSender', model: 'DocumentType' },
      ],
    });
    return responseHttpService(200, response, '', true, res);
  } catch (error: any) {
    return responseHttpService(500, null, error?.message, false, res);
  }
}
