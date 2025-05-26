import { Controller,Body,Post } from "@nestjs/common";
import { UsersService } from "./user.service";
import { UserTypes } from "types/UserTypes";
@Controller('users')
export class UserController{
    constructor(private readonly usersService:UsersService){}

    @Post()
    async createUser(@Body() userData:UserTypes){
        return this.usersService.createUser(userData)
    }

}