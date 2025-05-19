import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

type UserRow = {
  uuid: string;
  surname: string;
  name: string;
  email: string;
  hashPassword: string;
  refreshToken: string;
  createdAt: string;
  updatedAt: string | null;
  isDeleted: boolean;
};

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  uuid?: string;
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
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'refresh_token',
  })
  refreshToken: string | null;
  @Column({ type: 'timestamptz', name: 'created_at' })
  createdAt?: string;
  @Column({ type: 'timestamptz', nullable: true, name: 'updated_at' })
  updatedAt: string | null;
  @Column({ type: 'boolean', default: false, name: 'is_deleted' })
  isDeleted: boolean;
  /* Required for strict mode in tsconfig.json */
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
