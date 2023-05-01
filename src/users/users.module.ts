import { UserController } from "./users.controller";
import { UsersService } from "./users.service";
import {Module} from "@nestjs/common";

@Module({
    controllers: [UserController],
    providers: [UsersService],
})

export class UsersModule {};