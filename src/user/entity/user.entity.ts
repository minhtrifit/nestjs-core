import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from 'src/models/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column('text', { array: true })
  roles: Role[];
}
