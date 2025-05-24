# TaskMaster

**TaskMaster** é um protótipo funcional de aplicativo de gerenciamento de tarefas desenvolvido em React Native (Expo).

---

## 📦 Como rodar

1. Clone o repositório  
   ```bash
   git clone https://github.com/Alejandroo19/projeto_react.git
   cd projeto_react/TaskMaster

## instale dependecias

npm install

Inicie o servidor de desenvolvimento

bash
Copiar
Editar
expo start
Abra no dispositivo ou emulador:

Escaneie o QR Code com Expo Go

Ou pressione a (Android) / i (iOS)

## ✨ Funcionalidades
Autenticação de usuário (login / cadastro)

Listagem de tarefas (lista e kanban)

Criação, edição, exclusão e marcação de tarefas como concluídas

Navegação protegida por token

Formulários com validação (Formik + Yup)

## 🛠️ Stack Tecnológica
Frontend: React Native (Expo)

Estado: Redux Toolkit

Navegação: React Navigation

Estilização: Styled Components

Formulários: Formik + Yup

HTTP/API: Axios

Mocks: axios-mock-adapter

## 🔌 Integração com Back-End
Todos os endpoints (/login, /tasks) estão mockados em src/api/axios.ts

Para usar um back-end real, basta ajustar o baseURL e remover o bloco de mocks

## 📄 API (mock)
Veja no README completo (ou role mais acima) a documentação de:

POST /login

GET /tasks

POST /tasks

PATCH /tasks/:id

DELETE /tasks/:id


