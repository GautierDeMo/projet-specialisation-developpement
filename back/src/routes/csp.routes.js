import express, { raw } from 'express'
import {
  receiveCSPReport,
  getCSPReports,
  deleteCSPReports,
} from '../csp/csp.controller.js'

const router = express.Router()

const cspBodyParser = express.json({
  type: [
    'application/json',
    'application/csp-report',
    'application/reports+json',
  ],
})

router.post('/csp/report', cspBodyParser, receiveCSPReport)
router.get('/csp/reports', getCSPReports)
router.delete('/csp/reports', deleteCSPReports)

export default router
