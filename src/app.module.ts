import { Module } from '@nestjs/common';
import {ProductsModule} from './Products/Products.module'
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './Users/Users.controller';
import { UsersModule } from './Users/Users.module';
import { CartModule } from './Car/Cart.module';
//importar la clase products module del archivo products.module.ts, cart.module y users.module

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/mi_base'), ProductsModule,UsersModule,CartModule],
  
  
})
export class AppModule {}
