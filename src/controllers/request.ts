import { fixMongoDate } from '../helpers/formatDates';
import { responseHttpService } from '../helpers/responseHttp';
import { AttachmentFile } from '../interfaces/Attachment';
import { ResponseHttpService } from '../interfaces/Http';
import Request from '../models/Request';
import RequestSubType from '../models/RequestSubType';
import RequestType from '../models/RequestType';
import User from '../models/User';
import { uploadFile } from '../utils/aws';
import { sendEmail } from '../utils/sendEmail';

export async function getRequestByIdAndIdSender(req: any, res: any): Promise<ResponseHttpService> {
  try {
    const { code, idsender } = req.params;
    const requestFind = await Request.findOne({ Id: code, IdSender: idsender })
      .populate({ path: 'CodeRequestType', model: 'RequestType' })
      .populate({ path: 'CodeRequestSubtype', model: 'RequestSubtype' })
      .populate({ path: 'Origin', model: 'Journey' })
      .populate({ path: 'Departure', model: 'Journey' })
      .populate({ path: 'DocumentTypeSender', model: 'DocumentType' });
    return responseHttpService(200, requestFind, '', true, res);
  } catch (error: any) {
    return responseHttpService(500, null, error?.message, false, res);
  }
}

export async function saveRequest(req: any, res: any): Promise<ResponseHttpService> {
  try {
    let consecutive = 1;
    const consecutiveCurrent: any = await Request.findOne({
      CodeRequestTypereq: req?.body?.codeRequestType,
      CodeRequestSubtype: req?.body?.codeRequestSubtype,
    })
      .sort({ Consecutive: -1 })
      .limit(1);
    if (consecutiveCurrent) {
      consecutive = +consecutiveCurrent?.Consecutive + 1;
    }
    const requestType: any = await RequestType.findOne({ _id: req?.body?.codeRequestType });
    const requestSubtype: any = await RequestSubType.findOne({
      _id: req?.body?.codeRequestSubtype,
    });
    const id = `${requestType?.Code}${requestSubtype?.Code}${consecutive}`;
    const file1 = await uploadFile(req?.body?.attachmentOne, id);
    const file2 = await uploadFile(req?.body?.attachmentTwo, id);
    const file3 = await uploadFile(req?.body?.attachmentThree, id);

    const requestNew = new Request({
      CodeRequestType: req?.body?.codeRequestType,
      CodeRequestSubtype: req?.body?.codeRequestSubtype,
      Consecutive: consecutive,
      Id: id,
      AssignedUser: null,
      Finally: false,
      AttachmentOne: file1,
      AttachmentTwo: file2,
      AttachmentThree: file3,
      EventDate: fixMongoDate(new Date().toISOString()),
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
      PhoneSender: req?.body?.phoneSender,
    });
    await requestNew.save();
    sendEmail(
      req?.body?.emailSender,
      'Se ha generado tu PQRS',
      `Hemos generado con éxito tu PQRS, puedes consultar en nuestro sitio web en cualquier momento con el siguiente id <b>${id}</b> y con tu número de identificación que registraste al momento de realizar la solicitud`
    );
    return responseHttpService(200, null, id, true, res);
  } catch (error: any) {
    return responseHttpService(500, null, error, false, res);
  }
}

export async function getRequestOpen(req: any, res: any): Promise<ResponseHttpService> {
  try {
    const query: any = {
      Finally: req?.body?.closed,
    };
    if (!req?.body?.admin) {
      query.AssignedUser = req?.body?.user;
    }
    let options = {
      limit: Number(req?.body?.limit || 10),
      page: Number(req?.body?.page || 1),
      sort: { _id: -1 },
      populate: [
        { path: 'CodeRequestType', model: 'RequestType' },
        { path: 'CodeRequestSubtype', model: 'RequestSubtype' },
        { path: 'Origin', model: 'Journey' },
        { path: 'Departure', model: 'Journey' },
        { path: 'DocumentTypeSender', model: 'DocumentType' },
      ],
    };
    let response: any;
    let totalDocs = 0;
    if (query?.Finally) {
      response = await Request.paginate(query, options);
      totalDocs = response?.totalDocs;
      response = response?.docs;
    } else {
      response = await Request.find(query)
        .populate({ path: 'CodeRequestType', model: 'RequestType' })
        .populate({ path: 'CodeRequestSubtype', model: 'RequestSubtype' })
        .populate({ path: 'Origin', model: 'Journey' })
        .populate({ path: 'Departure', model: 'Journey' })
        .populate({ path: 'DocumentTypeSender', model: 'DocumentType' });
    }
    return responseHttpService(200, response, `${totalDocs}`, true, res);
  } catch (error: any) {
    return responseHttpService(500, null, error?.message, false, res);
  }
}

export async function assignRequest(req: any, res: any): Promise<ResponseHttpService> {
  try {
    const { idrequest } = req.params;
    await Request.findOneAndUpdate({ _id: idrequest }, { AssignedUser: req?.body?.assignedUser });
    return responseHttpService(200, null, 'Actualizado', true, res);
  } catch (error: any) {
    return responseHttpService(500, null, error?.message, false, res);
  }
}
