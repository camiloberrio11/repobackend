import { responseHttpService } from '../helpers/responseHttp';
import { ResponseHttpService } from '../interfaces/Http';
import Request from '../models/Request';
import RequestSubType from '../models/RequestSubType';
import RequestType from '../models/RequestType';
import User from '../models/User';

export async function getRequestByIdAndIdSender(req: any, res: any): Promise<ResponseHttpService> {
  try {
    const { code, idsender } = req.params;
    const requestFind = await Request.findOne({Id: code, IdSender: idsender});
    return responseHttpService(200, requestFind, '', true, res);
  } catch (error: any) {
    return responseHttpService(500, null, error?.message, false, res);
  }
}

export async function saveRequest(req: any, res: any): Promise<ResponseHttpService> {
  try {
    let consecutive = 1;
    const consecutiveCurrent = await Request.findOne().sort({Consecutive: -1}).limit(1);
    if (consecutiveCurrent) {
      consecutive = consecutiveCurrent?.Consecutive + 1;
    }
    const requestType = await RequestType.findOne({_id: req?.body?.codeRequestType});
    const requestSubtype = await RequestSubType.findOne({_id: req?.body?.codeRequestSubtype});
    const id = `${requestType?.Code}${requestSubtype?.Code}${consecutive}`;
    const requestNew = new Request({
      CodeRequestType: req?.body?.codeRequestType,
      CodeRequestSubtype: req?.body?.codeRequestSubtype,
      Consecutive: consecutive,
      Id: id,
      AssignedUser: null,
      Finally: false,
      AttachmentOne: req?.body?.attachmentOne,
      AttachmentTwo: req?.body?.attachmentTwo,
      AttachmentThree: req?.body?.attachmentThree,
      EventDate: new Date().toISOString(),
      SideVehicle: req?.body?.sideVehicle,
      IdVehicle: req?.body?.idVehicle,
      Detail: req?.body?.detail,
      Origin: req?.body?.origin,
      Departure: req?.body?.departure,
      DocumentTypeSender: req?.body?.documentTypeSender,
      IdSender: req?.body?.idSender,
      NameSender: req?.body?.nameSender,
      AddressSender: req?.body?.addressSender,
      EmailSender: req?.body?.emailSender,
      PhoneSender: req?.body?.phoneSender
    })
    await requestNew.save()
    return responseHttpService(200, null, 'Guardado exitosamente', true, res);
  } catch (error: any) {
    return responseHttpService(500, null, error?.message, false, res);
  }
}