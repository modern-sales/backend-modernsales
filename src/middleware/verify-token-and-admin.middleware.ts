import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import './types';

@Injectable()
export class VerifyTokenAndAdminMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.user?.is_admin) {
      next();
    } else {
      throw new ForbiddenException('Not allowed, sorry (THIS IS ADMIN VERIFY)');
    }
  }
}
