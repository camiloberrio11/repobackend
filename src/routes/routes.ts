import { Router } from 'express';
import { login } from '../controllers/auth';
import { getDocumentsTypes } from '../controllers/documentType';
import { getJourneys } from '../controllers/journey';
import { getRequestByCodeSubtype, getRequestByCodeType, getRequestByMonthByYear, reportGeneralPqrs } from '../controllers/reports';
import { getAllInfoResponseAndRequest, getResponseByIdRequest, responseRequest } from '../controllers/requestResponse';
import { geSubtypeRequest } from '../controllers/requestSubtype';
import { getTypeRequest } from '../controllers/requestType';
import { getUsersInRoles } from '../controllers/user';
import { assignRequest, getRequestByIdAndIdSender, getRequestOpen, saveRequest } from '../controllers/request';
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
router.put('/request/assign/:idrequest', assignRequest)

// Response request
router.post('/response/:idrequest', responseRequest)
router.get('/response/:idrequest', getResponseByIdRequest)
router.get('/response/all/:idresponse', getAllInfoResponseAndRequest)


// Reports
router.get('/report/general', reportGeneralPqrs)
router.get('/report/date', getRequestByMonthByYear)
router.get('/report/subtype', getRequestByCodeSubtype)
router.get('/report/type', getRequestByCodeType)

// Login
router.post('/login', login)


















