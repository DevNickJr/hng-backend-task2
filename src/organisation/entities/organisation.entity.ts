import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Organisation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  orgId: string;

  @Column()
  name: string;

  @Column()
  description: string;
}
// {
// 	"orgId": "string", // Unique
// 	"name": "string", // Required and cannot be null
// 	"description": "string",
// }
