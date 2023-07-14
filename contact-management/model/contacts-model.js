const { default: mongoose } = require("mongoose");

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'please add contact name']
    },
    email: {
        type: String,
        require: [true, 'please add contact email']
    },
    phone: {
        type: String,
        require: [true, 'please add contact phone number']
    }
})

module.exports = mongoose.model('contacts', contactSchema)