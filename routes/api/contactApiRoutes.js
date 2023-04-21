const express = require("express");
const router = express.Router();
const Task = require("../../models/contact");

// route pour récupérer la liste des contacts
//exemple http://localhost:8090/api/contact/contacts
router.route("/contacts")
.get((req, res) => {
    // requete bdd et convertir data en json
    Task.find()
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(400).json(error));
});

// retourner un contact selon id
//exemple : http://localhost:8090/api/contact/643e61236e507c6bc1f94ee8
router.route("/:id")
.get((req, res) => {
    
    // _id est le parametre dans bdd
    Task.findOne({_id: req.params.id})
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(400).json(error));
});

// ajouter un task
// exemple en POST http://localhost:8090/api/contact/
router.route("/")
.post((req, res) => {
    let task = new Task(req.body);

    task.save()
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(400).json(error));
});

// Met à jour un constact suivant id dans url
// exemple en PUT http://localhost:8090/api/contact/643e61236e507c6bc1f94ee8
router.route("/:id")
.put((req, res) => {

    //.params dans url
    //.body dans le body
    Task.updateOne({_id: req.params.id}, req.body)
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(400).json(error));
});

// supprime un task suivant id dans url
// exemple en DELETE http://localhost:8090/api/contact/643e61236e507c6bc1f94ee8
router.route("/:id")
.delete((req, res) => {

    Task.deleteOne({_id: req.params.id})
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(400).json(error));
});

// exporter des routes contenu dans router
module.exports = router;

