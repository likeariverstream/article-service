import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

type UserRow = {
  uuid: string;
  surname: string;
  name: string;
  email: string;
  hashPassword: string;
  refreshToken: string;
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
  @Column({ type: 'varchar', length: 255, name: 'refresh_token' })
  refreshToken: string;
  @Column({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;
  @Column({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
  @Column({ type: 'boolean', default: false, name: 'is_deleted' })
  isDeleted: boolean;

  constructor(row: UserRow) {
    this.uuid = row.uuid;
    this.surname = row.surname;
    this.name = row.name;
    this.email = row.email;
    this.hashPassword = row.hashPassword;
    this.refreshToken = row.refreshToken;
    this.createdAt = row.createdAt;
    this.updatedAt = row.updatedAt;
    this.isDeleted = row.isDeleted;
  }
}
