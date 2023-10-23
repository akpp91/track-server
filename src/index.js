const express = require('express');
const mongoose = require('mongoose');

require('./models/User')
require('./models/Track')

const authRoutes= require('./routes/authRoutes');
const requireAuth = require('./middleware/requireAuth');
const trackRoutes=require('./routes/trackRoutes');

const app = express();

app.use(express.json());
app.use(authRoutes);
app.use(trackRoutes);



const mangoUri ='mongodb+srv://akpp83:PrFdmpnpNkX9KJx5@cluster0.dy8rta8.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(mangoUri)

mongoose.connection.on('connected', ()=>{
    console.log('connect to mongo instance');
})


mongoose.connection.on('error', (err)=>{
    console.log('error connecting to mongo instance', err);
})


app.get('/', requireAuth ,(req , res)=>{

res.send(`ur email: ${req.user.email}`)
})

app.listen(3000, ()=>{
    console.log('lintioning to port 3000');
})