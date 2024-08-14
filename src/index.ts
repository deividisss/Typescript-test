interface Todo {
  text: string;
  completed: boolean;
}

const btn = document.getElementById("btn") as HTMLButtonElement;
const input = document.getElementById("todoinput") as HTMLInputElement;
const form = document.querySelector("form");
const list = document.getElementById("todolist");

const todos: Todo[] = readTodos();
todos.forEach(createTodo);

function readTodos(): Todo[] {
  const todosJSON = localStorage.getItem("todos");
  return todosJSON ? JSON.parse(todosJSON) : [];
}

function saveTodos(todos: Todo[]): void {
  localStorage.setItem("todos", JSON.stringify(todos));
}

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

  saveTodos(todos);
  form?.reset();
}

function createTodo(todo: Todo) {
  const { text, completed } = todo;

  const newLI = document.createElement("LI");
  const checkbox = document.createElement("input");

  checkbox.type = "checkbox";
  checkbox.checked = completed;
  
  newLI.append(text);
  newLI.append(checkbox);
  list?.append(newLI);

  checkbox.addEventListener("change", () => {
    todo.completed = checkbox.checked;
    saveTodos(todos);
  });
}

form?.addEventListener("submit", handleSubmit);
