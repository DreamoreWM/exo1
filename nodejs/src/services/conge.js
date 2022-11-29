const express = require('express');
const router = express.Router();
const sequelize = require('../db/sequelize')


//Liste des congés
router.get('/conges', (req, res) => {
    let listConges = []
    sequelize.Conge.findAll().then(async conges => {
        for (let conge of conges ){
            await sequelize.Personne.findByPk(conge.personneId).then(personne => {
                listConges.push({'conge': conge, 'personne': personne.nom})
            })
        }
        res.json(listConges)
    }).catch(() => {
        res.json({ message: "Erreur !!" })
    })
})
//Congés par id
router.get('/conges/:id', (req, res) => {
    let listConges = [];
    sequelize.Conge.findByPk(req.params.id).then(async conge => {
        await sequelize.Personne.findByPk(conge.personneId).then(personne => {
            listConges.push({'conge': conge, 'personne': personne.nom})
        });
        res.json(listConges)
    }).catch(() => {
        res.json({ message: "Erreur !!" })
    })
})


// AJouter/modifier
router.post('/conges', (req, res) => {
    sequelize.Conge.create(req.body).then(resultat => {
        res.json({ message: "Création réalisée avec succés", resultat })
    }).catch(() => {
        res.json({ message: "Erreur !!" })
    })
})

//Modifier une personne
router.put('/conges/:id', (req, res) => {
    const congeId = req.params.id
    sequelize.Conge.update(req.body,
        {
            where: { id: congeId }
        }).then(() => {
            sequelize.Conge.findByPk(formationId).then(resultat => {
                res.json({ message: "Modification réalisée avec succés", resultat })
            }).catch(() => {
                res.json({ message: "Erreur !!" })
            })
        }).catch(() => {
            res.json({ message: "Erreur !!" })
        })
})

//Supprimer une personne
router.delete('/conges/:id', (req, res) => {
    const congeId = req.params.id
    sequelize.Conge.destroy({
        where: { id: congeId }
    }).then(() => {
        res.status(204).json({ message: "Suppression réalisée avec succés" })
    }).catch(() => {
        res.json({ message: "Erreur !!" })
    })
})

module.exports = router;