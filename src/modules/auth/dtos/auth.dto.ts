// auth.dto.ts
import { IsNotEmpty, IsEmail } from 'class-validator';

export class LoginOtpDTO {
  @IsNotEmpty()
  @IsEmail()
  email!: string;
}

export class SignupOtpDTO {
  @IsNotEmpty()
  @IsEmail()
  email!: string;
}

export class VerifyLoginOtpDTO {
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  otp!: string;
}

export class VerifySignupOtpDTO extends VerifyLoginOtpDTO {
  @IsNotEmpty()
  name!: string;
}
