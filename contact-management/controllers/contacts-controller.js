const asyncHandler = require('express-async-handler')

//desc Get all contacts
//route GET /api/contacts
//access public
const getAllContacts = asyncHandler(async (req, res) => res.status(200).json({message: 'Get all contacts'}))

//desc Get a contacts
//route GET /api/contacts/:id
//access public
const getAContacts = asyncHandler(async (req, res) => res.status(200).json({message: `Get contacts for ${req.params.id}`}))

//desc update a contacts
//route PUT /api/contacts/:id
//access public
const updateAContacts = asyncHandler(async (req, res) => res.status(200).json({message: `Update contacts for ${req.params.id}`}))

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
    return res.status(200).json({message: 'create contact'})
})

//desc Delete a contacts
//route DELETE /api/contacts/:id
//access public
const deleteAContacts = async (req, res) => res.status(200).json({message: `Delete contacts for ${req.params.id}`})

module.exports = {getAllContacts, getAContacts, updateAContacts, addAContacts , deleteAContacts}