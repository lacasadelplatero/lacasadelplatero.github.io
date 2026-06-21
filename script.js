const navToggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('#menu');
const year = document.querySelector('#year');
const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');

if (year) year.textContent = new Date().getFullYear();

navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  menu?.classList.toggle('is-open');
});

menu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menu.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('[data-lightbox]').forEach((button) => {
  button.addEventListener('click', () => {
    const src = button.getAttribute('data-lightbox');
    const image = button.querySelector('img');
    if (!src || !lightbox || !lightboxImage) return;
    lightboxImage.src = src;
    lightboxImage.alt = image?.alt || 'Imagen ampliada';
    lightbox.showModal();
  });
});

lightboxClose?.addEventListener('click', () => lightbox?.close());
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && lightbox?.open) lightbox.close();
});



const translations = {
};

function setLanguage(lang) {
  const dictionary = translations[lang] || translations.es;
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (dictionary[key]) {
      element.textContent = dictionary[key];
    }
  });

  document.querySelectorAll(".lang-btn").forEach((button) => {
    const isActive = button.dataset.lang === lang;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  try {
    localStorage.setItem("preferredLanguage", lang);
  } catch (error) {
    // Local storage may be unavailable in some privacy modes.
  }
}

document.querySelectorAll(".lang-btn").forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

let savedLanguage = "es";
try {
  savedLanguage = localStorage.getItem("preferredLanguage") || "es";
} catch (error) {
  savedLanguage = "es";
}
setLanguage(savedLanguage);
