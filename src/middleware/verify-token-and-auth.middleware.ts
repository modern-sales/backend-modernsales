import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import './types';

@Injectable()
export class VerifyTokenAndAuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.user.id === req.params.id || req.user.is_admin) {
      next();
    } else {
      throw new ForbiddenException('Not allowed, sorry');
    }
  }
}
