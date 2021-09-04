import { Http } from '@status/codes'

export class HttpError extends Error {
  status: number

  message: string

  constructor(status: number, message: string) {
    super()
    this.status = status
    this.message = message
  }
}

export class EmailNotFoundError extends HttpError {
  constructor() {
    super(Http.Unauthorized, 'Email not registered')
  }
}

export class AlreadyExistsError extends HttpError {
  constructor(subject: string) {
    super(Http.Conflict, `${subject} already registered`)
  }
}

export class WrongPasswordError extends HttpError {
  constructor() {
    super(Http.Unauthorized, 'Wrong password')
  }
}
