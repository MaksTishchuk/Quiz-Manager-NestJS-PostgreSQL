import {HttpException, HttpStatus, NestMiddleware} from "@nestjs/common";
import {NextFunction, Request, Response} from 'express'
import {ApiTokenException} from "../exceptions/api-token-exception";

export class ApiTokenCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): any {
    if (!req.headers['authorization']) {
      // console.log(req.headers['authorization'].split(' ')[1])
      // throw new HttpException('Access denied!', HttpStatus.FORBIDDEN)
      throw new ApiTokenException()
    }
    next()
  }
}