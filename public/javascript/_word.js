var $ = require('jquery')
var request = require('superagent')

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
            return mysteryWord
          }
        }
    };


module.exports = {
  mysteryWord:mysteryWord
}
