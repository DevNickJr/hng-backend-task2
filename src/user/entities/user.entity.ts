import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { IUser } from '../interface';
import { UserOrganisation } from 'src/shared/entities/shared.entity';

@Entity()
export class User implements IUser {
  //   @PrimaryGeneratedColumn()
  //   id: number;

  @PrimaryGeneratedColumn('uuid')
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

  @OneToMany(
    () => UserOrganisation,
    (userOrganisation) => userOrganisation.user,
  )
  @JoinTable({
    name: 'UserOrganisation',
    joinColumn: {
      name: 'userId',
    },
    inverseJoinColumn: {
      name: 'orgId',
    },
  })
  userOrganisations: UserOrganisation[];
}

// "userId": "string" // must be unique
// 	"firstName": "string", // must not be null
// 	"lastName": "string" // must not be null
// 	"email": "string" // must be unique and must not be null
// 	"password": "string" // must not be null
// 	"phone": "string"
