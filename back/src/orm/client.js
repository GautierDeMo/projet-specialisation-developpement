// TODO: Cela peut être à adapter à notre projet, vient de la doc de Prisma
// https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/postgresql

import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../../generated/prisma/client.ts'

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

export { prisma }
