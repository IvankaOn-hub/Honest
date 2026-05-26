//MOBILE MENU
const header = document.querySelector(".header");
const burger = document.querySelector(".header__burger");
const mobileLinks = document.querySelectorAll(".header__mobile a");
burger.addEventListener("click", () => {
  header.classList.toggle("is-open");
  document.body.classList.toggle("no-scroll");
});
mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("is-open");
    document.body.classList.remove("no-scroll");
  });
});

// OPEN BOOKING
const bookingPanel = document.querySelector("#bookingPanel");
const openButtons = document.querySelectorAll(".js-open-booking");
const expandInput = document.querySelector(".js-expand-booking");
const closeButton = document.querySelector(".js-close-booking");
const collapseButton = document.querySelector(".js-collapse-booking");

openButtons.forEach((button) => {
  button.addEventListener("click", () => {
    bookingPanel.classList.remove("is-hidden");
    bookingPanel.classList.add("is-expanded");
  });
});
// EXPAND ON EMAIL FOCUS

expandInput.addEventListener("focus", () => {
  bookingPanel.classList.add("is-expanded");
});
// HIDE PANEL
closeButton.addEventListener("click", () => {
  bookingPanel.classList.add("is-hidden");
});
// COLLAPSE FULLSCREEN
collapseButton.addEventListener("click", () => {
  bookingPanel.classList.remove("is-expanded");
});

// BEFORE / AFTER - works for main + cards
const comparisons = document.querySelectorAll(".comparison, .comparison-mini");

comparisons.forEach((comparison) => {
  const beforeImage = comparison.querySelector(".comparison__image--before, .comparison-mini__image--before");
  const line = comparison.querySelector(".comparison__line, .comparison-mini__line");
  const handle = comparison.querySelector(".comparison__handle, .comparison-mini__handle");

  if (!beforeImage || !line || !handle) return;

  let isDragging = false;

  const updateComparison = (clientX) => {
    const rect = comparison.getBoundingClientRect();
    const position = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.max(0, Math.min(position, 100));

    beforeImage.style.clipPath = `inset(0 ${100 - clamped}% 0 0)`;
    line.style.left = `${clamped}%`;
    handle.style.left = `${clamped}%`;
  };

  comparison.addEventListener(
    "touchstart",
    (event) => {
      event.preventDefault();
      updateComparison(event.touches[0].clientX);
    },
    { passive: false }
  );

  comparison.addEventListener(
    "touchmove",
    (event) => {
      event.preventDefault();
      updateComparison(event.touches[0].clientX);
    },
    { passive: false }
  );

  comparison.addEventListener("mousedown", (event) => {
    isDragging = true;
    updateComparison(event.clientX);
  });

  window.addEventListener("mousemove", (event) => {
    if (!isDragging) return;
    updateComparison(event.clientX);
  });

  window.addEventListener("mouseup", () => {
    isDragging = false;
  });
});


/* const comparisons = document.querySelectorAll(".comparison, .comparison-mini");
comparisons.forEach((comparison) => {
  const beforeImage = comparison.querySelector(
    ".comparison__image--before, .comparison-mini__image--before"
  );
  const line = comparison.querySelector(
    ".comparison__line, .comparison-mini__line"
  );
  const handle = comparison.querySelector(
    ".comparison__handle, .comparison-mini__handle"
  );
  if (!beforeImage || !line || !handle) return;
  const updateComparison = (event) => {
    const rect = comparison.getBoundingClientRect();
    const position = ((event.clientX - rect.left) / rect.width) * 100;
    const clamped = Math.max(0, Math.min(position, 100));
    beforeImage.style.clipPath = `inset(0 ${100 - clamped}% 0 0)`;
    line.style.left = `${clamped}%`;
    handle.style.left = `${clamped}%`;
  };
  comparison.addEventListener("pointermove", updateComparison);
  comparison.addEventListener("pointerdown", updateComparison);
}); */

// Process Working
/* const processSection = document.querySelector(".process");
const processSteps = document.querySelectorAll(".process-step");
processSteps.forEach((step) => {
  step.addEventListener("mouseenter", () => {
    processSteps.forEach((item) => item.classList.remove("is-active"));
    step.classList.add("is-active");
    processSection.dataset.step = step.dataset.step;
  });
  step.addEventListener("click", () => {
    processSteps.forEach((item) => item.classList.remove("is-active"));
    step.classList.add("is-active");
    processSection.dataset.step = step.dataset.step;
  });
}); */

// Process Working
const processSection = document.querySelector(".process");
const processSteps = document.querySelectorAll(".process-step");

const mobileTitle = document.querySelector(".process-mobile-info__title");
const mobileText = document.querySelector(".process-mobile-info__text");

