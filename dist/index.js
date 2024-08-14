"use strict";
const btn = document.getElementById("btn");
const input = document.getElementById("todoinput");
const form = document.querySelector("form");
const list = document.getElementById("todolist");
const todos = readTodos();
todos.forEach(createTodo);
function readTodos() {
    const todosJSON = localStorage.getItem("todos");
    return todosJSON ? JSON.parse(todosJSON) : [];
}
function saveTodos(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
}
function handleSubmit(e) {
    e.preventDefault();
    const newTodoText = input.value.trim();
    if (newTodoText.length === 0) {
        alert("Todo text cannot be empty!");
        return;
    }
    const newTodo = {
        text: newTodoText,
        completed: false,
    };
    createTodo(newTodo);
    todos.push(newTodo);
    saveTodos(todos);
    form?.reset();
}
function createTodo(todo) {
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
