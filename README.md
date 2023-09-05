<h1 align="center">Welcome to Gradstem 👋</h1>

<div align="center">

![Node JS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express JS](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![OpenAI](https://img.shields.io/badge/chatGPT-74aa9c?logo=openai&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-F6BB43?style=flat-square&logo=Postman&logoColor=white)

</div>

<h2 align="center">Helping 100K+ international students secure sponsoring jobs !</h2>
<h2 align="center">API Documentation : http://developer.gradstem.com </h2>

<p align="center">
  <a href="https://gradstem.com" target="_blank"> 
    <img src="https://github.com/abdulbaseer657/gradstem/blob/abdul-setup/static/gradstem.jpg" alt="Gradstem Home">
  </a>
</p>

### Gradstem is a Resource Hub aggrigating and maintaing H1b sponsoring jobs for fresh graduates .

-This Application is being build specifically for New Grad International students ,we manually verify each job for 2 criterias
1.Does the job posting hire/sponsor International students
2.Does the job posting hire new grads (0-1 yr exp)

The Jobs are scrapped on daily basis from Linkedin , Indeed , Glassdoor and 2000+ company career pages known for hiring International students
The Gradstem Public API is a REST API that lets you manage all of your Gradstem services and resources through simple HTTP requests. With this API, you can have the power of OpenAI embeddings , Semantic Resume similarity search(AI Based) , allowing you to integrate seamlessly with Gradstem
Currently, the API supports endpoints that allow for Auth (access Token and Referesh Token),
Companies,Jobs,Similarity(Resume Similarity)
I'll be gradually releasing more endpoints in the coming months, allowing you to find internships , Generate Customised Coverletters and Resumes based on existing resume and job description.
upcomming in V0:
Pagination
Searching

## Tech. stack

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com)
- [MongoDB](https://mongodb.com/)
- [OpenAI](https://www.openai.com/)
- [Postman](https://www.postman.com)

## Installing locally

### Setting up MongoDB

- Create a <i>MongoDB Atlas</i> account, it is a self hosted MongoDB Instance
- Check out [MongoDB Atlas](https://www.mongodb.com/atlas/database) for a step by step guide
- Once you have MongoDb Atlas ready, fill in your env. varilables and proceed with the next steps
- Follow the detailed instructions [here](https://www.mongodb.com/developer/products/atlas/semantic-search-mongodb-atlas-vector-search/) to set the semantic/vector search

### Obtaining OpenAI credentials

- Create an account on [OpenAI Platform](https://platform.openai.com/) to get API credentials
- Following the detailed instructions [here](https://platform.openai.com/docs/api-reference/introduction) to get the crendentials

### Installing dependencies

- Use the following command in your terminal from `./` to install project dependencies

```sh
npm install
< or >
yarn install
< or >
pnpm install
```

### Starting the development server

- After you have installed dependencies, use the following command in your terminal from `./` to start the dev. server

```sh
npm start
< or >
yarn start
< or >
pnpm start
```

- Visit `http://localhost:3000` to view Gradstem on your local machine

### Environment variables

- Update the evniornment variables on your hosting platform before building

```sh
PORT = < 3000 >

MONGODB_URI = < YOUR Credentials >

DB_NAME = < YOUR Credentials >

ACCESS_TOKEN_SECRET = < YOUR Credentials >

REFRESH_TOKEN_SECRET = < YOUR Credentials >

OPENAI_API_KEY = < YOUR Credentials >

```

### Build command

- Use the following commands for building and deploying

```sh
npm run build
< or >
next build
```

### Install command

```sh
npm install
< or >
yarn install
< or >
pnpm install
```

- Congratulations your Gradstem app is up and running!

## Author

👤 **Abdul Baseer Mohammed**

- Github: [@abdulbaseer657](https://github.com/abdulbaseer657)
- LinkedIn: [abdul baseer mohammed](https://www.linkedin.com/in/abdul-baseer-mohammed-59bbbb158/)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/abdulbaseer657/gradstem/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2023 [Abdul Baseer Mohammed](https://github.com/abdulbaseer657).<br />
This project is [MIT](https://github.com/abdulbaseer657/gradstem/blob/main/LICENSE) licensed.
