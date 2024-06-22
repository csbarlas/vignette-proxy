const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const https = require('https')
const fs = require('fs')
const path = require('path')
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
app.use('/movie/:id', require('./routes/movie-detail'))
//Enable cors
app.use(cors())

const options = {
	key: fs.readFileSync(path.join(__dirname, process.env.SSL_KEY)),
	cert: fs.readFileSync(path.join(__dirname, process.env.SSL_CERT))
}

const server = https.createServer(options, app);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
