import { Router } from 'express';
import { getDocumentsTypes } from '../controllers/documentType';
import { getJourneys } from '../controllers/journey';
import { getRequestByIdAndIdSender, saveRequest } from '../controllers/request';
import { geSubtypeRequest } from '../controllers/requestSubtype';
import { getTypeRequest } from '../controllers/requestType';
export const router = Router();



// Typesdocuments
router.get('/documents', getDocumentsTypes)

// Journeys
router.get('/journeys', getJourneys)

// Request Type
router.get('/requestype', getTypeRequest)

// Request Subtype
router.get('/requessubtype', geSubtypeRequest)

// Request
router.get('/request/:code/:idsender', getRequestByIdAndIdSender)
router.post('/request', saveRequest)


















