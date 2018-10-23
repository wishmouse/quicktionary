var $ = require('jquery')
var request = require('superagent')

 $(document).ready(function(){
   var letter1 = ''
   var letter2 = ''
   var letter3 = ''
   var letter4 = ''

  $('#alphabet').delegate('.letters', 'click', function(e){
           var ab = $(this).attr('id')
           alphabet =ab.toUpperCase()

            var letter1 = $('#letter1').val()
            var letter2 = $('#letter2').val()
            var letter3 = $('#letter3').val()
            var letter4 = $('#letter4').val()

          if(letter1 == ""){
            $('#letter1').val(alphabet)
          }  else if(letter2 == ""){
            $('#letter2').val(alphabet)
          } else if(letter3 == ""){
            $('#letter3').val(alphabet)
          } else if(letter4 == ""){
            $('#letter4').val(alphabet)
          }

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
        charArray()
        appendRow()
        removeWord()

     })

     function charArray(){
       var mysteryWord = 'QRTY'
       var letter1 = $('#letter1').val()
       var letter2 = $('#letter2').val()
       var letter3 = $('#letter3').val()
       var letter4 = $('#letter4').val()
       var word =letter1+letter2+letter3+letter4
       if(mysteryWord == word){
         alert ('boom!  you are amazing')
       } else {
           var mysteryArray = mysteryWord.split('')
           var wordArray = word.split('')
           var filteredLetters = mysteryArray.filter((word) => !wordArray.includes(word));
           filteredLetters.length

           var pastWords = $("#past_words")
           var pastWordAttempts ="" +
            "<div class='word'>"+
              "<span class='past_input' type='text'>"+letter1+"</span>" +
              "<span class='past_input' type='text'>"+letter2+"</span>" +
              "<span class='past_input' type='text'>"+letter3+"</span>" +
              "<span class='past_input' type='text'>"+letter4+"</span>" +
              "<span class='past_input' type='text'>"+filteredLetters.length+"</span>" +
            "</div>"
            pastWords.append(pastWordAttempts)
         }
       }


     function removeWord(){
       $('#letter1').val('')
       $('#letter2').val('')
       $('#letter3').val('')
       $('#letter4').val('')
     }

});
