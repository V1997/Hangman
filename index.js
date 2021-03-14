var hangman = {
  // Total number of allowed guesses before hanging
  guesses: 6,
  // Available words for guessing
  dictionary: ["impress", "incapable", "satisfaction", "develop", "determine"],

  word: null,
  wordlen: 0,
  rights: 0,
  wrongs: 0,
  elImg: null,
  elWord: null,
  elChar: null,
  elLives: null,

  init() {
    // Get HTML elements
    hangman.elImg = document.getElementById("hangman-img");
    hangman.elWord = document.getElementById("hangman-words");
    hangman.elChar = document.getElementById("hangman-char");
    hangman.elLives = document.getElementById("hangman-lives");

    // Generate available characters
    var charwrap = document.getElementById("hangman-char");
    for (var i = 65; i < 91; i++) {
      var charnow = document.createElement("input");
      charnow.type = "button";
      charnow.value = String.fromCharCode(i);
      charnow.addEventListener("click", hangman.check);
      charwrap.appendChild(charnow);
    }

    // Start game
    hangman.reset();
    document
      .getElementById("hangman-reset")
      .addEventListener("click", hangman.reset);
    document.getElementById("hangman-reset").disabled = false;
  },

  toggle(disable) {
    // PARAM disable : enable or disable buttons

    var all = document.querySelectorAll("#hangman-char input");
    for (var i of all) {
      i.disabled = disable;
    }
  },

  reset() {
    // reset() : reset the game

    hangman.rights = 0;
    hangman.wrongs = 0;
    hangman.elLives.innerHTML = hangman.guesses;
    hangman.elImg.style.opacity = 0;

    // Choose a random word from the dictionary
    hangman.word =
      hangman.dictionary[
        Math.floor(Math.random() * Math.floor(hangman.dictionary.length))
      ];
    hangman.word = hangman.word.toUpperCase();
    hangman.wordlen = hangman.word.length;

    hangman.elWord.innerHTML = "";
    for (var i = 0; i < hangman.word.length; i++) {
      var charnow = document.createElement("span");
      charnow.innerHTML = "_";
      charnow.id = "hangword-" + i;
      hangman.elWord.appendChild(charnow);
    }

    // Enable controls
    hangman.toggle(false);
  },

  check() {
    // check() : check if selected character is in the word

    // Check for hits
    var index = 0,
      hits = [];
    while (index >= 0) {
      index = hangman.word.indexOf(this.value, index);
      if (index == -1) {
        break;
      } else {
        hits.push(index);
        index++;
      }
    }

    // Show the hits + calculate score
    if (hits.length > 0) {
      // Reveal words
      for (var hit of hits) {
        document.getElementById("hangword-" + hit).innerHTML = this.value;
      }

      hangman.rights += hits.length;
      if (hangman.rights == hangman.wordlen) {
        hangman.toggle(true);
        alert("YOU WIN!");
      }
    } else {
      hangman.wrongs++;
      var livesleft = hangman.guesses - hangman.wrongs;
      hangman.elLives.innerHTML = livesleft;
      hangman.elImg.style.opacity = (1 - livesleft / hangman.guesses).toFixed(
        2
      );

      if (hangman.wrongs == hangman.guesses) {
        hangman.toggle(true);
        alert("YOU LOSE!");
      }
    }

    // Disable selected character
    this.disabled = true;
  }
};

window.addEventListener("load", hangman.init);
