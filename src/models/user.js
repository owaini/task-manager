

const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task')


const userSchema = new mongoose.Schema({
    
    name: {
        type: String,
        trim: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Email is invalid");
            }
        }
    },
    password: {
        type: String,
        trim: true,
        validate(value) {
            if(value.toLowerCase().includes('password')) {
                throw new Error("Password shouldn't content "+ value)
            } else if (value.length < 7) {
               throw new Error("Password should be more than 7 Characters");

            }
        }
    },
    age: {
        type: Number,
        default: 10,
        validate(value) {
            if(value < 10) {
                throw new Error("Age must be big than 10 years old")
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }

},
{
    timestamps: true
})

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    
    return userObject
}

userSchema.methods.generateAuthToken = async function () {
     const user = this
     const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET_KEY)
     user.tokens = user.tokens.concat({ token: token})
     await user.save()
    return token
}

userSchema.statics.findByCredentials = async(email, password) => {
    const user = await User.findOne( { email: email })

    if(!user) {
        throw new Error("Unable to login")
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        throw new Error("Invalid password")
    }

    return user
}

// Hash text password before save
userSchema.pre('save', async function(next) {
  const user = this
  
   if(user.isModified('password')) {
       user.password = await bcrypt.hash(user.password, 8)
   }
  
  next()
})

userSchema.pre('remove', async function (next) {
    const user = this 

    await Task.deleteMany({ owner: user._id})

    next()
})
 
const User = mongoose.model('User', userSchema)
 
module.exports = User  