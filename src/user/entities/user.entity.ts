import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from '../interface';

@Entity()
export class User implements IUser {
  //   @PrimaryGeneratedColumn()
  //   id: number;

  @PrimaryGeneratedColumn()
  userId: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;
}

// "userId": "string" // must be unique
// 	"firstName": "string", // must not be null
// 	"lastName": "string" // must not be null
// 	"email": "string" // must be unique and must not be null
// 	"password": "string" // must not be null
// 	"phone": "string"
