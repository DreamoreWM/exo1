const express = require('express');
const router = express.Router();
const sequelize = require('../db/sequelize')


//Liste des personnes
router.get('/personnes', (req, res)=>{
    let listePersonne = [];
    sequelize.Personne.findAll().then(async personnes =>{
        for (let personne of personnes ){
            await sequelize.Fonction.findByPk(personne.fonctionId).then(fonction =>{
              listePersonne.push({'personne' : personne, 'fonction' : fonction.nom})
            })
        }       
        res.json(listePersonne)
    }).catch(()=>{
        res.json({message: "Erreur !!"})
    })
    
})

//Personne par ID
router.get('/personnes/:id', (req, res)=>{
    let personneSolo = [];
    sequelize.Personne.findByPk(req.params.id).then(async personne =>{
        await sequelize.Fonction.findByPk(personne.fonctionId).then(fonction =>{
                personneSolo.push({'personne' : personne, 'fonction' : fonction.nom})
            })
        res.json(personneSolo)
    }).catch(()=>{
        res.json({message: "Erreur !!"})
    })
    
})

// AJouter/modifier
router.post('/personnes', (req, res) => {
    sequelize.Personne.create(req.body).then(resultat => {
        res.json({ message: "Création réalisée avec succés", resultat })
    }).catch(() => {
        res.json({ message: "Erreur !!" })
    })
})

//Modifier une personne
router.put('/personnes/:id', (req, res) => {
    const personneId = req.params.id
    sequelize.Personne.update(req.body,
        {
            where: { id: personneId }
        }).then(() => {
            sequelize.Personne.findByPk(formationId).then(resultat => {
                res.json({ message: "Modification réalisée avec succés", resultat })
            }).catch(() => {
                res.json({ message: "Erreur !!" })
            })
        }).catch(() => {
            res.json({ message: "Erreur !!" })
        })
})

//Supprimer une personne
router.delete('/personnes/:id', (req, res) => {
    const personneId = req.params.id
    sequelize.Personne.destroy({
        where: { id: personneId }
    }).then(() => {
        res.json({ message: "Suppression réalisée avec succés" })
    }).catch(() => {
        res.json({ message: "Erreur !!" })
    })
})

module.exports = router;