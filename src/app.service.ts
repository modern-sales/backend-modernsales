import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello, this is the Modern Sales backend, hope it works, v10!';
  }
}
