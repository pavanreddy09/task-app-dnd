const express = require('express');
require('dotenv').config();
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const { connectToDB } = require('./config/db');
const session = require('express-session');
const app = express();

connectToDB();

app.use(cors({
   origin: process.env.FRONT_END_URL,
   methods: "GET,HEAD,POST,PUT,DELETE,PATCH",
   credentials: true
}
))
app.use(express.json())

app.use(session({
    secret: '4536rsgabneydddv',
    resave: false,
    saveUninitialized: true
}))

app.use('/api/task', taskRoutes)
app.use('/api/user', userRoutes)

app.get("/",(req,res)=>{
    res.send("hello welcome")
})
const PORT = process.env.PORT || 4003
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})