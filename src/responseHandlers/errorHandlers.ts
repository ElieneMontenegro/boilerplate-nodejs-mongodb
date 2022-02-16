import { httpStatusCodes } from "./statusCodes";

export class BaseError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);

    this.status = status;

    Object.setPrototypeOf(this, BaseError.prototype);
  }
}

export class NotFound extends BaseError {
  object: string;

  constructor(object: string) {
    super(`${object} not found`, httpStatusCodes.NOT_FOUND);

    this.object = object;

    Object.setPrototypeOf(this, NotFound.prototype);
  }
}

export class BadRequest extends BaseError {
  constructor(message?: string) {
    super(
      message ?? `Check request body and try again`,
      httpStatusCodes.BAD_REQUEST
    );

    Object.setPrototypeOf(this, BadRequest.prototype);
  }
}

export class InternalError extends BaseError {
  constructor() {
    super(`Internal error`, httpStatusCodes.INTERNAL_SERVER_ERROR);

    Object.setPrototypeOf(this, NotFound.prototype);
  }
}
