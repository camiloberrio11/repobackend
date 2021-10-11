import { Router } from 'express';
import { getDocumentsTypes } from '../controllers/documentType';
import { getJourneys } from '../controllers/journey';
import { getRequestByIdAndIdSender, getRequestOpen, saveRequest } from '../controllers/request';
import { getResponseByIdRequest, responseRequest } from '../controllers/requestResponse';
import { geSubtypeRequest } from '../controllers/requestSubtype';
import { getTypeRequest } from '../controllers/requestType';
import { getUsersInRoles } from '../controllers/user';
export const router = Router();

// Typesdocuments
router.get('/documents', getDocumentsTypes)

// Users
router.get('/users', getUsersInRoles)

// Journeys
router.get('/journeys', getJourneys)

// Request Type
router.get('/requestype', getTypeRequest)

// Request Subtype
router.get('/requessubtype', geSubtypeRequest)

// Request
router.get('/request/:code/:idsender', getRequestByIdAndIdSender)
router.post('/request', saveRequest)
router.post('/request/status', getRequestOpen)

// Response request
router.post('/response/:idrequest', responseRequest)
router.get('/response/:idrequest', getResponseByIdRequest)


// Reports
// router.post('/report/requestmonth', )
// router.post('/report/requestuser', )
// router.post('/report/requestmonth', )




















