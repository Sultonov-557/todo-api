import { Column, DataSource, Entity } from "typeorm";

@Entity()
export class Todo {
  @Column()
  id: number;

  @Column()
  title: string;

  @Column()
  completed: boolean;
}

export const datasource = new DataSource({
  type: "sqlite",
  database: "todo.db",
  entities: [Todo],
});
