"use strict";
const btnForm = document.getElementById("btn");
const btnUpdate = document.getElementById("btn-update");
const input = document.getElementById("todoinput");
const form = document.querySelector("form");
const list = document.getElementById("todolist");
const todos = readTodos();
let editingIndex = null;
todos.forEach(createTodo);
function readTodos() {
    const todosJSON = localStorage.getItem("todos");
    return todosJSON ? JSON.parse(todosJSON) : [];
}
function saveTodos(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
}
function handleCreateSubmit(e) {
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
function handleUpdateSubmit(e) {
    e.preventDefault();
    const newTodoText = input.value.trim();
    if (newTodoText.length === 0) {
        alert("Todo text cannot be empty!");
        return;
    }
    if (editingIndex !== null) {
        todos[editingIndex].text = newTodoText;
        const liElement = list.children[editingIndex];
        liElement.firstChild.textContent = newTodoText;
        liElement.classList.remove("disabled");
        editingIndex = null;
        saveTodos(todos);
        btnUpdate.classList.add("d-none");
        btnForm.classList.remove("d-none");
        form?.reset();
        if (!form)
            return;
        form.removeEventListener("submit", handleUpdateSubmit);
        form.addEventListener("submit", handleCreateSubmit);
    }
}
function createTodo(todo) {
    const { text, completed } = todo;
    const newLI = document.createElement("LI");
    const newLISpan = document.createElement("span");
    const newLIcheckbox = document.createElement("input");
    const newLIdeleteButton = document.createElement("button");
    newLIcheckbox.type = "checkbox";
    newLIcheckbox.checked = completed;
    newLIdeleteButton.textContent = "Delete";
    newLISpan.textContent = text;
    newLI.append(newLISpan);
    newLI.append(newLIcheckbox);
    newLI.append(newLIdeleteButton);
    list?.append(newLI);
    newLIcheckbox.addEventListener("change", () => {
        todo.completed = newLIcheckbox.checked;
        saveTodos(todos);
    });
    newLISpan.addEventListener("click", () => {
        btnForm.classList.toggle("d-none");
        btnUpdate.classList.toggle("d-none");
        newLI.classList.add("disabled");
        input.value = todo.text;
        editingIndex = Array.from(list.children).indexOf(newLI);
        if (!form)
            return;
        form.removeEventListener("submit", handleCreateSubmit);
        form.addEventListener("submit", handleUpdateSubmit);
    });
    newLIdeleteButton.addEventListener("click", () => {
        const index = todos.indexOf(todo);
        if (index > -1) {
            todos.splice(index, 1);
        }
        list?.removeChild(newLI);
        saveTodos(todos);
    });
}
form?.addEventListener("submit", handleCreateSubmit);
