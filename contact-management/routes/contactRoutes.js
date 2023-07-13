const express = require('express')
const {getAllContacts, getAContacts, updateAContacts, addAContacts , deleteAContacts} = require('../controllers/contacts-controller')

const contactRouter = express.Router()
 
/*
    //the route("/") uses to define the endpoint for accessing to this get api
contactRouter.route("/").get(getAllContacts)
contactRouter.route("/:id").get(getAContacts)
contactRouter.route("/").post(addAContacts)
contactRouter.route("/:id").put(updateAContacts)
contactRouter.route("/:id").delete(deleteAContacts)
*/

//For shorter from line 8 to 12
contactRouter.route("/").get(getAllContacts).post(addAContacts)
contactRouter.route("/:id").get(getAContacts).put(updateAContacts).delete(deleteAContacts)

module.exports = contactRouter