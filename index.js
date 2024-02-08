const express = require('express')
const app = express()
const port = 3000

// Static Files
app.use(express.static('static'))

let pokemon = require('./pokemon.json')


app.get('/', (req, res) => {
  res.send(pokemon[0])
})

app.get('/pokemon/:id', (req, res) => {

  let id = req.params.id - 1
  res.send(pokemon[id])

})

app.get('/pokemon/find/:q', (req, res) => {

  let q = req.params.q

  let found = []

  for (let i = 0; i < pokemon.length; i++) {

      if(pokemon[i].type.findIndex( item => q.includes(item.toLowerCase()) ) !== -1) {
          found.push(pokemon[i])
      }
      
  }

  res.send(found)

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

