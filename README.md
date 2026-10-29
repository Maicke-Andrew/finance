# MyFinance — App de finanças pessoais

Aplicação full stack para controle de receitas e despesas, com autenticação, parcelamentos, categorias e suporte a português e inglês.

🔗 **Demo:** _em breve_

## Funcionalidades

- Cadastro e login com usuário/senha (JWT) ou **login com Google**
- Confirmação de conta e recuperação de senha por e-mail
- Registro de **receitas e despesas** com categoria, valor e parcelas
- Edição e exclusão de lançamentos
- Perfil do usuário com foto (upload para AWS S3)
- Envio de feedback com anexos
- Interface **bilíngue (PT/EN)** com i18next
- Rotas protegidas no front-end (React Router + Context API)

## Stack

**Front-end** (`/web`)
- React 18 + TypeScript + Vite
- React Router 6, Context API
- Material UI, styled-components, Emotion
- Axios, i18next, React Toastify, React Dropzone
- @react-oauth/google

**Back-end** (`/server`)
- Node.js + Express + TypeScript
- MongoDB com Mongoose
- Autenticação com JWT e bcrypt
- Upload de arquivos com Multer + AWS S3
- Envio de e-mails com Nodemailer

## Estrutura

```
finance/
├── web/      # SPA em React + Vite
└── server/   # API REST em Express
    └── src/
        ├── controllers/
        ├── services/
        ├── routers/
        ├── models/
        └── middlewares/
```

## Como rodar localmente

### Back-end

```bash
cd server
npm install
# crie um .env baseado em .env.exemple
npm run dev
```

Variáveis principais: `MONGODB_CONNECT`, `SECRET_JWT`, `SERVERSALLOWED` (origens liberadas no CORS, separadas por vírgula), `DOMAIN_API`, `DOMAIN_WEB`. E-mail (`EMAIL_USER`, `EMAIL_PASSWORD`) e AWS (`AWS_*`) são necessários apenas para confirmação por e-mail e upload de imagens.

### Front-end

```bash
cd web
npm install
# crie um .env com VITE_API_URL=http://localhost:8080
npm run dev
```

## Autor

**Maicke Andrew** — Desenvolvedor Front-end
[LinkedIn](https://www.linkedin.com/in/maicke-andrew/)
