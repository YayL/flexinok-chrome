# Flexienok-Chrome

Flexienok for NOKflex in a Chrome extension

Inspired by the original [Flexienok](https://github.com/flexienok/flexienok)

## Getting Started

### Installation

NOTE: The extension is in the process of being uploaded to the Chrome Web Store, but until then this is the only way to install it.

To start off you can either clone the repository or download a release, both installation processes are exactly the same. The difference is that releases are more stable, but slightly behind development versions.

If you downloaded a zip file, then extract it somewhere. Remember to never delete that folder as it is your local copy of the extension used by Chromium.

Open the extension page in the browser, usually `chrome://extensions`. Make sure developer mode is enabled, click `Load unpacked` or an equivalent function in your preferred browser, then select the unpacked extension folder.

Congratulations, you've installed Flexienok for Chrome.

### Usage

Currently the extension is in a very early state so it's a bit rough around the edges. When you're logged into *NOKflex*, or just on any site with the domain `nokflex.nok.se` the extension icon in the top right should be colored. If you press that button the extension will fetch the answers to the current question. Other than the answer there are a couple more messages that can display:

* `No assignment` - This appears if you're on any part of the website without questions.
* `No answers` - This appears when the API doesn't return any answers.

### Commmon issues

Sometimes the message `No answers` appears when the *NOKflex* page is first loaded. It can be fixed by reloading the site and switching to another part of the site, such as the assignment list, and pressing the extension button. Then the cache will be cleared and the extension will fetch the correct answers.

## Authors

* [Simsva](https://github.com/Simsva) - *Wrote all the code*

## License

This project is licensed under the GNU GPLv3 License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgements

* Inspired by the original [Flexienok](https://github.com/flexienok/flexienok)
* Thanks to anyone whose Stack Overflow answers were used
