import { prisma } from '../orm/client.js'

export const receiveCSPReport = async (req, res) => {
  try {
    console.log('📨 CSP Violation Report Received:', req.body)

    const report = req.body['csp-report'] || req.body
    const blockedUri = report.blockedURL || report['blocked-uri'] || ''
    const documentUri =
      report.documentURL || report['document-uri'] || 'unknown'

    // ===== FILTRAGE DES FAUX POSITIFS =====

    if (
      blockedUri.includes('chrome-extension://') ||
      blockedUri.includes('moz-extension://') ||
      blockedUri.includes('safari-extension://') ||
      blockedUri.includes('webkit-masked-url://')
    ) {
      console.log(('Ignoring CSP violation from extension:', blockedUri))
      return res.sendStatus(204)
    }

    if (
      blockedUri === 'about:blank' ||
      blockedUri === 'about:' ||
      blockedUri === '' ||
      blockedUri === 'eval'
    ) {
      console.log('Ignoring CSP violation with blocked URI:', blockedUri)
      return res.sendStatus(204)
    }

    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
    const duplicate = await prisma.cspReport.findFirst({
      where: {
        documentUri: documentUri,
        blockedUri: blockedUri,
        createdAt: { gte: fiveMinutesAgo },
      },
    })

    if (duplicate) {
      console.log('Ignoring CSP violation with duplicate report:', blockedUri)
      return res.sendStatus(204)
    }

    await prisma.cspReport.create({
      data: {
        documentUri: documentUri,
        violatedDirective:
          report.effectiveDirective ||
          report['violated-directive'] ||
          'unknown',
        blockedUri: blockedUri,
        rawReport: JSON.stringify(req.body),
      },
    })

    console.log('CSP violation report saved to database')
    res.sendStatus(204)
  } catch (error) {
    console.error('Error processing CSP violation report:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getCSPReports = async (req, res) => {
  try {
    const reports = await prisma.cspReport.findMany({
      orderBy: { createdAt: 'desc' },
    })
    res.json(reports)
  } catch (error) {
    console.error('Error fetching CSP reports:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const deleteCSPReports = async (req, res) => {
  try {
    await prisma.cspReport.deleteMany({})
    res.status(204).send({ message: 'All CSP reports deleted' })
  } catch (error) {
    console.error('Error deleting CSP reports:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
