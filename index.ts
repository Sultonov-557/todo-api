import "reflect-metadata";
import express from "express";
import { datasource, Todo } from "./database";
import cors from "cors";

const todoRepo = datasource.getRepository(Todo);

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  const todos = await todoRepo.find({});
  res.json(todos);
});

app.post("/", async (req, res) => {
  const { title } = req.body;

  const todo = await todoRepo.save({ title });
  res.json(todo);
});

app.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const todo = await todoRepo.findOneBy({ id: +id });
  if (!todo) {
    res.json({ message: "todo not found" });
    return;
  }
  todo.title = title || todo.title;
  todo.completed = completed || todo.completed;
  await todoRepo.save(todo);
  res.json(todo);
});

app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const todo = await todoRepo.findOneBy({ id: +id });
  if (!todo) {
    res.json({ message: "todo not found" });
    return;
  }
  await todoRepo.remove(todo);
  res.json({ message: "todo deleted" });
});

app.listen(3000, () => console.log("started at http://localhost:3000"));
