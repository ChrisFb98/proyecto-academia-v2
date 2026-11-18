/* ============================================================
   Academia Conquer — interacciones
   ============================================================ */

const header = document.querySelector('[data-header]')
const nav = document.getElementById('site-nav')
const navToggle = document.querySelector('[data-nav-toggle]')

/* ---------- Menú móvil ---------- */
const setMenu = (open) => {
  if (!header || !navToggle) return
  header.classList.toggle('is-open', open)
  navToggle.setAttribute('aria-expanded', String(open))
  navToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú')
  document.body.classList.toggle('menu-open', open)
}

navToggle?.addEventListener('click', () => {
  setMenu(!header.classList.contains('is-open'))
})

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenu(false))
})

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false)
})

document.addEventListener('click', (event) => {
  if (!header?.classList.contains('is-open')) return
  if (!header.contains(event.target)) setMenu(false)
})

const desktopQuery = window.matchMedia('(min-width: 56.25em)')
desktopQuery.addEventListener('change', (event) => {
  if (event.matches) setMenu(false)
})

/* ---------- Estado activo del menú ---------- */
const pageAliases = {
  'noticia1.html': 'blog.html',
  'noticia2.html': 'blog.html',
  'curso1.html': 'cursos.html',
  'curso2.html': 'cursos.html',
}

const currentPage = window.location.pathname.split('/').pop() || 'index.html'
const activePage = pageAliases[currentPage] ?? currentPage

document.querySelectorAll('[data-nav-link]').forEach((link) => {
  const href = link.getAttribute('href')
  if (href === activePage) {
    link.classList.add('is-active')
    link.setAttribute('aria-current', 'page')
  }
})

/* ---------- Header al hacer scroll ---------- */
const onScroll = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 12)
}
onScroll()
window.addEventListener('scroll', onScroll, { passive: true })

/* ---------- Año dinámico ---------- */
document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = new Date().getFullYear()
})

/* ---------- Mostrar / ocultar contraseña ---------- */
document.querySelectorAll('[data-password-toggle]').forEach((button) => {
  const input = document.getElementById(button.getAttribute('data-password-toggle'))
  if (!input) return

  button.addEventListener('click', () => {
    const show = input.type === 'password'
    input.type = show ? 'text' : 'password'
    button.setAttribute('aria-pressed', String(show))
    button.setAttribute('aria-label', show ? 'Ocultar contraseña' : 'Mostrar contraseña')
    button.querySelector('.icon--eye')?.classList.toggle('is-hidden', show)
    button.querySelector('.icon--eye-off')?.classList.toggle('is-hidden', !show)
  })
})

/* ---------- Revelado progresivo ---------- */
const revealItems = document.querySelectorAll('[data-reveal]')
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

if (!('IntersectionObserver' in window) || reduceMotion) {
  revealItems.forEach((item) => item.classList.add('is-visible'))
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px' }
  )

  revealItems.forEach((item) => observer.observe(item))
}

/* ---------- Botón volver arriba ---------- */
const toTop = document.querySelector('[data-to-top]')

if (toTop) {
  const toggleToTop = () => {
    toTop.classList.toggle('is-visible', window.scrollY > 600)
  }

  toggleToTop()
  window.addEventListener('scroll', toggleToTop, { passive: true })

  toTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? 'auto' : 'smooth',
    })
  })
}

/* ---------- Filtros del blog ---------- */
const filterBar = document.querySelector('[data-filter-bar]')

if (filterBar) {
  const buttons = [...filterBar.querySelectorAll('[data-filter]')]
  const cards = [...document.querySelectorAll('[data-category]')]

  const applyFilter = (filter) => {
    buttons.forEach((button) => {
      const active = button.dataset.filter === filter
      button.classList.toggle('is-active', active)
      button.setAttribute('aria-pressed', String(active))
    })

    cards.forEach((card) => {
      const visible = filter === 'todos' || card.dataset.category === filter
      card.classList.toggle('is-hidden', !visible)
    })
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => applyFilter(button.dataset.filter))
  })
}

/* ---------- Demo de formularios ---------- */
document.querySelectorAll('[data-demo-form]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    if (!form.reportValidity()) return

    const status = form.querySelector('[data-form-status]')
    if (status) {
      status.textContent =
        form.dataset.success || '¡Gracias! Hemos recibido tu mensaje. Te responderemos muy pronto.'
      status.classList.add('is-visible')
    }
    form.reset()
  })
})
