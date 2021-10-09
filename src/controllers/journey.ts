import { responseHttpService } from '../helpers/responseHttp';
import { ResponseHttpService } from '../interfaces/Http';
import Journey from '../models/Journey';

export async function getJourneys(req: any, res: any): Promise<ResponseHttpService> {
  try {
    const journeys = await Journey.find();
    return responseHttpService(200, journeys, '', true, res);
  } catch (error: any) {
    return responseHttpService(500, null, error?.message, false, res);
  }
}