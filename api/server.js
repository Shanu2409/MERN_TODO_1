const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const Todo = require("./model/todo");

app.use(cors());

app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/mern-todo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connecte to database"))
  .catch(console.error);

app.get("/todos", async (req, res) => {
  const todos = await Todo.find();

  res.json(todos);
});

app.post("/todo/new", (req, res) => {
  const todo = new Todo({
    text: req.body.text,
  });

  todo.save();

  res.json(todo);
});

app.delete("/todo/delete/:id", async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);

  res.json(result);
});

app.put("/todo/complete/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  // todo.complete = !todo.complete;
  if (todo?.complete) {
    todo.complete = false;
  } else {
    todo.complete = true;
  }

  todo.save();

  res.json(todo);
});

app.listen(3001, () => {
  console.log(`app runningo on http://localhost:3001`);
});
