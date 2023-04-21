const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const contactRoutes = require("./routes/contactRoutes")
const contactApiRoutes = require("./routes/api/contactApiRoutes")

// charge le fichier de configuration
dotenv.config(); 

// récupère l'application express
const app = express();

// supprime le message DeprecationWarning
mongoose.set('strictQuery', true);
// effectue la connexion à MongoDB
mongoose.connect(process.env.MONGO_CONNECTION,
{
 useNewUrlParser: true,
 useUnifiedTopology: true,
})
.then(() => console.log("Connexion à MongoDB a réussie"))
.catch((error) => console.log("Connexion à MongoDB a échouée" + error));

// parse pour les formulaires
app.use(bodyParser.urlencoded({ extended: false }));
// parse pour le json
app.use(bodyParser.json());

// plugger vers une racine url
// indique l'url de départ des routes
app.use("/contact",contactRoutes);
app.use("/api/contact",contactApiRoutes);


// si page inexistante
app.use((req, res) => {
    res.status(404);
    res.send('Page Introuvable');
});
//lance serveur express
app.listen(8090, () => {
    console.log('Le serveur est démarré sur le port 8090 !');
});