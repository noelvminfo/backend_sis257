import { Injectable } from '@nestjs/common';
import { CreateCancionDto } from './dto/create-cancion.dto';
import { UpdateCancionDto } from './dto/update-cancion.dto';

@Injectable()
export class CancionService {
  create(createCancionDto: CreateCancionDto) {
    return 'This action adds a new cancion';
  }

  findAll() {
    return `This action returns all cancion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cancion`;
  }

  update(id: number, updateCancionDto: UpdateCancionDto) {
    return `This action updates a #${id} cancion`;
  }

  remove(id: number) {
    return `This action removes a #${id} cancion`;
  }
}
