
const express = require("express");
const basicAuth = require("./basicAuth");
const fonctionApi = require("./services/fonction");
const personneApi = require("./services/personne");
const congeApi = require("./services/conge");


const sequelize = require ("./db/sequelize");
const cors = require("express");
const app = express();
const port = 3001;

app.use(cors());
app.use(basicAuth)
sequelize.connect();
sequelize.initDb();

app.use(express.json())

app.use('/api', fonctionApi, personneApi, congeApi )

app.listen(port, () => console.log(`Projet démarré sur : http://localhost:${port}`))