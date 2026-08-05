// ===================== Header: transparente -> sólido ao rolar =====================
const header = document.getElementById('siteHeader');
const onScrollHeader = () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
};
onScrollHeader();
window.addEventListener('scroll', onScrollHeader, { passive: true });

// ===================== Menu mobile =====================
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

mainNav.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===================== Animações sutis de scroll (fade-in / slide-up) =====================
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
);

revealEls.forEach((el) => revealObserver.observe(el));

// Rede de segurança: se por algum motivo o observer não disparar
// (ex.: navegador sem suporte), o conteúdo não pode ficar invisível.
setTimeout(() => {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}, 1500);

// ===================== Menu: destaca o link da seção visível =====================
const navLinksByHref = {};
document.querySelectorAll('.nav-link').forEach((link) => {
  navLinksByHref[link.getAttribute('href')] = link;
});

const setActiveLink = (href) => {
  Object.values(navLinksByHref).forEach((link) => link.classList.remove('active'));
  const active = navLinksByHref[href];
  if (active) active.classList.add('active');
};

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActiveLink('#' + entry.target.id);
    });
  },
  { rootMargin: '-110px 0px -60% 0px', threshold: 0 }
);

Object.keys(navLinksByHref).forEach((href) => {
  const section = document.querySelector(href);
  if (section) sectionObserver.observe(section);
});

// ===================== Formulário de newsletter (mock, sem backend) =====================
const newsletterForm = document.getElementById('newsletterForm');
const formNote = document.getElementById('formNote');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    formNote.hidden = false;
    newsletterForm.reset();
  });
}
