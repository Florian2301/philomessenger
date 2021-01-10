const express = require('express')
const router = express.Router()


// Chat Model
const Userchat = require('../../models/Userchat')


// Get all or only one userchat by id or chatnumber
router.get('/', async (req, res) => {
    const number = req.query.chatnumber
    const chatId = req.query.chatId
    const userId = req.query.userId
    if(number) {
        try {
            const userchat = await Userchat.findOne({userId: userId, chatnumber: number})
            res.json(userchat)
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    } else if(chatId) 
        try {
            const userchat = await Userchat.find({_id: chatId})
            res.json(userchat)
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    else {
        try {
            const userchat = await Userchat.find().sort({ user: 1, chatnumber: 1})
            res.json(userchat)
        } catch (err) {
            res.status(500).json({ message: err.message })
        } 
    }
})


// Post one Userchat
router.post('/', async (req, res) => {
    let chat = new Userchat({
        userId: req.body.userId,
        user: req.body.user,
        chatnumber: req.body.chatnumber,
        title: req.body.title,
        date: req.body.date,
        description: req.body.description,
        })
        req.body.tags.map((tag) => {
            chat.tags.push(tag)
        })
        req.body.messages.map((message) => {
            chat.messages.push(message)
        })
        req.body.buttons.map((button) => {
            chat.buttons.push(button)
        })
    try {
        const newChat = await chat.save()
        res.status(201).json(newChat)
    } catch (err) {
        res.status(400).json({ message: err.message })
    } 
})


// Update UserChat
router.patch('/:id', getChat, async (req, res) => {
    if (req.body.chatnumber !== res.userchat.chatnumber) {
        res.userchat.chatnumber = req.body.chatnumber
    }
    if (req.body.title !== res.userchat.title) {
        res.userchat.title = req.body.title
    }
    if (req.body.date !== res.userchat.date) {
        res.userchat.date = req.body.date
    }
    if (req.body.tags !== res.userchat.tags) {
        res.userchat.tags = req.body.tags
    }
    if (req.body.description !== res.userchat.description) {
        res.userchat.description = req.body.description
    }
    try {
        const updatedUserChat = await res.userchat.save()
        res.json(updatedUserChat)
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
})

// Updating UserMessage
router.put('/:id', getChat, async (req, res) => {
    res.userchat.messages.map((message) => {
        if(message.messagenumber === req.body.messagenumber) {
            message.text = req.body.text
            return message.text
        } 
        return message.text
    })
    try {
        const updatedChat = await res.userchat.save()
        res.json(updatedChat)
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
})


// Deleting one Userchat
router.delete('/:id', getChat, async (req, res) => {
    try {
        await res.userchat.remove()
        res.json({ message: "userchat deleted" })
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})


async function getChat(req, res, next) {
    let userchat
    try{
        userchat = await Userchat.findById(req.params.id)
        if (userchat === null) {
            return res.status(404).json({ message: "Cannot find userchat" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.userchat = userchat
    next()
}

module.exports = router
