const express = require('express');
const app = express()
const port = 8000

// configre the .env file 
const dotenv = require('dotenv');
dotenv.config();

require('./DB.js')
const userRoute  = require('./routes/usersRoute')
const tasksRoute  = require('./routes/tasksRoute')

app.use(express.json());
app.use("/users",userRoute)
app.use("/tasks",tasksRoute)

app.listen(port, () => {
    console.log(`app listening on port ${process.env.PORT} done `)
})



// error handelar 
app.use((err,req, res, next) => {
    err.statusCode = err.statusCode || 500 ;
    res.status(err.statusCode).json({
        status:"error",
        message:err.message  || "server error",
        err
    });
})
