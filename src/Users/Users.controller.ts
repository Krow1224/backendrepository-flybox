import { Controller, Get, Post,Put, Delete, Param, Body } from '@nestjs/common';
import { UsersService } from './Users.service';
import { User } from 'src/schemas/Users.schema';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/all')
  getAll(): Promise<User[]> {
    console.log("obteniendo todos")
    return this.usersService.obtenerTodos();
  }

  @Get('/:id')
  getById(@Param('id') id: string): Promise<User> {
    return this.usersService.obtenerUno(id);
  }

  @Post('/add')
  create(@Body() data: Partial<User>): Promise<User> {
    return this.usersService.crear(data);
  }

  @Delete('/delete/:id')
  delete(@Param('id') id: string): Promise<User> {
    return this.usersService.eliminar(id);
  }

  @Put('update/:id')
  actualizarUsuario(@Param('id') id: string,@Body() data: Partial<User>,): Promise<User> {
    return this.usersService.actualizar(id, data);
  }


}

