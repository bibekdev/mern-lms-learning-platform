import { Application, NextFunction, Request, Response } from 'express'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import hpp from 'hpp'
import compression from 'compression'
import cors from 'cors'

import 'express-async-errors'
import httpStatus from 'http-status'
import { CustomError } from '@/shared/helpers/error-handler'
import Logger from 'bunyan'
import { config } from './config'

const logger: Logger = config.createLogger('server')

export class Server {
  private app: Application

  constructor(app: Application) {
    this.app = app
  }

  public start(): void {
    this.securityMiddleware(this.app)
    this.standardMiddleware(this.app)
    this.routeMiddleware(this.app)
    this.globalErrorHandler(this.app)
    this.startServer(this.app)
  }

  private securityMiddleware(app: Application): void {
    app.use(cookieParser())
    app.use(hpp())
    app.use(helmet())
    app.use(cors())
  }

  private standardMiddleware(app: Application): void {
    app.use(compression())
    app.use(bodyParser.json({ limit: '50mb' }))
    app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
  }

  private routeMiddleware(app: Application): void {}

  private globalErrorHandler(app: Application): void {
    app.all('*', (req: Request, res: Response) => {
      res
        .status(httpStatus.NOT_FOUND)
        .json({ message: `${req.originalUrl} not found` })
    })

    app.use(
      (error: CustomError, req: Request, res: Response, next: NextFunction) => {
        if (error instanceof CustomError) {
          return res.status(error.statusCode).json(error.serializeErrors())
        }
        next()
      }
    )
  }

  private startServer(app: Application) {
    app.listen(config.PORT, () => {
      logger.info(`Server running on port ${config.PORT}`)
    })
  }
}
