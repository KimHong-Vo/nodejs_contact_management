import asyncHandler from 'express-async-handler'
import contactsModel from '../model/contacts-model.ts'

//desc Get all contacts
//route GET /api/contacts
//access public
export const getAllContacts = asyncHandler(async (req, res) => {
    res.status(200).json(await contactsModel.find())
})

//desc Get a contacts
//route GET /api/contacts/:id
//access public
export const getAContacts = asyncHandler(async (req, res) => {
    try {
        const contact = await contactsModel.findById(req.params.id)
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
export const updateAContacts = asyncHandler(async (req, res) => {
    const updatedContact = await contactsModel.findByIdAndUpdate(req.params.id, req.body, {new: false})
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
export const addAContacts = asyncHandler(async (req, res) => {
    console.log('The info wanna add is: ' ,req.body)
    const {name, email, phone} = req.body
    if(!name || !email || !phone){
        //for standart - the error response will send to client in HTML form format
        throw new Error("All fiels are mandatory!")
    }
    const contact = await contactsModel.create({
        name,
        email,
        phone
    })
    return res.status(200).json(contact)
})

//desc Delete a contacts
//route DELETE /api/contacts/:id
//access public
export const deleteAContacts = asyncHandler( async (req, res) => {
    const contact = await contactsModel.findById(req.params.id)
    if(contact){
        await contactsModel.deleteOne(contact)
        return res.status(200).json({message: `Delete contacts for ${req.params.id}`, data: contact})
    } else {
        res.status(404)
        throw new Error('Contact not found')
    }
})