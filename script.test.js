const { addTask, tasks } = require('./scripts/script.js');

describe('Gerenciador de Tarefas - Regras de Negócio', () => {
    beforeEach(() => {
        // Simula o HTML (DOM) necessário para o teste
        document.body.innerHTML = `
            <input type="text" id="taskInput" />
            <select id="priorityInput">
                <option value="baixa">Baixa</option>
            </select>
            <ul id="taskList"></ul>
        `;
        
        // Simula o LocalStorage e o alert
        global.localStorage = { setItem: jest.fn(), getItem: jest.fn(() => '[]') };
        global.alert = jest.fn();
        
        // Limpa as tarefas antes de cada teste
        tasks.length = 0;
    });

    test('Deve adicionar uma tarefa válida com prioridade baixa padrão', () => {
        document.getElementById('taskInput').value = 'Estudar para CCNA';
        document.getElementById('priorityInput').value = 'baixa';
        
        addTask();
        
        expect(tasks.length).toBe(1);
        expect(tasks[0].title).toBe('Estudar para CCNA');
        expect(tasks[0].priority).toBe('baixa');
        expect(tasks[0].completed).toBe(false);
    });

    test('Não deve adicionar tarefa com título vazio', () => {
        document.getElementById('taskInput').value = '   '; // Título vazio/espaços
        
        addTask();
        
        expect(tasks.length).toBe(0);
        expect(global.alert).toHaveBeenCalledWith('Atenção: O título da tarefa não pode ficar vazio!');
    });
});