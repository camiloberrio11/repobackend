import { Router } from 'express';
import { getDocumentsTypes } from '../controllers/documentType';
import { getJourneys } from '../controllers/journey';
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















