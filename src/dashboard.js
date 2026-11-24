import './main.js'

const mobileNav = document.querySelector('#mobile-menu')
const menuButton = mobileNav.querySelector('summary')
const sectionLinks = document.querySelectorAll('[data-dashboard-nav] a[href^="#"]')

function updateCurrentSection() {
  const hash = window.location.hash
  const section = Array.from(sectionLinks).some((link) => link.hash === hash) ? hash : '#overview'
  sectionLinks.forEach((link) => {
    if (link.hash === section) {
      link.setAttribute('aria-current', 'location')
    } else {
      link.removeAttribute('aria-current')
    }
  })
}

updateCurrentSection()
window.addEventListener('hashchange', updateCurrentSection)

mobileNav.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return

    // The fragment jump runs first so it cannot clear the restored focus.
    requestAnimationFrame(() => {
      mobileNav.open = false
      menuButton.focus({ preventScroll: true })
    })
  })
})