function setActiveProcess(step) {
  processSteps.forEach((item) => item.classList.remove("is-active"));
  step.classList.add("is-active");

  processSection.dataset.step = step.dataset.step;

  const title = step.querySelector("h3")?.textContent;
  const text = step.querySelector("p")?.textContent;

  if (mobileTitle && title) mobileTitle.textContent = title;
  if (mobileText && text) mobileText.textContent = text;
}

processSteps.forEach((step) => {
  step.addEventListener("mouseenter", () => {
    if (window.innerWidth > 768) {
      setActiveProcess(step);
    }
  });

  step.addEventListener("click", () => {
    setActiveProcess(step);
  });
});

// SEO READ MORE
const seoToggle = document.getElementById("seoToggle");
const seoText = document.getElementById("seoText");
seoToggle?.addEventListener("click", () => {
  seoText.classList.toggle("is-collapsed");
  seoToggle.textContent = seoText.classList.contains("is-collapsed")
    ? "Przeczytaj więcej"
    : "Pokaż mniej";
});

//Footer
const footerAccordions = document.querySelectorAll(".footer-accordion");
footerAccordions.forEach((accordion) => {
  const trigger = accordion.querySelector(".footer-accordion__trigger");
  trigger.addEventListener("click", () => {
    if (window.innerWidth > 768) return;
    accordion.classList.toggle("is-open");
  });
});

// Section BG
const sections = document.querySelectorAll(".js-white-bg");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle(
        "white-section",
        !entry.isIntersecting
      );
    });
  },
  {
    threshold: 0.45,
  }
);
sections.forEach((section) => observer.observe(section));

// Call Back Modal
const callbackBtn = document.querySelector('.js-sticky-callback');
const callbackModal = document.querySelector('#callbackModal');
const callbackClose = callbackModal.querySelector('.modal__close');
const callbackOverlay = callbackModal.querySelector('.modal__overlay');
const callbackForm = callbackModal.querySelector('form');
function openCallbackModal() {
  callbackModal.classList.add('is-active');
  document.body.style.overflow = 'hidden';
}
function closeCallbackModal() {
  callbackModal.classList.remove('is-active');
  document.body.style.overflow = '';
}
callbackBtn.addEventListener('click', openCallbackModal);
callbackClose.addEventListener('click', closeCallbackModal);
callbackOverlay.addEventListener('click', closeCallbackModal);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeCallbackModal();
  }
});
callbackForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(callbackForm);
  const name = formData.get('name');
  const phone = formData.get('phone');
  console.log('Imię:', name);
  console.log('Telefon:', phone);
  callbackForm.reset();
  closeCallbackModal();
});



// SWIPER SLIDER
const tabletBreakpoint = window.matchMedia('(max-width: 1024px)');
const sliders = new Map();

const sliderSettings = {
  reviews: {
    slidesPerView: 1.15,
    spaceBetween: 16,
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
    },
  },

  brands: {
    slidesPerView: 2.2,
    spaceBetween: 16,
    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  },
};

function initTabletSliders() {
  const tabletSliders = document.querySelectorAll('.js-tablet-slider');

  tabletSliders.forEach((slider) => {
    const sliderName = slider.dataset.slider;
    const config = sliderSettings[sliderName];

    if (!config || typeof Swiper === 'undefined') return;

    if (tabletBreakpoint.matches && !sliders.has(slider)) {
      const swiper = new Swiper(slider, {
        ...config,
        speed: 600,
        grabCursor: true,
        watchOverflow: true,

        pagination: {
          el: slider.querySelector('.swiper-pagination'),
          clickable: true,
        },
      });

      sliders.set(slider, swiper);
    }

    if (!tabletBreakpoint.matches && sliders.has(slider)) {
      sliders.get(slider).destroy(true, true);
      sliders.delete(slider);
    }
  });
}

window.addEventListener('load', initTabletSliders);
window.addEventListener('resize', initTabletSliders);



// Brands show all
const brandsSection = document.querySelector(".brands");
const brandsBtn = document.querySelector(".js-show-all-brands");
const brandCards = document.querySelectorAll(".brands .brand-card");

if (brandsSection && brandsBtn && brandCards.length) {
  brandCards.forEach((card, index) => {
    if (index > 7) card.classList.add("is-hidden");
  });

  brandsBtn.addEventListener("click", () => {
    brandsSection.classList.toggle("is-expanded");

    const isExpanded = brandsSection.classList.contains("is-expanded");

    brandCards.forEach((card, index) => {
      if (index > 7) {
        card.classList.toggle("is-hidden", !isExpanded);
      }
    });

    brandsBtn.textContent = isExpanded ? "Pokaż mniej" : "Pokaż wszystkie";
  });
}