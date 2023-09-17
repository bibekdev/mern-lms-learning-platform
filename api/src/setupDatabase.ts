import mongoose from 'mongoose'
import { Redis } from 'ioredis'
import Logger from 'bunyan'
import { config } from './config'

const logger: Logger = config.createLogger('DB')

export const redis = new Redis(config.REDIS_CONN!)

export default () => {
  const connect = () => {
    mongoose
      .connect(`${config.DB_URI}`)
      .then(() => {
        logger.info('DB connection established')
      })
      .catch(error => {
        logger.error(error)
        return process.exit(1)
      })
  }
  connect()

  mongoose.connection.on('disconnected', connect)
}
