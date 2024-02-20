const express = require('express')
const app = express()
const port = 3000

// Static Files
app.use(express.static('static'))

// Place this line somewhere at the top of your file
const nunjucks = require('nunjucks')

// Tell nunjucks where your template files are located (e.g., 'views' directory)
nunjucks.configure('views', {
    autoescape: true,
    noCache: true, // <-- Should only be true when developing
    express: app
});

let pokemon = require('./pokemon.json')
let rickAndMorty = require('./rick-morty.json')


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

// // Endpoint for https://your-url/
// app.get('/', function(req, res) {

//   // Render index.njk using the variable "title" 
//   res.render('index.njk', { title: "Welcome to my site!" } );
// });

// Endpoint for /characters shows all characters
// app.get('/characters', function(req, res) {
//   res.render('rick-and-morty.njk', { /* character data goes here */ } );
// });

app.get('/characters', (req, res) => {
  let html = nunjucks.render('rick-and-morty.njk', {characters: rickAndMorty.results})
  res.send(html)
})

// Endpoint for /characters/:id shows details for ONE characer
app.get('/character/:id', function(req, res) {
  let id = req.params.id - 1
  let html = nunjucks.render('character.njk', {character: rickAndMorty.results, num: id})
  res.send(html);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

