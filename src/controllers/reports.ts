import { responseHttpService } from '../helpers/responseHttp';
import { ResponseHttpService } from '../interfaces/Http';
import Request from '../models/Request';

export async function reportGeneralPqrs(req: any, res: any): Promise<ResponseHttpService> {
  try {
    const responsePending = await Request.find({ Finally: false }).count();
    const responseFinally = await Request.find({ Finally: true }).count();
    const response = {
      total: responsePending + responseFinally,
      pending: responsePending,
      finally: responseFinally,
    };
    return responseHttpService(200, response, '', true, res);
  } catch (error: any) {
    return responseHttpService(500, null, error?.message, false, res);
  }
}

export async function getAmountByMonth(req: any, res: any): Promise<ResponseHttpService> {
  try {
    const response = await Request.aggregate([
      {
        $project: {
          month: { $month: { $toDate: '$EventDate' } },
        },
      },
      {
        $group: {
          _id: { month: '$month' },
          numberrequest: { $sum: 1 },
        },
      },
    ]);
    return responseHttpService(200, response, '', true, res);
  } catch (error: any) {
    return responseHttpService(500, null, error?.message, false, res);
  }
}

export async function getRequestByCodeType(req: any, res: any): Promise<ResponseHttpService> {
  try {
    const response = await Request.aggregate([
      { $group: { _id: '$CodeRequestType', count: { $sum: 1 } } },
      {
        $lookup: {
          from: 'requesttypes',
          localField: '_id',
          foreignField: '_id',
          as: 'requesttypes',
        },
      },
    ]);
    return responseHttpService(200, response, '', true, res);
  } catch (error: any) {
    return responseHttpService(500, null, error?.message, false, res);
  }
}

export async function getRequestByCodeSubtype(req: any, res: any): Promise<ResponseHttpService> {
  try {
    const response = await Request.aggregate([
      { $group: { _id: '$CodeRequestSubtype', count: { $sum: 1 } } },
      {
        $lookup: {
          from: 'requestsubtypes',
          localField: '_id',
          foreignField: '_id',
          as: 'requestsubtypes',
        },
      },
    ]);

    return responseHttpService(200, response, '', true, res);
  } catch (error: any) {
    return responseHttpService(500, null, error?.message, false, res);
  }
}


export async function getRequestByMonthByYear(req: any, res: any): Promise<ResponseHttpService> {
  try {
    const response = await Request.aggregate([
      {
          $project: {
              month: { $month: { $toDate: "$EventDate" } },
              year: {$year: {$toDate: "$EventDate"}}
          }
      },
      {
          $group: {
              _id: { month: "$month", year: "$year" },
              numberofbookings: { $sum: 1 }
          }
      }
  ]);
    return responseHttpService(200, response, '', true, res);
  } catch (error: any) {
    return responseHttpService(500, null, error?.message, false, res);
  }
}