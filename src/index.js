const app = require('./app')

const port = process.env.PORT


app.listen(port , () => {
    console.log('Server is up on port ' + port)
})
// app.use((req, res, next) => {
//   if(req.method === 'GET') {
//      res.send('GET Disablec')
//   } else {
//     next()
//   } 
 
// })

// app.use((req, res, next) => {
//   res.status(503).send('Site is Down...')
// })

// const multer = require('multer')

// const upload = multer({
//     dest: 'images',
//     limits: {
//         fileSize: 1000000
//     }, 
//       fileFilter(req, file, cb) {
//         if(!file.originalname.match(/\.(doc|docx)$/)) {
//             return cb(new Error('Please upload a Word document'))
//         }
//         // cb(new Error('File must be a PDF'))
//         cb(undefined, true)
//         // cb(undefined, false)
//     }
// })

// const errorMidlleware = (req, res, next) => {
//     throw new Error('From my midlleware')
// }

//  app.post('/upload',upload.single('upload'), (req, res) => {
//      res.send()
     
//  }, (error, req, res, next) => {
//      res.status(400).send({error: error.message})
//  })




  

// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//   const token = jwt.sign({ _id: 'abc123'}, 'thisismynewcourse', {expiresIn: '7 days'})
//   console.log(token)

//   const data = jwt.verify(token, 'thisismynewcourse')
//   console.log(data)
// }

// myFunction()