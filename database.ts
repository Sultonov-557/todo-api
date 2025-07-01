import { Column, DataSource, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  title: string;

  @Column({ type: "boolean", default: false })
  completed: boolean;
}

export const datasource = new DataSource({
  type: "sqlite",
  database: "todo.db",
  synchronize: true,
  entities: [Todo],
});

datasource.initialize();
