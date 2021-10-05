const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()



router.post('/tasks',auth, async (req, res) => {
    // const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
   
    try {
        await task.save()
        res.status(201).send(task)
    } catch (err) {
        res.status(400).send(err)
    }
   
})
// GET / tasks?complete=true
// GET /tasks?limit=10&skip=20
// GET / tasks?sortBy=createdAt:asc or desc
router.get('/tasks', auth,async (req, res) => {
    const match = {}
    const sort = {}

    if(req.query.complete) {
        match.complete = req.query.complete === 'true'
        
    }

    if(req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
       
    }
    try {
        //    const tasks = await Task.find({owner: req.user._id}) 
        //     res.send(tasks)
            // await req.user.populate('tasks')
            await req.user.populate({
                path: 'tasks',
                match,
                options: {
                    limit: parseInt(req.query.limit),
                    skip: parseInt(req.query.skip),
                    sort
                }
            })
            res.send(req.user.tasks)
        } catch (err) {
           res.status(500).send(err)
        }
   
})

router.get('/tasks/:id',auth, async (req, res) => {
    const _id = req.params.id

    try {
       //const task = await Task.findById(_id)
       const task = await Task.findOne({_id, owner: req.user._id})

            if(!task) {
            return res.status(400).send()
            } 

        res.send(task)
    } catch (err) {
        res.status(500).send("can't find task with id")
    }
  
})

router.patch('/tasks/:id',auth, async (req, res) => {
     const updates = Object.keys(req.body)
     const allowedUpdates = ['title', 'content', 'complete']
     const isValid = updates.every(update => allowedUpdates.includes(update))
    //  const _id = req.params.id
     if(!isValid) {
         return res.status(400).send({ error: 'Invalid updates!'})
     }

    try {
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id})
       
    //    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //        new:true,
    //        runValidators:true
    //    })
       if(!task) {
           return res.status(404).send()
       }
         updates.forEach(update => task[update] = req.body[update])
        await task.save()
       res.send(task)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.delete('/tasks/:id',auth, async (req, res) => {

    try {
        const task = await Task.findOneAndDelete({_id:req.params.id, owner: req.user._id})

        if(!task) {
            return res.status(404).send({error: 'Task not found'})
        }

        res.send(task)
    }catch (err) {
        res.status(500).send({error: err})
    }
})


module.exports = router