import express, { Express } from 'express'
import { Server } from './setupServer'
import { config } from './config'
import databaseConnection from './setupDatabase'

class Application {
  public bootstrap(): void {
    this.loadConfig()
    databaseConnection()
    const app: Express = express()
    const server: Server = new Server(app)
    server.start()
  }

  private loadConfig(): void {
    config.validateConfig()
    config.cloudinaryConfig()
  }
}

const application: Application = new Application()
application.bootstrap()
