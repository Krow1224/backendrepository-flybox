import {Injectable, NotFoundException} from '@nestjs/common'
import { readFileSync } from 'fs';
import { join } from 'path';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from 'src/schemas/Product.schema';
import { Model } from 'mongoose';



@Injectable()
export class ProductsService{
    constructor (@InjectModel(Product.name) private productmodel: Model<ProductDocument>){}

    async obtenertodomong(){
        const data= await this.productmodel.find();
        console.log(data);
        return data;
    }

    async obtenerundomong(id:string){
        const dato= await this.productmodel.findById(id)
        if (!dato) throw new NotFoundException(`No se encontró producto con ID ${id}`);
        return dato;
    }

    //crear un producto
    async crear(productData: Partial<Product>): Promise<Product> {
    const nuevo = new this.productmodel(productData);
    return nuevo.save();

    }

    //actualizar
    async actualizar(id: string, data: Partial<Product>): Promise<Product> {
    const actualizado = await this.productmodel.findByIdAndUpdate(id, data, { new: true }).exec();
    if (!actualizado) throw new NotFoundException(`No se pudo actualizar producto con ID ${id}`);
    return actualizado;
    }

    // Eliminar producto
  async eliminar(id: string): Promise<Product> {
    const eliminado = await this.productmodel.findByIdAndDelete(id).exec();
    if (!eliminado) throw new NotFoundException(`No se encontró producto con ID ${id}`);
    return eliminado;
  }

}
