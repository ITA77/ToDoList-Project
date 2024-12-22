// Функція для збереження завдань у LocalStorage
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  // Функція для отримання завдань із LocalStorage
  function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
  }
  
  // Функція для створення HTML елемента завдання
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
  
  // Функція для відображення списку завдань
  function renderTasks() {
    const tasks = getTasks();
    const taskList = document.querySelector('#taskList');
    taskList.innerHTML = '';
  
    tasks.forEach((task, index) => {
      const taskElement = createTaskElement(task, index);
      taskList.appendChild(taskElement);
    });
  }
  
  // Функція для додавання нового завдання
  function addTask(text) {
    const tasks = getTasks();
    tasks.push({ text, completed: false });
    saveTasks(tasks);
    renderTasks();
  }
  
  // Функція для видалення завдання
  function deleteTask(index) {
    const tasks = getTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
    renderTasks();
  }
  
  // Функція для позначення завдання як виконаного
  function toggleTaskCompletion(index) {
    const tasks = getTasks();
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);
    renderTasks();
  }
  
  // Додавання обробника для кнопки додавання завдання
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
  
  // Початкова ініціалізація
  renderTasks();
  