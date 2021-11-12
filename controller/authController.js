const User = require("../model/userModel")
const bcrypt = require('bcrypt');


exports.signUp = async (req,res) =>{
    const {username , password} = req.body
    const hashPassword = await bcrypt.hash(password,12)
    try {
        const newUser = await User.create({
            username,
            password: hashPassword
        })
        req.session.user = newUser
        res.status(200).json({
            status:'success',
            data:{
                user:newUser
            }
        })
    }catch(e){
       res.status(400).json({
           status: "fail",
           data:{
               user:newUser
           }
       })
    }
}


exports.login = async (req,res) =>{
    const {username, password} = req.body
    //setting the session die tie
    req.session.cookie.maxAge = 30000

    console.log("c",req.session)

    try {
        const user = await User.findOne({username})

        if(!user){
            res.status(404).json({
                status : 'fail',
                message: 'user not found'
            })
        }


        const isCorrect = await bcrypt.compare(password,user.password)
        
        if(isCorrect){

            req.session.user = user
            res.status(200).json({
                status:'success',
                data:{
                    user:user
                }
            })
        }else{
            res.status(400).json({
                status: 'fail',
                message:'incorrect username or password'
            })
        }
        
       
    }catch(e){
       res.status(400).json({
           status: "fail",
           data:{
               user:null
           }
       })
    }

}