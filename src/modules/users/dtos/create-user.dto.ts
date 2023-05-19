import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({ description: 'The user\'s email address' })
    readonly email: string;

    @ApiProperty({ description: 'The user\'s name', required: false, default: null })
    readonly name?: string;

    @ApiProperty({ description: 'If the user is a newsletter Subscriber' })
    readonly isNewsletterSubscriber?: boolean;

    constructor(email: string, name?: string) {
        this.email = email;
        this.name = name;
    }

    // Static method to provide default values for CreateUserDto
    static getDefaultValues(): Partial<CreateUserDto> {
        return {
            name: undefined,
        };
    }
}