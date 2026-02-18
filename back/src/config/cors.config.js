const allowedOrigins = ['http://localhost:5000']

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },

  credentials: true,

  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],

  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-CSRF-Token',
    'X-Requested-With',
    'Accept',
    'Origin',
  ],

  optionsSuccessStatus: 204,

  exposedHeaders: ['Content-Type', 'Authorization'],
}

export const publicCorsOptions = {
  origin: '*',
  methods: ['GET', 'OPTIONS'],
  optionsSuccessStatus: 204,
}

export default corsOptions
