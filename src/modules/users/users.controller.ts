import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './models/user.model';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';
import { AdminAuthGuard } from '@shared/guards/admin-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Get('test')
  async test(): Promise<any> {
    return 'the server is alive! (and you can reach the users endpoint! - maybe database connection now? and auth? yay)';
  }

  @Post()
  async createUser(@Body() user: any): Promise<any> {
    return this.usersService.createUser(user);
  }

  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<any> {
    return this.usersService.deleteUser(id);
  }
}
