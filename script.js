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
const calculatorContainer = document.querySelector('.calculator_container');
calculatorContainer.style.backgroundColor = mainTextColor;
calculatorContainer.style.borderRadius = "25px";

// generate percent buttons
const buttonPercent = [
  { button1: "5%" },
  { button2: "10%" },
  { button3: "15%" },
  { button4: "25%" },
  { button5: "50%" },
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

// custom input
const inputCustom = document.createElement('input');
inputCustom.type = 'text';
inputCustom.placeholder = 'Custom';
inputCustom.style.height = '48px';
inputCustom.style.padding = "15px";
document.querySelector('.percent_buttons').appendChild(inputCustom);

// selectors
const billInput = document.querySelector('.bill');
const numberOfPeopleInput = document.querySelector('.number_of_people');
const tipAmountField = document.querySelector('.tip_amount');
const totalField = document.querySelector('.total');
const resetButton = document.querySelector('.reset');
const errorBill = document.querySelector('.error_bill');
const errorPeople = document.querySelector('.error_number_of_people');

let selectedTip = 0;

// default values
tipAmountField.textContent = "$0.00";
totalField.textContent = "$0.00";

// active button style
function setActiveButton(activeButton) {
  const buttons = document.querySelectorAll('.tip-button');
  buttons.forEach(btn => btn.classList.remove('active'));
  activeButton.classList.add('active');
}

// input validation
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

// handle percent button clicks using event delegation
const percentButtonsContainer = document.querySelector('.percent_buttons');

percentButtonsContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('tip-button')) {
    selectedTip = parseFloat(event.target.textContent);
    inputCustom.value = '';
    setActiveButton(event.target);
    calculateTip();
  }
});

// custom input for percent
inputCustom.addEventListener('input', () => {
  selectedTip = parseFloat(inputCustom.value) || 0;
  document.querySelectorAll('.tip-button').forEach(btn => btn.classList.remove('active'));
  calculateTip();
});

// bill input handler (allow decimal)
billInput.addEventListener('input', () => {
  billInput.value = billInput.value.replace(/[^0-9.]/g, '');
  const parts = billInput.value.split('.');
  if (parts.length > 2) {
    billInput.value = parts[0] + '.' + parts[1];
  }
  calculateTip();
});

// people input handler (only digits)
numberOfPeopleInput.addEventListener('input', () => {
  numberOfPeopleInput.value = numberOfPeopleInput.value.replace(/\D/g, '');
  calculateTip();
});

// reset button
resetButton.addEventListener('click', () => {
  billInput.value = '';
  numberOfPeopleInput.value = '';
  inputCustom.value = '';
  selectedTip = 0;
  tipAmountField.textContent = "$0.00";
  totalField.textContent = "$0.00";
  document.querySelectorAll('.tip-button').forEach(btn => btn.classList.remove('active'));
  errorBill.style.display = 'none';
  errorPeople.style.display = 'none';
  billInput.style.border = 'none';
  numberOfPeopleInput.style.border = 'none';
});
