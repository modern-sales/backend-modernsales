import { Injectable } from '@nestjs/common';
import { User } from '../users/users.model';

@Injectable()
export class AuthService {

    async validateOTP(otp: string) {
        console.log('validateOTP', otp);
        return otp;
    }
}
