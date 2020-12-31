const express = require('express')
const router = express.Router()

// Title Model
const Usertitle = require('../../models/Usertitle')

// Getting all Titles
router.get('/', async (req, res) => {
    try {
        const title = await Usertitle.find().sort({ user: 1, chatnumber: 1})
        res.json(title)
    } catch (err) {
        res.status(500).json({ message: err.message })
    } 
})

// Getting one Title
router.get('/:id', getTitle, (req, res) => {
    res.json(res.usertitle)
})

// Creating one Title
router.post('/', async (req, res) => {
    const title = new Usertitle({
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
    } catch (err) {
        res.status(400).json({ message: err.message })
    } 
})

// Updating one Title
router.patch('/:id', getTitle, async (req, res) => {
    console.log("router usertitle1", res.usertitle)
    if (req.body.chatnumber !== res.usertitle.chatnumber) {
        res.usertitle.chatnumber = req.body.chatnumber
    }
    if (req.body.title !== res.usertitle.title) {
        res.usertitle.title = req.body.title
    }
    if (req.body.date !== res.usertitle.date) {
        res.usertitle.date = req.body.date
    }
    if (req.body.tags !== res.usertitle.tags) {
        res.usertitle.tags = req.body.tags
    }
    if (req.body.description !== res.usertitle.description) {
        res.usertitle.description = req.body.description
    }
    console.log("router usertitle2", res.usertitle)
    try {
        const updatedTitle = await res.usertitle.save()
        res.json(updatedTitle)
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
})


// Deleting one Title
router.delete('/:id', getTitle, async (req, res) => {
    try {
        await res.usertitle.remove()
        res.json({ message: "Deleted title" })
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

async function getTitle(req, res, next) {
    let title
    try{
        title = await Usertitle.findById(req.params.id)
        if (title == null) {
            return res.status(404).json({ message: "Cannot find title" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.usertitle = title
    next()
}


module.exports = router