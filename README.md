# MobileTicketsIonic
Projeto para dispositivos movéis
Sistema de Controle de Atendimento (Mobile Tickets)
Este sistema automatizado de gestão de tickets foi desenvolvido para laboratórios médicos, integrando a emissão de senhas, chamadas em painel e controle de guichês em uma única solução mobile.

Sobre o Projeto
O projetoresolve o problema de filas através de uma lógica de priorização que alterna entre diferentes tipos de atendimento para garantir fluidez no serviço.
Agentes e Priorização
O sistema gerencia a interação entre três perfis:
Agente Sistema (AS): Núcleo de processamento e emissão.
Agente Atendente (AA): Operador que aciona o próximo cliente.
Agente Cliente (AC): Usuário final que interage com o totem e painel.

Algoritmo de Fila:
[SP] - > [SE|SG - > [SP] - > - >[SE|SG]
SP (Prioritária): Tempo médio de 15 min.
SE (Exame): Atendimento rápido (menor que 1 min), intercalado após uma SP.
SG (Geral): Menor prioridade, média de 5 min.

Arquitetura do Projeto (Ionic/Angular)
O app está organizado da seguinte forma:
src/app/
├── pages/
│   ├── atendente/       # Interface para o Agente AA (Chamar Próximo) 
│   ├── painel/          # Visualização das 5 últimas senhas para o AC 
│   ├── relatorios/      # Módulo de métricas e TM (Tempo Médio) 
│   └── totem/           # Interface de autoatendimento para o AC 
├── services/            # Lógica de integração com MySQL e regras de negócio 
└── app-routing.module.ts # Gerenciamento de rotas e navegação por abas


Stack Tecnológica
Frontend: Ionic Angular v8.0.0.
Core: Angular v20.0.0.
Nativo: Capacitor v8.3.0.
Banco de Dados: MySQL 8.0.
Formato de Ticket: YYMMDD-PPSQ (ex: 260405-SP002).

Como Executar
Pré-requisitos
Node.js instalado.
Ionic CLI instalado (npm install -g @ionic/cli).
Instalação
Clonar e entrar na pasta: git clone https://github.com/seu-usuario/MobileTicketsIonic.git cd MobileTicketsIonic
Instalar dependências: npm install
Rodar no navegador: npm start

Funcionalidades Implementadas
Navegação por Abas: Acesso rápido entre Totem, Painel, Atendente e Relatórios através da barra inferior.
Gestão de Horários: Operação estrita entre 07:00 e 17:00.
Painel em Tempo Real: Exibição dinâmica das senhas e guichês correspondentes.
Tratamento de No-Show: Descarte automático de 5% das senhas não atendidas.
Relatórios Detalhados: Métricas de senhas emitidas e atendidas por prioridade.

Versões e Créditos
Versão: Atualmente na Versão 05 (19/06/2025).
Autor: João Ferreira.
Instituição: UNINASSAU.

exemplos da interface do programa:
![f109ddef-faa5-426a-9e0f-77edb8fee1ff](https://github.com/user-attachments/assets/6ac9fea4-b4df-44bd-85bb-e4adf9d1818a)
![ca300e9e-d7d9-4c59-b928-1c6a90e61259](https://github.com/user-attachments/assets/4e8d64fb-dcb8-4bb0-8c40-ba17d9356abd)
![a016733d-2f87-4f7c-b86d-f30f291a48fa](https://github.com/user-attachments/assets/44402b68-d88a-4460-8f03-bcacbe61c14b)
![82392db4-68ce-45b5-bafd-a2d2762c0f2b](https://github.com/user-attachments/assets/c2d9407d-1f44-4192-83b3-6da916947422)
