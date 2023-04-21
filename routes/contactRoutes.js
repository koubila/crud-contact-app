const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");

// Affiche dans home les données en bdd
router.route("/home").get((req,res)=>{
    res.status(200);
    Contact.find()
    .then((data) => res.render('home.ejs',{data:data}))
    .catch((error) => res.status(400).json(error));
})

// Supprime selon id
router.route("/delete/:id").get((req, res) => {
    const id = req.params.id;
    Contact.deleteOne({ _id: id })
      .then(() => {
        res.redirect("/contact/home");
      })
      .catch((error) => res.status(400).json(error));
  });

// Affiche new contact form
router.route("/new").get((req,res)=>{
    res.status(200);
    let error = "";
    res.render('add-item.ejs',{error:error});
})

// Retourner un contact en particulier
//exemple : http://localhost:8090/contact/643e61236e507c6bc1f94ee8
router.route("/:id")
.get((req, res) => {

    // _id est le parametre dans bdd
    Contact.findOne({_id: req.params.id})
        .then((data) => res.render("item.ejs",{contact:data}))
        .catch((error) => res.status(400).json(error));
});

// Ajoute en recuperant les names de new contact form
router.route("/new").post((req,res)=>{

    let MessageError = (!req.body.lastName ? "Veuillez renseigner le nom" : (!req.body.firstName ? "Veuillez renseigner le prénom" :  (!req.body.company ? "Veuillez renseigner la société" : (!req.body.address ? "Veuillez renseigner l'adresse" : (!req.body.phone ? "Veuillez renseigner le téléphone" : (!req.body.email ? "Veuillez renseigner l'email" : (!req.body.activity ? "Veuillez renseigner le secteur" : "ok"))))))) ;
    req.body.date = new Date();
    let contact = new Contact(req.body);
    // tester
    if (MessageError != "ok") {
        res.render('add-item.ejs',{error:MessageError});
    } else {
       // faire save() bdd
        contact.save()
            .then((data) => {
                res.redirect("/contact/home")
            })
            .catch((error) => res.status(400).json(error)); 
    }
    
});

// Affiche le formulaire de modification avec le contact 
router.route("/edit/:id").get((req,res)=>{
    res.status(200);
    
    Contact.findOne({ _id: req.params.id })
    .then((data) => res.render("edit-item.ejs",{contact:data}))
    .catch(error => console.log(error));
    
})

// Met à jour un contact suivant id dans url
// exemple en POST http://localhost:8090/contact/643e61236e507c6bc1f94ee8
router.route("/edit/:id")
.post((req, res) => {
    let MessageError = (!req.body.lastName ? "Veuillez renseigner le nom" : (!req.body.firstName ? "Veuillez renseigner le prénom" :  (!req.body.company ? "Veuillez renseigner la société" : (!req.body.address ? "Veuillez renseigner l'adresse" : (!req.body.phone ? "Veuillez renseigner le téléphone" : (!req.body.email ? "Veuillez renseigner l'email" : (!req.body.activity ? "Veuillez renseigner le secteur" : "ok"))))))) ;
    req.body.date = new Date();
    let contact = new Contact(req.body);
    // tester si error diff "" alors pas de save mais un render sinon contact save
    if (MessageError != "ok") {

        res.render('edit-item.ejs',{error:MessageError,contact:contact});
        
    } else {

        Contact.updateOne({_id: req.params.id}, req.body)
            .then((data) =>{res.redirect("/contact/home")})
            .catch((error) => res.status(400).json(error));
    }

});

// exporter des routes contenu dans router
module.exports = router;
