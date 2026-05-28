// MOBILE MENU
function initMobileMenu() {
  const header = document.querySelector(".header");
  const burger = document.querySelector(".header__burger");

  if (!header || !burger) return;

  const mobileLinks = header.querySelectorAll(".header__mobile a");

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
}

initMobileMenu();


// OPEN BOOKING
function initBookingPanel() {
  const bookingPanel = document.querySelector("#bookingPanel");

  if (!bookingPanel) return;

  const openButtons = document.querySelectorAll(".js-open-booking");
  const expandInput = document.querySelector(".js-expand-booking");
  const closeButton = document.querySelector(".js-close-booking");
  const collapseButton = document.querySelector(".js-collapse-booking");

  const showBookingAfter = 350;

  function toggleBookingOnScroll() {
    if (window.scrollY > showBookingAfter) {
      bookingPanel.classList.remove("is-scroll-hidden");
    } else if (!bookingPanel.classList.contains("is-expanded")) {
      bookingPanel.classList.add("is-scroll-hidden");
    }
  }

  window.addEventListener("scroll", toggleBookingOnScroll);
  window.addEventListener("load", toggleBookingOnScroll);

  openButtons.forEach((button) => {
    button.addEventListener("click", () => {
      bookingPanel.classList.remove("is-hidden", "is-scroll-hidden");
      bookingPanel.classList.add("is-expanded");
    });
  });

  if (expandInput) {
    expandInput.addEventListener("focus", () => {
      bookingPanel.classList.add("is-expanded");
    });
  }

  if (closeButton) {
    closeButton.addEventListener("click", () => {
      bookingPanel.classList.add("is-hidden");
    });
  }

  if (collapseButton) {
    collapseButton.addEventListener("click", () => {
      bookingPanel.classList.remove("is-expanded");
    });
  }

  toggleBookingOnScroll();
}

initBookingPanel();


// BEFORE / AFTER - works for main + cards
function initBeforeAfterComparisons() {
  const comparisons = document.querySelectorAll(".comparison, .comparison-mini");

  if (!comparisons.length) return;

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
}

initBeforeAfterComparisons();


// PROCESS WORKING
function initProcessWorking() {
  const processSection = document.querySelector(".process");

  if (!processSection) return;

  const processSteps = processSection.querySelectorAll(".process-step");

  if (!processSteps.length) return;

  const mobileTitle = processSection.querySelector(".process-mobile-info__title");
  const mobileText = processSection.querySelector(".process-mobile-info__text");

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
}

initProcessWorking();


// SEO READ MORE
function initSeoToggle() {
  const seoToggle = document.getElementById("seoToggle");
  const seoText = document.getElementById("seoText");

  if (!seoToggle || !seoText) return;

  seoToggle.addEventListener("click", () => {
    seoText.classList.toggle("is-collapsed");

    seoToggle.textContent = seoText.classList.contains("is-collapsed")
      ? "Przeczytaj więcej"
      : "Pokaż mniej";
  });
}

initSeoToggle();


// FOOTER ACCORDIONS
function initFooterAccordions() {
  const footerAccordions = document.querySelectorAll(".footer-accordion");

  if (!footerAccordions.length) return;

  footerAccordions.forEach((accordion) => {
    const trigger = accordion.querySelector(".footer-accordion__trigger");

    if (!trigger) return;

    trigger.addEventListener("click", () => {
      if (window.innerWidth > 768) return;

      accordion.classList.toggle("is-open");
    });
  });
}

initFooterAccordions();


// SECTION BG
function initSectionBackgroundObserver() {
  const sections = document.querySelectorAll(".js-white-bg");

  if (!sections.length) return;

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
}

initSectionBackgroundObserver();


// CALL BACK MODAL
function initCallbackModal() {
  const callbackBtn = document.querySelector(".js-sticky-callback");
  const callbackModal = document.querySelector("#callbackModal");

  if (!callbackBtn || !callbackModal) return;

  const callbackClose = callbackModal.querySelector(".modal__close");
  const callbackOverlay = callbackModal.querySelector(".modal__overlay");
  const callbackForm = callbackModal.querySelector("form");

  function openCallbackModal() {
    callbackModal.classList.add("is-active");
    document.body.style.overflow = "hidden";
  }

  function closeCallbackModal() {
    callbackModal.classList.remove("is-active");
    document.body.style.overflow = "";
  }

  callbackBtn.addEventListener("click", openCallbackModal);

  if (callbackClose) {
    callbackClose.addEventListener("click", closeCallbackModal);
  }

  if (callbackOverlay) {
    callbackOverlay.addEventListener("click", closeCallbackModal);
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCallbackModal();
    }
  });

  if (callbackForm) {
    callbackForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(callbackForm);

      const name = formData.get("name");
      const phone = formData.get("phone");

      // todo
      console.log("Imię:", name);
      console.log("Telefon:", phone);

      callbackForm.reset();
      closeCallbackModal();
    });
  }
}

initCallbackModal();



// SWIPER SLIDER
// SWIPER SLIDER
function initSwiperSliders() {
  const tabletBreakpoint = window.matchMedia("(max-width: 1024px)");
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
      always: true,
      slidesPerView: 2.2,
      spaceBetween: 16,
      breakpoints: {
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      },
    },

    blog: {
      slidesPerView: 1,
      spaceBetween: 16,
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
      },
    }
  };

  function initSliders() {
    const allSliders = document.querySelectorAll("[data-slider]");

    if (!allSliders.length || typeof Swiper === "undefined") return;

    allSliders.forEach((slider) => {
      const sliderName = slider.dataset.slider;
      const config = sliderSettings[sliderName];

      if (!config) return;

      const shouldAlwaysRun = config.always === true;
      const shouldRun = shouldAlwaysRun || tabletBreakpoint.matches;

      if (shouldRun && !sliders.has(slider)) {
        const { always, ...swiperConfig } = config;

        const swiper = new Swiper(slider, {
          ...swiperConfig,
          speed: 600,
          grabCursor: true,
          watchOverflow: true,
          observer: true,
          observeParents: true,

          pagination: {
            el: slider.querySelector(".swiper-pagination"),
            clickable: true,
          },
        });

        sliders.set(slider, swiper);
      }

      if (!shouldRun && sliders.has(slider)) {
        sliders.get(slider).destroy(true, true);
        sliders.delete(slider);
      }
    });
  }

  window.addEventListener("load", initSliders);
  window.addEventListener("resize", initSliders);

  initSliders();
}

initSwiperSliders();


// SCROLL TOP BUTTON
function initScrollTopButton() {
  const scrollTopBtn = document.querySelector(".js-scroll-top");

  if (!scrollTopBtn) return;

  window.addEventListener("scroll", () => {
    scrollTopBtn.classList.toggle(
      "is-visible",
      window.scrollY > 500
    );
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

initScrollTopButton();
