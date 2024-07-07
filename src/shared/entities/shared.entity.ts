import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  PrimaryColumn,
  JoinColumn,
} from 'typeorm';
import { IUserOrganisation } from '../interface';
import { User } from 'src/user/entities/user.entity';
import { Organisation } from 'src/organisation/entities/organisation.entity';

@Entity()
export class UserOrganisation implements IUserOrganisation {
  @PrimaryGeneratedColumn()
  userOrganisationId: number;

  @PrimaryColumn()
  orgId: string;

  @PrimaryColumn()
  userId: string;

  @Column({ nullable: true })
  isOwner?: boolean;

  @ManyToOne(() => User, (user) => user.userOrganisations)
  @JoinColumn([{ name: 'userId', referencedColumnName: 'userId' }])
  user: User;

  @ManyToOne(
    () => Organisation,
    (organisation) => organisation.userOrganisations,
  )
  @JoinColumn([{ name: 'orgId', referencedColumnName: 'orgId' }])
  organisation: Organisation;
}
// {
// 	"orgId": "string", // Unique
// 	"name": "string", // Required and cannot be null
// 	"description": "string",
// }
