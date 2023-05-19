import { ApiProperty } from "@nestjs/swagger";

class ModuleAssetDto {
    @ApiProperty({ description: 'The asset\'s title' })
    readonly title!: string;

    @ApiProperty({ description: 'The asset\'s description' })
    readonly description!: string;

    @ApiProperty({ description: 'The asset\'s type' })
    readonly type!: string;

    @ApiProperty({ description: 'The asset\'s URL' })
    readonly assetURL!: string;
}

export class ModuleDto {
    @ApiProperty({ description: 'The module\'s title' })
    readonly title!: string;

    @ApiProperty({ description: 'The module\'s description' })
    readonly description!: string;

    @ApiProperty({ description: 'The module\'s video URL' })
    readonly videoURL!: string;

    @ApiProperty({ description: 'The module\'s assets' })
    readonly moduleAssets!: ModuleAssetDto[];
}