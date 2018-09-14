 var defaultFontStatus = true;
 var defaultFontColorStatus = true;
 var defaultSpinStatus = true;
 var defaultGifStatus = true;
 var defaultBackgroundStatus = true;
 var defaultSearchTag = "nyan+cat";
 var defaultState = true;
 var defaultStartup = true;
 var counter = 0;

 $(function() {
   chrome.storage.sync.get('startup', function(data) {
     if (data.startup == undefined) {
       chrome.storage.sync.set({
         'startup': defaultStartup
       });
       setDefaults();
     } else {
       chrome.storage.sync.set({
         'startup': false
       });
     }
   });

   chrome.storage.sync.get(['fontStatus', 'fontColorStatus', 'spinStatus', 'gifStatus', 'backgroundStatus', 'searchTag', 'state'], function(status) {
     if (status.state == true || status.state == undefined) {
       $('#enableButton').val('Disable');
     } else {
       $('#enableButton').val('Enable');
     }
     $('#font').prop("checked", status.fontStatus);
     $('#fontColor').prop("checked", status.fontColorStatus);
     $('#spin').prop("checked", status.spinStatus);
     $('#gif').prop("checked", status.gifStatus);
     if (status.backgroundStatus == undefined) {
       $('#background').prop("checked", defaultBackgroundStatus);
     } else {
       $('#background').prop("checked", status.backgroundStatus);
     }
     if (status.searchTag == undefined) {
       $('#searchTag').val(defaultSearchTag.replace("+", " "));
     } else {
       $('#searchTag').val(status.searchTag.replace("+", " "));
     }
   });

   $('#submitButton').click(function() {
     chrome.storage.sync.get('state', function(status) {
       if (status.state == true) {
         $('#submitStatus').text('Working...');

         var fontStatus = $('#font').prop("checked");
         var fontColorStatus = $('#fontColor').prop("checked");
         var spinStatus = $('#spin').prop("checked");
         var gifStatus = $('#gif').prop("checked");
         var backgroundStatus = $('#background').prop("checked");
         var searchTag = $('#searchTag').val().replace(" ", "+");

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

         if(spinStatus == undefined) {
           chrome.storage.sync.set({
             'spinStatus': defaultsSpinStatus
           });
         }else {
           chrome.storage.sync.set({
             'spinStatus': spinStatus
           });
         }

         if (gifStatus == undefined) {
           chrome.storage.sync.set({
             'gifStatus': defaultGifStatus
           });
         } else {
           chrome.storage.sync.set({
             'gifStatus': gifStatus
           });
         }

         if (searchTag == undefined) {
           chrome.storage.sync.set({
             'searchTag': defaultSearchTag
           });
         } else {
           chrome.storage.sync.set({
             'searchTag': searchTag
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
         chrome.tabs.query({
           "highlighted": true,
           "currentWindow": true
         }, function(tabs) {
           if (!tabs[0].url.includes("chrome-extension://")) {
             chrome.tabs.reload(tabs[0].id);
           }
         });
       } else {
         $('#submitStatus').text('Enable to change settings!');
       }
     });
   });

   $('#resetButton').click(function() {
     chrome.storage.sync.get('state', function(status) {
       if (status.state == true) {
         $('#submitStatus').text('Working...');

         chrome.storage.sync.set({
           'fontStatus': defaultFontStatus
         });
         chrome.storage.sync.set({
           'fontColorStatus': defaultFontColorStatus
         });
         chrome.storage.sync.set({
           'spinStatus': defaultSpinStatus
         });
         chrome.storage.sync.set({
           'gifStatus': defaultGifStatus
         });
         chrome.storage.sync.set({
           'backgroundStatus': defaultBackgroundStatus
         });
         chrome.storage.sync.set({
           'searchTag': defaultSearchTag
         });

         chrome.storage.sync.get(['fontStatus', 'fontColorStatus', 'spinStatus', 'gifStatus', 'searchTag', 'backgroundStatus'], function(status) {
           $('#font').prop("checked", status.fontStatus);
           $('#fontColor').prop("checked", status.fontColorStatus);
           $('#gif').prop("checked", status.gifStatus);
           $('#spin').prop("checked", status.spinStatus);
           $('#background').prop("checked", status.backgroundStatus);
           $('#searchTag').val(status.searchTag.replace("+", " "));
         });

         $('#submitStatus').text('Changes saved!');
         chrome.tabs.query({
           "highlighted": true,
           "currentWindow": true
         }, function(tabs) {
           if (!tabs[0].url.includes("chrome-extension://")) {
             chrome.tabs.reload(tabs[0].id);
           }
         });
       } else {
         $('#submitStatus').text('Enable to change settings!');
       }
     });
   });

   $('#enableButton').click(function() {
     chrome.storage.sync.get('state', function(state) {
       $('#submitStatus').text('Working...');
       if (state.state == true) {
         chrome.storage.sync.set({
           'state': !defaultState
         });

         $('#font').prop("disabled", true);
         $('#fontColor').prop("disabled", true);
         $('#gif').prop("disabled", true);
         $('#spin').prop("disabled", true);
         $('#background').prop("disabled", true);
         $('#searchTag').prop("disabled", true);
         $('#searchTag').css("opacity", "0.5");
         $('#enableButton').val('Enable');
         $('#submitStatus').text('Disabled :(');
         chrome.tabs.query({
           "highlighted": true,
           "currentWindow": true
         }, function(tabs) {
           if (!tabs[0].url.includes("chrome-extension://")) {
             chrome.tabs.reload(tabs[0].id);
           }
         });
       } else {
         chrome.storage.sync.set({
           'fontStatus': $('#font').prop("checked")
         });
         chrome.storage.sync.set({
           'fontColorStatus': $('#fontColor').prop("checked")
         });
         chrome.storage.sync.set({
           'gifStatus': $('#gif').prop("checked")
         });
         chrome.storage.sync.set({
           'backgroundStatus': $('#background').prop("checked")
         });
         chrome.storage.sync.set({
           'searchTag': $('#searchTag').val()
         });

         chrome.storage.sync.set({
           'state': defaultState
         });

         $('#font').prop("disabled", false);
         $('#fontColor').prop("disabled", false);
         $('#gif').prop("disabled", false);
         $('#spin').prop("disabled", false);
         $('#background').prop("disabled", false);
         $('#searchTag').prop("disabled", false);
         $('#searchTag').css("opacity", "1");
         $('#enableButton').val('Disable');
         $('#submitStatus').text('Enabled!');
         chrome.tabs.query({
           "highlighted": true,
           "currentWindow": true
         }, function(tabs) {
           if (!tabs[0].url.includes("chrome-extension://")) {
             chrome.tabs.reload(tabs[0].id);
           }
         });
       }
     });
   });
 });

 function setDefaults() {
   chrome.storage.sync.set({
     'fontStatus': defaultFontStatus
   });
   chrome.storage.sync.set({
     'fontColorStatus': defaultFontColorStatus
   });
   chrome.storage.sync.set({
     'gifStatus': defaultGifStatus
   });
   chrome.storage.sync.set({
     'spinStatus': defaultSpinStatus
   });
   chrome.storage.sync.set({
     'backgroundStatus': defaultBackgroundStatus
   });
   chrome.storage.sync.set({
     'searchTag': defaultSearchTag
   });
   chrome.storage.sync.set({
     'state': defaultState
   });
 }
