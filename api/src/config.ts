import dotenv from 'dotenv'
import cloudinary from 'cloudinary'
import bunyan from 'bunyan'
dotenv.config({})

class Config {
  public PORT: string | undefined
  public DB_URI: string | undefined
  public JWT_TOKEN: string | undefined
  public NODE_ENV: string | undefined
  public CLOUD_NAME: string | undefined
  public CLIENT_URL: string | undefined
  public REDIS_CONN: string | undefined
  public CLOUD_API_KEY: string | undefined
  public CLOUD_API_SECRET: string | undefined

  constructor() {
    this.PORT = process.env.PORT as string
    this.DB_URI = process.env.DB_URI as string
    this.JWT_TOKEN = process.env.JWT_TOKEN as string
    this.NODE_ENV = process.env.NODE_ENV as string
    this.CLIENT_URL = process.env.CLIENT as string
    this.REDIS_CONN = process.env.REDIS_CONN as string
    this.CLOUD_NAME = process.env.CLOUD_NAME as string
    this.CLOUD_API_KEY = process.env.CLOUD_API_KEY as string
    this.CLOUD_API_SECRET = process.env.CLOUD_API_SECRET as string
  }

  public createLogger(name: string): bunyan {
    return bunyan.createLogger({
      name,
      level: 'debug',
    })
  }

  public validateConfig(): void {
    for (const [key, value] of Object.entries(this)) {
      if (value === undefined) {
        throw new Error(`Configuration ${key} is undefined`)
      }
    }
  }

  public cloudinaryConfig(): void {
    cloudinary.v2.config({
      cloud_name: this.CLOUD_NAME,
      api_key: this.CLOUD_API_KEY,
      api_secret: this.CLOUD_API_SECRET,
    })
  }
}

export const config: Config = new Config()
