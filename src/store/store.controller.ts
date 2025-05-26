import { Controller,Post,Body,Get, Param, Patch, Delete } from "@nestjs/common";
import { StoreService } from "./store.service";
import { StoreTypes } from "types/StoreTypes";
@Controller('stores')
export class StoreController{
    constructor(private readonly storeService: StoreService) {}

  

    @Post()
    async createStore(@Body() storeData:StoreTypes){
        return this.storeService.createStore(storeData);
    }

    @Get(':userId')
    async getStoresByUser(@Param('userId') userId:string){
      return this.storeService.getStoresByUser(userId)
    }

    @Patch(':storeId')
  async updateStore(
    @Param('storeId') storeId: string,
    @Body() updateData: { name?: string; description?: string },
  ) {
    return this.storeService.updateStore(storeId, updateData);
  }

  // ✅ Add this
  @Delete(':storeId')
  async deleteStore(@Param('storeId') storeId: string) {
    return this.storeService.deleteStore(storeId);
  }
}