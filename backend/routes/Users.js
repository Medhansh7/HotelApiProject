const express = require('express')
const users = express.Router()
// const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/User')
// users.use(cors())


// Change this //
process.env.SECRET_KEY = 'secret' 

// Register
users.post('/register', async (req, res) => {
    
    
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (!user) {

                bcrypt.hash(req.body.password, 10, (err, hash) => {

                    let userData = {
                        name: req.body.name,
                        email: req.body.email,
                        password: hash,
                        created: new Date(),
                    }

                    User.create(userData)
                        .then(user => {
                            console.log("Success: Registration successful")
                            res.send("Success: Registration successful")
                        })
                        .catch(err => {
                            res.send('error: ' + err)
                        })
                })
            } else {
                console.log("Error: User already exists")
                res.send("Error: User already exists")
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})


//Login
users.post('/login', (req, res) => {

    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    // res.send(token)
                    res.json({
                        "message": "Logged in",
                        "token": token
                    })
                } else {
                    console.log('Wrong Password')
                    res.send('Error: Wrong Email/Password')
                }
            } else {
                console.log('User does not exist')
                res.send('Error: Wrong Email/Password')
               
            }
        })
        .catch(err => {
                    //  res.send('Error: Wrong Email/Password')          
            res.status(400).json({ error: err }) 
        })
})


//User Details
users.get('/profile', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (user) {
                res.json({
                    name: user.name,
                    email: user.email,
                })
            } else {
                res.send('User does not exist')
            }
        })
        .catch(err => {
            res.send('Error: ' + err)
        })
})

users.post('/changePassword', (req, res) => {
    //Request must have email, password and new password fields
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {

                    bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
                        user.update({
                            password: hash
                        })
                    })
                    console.log("Correct Password")
                    res.send('Success: Password Changed')

                } else {
                    console.log("WRONG PASSWORD")
                    res.send('Error: Wrong Password')
                }
            }
        })
})
module.exports = users