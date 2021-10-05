const express = require('express')
const sharp = require('sharp')
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const {sendCancelation, sendWelcomeEmail} = require('../emails/account')
const router = new express.Router()

router.post('/users',async (req, res) => {
    const user = new User(req.body)
   try {
        await user.save()
        sendWelcomeEmail(user.email, user.name)
       const token = user.generateAuthToken()
        res.status(201).send({user, token})
        } catch (err) {
          res.status(400).send(err)
        }
})

router.post('/users/login', async (req, res) => {    
    
    try {
     const user = await User.findByCredentials(req.body.email, req.body.password)
     const token = await user.generateAuthToken()
    
     res.send({user, token})
    } catch (err) {
      res.status(400).send()
    }  
     
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
      
        res.send('Logged out')
    } catch (err) {
        res.status(500).send(err)
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {

    try {
         req.user.tokens = []
         await req.user.save()
         res.send('logout all')
        } catch (err) {
            res.status(500).send(err)
        }
})

router.get('/users/me', auth , async (req, res) => {
   res.send(req.user)
})
const upload = multer({
    // dest: 'avatars',
    limits: {
        fileSize: 1000000
    }, 
    fileFilter(req, file, cb) {

        if(!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            return cb(new Error('Please upload a image with png or jpg or jpeg files onley'))
        }
        // cb(new Error('File must be a PDF'))
        cb(undefined, true)
        // cb(undefined, false) 

    }
}) 
router.post('/users/me/avatar',auth ,upload.single('avatar') , async(req, res) => {
     const buffer = await sharp(req.file.buffer).resize({width:250, height:250}).png().toBuffer()
     req.user.avatar = buffer
    // req.user.avatar = req.file.buffer
    await req.user.save()
   res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message})
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send() 
})

router.get('/users/:id/avatar', async (req, res) => {

    try {
        const user = await User.findById(req.params.id)

        if(!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (err) {
        res.status(404).send() 
    }
})
// router.get('/users/:id', async (req, res) => {
//     const _id = req.params.id
 
//     try {
//       const user = User.findById(_id)
//        if (!user) {
//            return res.status(404).send()
//        }
//        res.send(user)
  
//     } catch (err) {
//          res.status(500).send()
//     }
// })

router.patch('/users/me',auth, async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'age', 'password']
    const isValid = updates.every(update => allowedUpdates.includes(update))

    if(!isValid) {
        return res.status(400).send({error: 'Invalid updates!'})
    }

    try{
        
        updates.forEach(update => req.user[update] = req.body[update])

        await req.user.save()
    //    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //        new:true,
    //        runValidators:true
    //    })

       res.send(req.user)
    } catch (err) {
       res.status(400).send(err)
    }
})

router.delete('/users/me',auth,  async (req, res) => {

    try {
        // const user = await User.findByIdAndDelete(req.user._id)

        // if(!user) {
        //    return res.status(404).send({ error: 'User not found'})
        // }

       await req.user.remove()
        sendCancelation(req.user.email, req.user.name)
        res.send(req.user)
    } catch (err) {
       res.status(500).send(err)
    }
})


module.exports = router