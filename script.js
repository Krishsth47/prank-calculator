/*
1. press button, display number to the screen in order from left to right.
2. press = to show the total result
3. press AC, clear the screen
4. Press C, delete the last number/character

*/

const buttons = document.querySelectorAll("button");
const displayElement = document.querySelector("#result");

let textToDisplay = "";
const symbols = ["/", "*", "-", "+"];

console.log(textToDisplay);

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    displayElement.style.background = "";
    displayElement.style.color = "";

    const val = btn.innerText;

    if (textToDisplay.length < 1 && symbols.includes(val)) return;

    if (
      symbols.includes(val) &&
      symbols.includes(textToDisplay[textToDisplay.length - 1])
    ) {
      textToDisplay = textToDisplay.slice(0, -1) + val;
      return display(textToDisplay);
    }
    if (val === "=") {
      // when = is clicked
      if (!textToDisplay.length) return;

      if (symbols.includes(textToDisplay[textToDisplay.length - 1])) {
        textToDisplay = textToDisplay.slice(0, -1);
      }
      return onTotal();
    }
    if (val === "AC") {
      resetDisplay();
      return;
    }
    if (val === "C") {
      //   if (textToDisplay.length < 1) return;

      textToDisplay = textToDisplay.slice(0, -1);
      return display(textToDisplay);
    }

    //limiting to press . to one time only
    if (val === "." && textToDisplay.includes(".")) return;
    textToDisplay = textToDisplay + val;
    display(textToDisplay);
  });
});

//show clicked button to the screen
const display = (toDisplay) => {
  displayElement.innerText = toDisplay || "0.0";
};

//calculate total value
const onTotal = () => {
  const randVal = randomNumber();

  if (randVal > 0) {
    displayElement.style.background = "red";
    displayElement.style.color = "white";
    displayElement.classList.add("prank");
    displayElement.addEventListener("animationend", () => {
      displayElement.classList.remove("prank");
    });
  }

  const total = eval(textToDisplay) + randVal;
  display(total);
  textToDisplay = "";
};

//reset the display area

const resetDisplay = () => {
  display("0.0");
  textToDisplay = "";
};

const randomNumber = () => {
  const val = Math.floor(Math.random() * 10);
  return val < 3 ? val : 0;
};
