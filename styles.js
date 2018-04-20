$(function() {
  setInterval(function() {
    document.querySelector('body').style.background = randomColors();
  }, 500);
});

function randomColors() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}
