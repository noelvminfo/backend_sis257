import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateInterpreteDto } from './dto/create-interprete.dto';
import { UpdateInterpreteDto } from './dto/update-interprete.dto';
import { InterpreteService } from './interprete.service';
import { InterpreteEntity } from './entities/interprete.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('interpretes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('interpretes')
export class InterpreteController {
  constructor(private readonly interpreteService: InterpreteService) {}

  @Post()
  @ApiCreatedResponse({ type: InterpreteEntity })
  @ApiOperation({ summary: 'Crea un nuevo intérprete'})
  create(@Body() createInterpreteDto: CreateInterpreteDto) {
    return this.interpreteService.create(createInterpreteDto);
  }

  @Get()
  @ApiOkResponse({ type: InterpreteEntity, isArray: true })
  @ApiOperation({ summary: 'Obtiene la lista de intérpretes'})
  findAll() {
    return this.interpreteService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: InterpreteEntity })
  @ApiOperation({ summary: 'Obtiene un intérprete con base al identificador'})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.interpreteService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: InterpreteEntity })
  @ApiOperation({ summary: 'Actualiza los datos de un intérprete con base al identificador'})
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInterpreteDto: UpdateInterpreteDto,
  ) {
    return this.interpreteService.update(id, updateInterpreteDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiOperation({ summary: 'Elimina un intérprete con base al identificador'})
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.interpreteService.remove(id);
  }
}
