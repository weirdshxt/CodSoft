class Calculator {
  constructor(displayElement) {
    this.displayElement = displayElement;
    this.clear();
    this.bindEvents();
  }

  clear() {
    this.currentOperand = "0";
    this.previousOperand = "";
    this.operation = null;
    this.updateDisplay();
  }

  appendNumber(number) {
    if (this.currentOperand === "0" && number !== ".") {
      this.currentOperand = number;
    } else {
      if (number === "." && this.currentOperand.includes(".")) return;
      this.currentOperand += number;
    }
    this.updateDisplay();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "0") return;

    if (this.previousOperand !== "") {
      this.compute();
    }

    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "0";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        if (current === 0) {
          this.currentOperand = "Error";
          this.updateDisplay();
          return;
        }
        break;
      case "%":
        computation = prev % current;
        break;
      default:
        return;
    }

    this.currentOperand = computation.toString();
    this.operation = null;
    this.previousOperand = "";
    this.updateDisplay();
  }

  updateDisplay() {
    this.displayElement.textContent = this.currentOperand;
  }

  backspace() {
    if (this.currentOperand.length > 1) {
      this.currentOperand = this.currentOperand.slice(0, -1);
    } else {
      this.currentOperand = "0";
    }
    this.updateDisplay();
  }

  toggleNegative() {
    if (this.currentOperand !== "0") {
      this.currentOperand = this.currentOperand.startsWith("-")
        ? this.currentOperand.slice(1)
        : `-${this.currentOperand}`;
      this.updateDisplay();
    }
  }

  bindEvents() {
    document.querySelectorAll(".btn").forEach((button) => {
      button.addEventListener("click", () => {
        const value = button.dataset.value;

        // Add press animation
        button.classList.add("press-animation");
        setTimeout(() => {
          button.classList.remove("press-animation");
        }, 200);

        switch (value) {
          case "clear":
            this.clear();
            break;
          case "backspace":
            this.backspace();
            break;
          case "negative":
            this.toggleNegative();
            break;
          case "=":
            this.compute();
            break;
          default:
            if (["+", "-", "*", "/", "%"].includes(value)) {
              this.chooseOperation(value);
            } else {
              this.appendNumber(value);
            }
        }
      });
    });
  }
}

const displayElement = document.getElementById("display");
const calculator = new Calculator(displayElement);


// code is improved by using tabnine EXTENTION