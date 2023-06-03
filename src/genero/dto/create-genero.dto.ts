import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateGeneroDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo descripcion no debe ser vacío' })
  @IsString({ message: 'El campo descripcion debe ser de tipo cadena' })
  @MaxLength(100, { message: 'El campo descripcion no debe ser mayor a 100 caracteres' })
  readonly descripcion: string;
}
