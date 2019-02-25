/* HTML DOM */
var p = document.getElementsByTagName('p');
var h1 = document.getElementsByTagName('h1');
var h2 = document.getElementsByTagName('h2');
var h3 = document.getElementsByTagName('h3');
var h4 = document.getElementsByTagName('h4');
var h5 = document.getElementsByTagName('h5');
var h6 = document.getElementsByTagName('h6');
var a = document.getElementsByTagName('a');
var table = document.getElementsByTagName('table');
var tr = document.getElementsByTagName('tr');
var td = document.getElementsByTagName('td');
var nobr = document.getElementsByTagName('nobr');
var div = document.getElementsByTagName('div');
var cite = document.getElementsByTagName('cite');
var span = document.getElementsByTagName('span');
var img = document.getElementsByTagName('img');
var button = document.getElementsByTagName('button');
var input = document.getElementsByTagName('input');
var blockquote = document.getElementsByTagName('blockquote');
var canvas = document.getElementsByTagName('canvas');
var footer = document.getElementsByTagName('footer');
var header = document.getElementsByTagName('header');
var select = document.getElementsByTagName('select');
var option = document.getElementsByTagName('option');
var center = document.getElementsByTagName('center');
var fonts = [p, h1, h2, h3, h4, h5, h6, a, td, nobr, div, cite, span, button, input];
var backgrounds = [p, h1, h2, h3, h4, h5, h6, a, table, tr, td, nobr, div, cite, span, img, button, input, blockquote, canvas, footer, header, select, option, center];

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
var limit = 100; // How many gifs to get from giphy
var url; // Stores the URL to get the gif data from
var response = 0; // Stores the response from the URL

/* Options Getter */
chrome.storage.sync.get(['fontStatus', 'fontColorStatus', 'spinStatus', 'gifStatus', 'backgroundStatus', 'searchTag', 'state'], function (status) {
  fontStatus = status.fontStatus;
  fontColorStatus = status.fontColorStatus;
  spinStatus = status.spinStatus;
  gifStatus = status.gifStatus;
  backgroundStatus = status.backgroundStatus;
  searchTag = status.searchTag;
  state = status.state;
});

/* On Page Load */

$(function () {
  if (state) { // If enabled

    if (fontStatus) { // If fonts are enabled
      runFont(); // Start font intervals
      setInterval(function () {
        runFont();
      }, 100);
    }

    if (fontColorStatus) { // If font colors are enabled
      fontColorSetup(); // Setup font colors
      runFontColor(); // Start font color intervals
      setInterval(function () {
        runFontColor();
      }, 100);
    }

    if (spinStatus) {
      for (var i = 0; i < fonts.length - 6; i++) {
        runSpin(fonts[i]);
      }
    }

    if (gifStatus) { // If gifs are enabled
      url = 'https://api.giphy.com/v1/gifs/search?q=' + searchTag + '&api_key=NChfgHwB35TjflSoAYO3NY1O8u21pJKI&limit=' + limit; // Create the URL for gifs using the searchTag and limit
      $.getJSON(url, function (data) { // Get the data from the url
        response = data; // Make the data global
        // Make an array of all the gif URLs returned
        for (var i = 0; i < response.data.length; i++) {
          gifs[i] = "https://i.giphy.com/media/" + response.data[i].id + "/giphy.webp";
        }

        runGif(); // Set all gifs
      }).fail(function (d) {
        gifs[0] = 'https://nrdesign.xyz/comicsams/backupGif.webp';
        runGif(); // Set all gifs
      });
    }

    if (backgroundStatus) { // If background is enabled
      backgroundColorSetup();
      for (i = 0; i < backgrounds.length; i++) {
        runBackground(backgrounds[i]);
      }
      setInterval(function () { // Start background intervals
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
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  head.appendChild(style);

  // Runs fonts for each HTML element
  for (var i = 0; i < fonts.length; i++) {
    runText(fonts[i]);
  }
}

/* Font Color Function*/

function runFontColor() {
  // Runs font colors for each HTML element
  for (var i = 0; i < fonts.length; i++) {
    runTextColor(fonts[i]);
  }
}

function runText(text) {
  for (var i = 0, l = text.length; i < l; i++) { // For each text element
    text[i].style.fontFamily = "Comic Sans MS, cursive, sans-serif"; // Replace the font
  }
}

function fontColorSetup() {
  for (var i = 0, l = fonts.length; i < l; i++) {
    for (var j = 0, m = fonts[i].length; j < m; j++) {
      fonts[i][j].style.transition = 'color 0.2s ease';
    }
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
    text[i].style.transformOrigin = '50% 0';
    text[i].setAttribute('id', 'spinning'); // Assign the spin ID to it
  }
}

function runGif() {
  for (var i = 0, l = img.length; i < l; i++) { //  For each image
    img[i].srcset = '';
    img[i].src = randomGif(); // Replace it with a random gif
  }
}

function backgroundColorSetup() {
  for (var i = 0, l = backgrounds.length; i < l; i++) {
    for (var j = 0, m = backgrounds[i].length; j < m; j++) {
      backgrounds[i][j].style.transition = 'background-color 0.2s ease';
    }
  }
}

function runBackground(elem) {
  setInterval(function () { // Start intervals
    for (i = 0, l = elem.length; i < l; i++) { // For each element
      elem[i].style.backgroundColor = randomColors(); // Give it a random background color
    }
  }, 100);
}

function randomColors() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16); // Generate random color code
}

function randomGif() {
  var g = Math.floor(Math.random() * gifs.length - 1);
  if (g < 0) g = 0;
  return gifs[g]; // Find  a random gif
}
