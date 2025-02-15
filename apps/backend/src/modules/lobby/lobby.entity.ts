import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { User } from "../user/user.entity";

@Entity()
export class Lobby {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column({ default: 0 })
  maxPlayers!: number;

  @ManyToMany(() => User)
  @JoinTable()
  players!: Partial<User>[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @Column({ type: "timestamp", nullable: true })
  lastEmptyAt!: Date | null;
}
