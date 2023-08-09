$(document).ready(function(){
    console.log("Succesful front end connection");
  
    //Functionality for To Do List
    $(function() {
      var todoListItem = $('.todo-list');
      var todoListInput = $('.todo-list-input');
      $('.todo-list-add-btn').on("click", function(event) {
        event.preventDefault();
  
        var item = $(this).prevAll('.todo-list-input').val();
  
        if (item) {
          todoListItem.append("<li><div class='form-check'><label class='form-check-label'><input class='checkbox' type='checkbox'/>" + item + "<i class='input-helper'></i></label></div><i class='remove mdi mdi-close-circle-outline'></i></li>");
          todoListInput.val("");
        }
  
      });
  
      todoListItem.on('change', '.checkbox', function() {
        if ($(this).attr('checked')) {
          $(this).removeAttr('checked');
        } else {
          $(this).attr('checked', 'checked');
        }
  
        $(this).closest("li").toggleClass('completed');
  
      });
  
      todoListItem.on('click', '.remove', function() {
        $(this).parent().remove();
      });
  
    });
  
   
  });
  
  
  //hide list on click
  $("label.menu-btn").click(function(){
      // alert("Add new class.");
      if($('.TodoApp').is(':visible')) {
          // Code
          $(".TodoApp").fadeOut();
          }else{
          
              $(".TodoApp").fadeIn(600);
          }
  
   
  
  });
  
  
//To do list functionality ****************************************************************************************************************/
  
  let todos = [];

      const todoList = document.getElementById("todos");

      const addTodoForm = document.getElementById("add-todo-form");

      function saveTodos() {
        localStorage.setItem("todos", JSON.stringify(todos));
      }

      function loadTodos() {
        if (localStorage.getItem("todos")) {
          todos = JSON.parse(localStorage.getItem("todos"));
          displayTodos();
        }
      }

      addTodoForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const newTodoInput = document.getElementById("new-todo");

        if (!newTodoInput.value) {
          const toast = document.createElement("div");
          toast.classList.add("toast");
          toast.innerText = "Please enter a task";
          document.body.appendChild(toast);

          setTimeout(() => {
            toast.classList.add("show");
            setTimeout(() => {
              toast.classList.remove("show");
              setTimeout(() => {
                document.body.removeChild(toast);
              }, 200);
            }, 2000);
          }, 100);

          return;
        }

        todos.push({
          id: todos.length + 1,
          text: newTodoInput.value,
          completed: false,
        });

        saveTodos();

        newTodoInput.value = "";

        displayTodos();
      });

      function displayTodos() {
        todoList.innerHTML = "";

        todos.forEach((todo) => {
          const listItem = document.createElement("li");

          if (todo.completed) {
            listItem.classList.add("completed");
          }

          listItem.innerHTML = `
      <input type="checkbox" id="todo-${todo.id}" onchange="toggleCompleted(${
            todo.id
          })" ${todo.completed ? "checked" : ""}>
      <label for="todo-${todo.id}">${todo.text}</label>
      <div id="buttonsED">
      <button id="editBtn" onclick="editTask(event)" data-task-id="${todo.id}">Edit</button>
      <button id="deleteBtn" onclick="deleteTask(event)" data-task-id="${
        todo.id
      }">Delete</button></div>
    `;
          todoList.appendChild(listItem);
        });
      }

      function editTask(event) {
        event.preventDefault();

        const taskId = event.target.getAttribute("data-task-id");

        const todo = todos.find((todo) => todo.id == taskId);

        const newText = prompt("Edit task", todo.text);

        if (newText === null) {
          return;
        }

        todo.text = newText;

        saveTodos();

        displayTodos();
      }

      function deleteTask(event) {
        event.preventDefault();

        const taskId = event.target.getAttribute("data-task-id");

        todos = todos.filter((todo) => todo.id != taskId);

        saveTodos();

        displayTodos();
      }

      function toggleCompleted(id) {
        const todo = todos.find((todo) => todo.id == id);

        todo.completed = !todo.completed;

        saveTodos();

        displayTodos();
      }

      loadTodos();
  
  
  