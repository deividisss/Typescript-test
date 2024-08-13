interface Todo {
  text: string;
  completed: boolean;
}

const todos: Todo[] = [];

const btn = document.getElementById("btn") as HTMLButtonElement;
const input = document.getElementById("todoinput") as HTMLInputElement;
const form = document.querySelector("form")!;
const list = document.getElementById("todolist")!;

function handleSubmit(e: SubmitEvent) {
  e.preventDefault();
  const newTodoText = input.value.trim();

  if (newTodoText.length === 0) {
    alert("Todo text cannot be empty!");
    return;
  }

  const newTodo: Todo = {
    text: newTodoText,
    completed: false,
  };

  createTodo(newTodo);
  todos.push(newTodo);
  form.reset();
}

function createTodo(todo: Todo) {
  const { text } = todo;

  const newLI = document.createElement("LI");
  const checkbox = document.createElement("input");

  checkbox.type = "checkbox";
  newLI.append(text);
  newLI.append(checkbox);
  list?.append(newLI);
}

form.addEventListener("submit", handleSubmit);
