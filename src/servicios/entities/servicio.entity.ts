import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Servicio {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  titulo: string

  @Column({ nullable: false })
  cliente: string

  @Column({
    type: 'enum',
    enum: ['Hardware', 'Software', 'Redes', 'Seguridad', 'Soporte Usuario'],
  })
  categoria: string

  @Column({
    type: 'enum',
    enum: ['Baja', 'Media', 'Alta', 'Crítica'],
  })
  prioridad: string

  @Column({
    type: 'varchar',
    default: 'Pendiente',
  })
  estado: string

  @Column({ type: 'text' })
  descripcion: string

  @Column({ type: 'datetime', nullable: false })
  fechaSolicitud: string
}