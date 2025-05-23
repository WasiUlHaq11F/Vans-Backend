import { Controller,Post,Body,Get, Param } from "@nestjs/common";
import { StoreService } from "./store.service";
@Controller('stores')
export class StoreController{
    constructor(private readonly storeService: StoreService) {}

    @Get()
    async getAllStores() {
      return this.storeService.getAllStores();
    }

    @Post()
    async createStore(@Body() storeData:any){
        return this.storeService.createStore(storeData);
    }

    @Get(':userId')
    async getStoresByUser(@Param('userId') userId:string){
      return this.storeService.getStoresByUser(userId)
    }
}