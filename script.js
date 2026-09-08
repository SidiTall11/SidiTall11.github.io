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
    "home.description": "Développeur Fullstack passionné, spécialisé dans la création d'applications web performantes. Maîtrisant aussi bien le frontend que le backend, je conçois des expériences digitales fluides alliant design moderne et architecture robuste.",
    "about.title":    "À Propos de Moi",
    "about.subtitle": "Développeur passionné",
    "about.description": "Développeur fullstack basé au Burkina Faso, je conçois des applications web, mobiles et desktop évolutives. Spécialisé dans les technologies modernes — React, Django, Flutter et PostgreSQL — je m'investis dans chaque projet avec rigueur et créativité pour transformer les besoins métier en solutions fiables et utiles.",
    "resume.title":   "Mon CV",
    "resume.description": "Développeur fullstack et mobile spécialisé dans la conception d'applications web, desktop et mobiles performantes. Je transforme les besoins métier en solutions fiables, modernes et faciles à utiliser.",
    "resume.education": "Formation",
    "resume.additional": "Formations complémentaires",
    "resume.skills": "Compétences professionnelles",
    "resume.experience": "Expérience & réalisations",
    "resume.achievements": "Réalisations & publications",
    "resume.certifications": "Certifications",
    "projects.title": "Mes Projets",
    "projects.work": "Mes Projets",
    "projects.services": "Mes Services",
    "services.intro": "Des solutions numériques conçues pour répondre à un besoin concret, de la première idée jusqu'à la mise en ligne.",
    "services.cta": "Vous avez un projet en tête ?",
    "services.ctaButton": "Discutons de votre projet",
    "services.process": "Mon processus de travail",
    "contact.title":  "Me Contacter",
    "contact.details": "Mes coordonnées",
    "contact.detailsIntro": "Je suis disponible pour répondre à vos besoins et vous accompagner dans vos projets.",
    "contact.formTitle": "Envoyer un message",
    "contact.formIntro": "Remplissez le formulaire ci-dessous, je vous répondrai dans les meilleurs délais.",
    "contact.name": "Votre nom",
    "contact.email": "Votre email",
    "contact.subject": "Objet",
    "contact.phone": "Votre numéro",
    "contact.message": "Votre message",
    "contact.messagePlaceholder": "Votre message...",
    "contact.send":   "Envoyer",
    "project.harmony.title": "Harmony Security",
    "project.harmony.description": "Application desktop Flutter de gestion de sécurité — agents, sites, présence & rapports.",
    "project.checkers.title": "Dames Élite",
    "project.checkers.description": "Jeu de dames mobile (Flutter) — IA 4 niveaux, multijoueur en ligne, thèmes premium. Disponible sur Play Store. Note : 4.8★",
    "project.portfolio.title": "Portfolio 3D",
    "project.portfolio.description": "Portfolio personnel avec navigation en cube 3D, animations et design neon-cyan.",
    "project.ecommerce.title": "E-Commerce App",
    "project.ecommerce.description": "Application e-commerce full-stack avec gestion de catalogue, panier et paiement.",
    "project.api.title": "REST API Backend",
    "project.api.description": "API RESTful scalable avec Django & PostgreSQL, authentification JWT et documentation Swagger.",
    "project.djago.title": "Djago Gestion",
    "project.djago.description": "Application web de gestion PME — caisse, stock, finances et rapports en temps réel. Hébergée sur Vercel.",
    "service.web.title": "Applications web",
    "service.web.description": "Des interfaces rapides, responsives et faciles à utiliser pour présenter votre activité ou gérer vos opérations.",
    "service.mobile.title": "Applications mobiles & desktop",
    "service.mobile.description": "Des applications Flutter adaptées aux besoins des utilisateurs, avec une expérience cohérente sur mobile et ordinateur.",
    "service.backend.title": "API & systèmes backend",
    "service.backend.description": "Un backend structuré et sécurisé pour faire fonctionner vos applications et centraliser vos données.",
    "education.degree": "Licence en Génie Logiciel",
    "education.degreeDescription": "Développement logiciel, algorithmique, bases de données, développement web et mobile.",
    "training.frontend": "Développeur web frontend",
    "training.programming": "Fondements de la programmation",
    "training.js": "L'essentiel de JavaScript et CSS",
    "training.devops": "Fondements du DevOps",
    "training.marketing": "Marketing digital et outils numériques",
    "experience.djago.title": "Développeur fullstack — Djago Gestion",
    "experience.djago.company": "Application web de gestion pour PME",
    "experience.djago.cash": "Gestion de caisse, stocks et finances.",
    "experience.djago.dashboard": "Tableaux de bord et rapports en temps réel.",
    "experience.djago.deploy": "Déploiement sur Vercel.",
    "experience.checkers.title": "Développeur mobile — Dames Élite",
    "experience.checkers.ai": "Jeu de dames avec IA à quatre niveaux.",
    "experience.checkers.multiplayer": "Multijoueur en ligne et puzzles quotidiens.",
    "experience.checkers.publish": "Publication sur Google Play Store.",
    "experience.harmony.title": "Développeur desktop — Harmony Security",
    "experience.harmony.agents": "Gestion des agents, sites et présences.",
    "experience.harmony.reports": "Génération de rapports et interface métier.",
    "achievements.checkers": "Application Dames Élite publiée sur Google Play Store.",
    "achievements.rating": "Note annoncée de 4,8/5 sur la boutique.",
    "achievements.demos": "Projets web et API disponibles en démonstration.",
    "service.web.item1": "Site vitrine et landing page",
    "service.web.item2": "Application métier et tableau de bord",
    "service.web.item3": "Intégration responsive et SEO de base",
    "service.mobile.item1": "Application Android et iOS",
    "service.mobile.item2": "Application desktop multiplateforme",
    "service.mobile.item3": "Connexion à une API et stockage des données",
    "service.backend.item1": "API REST et authentification",
    "service.backend.item2": "Gestion des rôles et bases de données",
    "service.backend.item3": "Documentation et déploiement cloud",
    "process.exchange": "Échange",
    "process.exchangeDescription": "Comprendre votre besoin, vos objectifs et vos contraintes.",
    "process.design": "Conception",
    "process.designDescription": "Définir une solution claire, réaliste et adaptée à votre activité.",
    "process.development": "Développement",
    "process.developmentDescription": "Construire votre produit avec un code propre et maintenable.",
    "process.delivery": "Livraison",
    "process.deliveryDescription": "Tester, déployer et vous accompagner après la mise en ligne.",
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
    "home.description": "Passionate Fullstack Developer specialized in building high-performance web applications. Combining frontend and backend expertise, I create smooth digital experiences with modern design and robust architecture.",
    "about.title":    "About Me",
    "about.subtitle": "Passionate developer",
    "about.description": "Fullstack developer based in Burkina Faso, I build scalable web, mobile and desktop applications. Specialized in React, Django, Flutter and PostgreSQL, I bring rigor and creativity to every project to turn business needs into reliable, useful solutions.",
    "resume.title":   "My Resume",
    "resume.description": "Fullstack and mobile developer specialized in designing high-performance web, desktop and mobile applications. I turn business needs into reliable, modern and easy-to-use solutions.",
    "resume.education": "Education",
    "resume.additional": "Additional training",
    "resume.skills": "Professional skills",
    "resume.experience": "Experience & achievements",
    "resume.achievements": "Achievements & publications",
    "resume.certifications": "Certifications",
    "projects.title": "My Projects",
    "projects.work": "My Projects",
    "projects.services": "My Services",
    "services.intro": "Digital solutions designed to meet a concrete need, from the first idea to launch.",
    "services.cta": "Have a project in mind?",
    "services.ctaButton": "Let's discuss your project",
    "services.process": "My work process",
    "contact.title":  "Contact Me",
    "contact.details": "Contact details",
    "contact.detailsIntro": "I am available to answer your needs and support you with your projects.",
    "contact.formTitle": "Send a message",
    "contact.formIntro": "Fill out the form below and I will get back to you as soon as possible.",
    "contact.name": "Your name",
    "contact.email": "Your email",
    "contact.subject": "Subject",
    "contact.phone": "Your phone number",
    "contact.message": "Your message",
    "contact.messagePlaceholder": "Your message...",
    "contact.send":   "Send",
    "project.harmony.title": "Harmony Security",
    "project.harmony.description": "Flutter desktop security management application — agents, sites, attendance & reports.",
    "project.checkers.title": "Dames Élite",
    "project.checkers.description": "Mobile checkers game (Flutter) — 4-level AI, online multiplayer and premium themes. Available on the Play Store. Rating: 4.8★",
    "project.portfolio.title": "3D Portfolio",
    "project.portfolio.description": "Personal portfolio with 3D cube navigation, animations and neon-cyan design.",
    "project.ecommerce.title": "E-Commerce App",
    "project.ecommerce.description": "Full-stack e-commerce application with catalog, cart and payment management.",
    "project.api.title": "REST API Backend",
    "project.api.description": "Scalable RESTful API with Django & PostgreSQL, JWT authentication and Swagger documentation.",
    "project.djago.title": "Djago Gestion",
    "project.djago.description": "SME management web application — cash register, inventory, finances and real-time reports. Hosted on Vercel.",
    "service.web.title": "Web applications",
    "service.web.description": "Fast, responsive and easy-to-use interfaces to present your business or manage your operations.",
    "service.mobile.title": "Mobile & desktop applications",
    "service.mobile.description": "Flutter applications adapted to user needs, with a consistent experience on mobile and desktop.",
    "service.backend.title": "APIs & backend systems",
    "service.backend.description": "A structured and secure backend to power your applications and centralize your data.",
    "education.degree": "Bachelor's degree in Software Engineering",
    "education.degreeDescription": "Software development, algorithms, databases, web and mobile development.",
    "training.frontend": "Frontend web developer",
    "training.programming": "Programming fundamentals",
    "training.js": "JavaScript and CSS essentials",
    "training.devops": "DevOps fundamentals",
    "training.marketing": "Digital marketing and digital tools",
    "experience.djago.title": "Fullstack Developer — Djago Gestion",
    "experience.djago.company": "SME management web application",
    "experience.djago.cash": "Cash register, inventory and finance management.",
    "experience.djago.dashboard": "Real-time dashboards and reports.",
    "experience.djago.deploy": "Deployment on Vercel.",
    "experience.checkers.title": "Mobile Developer — Dames Élite",
    "experience.checkers.ai": "Checkers game with four AI levels.",
    "experience.checkers.multiplayer": "Online multiplayer and daily puzzles.",
    "experience.checkers.publish": "Published on the Google Play Store.",
    "experience.harmony.title": "Desktop Developer — Harmony Security",
    "experience.harmony.agents": "Agent, site and attendance management.",
    "experience.harmony.reports": "Report generation and business interface.",
    "achievements.checkers": "Dames Élite application published on the Google Play Store.",
    "achievements.rating": "Announced rating of 4.8/5 on the store.",
    "achievements.demos": "Web and API projects available as demos.",
    "service.web.item1": "Showcase website and landing page",
    "service.web.item2": "Business application and dashboard",
    "service.web.item3": "Responsive integration and basic SEO",
    "service.mobile.item1": "Android and iOS application",
    "service.mobile.item2": "Cross-platform desktop application",
    "service.mobile.item3": "API integration and data storage",
    "service.backend.item1": "REST API and authentication",
    "service.backend.item2": "Roles and database management",
    "service.backend.item3": "Documentation and cloud deployment",
    "process.exchange": "Discussion",
    "process.exchangeDescription": "Understand your needs, goals and constraints.",
    "process.design": "Design",
    "process.designDescription": "Define a clear, realistic solution adapted to your business.",
    "process.development": "Development",
    "process.developmentDescription": "Build your product with clean, maintainable code.",
    "process.delivery": "Delivery",
    "process.deliveryDescription": "Test, deploy and support you after launch.",
  }
};

let currentLang = ["fr", "en"].includes(localStorage.getItem("lang"))
  ? localStorage.getItem("lang")
  : "fr";

function applyLang(lang) {
  if (!translations[lang]) lang = "fr";
  currentLang = lang;
  localStorage.setItem("lang", lang);
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (translations[lang][key]) el.setAttribute("placeholder", translations[lang][key]);
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
