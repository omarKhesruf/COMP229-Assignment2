let mongoose = require('mongoose');

// create a model class
let contactsModel = mongoose.Schema({
    firstname: String,
    lastname: String,
    address: String,
    phone: String,
    email: String
    
},
{
    collection: "contacts"
});



module.exports = mongoose.model('Contacts', contactsModel);