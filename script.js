const add = (a = 0, b = 0) => a + b;

const subtract = (a = 0, b = 0) => a - b;

const multiply = (a = 1, b = 1) => a * b;

const divide = (a = 1, b = 1) => b == 0? "Math Error" : a / b;

//variables to store user input
let firstNumber = 0;
let secondNumber = 0;
let operator = '';

//function to operate user input
const operate = function (firstNumber, secondNumber, operator) {
    firstNumber = Number(firstNumber);
    secondNumber = Number(secondNumber);
    switch(operator) {
        case('+'): return add(firstNumber, secondNumber);
                   break;
        case('-'): return subtract(firstNumber, secondNumber);
                   break;
        case('*'): return multiply(firstNumber, secondNumber);
                   break;
        case('/'): return divide(firstNumber, secondNumber);
                   break;
        default: return "Math Error";
    }
};

//display value
let displayValue = 0;
let display = document.querySelector('.screen');
const populateDisplay = function() {
    if (this.classList.contains("actionButton")) {
        if (this.value == "clear") {
            display.innerHTML = '';
            displayValue = 0;
            operator = '';
            firstNumber = 0;
            secondNumber = 0;
        }
        if (this.value == "=") {
            secondNumber = displayValue;
            displayValue = operate(firstNumber, secondNumber, operator);
            display.innerHTML = displayValue;
        }

    } else if(this.classList.contains("operatorButton")) {
        operator = this.value;
        firstNumber = displayValue;
        displayValue = '';
        display.innerHTML = `${display.innerHTML} ${this.value}`;
    } else {
        display.innerHTML = `${display.innerHTML} ${this.value}`;
        displayValue += this.value;
    }
}

//adding buttons functionality to display value
let buttons = Array.from(document.querySelectorAll('.button'));
buttons.forEach(button => {
    button.addEventListener('click', populateDisplay);
});

