import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product } from './Product.schema'; // ⚠️ Ajusta la ruta

export type CategoriaDocument = Categoria & Document;

@Schema()
export class Categoria {
    @Prop({ required: true, unique: true })
    nombre: string;

    @Prop()
    descripcion: string;

    // ⭐️ CAMPO CLAVE: Referencia a la colección de Productos
    @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }] })
    productos: Types.ObjectId[];
}

export const CategoriaSchema = SchemaFactory.createForClass(Categoria);