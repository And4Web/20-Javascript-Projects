const form = document.getElementById('form');
const password1El = document.getElementById('password1');
const password2El = document.getElementById('password2');
const messageContainer = document.querySelector('.message-container');
const message = document.getElementById('message');

let isValid = false;
let passwordsMatch = false;


function validateForm(){
  // Using constraint API
  isValid = form.checkValidity();

  // Style main message for an error
  if(!isValid){
    message.textContent = "Please fill out all the fields."
    message.style.color = 'red';
    messageContainer.style.borderColor = 'red';
    return;
  }

  // check to see if passwords match
  if(password1El.value === password2El.value){
    passwordsMatch = true;
    password1El.style.borderColor = 'green';
    password2El.style.borderColor = 'green';
    
  }else{
    passwordsMatch = false;
    message.textContent = "Make sure passwords match!";
    message.style.color = 'red';
    messageContainer.style.borderColor = 'red';
    password1El.style.borderColor = 'red';
    password2El.style.borderColor = 'red';
    return;
  }

  // if form is valid and passwords match
  if(isValid && passwordsMatch){
    message.textContent = "Successfully filled the form!";
    message.style.color = 'green';
    messageContainer.style.borderColor = 'green';
  }
 
}

function storeFormData(){
  const user = {
    name: form.name.value,
    phone: form.phone.value,
    email: form.email.value,
    website: form.website.value,
    password: form.password1.value,
  }
  // Do something with user data:
  console.log(user)
}

function processFormData(e){
  e.preventDefault();
  // Validate Form
  validateForm();
  // Submit data if valid
  if(isValid && passwordsMatch){
    storeFormData()
  }
}

// Event listener
form.addEventListener('submit', processFormData);