/* HTML DOM */
let p = document.getElementsByTagName("p");
let h1 = document.getElementsByTagName("h1");
let h2 = document.getElementsByTagName("h2");
let h3 = document.getElementsByTagName("h3");
let h4 = document.getElementsByTagName("h4");
let h5 = document.getElementsByTagName("h5");
let h6 = document.getElementsByTagName("h6");
let a = document.getElementsByTagName("a");
let table = document.getElementsByTagName("table");
let tr = document.getElementsByTagName("tr");
let td = document.getElementsByTagName("td");
let nobr = document.getElementsByTagName("nobr");
let div = document.getElementsByTagName("div");
let cite = document.getElementsByTagName("cite");
let span = document.getElementsByTagName("span");
let img = document.getElementsByTagName("img");
let button = document.getElementsByTagName("button");
let input = document.getElementsByTagName("input");
let blockquote = document.getElementsByTagName("blockquote");
let canvas = document.getElementsByTagName("canvas");
let footer = document.getElementsByTagName("footer");
let header = document.getElementsByTagName("header");
let select = document.getElementsByTagName("select");
let option = document.getElementsByTagName("option");
let center = document.getElementsByTagName("center");
let fonts = [
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  a,
  td,
  nobr,
  div,
  cite,
  span,
  button,
  input
];
let backgrounds = [
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  a,
  table,
  tr,
  td,
  nobr,
  div,
  cite,
  span,
  img,
  button,
  input,
  blockquote,
  canvas,
  footer,
  header,
  select,
  option,
  center
];

/* Options Variables */
let options;

/* Gif Variables */
let gifs = []; // Empty array for storing random gifs later
let response = 0; // Stores the response from the URL

/* On Page Load */

$(function() {
  /* Options Getter */
  chrome.storage.sync.get(
    [
      "fontEnabled",
      "fontColorEnabled",
      "spinEnabled",
      "gifEnabled",
      "backgroundEnabled",
      "gifTag",
      "enabled"
    ],
    _options => {
      options = _options;
      if (options.enabled) {
        // If enabled

        if (options.fontEnabled) {
          // If fonts are enabled
          runFont(); // Start font intervals
          setInterval(function() {
            runFont();
          }, 100);
        }

        if (options.fontColorEnabled) {
          // If font colors are enabled
          fontColorSetup(); // Setup font colors
          runFontColor(); // Start font color intervals
          setInterval(function() {
            runFontColor();
          }, 100);
        }

        if (options.spinEnabled) {
          for (let i = 0; i < fonts.length - 6; i++) {
            runSpin(fonts[i]);
          }
        }

        if (options.gifEnabled) {
          // If gifs are enabled
          $.getJSON(
            `https://api.giphy.com/v1/gifs/search?q=${
              options.gifTag
            }&api_key=NChfgHwB35TjflSoAYO3NY1O8u21pJKI&limit=100`,
            function(data) {
              // Get the data from the url
              response = data; // Make the data global
              // Make an array of all the gif URLs returned
              for (let i = 0; i < response.data.length; i++) {
                gifs[i] =
                  "https://i.giphy.com/media/" +
                  response.data[i].id +
                  "/giphy.webp";
              }
              runGif(); // Set all gifs
            }
          ).fail(function(d) {
            gifs[0] = "https://nrdesign.xyz/comicsams/backupGif.webp";
            runGif(); // Set all gifs
          });
        }

        if (options.backgroundEnabled) {
          // If background is enabled
          backgroundColorSetup();
          for (i = 0; i < backgrounds.length; i++) {
            runBackground(backgrounds[i]);
          }
          setInterval(function() {
            // Start background intervals
            document.querySelector("body").style.background = randomColor();
          }, 100);
        }
      }
    }
  );
});

/* Font Function */

function runFont() {
  // Adds css for spinnning
  let css =
      "#spinning { animation-name: spinner; animation-timing-function: linear; animation-iteration-count: infinite; animation-duration: 5s; transform-style: preserve-3d; } @keyframes spinner { from { transform: rotateY(0deg); } to { transform: rotateY(-360deg); } }",
    head = document.head || document.getElementsByTagName("head")[0],
    style = document.createElement("style");
  style.type = "text/css";
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  head.appendChild(style);

  // Runs fonts for each HTML element
  for (let i = 0; i < fonts.length; i++) {
    for (let j = 0; j < fonts[i].length; j++) {
      // For each text element
      fonts[i][j].style.fontFamily = "Comic Sans MS, cursive, sans-serif"; // Replace the font
    }
  }
}

/* Font Color Function*/

function runFontColor() {
  // Runs font colors for each HTML element
  for (let i = 0; i < fonts.length; i++) {
    for (let j = 0; j < fonts[i].length; j++) {
      // For each text element
      fonts[i][j].style.color = randomColor(); // Give it a random color
    }
  }
}

function fontColorSetup() {
  for (let i = 0, l = fonts.length; i < l; i++) {
    for (let j = 0, m = fonts[i].length; j < m; j++) {
      fonts[i][j].style.transition = "color 0.2s ease";
    }
  }
}

function runSpin(text) {
  for (let i = 0; i < text.length; i++) {
    // For each text element
    text[i].style.display = "block"; // Make sure that it is block so it can be transformed
    text[i].style.transformOrigin = "50% 0";
    text[i].setAttribute("id", "spinning"); // Assign the spin ID to it
  }
}

function runGif() {
  for (let i = 0, l = img.length; i < l; i++) {
    //  For each image
    img[i].srcset = "";
    img[i].src = randomGif(); // Replace it with a random gif
  }
}

function backgroundColorSetup() {
  for (let i = 0; i < backgrounds.length; i++) {
    for (let j = 0; j < backgrounds[i].length; j++) {
      backgrounds[i][j].style.transition = "background-color 0.2s ease";
    }
  }
}

function runBackground(elem) {
  setInterval(function() {
    // Start intervals
    for (i = 0, l = elem.length; i < l; i++) {
      // For each element
      elem[i].style.backgroundColor = randomColor(); // Give it a random background color
    }
  }, 100);
}

function randomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16); // Generate random color code
}

function randomGif() {
  let g = Math.floor(Math.random() * gifs.length - 1);
  if (g < 0) g = 0;
  return gifs[g]; // Find  a random gif
}
