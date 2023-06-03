import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGeneroDto } from './dto/create-genero.dto';
import { UpdateGeneroDto } from './dto/update-genero.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GeneroEntity } from './entities/genero.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GeneroService {
  constructor(
    @InjectRepository(GeneroEntity)
    private generoRepository: Repository<GeneroEntity>,
  ) {}

  async create(
    createGeneroDto: CreateGeneroDto,
  ): Promise<GeneroEntity> {
    const existe = await this.generoRepository.findOneBy({
      descripcion: createGeneroDto.descripcion.trim(),
    });

    if (existe) {
      throw new ConflictException(`El género ${createGeneroDto.descripcion} ya existe.`);
    }

    return this.generoRepository.save({
      descripcion: createGeneroDto.descripcion.trim(),
    });
  }

  async findAll(): Promise<GeneroEntity[]> {
    return this.generoRepository.find();
  }

  async findOne(id: number): Promise<GeneroEntity> {
    const genero = await this.generoRepository.findOneBy({id});

    if (!genero) {
      throw new NotFoundException(`El género ${id} no existe.`);
    }

    return genero;
  }

  async update(id: number, updateGeneroDto: UpdateGeneroDto) {
    const genero = await this.generoRepository.findOneBy({id});

    if (!genero) {
      throw new NotFoundException(`El género ${id} no existe.`);
    }

    const generoUpdate = Object.assign(genero, updateGeneroDto);
    return this.generoRepository.save(generoUpdate);
  }

  async remove(id: number) {
    const existe = await this.generoRepository.findOneBy({id});

    if (!existe) {
      throw new NotFoundException(`El género ${id} no existe.`);
    }

    return this.generoRepository.delete(id);
  }
}
