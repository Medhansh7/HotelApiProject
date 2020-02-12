const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
// var cors = require('cors')
const app = express()
let PORT = process.env.PORT || 5000

app.use(bodyParser.json())
// app.use(cors())
app.use( bodyParser.urlencoded( { extended: false } ))

let Users = require("./routes/Users")

//cors?

app.use("/users", Users)
// console.log("DATABASE >> "+process.env);

app.use(express.static(path.resolve(__dirname, 'build')))

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})