// colors
let backgroundColor = "#C5E4E7";
let mainColor = "#00474B";
let secondaryColor = "#26C2AE";
let inputColor = "#F3F9FA";
let h4Color = "#5E7A7D";
let mainTextColor = "#FFF";
let secondaryTextColor = "#7F9D9F";
let hoverColor = "#9FE8DF";
let errorColor = "#E17052";

// add colors
document.body.style.backgroundColor = backgroundColor;
document.querySelectorAll('h4').forEach(el => {
    el.style.color = h4Color;
});



// create logo
const imgLogo = document.createElement('img');
imgLogo.src = './images/logo.svg';
imgLogo.alt = 'logo split team';
document.querySelector('.logolink').appendChild(imgLogo);

// .calculator_container style
const calculatorContainer = document.querySelector('.calculator_container')
calculatorContainer.style.backgroundColor = mainTextColor;
calculatorContainer.style.borderRadius = "25px";


const buttonPercent = [
    { button1: "5%" },
    { button2: "10%" },
    { button3: "15%" },
    { button4: "25%" },
    { button1: "50%" },
    
];

const percentButtons = document.querySelector('.percent_buttons');

buttonPercent.forEach(item => {
    const value = Object.values(item)[0];
    const button = document.createElement('button');
    button.textContent = value;
    button.className = 'tip-button';
    button.style.height = '48px';
    percentButtons.appendChild(button);
    
});
const inputCustom = document.createElement('input')
inputCustom.type = 'text';
inputCustom.placeholder = 'Custom';
document.querySelector('.percent_buttons').appendChild(inputCustom);
// inputCustom.style.maxWidth = ('117px');
inputCustom.style.height = ('48px');




const billInput = document.querySelector('.bill');
const numberOfPeopleInput = document.querySelector('.number_of_people');
const tipAmountField = document.querySelector('.tip_amount');
const totalField = document.querySelector('.total');
const tipButtons = document.querySelectorAll('.tip-button');
const customInput = document.querySelector('input[placeholder="Custom"]');
const resetButton = document.querySelector('.reset');
customInput.style.padding = "0";
const errorBill = document.querySelector('.error_bill');
const errorPeople = document.querySelector('.error_number_of_people');

let selectedTip = 0;

// default values
tipAmountField.textContent = "$0.00";
totalField.textContent = "$0.00";

// active button
function setActiveButton(button) {
  tipButtons.forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');
}

// inputs
function validateInputs(bill, people) {
  if (!bill) {
    errorBill.style.display = 'inline';
    billInput.style.border = '2px solid #E17052';
  } else {
    errorBill.style.display = 'none';
    billInput.style.border = 'none';
  }

  if (!people) {
    errorPeople.style.display = 'inline';
    numberOfPeopleInput.style.border = '2px solid #E17052';
  } else {
    errorPeople.style.display = 'none';
    numberOfPeopleInput.style.border = 'none';
  }
}

// tip calculation
function calculateTip() {
  const bill = parseFloat(billInput.value);
  const people = parseInt(numberOfPeopleInput.value);

  validateInputs(bill, people);

  if (!bill || !people || selectedTip === 0) {
    tipAmountField.textContent = "$0.00";
    totalField.textContent = "$0.00";
    return;
  }

  const totalTip = bill * selectedTip / 100;
  const tipPerPerson = totalTip / people;

  tipAmountField.textContent = `$${tipPerPerson.toFixed(2)}`;
  totalField.textContent = `$${totalTip.toFixed(2)}`;
}

// percent buttons
tipButtons.forEach(button => {
  button.addEventListener('click', () => {
    selectedTip = parseFloat(button.textContent);
    customInput.value = '';
    setActiveButton(button);
    calculateTip();
  });
});

// custom input
customInput.addEventListener('input', () => {
  selectedTip = parseFloat(customInput.value) || 0;
  tipButtons.forEach(btn => btn.classList.remove('active'));
  calculateTip();
});

//  bill / number_of_people
[billInput, numberOfPeopleInput].forEach(input => {
  input.addEventListener('input', () => {
    input.value = input.value.replace(/\D/g, '');
    calculateTip();
  });
});

// button Reset
resetButton.addEventListener('click', () => {
  billInput.value = '';
  numberOfPeopleInput.value = '';
  customInput.value = '';
  selectedTip = 0;
  tipAmountField.textContent = "$0.00";
  totalField.textContent = "$0.00";
  tipButtons.forEach(btn => btn.classList.remove('active'));
  errorBill.style.display = 'none';
  errorPeople.style.display = 'none';
  billInput.style.border = 'none';
  numberOfPeopleInput.style.border = 'none';
});
