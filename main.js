const inputFields = document.querySelectorAll('#validate-form input'),
      submitButton = document.querySelector('#validate-form button[type=submit]');

const regexObj = {
  'name': /^[a-z]{2,40}$/i,
  'zip': /^[0-9]{5}(-[0-9]{4})?$/,
  'phone': /^\(?\d{3}\)?[-\. ]?[0-9]{3}[-\. ]?[0-9]{4}$/,
  'email': /^([\w\.-]+)@([\w\.-]+)\.([a-zA-z]{2,5})$/,
  'password': /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
}

function validateInput(el, regex) {
  if (regex === 'password-two') {
    checkSamePassword(el, regex);
    return
  }

  let regexValue = regexObj[regex];
  
  if (regexValue.test(el.value)) {
    el.classList.remove('invalid');
    el.classList.add('valid');
  } else {
    el.classList.remove('valid');
    el.classList.add('invalid');
    if (el.value !== '') validateInputFailed(el, regex);
  }
}

function validateInputFailed(inputElement, regex) {
  let parent = inputElement.parentElement;
  let helpDiv = document.createElement('div');
  helpDiv.classList.add('help-message','red');
 
  if (parent.querySelector('.help-message')) return;

  switch (regex) {
    case 'name':
      helpDiv.textContent = `${inputElement.nextElementSibling.textContent} must be 2-40 characters`;
      break
    case 'zip':
      helpDiv.textContent = `${inputElement.nextElementSibling.textContent} please enter a valid zip code`;
      break
    case 'phone':
      helpDiv.textContent = `${inputElement.nextElementSibling.textContent} please enter a valid phone number`;
      break
    case 'email':
      helpDiv.textContent = `${inputElement.nextElementSibling.textContent} please enter a valid email`;
      break
    case 'password':
      helpDiv.textContent = `${inputElement.nextElementSibling.textContent} must be 8-16 characters with one number, one capital letter, and one special character`;
      break
    case 'password-two':
      helpDiv.textContent = `Passwords must match`;
      break      
    default:
      label.textContent = 'something went wrong';
  }
  parent.appendChild(helpDiv);
  clearHelpDiv(parent);
}

function clearHelpDiv(parent) {
  setTimeout(() => {
    parent.querySelector('.help-message').remove();
  }, 3000);
}

function checkSamePassword(p2, regex) {
  const p1 = document.getElementById('password');
  if (p2.value === '' || p1.value !== p2.value) {
    p2.classList.remove('valid');
    p2.classList.add('invalid');
    validateInputFailed(p2, regex)
  } else {
    p2.classList.remove('invalid');
    p2.classList.add('valid');
  }
}

window.addEventListener('load', () => {
  inputFields.forEach(el => {
    let elRegex = el.getAttribute('data-regex');
    el.addEventListener('blur', () => validateInput(el, elRegex));
  });
});

submitButton.addEventListener('click', finalValidation);

function finalValidation(e) {
  e.preventDefault();
  inputFields.forEach(el => {
    let elRegex = el.getAttribute('data-regex');
    validateInput(el, elRegex);
  })
  if (document.getElementById('validate-form').querySelector('.invalid')) {
    return
  } else {
    const elems = document.querySelectorAll('.modal');
    const instances = M.Modal.init(elems, {dismissible: true}, true, 'success');

    submitButton.classList.add('modal-trigger');

    inputFields.forEach(el => el.value = '');
  }
}