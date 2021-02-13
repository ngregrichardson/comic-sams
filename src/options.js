let defaults = {
  fontEnabled: true,
  fontColorEnabled: true,
  spinEnabled: true,
  gifEnabled: true,
  backgroundEnabled: true,
  gifTag: "nyan+cat",
  enabled: true
};

$(function() {
  setInterval(function() {
    document.querySelector("body").style.background = randomColor();
  }, 1000);
  $("#footer-copy").html(`&copy; Noah Richardson ${new Date().getFullYear()}`);
  chrome.storage.sync.get("startup", function(data) {
    if (data.startup == undefined) {
      chrome.storage.sync.set({
        startup: true
      });
      chrome.storage.sync.set(defaults);
      alert(
        "WARNING: This extension may potentially trigger seizures for people with photosensitive epilepsy. User discretion is advised."
      );
    } else {
      chrome.storage.sync.set({
        startup: false
      });
    }
  });

  let loadSettings = () => {
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
      options => {
        if (options.enabled == true || options.enabled == undefined) {
          $("#enableButton").val("Disable");
        } else {
          $("#enableButton").val("Enable");
        }
        $("#font").prop("checked", options.fontEnabled);
        $("#fontColor").prop("checked", options.fontColorEnabled);
        $("#spin").prop("checked", options.spinEnabled);
        $("#gif").prop("checked", options.gifEnabled);
        $("#background").prop("checked", options.backgroundEnabled);
        if (options.gifTag == undefined) {
          $("#gifTag").val(defaults.gifTag.replace("+", " "));
        } else {
          $("#gifTag").val(options.gifTag.replace("+", " "));
        }
      }
    );
  };

  let reloadPage = () => {
    chrome.tabs.query(
      {
        highlighted: true,
        currentWindow: true
      },
      function(tabs) {
        if (!tabs[0].url.includes("chrome-extension://")) {
          chrome.tabs.reload(tabs[0].id);
        }
      }
    );
  };

  loadSettings();

  $("#font").on("change", e => {
    chrome.storage.sync.set({ fontEnabled: e.target.checked });
    $("#submitStatus").text(
      `Fonts ${e.target.checked ? "enabled!" : "disabled"}`
    );
    if ($("#enableButton").val() === "Disable") reloadPage();
  });
  $("#fontColor").on("change", e => {
    chrome.storage.sync.set({ fontColorEnabled: e.target.checked });
    $("#submitStatus").text(
      `Font colors ${e.target.checked ? "enabled!" : "disabled"}`
    );
    if ($("#enableButton").val() === "Disable") reloadPage();
  });
  $("#spin").on("change", e => {
    chrome.storage.sync.set({ spinEnabled: e.target.checked });
    $("#submitStatus").text(
      `Spinning ${e.target.checked ? "enabled!" : "disabled"}`
    );
    if ($("#enableButton").val() === "Disable") reloadPage();
  });
  $("#gif").on("change", e => {
    chrome.storage.sync.set({ gifEnabled: e.target.checked });
    $("#submitStatus").text(
      `Gifs ${e.target.checked ? "enabled!" : "disabled"}`
    );
    if ($("#enableButton").val() === "Disable") reloadPage();
  });
  $("#background").on("change", e => {
    chrome.storage.sync.set({
      backgroundEnabled: e.target.checked
    });
    $("#submitStatus").text(
      `Background colors ${e.target.checked ? "enabled!" : "disabled"}`
    );
    if ($("#enableButton").val() === "Disable") reloadPage();
  });
  $("#gifTag").on("change", e => {
    chrome.storage.sync.set({
      gifTag: e.target.value.replace(" ", "+")
    });
    $("#submitStatus").text(`${e.target.value} gifs enabled!`);
    if ($("#enableButton").val() === "Disable") reloadPage();
  });

  $("#resetButton").click(function() {
    chrome.storage.sync.set(defaults);
    loadSettings();
    $("#submitStatus").text(`Default settings restored!`);
    if ($("#enableButton").val() === "Disable") reloadPage();
  });

  $("#enableButton").click(function() {
    chrome.storage.sync.get("enabled", function({ enabled }) {
      if (enabled === true) {
        chrome.storage.sync.set({
          enabled: !enabled
        });

        $("#enableButton").val("Enable");
        $("#submitStatus").text("Disabled :(");
        reloadPage();
      } else {
        chrome.storage.sync.set({
          fontEnabled: $("#font").prop("checked"),
          fontColorEnabled: $("#fontColor").prop("checked"),
          spinEnabled: $("#spin").prop("checked"),
          gifEnabled: $("#gif").prop("checked"),
          backgroundEnabled: $("#background").prop("checked"),
          gifTag: $("#searchTag").val(),
          enabled: !enabled
        });

        $("#enableButton").val("Disable");
        $("#submitStatus").text("Enabled!");
        reloadPage();
      }
    });
  });
});

function randomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16); // Generate random color code
}
