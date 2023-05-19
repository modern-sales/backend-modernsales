import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNotEmpty } from 'class-validator';
import { ModuleDto } from "./module.dto";


export class CreateCourseDto {
    @ApiProperty({ description: 'The course\'s title' })
    @IsNotEmpty()
    readonly title?: string;

    @ApiProperty({ description: 'The course\'s description' })
    @IsNotEmpty()
    readonly description?: string;

    @ApiProperty({ description: 'The course\'s base price' })
    @IsNotEmpty()
    readonly basePrice?: number;

    @ApiProperty({ description: 'The course\'s discount price' })
    @IsNotEmpty()
    readonly discountPrice?: number;

    @ApiProperty({ description: 'The course\'s modules', type: [ModuleDto] })
    @IsDefined()
    readonly modules?: ModuleDto[];
}
