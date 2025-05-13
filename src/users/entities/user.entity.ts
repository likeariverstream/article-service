import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

type UserRow = {
  uuid: string;
  surname: string;
  name: string;
  email: string;
  hashPassword: string;
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

  constructor({ uuid, surname, name, email, hashPassword }: UserRow) {
    this.uuid = uuid;
    this.surname = surname;
    this.name = name;
    this.email = email;
    this.hashPassword = hashPassword;
  }
}
