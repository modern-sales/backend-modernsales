import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import './types';

@Injectable()
export class VerifyTokenMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'] as string;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      jwt.verify(
        token,
        process.env.JWT_SEC as string,
        (err: any, decoded: any) => {
          if (err) throw new UnauthorizedException("You're not authenticated");

          (req as any).user = decoded;
          next();
        },
      );
    } else {
      throw new UnauthorizedException(
        "You're not authenticated, bad header token",
      );
    }
  }
}
