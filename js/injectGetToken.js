var sGetToken = document.createElement("script");
sGetToken.src = chrome.extension.getURL("js/getToken.js");
sGetToken.setAttribute("flexienokId", chrome.runtime.id);
sGetToken.onload = function () {
  this.remove();
};
(document.head || document.documentElement).prepend(sGetToken);
