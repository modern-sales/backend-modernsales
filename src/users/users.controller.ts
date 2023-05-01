import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller('users')
export class UserController {
    constructor(private readonly usersService: UsersService) { }

    // ======================================
    // Create new user
    // ======================================
    @Post()
    insertUser(
        @Body('primary_email') primary_email: string,
        @Body('phone_number') phone_number: string,
        @Body('first_name') first_name: string,
        @Body('last_name') last_name: string,
        @Body('profile_picture_url') profile_picture_url: string,
        @Body('position') position: string,
        @Body('created_at') created_at: Date,
        @Body('updated_at') updated_at: Date,
        @Body('purchased_items') purchased_items: string[]
    ) {
        const userId = this.usersService.instertUser(
            primary_email,
            phone_number,
            first_name,
            last_name,
            profile_picture_url,
            position,
            created_at,
            updated_at,
            purchased_items
        );
        return {
            id: userId
        }
    };

    
    // ======================================
    // Get all users
    // ======================================
    @Get()
    getAllUsers() {
        return this.usersService.getUsers();
    }

    // ======================================
    // Get single user by Id
    // ======================================
    @Get(':userId')
    getUser(
        @Param('urserId') userId: string
    ) {
        return this.usersService.getUser(userId);
    }

    // ======================================
    // Update single user by Id
    // ======================================
    @Put(':userId')
    updateUser(
        @Param('userId') userId: string,
        @Body('primary_email') primary_email: string,
        @Body('phone_number') phone_number: string,
        @Body('first_name') first_name: string,
        @Body('last_name') last_name: string,
        @Body('profile_picture_url') profile_picture_url: string,
        @Body('position') position: string,
        @Body('created_at') created_at: Date,
        @Body('updated_at') updated_at: Date,
        @Body('purchased_items') purchased_items: string[]
    ) {
        return this.usersService.updateUser(
            userId,
            primary_email,
            phone_number,
            first_name,
            last_name,
            profile_picture_url,
            position,
            created_at,
            updated_at,
            purchased_items
        );
    }

    // ======================================
    // Update single user by Id
    // ======================================
    @Delete(':userId')
    removeUser(
        @Param('userId') userId: string
    ) {
        return this.usersService.deleteUser(userId);
    }
}