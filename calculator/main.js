class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = null;
  }

  delete() {
    if (this.currentOperand != "")
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
    else {
      this.currentOperand = this.previousOperand;
      this.previousOperand = "";
      this.operation = null;
    }
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.toString().includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "" && this.previousOperand !== "")
      this.operation = operation;
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") this.calculate();
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  calculate() {
    let result;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        result = prev + current;
        break;
      case "-":
        result = prev - current;
        break;
      case "*":
        result = prev * current;
        break;
      case "/":
        result = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = result;
    this.operation = null;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integers = parseFloat(stringNumber.split(".")[0]);
    const decimals = stringNumber.split(".")[1];
    let integerDisplay;

    if (isNaN(integers)) integerDisplay = "";
    else integerDisplay = integers.toString();
    if (decimals != null) return `${integerDisplay}.${decimals}`;
    else return integerDisplay;
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operation");
const equalsButton = document.querySelector("#equals");
const deleteButton = document.querySelector("#delete");
const allClearButton = document.querySelector("#all-clear");
const previousOperandTextElement = document.querySelector("#previous-operand");
const currentOperandTextElement = document.querySelector("#current-operand");

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", () => {
  calculator.calculate();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

const numberKeys = [".", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operationKeys = ["+", "-", "*", "/"];
const actionKeys = ["Enter", "Backspace", "Escape"];

window.addEventListener("keydown", (event) => {
  const key = event.key.toString();

  if (numberKeys.includes(key)) calculator.appendNumber(key);
  if (operationKeys.includes(key)) calculator.chooseOperation(key);
  if (key == actionKeys[0]) calculator.calculate();
  if (key == actionKeys[1]) calculator.delete();
  if (key == actionKeys[2]) calculator.clear();
  if (
    numberKeys.includes(key) ||
    operationKeys.includes(key) ||
    actionKeys.includes(key)
  )
    calculator.updateDisplay();
});
