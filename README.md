# Gerenciador de Tarefas - TDE Sistemas Inteligentes

Este projeto é um Gerenciador de Tarefas (To-Do List) desenvolvido como requisito do Trabalho Discente Efetivo (TDE). O objetivo principal é demonstrar a evolução de um sistema guiado pela qualidade da especificação de requisitos e o impacto do uso de Inteligência Artificial no ciclo de desenvolvimento e testes.

## 🚀 Como Executar o Projeto

1. **Rodar a Aplicação:**
   - Como o projeto foi construído utilizando HTML, CSS e JavaScript puros (Vanilla JS), basta abrir o arquivo `index.html` em qualquer navegador moderno.
   - Alternativamente, você pode usar a extensão "Live Server" no VS Code.

2. **Rodar os Testes Unitários (Jest):**
   - Certifique-se de ter o Node.js instalado.
   - Instale as dependências executando: `npm install`
   - Execute os testes de regras de negócio: `npm run test`

3. **Rodar os Testes E2E (Cypress):**
   - Execute o comando: `npm run cypress:open`
   - Selecione "E2E Testing" e escolha o arquivo `todo.cy.js` para visualizar a simulação de comportamento do usuário.

---

## 📄 Especificação - Versão 1 (Simples)

* **Objetivo:** Desenvolver um gerenciador de tarefas fundamental.
* **Requisitos Funcionais (RF):**
  * **RF01:** Cadastrar novas tarefas digitando um texto.
  * **RF02:** Listar todas as tarefas cadastradas na tela.
  * **RF03:** Marcar uma tarefa como concluída, refletindo a mudança visualmente (texto riscado).

---

## 📄 Especificação - Versão 2 (Evolução)

Nesta etapa, o sistema evoluiu de um simples anotador para um gerenciador com persistência local e gestão de status.

* **Requisitos Funcionais Adicionais:**
  * Edição de texto de tarefas existentes.
  * Exclusão de tarefas.
  * Definição de prioridade (Baixa, Média, Alta) com identificação visual.
  * Filtros de exibição (Todas, Pendentes, Concluídas).
  * Persistência de dados utilizando o `LocalStorage` do navegador.

* **Regras de Negócio (RN):**
  * **RN01:** O campo de título não pode ser submetido vazio ou apenas com espaços (Validação).
  * **RN02:** Caso nenhuma prioridade seja explicitamente escolhida, o sistema assume "Baixa" como padrão.
  * **RN03:** Toda mutação de estado (criar, editar, concluir, deletar) deve engatilhar uma atualização síncrona no LocalStorage.

* **Critérios de Aceite e Cenários de Uso:**
  * **CA01:** Tentativas de cadastro com input vazio disparam um alerta bloqueando a ação.
  * **CA02 (Cenário de Filtro):** Ao clicar em "Pendentes", a interface deve ocultar as tarefas riscadas, exibindo estritamente as não concluídas.
  * **CA03 (Cenário de Persistência):** Ao recarregar a página ou fechar a aba, a lista de tarefas e seus respectivos status devem permanecer intactos.

---

## 🧠 Reflexão Final

**Como a evolução da especificação impactou o desenvolvimento do projeto e os resultados obtidos com o uso da IA?**

A evolução estruturada da especificação demonstrou na prática o conceito central da Engenharia de Software: a qualidade do planejamento dita a qualidade do código. Iniciar com uma Versão 1 simples permitiu validar a arquitetura básica (HTML/JS) sem complexidades prematuras. Ao avançar para a Versão 2, a existência de Regras de Negócio (RN) e Critérios de Aceite (CA) claros transformou o processo de codificação em algo mecânico e previsível, eliminando a ambiguidade. Essa clareza foi fundamental na etapa de qualidade, pois os testes (tanto em Jest quanto em Cypress) foram escritos não com base em "achismos", mas sim espelhando diretamente os Critérios de Aceite documentados.

O uso da Inteligência Artificial (LLM) durante o desenvolvimento atuou como um acelerador e um validador (pair programming). A IA foi crucial no refinamento inicial da especificação, ajudando a traduzir ideias soltas em requisitos formais (nos moldes de SDD/OpenSpec). Além disso, a ferramenta automatizou a geração de *boilerplate* (como a estrutura de configuração do Jest e Cypress) e o mock de dados, permitindo que o foco cognitivo do desenvolvimento ficasse inteiramente na resolução dos problemas lógicos e na garantia do comportamento do sistema. O resultado foi um ciclo de entrega mais rápido, com um código mais semântico e uma cobertura de testes altamente assertiva.