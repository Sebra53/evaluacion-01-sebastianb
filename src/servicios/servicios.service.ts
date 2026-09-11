  import { Injectable, NotFoundException,BadRequestException } from '@nestjs/common'
  import { InjectRepository } from '@nestjs/typeorm'
  import { Repository } from 'typeorm'
  import { CreateServicioDto } from './dto/create-servicio.dto'
  import { UpdateServicioDto } from './dto/update-servicio.dto'
  import { Servicio } from './entities/servicio.entity'

  @Injectable()
  export class ServiciosService {
    constructor(
      @InjectRepository(Servicio)
      private repo: Repository<Servicio>,
    ) {}

    findAll() {
      return this.repo.find()
    }

    async findOne(id: number) {
      const found = await this.repo.findOne({ where: { id } })
      if (!found) throw new NotFoundException({ error: 'no encontrado' })
      return found
    }

    create(dto: CreateServicioDto) {
    const fecha = new Date(dto.fechaSolicitud);
    if (fecha > new Date()) {
      throw new BadRequestException({ error: 'La fecha no puede ser posterior a la fecha actual' });
    }

    const ent = this.repo.create({
      ...dto,
      estado: 'Pendiente',
    });
    return this.repo.save(ent);
    }

    async update(id: number, dto: UpdateServicioDto) {
    const prev = await this.findOne(id)

    if (prev.estado === 'Finalizada' && dto.estado === 'Pendiente') {
      throw new BadRequestException({ error: 'Una solicitud Finalizada no puede volver a estar Pendiente' })
    }

    Object.assign(prev, dto)
    return this.repo.save(prev)
  }

    async remove(id: number) {
        const prev = await this.findOne(id);

        
        if (prev.estado === 'En Proceso') {
          throw new BadRequestException({ error: 'Una servicio en estado "En Proceso" no puede ser eliminada' });
        }

        if (prev.estado !== 'Finalizada') {
          throw new BadRequestException({ error: 'Para eliminar la servicio debe encontrarse en estado "Finalizada"' });
        }

        await this.repo.remove(prev);
        return { ok: true };
      }

    async buscar(estado?: string, prioridad?: string, categoria?: string) {
    const qb = this.repo.createQueryBuilder('s');
    if (estado) qb.andWhere('s.estado = :estado', { estado });
    if (prioridad) qb.andWhere('s.prioridad = :prioridad', { prioridad });
    if (categoria) qb.andWhere('s.categoria = :categoria', { categoria });
    return qb.getMany();
  }
}