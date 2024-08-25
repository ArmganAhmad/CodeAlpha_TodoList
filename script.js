// Get elements
const newTodoInput = document.getElementById('new-todo');
const newTodoDateInput = document.getElementById('new-todo-date');
const addTodoButton = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');
const clearCompletedButton = document.getElementById('clear-completed');
const markAllCompleteButton = document.getElementById('mark-all-completed');
const filterSelect = document.getElementById('filter');

// Initialize todo list array
let todos = [];

// Function to render todo list
function renderTodoList(todos) {
  todoList.innerHTML = '';
  if (todos.length === 0) {
    todoList.innerHTML = '<p>No todos found.</p>';
  } else {
    todos.forEach((todo) => {
      const todoElement = document.createElement('li');
      todoElement.textContent = `${todo.text} - Due: ${todo.date}`;
      if (todo.completed) {
        todoElement.classList.add('completed');
      }
      const deleteButton = document.createElement('button');
      deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
      deleteButton.addEventListener('click', () => {
        deleteTodo(todo.id);
      });
      todoElement.appendChild(deleteButton);
      const editButton = document.createElement('button');
      editButton.innerHTML = '<i class="fas fa-pen"></i>';
      editButton.addEventListener('click', () => {
        editTodo(todo.id);
      });
      todoElement.appendChild(editButton);
      const completeButton = document.createElement('button');
      completeButton.innerHTML = '<i class="fas fa-check"></i>';
      completeButton.addEventListener('click', () => {
        completeTodo(todo.id);
      });
      todoElement.appendChild(completeButton);
      todoList.appendChild(todoElement);
    });
  }
}

// Function to add new todo
function addTodo() {
  const text = newTodoInput.value.trim();
  const date = newTodoDateInput.value.trim();
  if (text && date) {
    const newTodo = {
      id: Date.now(),
      text,
      date,
      completed: false,
    };
    todos.push(newTodo);
    newTodoInput.value = '';
    newTodoDateInput.value = '';
    renderTodoList(todos);
  } else {
    alert('Please enter a valid text and date.');
  }
}

// Function to delete todo
function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  renderTodoList(todos);
}

// Function to edit todo
function editTodo(id) {
  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    const newText = prompt('Enter new text:', todo.text);
    const newDate = prompt('Enter new date:', todo.date);
    if (newText && newDate) {
      todo.text = newText;
      todo.date = newDate;
      renderTodoList(todos);
    }
  }
}

// Function to complete todo
function completeTodo(id) {
  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    todo.completed = true;
    renderTodoList(todos);
  }
}

// Function to clear completed todos
function clearCompletedTodos() {
  todos = todos.filter((todo) => !todo.completed);
  renderTodoList(todos);
}

// Function to mark all todos as completed
function markAllComplete() {
  todos.forEach((todo) => {
    todo.completed = true;
  });
  renderTodoList(todos);
}

// Function to filter todos
function filterTodos() {
  const selectedOption = filterSelect.value;
  if (selectedOption === 'all') {
    renderTodoList(todos);
  } else if (selectedOption === 'completed') {
    const completedTodos = todos.filter((todo) => todo.completed);
    renderTodoList(completedTodos);
  } else if (selectedOption === 'pending') {
    const pendingTodos = todos.filter((todo) => !todo.completed);
    renderTodoList(pendingTodos);
  }
}

// Event listeners
addTodoButton.addEventListener('click', addTodo);
clearCompletedButton.addEventListener('click', clearCompletedTodos);
markAllCompleteButton.addEventListener('click', markAllComplete);
filterSelect.addEventListener('change', filterTodos);