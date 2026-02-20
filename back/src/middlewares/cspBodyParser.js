import express from 'express'

export const cspBodyParser = express.json({
  type: [
    'application/json',
    'application/csp-report',
    'application/reports+json',
  ],
})
