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
Rodar no navegador: ionic serve

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
gurpo: arthur cabral 01810694. andré Alisson Chalegre de Lima - 01854549, Otavio martins - 01782584, Rafael Ramos - 01563278
exemplos da interface do programa:
![MobileTicketsIonic1](https://github.com/user-attachments/assets/915e4b58-a164-4de6-a280-4f20dc10539a)
![MobileTicketsIonic2](https://github.com/user-attachments/assets/6d659d49-4293-4c4b-8932-202f7d58c425)
![MobileTicketsIonic3](https://github.com/user-attachments/assets/9f2dca28-b3d1-49a3-9e9c-7c8235790c6b)
![MobileTicketsIonic4](https://github.com/user-attachments/assets/b6273d7a-75c0-4caa-b128-84fadf365b21)

