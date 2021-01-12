const express = require('express')
const router = express.Router()

// Drafts Model
const Userdrafts = require('../../models/Userdraft')


// Get all userdrafts
router.get('/', async (req, res) => {
    try {
        const drafts = await Userdrafts.find()
        res.json(drafts)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


// Get one Userdraft
router.get('/:id', getDrafts, (req, res) => {
    res.json(res.userdrafts)
})


// Create one Draft
router.post('/', async (req, res) => {
    let draft = new Userdrafts({
        userId: req.body.userId,
        user: req.body.user,
        title: req.body.title,
        date: req.body.date,
        description: req.body.description,
        tags: [],
        messages: [],
        buttons: []
    })
    req.body.tags.map((tag) => {
        draft.tags.push(tag)
    })
    req.body.philosopher.map((phil) => {
        draft.philosopher.push(phil)
    })
    req.body.messages.map((message) => {
        draft.messages.push(message)
    })
    try {
        const newDraft = await draft.save()
        res.status(201).json(newDraft)
    } catch (err) {
        res.status(400).json({ message: err.message })
    } 
})


// delete one message or update one message
router.put('/:id', getDrafts, async (req, res) => {
    if(req.body.messages) {                                         // delete one message by replacing with new message array
        res.userdrafts.messages = req.body.messages                      // new array (req.body.messages) without deleted message
    } else {
        res.userdrafts.messages.map((message) => {                  // update text of a single message
            if(message.messagenumber === req.body.messagenumber) {
                message.text = req.body.text
                return message.text
            } 
            return message.text
        })
    }
    try {
        const updatedDraft = await res.userdrafts.save()
        res.json(updatedDraft)
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
})

// Update draft details and/or add new buttons/messages
router.patch('/:id', getDrafts, async (req, res) => {
    if (req.body.title !== res.userdrafts.title) {
        res.userdrafts.title = req.body.title
    }
    if (req.body.date !== res.userdrafts.date) {
        res.userdrafts.date = req.body.date
    }
    if (req.body.tags !== res.userdrafts.tags) {
        res.userdrafts.tags = req.body.tags
    }
    if (req.body.description !== res.userdrafts.description) {
        res.userdrafts.description = req.body.description
    }
    if (req.body.messages !== res.userdrafts.messages) {
        res.userdrafts.messages = req.body.messages
    }
    if (req.body.philosopher !== res.userdrafts.philosopher) {
        res.userdrafts.philosopher = req.body.philosopher
    }
    try {
        const updatedDraft = await res.userdrafts.save()
        res.json(updatedDraft)
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
})

// Delete one Draft
router.delete('/:id', getDrafts, async (req, res) => {
    try {
        await res.userdrafts.remove()
        res.json({ message: "Userdraft deleted" })
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

// function to get draft by id
async function getDrafts(req, res, next) {
    let draft
    try{
        draft = await Userdrafts.findById(req.params.id)
        if (draft === null) {
            return res.status(404).json({ message: "Cannot find userdraft" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.userdrafts = draft
    next()
}

module.exports = router