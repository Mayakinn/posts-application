# Posts application

Vue.js + Typescript website for managing posts and authors

## Features

* Adding new posts and assigning and author
* Editing and deleting posts
* Adding new authors
* Editing and deleting authors

## How to run it

Copy the variables from .env.example to your own .env file and fill them with your own values.

### Frontend
```sh
npm install
npm run dev
```

### Backend
```sh
npm install -g json-server json-server-auth
json-server-auth db.json -r routes.json
```
use `http://127.0.0.1:8080` to access the website

