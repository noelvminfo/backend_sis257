import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty()
  @IsDefined({ message: 'El campo idInterprete debe estar definido' })
  @IsNumber({}, { message: 'El campo idInterprete debe ser de tipo numérico' })
  readonly idInterprete: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El cmapo nombre no debe ser vacío' })
  @IsString({ message: 'El campo nombre debe ser de tipo cadena' })
  @MaxLength(100, {
    message: 'El campo nombre no debe ser mayor a 100 caracteres',
  })
  readonly nombre: string;

  @ApiProperty()
  @IsDefined({ message: 'El campo fechaLanzamiento debe estar definido' })
  @IsDateString({}, { message: 'El campo fechaLanzamiento debe ser de tipo fecha' })
  readonly fechaLanzamiento: Date;
}
