var $ = require('jquery')
var request = require('superagent')

 $(document).ready(function(){
   var letter1 = ''
   var letter2 = ''
   var letter3 = ''
   var letter4 = ''

  $('#alphabet').delegate('.letters', 'click', function(e){
           var ab = $(this).attr('id')
           var newClass = $(this).attr('class', 'used_letters');
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
         wordLength=word.split('')
         if (wordLength.length != 4){
           alert('Please enter a four letter word')
         } else{
           request
            .post('/')
            .send({search: word})
            .end(function(err, response){
         //if statement for error/ response
          })
          charArray()
          removeWord()
         }
     })

     function charArray(){
       var mysteryWord = 'ROSE'
       var letter1 = $('#letter1').val()
       var letter2 = $('#letter2').val()
       var letter3 = $('#letter3').val()
       var letter4 = $('#letter4').val()
       var word =letter1+letter2+letter3+letter4
       if(mysteryWord == word){
         alert ('boom!  you are amazing')
       } else {
           var mysteryArray = mysteryWord.split('')
           var guessArray = word.split('')
           var filteredKeywords = guessArray.filter((word) => !mysteryArray.includes(word));
            xtotal = filteredKeywords.length-4
            total = xtotal*-1
            if (total >0 ){
              totalSpan ="" +
                 "<span class='past_input_wrong' style='background: #bdf5bd; border-radius:30px' type='text'>"+total+"</span>"
            } else {
              totalSpan ="" +
               "<span class='past_input_wrong' style='background: #f5bdbd; border-radius:30px' type='text'>"+total+"</span>"
             }


           var pastWords = $("#past_words")
           var pastWordAttempts ="" +
            "<div class='word'>"+
              "<span class='past_input' guess='past_guess' type='text'>"+letter1+"</span>" +
              "<span class='past_input' guess='past_guess' type='text'>"+letter2+"</span>" +
              "<span class='past_input' guess='past_guess' type='text'>"+letter3+"</span>" +
              "<span class='past_input' guess='past_guess' type='text'>"+letter4+"</span>" +
              totalSpan+
            "</div>"
            pastWords.append(pastWordAttempts)

            if(total == 0){
              $( ".past_input" ).each(function( i ) {
                  past_input_value = $( ".past_input" ).html()
                  if (past_input_value == letter1 ||past_input_value == letter2 || past_input_value == letter3 || past_input_value == letter4) {
                    $(this).removeClass('past_input').addClass('past_input_wrong')
                    alphabet_value = $("#"+past_input_value)
                        //if (alphabet_value== letter1 ||alphabet_value ==  letter2 || alphabet_value == letter3 || alphabet_value ==  letter4 ) {
                        //  $(this).removeAttr(name).attr('name', 'used_alphabet')
                          alphabet_value.css("background-color", "#f5bdbd")
                      //  }
                      }
                });
            }
          }
  checkLetters()
  removeWord()
 }


     function removeWord(){
       $('.used_letters').removeClass('used_letters').addClass('letters')
       $('#letter1').val('')
       $('#letter2').val('')
       $('#letter3').val('')
       $('#letter4').val('')
     }

     function checkLetters(){
       past_input_value =  $('[guess="past_guess"]').html()
       if ( past_input_value == letter1 ||past_input_value == letter2 || past_input_value == letter3 || past_input_value == letter4) {
         past_input_value.removeClass('past_input').addClass('past_input_wrong')
       }
     }

});
