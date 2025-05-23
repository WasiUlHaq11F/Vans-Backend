import { Controller,Body,Post } from "@nestjs/common";
import { UsersService } from "./user.service";
@Controller('users')
export class UserController{
    constructor(private readonly usersService:UsersService){}

    @Post()
    async createUser(@Body() userData:any){
        return this.usersService.createUser(userData)
    }

}