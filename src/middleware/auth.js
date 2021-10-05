const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        // console.log(token)
        // const bearerToken = req.header['Authorization']
        // const tokenSecret = bearerToken.split(' ')
        // const token = tokenSecret[1] 
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        // console.log(decoded)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token})
        // console.log(user)
    
        if(!user) { 
            throw new Error('no user')
        } 
        req.token = token
        req.user = user 
        next() 
    }catch (err) {
        res.status(401).send({ error: 'Please Authorization'})
    }
   
}

 
module.exports = auth