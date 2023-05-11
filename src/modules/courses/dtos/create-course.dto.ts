import { ApiProperty } from "@nestjs/swagger";

export class CreateCourseDto {
    @ApiProperty({ description: 'The course\'s email address' })
    readonly title: string;

    @ApiProperty({ description: 'The course\'s name', required: true, default: null })
    readonly description?: string;

    constructor(title: string, description: string) {
        this.title = title;
        this.description = description;
    }

    // Static method to provide default values for CreateCourseDto
    static getDefaultValues(): Partial<CreateCourseDto> {
        return {
            title: undefined,
            description: undefined,
        };
    }
}