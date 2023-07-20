import asyncHandler from 'express-async-handler'
import contactsModel from '../model/contacts-model.ts'
import { Contacts } from '../model/contacts.ts'
import { log } from 'console'
import { User } from '../model/user.ts'

//desc Get all contacts
//route GET /api/contacts
//access private
export const getAllContacts = asyncHandler(async (req, res) => {
    // res.status(200).json(await contactsModel.find())
    res.status(200).json(await Contacts.findAll({where: {userID: req.body.user.user.id}}) as Contacts[])
})

//desc Get a contacts
//route GET /api/contacts/:id
//access private
export const getAContacts = asyncHandler(async (req, res) => {
    try {
        // const contact = await contactsModel.findById(req.params.id)
        const contact: Contacts|null = await Contacts.findOne({where: {id: req.params.id, userID: req.body.user.user.id}})
        if(contact){
            res.status(200).json(contact)
        } else {
            res.status(404)
            throw new Error("Contact not found")
        }
        
    } catch (error: Error|any) {
        res.status(404)
        error.message = "Contact not found"
        throw error
    }
})

//desc update a contacts
//route PUT /api/contacts/:id
//access private
export const updateAContacts = asyncHandler(async (req: Request|any, res:Response|any) => {
    // const updatedContact = await contactsModel.findByIdAndUpdate(req.params.id, req.body, {new: false})
    const {name, email, phone, user} = req.body
    await Contacts.update({name, email, phone, userID: user.user.id}, {where: {id: req.params.id, userID: user.user.id}})
    const updatedContact: Contacts|null = await Contacts.findOne({where: {id: req.params.id, userID: req.body.user.user.id}})
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
//access private
export const addAContacts = asyncHandler(async (req: Request|any, res:Response|any) => {
    console.log('The info wanna add is: ' ,req.body)
    const {name, email, phone, user} = req.body
    console.log(`added userID ${user.user.id}`);
    
    if(!name || !email || !phone || !user.user.id){
        console.log('cannot add as missing one or more info');
        
        //for standart - the error response will send to client in HTML form format
        throw new Error("All fiels are mandatory!")
    }
    // const contact = await contactsModel.create({
    //     name,
    //     email,
    //     phone
    // })
    const contact = await Contacts.create({name, email, phone, userID: user.user.id})
    return res.status(200).json(contact)
})

//desc Delete a contacts
//route DELETE /api/contacts/:id
//access private
export const deleteAContacts = asyncHandler( async (req: Request|any, res:Response|any) => {
    // const deletedContact = await contactsModel.findById(req.params.id)
    const {id} = req.params
    const deletedContact: Contacts|null = await Contacts.findOne({where: {id: req.params.id, userID: req.body.user.user.id}})
    if(deletedContact){
        // await contactsModel.deleteOne({id: req.params.id})
        await Contacts.destroy({where: {id, userID: req.body.user.user.id}})
        return res.status(200).json({message: `Delete contacts for ${req.params.id}`, data: deletedContact})
    } else {
        res.status(404)
        throw new Error('Contact not found')
    }
})