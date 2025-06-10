document.addEventListener('DOMContentLoaded', loadTodos);

function loadTodos() {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  const list = document.getElementById('todoList');
  list.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.textContent = todo.text;
    if (todo.completed) li.classList.add('completed');
    li.onclick = () => toggleComplete(index);
    
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.className = 'delete-btn';
    delBtn.onclick = (e) => {
      e.stopPropagation();
      deleteTodo(index);
    };

    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

function addTodo() {
  const input = document.getElementById('todoInput');
  if (!input.value.trim()) return;
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.push({ text: input.value, completed: false });
  localStorage.setItem('todos', JSON.stringify(todos));
  input.value = '';
  loadTodos();
}

function toggleComplete(index) {
  const todos = JSON.parse(localStorage.getItem('todos'));
  todos[index].completed = !todos[index].completed;
  localStorage.setItem('todos', JSON.stringify(todos));
  loadTodos();
}

function deleteTodo(index) {
  const todos = JSON.parse(localStorage.getItem('todos'));
  todos.splice(index, 1);
  localStorage.setItem('todos', JSON.stringify(todos));
  loadTodos();
}