export enum Errors {
  INVALID_PARAMETERS = 'INVALID_PARAMETERS',
  ALREADY_EXIST = 'ALREADY_EXIST',
  NOT_FOUND = 'NOT_FOUND',
  BAD_CREDENTIALS = 'BAD_CREDENTIALS',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  SERVER_ERROR = 'SERVER_ERROR'
}

export class CustomError extends Error {
  public readonly code: string;
  public readonly details: any;
  constructor(code: Errors, message: string) {
    super();
    this.code = code;
    this.message = message;
  }
}
