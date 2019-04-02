const inputFields = document.querySelectorAll('#validate-form input');

const regexObj = {
  'name': /^[a-z]{2,40}$/i,
  'zip': /^[0-9]{5}$/,
  'phone': /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/,
  'email': /^[\w]@[\w].[a-z]$/i,
  'password': /^([0-9]{1,}[A-Z]{1,}[!@#$%^&*-]{1,}[^\s]){8,16}$/
}

function validate(el, regex) {
  regex = regexObj[regex];
  if (regex.test(el.value)) {
    el.classList.remove('invalid');
    el.classList.add('valid');
  } else {
    el.classList.remove('valid');
    el.classList.add('invalid');
  }
}

window.addEventListener('load', () => {
  inputFields.forEach(el => {
    let elRegex = el.getAttribute('data-regex');
    el.addEventListener('blur', () => {
      validate(el, elRegex);
    });
  });
});