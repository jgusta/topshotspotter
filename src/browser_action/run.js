function addElement(target, type, text) {
  const newElem = document.createElement(type);
  const newContent = document.createTextNode(text);
  newElem.appendChild(newContent);
  target.insertAdjacentElement("beforeend", newElem);
}

chrome.tabs.executeScript(
  {
    code: "(" + calculor + ")();",
    // file: "injection.js",
  },
  (stuff) => {
    let targ = document.getElementById("mainPopup");
    let results = stuff[0];
    for (const prop in results) {
      if (results.hasOwnProperty(prop)) {
        addElement(targ,"h2", `${prop}`);
        for (const el of results[prop]) {
          addElement(targ, "div",el);
        }
      }
    }
  }
);
