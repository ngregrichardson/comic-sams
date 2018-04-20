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
var gifs = ["https://i.imgur.com/a7ePlJ1.gif", "https://i.imgur.com/Bf4KXZM.gif", "https://i.imgur.com/Ng0eD79.gif", "https://i.imgur.com/CwQYMZo.gif", "https://i.imgur.com/SNB8kiM.gif", "https://i.imgur.com/0lvAY7w.gif", "https://i.imgur.com/mxR7PJk.gif", "https://i.giphy.com/media/KqzoMxBSJwUdG/giphy.webp", "https://i.giphy.com/media/v4f7aVLX1EoAU/giphy.webp", "https://i.giphy.com/media/QjSoXOQIcEXBu/giphy.webp", "https://media3.giphy.com/media/mtaWx98w7mX7y/200w.webp", "https://i.giphy.com/media/RbE9Wj1DX19hS/200w.webp", "https://i.giphy.com/media/BcZZaMtMBmakw/200w.webp", "https://media3.giphy.com/media/zNkt0TcuakSuA/200w.webp", "https://i.giphy.com/media/XabhIre57HUM8/200w.webp", "https://media1.giphy.com/media/4tITB4dfHrOgw/giphy.gif"];
var fontStatus;
var fontColorStatus;
var nyanStatus;
var backgroundStatus;

chrome.storage.sync.get(['fontStatus', 'fontColorStatus', 'nyanStatus', 'backgroundStatus'], function(status) {
  fontStatus = status.fontStatus;
  fontColorStatus = status.fontColorStatus;
  nyanStatus = status.nyanStatus;
  backgroundStatus = status.backgroundStatus;
  console.log("font status is " + fontStatus);
});

$(function() {
  run();
  setInterval(function() {
    run();
  }, 1000);

  if (backgroundStatus == true) {

    for (i = 0, l = div.length; i < l; i++) {
      if (div[i].className.includes("container") || div[i].className.includes("content")) {
        runDiv(i);
      }
    }

    for (i = 0, l = button.length; i < l; i++) {
      runButton(i);
    }

    setInterval(function() {
      document.querySelector('body').style.background = randomColors();
    }, 100);
  }

});

function randomColors() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function randomGif() {
  return gifs[Math.floor(Math.random() * gifs.length)];
}

function runDiv(i) {
  setInterval(function() {
    div[i].style.backgroundColor = randomColors();
  }, 100);
}

function runButton(i) {
  setInterval(function() {
    button[i].style.backgroundColor = randomColors();
  }, 100);
}

function run() {
  if (fontStatus) {
    for (var i = 0, l = p.length; i < l; i++) {
      p[i].style.fontFamily = "Comic Sans MS, cursive, sans-serif";
    }

    for (var i = 0, l = h1.length; i < l; i++) {
      h1[i].style.fontFamily = "Comic Sans MS, cursive, sans-serif";
    }

    for (var i = 0, l = h2.length; i < l; i++) {
      h2[i].style.fontFamily = "Comic Sans MS, cursive, sans-serif";
    }

    for (var i = 0, l = h3.length; i < l; i++) {
      h3[i].style.fontFamily = "Comic Sans MS, cursive, sans-serif";
    }

    for (var i = 0, l = h4.length; i < l; i++) {
      h4[i].style.fontFamily = "Comic Sans MS, cursive, sans-serif";
    }

    for (var i = 0, l = h5.length; i < l; i++) {
      h5[i].style.fontFamily = "Comic Sans MS, cursive, sans-serif";
    }

    for (var i = 0, l = h6.length; i < l; i++) {
      h6[i].style.fontFamily = "Comic Sans MS, cursive, sans-serif";
    }

    for (var i = 0, l = a.length; i < l; i++) {
      a[i].style.fontFamily = "Comic Sans MS, cursive, sans-serif";
    }

    for (var i = 0, l = td.length; i < l; i++) {
      td[i].style.fontFamily = "Comic Sans MS, cursive, sans-serif";
    }

    for (var i = 0, l = nobr.length; i < l; i++) {
      nobr[i].style.fontFamily = "Comic Sans MS, cursive, sans-serif";
    }

    for (var i = 0, l = div.length; i < l; i++) {
      div[i].style.fontFamily = "Comic Sans MS, cursive, sans-serif";
    }

    for (var i = 0, l = cite.length; i < l; i++) {
      cite[i].style.fontFamily = "Comic Sans MS, cursive, sans-serif";
    }

    for (var i = 0, l = span.length; i < l; i++) {
      span[i].style.fontFamily = "Comic Sans MS, cursive, sans-serif";
    }

    for (var i = 0, l = button.length; i < l; i++) {
      button[i].style.fontFamily = "Comic Sans MS, cursive, sans-serif";
    }
  }

  if (fontColorStatus == true) {
    for (var i = 0, l = p.length; i < l; i++) {
      p[i].style.color = randomColors();
    }

    for (var i = 0, l = h1.length; i < l; i++) {
      h1[i].style.color = randomColors();
    }

    for (var i = 0, l = h2.length; i < l; i++) {
      h2[i].style.color = randomColors();
    }

    for (var i = 0, l = h3.length; i < l; i++) {
      h3[i].style.color = randomColors();
    }

    for (var i = 0, l = h4.length; i < l; i++) {
      h4[i].style.color = randomColors();
    }

    for (var i = 0, l = h5.length; i < l; i++) {
      h5[i].style.color = randomColors();
    }

    for (var i = 0, l = h6.length; i < l; i++) {
      h6[i].style.color = randomColors();
    }

    for (var i = 0, l = a.length; i < l; i++) {
      a[i].style.color = randomColors();
    }

    for (var i = 0, l = td.length; i < l; i++) {
      td[i].style.color = randomColors();
    }

    for (var i = 0, l = nobr.length; i < l; i++) {
      nobr[i].style.color = randomColors();
    }

    for (var i = 0, l = div.length; i < l; i++) {
      div[i].style.color = randomColors();
    }

    for (var i = 0, l = cite.length; i < l; i++) {
      cite[i].style.color = randomColors();
    }

    for (var i = 0, l = span.length; i < l; i++) {
      span[i].style.color = randomColors();
    }

    for (var i = 0, l = button.length; i < l; i++) {
      button[i].style.color = randomColors();
    }
  }

  if (nyanStatus == true) {
    for (var i = 0, l = img.length; i < l; i++) {
      img[i].src = randomGif();
    }
  }
}
