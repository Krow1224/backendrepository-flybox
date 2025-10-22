import {Controller,Get,Post,Delete,Body,Header, Param, Put} from '@nestjs/common'
import { ProductsService } from './Products.service';
import type { Response } from 'express';
import { join } from 'path';
import { Product } from 'src/schemas//Product.schema';


@Controller({})
export class ProductsController  {

    ProductsService:ProductsService;

    constructor(Productsservice:ProductsService){
        this.ProductsService= Productsservice;
    }


    @Get('/products/all')
    async getproductsall(){
      console.log("obteniendo todos los productos")
      const r= await this.ProductsService.obtenertodomong();
      return r;
    }

    @Get('/products/id/:id')
    getproductsid(@Param('id') id: string): Promise<Product| null>{

      return this.ProductsService.obtenerundomong(id);
    }

    @Post('/products/add')
    createProduct(@Body() data: Partial<Product>): Promise<Product> {
      return this.ProductsService.crear(data);
    }

    @Put('/products/update/:id')
    updateProduct(@Param('id') id: string, @Body() data: Partial<Product>): Promise<Product>{
      return this.ProductsService.actualizar(id,data)
    }

    @Delete('/products/delete/:id')
    deleteProduct(@Param('id') id: string): Promise<Product> {
    console.log("eliminando")
    return this.ProductsService.eliminar(id);
    }



}

@Controller('/html')
export class HtmlController {
  constructor(private readonly htmlService: ProductsService) {}

  
}