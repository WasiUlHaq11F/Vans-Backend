import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { StoreModule } from './store/store.module';
import { ProductModule } from './product/product.module';
@Module({
  imports: [UserModule,StoreModule,ProductModule],

})
export class AppModule {}
