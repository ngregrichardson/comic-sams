 var defaultFontStatus = true;
 var defaultFontColorStatus = true;
 var defaultNyanStatus = true;
 var defaultBackgroundStatus = false;
 var defaultSearchVal = "Nyan Cat";
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

   chrome.storage.sync.get(['fontStatus', 'fontColorStatus', 'nyanStatus', 'backgroundStatus', 'searchTag', 'state'], function(status) {
     if (status.state == true || status.state == undefined) {
       $('#enableButton').val('Disable');
     } else {
       $('#enableButton').val('Enable');
     }
     $('#font').prop("checked", status.fontStatus);
     $('#fontColor').prop("checked", status.fontColorStatus);
     $('#nyan').prop("checked", status.nyanStatus);
     if (status.backgroundStatus == undefined) {
       $('#background').prop("checked", defaultBackgroundStatus);
     } else {
       $('#background').prop("checked", status.backgroundStatus);
     }
     if (status.searchTag == undefined) {
       $('#searchTag').val(defaultSearchVal);
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
         var nyanStatus = $('#nyan').prop("checked");
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

         if (nyanStatus == undefined) {
           chrome.storage.sync.set({
             'nyanStatus': defaultNyanStatus
           });
         } else {
           chrome.storage.sync.set({
             'nyanStatus': nyanStatus
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
         chrome.tabs.reload();
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
           'nyanStatus': defaultNyanStatus
         });
         chrome.storage.sync.set({
           'backgroundStatus': defaultBackgroundStatus
         });
         chrome.storage.sync.set({
           'searchTag': defaultSearchTag
         });

         chrome.storage.sync.get(['fontStatus', 'fontColorStatus', 'nyanStatus', 'searchTag', 'backgroundStatus'], function(status) {
           $('#font').prop("checked", status.fontStatus);
           $('#fontColor').prop("checked", status.fontColorStatus);
           $('#nyan').prop("checked", status.nyanStatus);
           $('#background').prop("checked", status.backgroundStatus);
           $('#searchTag').val(status.searchTag);
         });

         $('#submitStatus').text('Changes saved!');
         chrome.tabs.reload();
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

         $('#searchTag').css("opacity", "0.5");
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
           'searchTag': $('#searchTag').val()
         });

         chrome.storage.sync.set({
           'state': defaultState
         });

         $('#searchTag').css("opacity", "1");
         $('#enableButton').val('Disable');
         $('#submitStatus').text('Enabled!');
         chrome.tabs.reload();
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
     'nyanStatus': defaultNyanStatus
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