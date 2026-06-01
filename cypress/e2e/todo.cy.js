describe('Gerenciador de Tarefas - Fluxo E2E', () => {
  beforeEach(() => {
    // Abre o nosso arquivo HTML local antes de cada teste
    // Nota: Se der erro de caminho, você pode trocar './index.html' 
    // pela URL do seu Live Server, ex: 'http://127.0.0.1:5500/index.html'
    cy.visit('./index.html');
  });

  it('Deve realizar o fluxo completo: cadastrar, concluir e excluir uma tarefa', () => {
    // 1. Simula o cadastro de uma tarefa
    cy.get('#taskInput').type('Entregar TDE de Sistemas');
    cy.get('#priorityInput').select('alta');
    cy.contains('button', 'Cadastrar').click();

    // Verifica se a tarefa apareceu na tela com os dados corretos
    cy.get('#taskList').should('contain', 'Entregar TDE de Sistemas');
    cy.get('.badge').should('contain', 'ALTA');

    // 2. Simula a conclusão da tarefa (clicando no checkbox)
    cy.get('input[type="checkbox"]').check();
    cy.get('li').should('have.class', 'completed');

    // 3. Simula a exclusão da tarefa (clicando na lixeira)
    cy.get('.btn-delete').click();
    
    // Verifica se a lista ficou vazia de novo
    cy.get('#taskList').should('not.contain', 'Entregar TDE de Sistemas');
  });
});