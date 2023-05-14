import { Injectable } from '@nestjs/common';
import { User } from '@modules/users/models/user.model';

@Injectable()
export class AuthService {

    async validateOTP(otp: string) {
        console.log('validateOTP', otp);
        return otp;
    }
}
