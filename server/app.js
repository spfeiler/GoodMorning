const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const models = require('./models')
const bcrypt = require('bcrypt')
const saltRounds = 10
const PORT = 8080

app.use(cors())
app.use(bodyParser.json())

function authenticate(req, res, next) {

  let headers = req.headers["authorization"]
  let token = headers.split(' ')[1]

  jwt.verify(token, 'secret', (err, decoded) => {
    if(decoded) {
      if(decoded.username) {
        next()
      } else {
        res.status(401).json({message: 'Token invalid'})
      }
    } else {
      res.status(401).json({message: 'Token invalid'})
    }
  })
}

app.post('/login', (req, res) => {

  let username = req.body.username
  let password = req.body.password

  models.Users.findOne({
    where: {
      username: username
    }
  }).then((user) => {
    if(user) {
      jwt.sign({ username: username}, 'secret', function(err, token) {
        if (token) {
          res.json({token: token, id: user.dataValues.id})
        } else {
          res.status(500).json({message: "Unable to generate token"})
        }
      })
    }
  })
})

app.post('/register', (req, res) => {

  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {

    let username = req.body.username
    let password = hash
    let firstName = req.body.firstName
    let lastName = req.body.lastName

    let newUser = models.Users.build({
      username: username,
      password: password,
      first_name: firstName,
      last_name: lastName
    })

    models.Users.findOne({
      where: {username : req.body.username}
    }).then(function (result) {
      if (null != result) {
        console.log("Username Already Exists!", result.username);
      } else {
        newUser.save().then(function(newUser) {
        })
      }
    })
  })
})

app.post('/entry', (req, res) => {

  let date = req.body.date
  let entry = req.body.entry
  let user = req.body.user

  let journalEntry = models.Journal.build({
    date: date,
    entry: entry,
    user: user
  })

  journalEntry.save().then((savedEntry) => {
    if(savedEntry) {
      res.json({success: true})
    } else {
      res.json({success: false, message: 'Error saving'})
    }
  })
})

app.get('/entry', async (req, res) => {

  let entryList = await models.Journal.findAll()
  res.json(entryList)
})

app.post('/delete', (req, res) => {
  models.Journal.destroy({
    where: {
      id: req.body.entryKey
    }
  })
})

app.listen(PORT,() => {
  console.log('Server is running...')
})
