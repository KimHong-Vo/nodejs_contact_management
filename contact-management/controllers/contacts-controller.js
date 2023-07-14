const asyncHandler = require('express-async-handler')
const contacts = require('../model/contacts-model')

//desc Get all contacts
//route GET /api/contacts
//access public
const getAllContacts = asyncHandler(async (req, res) => {
    res.status(200).json(await contacts.find())
})

//desc Get a contacts
//route GET /api/contacts/:id
//access public
const getAContacts = asyncHandler(async (req, res) => {
    try {
        const contact = await contacts.findById(req.params.id)
        if(contact){
            return res.status(200).json(contact)
        } else {
            res.status(404)
            throw new Error("Contact not found")
        }
        
    } catch (error) {
        res.status(404)
        error.message = "Contact not found"
        throw error
    }
})

//desc update a contacts
//route PUT /api/contacts/:id
//access public
const updateAContacts = asyncHandler(async (req, res) => {
    const updatedContact = await contacts.findByIdAndUpdate(req.params.id, req.body, {new: false})
    if(updatedContact){
        return res.status(200).json({message: `Update contacts for ${req.params.id} succesfully`, data: updatedContact})
    }
    else {
        res.status(404)
        throw new Error("Cannot found the contact to update")
    }
})

//desc Create a contacts
//route POST /api/contacts
//access public
const addAContacts = asyncHandler(async (req, res) => {
    console.log('The info wanna add is: ' ,req.body)
    const {name, email, phone} = req.body
    if(!name || !email || !phone){
        //for standart - the error response will send to client in HTML form format
        throw new Error("All fiels are mandatory!")
    }
    const contact = await contacts.create({
        name,
        email,
        phone
    })
    return res.status(200).json(contact)
})

//desc Delete a contacts
//route DELETE /api/contacts/:id
//access public
const deleteAContacts = asyncHandler( async (req, res) => {
    const contact = await contacts.findById(req.params.id)
    if(contact){
        await contacts.deleteOne(contact)
        return res.status(200).json({message: `Delete contacts for ${req.params.id}`, data: contact})
    } else {
        res.status(404)
        throw new Error('Contact not found')
    }
})

module.exports = {getAllContacts, getAContacts, updateAContacts, addAContacts , deleteAContacts}