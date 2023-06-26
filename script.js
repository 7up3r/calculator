//variables to store user input
let firstOperand = null;
let secondOperand = null;
let operator = null;
let displayValue = null;


//functions to return displayValues based on operator
const add = (a = 0, b = 0) => a + b;

const subtract = (a = 0, b = 0) => a - b;

const multiply = (a = 1, b = 1) => a * b;

const divide = (a = 1, b = 1) => b == 0? "Math Error (can't divide by 0)" : a / b;

const remainder = (a = 1, b = 1) => a % b;

//function to reset all the values
const clearAll = function() {
    firstOperand = null;
    secondOperand = null;
    operator = null;
    displayValue = null;
    display.textContent = '';
}
//function to operate user input
const operate = function (firstOperand, secondOperand, operator) {
    firstOperand = Number(firstOperand);
    secondOperand = Number(secondOperand);

    switch(operator) {
        case('+'): return add(firstOperand, secondOperand);
        break;
        case('-'): return subtract(firstOperand, secondOperand);
                   break;
        case('*'): return multiply(firstOperand, secondOperand);
                   break;
        case('/'): return divide(firstOperand, secondOperand);
                   break;
        case('%'): return remainder(firstOperand, secondOperand);
                   break;

        default: return "Math Error";
    }
};

//display value
let display = document.querySelector('.result');
const populateDisplay = function() {
    if (this.classList.contains("actionButton")) {
        if (this.value == "clear") {
            clearAll();
        }
        if (this.value == "=") {
            secondOperand = displayValue;
            displayValue = operate(firstOperand, secondOperand, operator);
            display.textContent = displayValue;
        }
        if (this.value == "backspace") {
            displayValue = displayValue.slice(0, displayValue.length - 1);
            display.textContent = display.textContent.slice(0, display.textContent.length - 1)
        }
        
    } else if(this.classList.contains("operatorButton")) {
        if (operator != null) {
            secondOperand = displayValue;
            displayValue = operate(firstOperand, secondOperand, operator);
            firstOperand = displayValue;
            operator = this.value;
            displayValue = null;
            display.textContent = `${firstOperand}`;
        } else {
            operator = this.value;
            firstOperand = displayValue;
            displayValue = null;
        }
        display.textContent = `${display.textContent} ${this.value}`;
    } else {
        display.textContent = `${display.textContent} ${this.value}`;
        if(displayValue == null) {
            displayValue = this.value
        } else {
            displayValue += this.value;
        }
    }
}



//adding buttons functionality to display value
let buttons = Array.from(document.querySelectorAll('.button'));
buttons.forEach(button => {
    button.addEventListener('click', populateDisplay);
});
