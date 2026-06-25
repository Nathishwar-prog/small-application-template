import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export interface SuccessResponseOptions<T> {
  res: Response;
  statusCode?: number;
  message?: string;
  data?: T;
  meta?: Record<string, unknown>;
}

export class ResponseHelper {
  public static success<T>({
    res,
    statusCode = StatusCodes.OK,
    message = 'Success',
    data,
    meta,
  }: SuccessResponseOptions<T>): Response {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      meta,
    });
  }

  public static created<T>(
    res: Response,
    data?: T,
    message: string = 'Created successfully',
  ): Response {
    return this.success({
      res,
      statusCode: StatusCodes.CREATED,
      message,
      data,
    });
  }

  public static noContent(res: Response, message: string = 'No content'): Response {
    return res.status(StatusCodes.NO_CONTENT).json({
      success: true,
      message,
    });
  }
}

export default ResponseHelper;
