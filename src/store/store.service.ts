import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class StoreService{
    constructor(private  prisma:PrismaService){}

    async createStore(storeData:any){
        const {name,description,userId} = storeData

        const existingStore = await this.prisma.store.findFirst({
            where: {
                name,
                userId
            }
        })
        if(existingStore){
            return existingStore
        }

        const newStore = await this.prisma.store.create({
            data: {
                name,
                description,
                id: uuidv4(),
                userId
            }
        });
        return newStore
    }

    async getAllStores() {
        return this.prisma.store.findMany();
      }

    async getStoresByUser(userId:string){
        return this.prisma.store.findMany({
            where: {
                userId,
            },
            orderBy:{
                createdAt:"desc"
            },
        })
    }
}