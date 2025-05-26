import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { UserTypes } from "types/UserTypes";
@Injectable()
export class UsersService{
    constructor(private prisma: PrismaService) {}

    async createUser(userData:UserTypes){
        const {name,email,image,emailVerified} = userData;

        const existingUser = await this.prisma.user.findUnique({
            where:{
                email
            },
        });

        if(existingUser){
            return existingUser
        }
        
        return this.prisma.user.create({
            data:{
                name,
                email,
                image: Array.isArray(image) ? image.join(", ") : image,
                emailVerified}
        })
    }
}