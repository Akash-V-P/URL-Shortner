import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Url {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orignalUrl: string;

  @Column()
  shortUrl: string;

  @Column()
  clicks: number;
}
