import express from 'express';
import connectDB from './config/dbConnection.js';
import errorHandler from './middleware/errorsHandler.js';
import contactRouter from './routes/contactRoutes.js';

const app = express();

const port = 5000;

/* define a route BASIC
app.get('/api/contacts', (req, res) => {
    // res.send("Get all contacts");
    res.status(200).json({message: 'Get all contacts'})
})
*/

connectDB()

//add json parser, to read json body from requestes 
app.use(express.json())  //client data -x-> server ==> client data --parser--> server

//Define Routes
/*use('/url') same with requestMapping of restcontroller in springboot
the /url will concat with require routes to become complete urls*/
app.use('/api/contacts', contactRouter)

app.use(errorHandler)

app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
})
