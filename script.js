document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("header");
    const burger = document.getElementById("burger-menu");
    const navMenu = document.getElementById("nav-menu");
    const langSwitch = document.getElementById("lang-switch");
    const revealElements = document.querySelectorAll(".reveal");
    const videoCards = document.querySelectorAll(".video-card");
    const html = document.documentElement;
    const heroTitle = document.querySelector(".hero-title");
    const heroTitleImages = document.querySelectorAll(".hero-title-image");

    /*
      Self-hosted videos: быстрые веб-версии лежат в video-web/ и проигрываются обычным HTML <video>.
      Оригиналы из video/ оставлены запасным источником.
      Если позже появятся внешние CDN-ссылки, их можно добавить в primarySrc.
    */
    const VIDEO_LINKS = {
        h1: {
            poster: "assets/posters/h1.jpg",
            primarySrc: "video-web/h1.mp4",
            backupSrc: "video/h-1 Говорящая голова (монтаж, заработок).mp4"
        },
        h2: {
            poster: "assets/posters/h2.jpg",
            primarySrc: "video-web/h2.mp4",
            backupSrc: "video/h-2 Из аудио файла.mp4"
        },
        v1: {
            poster: "assets/posters/v1.jpg",
            primarySrc: "video-web/v1.mp4",
            backupSrc: "video/v-1 2 Энергетик финал полный ред булл Red bull.mp4"
        },
        v2: {
            poster: "assets/posters/v2.jpg",
            primarySrc: "video-web/v2.mp4",
            backupSrc: "video/v-2 Америк стиль текст.mp4"
        },
        v3: {
            poster: "assets/posters/v3.jpg",
            primarySrc: "video-web/v3.mp4",
            backupSrc: "video/v-3 Научпоп.mp4"
        },
        v4: {
            poster: "assets/posters/v4.jpg",
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
            prevVideo: "Предыдущее видео",
            nextVideo: "Следующее видео",
            verticalCarousel: "Карусель вертикальных видео",
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
            prevVideo: "Previous video",
            nextVideo: "Next video",
            verticalCarousel: "Vertical videos carousel",
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

        updateHeroTitleFallback();
    };

    const updateHeroTitleFallback = () => {
        if (!heroTitle) return;
        const activeImage = document.querySelector(`.hero-title-image-${html.lang}`);
        const imageFailed = Boolean(activeImage?.dataset.failed) || Boolean(activeImage?.complete && activeImage.naturalWidth === 0);
        heroTitle.classList.toggle("is-image-fallback", imageFailed);
    };

    heroTitleImages.forEach((image) => {
        image.addEventListener("error", () => {
            image.dataset.failed = "true";
            updateHeroTitleFallback();
        });
        image.addEventListener("load", () => {
            delete image.dataset.failed;
            updateHeroTitleFallback();
        });
    });

    const initVideos = () => {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        const saveData = Boolean(connection?.saveData);
        const slowConnection = /(^|-)2g$/.test(connection?.effectiveType || "");
        const shouldBackgroundWarm = !saveData && !slowConnection;
        const warmDelay = slowConnection ? 1200 : 420;
        const warmRootMargin = shouldBackgroundWarm ? "900px 0px" : "360px 0px";
        const videoEntries = [];
        const verticalCarousel = document.querySelector('[data-carousel="vertical"]');
        const verticalScroller = verticalCarousel?.querySelector(".vertical-grid");
        const verticalPrev = verticalCarousel?.querySelector("[data-carousel-prev]");
        const verticalNext = verticalCarousel?.querySelector("[data-carousel-next]");
        const heavyVideoIds = new Set(["v3"]);

        const runWhenIdle = (callback, timeout = 1200) => {
            if ("requestIdleCallback" in window) {
                window.requestIdleCallback(callback, { timeout });
                return;
            }
            window.setTimeout(callback, Math.min(timeout, 700));
        };

        const warmLevels = {
            none: 0,
            metadata: 1,
            auto: 2
        };

        const warmVideo = (entry, preload = "auto") => {
            if (entry.started) return;
            const currentLevel = warmLevels[entry.warmLevel] || warmLevels.none;
            const nextLevel = warmLevels[preload] || warmLevels.auto;
            if (currentLevel >= nextLevel) return;
            entry.warmLevel = preload;
            entry.warmed = preload === "auto";
            entry.video.preload = preload;
            entry.video.load();
        };

        const warmQueue = (entries, index = 0, preload = "metadata") => {
            if (index >= entries.length) return;
            const entry = entries[index];
            if (!entry || (preload !== "auto" && heavyVideoIds.has(entry.id))) {
                warmQueue(entries, index + 1, preload);
                return;
            }
            runWhenIdle(() => {
                warmVideo(entry, preload);
                window.setTimeout(() => warmQueue(entries, index + 1, preload), warmDelay);
            });
        };

        const pauseOtherVideos = (currentEntry) => {
            videoEntries.forEach((entry) => {
                if (entry === currentEntry || entry.video.paused) return;
                entry.video.pause();
            });
        };

        const pauseHiddenVideos = () => {
            videoEntries.forEach((entry) => {
                if (entry.video.paused) return;
                const rect = entry.video.getBoundingClientRect();
                const isHidden =
                    rect.bottom <= 0 ||
                    rect.top >= window.innerHeight ||
                    rect.right <= 0 ||
                    rect.left >= window.innerWidth;
                if (isHidden) entry.video.pause();
            });
        };

        const getVerticalEntries = () => videoEntries.filter((entry) => entry.card.dataset.videoType === "vertical");

        const getActiveVerticalIndex = () => {
            const entries = getVerticalEntries();
            if (!entries.length || !verticalScroller) return 0;

            const scrollerCenter = verticalScroller.scrollLeft + verticalScroller.clientWidth / 2;
            let activeIndex = 0;
            let nearestDistance = Infinity;

            entries.forEach((entry, index) => {
                const cardCenter = entry.card.offsetLeft + entry.card.offsetWidth / 2;
                const distance = Math.abs(cardCenter - scrollerCenter);
                if (distance < nearestDistance) {
                    nearestDistance = distance;
                    activeIndex = index;
                }
            });

            return activeIndex;
        };

        const warmVerticalAhead = (index) => {
            const entries = getVerticalEntries();
            const nextEntry = entries[index];
            if (nextEntry) warmVideo(nextEntry, "auto");
            warmQueue(entries.slice(index + 1), 0, "metadata");
        };

        const updateVerticalCarousel = () => {
            if (!verticalScroller) return;

            const entries = getVerticalEntries();
            const activeIndex = getActiveVerticalIndex();

            entries.forEach((entry, index) => {
                const isActive = index === activeIndex;
                entry.card.classList.toggle("is-active", isActive);
                entry.video.controls = isActive;
                entry.video.tabIndex = isActive ? 0 : -1;
                if (!isActive && !entry.video.paused) entry.video.pause();
            });

            if (verticalPrev) verticalPrev.classList.toggle("is-disabled", activeIndex === 0);
            if (verticalNext) verticalNext.classList.toggle("is-disabled", activeIndex >= entries.length - 1);
        };

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
            video.preload = "none";
            if (config.poster) video.poster = config.poster;
            video.setAttribute("controlslist", "nodownload noplaybackrate");
            video.setAttribute("disablepictureinpicture", "");
            sources.forEach((src) => {
                const source = document.createElement("source");
                source.src = src;
                source.type = "video/mp4";
                video.appendChild(source);
            });
            video.addEventListener("error", () => card.classList.add("video-unavailable"), { once: true });
            const entry = {
                card,
                id,
                video,
                warmed: false,
                warmLevel: "none",
                started: false
            };
            video.addEventListener("play", () => {
                entry.started = true;
                entry.warmLevel = "auto";
                pauseOtherVideos(entry);
            });
            video.addEventListener("loadedmetadata", () => {
                card.classList.add("video-ready");
            }, { once: true });
            video.addEventListener("pointerenter", () => warmVideo(entry, "auto"), { passive: true });
            video.addEventListener("pointerdown", () => warmVideo(entry, "auto"), { passive: true });
            video.addEventListener("touchstart", () => warmVideo(entry, "auto"), { passive: true });
            video.addEventListener("focus", () => warmVideo(entry, "auto"));
            videoEntries.push(entry);
        });

        if (!videoEntries.length) return;

        const proximityObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((observerEntry) => {
                    if (!observerEntry.isIntersecting) return;
                    const videoEntry = videoEntries.find((entry) => entry.card === observerEntry.target);
                    if (videoEntry) warmVideo(videoEntry);
                    proximityObserver.unobserve(observerEntry.target);
                });
            },
            { rootMargin: warmRootMargin, threshold: 0.01 }
        );

        videoEntries
            .filter((entry) => entry.card.dataset.videoType !== "vertical")
            .forEach((entry) => proximityObserver.observe(entry.card));

        const viewportObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((observerEntry) => {
                    if (observerEntry.isIntersecting) return;
                    const videoEntry = videoEntries.find((entry) => entry.video === observerEntry.target);
                    if (videoEntry && !videoEntry.video.paused) videoEntry.video.pause();
                });
            },
            { threshold: 0 }
        );

        videoEntries.forEach((entry) => viewportObserver.observe(entry.video));
        window.addEventListener("scroll", pauseHiddenVideos, { passive: true });
        window.addEventListener("resize", pauseHiddenVideos);

        const verticalEntries = getVerticalEntries();
        if (verticalEntries.length) {
            verticalEntries[0].card.classList.add("is-active");
            verticalCarousel?.classList.add("hint");
            warmVideo(verticalEntries[0], "auto");
            window.setTimeout(() => warmVerticalAhead(1), warmDelay);
        }

        if (shouldBackgroundWarm) {
            const firstHorizontalEntry = videoEntries.find((entry) => entry.id === "h1");
            const priorityEntries = [
                ...videoEntries.filter((entry) => entry.card.dataset.videoType === "horizontal")
            ];

            if (firstHorizontalEntry) {
                window.setTimeout(() => warmVideo(firstHorizontalEntry, "auto"), 320);
            }
            window.setTimeout(() => warmQueue(priorityEntries, 0, "metadata"), 900);
        }

        if (verticalScroller && verticalEntries.length) {
            let scrollTimer;
            verticalScroller.addEventListener("scroll", () => {
                window.clearTimeout(scrollTimer);
                updateVerticalCarousel();
                scrollTimer = window.setTimeout(() => {
                    const activeIndex = getActiveVerticalIndex();
                    warmVideo(verticalEntries[activeIndex], "auto");
                    warmVerticalAhead(activeIndex + 1);
                    verticalCarousel?.classList.remove("hint");
                }, 140);
            }, { passive: true });

            verticalScroller.addEventListener("pointerdown", () => {
                verticalCarousel?.classList.remove("hint");
            }, { passive: true });

            const scrollToVertical = (direction) => {
                const activeIndex = getActiveVerticalIndex();
                const nextIndex = Math.max(0, Math.min(verticalEntries.length - 1, activeIndex + direction));
                verticalEntries[nextIndex].card.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
                warmVideo(verticalEntries[nextIndex], "auto");
                warmVerticalAhead(nextIndex + 1);
                verticalCarousel?.classList.remove("hint");
            };

            verticalPrev?.addEventListener("click", () => scrollToVertical(-1));
            verticalNext?.addEventListener("click", () => scrollToVertical(1));
            updateVerticalCarousel();
        }
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
