import { Column, DataSource, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "string" })
  title: string;

  @Column({ type: "boolean" })
  completed: boolean;
}

export const datasource = new DataSource({
  type: "sqlite",
  database: "todo.db",
  entities: [Todo],
});
