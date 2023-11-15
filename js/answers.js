function parseUrl(url) {
  const regex = /^https?:\/\/matematik.nokportalen.se\/([0-9]+)\/uppgift\/([0-9]+)$/;
  return url.match(regex);
}

function requestAnswers(course, assignment, authToken) {
  let = url = `https://api.matematik.nokportalen.se/api/v2/assignment/solution/${assignment}?courseId=${course}`;

  // TODO: handle errors
  // TODO: async
  let request = new XMLHttpRequest();
  request.open("GET", url, false);
  request.setRequestHeader("authorization", "Bearer " + authToken);
  request.send();
  return request.response;
}

// TODO: fix newline after subTask
// TODO: use sessionStorage instead
function parseAnswers(answersRaw) {
  let answers;
  try {
    answers = JSON.parse(answersRaw);
  } catch (err) {
    answers = answersRaw;
  }

  if (typeof answers == "string") {
    localStorage.setItem("lastAnswer", answers);
    document.getElementById("answers").innerHTML = answers;
  } else {
    localStorage.setItem("lastAnswer", JSON.stringify(answers));

    let list = document.createElement("ul");
    document.getElementById("answers").appendChild(list);

    for (let i = 0; i < answers.length; i++) {
      let item = document.createElement("li");
      //item.appendChild(document.createTextNode(answers[i]));
      item.innerHTML = answers[i];
      list.appendChild(item);
    }
  }
}

window.addEventListener("load", () => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    if (localStorage.getItem("lastUrl") === tabs[0].url) {
      parseAnswers(localStorage.getItem("lastAnswer"));
    } else {
      localStorage.setItem("lastUrl", tabs[0].url);

      let matches = parseUrl(tabs[0].url);
      if (matches == null) {
        parseAnswers("No assignment");
        return;
      }

      let answers = JSON.parse(
        requestAnswers(matches[1], matches[2], localStorage.getItem("authToken"))
      );
      console.log(answers);

      if (!answers.hasAnswer) {
        parseAnswers("No answers");
      } else {
        let solutions = [];
        if (answers.solution.length === 1) {
          solutions.push(answers.solution[0].answers);
        } else {
          for (let i = 0; i < answers.solution.length; i++) {
            solutions.push(
              `${answers.solution[i].subTask} ${answers.solution[i].answers}`
            );
          }
        }
        parseAnswers(solutions);
      }
    }
  });

  // I don't know why this is needed
  let el = document.createElement("script");
  el.src = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.0/es5/tex-mml-chtml.min.js";
  el.id = "MathJAx-script";
  el.async = true;
  document.head.appendChild(el);

  let el2 = document.createElement("script");
  el2.src = "https://cdnjs.cloudflare.com/ajax/libs/js-polyfills/0.1.43/polyfill.min.js";
  document.head.appendChild(el2);
});
