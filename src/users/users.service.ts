import { Injectable } from "@nestjs/common";
import { User } from "./users.model";
import { v4 as uuidv4 } from 'uuid';
import putUser from "src/database/users/putUser";
import getUsers from "src/database/users/getUsers";

@Injectable()
export class UsersService {
    private users: User[] = [];

    instertUser(
        primary_email: string,
        phone_number: string,
        first_name: string,
        last_name: string,
        profile_picture_url: string,
        position: string,
        created_at: Date,
        updated_at: Date,
        purchased_items: string[]
    ) {
        const id = uuidv4();
        const newUser = new User(
            id,
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
        putUser(newUser);
        return id;
    }

    getUsers() {
        return getUsers();
    }

    getUser(userId: string) {
        return this.getUserById(userId)[0];
    }

    updateUser(
        userId: string,
        primary_email: string,
        phone_number: string,
        first_name: string,
        last_name: string,
        profile_picture_url: string,
        position: string,
        created_at: Date,
        updated_at: Date,
        purchased_items: string[]
    ) {
        const [targetUser, index] = this.getUserById(userId);

        const newUserParams = {
            ...targetUser,
            primary_email,
            phone_number,
            first_name,
            last_name,
            profile_picture_url,
            position,
            created_at,
            updated_at,
            purchased_items
        };

        const newUser = new User(
            userId,
            newUserParams.first_name,
            newUserParams.last_name,
            newUserParams.primary_email,
            newUserParams.phone_number,
            newUserParams.profile_picture_url,
            newUserParams.position,
            newUserParams.created_at,
            newUserParams.updated_at,
            newUserParams.purchased_items
        );

        this.users[index] = newUser;

        return newUser;
    }

    deleteUser(userId: string) {
        const [_, index] = this.getUserById(userId);
        this.users.splice(index, 1);
    };

    private getUserById(userId: string): [User, number] {
        const index = this.users.findIndex(user => user._id === userId);
        return [this.users[index], index]
    }
}