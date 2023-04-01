import fs from "fs"
import { promisify } from "util";
const readFilePromise = promisify(fs.readFile);
import yargs from "yargs"
import { hideBin } from "yargs/helpers"
const argv = yargs(hideBin(process.argv)).argv



// get users read from file 
async function getUsers(filename ) {
    return await readFilePromise(filename, "utf-8");
}

// autogenerate id 
function generateNewId(users) {
    let id;
    if (!users.length) id = 1;
    else id = users[users.length - 1].id + 1;
    return id;
}

// write in file 
function writeUserIntoFile(filename, users) {
    fs.writeFileSync(filename, users);
}

// create user 
async function createUser(filename,name, email) {
    const users = JSON.parse(await getUsers(filename));
    let id = generateNewId(users);
    const user = {
        id,
        name,
        email,
    };
    users.push(user);
    writeUserIntoFile(filename, JSON.stringify(users));
}

async function deleteUser(filename,id)
{
    const users = JSON.parse(await getUsers(filename));
    for (let i = 0; i < users.length; i++) {
        if(users[i].id == id )
        {
            users.splice(i,1)
            writeUserIntoFile(filename, JSON.stringify(users));
        }
    }

}

async function  updateUser(filename,id,name ,email)
{
    const users = JSON.parse(await getUsers(filename));
    for (let i = 0; i < users.length; i++) {
        if(users[i].id == id )
        {
            var data = {
                id:id,
                name:users[i].name,
                email:users[i].email
            };
            if (name != ""){
                data.name =name
            } else if (data.email != ""){
                data.email =email
            }

            users[i] = data
            writeUserIntoFile(filename, JSON.stringify(users));
        }
    }
}


 async function  getUser(filename,id)
{
    const users = JSON.parse( await getUsers(filename));
    var user = []
    for (let i = 0; i < users.length; i++) {
        if(users[i].id == id )
        {
             user = users[i];
        }
    }
    return user
}


export {getUsers , generateNewId , writeUserIntoFile , createUser , deleteUser , updateUser , getUser}
