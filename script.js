// ======= Navigation entre sections =======
const navBtns = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.section');

function showSection(targetId, updateHistory = true) {
    const targetSection = document.getElementById(targetId);
    if (!targetSection) return;

    const currentActive = document.querySelector('.section.active');
    if (currentActive && currentActive !== targetSection) {
        currentActive.classList.add('leaving');
        currentActive.classList.remove('active');
        setTimeout(() => currentActive.classList.remove('leaving'), 650);
    }

    navBtns.forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.section === targetId);
    });
    targetSection.classList.add('active');

    if (updateHistory && window.location.protocol !== 'file:') {
        history.replaceState(null, '', `#${targetId}`);
    }
}

navBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        showSection(btn.dataset.section);
    });
});

document.querySelectorAll('.nav-trigger').forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        showSection(trigger.dataset.section);
    });
});

const initialSection = window.location.hash.substring(1);
if (initialSection && document.getElementById(initialSection)) {
    showSection(initialSection, false);
}

window.addEventListener('hashchange', () => {
    const targetId = window.location.hash.substring(1);
    if (targetId && document.getElementById(targetId)) {
        showSection(targetId, false);
    }
});

// ======= Onglets =======
const tabBtns = document.querySelectorAll('.tab-btn');

tabBtns.forEach((btn) => {
    btn.addEventListener('click', function() {
        const tabContainer = this.closest('.resume-tabs');
        const sectionContainer = this.closest('.resume-container');
        
        if (tabContainer && sectionContainer) {
            tabContainer.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            sectionContainer.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
            tabContainer.querySelectorAll('.tab-btn').forEach(b => b.setAttribute('aria-selected', b === this ? 'true' : 'false'));

            this.classList.add('active');
            const target = document.getElementById('tab-' + this.dataset.tab);
            if (target) target.classList.add('active');
        }
    });
});

// ======= EmailJS — Contact Form =======
// ⚙️ CONFIGURATION EmailJS
const EMAILJS_CONFIG = {
    publicKey:   '7lqOWzVoNfd-ZHKGC',
    serviceId:   'service_8zrgl6c',
    templateId:  'template_pnqqqzi',
};

// Gestion du formulaire
const contactForm = document.getElementById('contact-form');
const submitBtn   = document.getElementById('submit-btn');
const btnText     = document.getElementById('btn-text');
const btnIcon     = document.getElementById('btn-icon');
const formStatus  = document.getElementById('form-status');

if (contactForm && submitBtn && btnText && btnIcon && formStatus) {
   contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // État : chargement
    submitBtn.disabled = true;
    btnText.textContent = 'Envoi en cours...';
    btnIcon.className = 'bx bx-loader-alt bx-spin';
    formStatus.className = 'form-status';
    formStatus.textContent = '';

    if (!window.emailjs) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Le formulaire est temporairement indisponible. Contactez-moi directement par email.';
        submitBtn.disabled = false;
        btnText.textContent = 'Envoyer le message';
        btnIcon.className = 'bx bx-send';
        return;
    }

    emailjs.sendForm(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, this)
        .then(() => {
            // Succès
            formStatus.className = 'form-status success';
            formStatus.textContent = '✅ Message envoyé avec succès ! Je vous répondrai bientôt.';
            contactForm.reset();

            // Reset bouton
            submitBtn.disabled = false;
            btnText.textContent = 'Envoyer le message';
            btnIcon.className = 'bx bx-send';

            // Efface le message après 5s
            setTimeout(() => { formStatus.textContent = ''; formStatus.className = 'form-status'; }, 5000);
        })
        .catch((error) => {
            // Erreur
            console.error('EmailJS error:', error);
            formStatus.className = 'form-status error';
            formStatus.textContent = '❌ Échec de l\'envoi. Veuillez réessayer ou me contacter directement par email.';

            submitBtn.disabled = false;
            btnText.textContent = 'Envoyer le message';
            btnIcon.className = 'bx bx-send';
        });
    });
}

if (window.emailjs) {
    emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
}


// ── Language Selector ───────────────────────────────────────────────────────
const translations = {
  fr: {
    "nav.home":       "Accueil",
    "nav.about":      "À Propos",
    "nav.resume":     "CV",
    "nav.projects":   "Projets",
    "nav.contact":    "Contact",
    "home.greeting":  "Salut, je suis",
    "home.role":      "Développeur Fullstack",
    "home.cta1":      "Consulter mon CV",
    "home.cta2":      "Me contacter",
    "about.title":    "À Propos de Moi",
    "about.subtitle": "Développeur passionné",
    "resume.title":   "Mon CV",
    "projects.title": "Mes Projets",
    "contact.title":  "Me Contacter",
    "contact.send":   "Envoyer",
  },
  en: {
    "nav.home":       "Home",
    "nav.about":      "About",
    "nav.resume":     "Resume",
    "nav.projects":   "Projects",
    "nav.contact":    "Contact",
    "home.greeting":  "Hi, I'm",
    "home.role":      "Fullstack Developer",
    "home.cta1":      "View my resume",
    "home.cta2":      "Contact me",
    "about.title":    "About Me",
    "about.subtitle": "Passionate developer",
    "resume.title":   "My Resume",
    "projects.title": "My Projects",
    "contact.title":  "Contact Me",
    "contact.send":   "Send",
  },
  es: {
    "nav.home":       "Inicio",
    "nav.about":      "Acerca",
    "nav.resume":     "CV",
    "nav.projects":   "Proyectos",
    "nav.contact":    "Contacto",
    "home.greeting":  "Hola, soy",
    "home.role":      "Desarrollador Fullstack",
    "home.cta1":      "Ver mi CV",
    "home.cta2":      "Contáctame",
    "about.title":    "Sobre Mí",
    "about.subtitle": "Desarrollador apasionado",
    "resume.title":   "Mi CV",
    "projects.title": "Mis Proyectos",
    "contact.title":  "Contáctame",
    "contact.send":   "Enviar",
  }
};

let currentLang = localStorage.getItem("lang") || "fr";

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
  // Update tooltip data-attributes for nav buttons
  const tooltipMap = {
    home: translations[lang]["nav.home"],
    about: translations[lang]["nav.about"],
    resume: translations[lang]["nav.resume"],
    projects: translations[lang]["nav.projects"],
    contact: translations[lang]["nav.contact"],
  };
  document.querySelectorAll(".nav-btn[data-section]").forEach(btn => {
    const sec = btn.getAttribute("data-section");
    if (tooltipMap[sec]) {
      btn.setAttribute("data-tooltip", tooltipMap[sec]);
      btn.setAttribute("aria-label", tooltipMap[sec]);
    }
  });
  // Highlight active button
  document.querySelectorAll(".lang-btn").forEach(b =>
    b.classList.toggle("active", b.getAttribute("data-lang") === lang)
  );
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => applyLang(btn.getAttribute("data-lang")));
  });
  applyLang(currentLang);
});
