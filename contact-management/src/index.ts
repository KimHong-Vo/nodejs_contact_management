import express from 'express';
import connectDB from './config/dbConnection.ts';
import errorHandler from './middleware/errorsHandler.ts';
import contactRouter from './routes/contactRoutes.ts';
import userRoute from './routes/userRoutes.ts';
import sqlConnection from './config/mysqlDbConnection.ts';

const app = express();

const port = 5000;

/* define a route BASIC
app.get('/api/contacts', (req, res) => {
    // res.send("Get all contacts");
    res.status(200).json({message: 'Get all contacts'})
})
*/

//connect mongo database
// connectDB()

// connect mysql database
sqlConnection.sync().then(()=>{
    console.log('My Sql Database Connected')
}).catch((err) => {
    console.log(`Connect Database Cause Error: ${err.message}`);
    
})

//add json parser, to read json body from requestes 
app.use(express.json())  //client data -x-> server ==> client data --parser--> server

//Define Routes
/* use('/url') same with requestMapping of restcontroller in springboot
the /url will concat with require routes to become complete urls */
app.use('/api/contacts', contactRouter)
app.use('/api/user', userRoute)

app.use(errorHandler)

app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
})
