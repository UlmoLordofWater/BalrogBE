import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty,  } from "class-validator";
import { type } from "os";

export class CreatePostDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    content: string;

    @ApiProperty({type: Boolean, default: false})
    @IsBoolean()
    published: boolean;

    @ApiProperty()
    authorId: number;
}
