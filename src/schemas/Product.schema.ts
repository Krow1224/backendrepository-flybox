//cosas que va a tener cada producto
import {Schema} from '@nestjs/mongoose'
import { Prop, SchemaFactory} from '@nestjs/mongoose'

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


}

export const ProductSchema= SchemaFactory.createForClass(Product);