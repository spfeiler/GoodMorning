const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const users = [
  {username: 'johndoe', password: 'password', name: 'John Doe'},
  {username: 'marydoe', password: 'password', name: 'Mary Doe'}
]

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

app.get('/login', (req, res) => {
  res.json(users)
})

app.post('/login', (req, res) => {

  let username = req.body.username
  let password = req.body.password

  let user = users.find((u) => {
    return u.username == username && u.password == password
  })

  if(user) {
    jwt.sign({ username: username }, 'secret', function(err, token) {

      if(token) {
        res.json({token: token})
      } else {
        res.status(500).json({message: 'Unable to generate token'})
      }
    });
  }
})

app.post('/register', (req, res) => {

  let username = req.body.username
  let password = req.body.password
  let name = req.body.name

  let user = {username: username, password: password, name:name}
  users.push(user)

  res.send('Success!')
})

app.listen(8080,() => {
  console.log('Server is running...')
})
