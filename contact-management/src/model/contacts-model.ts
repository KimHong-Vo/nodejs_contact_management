import mongoose, { Schema } from 'mongoose'

export interface IContact{
    name: String,
    email: String,
    phone: String
}

const contactSchema = new Schema<IContact>({
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

const contactsModel = mongoose.model('contacts', contactSchema)

export default contactsModel