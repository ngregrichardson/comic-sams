chrome.runtime.onInstalled.addListener(function(object) {
  chrome.tabs.create({
    url: chrome.extension.getURL("options.html") // Open options window on install
  }, function(tab) {});
});
