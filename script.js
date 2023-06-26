//variables to store user input
let firstOperand = null;
let secondOperand = null;
let operator = null;
let result = null;


//functions to return results based on operator
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
    result = null;
    display.innerHTML = '';
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
let display = document.querySelector('.screen');
const populateDisplay = function() {
    if (this.classList.contains("actionButton")) {
        if (this.value == "clear") {
            clearAll();
        }
        if (this.value == "=") {
            secondOperand = result;
            result = operate(firstOperand, secondOperand, operator);
            display.innerHTML = result;
        }
        
    } else if(this.classList.contains("operatorButton")) {
        if (operator != null) {
            secondOperand = result;
            result = operate(firstOperand, secondOperand, operator);
            firstOperand = result;
            operator = this.value;
            result = null;
            display.innerHTML = `${firstOperand}`;
        } else {
            operator = this.value;
            firstOperand = result;
            result = null;
        }
        display.innerHTML = `${display.innerHTML} ${this.value}`;
    } else {
        display.innerHTML = `${display.innerHTML} ${this.value}`;
        if(result == null) {
            result = this.value
        } else {
            result += this.value;
        }
    }
}



//adding buttons functionality to display value
let buttons = Array.from(document.querySelectorAll('.button'));
buttons.forEach(button => {
    button.addEventListener('click', populateDisplay);
});
