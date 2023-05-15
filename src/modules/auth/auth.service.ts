import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async signUp(user: { email: string; password: string; name: string }) {
    // Implement user sign-up logic
  }

  async login(credentials: { email: string; password: string }) {
    // Implement user login logic
  }
}
