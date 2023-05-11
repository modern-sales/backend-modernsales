import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { EmailModule } from '../email/email.module'; // Import EmailModule

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      imports: [EmailModule], // Add EmailModule to the imports array
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});