let tasks = [];

function addTask() {
    const input = document.getElementById('taskInput');
    const title = input.value.trim();

    if (title !== '') {
        const newTask = {
            id: Date.now(),
            title: title,
            completed: false
        };
        
        tasks.push(newTask);
        input.value = '';
        renderTasks();
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        addTask();
    }
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
    }
}

function renderTasks() {
    const list = document.getElementById('taskList');
    list.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        if (task.completed) {
            li.className = 'completed';
        }
        
        li.innerHTML = `
            <label>
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})">
                <span>${task.title}</span>
            </label>
        `;
        list.appendChild(li);
    });
}