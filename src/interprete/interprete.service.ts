import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInterpreteDto } from './dto/create-interprete.dto';
import { UpdateInterpreteDto } from './dto/update-interprete.dto';
import { InterpreteEntity } from './entities/interprete.entity';

@Injectable()
export class InterpreteService {
  constructor(
    @InjectRepository(InterpreteEntity)
    private interpreteRepository: Repository<InterpreteEntity>,
  ) {}

  async create(
    createInterpreteDto: CreateInterpreteDto,
  ): Promise<InterpreteEntity> {
    const existe = await this.interpreteRepository.findOneBy({
      nombre: createInterpreteDto.nombre.trim(),
      nacionalidad: createInterpreteDto.nacionalidad.trim(),
    });

    if (existe) {
      throw new ConflictException(`El intérprete ${createInterpreteDto.nombre} ya existe.`);
    }

    return this.interpreteRepository.save({
      nombre: createInterpreteDto.nombre.trim(),
      nacionalidad: createInterpreteDto.nacionalidad.trim(),
    });
  }

  async findAll(): Promise<InterpreteEntity[]> {
    return this.interpreteRepository.find();
  }

  async findOne(id: number): Promise<InterpreteEntity> {
    const interprete = await this.interpreteRepository.findOneBy({id});

    if (!interprete) {
      throw new NotFoundException(`El intérprete ${id} no existe.`);
    }

    return interprete;
  }

  async update(id: number, updateInterpreteDto: UpdateInterpreteDto) {
    const interprete = await this.interpreteRepository.findOneBy({id});

    if (!interprete) {
      throw new NotFoundException(`El intérprete ${id} no existe.`);
    }

    const interpreteUpdate = Object.assign(interprete, updateInterpreteDto);
    return this.interpreteRepository.save(interpreteUpdate);
  }

  async remove(id: number) {
    const existe = await this.interpreteRepository.findOneBy({id});

    if (!existe) {
      throw new NotFoundException(`El intérprete ${id} no existe.`);
    }

    return this.interpreteRepository.delete(id);
  }
}
