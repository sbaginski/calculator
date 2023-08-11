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

(function() {
  let firstNumber;
  let secondNumber;
  let operator;
})();