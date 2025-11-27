//cosas que va a tener cada producto
import {Schema} from '@nestjs/mongoose'
import { Prop, SchemaFactory} from '@nestjs/mongoose'

export type ProductDocument = Product & Document;

@Schema()
export class Comentario {
    @Prop({ required: true })
    usuario: string; // Puede ser el nombre de usuario o un ID de referencia

    @Prop({ required: true, min: 1, max: 5 })
    calificacion: number; // Puntuación de 1 a 5

    @Prop({ required: true })
    texto: string;

    @Prop({ default: Date.now })
    fecha: Date;
}
export const ComentarioSchema = SchemaFactory.createForClass(Comentario);

@Schema({
    timestamps: true
})
export class Product{

    @Prop({
        //para señalar que es unico y que es requerido
        unique: true,
        required: true,
    })
    nombre: string

    @Prop({
        //para señalar que es unico y que es requerido
        unique: true,
    })
    id: string

    @Prop({
        required: true,
        unique: false
    })
    calificacion: number
    @Prop({
        required: true,
        unique: false
    })
    comentarios: string 

     @Prop({
        required: true,
     })
    ventas: number 

    @Prop({
        required: true,
    })
    precio: number

    @Prop({
        required: true,
    })
    stock: number

    @Prop({ type: [ComentarioSchema], default: [] }) 
    coments: Comentario[];


}

export const ProductSchema= SchemaFactory.createForClass(Product);