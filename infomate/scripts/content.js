let body = document.querySelector("body");

let displayBtn = document.createElement("button");
displayBtn.setAttribute("id", "displayBtn");
displayBtn.addEventListener("click", doSomething);
body.appendChild(displayBtn);

let speechRecognition = new webkitSpeechRecognition();
speechRecognition.continuous = true;
speechRecognition.interimResults = true;
speechRecognition.lang = "en-in";

let transcript = "";
speechRecognition.onresult = function (event) {
  transcript = "";
  for (let i = 0; i < event.results.length; ++i) {
    transcript += event.results[i][0].transcript;
  }
};

function handleKbd(event) {
  if (event.shiftkey && event.altkey && event.code === "keyQ") {
    displayBtn.click();
  }
}

document.addEventListener("keypress", handleKbd);

//  click => starts listening, again click => stops listening
function doSomething() {
  if (displayBtn.hasAttribute("listening") === false) {
    displayBtn.setAttribute("listening", true);
    speechRecognition.start();
  } else {
    displayBtn.removeAttribute("listening");
    speechRecognition.stop();
    console.log(transcript);

    // const myPopup = new Popup({
    //   id: "my-popup",
    //   title: `<p>Here is what you just said</p>`,
    //   content: transcript.toLowerCase(),
    // });

    const myPopup = new Popup({
      id: "my-popup",
      title: `<p>Here's what you just said </p>`,
      content: transcript.toLowerCase(),
      sideMargin: "2.9vw",
      titleColor: "#A9A9A9",
      textColor: "#FFFFFF",
      backgroundColor: "#222",
      opacity: 0.5,
      closeColor: "#fff",
      fontSizeMultiplier: 1.0,
      linkColor: "#888",
    });
    myPopup.show();
  }
}
