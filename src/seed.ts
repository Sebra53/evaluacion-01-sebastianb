import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DataSource } from 'typeorm'
import { Servicio } from './servicios/entities/servicio.entity'

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule)
  const ds = app.get(DataSource)
  const repo = ds.getRepository(Servicio)

  const base = [
    {
      titulo: 'Fallo de red en oficina central',
      cliente: 'empresa x',
      categoria: 'redes',
      prioridad: 'Alta',
      estado: 'Pendiente',
      descripcion: 'El router del piso 2 no asigna direcciones IP a los equipos conectores.',
      fechaSolicitud: '2026-03-20T10:00:00.000Z',
    },
    {
      titulo: 'Error de licencias en Office',
      cliente: 'constructora 444',
      categoria: 'software',
      prioridad: 'Media',
      estado: 'En Proceso',
      descripcion: 'Las computadoras del área contable muestran aviso de licencia vencida.',
      fechaSolicitud: '2026-03-21T11:30:00.000Z',
    },
    {
      titulo: 'mantenimiento PC',
      cliente: 'agencia 123',
      categoria: 'hardware',
      prioridad: 'Baja',
      estado: 'Finalizada',
      descripcion: 'Se realiza limpieza de componentes y cambio de pasta térmica a la CPU.',
      fechaSolicitud: '2026-03-15T09:00:00.000Z',
    },
  ]

  await repo.save(base)
  console.log('Datos de ejemplo insertados')
  await app.close()
}

bootstrap()