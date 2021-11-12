const protect = (req,res,next) =>{
    const {user} = req.session
    // var hour = 3600000;
    // req.session.cookie.maxAge = 14 * 24 * hour; //2 weeks
    // console.log(req.session)
    if(!user){
        return res.status(401).json({
            status: 'fail',
            message:'unothorized'
        })
    }

    req.user = user
    next()
}

module.exports = protect;