const {Router} = require("express");
const {body, validationResult} = require('express-validator')
const userController =  Router();
const bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');
const {UserModel} = require("../models/UserModel")


userController.post("/signup",
                body('email').isEmail(),
            body('password').isLength({min: 6}),
             (req, res)=>{
                const errors = validationResult(req);
                    if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
              }

                
    const {name,email, password  } = req.body;
    bcrypt.hash(password, 5,async function(err, hash) {
        if(err){
            console.log("something went wrong..plz try again later")
            count++
        }
        const user =  new UserModel({
            name,
            email,
            password : hash,
            
        })
        try{
            await user.save()
            res.send({msg :"signup successful"})
            
        }
        catch(err){
            console.log(err)
            res.send("something went wrong try agin")
           
        }
       
        // Store hash in your password DB.
    });
    
})

userController.post("/login", async(req, res)=>{
    
    const {email, password} = req.body;
    const user = await UserModel.findOne({email})
    if(!user){
        res.send({massage:"wrong email"})
    }
    const hash = user.password

    bcrypt.compare(password, hash, function(err, result) {
        if(err){
            res.send({message: "something went wrong..plz try again later"})
            console.log("something went wrong..plz try again later")
    
        }
        if(result){
            const token =  jwt.sign({userId : user._id }, process.env.JWT_SECRET)
            res.send({message: "login successful", token})
            
           //res.send(token);
        }
        else{
            res.send({message: "Envalid Credentials,may wrong password"})
            console.log("invalid credentials, plz signup if u havnt")
        
        }
        // result == true
        
    });
    
    
})

module.exports = {
    userController
}