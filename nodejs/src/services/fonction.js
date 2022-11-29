const express = require('express');
const router = express.Router();
const sequelize = require('../db/sequelize')


//Liste des fonctions
router.get('/fonctions', (req, res)=>{
    sequelize.Fonction.findAll().then(resultat =>{
        res.json(resultat)
    }).catch(()=>{
        res.json({message: "Erreur !!"})
    })
    
})

//Fonction par ID
router.get('/fonctions/:id', (req, res)=>{
    sequelize.Fonction.findByPk(req.params.id).then(resultat =>{
        res.json(resultat)
    }).catch(()=>{
        res.json({message: "Erreur !!"})
    })
    
})

// AJouter/modifier
router.post('/fonctions', (req, res) => {
    sequelize.Fonction.create(req.body).then(resultat => {
        res.json({ message: "Création réalisée avec succés", resultat })
    }).catch(() => {
        res.json({ message: "Erreur !!" })
    })
})

//Modifier une fonction
router.put('/fonctions/:id', (req, res) => {
    const fonctionId = req.params.id
    sequelize.Fonction.update(req.body,
        {
            where: { id: fonctionId }
        }).then(() => {
            sequelize.Fonction.findByPk(formationId).then(resultat => {
                res.json({ message: "Modification réalisée avec succés", resultat })
            }).catch(() => {
                res.json({ message: "Erreur !!" })
            })
        }).catch(() => {
            res.json({ message: "Erreur !!" })
        })
})

//Supprimer une fonction
router.delete('/fonctions/:id', (req, res) => {
    const fonctionId = req.params.id
    sequelize.Fonction.destroy({
        where: { id: fonctionId }
    }).then(() => {
        res.status(204).json({ message: "Suppression réalisée avec succés" })
    }).catch(() => {
        res.json({ message: "Erreur !!" })
    })
})

module.exports = router;