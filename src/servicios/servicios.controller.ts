import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ServiciosService } from './servicios.service';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';

@ApiTags('solicitudes')
@Controller('solicitudes') 
export class ServiciosController {
  constructor(private readonly serviciosService: ServiciosService) {}

  @Get()
  @ApiOperation({ summary: 'listar todas las solicitudes' })
  findAll() {
    return this.serviciosService.findAll();
  }


  @Get('buscar')
  @ApiOperation({ summary: 'buscar por estado, prioridad y/o categoría' })
  @ApiQuery({ name: 'estado', required: false })
  @ApiQuery({ name: 'prioridad', required: false })
  @ApiQuery({ name: 'categoria', required: false })
  buscar(
    @Query('estado') estado?: string,
    @Query('prioridad') prioridad?: string,
    @Query('categoria') categoria?: string,
  ) {
    return this.serviciosService.buscar(estado, prioridad, categoria);
  }

  @Get(':id')
  @ApiOperation({ summary: 'consultar una solicitud por ID' })
  findOne(@Param('id') id: string) {
    return this.serviciosService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'registrar una nueva solicitud' })
  create(@Body() createServicioDto: CreateServicioDto) {
    return this.serviciosService.create(createServicioDto);
  }

  @Put(':id') 
  @ApiOperation({ summary: 'actualizar una solicitud' })
  update(@Param('id') id: string, @Body() updateServicioDto: UpdateServicioDto) {
    return this.serviciosService.update(+id, updateServicioDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'eliminar una solicitud' })
  remove(@Param('id') id: string) {
    return this.serviciosService.remove(+id);
  }
}