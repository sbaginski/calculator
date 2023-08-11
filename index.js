function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by 0!");
  }
  return a / b;
}

function operate(operator, rightOperand, leftOperand) {
  switch (operator) {
    case "+":
      return add(rightOperand, leftOperand);
    case "-":
      return subtract(rightOperand, leftOperand);
    case "*":
      return multiply(rightOperand, leftOperand);
    case "/":
      return divide(rightOperand, leftOperand);
  }
}

function display(value) {
  const displayBox = document.querySelector("#display-value");
  displayBox.textContent = value;
}

(function() {
  const numberButtons = document.querySelectorAll(".key.number");
  const operationButtons = document.querySelectorAll(".key.operation");
  const clearButton = document.querySelector("#clear");

  let displayValue = document.querySelector("#display-value").textContent;
  let firstNumber;
  let secondNumber;
  let operator;
  
  numberButtons.forEach((button) => {
    if (button.id === "decimal") {
      console.log(button.id);
      button.addEventListener("click", () => {
        if (!displayValue.includes(".")) {
          displayValue += ".";
          display(displayValue);
          clearButton.textContent = "C";
        }
      });
    } else {
      button.addEventListener("click", () => {
        switch (displayValue) {
          case "0":
            displayValue = button.textContent;
            break;
          default:
            displayValue += button.textContent;
            break;
        }
        display(displayValue);
        clearButton.textContent = "C";
      });
    }
  });
})();