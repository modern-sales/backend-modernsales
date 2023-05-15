import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@modules/users/models/user.model';

@Injectable()
export class JwtAuthGuard<TUser = User> extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest<TUser = User>(err: any, user: TUser, info: any, context: ExecutionContext, status?: any) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
