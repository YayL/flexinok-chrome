chrome.runtime.sendMessage(document.currentScript.getAttribute("flexienokId"), {
  auth: JSON.parse(localStorage["oidc.user:https://konto.nok.se:matematik.nokportalen.se"])["id_token"],
});
