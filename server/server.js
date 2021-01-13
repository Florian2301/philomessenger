const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path')


const app = express();

// BodyParser Middleware
app.use(bodyParser.json())

// DB Config
const db = process.env.mongoURI || require('./config/keys').mongoURI

// Connect to MongoDB
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
    })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err))

// Use Routes
const chats = require('./routes/api/adminChats')
app.use('/api/chats', chats)

const title = require('./routes/api/adminTitle')
app.use('/api/title', title)

const drafts = require('./routes/api/adminDrafts')
app.use('/api/drafts', drafts)

const users = require('./routes/api/users')
app.use('/api/users', users)

const usertitle = require('./routes/api/userTitle')
app.use('/api/usertitle', usertitle)

const userdrafts = require('./routes/api/userDrafts')
app.use('/api/userdrafts', userdrafts)

const userchats = require('./routes/api/userChats')
app.use('/api/userchats', userchats)

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('../client/build'))

    app.get('*', (req,res) => {
        res.sendFile(path.resolve('../client', 'build', 'index.html'))
    })
}


const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
