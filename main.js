const inputFields = document.querySelectorAll('#validate-form input');

const regexObj = {
  'name': /^[a-z]{2,40}$/i,
  'zip': /^[0-9]{5}(-[0-9]{4})?$/,
  'phone': /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/,
  'email': /^[\w]*@[\w]*\.[a-z]$/i,
  'password': /^([0-9]{1,}[A-Z]{1,}[!@#$%^&*-]{1,}[^\s]){8,16}$/
}

function validateInput(el, regex) {
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
      helpDiv.textContent = `${inputElement.nextElementSibling.textContent} please enter valid email`;
      parent.appendChild(helpDiv);
      clearHelpDiv(parent);
      break
    case 'password':
      helpDiv.textContent = `${inputElement.nextElementSibling.textContent} must be 8-16 characters with one number, one capital letter, and one special character`;
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

window.addEventListener('load', () => {
  inputFields.forEach(el => {
    let elRegex = el.getAttribute('data-regex');
    el.addEventListener('blur', () => {
      validateInput(el, elRegex);
    });
  });
});