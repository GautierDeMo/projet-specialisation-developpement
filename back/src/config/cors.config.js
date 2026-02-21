import "dotenv/config"

const allowedOrigins = [`http://localhost:${process.env.FRONT_PORT}`, `https://localhost:${process.env.FRONT_PORT}`]

var dynamicCorsOptions = function (req, callback) {
  let corsOptions

  if (req.path.startsWith('/api/stats')) {
    corsOptions = {
      origin: '*',
      methods: ['GET', 'OPTIONS'],
      optionsSuccessStatus: 204,
      allowedHeaders: ['Content-Type', 'Authorization'],
    }
  } else {
    corsOptions = {
      origin: (origin, cb) => {
        if (!origin || allowedOrigins.includes(origin)) {
          cb(null, true)
        } else {
          cb(new Error('Not allowed by CORS'))
        }
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
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
  }

  callback(null, corsOptions)
}

export default dynamicCorsOptions
