// session.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  use(req: any, res: any, next: NextFunction) {
    const sessionId = req.cookies['sessionId'];
    if (!sessionId) {
      res.status(401).send('Unauthorized');
      return;
    }
    // Check session validity here...
    next();
  }
}
