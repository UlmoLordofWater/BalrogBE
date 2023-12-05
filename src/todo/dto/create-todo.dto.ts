import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty,  } from "class-validator";

export class CreateTodoDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    @IsNotEmpty()
    title: string;

    @ApiProperty({type: Boolean, default: false})
    @IsBoolean()
    complete: boolean;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    authorId: number;
}
