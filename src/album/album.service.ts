import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from './entities/album.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<AlbumEntity> {
    const existe = await this.albumRepository.findOneBy({
      idInterprete: createAlbumDto.idInterprete,
      nombre: createAlbumDto.nombre.trim(),
    });

    if (existe) {
      throw new ConflictException(
        `El album ${createAlbumDto.nombre} ya existe para el intérprete.`,
      );
    }

    return this.albumRepository.save({
      idInterprete: createAlbumDto.idInterprete,
      nombre: createAlbumDto.nombre.trim(),
      fechaLanzamiento: createAlbumDto.fechaLanzamiento,
    });
  }

  async findAll(): Promise<AlbumEntity[]> {
    return this.albumRepository.find({ relations: { interprete: true } });
  }

  async findOne(id: number): Promise<AlbumEntity> {
    const album = await this.albumRepository.findOne({ where: {id}, relations: {interprete: true}});

    if (!album) {
      throw new NotFoundException(`El album ${id} no existe.`);
    }

    return album;
  }

  async update(id: number, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.albumRepository.findOneBy({id});

    if (!album) {
      throw new NotFoundException(`El album ${id} no existe.`);
    }

    const albumUpdate = Object.assign(album, updateAlbumDto);
    return this.albumRepository.save(albumUpdate);
  }

  async remove(id: number) {
    const existe = await this.albumRepository.findOneBy({id});

    if (!existe) {
      throw new NotFoundException(`El album ${id} no existe.`);
    }

    return this.albumRepository.delete(id);
  }
}
