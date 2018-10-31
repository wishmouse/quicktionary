var express = require('express')
var app = express()
var path = require('path')
var bodyParser = require('body-parser')
var request = require('superagent')
var cons = require('consolidate')
//var hbsfy = require('hbsfy')
var Dictionary = require("oxford-dictionary-api");
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

var app_id = "e8084dc1";
var app_key = "90380233a16329df9c609d9f8fc7c666";

var dict = new Dictionary(app_id,app_key);
app.post('/', function(req, res){
  var word_id = req.body.search
  console.log('word_id::', word_id)
  dict.find(word_id,  function(error,data){
        if(error){
            var response = error
            res.json(response)
            return console.log('this is an error error::', error);
        }
       var response = data.results[0].id
       console.log(data)
       res.json(response)
     });
})

app.get('/', function(req, res){
  res.render("index")
})


app.listen(3000, function(){
  console.log("spelling be .... 3000")
})

module.exports = app
