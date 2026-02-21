import { Router } from 'express'
import {
  receiveCSPReport,
  getCSPReports,
  deleteCSPReports,
} from './csp.controller.js'

const router = Router()

router.post('/report', receiveCSPReport)
router.get('/reports', getCSPReports)
router.delete('/reports', deleteCSPReports)

export { router as cspRouter }
