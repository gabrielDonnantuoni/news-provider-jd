# News Provider RESTFUL API with Node.js, Typescript, PostgreSQL and Objection.js

## Description

This project was built on a stage of [JungleDevs](https://www.jungledevs.com/) selective process, where the original repo can be found [here](https://github.com/JungleDevs/node-challenge-001)

**Challenge goal**: The purpose of this challenge is to give an overall understanding of a backend application. You’ll be implementing a simplified version of news provider API.

- REST architecture;
- Authentication and permissions;
- Data modeling and migrations;
- SQL database;
- Query optimization;
- Serialization;
- Production builds.

## Acceptance criteria

- Clear instructions on how to run the application in development mode
- Clear instructions on how to create production builds
- A good API documentation or collection
- Models created using [Objection.js](https://vincit.github.io/objection.js/)
- Login API: `/api/login`
- Sign-up API: `/api/sign-up`
- Administrator restricted APIs:
  - CRUD `/api/admin/authors`
  - CRUD `/api/admin/articles`
- List article endpoint `/api/articles?category=:slug` with the following response:
```json
[
  {
    "author": {
      "name": "Author Name",
      "picture": "https://picture.url"
    },
    "category": "Category",
    "title": "Article title",
    "summary": "This is a summary of the article"
  },
  ...
]
```
- Article detail endpoint `/api/articles/:id` with different responses for anonymous and logged users:

    **Anonymous**
    ```json
    {
      "author": {
        "name": "Author Name",
        "picture": "https://picture.url"
      },
      "category": "Category",
      "title": "Article title",
      "summary": "This is a summary of the article",
      "firstParagraph": "<p>This is the first paragraph of this article</p>"
    }
    ```

    **Logged user**
    ```json
    {
      "author": {
        "name": "Author Name",
        "picture": "https://picture.url"
      },
      "category": "Category",
      "title": "Article title",
      "summary": "This is a summary of the article",
      "firstParagraph": "<p>This is the first paragraph of this article</p>",
      "body": "<div><p>Second paragraph</p><p>Third paragraph</p></div>"
    }
    ```
## Install dependencies

- With `npm`: npm install
- With `yarn`: yarn

## Initial configuration

Rename the `.env.example` file to `.env` and fill it with your data.

## Instructions to Run

- Database: `docker-compose up` will start the PostgreSQL DB
- `yarn db:reset` will initiate or restart the db configured with .env variables. Add NODE_ENV=enviromentOfChoice before command to run in that enviroment.
- `yarn dev` is configured to start the server/index.ts using ts-node-dev
- `yarn build` will build the next app and emit js files on `dist` directory
- `yarn start` will start the app in production mode.

## Live app

You can see this app running on heroku with AWS RDS [here](https://news-provider-api.herokuapp.com/)

## To Do
 - [x] Build an landing page on the path: `/`
 - [ ] Finish integration tests
 - [ ] Implement unit tests

## Chalenges and choices

Talking about the tools chosen to build this application, the language(Node.js), ORM and database were proposed by the task.
In this context of backend, what is nice to emphasize is the solutions I built for validations of received data (`req.body`)
and validation of Authentication, that could be required or just a privilege. Look for it in `server/middlewares`.
Besides that I chose to use Typescript, a superset of Javascript that helps a lot with autocompletes when conding and with
catching erros before run.

Now about frontend, I have the oportunity to choose everything. I setted a goal to build a landing page with real-time interaction with the API.
I opted for React that is a UI lib that I have more proficiency with.
On top of React, I added Next.js a framework that has built-in Server Side Rendering which helps with SEO. For help with styling I picked Material UI
that is a easy to use UI library for React that has really nice features and helps to save a lot time.
