import { ApiProperty } from '@nestjs/swagger'
import { IsIn, IsNotEmpty, IsString, MinLength, IsDateString, IsOptional } from 'class-validator'

// Listas de valores permitidos para categorías y prioridades
export const CATEGORIAS = ['Hardware', 'Software', 'Redes', 'Seguridad', 'Soporte Usuario'] as const
export type Categoria = typeof CATEGORIAS[number]

export const PRIORIDADES = ['Baja', 'Media', 'Alta', 'Crítica'] as const
export type Prioridad = typeof PRIORIDADES[number]

export const ESTADOS = ['Pendiente', 'En Proceso', 'Finalizado'] as const
export type Estado = typeof ESTADOS[number]

export class CreateServicioDto {
  // minimo de caracter
  @ApiProperty({ example: 'fallo conexion impresora' })
  @IsString()
  @MinLength(5)
  titulo: string

  @ApiProperty({ example: 'cliente ejemplo 123' })
  @IsString()
  @IsNotEmpty()
  cliente: string

  // categorias arriba
  @ApiProperty({ enum: CATEGORIAS })
  @IsIn(CATEGORIAS as unknown as string[])
  categoria: Categoria

  //prioridades tambien
  @ApiProperty({ enum: PRIORIDADES })
  @IsIn(PRIORIDADES as unknown as string[])
  prioridad: Prioridad

  //estados arriba (ahora opcional)
  @ApiProperty({ enum: ESTADOS, required: false })
  @IsOptional()
  @IsIn(ESTADOS as unknown as string[])
  estado?: Estado

  @ApiProperty({ example: 'impresora no responde y llame al computin' })
  @IsString()
  @MinLength(15)
  descripcion: string

  @ApiProperty({ example: '2026-03-30T10:00:00.000Z' })
  @IsDateString()
  @IsNotEmpty()
  fechaSolicitud: string
}