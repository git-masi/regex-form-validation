const firstName = document.getElementById('first-name'),
      lastName = document.getElementById('last-name'),
      zipCode = document.getElementById('zip-code'),
      phoneNumber = document.getElementById('phone-number'),
      email = document.getElementById('email'),
      password = document.getElementById('password'),
      repeatPassword = document.getElementById('repeat-password'),
      submitButton = document.querySelector('#validate-form button[type=submit]');


const regexObj = {
  name: /^[a-z]$/i,
  zip: /^[0-9]{5}$/,
  phone: /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/,
  email: /^[\w]@[\w].[a-z]$/i,
  password: /^([0-9]{1,}[A-Z]{1,}[!@#$%^&*-]{1,}[^\s]){8,16}$/
}