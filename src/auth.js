import './main.js'

const form = document.querySelector('[data-auth-form]')
const password = form.querySelector('#password')
const feedback = form.querySelector('#auth-feedback')
const submit = form.querySelector('[type="submit"]')
const fields = Array.from(form.querySelectorAll('input[required]'))
const toggles = form.querySelectorAll('[data-password-toggle]')

const requiredMessages = {
  'full-name': 'Enter your full name.',
  email: 'Enter your email address.',
  password: 'Enter a password.',
  confirmation: 'Confirm your password.',
  terms: 'Acknowledge the demo terms before continuing.',
}

function errorFor(field) {
  if (field.type === 'checkbox') {
    return field.validity.valueMissing ? requiredMessages[field.id] : ''
  }

  if (!field.value.trim()) return requiredMessages[field.id]
  if (field.validity.typeMismatch) return 'Enter an email address like you@example.com.'
  if (field.id === 'password' && field.value.length < field.minLength) {
    return 'Use at least 8 characters for your password.'
  }
  if (field.id === 'confirmation' && field.value !== password.value) {
    return 'The passwords must match.'
  }
  return ''
}

function validate(field) {
  const message = errorFor(field)
  const error = document.getElementById(`${field.id}-error`)
  field.setAttribute('aria-invalid', String(Boolean(message)))
  error.textContent = message
  error.hidden = !message
  return !message
}

function setPasswordVisibility(button, visible) {
  const input = document.getElementById(button.getAttribute('aria-controls'))
  input.type = visible ? 'text' : 'password'
  button.setAttribute('aria-pressed', String(visible))
  button.textContent = visible ? 'Hide' : 'Show'
}

toggles.forEach((button) => {
  button.addEventListener('click', () => {
    setPasswordVisibility(button, button.getAttribute('aria-pressed') === 'false')
  })
})

form.addEventListener('input', (event) => {
  const field = event.target
  feedback.textContent = ''
  submit.disabled = false

  if (field.hasAttribute('aria-invalid')) validate(field)
  const confirmation = form.querySelector('#confirmation[aria-invalid]')
  if (field === password && confirmation) validate(confirmation)
})

form.addEventListener('submit', (event) => {
  event.preventDefault()
  const invalidFields = fields.filter((field) => !validate(field))
  if (invalidFields.length) {
    invalidFields[0].focus()
    return
  }

  form.reset()
  fields.forEach((field) => field.removeAttribute('aria-invalid'))
  toggles.forEach((button) => setPasswordVisibility(button, false))
  submit.disabled = true
  feedback.textContent = form.dataset.authForm === 'register'
    ? 'Demo registration passed validation. Account creation is simulated.'
    : 'Demo sign-in passed validation. Sign-in is simulated.'
})

submit.disabled = false
