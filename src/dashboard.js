import './main.js'

const mobileNav = document.querySelector('#mobile-menu')
const menuButton = mobileNav.querySelector('summary')
const sectionLinks = document.querySelectorAll('[data-dashboard-nav] a[href^="#"]')
const overviewLinks = document.querySelectorAll('[data-dashboard-nav] a[href="./dashboard.html"]')

function updateCurrentSection() {
  if (!sectionLinks.length) return

  const hash = window.location.hash
  const activeSection = Array.from(sectionLinks).find((link) => link.hash === hash)
  overviewLinks.forEach((link) => {
    if (activeSection) link.removeAttribute('aria-current')
    else link.setAttribute('aria-current', 'page')
  })
  sectionLinks.forEach((link) => {
    if (link.hash === activeSection?.hash) {
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
