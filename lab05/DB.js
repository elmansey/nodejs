const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/mytodolist')
.then(() => console.log('connected to database'))
.catch((err)=>{
	console.log(err)
	process.exit(1)
})





