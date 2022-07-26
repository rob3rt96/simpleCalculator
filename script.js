const calculatorDisplay = document.querySelector('h1');
const inputButtons = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

// Calculating first and second values, dependind on operator
const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
    '=': (firstNumber, secondNumber) => secondNumber
};

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;


const sendNumberValue = number => {
    // Replace current display value if first value is entered
    if (awaitingNextValue) {
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    } else {
        // If current display value is 0, replace it with what it was selected. If value is not 0, attach the current value to the new value
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }
};

const addDecimal = () => {
    // If operator is pressed, don't add decimal
    if (awaitingNextValue) {
        return;
    }

    // If no decimal, add one
    if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
};


const useOperator = operator => {
    const currentValue = Number(calculatorDisplay.textContent);

    // Prevent multiple operators in the same time
    if (operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    }

    // Assign first value if no value exists
    if (!firstValue) {
        firstValue = currentValue;
    } else {
        // console.log('first value: ' + firstValue + ' operator: ' + operatorValue + ' current value: ' + currentValue);
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }

    // Ready for next value, store operator
    awaitingNextValue = true;
    operatorValue = operator;
};


// Reset the display, and all values
const resetAll = () => {
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
    calculatorDisplay.textContent = '0';
};


// Add event listeners for numbers, operators, and decimal buttons
inputButtons.forEach(inputButton => {
    if (inputButton.classList.length === 0) {
        inputButton.addEventListener('click', () => sendNumberValue(inputButton.value));
    } else if (inputButton.classList.contains('operator')) {
        inputButton.addEventListener('click', () => useOperator(inputButton.value));
    } else if (inputButton.classList.contains('decimal')) {
        inputButton.addEventListener('click', addDecimal);
    }
});

// Reset event listener
clearBtn.addEventListener('click', resetAll);