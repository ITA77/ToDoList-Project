function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
  }
  
  function createTaskElement(task, index) {
    const taskItem = document.createElement('li');
    taskItem.className = `task-item${task.completed ? ' completed' : ''}`;
  
    const taskText = document.createElement('span');
    taskText.textContent = task.text;
    taskItem.appendChild(taskText);
  
    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.className = 'complete-button';
    completeButton.addEventListener('click', () => {
      toggleTaskCompletion(index);
    });
    taskItem.appendChild(completeButton);
  
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';
    deleteButton.addEventListener('click', () => {
      deleteTask(index);
    });
    taskItem.appendChild(deleteButton);
  
    return taskItem;
  }
  
  function renderTasks() {
    const tasks = getTasks();
    const taskList = document.querySelector('#taskList');
    taskList.innerHTML = '';
  
    tasks.forEach((task, index) => {
      const taskElement = createTaskElement(task, index);
      taskList.appendChild(taskElement);
    });
  }
  
  function addTask(text) {
    const tasks = getTasks();
    tasks.push({ text, completed: false });
    saveTasks(tasks);
    renderTasks();
  }
  
  function deleteTask(index) {
    const tasks = getTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
    renderTasks();
  }
  
  function toggleTaskCompletion(index) {
    const tasks = getTasks();
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);
    renderTasks();
  }
  
  document.querySelector('#addTaskButton').addEventListener('click', () => {
    const taskInput = document.querySelector('#taskInput');
    const taskText = taskInput.value.trim();
  
    if (taskText) {
      addTask(taskText);
      taskInput.value = '';
    } else {
      alert('Please enter a task.');
    }
  });
  
  renderTasks();
  