//Selectors
const todoList = document.querySelector(".todo-list");
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-btn");
const filter = document.querySelector(".filter-todo");

//event listeners
window.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filter.addEventListener("click", filterTodo);

//functions
function addTodo(e) {
  //Prevent form from submitting
  e.preventDefault();

  //Create TodoDiv
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo-div");

  //Create Li
  const todoLi = document.createElement("li");
  todoLi.innerText = todoInput.value;
  saveLocalTodos(todoInput.value);
  todoLi.classList.add("todo-item");
  todoDiv.appendChild(todoLi);

  //Create Completed button
  const completedBtn = document.createElement("button");
  completedBtn.innerHTML = `<i class = "fas fa-check"></>`;
  completedBtn.classList.add("complete-btn");
  todoDiv.appendChild(completedBtn);

  //Create Trash button
  const trashBtn = document.createElement("button");
  trashBtn.innerHTML = `<i class = "fas fa-trash"></i>`;
  trashBtn.classList.add("trash-btn");
  todoDiv.appendChild(trashBtn);

  //Append to List
  todoList.appendChild(todoDiv);
  //Clear input value
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;

  //Delete Todo item
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.remove();
    removeLocalTodos(todo);
  }

  //strike through todo
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;

      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;

      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
}

function saveLocalTodos(todo){
 let todos;
 if(localStorage.getItem("todos") === null){
  todos = []
 }
 else{
  todos = JSON.parse(localStorage.getItem("todos"));
 }

 todos.push(todo);
 localStorage.setItem("todos", JSON.stringify(todos));
}


function removeLocalTodos(todo){
  let todos;
  if(localStorage.getItem("todos") === null){
    todos = [];
  }
  else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
  let todos;
  if(localStorage.getItem("todos")=== null){
    todos = [];
  }
  else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function(todo){
    //Create TodoDiv
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-div");

    //Create Li
    const todoLi = document.createElement("li");
    todoLi.innerText = todo;
    todoLi.classList.add("todo-item");
    todoDiv.appendChild(todoLi);

    //Create Completed button
    const completedBtn = document.createElement("button");
    completedBtn.innerHTML = `<i class = "fas fa-check"></>`;
    completedBtn.classList.add("complete-btn");
    todoDiv.appendChild(completedBtn);

    //Create Trash button
    const trashBtn = document.createElement("button");
    trashBtn.innerHTML = `<i class = "fas fa-trash"></i>`;
    trashBtn.classList.add("trash-btn");
    todoDiv.appendChild(trashBtn);

    //Append to List
    todoList.appendChild(todoDiv);
  });
}
