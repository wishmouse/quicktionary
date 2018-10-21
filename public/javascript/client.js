var $ = require('jquery')
var request = require('superagent')

 $(document).ready(function(){

$("#alphabet").on("click", function(e) {
    var b = $("span").click(function(event){
        event.stopPropagation();
        console.log("The span element was clicked.");
    });

})


       $("#submit").on("click", function(e) {
          e.preventDefault()
         var letter1 = $('#letter1').val()
         var letter2 = $('#letter2').val()
         var letter3 = $('#letter3').val()
         var letter4 = $('#letter4').val()
         var word =letter1+letter2+letter3+letter4

         request
          .post('/')
          .send({search: word})
          .end(function(err, response){
       //if statement for error/ response
        })
     })
});
