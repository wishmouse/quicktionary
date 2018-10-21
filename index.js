var express = require('express')
var app = express()
var path = require('path')
var bodyParser = require('body-parser')
var request = require('superagent')
var cons = require('consolidate')
//var hbsfy = require('hbsfy')
var dictionaryWebApi = require("oxford-dictionary-api");
var passport = require('passport')
// view engine setup
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')

//app.set('views', path.join(__dirname, 'views'))
//app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


var dictionaryApi = new dictionaryWebApi({
    "Accept": "application/json",
    'Content-Type': 'text/html',
    "app_id": "e8084dc1",
    "app_key": "6b8fde10b5d7828319d3a053f2ac7e66"
})


app.post('/', function(req, res){
  var word_id = req.body.search
  console.log(word_id)
  .get('https://od-api.oxforddictionaries.com:443/api/v1/entries/en/' + word_id)
  .set( "Accept", "application/json",
        'Content-type', 'text/html',
        "app_id", "e8084dc1",
        "app_key", "6b8fde10b5d7828319d3a053f2ac7e66"
      )
  .then(function(data){
    console.log(data)
    //var query = data.body.tracks
    //res.json(query)

  });
})

app.get('/', function(req, res){
  res.render("index")
})


app.listen(3000, function(){
  console.log("spelling be .... 3000")
})

module.exports = app
