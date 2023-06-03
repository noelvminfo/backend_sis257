import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async create(
    createUsuarioDto: CreateUsuarioDto,
  ): Promise<UsuarioEntity> {
    const existe = await this.usuarioRepository.findOneBy({
      usuario: createUsuarioDto.usuario.trim(),
    });

    if (existe) {
      throw new ConflictException(`El usuario ${createUsuarioDto.usuario} ya existe.`);
    }

    const usuario: UsuarioEntity = new UsuarioEntity();
    usuario.usuario = createUsuarioDto.usuario.trim();
    usuario.clave = process.env.DEFAULT_PASSWORD;
    usuario.email = createUsuarioDto.email.trim();
    usuario.rol = createUsuarioDto.rol.trim();
    usuario.premium = createUsuarioDto.premium;

    const usuarioDB = await this.usuarioRepository.save(usuario);
    delete usuarioDB.clave;
    return usuarioDB;
  }

  async findAll(): Promise<UsuarioEntity[]> {
    return this.usuarioRepository.find();
  }

  async findOne(id: number): Promise<UsuarioEntity> {
    const usuario = await this.usuarioRepository.findOneBy({id});

    if (!usuario) {
      throw new NotFoundException(`El usuario ${id} no existe.`);
    }

    return usuario;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.usuarioRepository.findOneBy({id});

    if (!usuario) {
      throw new NotFoundException(`El usuario ${id} no existe.`);
    }

    const usuarioUpdate = Object.assign(usuario, updateUsuarioDto);
    return this.usuarioRepository.save(usuarioUpdate);
  }

  async remove(id: number) {
    const existe = await this.usuarioRepository.findOneBy({id});

    if (!existe) {
      throw new NotFoundException(`El usuario ${id} no existe.`);
    }

    return this.usuarioRepository.delete(id);
  }

  async validate(usuario: string, clave: string): Promise<UsuarioEntity> {
    const usuarioOk = await this.usuarioRepository.findOne({
      where: { usuario },
      select: ['id', 'usuario', 'clave', 'email', 'rol', 'premium'],
    });

    if (!usuarioOk) throw new NotFoundException('Usuario inexistente');
    
    if (!(await usuarioOk?.validatePassword(clave))) {
      throw new UnauthorizedException('Clave incorrecta');
    }

    delete usuarioOk.clave;
    return usuarioOk;
  }
}
