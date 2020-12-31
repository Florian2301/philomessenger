const express = require('express')
const router = express.Router()

// Title Model
const Title = require('../../models/Title')

// Getting all Titles
router.get('/', async (req, res) => {
    try {
        const title = await Title.find().sort({ chatnumber: 1})
        res.json(title)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting one Title
router.get('/:id', getTitle, (req, res) => {
    res.json(res.title)
})

// Creating one Title
router.post('/', async (req, res) => {
    const title = new Title({
        userId: req.body.userId,
        user: req.body.user,
        chatnumber: req.body.chatnumber,
        title: req.body.title,
        date: req.body.date,
        tags: req.body.tags,
        description: req.body.description
    })
    try {
        const newTitle = await title.save()
        res.status(201).json(newTitle)
        // 201 means successfully created a new object
    } catch (err) {
        res.status(400).json({ message: err.message })
    } // 400 means client-side-issue (e.g. wrong user input)
})

// Updating one Title
router.patch('/:id', getTitle, async (req, res) => {
    if (req.body.chatnumber !== res.title.chatnumber) {
        res.title.chatnumber = req.body.chatnumber
    }
    if (req.body.title !== res.title.title) {
        res.title.title = req.body.title
    }
    if (req.body.date !== res.title.date) {
        res.title.date = req.body.date
    }
    if (req.body.tags !== res.title.tags) {
        res.title.tags = req.body.tags
    }
    if (req.body.description !== res.title.description) {
        res.title.description = req.body.description
    }
    try {
        const updatedTitle = await res.title.save()
        res.json(updatedTitle)
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
})


// Deleting one Title
router.delete('/:id', getTitle, async (req, res) => {
    try {
        await res.title.remove()
        res.json({ message: "Deleted title" })
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

async function getTitle(req, res, next) {
    let title
    try{
        title = await Title.findById(req.params.id)
        if (title == null) {
            return res.status(404).json({ message: "Cannot find title" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.title = title
    next()
}


module.exports = router