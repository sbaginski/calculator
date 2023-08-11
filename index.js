// Operation functions

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

// Operate function

function operate(operation, rightOperand, leftOperand) {
  switch (operation) {
    case "add":
      return add(rightOperand, leftOperand);
    case "subtract":
      return subtract(rightOperand, leftOperand);
    case "multiply":
      return multiply(rightOperand, leftOperand);
    case "divide":
      return divide(rightOperand, leftOperand);
  }
}

// Helper functions

function blink(setValue) {
  const displayBox = document.querySelector("#display-value");
  displayBox.style.visibility = "hidden";
  return new Promise((resolve) => {
    setTimeout(() => {
      display(setValue);
      try {
        roundNumber();
      } finally {}
      displayBox.style.visibility = "visible";
      resolve();
    }, 75);
  });
}

function countDecimals(number) {
  if (Math.floor(number.valueOf()) === number.valueOf()) {
    return 0;
  }

  let str = number.toString();
  if (str.indexOf(".") !== -1 && str.indexOf("-") !== -1) {
    return str.split("-")[1] || 0;
  } else if (str.indexOf(".") !== -1) {
    return str.split(".")[1].length || 0;
  }
  return str.split("-")[1] || 0;
}

function display(value) {
  const displayBox = document.querySelector("#display-value");
  displayBox.textContent = value;
}

function getDisplayValue() {
  const displayBox = document.querySelector("#display-value");
  return displayBox.textContent;
}

function isOverflown(element) {
  return element.scrollHeight > element.clientHeight 
        || element.scrollWidth > element.clientWidth;
}

function roundNumber() {
  const displayBox = document.querySelector("#display-value");
  let n = countDecimals(+displayBox.textContent);
  
  while (isOverflown(displayBox)) {
    n--;
    display(Math.round(10**n * +displayBox.textContent) / 10**n);
  }
}

// Main code

(function() {
  const numberButtons = document.querySelectorAll(".key.number");
  const operationButtons = document.querySelectorAll(".key.operation");
  const clearButton = document.querySelector("#clear");
  const deleteButton = document.querySelector("#delete");

  let displayValue = getDisplayValue();
  let evaluated = false;
  let operator = "";
  let firstNumber;
  let secondNumber;
  
  numberButtons.forEach((button) => {
    if (button.id === "decimal") {
      button.addEventListener("click", () => {
        if (!displayValue.includes(".")) {
          displayValue += ".";
          display(displayValue);
          clearButton.textContent = "C";
        }
      });
    } else {
      button.addEventListener("click", () => {
        if (displayValue === "0" || evaluated) {
          displayValue = button.textContent;
          evaluated = false;
        } else {
          displayValue += button.textContent;
        }
        display(displayValue);
        clearButton.textContent = "C";
      });
    }
  });

  operationButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      if (operator === "") {
        firstNumber = +displayValue;
        await blink(displayValue);
      } else {
        secondNumber = +displayValue;
        try {
          await blink(operate(operator, firstNumber, secondNumber));
          displayValue = getDisplayValue();
          firstNumber = +displayValue;
        } catch (error) {
          await blink("Not a number");
          firstNumber = displayValue;
        }
      }
      if (button.id === "equals") {
        operator = "";
      } else {
        operator = button.id;
      }
      evaluated = true;
    });
  });

  clearButton.addEventListener("click", async () => {
    await blink("0");
    displayValue = getDisplayValue();
    evaluated = false;
    operator = "";
    firstNumber = null;
    secondNumber = null;
    clearButton.textContent = "AC";
  });

  deleteButton.addEventListener("click", () => {
    if (displayValue === "0" || evaluated) {
      return;
    }
    displayValue = displayValue.length === 1 ? "0" : displayValue.slice(0, -1);
    display(displayValue);
  });
})();