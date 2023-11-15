"use strict";

chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "matematik.nokportalen.se", schemes: ["https"] },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});

let options = { url: [{ hostContains: "matematik.nokportalen.se" }] };
chrome.webNavigation.onCompleted.addListener((details) => {
  // Prevent code from running multiple times in subframes
  // Doesn't appear to work tho
  if (details.frameId == 0) {
    // Dosn't work, using script tag attributes instead
    // AKA jank
    /*chrome.tabs.executeScript(details.tabId, {
      code: "var flexienokId = 'test'", // + JSON.stringify(chrome.runtime.id),
    });*/

    chrome.tabs.executeScript(details.tabId, {
      file: "js/injectGetToken.js",
    });
  }
}, options);

chrome.runtime.onMessageExternal.addListener((request, sendResponse) => {
  localStorage.setItem("authToken", request.auth);
});
