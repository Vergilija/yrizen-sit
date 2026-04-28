document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("header");
    const burger = document.getElementById("burger-menu");
    const navMenu = document.getElementById("nav-menu");
    const revealElements = document.querySelectorAll(".reveal");
    const videoCards = document.querySelectorAll(".video-card");

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

    initVideos();
});
