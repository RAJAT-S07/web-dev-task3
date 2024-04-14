let tasks = [];

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();
  const prioritySelect = document.getElementById('prioritySelect');
  const priority = prioritySelect.value;

  if (taskText === '') {
    alert('Please enter a task.');
    return;
  }

  tasks.push({ text: taskText, priority: priority, status: 'pending' });
  renderTasks();
  saveTasks();
  taskInput.value = '';
}

function editTask(index, newText) {
  tasks[index].text = newText;
  renderTasks();
  saveTasks();
}

function toggleStatus(index) {
  tasks[index].status = tasks[index].status === 'pending' ? 'completed' : 'pending';
  renderTasks();
  saveTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
  saveTasks();
}

function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.classList.add('task-item');
    if (task.status === 'completed') {
      li.classList.add('completed');
    }

    const taskText = document.createElement('span');
    taskText.textContent = task.text;

    const priority = document.createElement('span');
    priority.textContent = `[${task.priority}]`;
    priority.classList.add('priority');

    const statusBtn = document.createElement('button');
    statusBtn.textContent = task.status === 'pending' ? 'Mark as Completed' : 'Mark as Pending';
    statusBtn.classList.add('status-btn');
    statusBtn.onclick = () => toggleStatus(index);

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit-btn');
    editBtn.onclick = () => {
      const newText = prompt('Enter new task text:', task.text);
      if (newText !== null) {
        editTask(index, newText.trim());
      }
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.onclick = () => deleteTask(index);

    li.appendChild(taskText);
    li.appendChild(priority);
    li.appendChild(statusBtn);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    renderTasks();
  }
}

loadTasks();
