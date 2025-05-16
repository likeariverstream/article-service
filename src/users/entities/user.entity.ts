import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

type UserRow = {
  uuid: string;
  surname: string;
  name: string;
  email: string;
  hashPassword: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
};

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;
  @Column({
    type: 'varchar',
    length: 255,
  })
  surname: string;
  @Column({
    type: 'varchar',
    length: 255,
  })
  name: string;
  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  email: string;
  @Column({ type: 'varchar', length: 1000, name: 'hash_password' })
  hashPassword: string;
  @Column({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;
  @Column({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
  @Column({ type: 'boolean', default: false, name: 'is_deleted' })
  isDeleted: boolean;

  constructor({
    uuid,
    surname,
    name,
    email,
    hashPassword,
    createdAt,
    updatedAt,
    isDeleted,
  }: UserRow) {
    this.uuid = uuid;
    this.surname = surname;
    this.name = name;
    this.email = email;
    this.hashPassword = hashPassword;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.isDeleted = isDeleted;
  }
}
