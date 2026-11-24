import './style.css'

const menu = document.querySelector('#mobile-menu')

menu.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.open) {
    menu.open = false
    menu.querySelector('summary').focus()
  }
})

const selection = document.querySelector('#product-selection')

document.querySelectorAll('[data-product]').forEach((button) => {
  button.addEventListener('click', () => {
    selection.textContent = `${button.dataset.product} selected for this demo.`
  })
})
