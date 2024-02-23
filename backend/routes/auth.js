const express=require ('express');
const User=require('../models/User')
const router=express.Router()
const {body,validationResult}=require('express-validator');
const bcrypt=require('bcryptjs')
var jwt=require('jsonwebtoken')
var fetchuser=require('../middleware/fetchuser')


const JWT_SECRET='Kushisagoodb$oy'

//ROUTE 1:Create a User using:POST "/api/auth/createuser" .Doesn't require Auth. No login required
router.post('/createuser',[body('email','Enter a valid mail').isEmail(),body('name','Enter a valid name').isLength({min:3}),body('password','Password must be atleast 5 characters').isLength({min:5})],async(req,res)=>{
//    console.log(req.body)
//    const user=User(req.body)
//    user.save()
//     res.send(req.body);
let success=false
//If there are errors,returnBad request and  the errors
const errors=validationResult(req)
if(!errors.isEmpty()){
    return res.status(400).json({success,errors:errors.array()})
}
//Check whether the user with this email exists already

try{
let user= await User.findOne({email:req.body.email})
if(user){
return res.status(400).json({success,error:"Sorry a user with this email already exists"})

}
//create a new user
const salt= await bcrypt.genSalt(10);
const secPass=await bcrypt.hash(req.body.password,salt)
user= await User.create({

    name:req.body.name,
    password:secPass,
    email:req.body.email})
    // .then(user=>res.json(user)).catch(err=>{console.log(err) ,res.json({error:"Pleaser enter a unique value for email",message:err.message})})
 const data={
    user:{id:user.id}
 }
 
    const authtoken=jwt.sign(data,JWT_SECRET)

    success=true;
    res.json({success,authtoken})
 
 
    //res.json(user)
}
 //catch errors
 catch(error){
    console.error(error.message)
    res.status(500).send("Internal server error")
 }


})

// ROUTE 2:Authenticate a User using:POST "/api/auth/login" . No login required
router.post('/login',[body('email','Enter a valid mail').isEmail(),body('password','Password cannot be blank').exists()],async(req,res)=>{
              let success=false;
res.setHeader('Access-Control-Allow-Origin','*')
    //If there are errors,returnBad request and  the errors
const errors=validationResult(req)
if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
}

const {email,password}=req.body;

try{
 let user = await User.findOne({email})
 if(!User){
    success=false
    return res.status(400).json({error:"Please try to login with correct credentials"})
 }
 const passwordCompare=await bcrypt.compare(password,user.password)
 if(!passwordCompare){
    success=false
    return res.status(400).json({success,error:"Please try to login with correct credentials"})

 }

 const data={
    user:{id:user.id}
 }
 
    const authtoken=jwt.sign(data,JWT_SECRET)
    success=true;
    res.json({success,authtoken})
}
catch(error){
    console.error(error.message)
    res.status(500).send("Internal server error")
 }
})



// ROUTE 3:Get logged in user details:POST "/api/auth/getuser" . Login required
router.post('/getuser',fetchuser,async(req,res)=>{
try {
    userId=req.user.id
    const user =await User.findById(userId).select("-password")
    res.send(user)
} catch (error) {
    console.error(error.message)
    res.status(500).send("Internal server error")
    
}
})


module.exports=router