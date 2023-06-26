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
    result.textContent = '';
    equation.textContent = '';
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

//result value
let result = document.querySelector('.result');
let equation = document.querySelector('.equation');

const populateresult = function() {
    if (this.classList.contains("actionButton")) {
        if (this.value == "clear") {
            clearAll();
        }
        if (this.value == "=") {
            secondOperand = displayValue;
            displayValue = operate(firstOperand, secondOperand, operator);
            firstOperand = displayValue;
            operator = null;
            changeResult(displayValue);
            changeEquation(this.value);
        }
        if (this.value == "backspace") {
            displayValue = displayValue.slice(0, displayValue.length - 1);
            result.textContent = result.textContent.slice(0, result.textContent.length - 1)
        }
        
    } else if(this.classList.contains("operatorButton")) {
        if (operator != null) {
            secondOperand = displayValue;
            displayValue = operate(firstOperand, secondOperand, operator);
            firstOperand = displayValue;
            operator = this.value;
            displayValue = null;
            changeResult(firstOperand);
        } else {
            operator = this.value;
            firstOperand = displayValue;
            displayValue = null;
        }
        changeEquation(this.value);
    } else {
        changeEquation(this.value);
        if(displayValue == null) {
            displayValue = this.value
        } else {
            displayValue += this.value;
        }
    }
}

function changeResult (value) {
    result.textContent = `${value}`;
}

function changeEquation (value) {
    if (value == '=') {
        equation.textContent = result.textContent;
    } else {
        equation.textContent = `${equation.textContent} ${value}`;
    }
}

//adding buttons functionality to result value
let buttons = Array.from(document.querySelectorAll('.button'));
buttons.forEach(button => {
    button.addEventListener('click', populateresult);
});
