import httpStatus from 'http-status'

export interface IErrorResponse {
  message: string
  statusCode: number
  status: string
  serializeErrors(): IError
}

export interface IError {
  message: string
  statusCode: number
  status: string
}

export abstract class CustomError extends Error {
  abstract statusCode: number
  abstract status: string

  constructor(message: string) {
    super(message)
  }

  serializeErrors(): IError {
    return {
      message: this.message,
      statusCode: this.statusCode,
      status: this.status,
    }
  }
}

export class JoiRequestValidationError extends CustomError {
  statusCode = httpStatus.BAD_REQUEST
  status = 'error'

  constructor(message: string) {
    super(message)
  }
}

export class BadRequestError extends CustomError {
  statusCode = httpStatus.BAD_REQUEST
  status = 'error'

  constructor(message: string) {
    super(message)
  }
}

export class NotFoundError extends CustomError {
  statusCode = httpStatus.NOT_FOUND
  status = 'error'

  constructor(message: string) {
    super(message)
  }
}

export class UnAuthorizedError extends CustomError {
  statusCode = httpStatus.UNAUTHORIZED
  status = 'error'

  constructor(message: string) {
    super(message)
  }
}

export class FileTooLargeError extends CustomError {
  statusCode = httpStatus.REQUEST_TIMEOUT
  status = 'error'

  constructor(message: string) {
    super(message)
  }
}

export class ServerError extends CustomError {
  statusCode = httpStatus.SERVICE_UNAVAILABLE
  status = 'error'

  constructor(message: string) {
    super(message)
  }
}
