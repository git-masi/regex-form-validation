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
      parent.appendChild(helpDiv);
      clearHelpDiv(parent);
      break
    case 'zip':
      helpDiv.textContent = `${inputElement.nextElementSibling.textContent} must use format 12345 or 12345-1234`;
      parent.appendChild(helpDiv);
      clearHelpDiv(parent);
      break
    case 'phone':
      helpDiv.textContent = `${inputElement.nextElementSibling.textContent} must use format 555-555-5555`;
      parent.appendChild(helpDiv);
      clearHelpDiv(parent);
      break
    case 'email':
      helpDiv.textContent = `${inputElement.nextElementSibling.textContent} please enter a valid email`;
      parent.appendChild(helpDiv);
      clearHelpDiv(parent);
      break
    case 'password':
      helpDiv.textContent = `${inputElement.nextElementSibling.textContent} must be 8-16 characters with one number, one capital letter, and one special character`;
      parent.appendChild(helpDiv);
      clearHelpDiv(parent);
      break
    case 'password-two':
      helpDiv.textContent = `Passwords must match`;
      parent.appendChild(helpDiv);
      clearHelpDiv(parent);
      break      
    default:
      label.textContent = 'something went wrong';
  }
}

function clearHelpDiv(parent) {
  setTimeout(() => {
    parent.querySelector('.help-message').remove();
  }, 3000);
}

function checkSamePassword(p2, regex) {
  const p1 = document.getElementById('password');
  if (p1.value !== p2.value) {
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
  if (!document.getElementById('validate-form').querySelector('.invalid')) {
    return
  } else {
    // modal
    inputFields.forEach(el => el.value = '');
  }

  e.preventDefault();
}