import { Request, Response as Res } from 'express';
import { ExpressErrorMiddlewareInterface, HttpError, Middleware } from 'routing-controllers';
import { EntityNotFoundError } from 'typeorm';

type Errors<T> = HttpError | Error

@Middleware({ type: 'after' })
/**
 * Global error handler
 */
export class GlobalErrorHandler implements ExpressErrorMiddlewareInterface {
  async error<T>(error: Errors<T>, request: { traceId: string } & Request, res: Res): Promise<void> {
    console.log(error);
    let err;
    if (error instanceof EntityNotFoundError) {
      err = { statusCode: 404, message: "EntityNotFound" }
    } else {
      err = { statusCode: 500, message: "Internal Server Error" }
    }

    res.status(err.statusCode).json(err);
  }
}