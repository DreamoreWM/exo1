const {Sequelize, DataTypes} = require("sequelize");
const bcrypt = require("bcrypt");
const personneModel = require("../models/personne.model");
const fonctionModel = require("../models/fonction.model");
const congeModel = require("../models/conge.model");



const sequelize =  new Sequelize(
    'r&h',
    'alexandre',
    'Efddb4693',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
)

const Personne = personneModel(sequelize, DataTypes);
const Fonction = fonctionModel(sequelize, DataTypes);
const Conge = congeModel(sequelize, DataTypes);

Personne.hasMany(Conge,{
    foreignKey : 'personneId'
})

Fonction.hasMany(Personne, {
    foreignKey : 'fonctionId'
});

const connect = () => {
    sequelize.authenticate().then(() =>{
        console.log('Connexion établie');
    }).catch((error)=>{
        console.log('Connexion KO',error);
    })
}

const initDb = async () => {
    await sequelize.sync({force:true}).then(()=>{
            Fonction.create({
                nom : 'ADMIN', 
                commentaires:  "Administrateur du site"
            }),
            Fonction.create({
                nom : 'DEV', 
                commentaires:  "Developpeur du site"
            }),
        bcrypt.hash('password', 10).then(hash =>{
            Personne.create({
                nom: 'Remi', 
                prenom: 'Morau', 
                sexe: 'M', 
                username: 'remi.M', 
                password : hash,
                fonctionId : 1
            }),
            Personne.create({
                nom: 'Dumont', 
                prenom: 'Benjmain', 
                sexe: 'M', 
                username: 'benjamin.d', 
                password : hash,
                fonctionId : 2
            })
            Conge.create({
                date_start : new Date(),
                date_end : new Date(),
                nb_day: 5,
                personneId : 1,
                active: 1
            })
    }).catch((error)=>{
        console.log('Erreur lors de la mise à jour',error);
    })

})}



module.exports = {
    connect, initDb, Personne, Fonction, Conge
};