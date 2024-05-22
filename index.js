const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
require('dotenv').config()

const PORT = process.env.PORT || 5001

const app = express()

// Rate limit
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, //10 mins
    max: 50
})
app.use(limiter)
app.set('trust proxy', 1)

app.use('/search/movie', require('./routes/search-movie'))

//Enable cors
app.use(cors())

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
