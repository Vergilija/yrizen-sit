document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("header");
    const burger = document.getElementById("burger-menu");
    const navMenu = document.getElementById("nav-menu");
    const langSwitch = document.getElementById("lang-switch");
    const revealElements = document.querySelectorAll(".reveal");
    const videoCards = document.querySelectorAll(".video-card");
    const html = document.documentElement;

    /*
      Self-hosted videos: быстрые веб-версии лежат в video-web/ и проигрываются обычным HTML <video>.
      Оригиналы из video/ оставлены запасным источником.
      Если позже появятся внешние CDN-ссылки, их можно добавить в primarySrc.
    */
    const VIDEO_LINKS = {
        h1: {
            primarySrc: "video-web/h1.mp4",
            backupSrc: "video/h-1 Говорящая голова (монтаж, заработок).mp4"
        },
        h2: {
            primarySrc: "video-web/h2.mp4",
            backupSrc: "video/h-2 Из аудио файла.mp4"
        },
        v1: {
            primarySrc: "video-web/v1.mp4",
            backupSrc: "video/v-1 2 Энергетик финал полный ред булл Red bull.mp4"
        },
        v2: {
            primarySrc: "video-web/v2.mp4",
            backupSrc: "video/v-2 Америк стиль текст.mp4"
        },
        v3: {
            primarySrc: "video-web/v3.mp4",
            backupSrc: "video/v-3 Научпоп.mp4"
        },
        v4: {
            primarySrc: "video-web/v4.mp4",
            backupSrc: "video/v-4 подборка дорогого монтажа рилс.mp4"
        }
    };

    const translations = {
        ru: {
            switchLabel: "EN",
            switchAria: "Переключить сайт на английский язык",
            menuOpen: "Открыть меню",
            menuClose: "Закрыть меню",
            documentTitle: "Заказать монтаж видео",
            metaDescription: "Заказать монтаж видео у Александра: вертикальные и горизонтальные ролики, интервью, путешествия, говорящая голова и монтаж по записи голоса.",
            metaOgDescription: "Профессиональный монтаж всех видов контента: вертикальные и горизонтальные ролики, интервью, путешествия и говорящая голова.",
            navHorizontal: "Горизонтальные",
            navVertical: "Вертикальные",
            navAbout: "Обо мне",
            navContact: "Связаться",
            heroTitle: "Портфолио",
            heroDescription:
                "Монтирую вертикальные и горизонтальные видео: интервью, путешествия, говорящая голова, экспертные ролики и проекты, где есть только запись голоса.",
            heroButtonOne: "Горизонтальные",
            heroButtonTwo: "Вертикальные",
            worksLabel: "работы",
            portfolioLabel: "Портфолио",
            horizontalTitle: "Горизонтальные видео",
            verticalTitle: "Вертикальные видео",
            videoH1: "Говорящая голова: монтаж и заработок",
            videoH2: "Монтаж из аудиофайла",
            videoV1: "Энергетик Red Bull",
            videoV2: "Американский стиль: текст",
            videoV3: "Научпоп",
            videoV4: "Подборка дорогого монтажа Reels",
            videoUnavailable: "Видео скоро будет добавлено",
            aboutTitle: "Обо мне",
            aboutSubtitle: "Кто стоит за кадром",
            aboutGreeting: "Привет, я Александр",
            aboutParagraphOne:
                "Занимаюсь созданием логичных и структурированных видео, где каждый элемент помогает раскрыть основную идею. В работе опираюсь на темп и ритм, визуальную чистоту и содержательность кадров, чтобы готовый материал вызывал отклик и оставался в памяти.",
            aboutParagraphTwo:
                "Видеомонтаж для меня — это не просто выполнение задач, а по-настоящему близкое увлечение, переросшее в любимое дело. Именно поэтому я глубоко погружаюсь в нюансы каждого заказа и искренне стараюсь подготовить качественный результат, который оправдает ваши ожидания.",
            tagShorts: "Монтаж Reels / Shorts",
            tagYoutube: "YouTube и интервью",
            tagColor: "Цвет и ритм",
            tagBrands: "Контент для брендов",
            faqCostQuestion: "Какая стоимость за видео?",
            faqCostAnswer:
                "Стоимость рассчитывается индивидуально после оценки исходников, задачи и сроков. Напишите мне, и я быстро дам прозрачную смету.",
            faqTimeQuestion: "Какие сроки выполнения?",
            faqTimeAnswer:
                "Варьируются от 1 дня до большого проекта на несколько дней. Точный срок зависит от сложности проекта и объема правок.",
            faqEditsQuestion: "Сколько доступно правок?",
            faqEditsAnswer:
                "В рамках Технического Задания правки бесплатные, но за дополнительные - плата обсуждается в зависимости от объёма и их содержания.",
            footerTitle: "Помогу создать видео-шедевр для вашего проекта",
            footerDescription:
                "Напишите удобным способом: быстро отвечу на любой вопрос по заказу и подскажу оптимальный формат работы.",
            footerTelegram: "Написать в Telegram",
            footerEmail: "Написать Email",
            copyright: "© 2026. Видеомонтаж для брендов, блогеров и бизнеса."
        },
        en: {
            switchLabel: "RU",
            switchAria: "Switch website language to Russian",
            menuOpen: "Open menu",
            menuClose: "Close menu",
            documentTitle: "Order Video Editing",
            metaDescription: "Order video editing from Alexander: vertical and horizontal videos, interviews, travel, talking head videos and voice-recording edits.",
            metaOgDescription: "Professional editing for vertical and horizontal content, interviews, travel and talking head videos.",
            navHorizontal: "Horizontal",
            navVertical: "Vertical",
            navAbout: "About",
            navContact: "Contact",
            heroTitle: "Portfolio",
            heroDescription:
                "I edit vertical and horizontal videos: interviews, travel content, talking head videos, expert content, and projects that only have a voice recording.",
            heroButtonOne: "Horizontal",
            heroButtonTwo: "Vertical",
            worksLabel: "works",
            portfolioLabel: "Portfolio",
            horizontalTitle: "Horizontal videos",
            verticalTitle: "Vertical videos",
            videoH1: "Talking head: editing and income",
            videoH2: "Edit from an audio recording",
            videoV1: "Red Bull energy drink",
            videoV2: "American style: text edit",
            videoV3: "Popular science",
            videoV4: "Premium Reels editing selection",
            videoUnavailable: "Video will be added soon",
            aboutTitle: "About",
            aboutSubtitle: "Who is behind the frame",
            aboutGreeting: "Hi, I am Alexander",
            aboutParagraphOne:
                "I create clear, structured videos where every element helps communicate the central idea. My work relies on pace and rhythm, visual clarity and meaningful shots, so the finished piece resonates and stays memorable.",
            aboutParagraphTwo:
                "Video editing is more than completing tasks for me: it is a genuine passion that became my favourite work. That is why I immerse myself in every project and carefully prepare a result that meets your expectations.",
            tagShorts: "Reels / Shorts editing",
            tagYoutube: "YouTube and interviews",
            tagColor: "Colour and rhythm",
            tagBrands: "Content for brands",
            faqCostQuestion: "How much does a video cost?",
            faqCostAnswer:
                "Pricing is calculated individually after reviewing your material, the task and timeline. Message me and I will quickly provide a clear estimate.",
            faqTimeQuestion: "How long does it take?",
            faqTimeAnswer:
                "Timing varies from one day to several days for a larger project. The exact timeframe depends on project complexity and the scope of revisions.",
            faqEditsQuestion: "How many revisions are available?",
            faqEditsAnswer:
                "Revisions within the technical brief are free. Additional changes are priced separately depending on their scope and content.",
            footerTitle: "I will help create a standout video for your project",
            footerDescription:
                "Message me in the way that suits you: I will quickly answer questions about your order and suggest the best workflow.",
            footerTelegram: "Message on Telegram",
            footerEmail: "Send Email",
            copyright: "© 2026. Video editing for brands, creators and businesses."
        }
    };

    const applyLanguage = (lang) => {
        const t = translations[lang] || translations.ru;
        html.lang = lang;

        document.querySelectorAll("[data-i18n]").forEach((element) => {
            const value = t[element.dataset.i18n];
            if (value) element.textContent = value;
        });

        document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
            const value = t[element.dataset.i18nAria];
            if (value) element.setAttribute("aria-label", value);
        });

        if (langSwitch) {
            langSwitch.textContent = t.switchLabel;
            langSwitch.setAttribute("aria-label", t.switchAria);
        }

        document.title = t.documentTitle;
        document.querySelector('meta[name="description"]')?.setAttribute("content", t.metaDescription);
        document.querySelector('meta[property="og:title"]')?.setAttribute("content", t.documentTitle);
        document.querySelector('meta[property="og:description"]')?.setAttribute("content", t.metaOgDescription);
        document.querySelector('meta[property="og:locale"]')?.setAttribute("content", lang === "en" ? "en_US" : "ru_RU");

        videoCards.forEach((card) => {
            card.querySelector(".video-shell")?.setAttribute("data-unavailable-message", t.videoUnavailable);
        });

        if (burger.getAttribute("aria-expanded") === "true") {
            burger.setAttribute("aria-label", t.menuClose);
        }
    };

    const initVideos = () => {
        videoCards.forEach((card) => {
            const id = card.dataset.videoId;
            const config = VIDEO_LINKS[id];
            const video = card.querySelector(".portfolio-video");

            if (!config || !video) {
                card.classList.add("video-unavailable");
                return;
            }

            const sources = [config.primarySrc, config.backupSrc].filter(Boolean);
            if (!sources.length) {
                card.classList.add("video-unavailable");
                return;
            }

            card.classList.remove("video-unavailable");
            video.preload = "auto";
            video.setAttribute("controlslist", "nodownload noplaybackrate");
            video.setAttribute("disablepictureinpicture", "");
            sources.forEach((src) => {
                const source = document.createElement("source");
                source.src = src;
                source.type = "video/mp4";
                video.appendChild(source);
            });
            video.addEventListener("error", () => card.classList.add("video-unavailable"), { once: true });
            video.load();
        });
    };

    const closeMobileMenu = () => {
        const t = translations[html.lang] || translations.ru;
        burger.classList.remove("active");
        navMenu.classList.remove("active");
        burger.setAttribute("aria-expanded", "false");
        burger.setAttribute("aria-label", t.menuOpen);
        document.body.style.overflow = "";
    };

    const toggleMobileMenu = () => {
        const t = translations[html.lang] || translations.ru;
        const opened = burger.classList.toggle("active");
        navMenu.classList.toggle("active", opened);
        burger.setAttribute("aria-expanded", opened ? "true" : "false");
        burger.setAttribute("aria-label", opened ? t.menuClose : t.menuOpen);
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
