# boilerplate-backend

\_\_

## Features

- features do seu app

\_\_

## Instalação

#### Clone do repositório

```sh
Git clone <https://github.com/seu-repo>
```

#### Instale as dependências

```sh
npm install
```

#### Execute a aplicação localmente

```sh
npm run dev
```

#### O servidor iniciará na porta 3000 ou process.env.PORT

\_\_

## Rodando testes

```sh
npm run test
```

\_\_

## Deploy main

#### Conecte ao terminal aws

```sh
sudo ssh -i "chave-amazon-aws.pem" 'amazon aws link'
git pull
npm run build
pm2 restart server
```

\_\_

## Padrão de Commits

`feat`, `refactor`, `test`, `style`(mudanças de estilo que não alteram o sistema), `fix`(correção de erros), `chore`(mudanças que não afetam o sistema ou os testes, exemplo eslint ou gitignore), `docs`, `build`(mudanças que afetam o processo de build ou dependências externas exemplo add ou remover dependências), `perf`(melhorou a performance), `ci`

## Tecnologias utilizadas:

- Nodejs
- Express
- Typescript
- MongoDB
- Mongoose
- Jest
