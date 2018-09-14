/* HTML DOM */
var p = document.getElementsByTagName('p');
var h1 = document.getElementsByTagName('h1');
var h2 = document.getElementsByTagName('h2');
var h3 = document.getElementsByTagName('h3');
var h4 = document.getElementsByTagName('h4');
var h5 = document.getElementsByTagName('h5');
var h6 = document.getElementsByTagName('h6');
var a = document.getElementsByTagName('a');
var td = document.getElementsByTagName('td');
var nobr = document.getElementsByTagName('nobr');
var div = document.getElementsByTagName('div');
var cite = document.getElementsByTagName('cite');
var span = document.getElementsByTagName('span');
var img = document.getElementsByTagName('img');
var button = document.getElementsByTagName('button');

/* Options Variables */
var fontStatus;
var fontColorStatus;
var spinStatus;
var gifStatus;
var backgroundStatus;
var searchTag;
var state;

/* Gif Variables */
var gifs = []; // Empty array for storing random gifs later
var limit = 300; // How many gifs to get from giphy
var url; // Stores the URL to get the gif data from
var response = 0; // Stores the response from the URL

/* Options Getter */
chrome.storage.sync.get(['fontStatus', 'fontColorStatus', 'spinStatus', 'gifStatus', 'backgroundStatus', 'searchTag', 'state'], function(status) {
  fontStatus = status.fontStatus;
  fontColorStatus = status.fontColorStatus;
  spinStatus = status.spinStatus;
  gifStatus = status.gifStatus;
  backgroundStatus = status.backgroundStatus;
  searchTag = status.searchTag;
  state = status.state;
});

/* On Page Load */

$(function() {
  if (state) { // If enabled

    if (fontStatus) { // If fonts are enabled
      runFont(); // Start font intervals
      setInterval(function() {
        runFont();
      }, 100);
    }

    if(fontColorStatus) { // If font colors are enabled
      runFontColor(); // Start font color intervals
      setInterval(function() {
        runFontColor();
      }, 100);
    }

    if(spinStatus) {
      runSpin(p);
      runSpin(h1);
      runSpin(h2);
      runSpin(h3);
      runSpin(h4);
      runSpin(h5);
      runSpin(h6);
      runSpin(a);
      runSpin(td);
      runSpin(nobr);
      runSpin(cite);
      runSpin(span);
      runSpin(button);
    }

    if(gifStatus) { // If gifs are enabled
      url = 'https://api.giphy.com/v1/gifs/search?q=' + searchTag + '&api_key=NChfgHwB35TjflSoAYO3NY1O8u21pJKI&limit=' + limit; // Create the URL for gifs using the searchTag and limit
      $.getJSON(url, function(data) { // Get the data from the url
        response = data; // Make the data global
        // Make an array of all the gif URLs returned
        for (var i = 0; i < response.data.length; i++) {
          gifs[i] = "https://i.giphy.com/media/" + response.data[i].id + "/giphy.webp";
        }

        runGif(); // Start gif intervals
        setInterval(function() {
          runGif();
        }, 1700);
      });
    }

    if (backgroundStatus) { // If background is enabled
      runBackground(div); // Run for all divs
      runBackground(button); // Run for all buttons
      setInterval(function() { // Start background intervals
        document.querySelector('body').style.background = randomColors();
      }, 100);
    }
  }
});

/* Font Function */

function runFont() {
  // Adds css for spinnning
  var css = '#spinning { animation-name: spinner; animation-timing-function: linear; animation-iteration-count: infinite; animation-duration: 5s; transform-style: preserve-3d; } @keyframes spinner { from { transform: rotateY(0deg); } to { transform: rotateY(-360deg); } }',
  head = document.head || document.getElementsByTagName('head')[0],
  style = document.createElement('style');
  style.type = 'text/css';
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  head.appendChild(style);

  // Runs fonts for each HTML element
  runText(p);
  runText(h1);
  runText(h2);
  runText(h3);
  runText(h4);
  runText(h5);
  runText(h6);
  runText(a);
  runText(td);
  runText(nobr);
  runText(div);
  runText(cite);
  runText(span);
  runText(button);
}

/* Font Color Function*/

function runFontColor() {
  // Runs font colors for each HTML element
  runTextColor(p);
  runTextColor(h1);
  runTextColor(h2);
  runTextColor(h3);
  runTextColor(h4);
  runTextColor(h5);
  runTextColor(h6);
  runTextColor(a);
  runTextColor(td);
  runTextColor(nobr);
  runTextColor(div);
  runTextColor(cite);
  runTextColor(span);
  runTextColor(button);
}

function runText(text) {
  for (var i = 0, l = text.length; i < l; i++) { // For each text element
    text[i].style.fontFamily = "Comic Sans MS, cursive, sans-serif"; // Replace the font
  }
}

function runTextColor(text) {
  for (var i = 0, l = text.length; i < l; i++) { // For each text element
    text[i].style.color = randomColors();  // Give it a random color
  }
}

function runSpin(text) {
  for (var i = 0, l = text.length; i < l; i++) { // For each text element
    text[i].style.display = "block"; // Make sure that it is block so it can be transformed
    text[i].setAttribute('id', 'spinning'); // Assign the spin ID to it
  }
}

function runGif() {
    for (var i = 0, l = img.length; i < l; i++) { //  For each image
      img[i].src = randomGif(); // Replace it with a random gif
    }
}

function runBackground(elem) {
  setInterval(function() { // Start intervals
    for (i = 0, l = elem.length; i < l; i++) { // For each element
        elem[i].style.backgroundColor = randomColors(); // Give it a random background color
    }
  }, 100);
}

function randomColors() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16); // Generate random color code
}

function randomGif() {
  return gifs[Math.floor(Math.random() * limit - 1)]; // Find  a random gif
}
