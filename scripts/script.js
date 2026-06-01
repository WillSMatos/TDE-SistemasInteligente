// Carrega do LocalStorage ou inicia um array vazio
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    const input = document.getElementById('taskInput');
    const prioritySelect = document.getElementById('priorityInput');
    const title = input.value.trim();
    const priority = prioritySelect.value;

    if (!title) {
        alert('Atenção: O título da tarefa não pode ficar vazio!');
        return;
    }

    const newTask = {
        id: Date.now(),
        title: title,
        completed: false,
        priority: priority
    };
    
    tasks.push(newTask);
    input.value = ''; 
    prioritySelect.value = 'baixa'; 
    
    saveTasks();
    renderTasks();
}

function handleKeyPress(event) {
    if (event.key === 'Enter') addTask();
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const newTitle = prompt('Edite o nome da sua tarefa:', task.title);
    
    if (newTitle !== null) {
        const trimmedTitle = newTitle.trim();
        if (!trimmedTitle) {
            alert('Operação cancelada: O título não pode ficar vazio!');
            return;
        }
        task.title = trimmedTitle;
        saveTasks();
        renderTasks();
    }
}

function setFilter(filterType) {
    currentFilter = filterType;
    
    const buttons = document.querySelectorAll('.filters button');
    if (buttons.length > 0) {
        buttons.forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.getElementById(`btn-${filterType}`);
        if (activeBtn) activeBtn.classList.add('active');
    }

    renderTasks();
}

function renderTasks() {
    const list = document.getElementById('taskList');
    
    // Trava de segurança para os testes do Jest
    if (!list) return; 

    list.innerHTML = ''; 

    let filteredTasks = tasks;
    if (currentFilter === 'pending') {
        filteredTasks = tasks.filter(t => !t.completed);
    } else if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(t => t.completed);
    }

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        if (task.completed) li.className = 'completed';

        const priorityColors = {
            baixa: '#28a745',
            media: '#ffc107',
            alta: '#dc3545'
        };

        li.innerHTML = `
            <div class="task-content">
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})">
                <span class="task-title">${task.title}</span>
                <span class="badge" style="background-color: ${priorityColors[task.priority]}">
                    ${task.priority.toUpperCase()}
                </span>
            </div>
            <div class="actions">
                <button class="btn-edit" onclick="editTask(${task.id})">✏️</button>
                <button class="btn-delete" onclick="deleteTask(${task.id})">🗑️</button>
            </div>
        `;
        list.appendChild(li);
    });
}

// Renderiza a lista na tela logo que a página carrega
renderTasks();

// Exporta as funções para o Jest (somente se estiver em ambiente Node)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        addTask, toggleTask, deleteTask, editTask, setFilter, renderTasks, 
        tasks, saveTasks 
    };
}