var $ = require('jquery')
var request = require('superagent')
//var _word = require('./_word')


 $(document).ready(function(){
    letter1 = ''
    letter2 = ''
    letter3 = ''
    letter4 = ''
    wrongArray =[]
    uniqWrongArray = []
    mysteryWord = ''


    mysteryObj = [
      {id: 0, word:'LEFT'},
      {id: 1, word:'ROSE'},
      {id: 2, word: 'FILE'},
      {id: 3, word: 'TIME'}
    ]

    function mysteryWord(){
    var number =  Math.floor(Math.random() * 4)
        console.log('type of number::', typeof number)
        for( var i = 0; i < mysteryObj.length; i++ ){
          if( mysteryObj[ i ].id === number ){
            mysteryWord = mysteryObj[ i ].word;
            console.log(mysteryWord)
          
          }
        };
      }

      $(window).on('load', function() {  mysteryWord()})


  $('#alphabet').delegate('.letters', 'click', function(e){
           var ab = $(this).attr('id')
           var newClass = $(this).attr('class', 'used_letters');
           alphabet =ab.toUpperCase()
             letter1 = $('#letter1').val()
             letter2 = $('#letter2').val()
             letter3 = $('#letter3').val()
             letter4 = $('#letter4').val()

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
          letter1 = $('#letter1').val()
          letter2 = $('#letter2').val()
          letter3 = $('#letter3').val()
          letter4 = $('#letter4').val()

         var word =letter1+letter2+letter3+letter4
         word_id = word.toLowerCase()
         console.log(word_id)
         wordLength=word.split('')
         if (wordLength.length != 4){
           alert('Please enter a four letter word')
         }
         /* else{
           request
            .post('/')
            .send({search: word_id})
            .end(function(err, response){
              console.log('err::', err)
              console.log('response::', response)
              if(response.body != word_id){
                alert('is not a valid word')
                removeWord()
              } else{
                charArray()

              }
          })
         }
         */else{
         charArray()
       }
     })



        /* for (i= 0; i < mysteryObj.length; i++) {
           console.log(' type ofmysteryObj.id::', typeof mysteryObj[0].id)
             word = mysteryObj[0].id
             if(word == number )
             word = mysteryObj.id
             return word
         }
     }*/

     function charArray(){
       console.log('mysteryWord off client::', mysteryWord)
        letter1 = $('#letter1').val()
        letter2 = $('#letter2').val()
        letter3 = $('#letter3').val()
        letter4 = $('#letter4').val()
       var word =letter1+letter2+letter3+letter4
       if(mysteryWord == word){
         alert ('boom!  you are amazing')
       } else {
           var mysteryArray = mysteryWord.split('')
           guessArray = word.split('')
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
              "<span class='past_input' value='"+letter1+"' guess='past_guess' type='text'>"+letter1+"</span>" +
              "<span class='past_input' value='"+letter2+"' guess='past_guess' type='text'>"+letter2+"</span>" +
              "<span class='past_input' value='"+letter3+"' guess='past_guess' type='text'>"+letter3+"</span>" +
              "<span class='past_input' value='"+letter4+"' guess='past_guess' type='text'>"+letter4+"</span>" +
              totalSpan+
            "</div>"
            pastWords.append(pastWordAttempts)

            if(total == 0){
              errLetter1 = $('#letter1').val()
              errLetter2 = $('#letter2').val()
              errLetter3 = $('#letter3').val()
              errLetter4 = $('#letter4').val()
              wrongArray.push(errLetter1, errLetter2, errLetter3, errLetter4)
              uniqWrongArray = wrongArray.reduce(function(a,b){
                    if (a.indexOf(b) < 0 ) a.push(b);
                    return a;
                  },[]);
             for (i = 0; i < uniqWrongArray.length; i++) {
                    var wrongArrayLetter = uniqWrongArray[i]
                    var past_input_value = $("[value="+wrongArrayLetter+"]").html()
                    if (past_input_value == wrongArrayLetter ){
                      if(past_input_value == letter1|| past_input_value == letter2 ||past_input_value == letter3 || past_input_value == letter4) {
                       $("[value="+past_input_value+"]").removeClass('past_input').addClass('past_input_wrong')
                       $("#"+past_input_value).css("background-color", "#f5bdbd")
                      //  }
                      }
                    }
                }
              //);
            } else{
              for (i = 0; i < uniqWrongArray.length; i++) {
                     var wrongArrayLetter = uniqWrongArray[i]
                     //var past_input_value = $( ".past_input" ).html()
                     var past_input_value =$("[value="+wrongArrayLetter+"]").html()
                      if (past_input_value == wrongArrayLetter ){
                       if(past_input_value == letter1|| past_input_value == letter2 ||past_input_value == letter3 || past_input_value == letter4) {
                          $("[value="+past_input_value+"]").removeClass('past_input').addClass('past_input_wrong')
                            $("#"+past_input_value).css("background-color", "#f5bdbd")
                                     //  }
                                     }
                                   }
                               }


            }
            removeWord()
          }
 }


     function removeWord(){
       $('.used_letters').removeClass('used_letters').addClass('letters')
       $('#letter1').val('')
       $('#letter2').val('')
       $('#letter3').val('')
       $('#letter4').val('')
     }


});
