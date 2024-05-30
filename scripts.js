document.addEventListener('DOMContentLoaded', loadTasks);

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

taskForm.addEventListener('submit', addTask);
taskList.addEventListener('click', handleTaskClick);

function addTask(event) {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText) {
        const task = createTaskElement(taskText);
        taskList.appendChild(task);
        saveTask(taskText);
        taskInput.value = '';
    }
}

function handleTaskClick(event) {
    const target = event.target;
    const taskItem = target.closest('.task');

    if (target.classList.contains('edit')) {
        editTask(taskItem);
    } else if (target.classList.contains('delete')) {
        deleteTask(taskItem);
    } else if (target.classList.contains('complete')) {
        toggleTaskCompletion(taskItem);
    }
}

function createTaskElement(taskText) {
    const li = document.createElement('li');
    li.className = 'task';
    li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <div class="task-buttons">
            <button class="complete">✔</button>
            <button class="edit">✎</button>
            <button class="delete">✖</button>
        </div>
    `;
    return li;
}

function editTask(taskItem) {
    const taskText = taskItem.querySelector('.task-text');
    const newTaskText = prompt('Edit task:', taskText.textContent);
    if (newTaskText) {
        updateTask(taskText.textContent, newTaskText);
        taskText.textContent = newTaskText;
    }
}

function deleteTask(taskItem) {
    const taskText = taskItem.querySelector('.task-text').textContent;
    removeTask(taskText);
    taskItem.remove();
}

function toggleTaskCompletion(taskItem) {
    taskItem.classList.toggle('completed');
    const taskText = taskItem.querySelector('.task-text').textContent;
    updateTaskStatus(taskText, taskItem.classList.contains('completed'));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const taskElement = createTaskElement(task.text);
        if (task.completed) {
            taskElement.classList.add('completed');
        }
        taskList.appendChild(taskElement);
    });
}

function saveTask(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTask(oldText, newText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = tasks.findIndex(task => task.text === oldText);
    if (taskIndex !== -1) {
        tasks[taskIndex].text = newText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function removeTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskStatus(taskText, completed) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = tasks.findIndex(task => task.text === taskText);
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}
