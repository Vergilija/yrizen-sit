document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById('header');
    const burgerMenu = document.getElementById('burger-menu');
    const navMenu = document.getElementById('nav-menu');
    const langSwitch = document.querySelector('.lang-switch');
    const metaDescription = document.querySelector('meta[name="description"]');
    const videoCards = document.querySelectorAll('.video-card');

    /*
      КУДА ЗАГРУЖАТЬ ВИДЕО:
      1) На основной CDN в папку /videos и /posters
      2) На резервный CDN в те же папки (те же имена файлов)

      Пример структуры:
      /videos/showreel-1.m3u8
      /videos/showreel-1.mp4
      /posters/showreel-1.jpg
    */
    const VIDEO_HOSTS = {
        primaryBase: 'https://media.example.com',
        backupBase: 'https://backup-media.example.com'
    };

    const i18n = {
        ru: {
            htmlLang: 'ru',
            pageTitle: 'yrizen — Видеомейкер',
            metaDescription: 'yrizen — Профессиональный монтаж и визуал. Ваши видео будут завораживать.',
            langSwitch: 'EN',
            navWork: 'Работы',
            navResults: 'Результаты',
            navAbout: 'Обо мне',
            contactBtn: 'Связаться',
            hsup: 'монтаж • контент • визуал',
            hhand: 'ваши видео будут',
            glowWord: 'ЗАВОРАЖИВАТЬ',
            heroDesc: 'Создаю выдающийся и уникальный визуал, который запоминается<br>и помогает выйти на новый уровень брендам по всему миру.',
            heroTelegram: 'Написать в Telegram',
            heroEmail: 'Написать Email',
            scroll: 'ЛИСТАЙ',
            workTitle1: 'Портфолио',
            workSub1: 'Горизонтальные видео',
            showreel1: 'Шоурил / YouTube 1',
            showreel2: 'Шоурил / YouTube 2',
            workTitle2: 'Портфолио',
            workSub2: 'Вертикальные работы',
            reels1: 'Reels 1',
            reels2: 'Reels 2',
            reels3: 'Reels 3',
            reels4: 'Reels 4',
            videoUnavailable: 'Видео временно недоступно',
            aboutTitle: 'Обо мне',
            aboutSub: 'Кто стоит за кадром',
            aboutPhoto: 'Фото',
            aboutHello: 'Привет, я yrizen',
            aboutP1: 'Я профессиональный видеомейкер. Моя миссия — не просто склеивать кадры, а создавать истории, которые захватывают дух.',
            aboutP2: 'Я использую кинематографичный подход, трендовый саунд-дизайн и глубокую цветокоррекцию для брендов по всему миру.',
            reviewsTitle: 'Отзывы',
            reviewsSub: 'Что говорят клиенты',
            reviewer1Role: 'Блогер, 1.2M подп.',
            reviewer2Role: 'Бренд одежды',
            review1: '"Это просто отвал башки. Картинка сочная, удержание выросло, аудитория в восторге."',
            review2: '"Сделали рекламный креатив, который окупил себя в 10 раз за первую неделю."',
            faqTitle: 'FAQ',
            faqSub: 'Частые вопросы',
            faqQ1: 'Какая стоимость за видео?',
            faqA1: 'Стоимость индивидуальна и зависит от сложности монтажа, графики, эффектов и длины видео. Напишите мне, чтобы обсудить ваш проект и получить точную цену.',
            faqQ2: 'Какие сроки выполнения?',
            faqA2: 'Средние сроки: 1-3 дня для вертикальных видео (Reels/Shorts) и 5-10 дней для горизонтальных (YouTube). Сроки могут меняться в зависимости от загруженности и сложности проекта.',
            faqQ3: 'В каком формате я получу готовое видео?',
            faqA3: 'Вы получите видео в формате MP4 с разрешением 4K или 1080p, полностью готовое к загрузке на любую платформу.',
            footerTitle: 'Готовы создать шедевр?',
            footerDesc: 'Напишите мне, и мы обсудим ваш будущий проект.',
            footerTelegram: 'Написать в Telegram',
            copyright: '© 2026. Все права защищены.'
        },
        en: {
            htmlLang: 'en',
            pageTitle: 'yrizen — Video Editor',
            metaDescription: 'yrizen — Professional editing and visuals. Your videos will mesmerize.',
            langSwitch: 'RU',
            navWork: 'Works',
            navResults: 'Results',
            navAbout: 'About',
            contactBtn: 'Contact',
            hsup: 'editing • content • visuals',
            hhand: 'your videos will',
            glowWord: 'MESMERIZE',
            heroDesc: 'I create outstanding and unique visuals that stay memorable<br>and help brands worldwide reach the next level.',
            heroTelegram: 'Message on Telegram',
            heroEmail: 'Send Email',
            scroll: 'SCROLL',
            workTitle1: 'Portfolio',
            workSub1: 'Horizontal videos',
            showreel1: 'Showreel / YouTube 1',
            showreel2: 'Showreel / YouTube 2',
            workTitle2: 'Portfolio',
            workSub2: 'Vertical videos',
            reels1: 'Reels 1',
            reels2: 'Reels 2',
            reels3: 'Reels 3',
            reels4: 'Reels 4',
            videoUnavailable: 'Video is temporarily unavailable',
            aboutTitle: 'About me',
            aboutSub: 'Who is behind the frame',
            aboutPhoto: 'Photo',
            aboutHello: 'Hi, I am yrizen',
            aboutP1: 'I am a professional video editor. My mission is not just to cut clips, but to craft stories that truly captivate.',
            aboutP2: 'I use a cinematic approach, trend-driven sound design, and deep color grading for brands worldwide.',
            reviewsTitle: 'Reviews',
            reviewsSub: 'What clients say',
            reviewer1Role: 'Blogger, 1.2M followers',
            reviewer2Role: 'Clothing brand',
            review1: '"It was absolutely mind-blowing. The visuals are rich, retention increased, and the audience loved it."',
            review2: '"We made an ad creative that paid off tenfold in the very first week."',
            faqTitle: 'FAQ',
            faqSub: 'Frequently asked questions',
            faqQ1: 'How much does one video cost?',
            faqA1: 'Pricing is individual and depends on editing complexity, graphics, effects, and video length. Message me to discuss your project and get an exact quote.',
            faqQ2: 'What are the turnaround times?',
            faqA2: 'Typical turnaround: 1-3 days for vertical videos (Reels/Shorts) and 5-10 days for horizontal videos (YouTube). Timelines can vary depending on workload and complexity.',
            faqQ3: 'What format will I receive?',
            faqA3: 'You will receive an MP4 file in 4K or 1080p resolution, fully ready to upload on any platform.',
            footerTitle: 'Ready to create a masterpiece?',
            footerDesc: 'Message me and we will discuss your future project.',
            footerTelegram: 'Message on Telegram',
            copyright: '© 2026. All rights reserved.'
        }
    };

    const normalizeBase = (base) => base.replace(/\/+$/, '');

    const buildVideoSources = (stem) => {
        const primaryBase = normalizeBase(VIDEO_HOSTS.primaryBase);
        const backupBase = normalizeBase(VIDEO_HOSTS.backupBase);
        return [
            { type: 'hls', url: `${primaryBase}/videos/${stem}.m3u8` },
            { type: 'hls', url: `${backupBase}/videos/${stem}.m3u8` },
            { type: 'mp4', url: `${primaryBase}/videos/${stem}.mp4` },
            { type: 'mp4', url: `${backupBase}/videos/${stem}.mp4` }
        ];
    };

    const buildPosterUrl = (stem) => {
        const primaryBase = normalizeBase(VIDEO_HOSTS.primaryBase);
        return `${primaryBase}/posters/${stem}.jpg`;
    };

    const setVideoUnavailable = (card, isUnavailable) => {
        card.classList.toggle('video-unavailable', isUnavailable);
    };

    const initVideoCard = (card) => {
        const stem = card.dataset.videoStem;
        const video = card.querySelector('.portfolio-video');
        if (!stem || !video) return;

        const sourceList = buildVideoSources(stem);
        let hlsInstance = null;

        video.poster = buildPosterUrl(stem);
        video.setAttribute('playsinline', '');
        video.setAttribute('controls', '');

        const destroyHls = () => {
            if (hlsInstance) {
                hlsInstance.destroy();
                hlsInstance = null;
            }
        };

        const cleanupVideoSrc = () => {
            destroyHls();
            video.pause();
            video.removeAttribute('src');
            while (video.firstChild) {
                video.removeChild(video.firstChild);
            }
            video.load();
        };

        const trySource = (index) => {
            if (index >= sourceList.length) {
                setVideoUnavailable(card, true);
                return;
            }

            setVideoUnavailable(card, false);
            cleanupVideoSrc();

            const source = sourceList[index];

            if (source.type === 'hls') {
                if (window.Hls && window.Hls.isSupported()) {
                    hlsInstance = new window.Hls({
                        enableWorker: true,
                        lowLatencyMode: false
                    });
                    hlsInstance.loadSource(source.url);
                    hlsInstance.attachMedia(video);
                    hlsInstance.on(window.Hls.Events.ERROR, (_, data) => {
                        if (data && data.fatal) {
                            trySource(index + 1);
                        }
                    });
                    return;
                }

                if (video.canPlayType('application/vnd.apple.mpegurl')) {
                    const onError = () => trySource(index + 1);
                    video.addEventListener('error', onError, { once: true });
                    video.src = source.url;
                    video.load();
                    return;
                }

                trySource(index + 1);
                return;
            }

            const fallbackSource = document.createElement('source');
            fallbackSource.src = source.url;
            fallbackSource.type = 'video/mp4';
            video.appendChild(fallbackSource);
            video.addEventListener('error', () => trySource(index + 1), { once: true });
            video.load();
        };

        trySource(0);
    };

    const initPortfolioVideos = () => {
        videoCards.forEach((card) => {
            initVideoCard(card);
        });
    };

    const applyLanguage = (lang) => {
        const t = i18n[lang] || i18n.ru;
        document.documentElement.lang = t.htmlLang;
        document.title = t.pageTitle;
        if (metaDescription) {
            metaDescription.setAttribute('content', t.metaDescription);
        }

        const navLinks = document.querySelectorAll('.nav-menu .nav-link');
        if (navLinks[0]) navLinks[0].textContent = t.navWork;
        if (navLinks[1]) navLinks[1].textContent = t.navResults;
        if (navLinks[2]) navLinks[2].textContent = t.navAbout;
        if (langSwitch) langSwitch.textContent = t.langSwitch;

        const contactBtn = document.querySelector('.header-right .btn-accent');
        if (contactBtn) contactBtn.textContent = t.contactBtn;

        const hsup = document.querySelector('.hsup');
        const hhand = document.querySelector('.hhand');
        const heroDesc = document.querySelector('.hero .desc');
        const glowLayers = document.querySelectorAll('.gw-blur, .gw-sharp, .gw-text');
        if (hsup) hsup.textContent = t.hsup;
        if (hhand) hhand.textContent = t.hhand;
        glowLayers.forEach((layer) => {
            layer.textContent = t.glowWord;
        });
        if (heroDesc) heroDesc.innerHTML = t.heroDesc;

        const heroButtons = document.querySelectorAll('.hero-buttons .btn');
        if (heroButtons[0]) heroButtons[0].lastChild.textContent = ` ${t.heroTelegram}`;
        if (heroButtons[1]) heroButtons[1].lastChild.textContent = ` ${t.heroEmail}`;

        const scrollLabel = document.querySelector('.scroll-indicator span');
        if (scrollLabel) scrollLabel.textContent = t.scroll;

        const sectionTitles = document.querySelectorAll('.section-title');
        if (sectionTitles[0]) sectionTitles[0].innerHTML = `${t.workTitle1} <br><span>${t.workSub1}</span>`;
        if (sectionTitles[1]) sectionTitles[1].innerHTML = `${t.workTitle2} <br><span>${t.workSub2}</span>`;
        if (sectionTitles[2]) sectionTitles[2].innerHTML = `${t.aboutTitle} <br><span>${t.aboutSub}</span>`;
        if (sectionTitles[3]) sectionTitles[3].innerHTML = `${t.reviewsTitle} <br><span>${t.reviewsSub}</span>`;
        if (sectionTitles[4]) sectionTitles[4].innerHTML = `${t.faqTitle} <br><span>${t.faqSub}</span>`;

        const videoLabels = {
            showreel1: t.showreel1,
            showreel2: t.showreel2,
            reels1: t.reels1,
            reels2: t.reels2,
            reels3: t.reels3,
            reels4: t.reels4
        };
        videoCards.forEach((card) => {
            const key = card.dataset.videoKey;
            const label = card.querySelector('.video-label');
            if (label && key && videoLabels[key]) {
                label.textContent = videoLabels[key];
            }
            card.dataset.videoError = t.videoUnavailable;
        });

        const aboutPhoto = document.querySelector('.about-photo');
        const aboutHello = document.querySelector('.about-text h3');
        const aboutParagraphs = document.querySelectorAll('.about-text p');
        if (aboutPhoto) aboutPhoto.textContent = t.aboutPhoto;
        if (aboutHello) aboutHello.textContent = t.aboutHello;
        if (aboutParagraphs[0]) aboutParagraphs[0].textContent = t.aboutP1;
        if (aboutParagraphs[1]) aboutParagraphs[1].textContent = t.aboutP2;

        const reviewHeaders = document.querySelectorAll('.review-header div span');
        const reviewTexts = document.querySelectorAll('.review-card p');
        if (reviewHeaders[0]) reviewHeaders[0].textContent = t.reviewer1Role;
        if (reviewHeaders[1]) reviewHeaders[1].textContent = t.reviewer2Role;
        if (reviewTexts[0]) reviewTexts[0].textContent = t.review1;
        if (reviewTexts[1]) reviewTexts[1].textContent = t.review2;

        const faqQuestions = document.querySelectorAll('.faq-question');
        const faqAnswers = document.querySelectorAll('.faq-answer p');
        if (faqQuestions[0]) faqQuestions[0].innerHTML = `${t.faqQ1} <span class="icon">+</span>`;
        if (faqQuestions[1]) faqQuestions[1].innerHTML = `${t.faqQ2} <span class="icon">+</span>`;
        if (faqQuestions[2]) faqQuestions[2].innerHTML = `${t.faqQ3} <span class="icon">+</span>`;
        if (faqAnswers[0]) faqAnswers[0].textContent = t.faqA1;
        if (faqAnswers[1]) faqAnswers[1].textContent = t.faqA2;
        if (faqAnswers[2]) faqAnswers[2].textContent = t.faqA3;

        const footerTitle = document.querySelector('.footer-title');
        const footerDesc = document.querySelector('.footer-desc');
        const footerTelegram = document.querySelector('.footer-buttons .btn-accent');
        const copyright = document.querySelector('.copyright');
        if (footerTitle) footerTitle.textContent = t.footerTitle;
        if (footerDesc) footerDesc.textContent = t.footerDesc;
        if (footerTelegram) footerTelegram.lastChild.textContent = ` ${t.footerTelegram}`;
        if (copyright) copyright.textContent = t.copyright;
    };

    const savedLang = localStorage.getItem('site-lang');
    applyLanguage(savedLang === 'en' ? 'en' : 'ru');
    initPortfolioVideos();

    // 1. ЛОГИКА "УМНОЙ" ШАПКИ
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. ЛОГИКА АНИМАЦИИ ПОЯВЛЕНИЯ ЭЛЕМЕНТОВ
    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px"
    };
    const observer = new IntersectionObserver((entries, observerRef) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observerRef.unobserve(entry.target);
            }
        });
    }, appearOptions);
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // 3. ЛОГИКА FAQ (АККОРДЕОН)
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.faq-item.active');
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
            }
            item.classList.toggle('active');
        });
    });

    // 4. ПЛАВНЫЙ СКРОЛЛ К ЯКОРЯМ
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.classList.contains('lang-switch')) {
                e.preventDefault();
                const nextLang = document.documentElement.lang === 'ru' ? 'en' : 'ru';
                localStorage.setItem('site-lang', nextLang);
                applyLanguage(nextLang);
                return;
            }

            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // 5. ЛОГИКА БУРГЕР-МЕНЮ (для мобильных)
    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                burgerMenu.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
});
