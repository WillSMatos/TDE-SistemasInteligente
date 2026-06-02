# Documento de Especificação de Requisitos de Software (DRS)
**Projeto:** Gerenciador de Tarefas (To-Do List)

## 1. Introdução
Este documento descreve os requisitos funcionais, não funcionais e as regras de negócio para o desenvolvimento do sistema Gerenciador de Tarefas, construído como parte do Trabalho Discente Efetivo (TDE). O sistema visa permitir que os usuários organizem suas atividades diárias através de uma interface web simples e reativa.

## 2. Atores
* **Usuário:** Pessoa que interage com o sistema para registrar, editar, visualizar e concluir tarefas.

## 3. Requisitos Funcionais (RF)
As funcionalidades que o sistema deve prover para o usuário.

| ID | Nome | Descrição | Prioridade |
|---|---|---|---|
| **RF01** | Cadastrar Tarefa | O sistema deve permitir ao usuário inserir uma nova tarefa informando um título. | Alta |
| **RF02** | Definir Prioridade | O sistema deve permitir selecionar a prioridade da tarefa (Baixa, Média, Alta) no momento do cadastro. | Média |
| **RF03** | Listar Tarefas | O sistema deve exibir todas as tarefas salvas em formato de lista. | Alta |
| **RF04** | Concluir Tarefa | O sistema deve permitir marcar uma tarefa como concluída (status visual tachado). | Alta |
| **RF05** | Editar Tarefa | O sistema deve permitir a alteração do título de uma tarefa já cadastrada. | Média |
| **RF06** | Excluir Tarefa | O sistema deve permitir a remoção definitiva de uma tarefa da lista. | Alta |
| **RF07** | Filtrar Tarefas | O sistema deve disponibilizar filtros para visualizar: Todas, Pendentes ou Concluídas. | Baixa |

## 4. Requisitos Não Funcionais (RNF)
As restrições e qualidades técnicas do sistema.

| ID | Nome | Descrição |
|---|---|---|
| **RNF01** | Tecnologias | O sistema deve ser desenvolvido utilizando a tríade padrão da web: HTML5, CSS3 e JavaScript Vanilla. |
| **RNF02** | Persistência | Os dados devem ser armazenados localmente no navegador do usuário utilizando a API de `LocalStorage`. |
| **RNF03** | Responsividade | A interface deve ser responsiva, adaptando-se a diferentes tamanhos de tela (desktop e mobile). |
| **RNF04** | Qualidade | O código deve possuir cobertura de testes unitários (Jest) e testes de comportamento E2E (Cypress). |

## 5. Regras de Negócio (RN)
| ID | Descrição |
|---|---|
| **RN01** | **Validação de Preenchimento:** Não é permitido o cadastro ou a edição de uma tarefa com o campo de título vazio ou preenchido apenas com espaços. |
| **RN02** | **Prioridade Padrão:** Se o usuário não definir uma prioridade específica, o sistema deve registrar a tarefa com a prioridade "Baixa" por default. |
| **RN03** | **Sincronização:** Qualquer alteração no array de tarefas (inserção, edição, exclusão ou mudança de status) deve invocar a gravação imediata no `LocalStorage`. |

## 6. Casos de Uso Principais (Resumo)

* **UC01 - Gerenciar Ciclo de Vida da Tarefa**
  * **Fluxo Principal:** O usuário digita "Estudar Engenharia de Software", seleciona prioridade "Alta" e clica em Cadastrar. O sistema salva e exibe a tarefa. O usuário clica no checkbox da tarefa. O sistema marca como concluída e risca o texto.
  * **Fluxo de Exceção (RN01):** O usuário clica em Cadastrar sem digitar nada. O sistema bloqueia o cadastro e exibe a mensagem: "Atenção: O título da tarefa não pode ficar vazio!".