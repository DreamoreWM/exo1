const auth = require('basic-auth')
const sequelize = require('./db/sequelize')
const bcrypt = require('bcrypt')

const basicAuth = async (req,res,next) => {
    const user = auth(req);
    if(user == null){
        return res.status(401).send('Authentification requise')
    }

    const userFound = await sequelize.Personne.findOne({ where : { username: user.name }})
    if(userFound == null){        
        return res.status(401).send('Utilisateur inconnu')
    }
    try {
        if( await bcrypt.compare(user.pass, userFound.password)){
            console.log('authentification ok')
            next()
        } else {
            res.end('Accés refusé')
        }
    } catch {
        res.status(500).send()
    }

}

module.exports = basicAuth;