const mongoose =  require("mongoose")

const userSchema = new mongoose.Schema({
    name:{type: String, required: true , minlength:[2,"minimun 2 letter"]},
    email: {type:String, required : true, unique: true},
    password: {type: String, required : true},
    
},{
    versionKey: false,
    timestamps:true
})

const UserModel = mongoose.model("user", userSchema)

module.exports = {
    UserModel
}