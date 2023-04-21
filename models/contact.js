const mongoose = require("mongoose");


const contactSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    company: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    activity: { type: String, required: true },
    date: { type: Date, required: true },
});

// faire un module
// exports est une variable globale et appel model()
module.exports = mongoose.model('Contact', contactSchema);