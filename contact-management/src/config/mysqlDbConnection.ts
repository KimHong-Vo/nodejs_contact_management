import { Sequelize } from "sequelize-typescript";
import { Contacts } from "../model/contacts.ts";
import { User } from "../model/user.ts";

const sqlConnection = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'admin123',
    database: 'my_contacts',
    logging: false,
    models: [Contacts, User]
});


export default sqlConnection
