const connectDB = require('./db');
const express = require('express');
var cors = require('cors')

connectDB();
// console.log(conn);
const app = express();
const port = 5000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hello World")
})

// Available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/note', require('./routes/note'))

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})