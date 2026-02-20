import express, { raw } from 'express'
import {
  receiveCSPReport,
  getCSPReports,
  deleteCSPReports,
} from '../csp/csp.controller.js'

const router = express.Router()

router.post('/csp/report', receiveCSPReport)
router.get('/csp/reports', getCSPReports)
router.delete('/csp/reports', deleteCSPReports)

export default router
