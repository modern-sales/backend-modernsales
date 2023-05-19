import { ApiProperty } from "@nestjs/swagger";

export class CreatePurchaseDto {
    @ApiProperty({ description: 'The user\'s email address' })
    readonly userId: string;

    @ApiProperty({ description: 'The user\'s name', required: false, default: null })
    readonly courseId: string;

    constructor(userId: string, courseId: string) {
        this.userId = userId;
        this.courseId = courseId;
    }

    // Static method to provide default values for CreatePurchaseDto
    static getDefaultValues(): Partial<CreatePurchaseDto> {
        return {
            userId: undefined,
            courseId: undefined,
        };
    }
}