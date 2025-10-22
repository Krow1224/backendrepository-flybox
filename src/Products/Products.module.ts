//crear un modulo para indicar que se está guardando
import {Module} from '@nestjs/common';
import { Model } from 'mongoose';
import { ProductsController } from './Products.controller';
import { ProductsService } from './Products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product } from 'src/schemas/Product.schema';
import { ProductSchema } from 'src/schemas/Product.schema';


//un modulo puede incluir varios controladores y en este caso incluye el products controller

@Module({
    imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema }
    ])
    ],
    controllers: [ProductsController],
    providers:[ProductsService],
    exports: [MongooseModule],
    
})
export class ProductsModule{}