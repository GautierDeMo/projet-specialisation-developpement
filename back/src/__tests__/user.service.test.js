import { jest, describe, it, expect, beforeEach } from '@jest/globals'

// Mock the Prisma client BEFORE importing the service (required for ESM)
jest.unstable_mockModule('../orm/client.js', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    token: {
      create: jest.fn(),
      findFirst: jest.fn(),
      deleteMany: jest.fn(),
    },
  },
}))

// Dynamic imports after mocking (required for ESM)
const {
  hash,
  compare,
  generatePayload,
  generateToken,
  findByEmail,
  create,
  saveRefreshToken,
  findRefreshToken,
  deleteRefreshToken,
} = await import('../users/user.service.js')

const { prisma } = await import('../orm/client.js')

beforeEach(() => {
  jest.clearAllMocks()
})

// --- hash ---

describe('hash', () => {
  it('returns a string different from the original input', async () => {
    const result = await hash('MyPassword1!')
    expect(result).not.toBe('MyPassword1!')
    expect(typeof result).toBe('string')
  })

  it('generates different hashes for the same input (bcrypt salt)', async () => {
    const hash1 = await hash('MyPassword1!')
    const hash2 = await hash('MyPassword1!')
    expect(hash1).not.toBe(hash2)
  })
})

// --- compare ---

describe('compare', () => {
  it('returns true when text matches the hash', async () => {
    const hashed = await hash('MyPassword1!')
    const result = await compare('MyPassword1!', hashed)
    expect(result).toBe(true)
  })

  it('returns false when text does not match the hash', async () => {
    const hashed = await hash('MyPassword1!')
    const result = await compare('OtherPassword1!', hashed)
    expect(result).toBe(false)
  })
})

// --- generatePayload ---

describe('generatePayload', () => {
  it('returns an object with sub (id) and email', () => {
    const user = { id: 42, email: 'user@example.com', password: 'hashed' }
    const payload = generatePayload(user)
    expect(payload).toEqual({ sub: 42, email: 'user@example.com' })
  })

  it('does not include the password', () => {
    const user = { id: 1, email: 'user@example.com', password: 'secret' }
    const payload = generatePayload(user)
    expect(payload).not.toHaveProperty('password')
  })
})

// --- generateToken ---

describe('generateToken', () => {
  it('returns a valid JWT with 3 dot-separated segments', () => {
    const payload = { sub: 1, email: 'user@example.com' }
    const token = generateToken(payload, 'test-secret', '1h')
    expect(token.split('.')).toHaveLength(3)
  })
})

// --- findByEmail ---

describe('findByEmail', () => {
  it('calls prisma.user.findUnique with the correct email', async () => {
    const mockUser = { id: 1, email: 'user@example.com', password: 'hashed' }
    prisma.user.findUnique.mockResolvedValue(mockUser)

    const result = await findByEmail('user@example.com')

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: 'user@example.com' },
    })
    expect(result).toEqual(mockUser)
  })

  it('returns null when the user does not exist', async () => {
    prisma.user.findUnique.mockResolvedValue(null)

    const result = await findByEmail('unknown@example.com')

    expect(result).toBeNull()
  })
})

// --- create ---

describe('create', () => {
  it('calls prisma.user.create with email and password, omitting password from result', async () => {
    const mockUser = { id: 1, email: 'user@example.com' }
    prisma.user.create.mockResolvedValue(mockUser)

    const result = await create('user@example.com', 'hashedpassword')

    expect(prisma.user.create).toHaveBeenCalledWith({
      data: { email: 'user@example.com', password: 'hashedpassword' },
      omit: { password: true },
    })
    expect(result).toEqual(mockUser)
  })
})

// --- saveRefreshToken ---

describe('saveRefreshToken', () => {
  it('hashes the token before saving it (does not store raw token)', async () => {
    prisma.token.create.mockResolvedValue({ id: 1 })
    const rawToken = 'raw-refresh-token'

    await saveRefreshToken(1, rawToken, new Date())

    const savedToken = prisma.token.create.mock.calls[0][0].data.token
    expect(savedToken).not.toBe(rawToken)
    expect(savedToken).toHaveLength(64) // SHA-256 hex digest = 64 chars
  })

  it('saves with the correct userId and expiration date', async () => {
    prisma.token.create.mockResolvedValue({ id: 1 })
    const expiredAt = new Date('2030-01-01')

    await saveRefreshToken(42, 'raw-token', expiredAt)

    const callData = prisma.token.create.mock.calls[0][0].data
    expect(callData.userId).toBe(42)
    expect(callData.expiredAt).toEqual(expiredAt)
  })
})

// --- findRefreshToken ---

describe('findRefreshToken', () => {
  it('hashes the token before querying the database', async () => {
    prisma.token.findFirst.mockResolvedValue(null)
    const rawToken = 'raw-refresh-token'

    await findRefreshToken(rawToken)

    const searchedToken = prisma.token.findFirst.mock.calls[0][0].where.token
    expect(searchedToken).not.toBe(rawToken)
    expect(searchedToken).toHaveLength(64)
  })

  it('returns the token record found in the database', async () => {
    const stored = { id: 1, token: 'hashed', userId: 1, expiredAt: new Date() }
    prisma.token.findFirst.mockResolvedValue(stored)

    const result = await findRefreshToken('raw-token')

    expect(result).toEqual(stored)
  })
})

// --- deleteRefreshToken ---

describe('deleteRefreshToken', () => {
  it('hashes the token before deleting from the database', async () => {
    prisma.token.deleteMany.mockResolvedValue({ count: 1 })
    const rawToken = 'raw-refresh-token'

    await deleteRefreshToken(rawToken)

    const deletedToken = prisma.token.deleteMany.mock.calls[0][0].where.token
    expect(deletedToken).not.toBe(rawToken)
    expect(deletedToken).toHaveLength(64)
  })
})
