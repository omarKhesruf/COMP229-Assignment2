let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt =require('jsonwebtoken');

// create a reference to the model
let Contacts = require('../models/contacts');

module.exports.displayContactsList = (req, res, next) => {
    Contacts.find((err, contactsList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {

            res.render('contacts/list', 
            {title: 'Business Contacts List', 
            ContactsList: contactsList,
            displayName:req.user ? req.user.displayName:''});      
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('contacts/add', 
    {title: 'Add Contacts', displayName:req.user ? req.user.displayName:''})          
}

module.exports.processAddPage = (req, res, next) => {
    let newContacts = Contacts({
        "firstname": req.body.firstname,
        "lastname": req.body.lastname,
        "phone": req.body.phone,
        "address": req.body.address,
        "email": req.body.email
    });

    Contacts.create(newContacts, (err, Contacts) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the Contacts list
            res.redirect('/contacts-list');
        }
    });

}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Contacts.findById(id, (err, ContactToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('contacts/edit', 
            {title: 'Edit Contacts', 
            contacts: ContactToEdit, 
            displayName:req.user ? req.user.displayName:''})
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedContacts = Contacts({
        "_id": id,
        "firstname": req.body.firstname,
        "lastname": req.body.lastname,
        "phone": req.body.phone,
        "address": req.body.address,
        "email": req.body.email
    });

    Contacts.updateOne({_id: id}, updatedContacts, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the Contacts list
            res.redirect('/contacts-list');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Contacts.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             // refresh the Contacts list
             res.redirect('/contacts-list');
        }
    });
}