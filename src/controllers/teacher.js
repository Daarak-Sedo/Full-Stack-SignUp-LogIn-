// const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const userModel = require('../model/teachermodel')

const emailregex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
const passwordregex = /^[a-zA-Z0-9!@#$%^&*]{8,15}$/;


//-------------------------------------Create User Api -------------------------------------------------->

const createUser = async function (req, res) {
    try{
    
    // let data=req.body
  const {name,email,password}=req.body
    // if (Object.keys(data).length=== 0)
    // return res.status(400).send({ status: false, msg: "Please provide data in the request body!" }) 

    if(!name) return res.status(400).send({ status: false, message: `Name is required.` });
    
    //------------------------------email validation--------------------------------->
    if (!email)
    return res.status(400).send({ status: false, message: `email is required.` });
         
    if (!emailregex.test(email))
    return res.status(400).send({ status: false, message: ` '${email}' this email is not valid.` });
//    //------------------------------password validation--------------------------------->  
    if (!password)
    return res.status(400).send({ status: false, message: `password is required.` });
         
    if (!passwordregex.test(password))
    return res.status(400).send({ status: false, message: ` '${password}' this password is not valid.` });
     
    
    let document1 = await userModel.findOne({email:email })
    if (document1) return res.status(400).send({ status: false, message: `this Email is already Registred.` });

    const document2 = await userModel.create({name,email,password})
    res.status(201).send({ status: true, data: document2 })
    
}catch(error){
     res.status(500).send({message : error.message})
 }
 }



// //-------------------------------------Log In User Api -------------------------------------------------->
 
const loginUser = async (req, res) => {
    try {
        //   let data=req.body
        const { email, password } = req.body;
  
        // //------------------------------body validation----------------------------------->
        // if (Object.keys(data).length === 0)
        //     return res.status(400).send({ status: false,message: `Please fill the data.` })
                
        // if (Object.keys(data).length > 2)
        //     return res.status(400).send({ status: false,message: `You can't add extra field.`})
      
        // //------------------------------email validation--------------------------------->
        if (!email)
            return res.status(400).send({ status: false, message: `Plz Enter email ID.` });
                 
        if (!emailregex.test(email))
            return res.status(400).send({ status: false, message: ` '${email}' this email is not valid.` });
  
        // //------------------------------password validation--------------------------------->
  
        if (!password)
            return res.status(400).send({ status: false, message: `Plz Enter Password` });
               
        // if (!passwordregex.test(password))
        //     return res.status(400).send({ status: false, message: `Password should be 8-15 char & use 0-9,A-Z,a-z & special char this combination.` });
                
        // //--------------------------------exitsUser----------------------------------->
        const verifyuser = await userModel.findOne({ email:email,password:password});
                
        if (!verifyuser)
            return res.status(401).send({ status: false, message: 'Please Enter Valid Deatials.' });
            
            
        //   return res.send({msg:"sucess",data:verifyuser})  
        return res.write("<h1>Log In Sucessful</h1>")
   
     


        // //let passwordInDb = existUser.password
                   
        // // ------------------------------token generation----------------------------->
        // const payload = { userId: verifyuser._id, iat: Math.floor(Date.now() / 1000) };
  
        // const token = jwt.sign(payload, 'Group30-Project-Shopping-cart', { expiresIn: '365d' });
        // res.setHeader("x-api-key",token)
        // // --------------------------------response-------------------------------------->
        // res.status(200).send({ status: true, message: 'Login Successfull', data: { userId: verifyuser._id, token: token } });
  
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message });
    }
  };

  
  module.exports={createUser,loginUser}
