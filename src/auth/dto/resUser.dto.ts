import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";
import { Toke, UserNoPass } from "../auth.service";

export class resUserDto implements UserNoPass, Toke {
    @ApiProperty()
    id: number;
    
    @ApiProperty()
    email: string;
  
    @ApiProperty()
    @IsEmail()
    name: string;
    
    @ApiProperty()
    access_token: string;

    @ApiProperty()
    expiresIn: number;
}