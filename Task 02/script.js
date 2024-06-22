document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
});

function addTask() {
    const taskTitle = document.getElementById('task-title').value;
    const taskDeadline = document.getElementById('task-deadline').value;
    const taskPriority = document.getElementById('task-priority').value;
    const taskLabel = document.getElementById('task-label').value;

    if (taskTitle === '' || taskDeadline === '' || taskPriority === '') {
        alert('Please fill in all required fields.');
        return;
    }

    const task = {
        title: taskTitle,
        deadline: taskDeadline,
        priority: taskPriority,
        label: taskLabel
    };

    saveTask(task);
    renderTask(task);

    document.getElementById('task-title').value = '';
    document.getElementById('task-deadline').value = '';
    document.getElementById('task-priority').value = '';
    document.getElementById('task-label').value = '';
}

function saveTask(task) {
    let tasks = localStorage.getItem('tasks');
    if (!tasks) {
        tasks = [];
    } else {
        tasks = JSON.parse(tasks);
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = localStorage.getItem('tasks');
    if (!tasks) {
        tasks = [];
    } else {
        tasks = JSON.parse(tasks);
    }

    tasks.forEach(task => renderTask(task));
}

function renderTask(task) {
    const taskList = document.getElementById('tasks');
    const taskItem = document.createElement('li');
    taskItem.dataset.priority = task.priority;
    taskItem.innerHTML = `
        <div class="task-info">
            <span class="task-title">${task.title}</span>
            <span class="task-details">
                <img src="${getLabelIcon(task.label)}" alt="${task.label}">
                Deadline: ${task.deadline} - ${task.label}
            </span>
        </div>
        <div class="task-actions">
            <button onclick="removeTask(this)">
                Delete
            </button>
        </div>
    `;
    taskList.appendChild(taskItem);
}

function getLabelIcon(label) {
    switch (label.toLowerCase()) {
        case 'design':
            return 'https://th.bing.com/th/id/R.4ddb720e8e8b93fd97ffcd8c088f6d8f?rik=MA%2bs2UH%2b6e7ZVQ&riu=http%3a%2f%2fimages.gofreedownload.net%2f3%2fdesign-icons-set-11012.jpg&ehk=iyGVQGyuTyW6yRH4E2n95WSqezV7Dk1iGZHMqnNHI7k%3d&risl=&pid=ImgRaw&r=0';
        case 'development':
            return 'https://wallpaperbat.com/img/335193-apple-developer-wallpaper-just-in-time-for-wwdc.png';
        case 'testing':
            return 'https://th.bing.com/th/id/OIP.5-whAjZcDMhs8MA2So7y3wHaHa?rs=1&pid=ImgDetMain';
        case 'research':
            return 'https://icon-library.com/images/research-icon/research-icon-15.jpg';
        case 'documentation':
            return 'https://th.bing.com/th/id/OIP.-aZt1hMXnbJkrFWvJpoVrAHaHa?rs=1&pid=ImgDetMain';
        default:
            return '';
    }
}

function removeTask(button) {
    const taskItem = button.parentElement.parentElement;
    const taskTitle = taskItem.querySelector('.task-title').innerText;
    let tasks = localStorage.getItem('tasks');
    if (!tasks) {
        return;
    }

    tasks = JSON.parse(tasks);
    tasks = tasks.filter(task => task.title !== taskTitle);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskItem.remove();
}
