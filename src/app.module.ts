import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { StoreModule } from './store/store.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
@Module({
  imports: [UserModule,StoreModule,ProductModule, CartModule],

})
export class AppModule {}
