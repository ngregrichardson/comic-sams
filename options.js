var defaultFontStatus = true;
var defaultFontColorStatus = true;
var defaultNyanStatus = true;
var defaultBackgroundStatus = true;
var defaultState = true;
var counter = 0;

$(function() {
  counter++;
  if (counter <= 1) {
    chrome.storage.sync.set({
      'fontStatus': defaultFontStatus
    });
    chrome.storage.sync.set({
      'fontColorStatus': defaultFontColorStatus
    });
    chrome.storage.sync.set({
      'nyanStatus': defaultNyanStatus
    });
    chrome.storage.sync.set({
      'backgroundStatus': defaultBackgroundStatus
    });
    chrome.storage.sync.set({
      'state': defaultState
    });
  }

  chrome.storage.sync.get(['fontStatus', 'fontColorStatus', 'nyanStatus', 'backgroundStatus', 'state'], function(status) {
    $('#font').prop("checked", status.fontStatus);
    $('#fontColor').prop("checked", status.fontColorStatus);
    $('#nyan').prop("checked", status.nyanStatus);
    $('#background').prop("checked", status.backgroundStatus);
    if (status.state == true) {
      $('#enableButton').val('Disable');
    } else {
      $('#enableButton').val('Enable');
    }
  });

  $('#submitButton').click(function() {
    $('#submitStatus').text('Working...');

    var fontStatus = $('#font').prop("checked");
    var fontColorStatus = $('#fontColor').prop("checked");
    var nyanStatus = $('#nyan').prop("checked");
    var backgroundStatus = $('#background').prop("checked");

    if (fontStatus == undefined) {
      chrome.storage.sync.set({
        'fontStatus': defaultFontStatus
      });
    } else {
      chrome.storage.sync.set({
        'fontStatus': fontStatus
      });
    }

    if (fontColorStatus == undefined) {
      chrome.storage.sync.set({
        'fontColorStatus': defaultFontColorStatus
      });
    } else {
      chrome.storage.sync.set({
        'fontColorStatus': fontColorStatus
      });
    }

    if (nyanStatus == undefined) {
      chrome.storage.sync.set({
        'nyanStatus': defaultNyanStatus
      });
    } else {
      chrome.storage.sync.set({
        'nyanStatus': nyanStatus
      });
    }

    if (backgroundStatus == undefined) {
      chrome.storage.sync.set({
        'backgroundStatus': defaultBackgroundStatus
      });
    } else {
      chrome.storage.sync.set({
        'backgroundStatus': backgroundStatus
      });
    }

    $('#submitStatus').text('Changes saved!');

    chrome.tabs.reload();
  });

  $('#resetButton').click(function() {
    $('#submitStatus').text('Working...');

    chrome.storage.sync.set({
      'fontStatus': defaultFontStatus
    });
    chrome.storage.sync.set({
      'fontColorStatus': defaultFontColorStatus
    });
    chrome.storage.sync.set({
      'nyanStatus': defaultNyanStatus
    });
    chrome.storage.sync.set({
      'backgroundStatus': defaultBackgroundStatus
    });

    chrome.storage.sync.get(['fontStatus', 'fontColorStatus', 'nyanStatus', 'backgroundStatus'], function(status) {
      $('#font').prop("checked", status.fontStatus);
      $('#fontColor').prop("checked", status.fontColorStatus);
      $('#nyan').prop("checked", status.nyanStatus);
      $('#background').prop("checked", status.backgroundStatus);
    });

    $('#submitStatus').text('Changes saved!');
    chrome.tabs.reload();
  });

  $('#enableButton').click(function() {
    $('#submitStatus').text('Working...');

    chrome.storage.sync.get('state', function(state) {
      if (state.state == true) {
        chrome.storage.sync.set({
          'fontStatus': !defaultFontStatus
        });
        chrome.storage.sync.set({
          'fontColorStatus': !defaultFontColorStatus
        });
        chrome.storage.sync.set({
          'nyanStatus': !defaultNyanStatus
        });
        chrome.storage.sync.set({
          'backgroundStatus': !defaultBackgroundStatus
        });

        chrome.storage.sync.set({
          'state': !defaultState
        });

        $('#enableButton').val('Enable');
        $('#submitStatus').text('Disabled :(');
        chrome.tabs.reload();
      } else {
        chrome.storage.sync.set({
          'fontStatus': $('#font').prop("checked")
        });
        chrome.storage.sync.set({
          'fontColorStatus': $('#fontColor').prop("checked")
        });
        chrome.storage.sync.set({
          'nyanStatus': $('#nyan').prop("checked")
        });
        chrome.storage.sync.set({
          'backgroundStatus': $('#background').prop("checked")
        });

        chrome.storage.sync.set({
          'state': defaultState
        });

        $('#enableButton').val('Disable');
        $('#submitStatus').text('Enabled!');
        chrome.tabs.reload();
      }
    });
  });
});
