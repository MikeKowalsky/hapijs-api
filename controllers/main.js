const Todo = require("../models/todo");

exports.getIndex = (request, h) => h.file("index.html");

//curl http://localhost:3000/todos
exports.getTodos = async (request, h) => {
  try {
    const tasks = await Todo.find();
    console.log(tasks);

    return h.view("index", {
      title: "Todos",
      tasks,
      show: true
    });
  } catch (err) {
    throw err;
  }
};

// curl -X POST  http://localhost:3000/todos
// curl -d '{"task":"Task four"}' -H "Content-Type: application/json" -X POST http://localhost:3000/todos
exports.addTodo = async (request, h) => {
  console.log(request.payload);
  const newTodo = new Todo(request.payload);
  try {
    await newTodo.save();
  } catch (err) {
    throw err;
  }

  h.response("created").code(201);
  return newTodo;
};
