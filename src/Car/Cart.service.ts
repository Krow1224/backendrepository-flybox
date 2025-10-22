import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, Document } from 'mongoose';
import { Cart } from 'src/schemas/Cart.schema';
import { Product } from 'src/schemas/Product.schema';

type CarritoDocument = Document & {
    user: Types.ObjectId | string; 
    items: Array<any>;
    total: number;
    
};

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private readonly cartModel: Model<Cart>,
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}


  async getCart(userId: string) {
    const cart = await this.cartModel
      .findOne({ user: userId })
      .populate('items.product', 'nombre precio');

//manejo de errores
    if (!cart) throw new NotFoundException('Carrito no encontrado');
    return cart;
  }

  async addToCart(userId: string, productId: string, cantidad: number) {
    const product = await this.productModel.findById(productId);
    if (!product) throw new NotFoundException('Producto no encontrado');

    // Buscar o crear el carrito del usuario
    let cart = await this.cartModel.findOne({ user: userId });
    if (!cart) {
      cart = new this.cartModel({ user: userId, items: [], total: 0 });
    }

    // Verificar si el producto ya está en el carrito
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId,
    );

    if (existingItem) {
      existingItem.cantidad += cantidad;
      existingItem.subtotal = existingItem.cantidad * product.precio;
    } else {
      cart.items.push({
        product: new Types.ObjectId(productId),
        cantidad,
        subtotal: cantidad * product.precio,
      });
    }

    // Recalcular total
    cart.total = cart.items.reduce((sum, item) => sum + item.subtotal, 0);
    await cart.save();
    return cart;
  }


  async updateItemQuantity(userId: string, itemId: string, cantidad: number) {
    const cart = await this.cartModel.findOne({ user: userId });
    if (!cart) throw new NotFoundException('Carrito no encontrado');

    const item = cart.items.find(
      (item) => item.product.toString() === itemId,
    );
    if (!item) throw new NotFoundException('Producto no encontrado en el carrito');

    const product = await this.productModel.findById(item.product);
    if (!product) throw new NotFoundException('Producto no encontrado');

    item.cantidad = cantidad;
    item.subtotal = cantidad * product.precio;

    cart.total = cart.items.reduce((sum, i) => sum + i.subtotal, 0);
    await cart.save();

    return cart;
  }

  


    async removeItem(userId: string, itemId: string): Promise<CarritoDocument> {
        
        
        if (!Types.ObjectId.isValid(itemId)) {
             throw new NotFoundException('ID de ítem inválido.');
        }
        const itemObjectId = new Types.ObjectId(itemId); 

        // 2. Ejecutar findOneAndUpdate con $pull
        const updatedCart = await this.cartModel.findOneAndUpdate(
            // Condicionnes para encontrar el carrito: a esto se le llama operaciones atómicas
            // 1. Que pertenezca al usuario correcto.
            // 2. Que el array items contenga el subdocumento con el _id específico.
            { 
                user: userId, 
                'items._id': itemObjectId 
            }, 
            
            // Operación de eliminación:
            // con el pull se elimina el elemeneto 
            { 
                $pull: { 
                    items: { 
                        _id: itemObjectId 
                    } 
                } 
            },
            
            
            { new: true, runValidators: true } 
        ).exec(); 

        
        if (!updatedCart) {
            // mapeo de errores
            throw new NotFoundException('Producto no encontrado en el carrito');
        }

        
        updatedCart.total = updatedCart.items.reduce((sum, i) => sum + (i.subtotal || 0), 0);
        await updatedCart.save(); // Guarda el documento para actualizar el campo total.

        return updatedCart;
    }
    
    async clearCart(userId: string): Promise<any> {
    // 1. Buscar el carrito del usuario
    const cart = await this.cartModel.findOne({ user: userId }); 

    if (!cart) {
        // Si el carrito no existe, podemos considerar que ya está vacío.
        return { message: 'El carrito no existía o ya estaba vacío' }; 
    }

    // 2. Vaciar el array de items y poner el total a cero
    cart.items = []; 
    cart.total = 0;
    
    // 3. Guardar el carrito actualizado (vacío)
    await cart.save();
    
    // 4. Devolver una respuesta exitosa
    return { message: 'Carrito vaciado exitosamente' };
}



}

