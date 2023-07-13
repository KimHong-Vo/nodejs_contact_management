const express = require('express');

const app = express();

const port = 5000;

/* define a route BASIC
app.get('/api/contacts', (req, res) => {
    // res.send("Get all contacts");
    res.status(200).json({message: 'Get all contacts'})
})
*/

//add json parser, to read json body from requestes 
app.use(express.json())  //client data -x-> server ==> client data --parser--> server

//Define Routes
/*use('/url') same with requestMapping of restcontroller in springboot
the /url will concat with require routes to become complete urls*/
app.use('/api/contacts', require('./routes/contactRoutes'))

app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
    
})
