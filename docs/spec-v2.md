# OpenSpec / SDD - Gerenciador de Tarefas (Versão 2)

## 1. Evolução do Sistema
A Versão 2 atua na evolução do MVP, transformando o aplicativo em uma ferramenta com persistência de dados local, gestão de status avançada e priorização de tarefas, seguindo princípios mais rigorosos de Engenharia de Software.

## 2. Requisitos Funcionais Adicionais (RF)
| ID | Descrição |
|---|---|
| **RF04** | O sistema deve permitir a edição textual de uma tarefa previamente cadastrada. |
| **RF05** | O sistema deve permitir a exclusão definitiva de uma tarefa. |
| **RF06** | O usuário deve poder atribuir uma Prioridade (Baixa, Média, Alta) no momento do cadastro. |
| **RF07** | A interface deve prover filtros para exibir: Todas, Pendentes ou Concluídas. |
| **RF08** | O sistema deve gravar e ler os dados no `LocalStorage` do navegador para garantir a persistência. |

## 3. Regras de Negócio (RN)
* **RN01 (Validação):** É estritamente proibido o cadastro ou a edição de tarefas com o título vazio ou contendo apenas espaços em branco. O sistema deve abortar a ação e emitir um alerta.
* **RN02 (Comportamento Padrão):** Caso o ator não selecione explicitamente uma prioridade durante o cadastro, o sistema deve registrar a tarefa com prioridade "Baixa" por padrão.
* **RN03 (Sincronicidade de Dados):** Qualquer mutação no estado das tarefas (Create, Update, Delete, Toggle Status) deve acionar imediatamente a função de gravação no `LocalStorage`.

## 4. Critérios de Aceite (CA) e Cenários
* **Cenário 1: Validação de Input**
  * *Dado que* o usuário tenta salvar uma tarefa;
  * *Quando* o campo de texto possuir apenas string vazia (`""`);
  * *Então* o sistema deve disparar um bloqueio (alert) e não inserir o item no array de tarefas.
* **Cenário 2: Filtragem de Status**
  * *Dado que* existem 2 tarefas pendentes e 1 concluída;
  * *Quando* o usuário clica no filtro "Pendentes";
  * *Então* o sistema deve renderizar exclusivamente as 2 tarefas com status `completed: false`.
* **Cenário 3: Persistência**
  * *Dado que* o usuário cadastrou tarefas;
  * *Quando* o usuário recarregar a página (F5);
  * *Então* o script deve recuperar o JSON salvo no `LocalStorage` e reconstruir a interface no exato estado anterior.