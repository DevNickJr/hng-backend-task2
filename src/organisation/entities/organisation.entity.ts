import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IOrganisation } from '../interface';
import { UserOrganisation } from 'src/shared/entities/shared.entity';

@Entity()
export class Organisation implements IOrganisation {
  @PrimaryGeneratedColumn('uuid')
  orgId: string;

  @Column()
  name: string;

  @Column()
  description?: string;

  @OneToMany(
    () => UserOrganisation,
    (userOrganisation) => userOrganisation.organisation,
  )
  userOrganisations: UserOrganisation[];
}
// {
// 	"orgId": "string", // Unique
// 	"name": "string", // Required and cannot be null
// 	"description": "string",
// }
