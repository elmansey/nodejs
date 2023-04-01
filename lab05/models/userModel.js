const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
const _ = require('lodash'); 

// schema
const UsersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'the username is required !']
    },
    email: {
        type: String,
        required: [true, 'the email is required !']
    },
    password: {
        type: String,
        required: [true, 'the password is required !'],
        select:false
    },

},
{
    toJSON:{
		transform: (doc,ret)=>{
			const data_re = _.pick(ret,['_id','username','email'])
			return data_re;
		}
	}
});


// before save data in database hashing password [ database middleware ]
UsersSchema.pre('save',async function (next) {
    const UserDocument = this
    if(UserDocument.isModified){
        const hashedPassword = await bcrypt.hash(UserDocument.password,12)
        UserDocument.password = hashedPassword
    }
    next()
})

// hash password when update also 
UsersSchema.pre('findOneAndUpdate',async function (next) {
    const UserDocument = this
        UserDocument.findOneAndUpdate({}, { 
            password: await bcrypt.hash(UserDocument.getUpdate().password ,12) 
        });
    next()
})



// compare password use mongose method 
UsersSchema.methods.comparePassword = function (givenPassword){
    const UserDocument = this
    return bcrypt.compare(givenPassword,UserDocument.password)
}


var Users = mongoose.model("Users", UsersSchema);
module.exports  = Users;

