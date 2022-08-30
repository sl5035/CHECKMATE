import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  // TODO: Fix the default value
  @Column({ default: true })
  admin: boolean;

  // TODO: Delete
  @AfterInsert()
  logInsert() {
    console.log(`Inserted User with id: ${this.id}`);
  }

  // TODO: Delete
  @AfterUpdate()
  logUpdate() {
    console.log(`Updated User with id: ${this.id}`);
  }

  // TODO: Delete
  @AfterRemove()
  logRemove() {
    console.log(`Deleted User with id: ${this.id}`);
  }
}
