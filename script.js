document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("header");
    const burger = document.getElementById("burger-menu");
    const navMenu = document.getElementById("nav-menu");
    const langSwitch = document.getElementById("lang-switch");
    const revealElements = document.querySelectorAll(".reveal");
    const videoCards = document.querySelectorAll(".video-card");
    const html = document.documentElement;

    /*
      Добавьте сюда ссылки на ваши видео.
      Формат:
      horizontal: 2 ссылки
      vertical: 4 ссылки

      Пример:
      h1: { src: "https://.../video.mp4", label: "YouTube кейс 1" }
    */
    const VIDEO_LINKS = {
        h1: { src: "", label: "Горизонтальный кейс 1" },
        h2: { src: "", label: "Горизонтальный кейс 2" },
        v1: { src: "", label: "Вертикальный кейс 1" },
        v2: { src: "", label: "Вертикальный кейс 2" },
        v3: { src: "", label: "Вертикальный кейс 3" },
        v4: { src: "", label: "Вертикальный кейс 4" }
    };

    const translations = {
        ru: {
            switchLabel: "EN",
            navHorizontal: "Горизонтальные",
            navVertical: "Вертикальные",
            navAbout: "Обо мне",
            navContact: "Связаться",
            heroKicker: "yrizen",
            heroTitle: "Портфолио",
            heroDescription:
                "Монтирую вертикальные и горизонтальные видео: интервью, путешествия, говорящая голова, экспертные ролики и проекты, где есть только запись голоса.",
            heroButtonOne: "Горизонтальные",
            heroButtonTwo: "Вертикальные",
            worksLabel: "работы",
            aboutTitle: "Обо мне",
            aboutSubtitle: "Кто стоит за кадром",
            footerTelegram: "Написать в Telegram",
            footerEmail: "Написать Email"
        },
        en: {
            switchLabel: "RU",
            navHorizontal: "Horizontal",
            navVertical: "Vertical",
            navAbout: "About",
            navContact: "Contact",
            heroKicker: "yrizen",
            heroTitle: "Portfolio",
            heroDescription:
                "I edit vertical and horizontal videos: interviews, travel content, talking head videos, expert content, and projects that only have a voice recording.",
            heroButtonOne: "Horizontal",
            heroButtonTwo: "Vertical",
            worksLabel: "works",
            aboutTitle: "About",
            aboutSubtitle: "Who is behind the frame",
            footerTelegram: "Message on Telegram",
            footerEmail: "Send Email"
        }
    };

    const applyLanguage = (lang) => {
        const t = translations[lang] || translations.ru;
        html.lang = lang;
        if (langSwitch) langSwitch.textContent = t.switchLabel;

        const navLinks = navMenu.querySelectorAll(".nav-link");
        if (navLinks[0]) navLinks[0].textContent = t.navHorizontal;
        if (navLinks[1]) navLinks[1].textContent = t.navVertical;
        if (navLinks[2]) navLinks[2].textContent = t.navAbout;
        if (navLinks[3]) navLinks[3].textContent = t.navContact;

        const heroKicker = document.querySelector(".hero-kicker");
        const heroTitle = document.querySelector(".hero-title span");
        const heroDescription = document.querySelector(".hero-description");
        const heroButtons = document.querySelectorAll(".hero-buttons .btn");
        const worksLabel = document.querySelector(".scroll-indicator span");
        const aboutHeading = document.querySelector("#about .section-title");
        const footerButtons = document.querySelectorAll(".footer-buttons .btn");

        if (heroKicker) heroKicker.textContent = t.heroKicker;
        if (heroTitle) heroTitle.textContent = t.heroTitle;
        if (heroDescription) heroDescription.textContent = t.heroDescription;
        if (heroButtons[0]) heroButtons[0].textContent = t.heroButtonOne;
        if (heroButtons[1]) heroButtons[1].textContent = t.heroButtonTwo;
        if (worksLabel) worksLabel.textContent = t.worksLabel;
        if (aboutHeading) aboutHeading.innerHTML = `${t.aboutTitle} <span>${t.aboutSubtitle}</span>`;
        if (footerButtons[0]) footerButtons[0].textContent = t.footerTelegram;
        if (footerButtons[1]) footerButtons[1].textContent = t.footerEmail;
    };

    const initVideos = () => {
        videoCards.forEach((card) => {
            const id = card.dataset.videoId;
            const config = VIDEO_LINKS[id];
            const video = card.querySelector(".portfolio-video");
            const label = card.querySelector(".video-label");

            if (config?.label && label) label.textContent = config.label;

            if (!config || !config.src || !video) {
                card.classList.add("video-unavailable");
                return;
            }

            card.classList.remove("video-unavailable");
            video.src = config.src;
            video.load();
        });
    };

    const closeMobileMenu = () => {
        burger.classList.remove("active");
        navMenu.classList.remove("active");
        burger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
    };

    const toggleMobileMenu = () => {
        const opened = burger.classList.toggle("active");
        navMenu.classList.toggle("active", opened);
        burger.setAttribute("aria-expanded", opened ? "true" : "false");
        document.body.style.overflow = opened ? "hidden" : "";
    };

    burger.addEventListener("click", toggleMobileMenu);

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (event) => {
            const targetId = anchor.getAttribute("href");
            if (!targetId || targetId === "#") return;
            const target = document.querySelector(targetId);
            if (!target) return;
            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
            closeMobileMenu();
        });
    });

    document.querySelectorAll('a[href="#contact"]').forEach((anchor) => {
        anchor.addEventListener("click", (event) => {
            event.preventDefault();
            window.open("https://t.me/yrizen0", "_blank", "noopener");
            closeMobileMenu();
        });
    });

    if (langSwitch) {
        langSwitch.addEventListener("click", () => {
            const nextLang = html.lang === "ru" ? "en" : "ru";
            localStorage.setItem("yrizen-lang", nextLang);
            applyLanguage(nextLang);
        });
    }

    window.addEventListener("scroll", () => {
        if (window.scrollY > 8) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            });
        },
        { threshold: 0.14, rootMargin: "0px 0px -30px 0px" }
    );

    revealElements.forEach((el) => revealObserver.observe(el));

    document.querySelectorAll(".faq-item").forEach((item) => {
        const button = item.querySelector(".faq-question");
        button.addEventListener("click", () => {
            const isOpen = item.classList.contains("active");
            document.querySelectorAll(".faq-item.active").forEach((openItem) => {
                openItem.classList.remove("active");
            });
            if (!isOpen) item.classList.add("active");
        });
    });

    const savedLang = localStorage.getItem("yrizen-lang") || "ru";
    applyLanguage(savedLang);
    initVideos();
});
