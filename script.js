let firstOperand = null;
let secondOperand = null;
let operator = null;
let result = null;

//handling keyboard input
window.addEventListener('keydown', (e) => handleKeyInput(e.key));

function handleKeyInput(key) {
    if (key >= 0 && key <= 9) appendNumber(key);
    if (key === '+' || key === '-' || key === '/' || key === '%') {
        handleOperator(key);
    }
    if (key === '*' || key === 'X' || key === 'x') handleOperator('*');
    if (key === '=' || key === 'Enter') evaluate();
    if (key === 'Backspace') deleteNumber();
    if (key === '.') handleDecimal();
    if (key === 'C' || key === 'c' || key === 'Delete') clearScreen();
}

//handling on-screen buttons 
const numberButtons = Array.from(document.querySelectorAll('.numberButton'));
const operatorButton = Array.from(document.querySelectorAll('.operatorButton'));
const equalButton = document.querySelector('.equalButton');
const deleteButton = document.querySelector('.deleteButton');
const decimalButton = document.querySelector('.decimalButton');
const allClearButton = document.querySelector('.allClearButton');
const equationScreen = document.querySelector('.equation');
const currentScreen = document.querySelector('.current');

//adding eventlistener to on-screen buttons
numberButtons.forEach ((button) => {
    button.addEventListener('click', () => appendNumber(button.value));
});

operatorButton.forEach((button) => {
    button.addEventListener('click', () => handleOperator(button.value));
});

equalButton.addEventListener('click', () => evaluate());
deleteButton.addEventListener('click', () => deleteNumber());
decimalButton.addEventListener('click', () => handleDecimal());
allClearButton.addEventListener('click', () => clearScreen());

//handling number input
const appendNumber = function(value) {
    currentScreen.textContent = `${currentScreen.textContent}${value}`;
};

//handling operator input
const handleOperator = function(value) {
    if(operator != null) {
        secondOperand = currentScreen.textContent;
        console.log(firstOperand, secondOperand, operator);
        firstOperand = operate(firstOperand, secondOperand, operator);
        currentScreen.textContent = firstOperand;
        console.log(firstOperand, secondOperand, operator);
    }
    operator = value;
    equationScreen.textContent = `${currentScreen.textContent}${operator}`;
    firstOperand = currentScreen.textContent;
    currentScreen.textContent = '';
};

//handle equal to 
const evaluate = function() {
    if (equationScreen.textContent.includes('=')) {
        return;
    }
    secondOperand = currentScreen.textContent;
    result = operate(firstOperand, secondOperand, operator);
    currentScreen.textContent = result;
    equationScreen.textContent += `${secondOperand}=` ;
    firstOperand = result;
    secondOperand = null;
    operator = null;
}

//handle delete 
const deleteNumber = function() {
    currentScreen.textContent = currentScreen.textContent.slice(0, currentScreen.textContent.length - 1);
}

//handle decimal
const handleDecimal = function() {
    if( currentScreen.textContent === '') {
        currentScreen.textContent = 0;
    }
    if (currentScreen.textContent.includes('.')) {
        return;
    }
    currentScreen.textContent = `${currentScreen.textContent}.`;
}

//handle clear screen 
const clearScreen = function() {
    firstOperand = null;
    secondOperand = null;
    operator = null;
    shouldResestScreen = false;
    currentScreen.textContent = '';
    equationScreen.textContent = '';
}


//functions for basic maths
const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => b == 0 ? "Math Error" : a / b;

const remainder = (a, b) => a % b;

//function to call maths function by checking operator
const operate = function (a, b, currentOperator) {
    a = Number(a);
    b = Number(b);

    switch(currentOperator) {
        case('+'): return add(a, b);
        break;
        case('-'): return subtract(a, b);
                   break;
        case('*'): return multiply(a, b);
                   break;
        case('/'): return divide(a, b);
                   break;
        case('%'): return remainder(a, b);
                   break;

        default: return null;
    }
};