import express from "express";
import {getUser , generateNewId} from "./index.js"
import {writeUserIntoFile , createUser} from "./index.js"
import {deleteUser , updateUser } from "./index.js"
var fielname= "DB/data.json"


const app = express()
app.use(express.json());


app.post("/create", (req, res) => {
    var name = req.body.name
    var email = req.body.email
    createUser(fielname,name,email);
    res.send(true);
});


app.post("/update/:id", (req, res) => {
    var name = req.body.name
    var email = req.body.email
    var id = req.params.id
    updateUser(fielname,id,name,email);
    res.send(true);
});

app.delete("/delete/:id", (req, res) => {
    var id = req.params.id
    deleteUser(fielname,id)
    res.send(true);
});

app.get("/users/:id", async (req, res) => {
    var id = req.params.id
    var user = await getUser(fielname,id);
    res.send(user);
});

app.listen(9000);