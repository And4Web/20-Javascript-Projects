const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-button');

// Calculate first and second values depending on operator
const calculate = {
  '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
  '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
  '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
  '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
  '=': (firstNumber, secondNumber) => secondNumber,
};

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number){
  // Replace current display value if first value is entered
  if(awaitingNextValue){
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  }else{
  // If current display value is 0, replace it otherwise add number
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
  }
}

// Decimal
function addDecimal(){
  // If operator pressed, don't add decimal
  if(awaitingNextValue) return;

  // If no decimal, add one
  if(!calculatorDisplay.textContent.includes(".")){
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

function useOperator(operator){
  const currentValue = Number(calculatorDisplay.textContent);

  // Prevent multiple operators 
  if(operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  };

  // Assign firstValue if no value
  if(!firstValue){
    firstValue = currentValue;
  }else{    
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
  }

  // Ready for next value, store our operator
  awaitingNextValue = true;
  operatorValue = operator;
}

// Reset add values, Display
function resetAll(){
  firstValue = 0;
  operatorValue = '';
  awaitingNextValue = false;
  calculatorDisplay.textContent = "0";
}

// Add Event listeners for numbers, operators, decimal buttons
inputBtns.forEach((inputBtn, index)=>{
  if(inputBtn.classList.length === 0){
    inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
  }else if(inputBtn.classList.contains('operator')){
    inputBtn.addEventListener('click', () => useOperator(inputBtn.value))
  }else if(inputBtn.classList.contains('decimal')){
    inputBtn.addEventListener('click', () => addDecimal())
  }
})

// Event Listener
clearBtn.addEventListener('click', resetAll);