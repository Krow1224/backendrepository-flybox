import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/Users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async crear(data: Partial<User>): Promise<User> {
    const nuevo = new this.userModel(data);
    return nuevo.save();
  }

  async obtenerTodos(): Promise<User[]> {
    return this.userModel.find();
  }

  async obtenerUno(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException(`no encontrado`);
    return user;
  }

  async eliminar(id: string): Promise<User> {
    const eliminado = await this.userModel.findByIdAndDelete(id);
    if (!eliminado) throw new NotFoundException(`Usuario para eliminar no encontrado`);
    return eliminado;
  }
  async actualizar(id: string, data: Partial<User>): Promise<User> {
    const actualizado = await this.userModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();

      if (!actualizado) {
      throw new NotFoundException(`No se encontró usuario con ID ${id}`);
    }

      return actualizado;
    }
}
