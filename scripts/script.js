// Carrega do LocalStorage ou inicia um array vazio
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';

// Função para persistir os dados localmente (LocalStorage)
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// RF01 / RN01 / RN02 - Cadastrar tarefa com validação e prioridade
function addTask() {
    const input = document.getElementById('taskInput');
    const prioritySelect = document.getElementById('priorityInput');
    const title = input.value.trim();
    const priority = prioritySelect.value;

    // Validação de campo obrigatório
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
    prioritySelect.value = 'baixa'; // Retorna ao padrão
    
    saveTasks();
    renderTasks();
}

function handleKeyPress(event) {
    if (event.key === 'Enter') addTask();
}

// Concluir Tarefa
function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}

// Excluir Tarefa
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
}

// Editar Tarefa com validação
function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const newTitle = prompt('Edite o nome da sua tarefa:', task.title);
    
    // Se o usuário não cancelar o prompt
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

// Filtros por Status
function setFilter(filterType) {
    currentFilter = filterType;
    
    // Atualiza a parte visual dos botões
    document.querySelectorAll('.filters button').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`btn-${filterType}`).classList.add('active');

    renderTasks();
}

// Renderização das tarefas
function renderTasks() {
    const list = document.getElementById('taskList');
    list.innerHTML = ''; 

    // Aplica o filtro atual antes de renderizar
    let filteredTasks = tasks;
    if (currentFilter === 'pending') {
        filteredTasks = tasks.filter(t => !t.completed);
    } else if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(t => t.completed);
    }

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        if (task.completed) li.className = 'completed';

        // Cores das tags de prioridade
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