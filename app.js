(function() {
  "use strict";

  var program1 = new Program();
  program1.run();

  var Program = function() {
  
  };

  Program.prototype = {

    constructor: Program,
    
    init: function() {
      this.phrase = "METHINKS IT IS LIKE A WEASEL";
      this.phrase = this.phrase.split("");
      this.probability = 5;
      this.generations = 1;
      this.bestCopy = this.randomPhrase();
      this.bestScore = this.score(this.bestCopy);
    },
    
    run: function() {
      this.init();
      
      while(this.bestScore != 28) {
        for(var i=0; i<10; i++) {
          var tmpCopy = this.copy(this.bestCopy);
          var tmpScore = this.score(tmpCopy);
          
          if(tmpScore > this.bestScore) {
            this.bestCopy = tmpCopy;
            this.bestScore = tmpScore;
          }
        }
        
        this.generations++;
      }

      console.log(this.bestCopy, this.generations);
    },

    copy: function(existingPhrase) {
      var self = this,
          letters = existingPhrase.split("");
      
      letters.forEach(function(letter, index, arr) {
        arr[index] = self.mutate(letter);
      });
      
      return letters.join("");
    },

    mutate: function(letter) {
      var self = this,
          random = Math.floor(Math.random() * Math.floor(100));
      
      if(random < self.probabilty) {
        letter = self.randomCharacter();
      }
      
      return letter;
    },

    score: function(phrase) {
      var tmp = phrase.split(""),
          matches = 0;

      this.phrase.forEach(function(letter, index) {
        if(tmp[index] === letter) {
          matches++;
        }
      });

      return matches;
    },

    randomPhrase: function() {
      var self = this,
          letters = [];
      
      for(var j=0; j<28; j++) {
        letters[j] = self.randomCharacter();
      }
      
      return letters.join("");
    },

    randomCharacter: function() {
      var letters = [
        'A','B','C','D','E','F','G','H','I','J','K','L',
        'M','N','O','P','Q','R','S','T','U','V','W','X',
        'Y','Z',' '
      ];
          
      return letters[Math.floor(Math.random() * Math.floor(letters.length))];
    }
  };
})();
