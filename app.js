/**
 * Houston Community Hub - Main Application Logic
 * Implements SPA navigation, search/filter, favorites, toasts, accessibility, and more.
 */

document.addEventListener('DOMContentLoaded', () => {
    initApp();

    // Register Service Worker for PWA
    // Register Service Worker for PWA (Only if served via HTTP/HTTPS)
    if ('serviceWorker' in navigator && (window.location.protocol === 'http:' || window.location.protocol === 'https:')) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('sw.js')
                .then(registration => {
                    console.log('Hub: ServiceWorker registration successful');
                }, err => {
                    console.log('Hub: ServiceWorker registration failed: ', err);
                });
        });
    } else if (window.location.protocol === 'file:') {
        console.log('Hub: PWA ServiceWorker skipped on file protocol (requires local server).');
    }
});

function initApp() {
    console.log('Hub: initApp started');
    // ===== HELPER: SAFE JSON PARSE =====
    const safeParse = (key, fallback) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : fallback;
        } catch (e) {
            console.error(`Error parsing ${key} from localStorage`, e);
            return fallback;
        }
    };

    // ===== STATE MANAGEMENT =====
    const state = {
        resources: safeParse('resources', initialResources),
        petitions: safeParse('petitions', initialPetitions),
        favorites: safeParse('favorites', []),
        recentlyViewed: safeParse('recentlyViewed', []),
        currentView: 'directory',
        filters: {
            search: '',
            category: ['All'],
            openNow: false,
            maxDistance: 0
        },
        theme: localStorage.getItem('theme') || 'light',
        fontSize: localStorage.getItem('fontSize') || 'normal',
        contrast: localStorage.getItem('contrast') || 'normal',
        language: localStorage.getItem('language') || 'en',

        carouselIndex: 0
    };

    // ===== DOM ELEMENTS =====
    const contentDisplay = document.getElementById('content-display');
    const navLinks = document.querySelectorAll('.nav-links a, .sidebar-links a, .bottom-nav-items a');
    const themeToggle = document.getElementById('theme-toggle');
    // rootSearch is now dynamically rendered in directory section
    const logo = document.querySelector('.logo');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const sidebar = document.getElementById('mobile-sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const closeSidebar = document.querySelector('.close-sidebar');
    const backToTopBtn = document.getElementById('back-to-top');
    const toastContainer = document.getElementById('toast-container');
    const a11yToggle = document.getElementById('a11y-toggle');
    const a11yPanel = document.getElementById('a11y-panel');
    const langToggle = document.getElementById('lang-toggle');
    const langDropdown = document.getElementById('lang-dropdown');
    const modal = document.getElementById('modal-container');
    const modalBody = document.getElementById('modal-body');
    const suggestBtn = document.getElementById('suggest-resource-btn');
    const partnerBtn = document.getElementById('partner-inquiry-btn');
    const closeModalBtn = document.querySelector('.close-modal');
    const sidebarSuggestBtn = document.getElementById('sidebar-suggest');
    const toggleScrollLock = (lock) => {
        if (lock) document.body.classList.add('no-scroll');
        else document.body.classList.remove('no-scroll');
    };

    const openModal = (contentHtml) => {
        if (!modal || !modalBody) return;
        modalBody.innerHTML = contentHtml;
        modal.classList.remove('hidden');
        modal.classList.add('active');
        toggleScrollLock(true);
    };

    const closeModal = () => {
        if (!modal) return;
        modal.classList.remove('active');
        modal.classList.add('hidden');
        toggleScrollLock(false);
    };

    // Attach Modal Listeners immediately for robustness
    console.log('Hub: Initializing Modal Listeners');
    const handleSuggestClick = (e) => {
        if (e) e.preventDefault();
        console.log('Hub: Suggest button/link clicked');
        showSuggestModal();
    };

    if (suggestBtn) suggestBtn.addEventListener('click', handleSuggestClick);
    if (sidebarSuggestBtn) sidebarSuggestBtn.addEventListener('click', handleSuggestClick);

    partnerBtn?.addEventListener('click', () => {
        console.log('Hub: Partner button clicked');
        showPartnerModal();
    });
    closeModalBtn?.addEventListener('click', () => {
        console.log('Hub: Close button clicked');
        closeModal();
    });

    // ===== TOAST NOTIFICATION SYSTEM =====
    function showToast(message, type = 'info', duration = 3000) {
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-times-circle',
            info: 'fa-info-circle',
            warning: 'fa-exclamation-triangle'
        };

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `<i class="fas ${icons[type]}"></i><span>${message}</span>`;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('toast-exit');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }

    // ===== BACK TO TOP =====
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn?.classList.add('visible');
        } else {
            backToTopBtn?.classList.remove('visible');
        }
    });

    backToTopBtn?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===== ACCESSIBILITY WIDGET =====
    a11yToggle?.addEventListener('click', () => {
        a11yPanel?.classList.toggle('active');
    });

    document.querySelectorAll('.a11y-btn[data-size]').forEach(btn => {
        btn.addEventListener('click', () => {
            const size = btn.dataset.size;
            state.fontSize = size;
            document.documentElement.setAttribute('data-font-size', size);
            localStorage.setItem('fontSize', size);
            document.querySelectorAll('.a11y-btn[data-size]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            showToast('Font size updated', 'success');
        });
    });

    document.querySelectorAll('.a11y-btn[data-contrast]').forEach(btn => {
        btn.addEventListener('click', () => {
            const contrast = btn.dataset.contrast;
            state.contrast = contrast;
            document.documentElement.setAttribute('data-contrast', contrast);
            localStorage.setItem('contrast', contrast);
            document.querySelectorAll('.a11y-btn[data-contrast]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            showToast('Contrast mode updated', 'success');
        });
    });

    // Initialize accessibility settings
    console.log('Hub: Initializing accessibility');
    document.documentElement.setAttribute('data-font-size', state.fontSize);
    document.documentElement.setAttribute('data-contrast', state.contrast);



    // ===== LANGUAGE SELECTOR =====
    langToggle?.addEventListener('click', () => {
        langDropdown?.classList.toggle('active');
    });

    document.querySelectorAll('.lang-option').forEach(option => {
        option.addEventListener('click', () => {
            const lang = option.dataset.lang;
            state.language = lang;
            localStorage.setItem('language', lang);
            if (langToggle) langToggle.innerHTML = `<i class="fas fa-globe"></i> ${lang.toUpperCase()}`;
            langDropdown?.classList.remove('active');
            showToast(lang === 'es' ? '¡Idioma cambiado a Español!' : 'Language changed to English!', 'success');
            // Update UI text would go here for full implementation
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.lang-selector')) {
            langDropdown?.classList.remove('active');
        }
        if (!e.target.closest('.a11y-widget')) {
            a11yPanel?.classList.remove('active');
        }
    });

    // ===== SIDEBAR LOGIC =====
    const toggleSidebar = () => {
        sidebar?.classList.toggle('active');
        sidebarOverlay?.classList.toggle('active');
    };

    mobileMenuBtn?.addEventListener('click', toggleSidebar);
    sidebarOverlay?.addEventListener('click', toggleSidebar);
    closeSidebar?.addEventListener('click', toggleSidebar);

    // Sidebar suggest button
    document.getElementById('sidebar-suggest')?.addEventListener('click', (e) => {
        e.preventDefault();
        toggleSidebar();
        showSuggestModal();
    });

    // ===== SIDEBAR TABS =====
    const sidebarTabs = document.querySelectorAll('.sidebar-tab');
    const sidebarNavigationContent = document.getElementById('sidebar-navigation');
    const sidebarSettingsContent = document.getElementById('sidebar-settings');

    sidebarTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            sidebarTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const tabName = tab.dataset.tab;
            if (tabName === 'navigation') {
                sidebarNavigationContent.classList.remove('hidden');
                sidebarSettingsContent.classList.add('hidden');
            } else if (tabName === 'settings') {
                sidebarNavigationContent.classList.add('hidden');
                sidebarSettingsContent.classList.remove('hidden');
            }
        });
    });

    // ===== SIDEBAR SETTINGS FUNCTIONALITY =====
    // Theme options in sidebar
    const themeOptions = document.querySelectorAll('.theme-option');
    const updateThemeButtons = () => {
        themeOptions.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === state.theme);
        });
    };
    updateThemeButtons();

    themeOptions.forEach(btn => {
        btn.addEventListener('click', () => {
            state.theme = btn.dataset.theme;
            document.body.setAttribute('data-theme', state.theme);
            localStorage.setItem('theme', state.theme);
            updateThemeIcon();
            updateThemeButtons();
            showToast(`${state.theme === 'dark' ? 'Dark' : 'Light'} mode enabled`, 'info');
        });
    });

    // Font size options in sidebar
    const sizeOptions = document.querySelectorAll('.size-option');
    const updateSizeButtons = () => {
        sizeOptions.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.size === state.fontSize);
        });
    };
    updateSizeButtons();

    sizeOptions.forEach(btn => {
        btn.addEventListener('click', () => {
            state.fontSize = btn.dataset.size;
            document.documentElement.setAttribute('data-font-size', state.fontSize);
            localStorage.setItem('fontSize', state.fontSize);
            updateSizeButtons();
            showToast('Font size updated', 'success');
        });
    });

    // Contrast options in sidebar
    const contrastOptions = document.querySelectorAll('.contrast-option');
    const updateContrastButtons = () => {
        contrastOptions.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.contrast === state.contrast);
        });
    };
    updateContrastButtons();

    contrastOptions.forEach(btn => {
        btn.addEventListener('click', () => {
            state.contrast = btn.dataset.contrast;
            document.documentElement.setAttribute('data-contrast', state.contrast);
            localStorage.setItem('contrast', state.contrast);
            updateContrastButtons();
            showToast('Contrast mode updated', 'success');
        });
    });

    // Language options in sidebar
    const langOptionBtns = document.querySelectorAll('.lang-option-btn');
    const updateLangButtons = () => {
        langOptionBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === state.language);
        });
    };
    updateLangButtons();

    // ===== TRANSLATION LOGIC =====
    const updateLanguage = (lang) => {
        // Update static text elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });

        // Update placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[lang] && translations[lang][key]) {
                el.placeholder = translations[lang][key];
            }
        });

        // Update aria-labels
        document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
            const key = el.getAttribute('data-i18n-aria-label');
            if (translations[lang] && translations[lang][key]) {
                el.setAttribute('aria-label', translations[lang][key]);
            }
        });

        // Update document direction if needed (for RTL languages, though not applicable here yet)
        // Update document direction if needed (for RTL languages, though not applicable here yet)
        document.documentElement.lang = lang;

        // Re-render current view to translate dynamic content
        renderSection(state.currentView);
        // Force update of nav links to ensure they get localized too if needed
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });
    };

    // Initial translation apply
    updateLanguage(state.language);

    langOptionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            state.language = btn.dataset.lang;
            localStorage.setItem('language', state.language);

            if (langToggle) {
                langToggle.innerHTML = `<i class="fas fa-globe"></i> ${state.language.toUpperCase()}`;
            }

            updateLangButtons();
            updateLanguage(state.language);

            showToast(state.language === 'es' ? '¡Idioma cambiado a Español!' : 'Language changed to English!', 'success');
        });
    });

    // Clear data button
    document.getElementById('clear-data-btn')?.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear all saved data? This will reset favorites, recently viewed, and all settings.')) {
            localStorage.clear();
            state.favorites = [];
            state.recentlyViewed = [];
            state.theme = 'light';
            state.fontSize = 'normal';
            state.contrast = 'normal';
            state.language = 'en';

            document.body.setAttribute('data-theme', 'light');
            document.documentElement.setAttribute('data-font-size', 'normal');
            document.documentElement.setAttribute('data-contrast', 'normal');

            updateThemeIcon();
            updateThemeButtons();
            updateSizeButtons();
            updateContrastButtons();
            updateLangButtons();

            showToast('All data has been cleared!', 'success');
            toggleSidebar();
            renderSection(state.currentView);
        }
    });

    // ===== LOGO CLICK =====
    logo?.addEventListener('click', () => {
        state.filters.search = '';
        state.filters.category = 'All';
        state.filters.openNow = false;
        rootSearch.value = '';
        window.location.hash = '#directory';
        renderDirectory();
    });

    logo.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') logo.click();
    });

    // ===== THEME TOGGLE =====
    document.body.setAttribute('data-theme', state.theme);
    updateThemeIcon();

    themeToggle?.addEventListener('click', () => {
        state.theme = state.theme === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', state.theme);
        localStorage.setItem('theme', state.theme);
        updateThemeIcon();
        showToast(`${state.theme === 'dark' ? 'Dark' : 'Light'} mode enabled`, 'info');
    });

    function updateThemeIcon() {
        if (!themeToggle) return;
        const icon = themeToggle.querySelector('i');
        if (icon) icon.className = state.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // ===== NAVIGATION =====
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.replace('#', '') || 'directory';
        renderSection(hash);
        updateActiveNav(hash);
        window.scrollTo({ top: 0, behavior: 'instant' });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (sidebar.classList.contains('active')) toggleSidebar();
        });
    });

    function updateActiveNav(section) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${section}`) {
                link.classList.add('active');
            }
        });
    }

    // ===== HELPER FUNCTIONS =====
    function isOpenNow(hoursStr) {
        if (!hoursStr || hoursStr === '24/7' || hoursStr.includes('24/7')) return true;

        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const currentTime = currentHour * 60 + currentMinute;

        // Parse hours like "8:00 AM - 6:00 PM"
        const match = hoursStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)\s*-\s*(\d{1,2}):(\d{2})\s*(AM|PM)/i);
        if (!match) return true; // If can't parse, assume open

        let openHour = parseInt(match[1]);
        const openMin = parseInt(match[2]);
        const openPeriod = match[3].toUpperCase();
        let closeHour = parseInt(match[4]);
        const closeMin = parseInt(match[5]);
        const closePeriod = match[6].toUpperCase();

        if (openPeriod === 'PM' && openHour !== 12) openHour += 12;
        if (openPeriod === 'AM' && openHour === 12) openHour = 0;
        if (closePeriod === 'PM' && closeHour !== 12) closeHour += 12;
        if (closePeriod === 'AM' && closeHour === 12) closeHour = 0;

        const openTime = openHour * 60 + openMin;
        const closeTime = closeHour * 60 + closeMin;

        return currentTime >= openTime && currentTime <= closeTime;
    }

    function toggleFavorite(id) {
        const index = state.favorites.indexOf(id);
        if (index > -1) {
            state.favorites.splice(index, 1);
            showToast('Removed from favorites', 'info');
        } else {
            state.favorites.push(id);
            showToast('Added to favorites!', 'success');
        }
        localStorage.setItem('favorites', JSON.stringify(state.favorites));
    }

    function addToRecentlyViewed(resource) {
        state.recentlyViewed = state.recentlyViewed.filter(r => r.id !== resource.id);
        state.recentlyViewed.unshift({ id: resource.id, name: resource.name, category: resource.category });
        if (state.recentlyViewed.length > 5) state.recentlyViewed.pop();
        localStorage.setItem('recentlyViewed', JSON.stringify(state.recentlyViewed));
    }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('Link copied to clipboard!', 'success');
        });
    }

    function createConfetti() {
        const colors = ['#00796b', '#ff7043', '#10b981', '#f59e0b', '#ef4444'];
        const container = document.querySelector('.success-overlay') || document.body;

        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-20px';
            confetti.style.zIndex = '9999';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            document.body.appendChild(confetti);

            const animation = confetti.animate([
                { transform: `translate3d(0, 0, 0) rotate(0deg)`, opacity: 1 },
                { transform: `translate3d(${Math.random() * 100 - 50}px, 100vh, 0) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: Math.random() * 2000 + 3000,
                easing: 'cubic-bezier(0, .9, .57, 1)',
                delay: Math.random() * 1000
            });

            animation.onfinish = () => confetti.remove();
        }
    }

    // ===== RENDER INITIAL SECTION =====
    console.log('Hub: Rendering initial section', state.currentView);
    const initialHash = window.location.hash.replace('#', '') || 'directory';
    renderSection(initialHash);
    console.log('Hub: initApp finished successfully');
    updateActiveNav(initialHash);



    // ===== RENDER FUNCTIONS =====
    function renderSection(section) {
        contentDisplay.innerHTML = '';
        state.currentView = section;

        // Show hero only on directory page (using body class for CSS control)
        if (section === 'directory') {
            document.body.classList.remove('hide-hero');
        } else {
            document.body.classList.add('hide-hero');
        }

        switch (section) {

            case 'directory':
                renderDirectory();

                break;
            case 'featured':
                renderFeatured();
                break;
            case 'calendar':
                renderCalendar();
                break;
            case 'support':
                renderSupport();
                break;
            case 'petitions':
                renderPetitions();
                break;
            case 'favorites':
                renderFavorites();
                break;
            default:
                renderDirectory();
        }
    }

    // ===== DIRECTORY =====
    function renderDirectory() {
        const categories = ['All', 'Food Security', 'Recreation', 'Community Centers', 'Support Services', 'Youth Programs', 'Immigration Services', 'Disability Services', 'Education', 'Job Training', 'Senior Services'];
        const t = translations[state.language];

        const categoryCounts = {};
        categories.forEach(cat => {
            if (cat === 'All') {
                categoryCounts[cat] = state.resources.length;
            } else {
                categoryCounts[cat] = state.resources.filter(r => r.category === cat).length;
            }
        });

        contentDisplay.innerHTML = `
            <!-- Recently Viewed -->
            ${state.recentlyViewed.length > 0 ? `
                <div class="recently-viewed animate-in">
                    <h3><i class="fas fa-history"></i> ${t['recentlyViewed'] || 'Recently Viewed'}</h3>
                    <div class="recent-items">
                        ${state.recentlyViewed.map(r => `
                            <div class="recent-item" data-id="${r.id}">
                                <h4>${r.name}</h4>
                                <span>${t[r.category] || r.category}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            <!-- Trending Banner -->
            <div class="trending-banner animate-in">
                <div class="trending-badge">${t['trendingNow'] || 'TRENDING NOW'}</div>
                <p>${t['trendingText'] || '<strong>Memorial Park Tennis Center</strong> just added 4 new clay courts!'} <a href="#directory">${t['bookNow'] || 'Book now'} &rarr;</a></p>
            </div>

            <!-- Section Header -->
            <div class="section-header" style="margin-bottom: 1rem; border-bottom: none; padding-bottom: 0;">
                <div>
                    <h2>${t['resourceDirectory'] || 'Resource Directory'}</h2>
                    <p id="results-count" class="text-muted"></p>
                </div>
            </div>

            <!-- Condensed Toolbar -->
            <div class="directory-toolbar" style="display: flex; gap: 0.75rem; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap;">
                
                <!-- Search (Flex 1) -->
                <div class="search-input-wrapper" style="flex: 1; min-width: 250px; position: relative;">
                    <i class="fas fa-search" style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--text-muted);"></i>
                    <input type="text" id="main-search-input" placeholder="${t['searchPlaceholder'] || 'Search resources...'}" 
                        style="width: 100%; padding: 0.75rem 1rem 0.75rem 2.5rem; border: 2px solid var(--border-color); border-radius: 12px; font-size: 0.95rem; background: var(--card-bg); color: var(--text-color);"
                        value="${state.filters.search}">
                </div>

                <!-- Controls Group -->
                <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: nowrap;">
                    
                    <!-- View Toggle -->
                    <div class="view-toggle" style="display: flex; border-radius: 8px; overflow: hidden; border: 2px solid var(--border-color);">
                        <button id="list-view-btn" class="view-btn active" style="padding: 0.5rem 0.8rem; border: none; background: var(--primary-teal); color: white; cursor: pointer;">
                            <i class="fas fa-list"></i>
                        </button>
                        <button id="map-view-btn" class="view-btn" style="padding: 0.5rem 0.8rem; border: none; background: var(--card-bg); color: var(--text-color); cursor: pointer;">
                            <i class="fas fa-map-marked-alt"></i>
                        </button>
                    </div>

                    <!-- Near Me -->
                    <button id="near-me-btn" class="btn btn-outline" title="${t['nearMe'] || 'Near Me'}" style="padding: 0.5rem; width: 42px; display: flex; justify-content: center; border-radius: 8px;">
                        <i class="fas fa-location-crosshairs"></i>
                    </button>

                    <!-- Distance -->
                    <div style="position: relative;">
                         <select id="distance-filter" style="appearance: none; -webkit-appearance: none; padding: 0.5rem 2rem 0.5rem 2.2rem; border-radius: 8px; border: 2px solid var(--border-color); background: var(--card-bg); color: var(--text-color); font-size: 0.9rem; cursor: pointer; max-width: 140px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                            <option value="0">Any Dist</option>
                            <option value="1">< 1 mi</option>
                            <option value="5">< 5 mi</option>
                            <option value="10">< 10 mi</option>
                            <option value="25">< 25 mi</option>
                        </select>
                        <i class="fas fa-ruler" style="position: absolute; left: 0.7rem; top: 50%; transform: translateY(-50%); pointer-events: none; color: var(--text-muted); font-size: 0.8rem;"></i>
                        <i class="fas fa-chevron-down" style="position: absolute; right: 0.7rem; top: 50%; transform: translateY(-50%); pointer-events: none; color: var(--text-muted); font-size: 0.7rem;"></i>
                    </div>

                     <!-- Open Now -->
                    <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer; font-weight: 600; font-size: 0.85rem; white-space: nowrap; margin-left: 0.25rem;">
                        <input type="checkbox" id="open-now-filter" ${state.filters.openNow ? 'checked' : ''}>
                        <span class="open-badge" style="padding: 0.25rem 0.5rem;">${t['openNow'] || 'Open'}</span>
                    </label>
                </div>
            </div>

            <!-- Saved Searches (Compact) -->
            <div id="saved-searches-container" style="margin-bottom: 1rem; display: flex; gap: 0.5rem; flex-wrap: wrap; font-size: 0.85rem;"></div>

            <!-- Filter Chips (Scrolling) -->
            <div class="filter-chips">
                ${categories.map(cat => {
            const isActive = state.filters.category.includes(cat);
            return `
                    <button class="filter-chip ${isActive ? 'active' : ''}" data-category="${cat}">
                        ${t[cat] || cat} <span class="count">${categoryCounts[cat]}</span>
                    </button>
                    `;
        }).join('')}
                ${(state.filters.category.length > 0 && !state.filters.category.includes('All')) || state.filters.search ? `
                    <button class="clear-filters"><i class="fas fa-times"></i> ${t['clearFilters'] || 'Clear Filters'}</button>
                ` : ''}
                <button id="save-search-btn" class="btn btn-outline" style="margin-left: auto; font-size: 0.85rem; padding: 0.4rem 0.8rem;">
                    <i class="fas fa-bookmark"></i> Save Search
                </button>
            </div>

            <!-- Map Container (Hidden by default) -->
            <div id="resource-map-container" style="display: none; height: 500px; border-radius: 16px; overflow: hidden; margin-bottom: 2rem; border: 2px solid var(--border-color);"></div>

            <!-- Resource Grid -->
            <div id="resource-grid" class="resource-grid"></div>

            <!-- Emergency Resources Section (moved to bottom) -->
            <div class="emergency-section animate-in" style="margin-top: 3rem;">
                <div class="emergency-header">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>${t['Emergency Resources'] || 'Emergency Resources'}</h3>
                </div>
                <div class="emergency-grid">
                    ${emergencyResources.map(e => {
            const name = (state.language === 'es' && e.name_es) ? e.name_es : e.name;
            const desc = (state.language === 'es' && e.description_es) ? e.description_es : e.description;
            return `
                        <div class="emergency-card">
                            <div class="emergency-icon"><i class="fas ${e.icon}"></i></div>
                            <div class="emergency-info">
                                <h4>${name}</h4>
                                <a href="tel:${e.number.replace(/[^0-9]/g, '')}" class="emergency-number">${e.number}</a>
                                <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.25rem">${desc}</p>
                            </div>
                        </div>
                    `}).join('')}
                </div>
            </div>
        `;

        const grid = document.getElementById('resource-grid');

        const updateGrid = () => {
            const filtered = state.resources.filter(res => {
                const matchesSearch = res.name.toLowerCase().includes(state.filters.search.toLowerCase()) ||
                    res.description.toLowerCase().includes(state.filters.search.toLowerCase()) ||
                    (res.tags && res.tags.some(tag => tag.toLowerCase().includes(state.filters.search.toLowerCase())));

                const matchesCategory = state.filters.category.includes('All') || state.filters.category.includes(res.category);

                const matchesOpen = !state.filters.openNow || isOpenNow(res.hours);

                const dist = typeof getResourceDistance === 'function' ? getResourceDistance(res.id) : null;
                const matchesDist = !state.filters.maxDistance || (dist !== null && dist <= state.filters.maxDistance);

                return matchesSearch && matchesCategory && matchesOpen && matchesDist;
            });

            document.getElementById('results-count').textContent = `${t['showing'] || 'Showing'} ${filtered.length} ${t['resourcesInHouston'] || 'resources in Houston'}`;

            if (filtered.length === 0) {
                grid.innerHTML = `
                    <div class="no-results animate-in">
                        <i class="fas fa-search" style="font-size: 3rem; color: var(--text-muted); margin-bottom: 1rem;"></i>
                        <h3>${t['noResourcesFound'] || 'No resources found'}</h3>
                        <p>${t['tryAdjustingFilters'] || 'Try adjusting your filters or search terms.'}</p>
                        <button class="btn btn-primary" onclick="state.filters.search=''; state.filters.category='All'; renderDirectory();">${t['clearAllFilters'] || 'Clear All Filters'}</button>
                    </div>
                `;
                return;
            }

            grid.innerHTML = filtered.map(res => {
                const isFavorite = state.favorites.includes(res.id);
                const openStatus = isOpenNow(res.hours);

                // Select content based on language
                const name = (state.language === 'es' && res.name_es) ? res.name_es : res.name;
                const desc = (state.language === 'es' && res.description_es) ? res.description_es : res.description;
                const impactLabel = (state.language === 'es' && res.impact?.label_es) ? res.impact.label_es : res.impact?.label;

                // Distance calculation
                const dist = typeof getResourceDistance === 'function' ? getResourceDistance(res.id) : null;
                const distText = typeof formatDistance === 'function' && dist !== null ? formatDistance(dist) : '';

                // Accessibility features
                const a11yFeatures = typeof getResourceAccessibility === 'function' ? getResourceAccessibility(res.id) : [];

                // Directions URL
                const directionsUrl = typeof getDirectionsUrl === 'function' ? getDirectionsUrl(res.location) : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(res.location)}`;

                return `
                    <div class="resource-card animate-in" data-id="${res.id}">
                        <div class="card-header" style="display: flex; justify-content: space-between; align-items: flex-start;">
                            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
                                <span class="category-badge">${t[res.category] || res.category}</span>
                                <span class="${openStatus ? 'open-badge' : 'open-badge closed-badge'}">
                                    ${openStatus ? (t['openNow'] || 'Open') : (t['closed'] || 'Closed')}
                                </span>
                                ${distText ? `<span class="distance-badge" style="background: linear-gradient(135deg, #2196F3, #1976D2); color: white; padding: 0.2rem 0.6rem; border-radius: 20px; font-size: 0.75rem; font-weight: 600;"><i class="fas fa-location-arrow"></i> ${distText}</span>` : ''}
                            </div>
                            <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-id="${res.id}" data-i18n-aria-label="${isFavorite ? 'removeFromFavorites' : 'addToFavorites'}">
                                <i class="fas fa-heart"></i>
                            </button>
                        </div>
                        <h3 style="cursor: pointer;" class="resource-name-link" data-id="${res.id}">${name}</h3>
                        <p>${desc}</p>
                        ${a11yFeatures.length > 0 ? `
                            <div class="accessibility-badges" style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin: 0.5rem 0;">
                                ${a11yFeatures.map(f => `<span style="background: #E8F5E9; color: #2E7D32; padding: 0.2rem 0.5rem; border-radius: 6px; font-size: 0.7rem; display: flex; align-items: center; gap: 0.25rem;"><i class="fas ${f.icon}"></i> ${state.language === 'es' && f.label_es ? f.label_es : f.label}</span>`).join('')}
                            </div>
                        ` : ''}
                        ${res.impact ? `
                            <div style="background: rgba(0, 121, 107, 0.05); padding: 1rem; border-radius: 12px; text-align: center;">
                                <div style="font-size: 1.75rem; font-weight: 700; color: var(--primary-teal);">${res.impact.metric}</div>
                                <div style="font-size: 0.85rem; color: var(--text-muted);">${impactLabel}</div>
                            </div>
                        ` : ''}
                        ${res.tags ? `
                            <div class="tags-container">
                                ${res.tags.map(tag => `<span class="tag" data-tag="${tag}">${tag}</span>`).join('')}
                            </div>
                        ` : ''}
                        <div class="card-footer" style="margin-top: auto;">
                            <span><i class="fas fa-location-dot"></i> ${res.location}</span>
                            <span><i class="fas fa-clock"></i> ${res.hours}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-color);">
                            <div class="rating">
                                <i class="fas fa-star" style="color: #f59e0b;"></i> ${res.rating} (${res.reviews})
                            </div>
                            <div class="share-container">
                                <button class="share-btn copy" data-share="copy" data-name="${res.name}" data-i18n-aria-label="copyLink"><i class="fas fa-link"></i></button>
                            </div>
                        </div>
                        <div class="card-actions" style="display: flex; gap: 0.5rem; margin-top: 1rem; flex-wrap: wrap;">
                            <button class="btn btn-primary view-details-btn" data-id="${res.id}" style="flex: 1;">
                                <i class="fas fa-info-circle"></i> ${t['viewDetails'] || 'View Details'}
                            </button>
                            <a href="${directionsUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline directions-btn" style="flex: 1;">
                                <i class="fas fa-directions"></i> Directions
                            </a>
                            ${res.website ? `
                                <a href="${res.website}" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="flex: 1;">
                                    <i class="fas fa-external-link-alt"></i> Website
                                </a>
                            ` : ''}
                        </div>
                    </div>
                `;
            }).join('');

            // Event listeners
            grid.querySelectorAll('.favorite-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const id = parseInt(btn.dataset.id);
                    toggleFavorite(id);
                    btn.classList.toggle('active');
                });
            });

            grid.querySelectorAll('.book-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const id = parseInt(btn.dataset.id);
                    const res = state.resources.find(r => r.id === id);
                    showBookingModal(res);
                });
            });

            grid.querySelectorAll('.resource-card').forEach(card => {
                card.addEventListener('click', (e) => {
                    if (e.target.closest('.favorite-btn') || e.target.closest('.book-btn') ||
                        e.target.closest('.share-btn') || e.target.closest('.tag')) return;
                    const id = parseInt(card.dataset.id);
                    const res = state.resources.find(r => r.id === id);
                    if (res) addToRecentlyViewed(res);
                });
            });

            grid.querySelectorAll('.tag').forEach(tag => {
                tag.addEventListener('click', () => {
                    state.filters.search = tag.dataset.tag;
                    const searchInput = document.getElementById('main-search-input');
                    if (searchInput) searchInput.value = tag.dataset.tag;
                    updateGrid();
                });
            });

            grid.querySelectorAll('.share-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const type = btn.dataset.share;
                    const name = btn.dataset.name;
                    const url = window.location.href;

                    if (type === 'twitter') {
                        window.open(`https://twitter.com/intent/tweet?text=Check out ${name} on Houston Hub!&url=${url}`, '_blank');
                    } else if (type === 'facebook') {
                        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
                    } else if (type === 'copy') {
                        copyToClipboard(url);
                    }
                });
            });
        };

        // Filter chip clicks
        document.querySelectorAll('.filter-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                const category = chip.dataset.category;

                if (category === 'All') {
                    state.filters.category = ['All'];
                } else {
                    // If currently 'All', clear it and select the new one
                    if (state.filters.category.includes('All')) {
                        state.filters.category = [category];
                    } else {
                        // Toggle selection
                        if (state.filters.category.includes(category)) {
                            state.filters.category = state.filters.category.filter(c => c !== category);
                            if (state.filters.category.length === 0) state.filters.category = ['All'];
                        } else {
                            state.filters.category.push(category);
                        }
                    }
                }
                renderDirectory(); // Re-render to update classes
            });
        });

        // Clear filters
        document.querySelector('.clear-filters')?.addEventListener('click', () => {
            state.filters.category = ['All'];
            state.filters.search = '';
            state.filters.openNow = false;
            state.filters.maxDistance = 0;
            const searchInput = document.getElementById('main-search-input');
            if (searchInput) searchInput.value = '';
            document.getElementById('open-now-filter').checked = false;
            const distFilter = document.getElementById('distance-filter');
            if (distFilter) distFilter.value = "0";
            renderDirectory();
        });

        // Open now filter
        document.getElementById('open-now-filter')?.addEventListener('change', (e) => {
            state.filters.openNow = e.target.checked;
            updateGrid();
        });

        // Search input
        const searchInput = document.getElementById('main-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                state.filters.search = e.target.value;
                updateGrid();
            });
        }

        // Recently viewed clicks
        document.querySelectorAll('.recent-item').forEach(item => {
            item.addEventListener('click', () => {
                const id = parseInt(item.dataset.id);
                const res = state.resources.find(r => r.id === id);
                if (res) {
                    state.filters.search = res.name;
                    const searchInput = document.getElementById('main-search-input');
                    if (searchInput) searchInput.value = res.name;
                    updateGrid();
                }
            });
        });

        // ===== NEW FEATURE EVENT HANDLERS =====

        // View Details button - opens resource detail modal
        grid.querySelectorAll('.view-details-btn, .resource-name-link').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = parseInt(btn.dataset.id);
                showResourceDetailModal(id);
            });
        });

        // Map/List View Toggle
        document.getElementById('list-view-btn')?.addEventListener('click', () => {
            document.getElementById('list-view-btn').classList.add('active');
            document.getElementById('list-view-btn').style.background = 'var(--primary-teal)';
            document.getElementById('list-view-btn').style.color = 'white';
            document.getElementById('map-view-btn').classList.remove('active');
            document.getElementById('map-view-btn').style.background = 'var(--card-bg)';
            document.getElementById('map-view-btn').style.color = 'var(--text-color)';
            document.getElementById('resource-grid').style.display = 'grid';
            document.getElementById('resource-map-container').style.display = 'none';
        });

        document.getElementById('map-view-btn')?.addEventListener('click', () => {
            document.getElementById('map-view-btn').classList.add('active');
            document.getElementById('map-view-btn').style.background = 'var(--primary-teal)';
            document.getElementById('map-view-btn').style.color = 'white';
            document.getElementById('list-view-btn').classList.remove('active');
            document.getElementById('list-view-btn').style.background = 'var(--card-bg)';
            document.getElementById('list-view-btn').style.color = 'var(--text-color)';
            document.getElementById('resource-grid').style.display = 'none';
            document.getElementById('resource-map-container').style.display = 'block';

            // Get filtered resources
            const filtered = state.resources.filter(res => {
                const matchesSearch = res.name.toLowerCase().includes(state.filters.search.toLowerCase());
                const matchesCategory = state.filters.category.includes('All') || state.filters.category.includes(res.category);
                const dist = typeof getResourceDistance === 'function' ? getResourceDistance(res.id) : null;
                const matchesDist = !state.filters.maxDistance || (dist !== null && dist <= state.filters.maxDistance);
                return matchesSearch && matchesCategory && matchesDist;
            });

            // Initialize map with filtered resources
            if (typeof initializeMap === 'function') {
                initializeMap('resource-map-container', filtered, {
                    onMarkerClick: (id) => showResourceDetailModal(id)
                });
            }
        });

        // Near Me Button
        document.getElementById('near-me-btn')?.addEventListener('click', async () => {
            const btn = document.getElementById('near-me-btn');
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Locating...';
            try {
                if (typeof getUserLocation === 'function') {
                    await getUserLocation();
                    showToast('Location found! Distances updated.', 'success');
                    updateGrid();
                }
            } catch (err) {
                showToast('Could not get location. Using Houston center.', 'error');
            }
            btn.innerHTML = '<i class="fas fa-location-crosshairs"></i> Near Me';
        });

        // Distance Filter
        document.getElementById('distance-filter')?.addEventListener('change', (e) => {
            const maxDist = parseInt(e.target.value);
            state.filters.maxDistance = maxDist;
            updateGrid();
        });

        // Save Search Button
        document.getElementById('save-search-btn')?.addEventListener('click', () => {
            if (typeof saveSearch === 'function') {
                const searchConfig = {
                    name: state.filters.search || state.filters.category,
                    filters: { ...state.filters }
                };
                saveSearch(searchConfig);
                showToast('Search saved!', 'success');
                loadSavedSearches();
            }
        });

        // Load Saved Searches
        function loadSavedSearches() {
            const container = document.getElementById('saved-searches-container');
            if (!container || typeof getSavedSearches !== 'function') return;

            const searches = getSavedSearches();
            if (searches.length === 0) {
                container.innerHTML = '';
                return;
            }

            container.innerHTML = searches.slice(0, 5).map(s => `
                <button class="saved-search-chip" data-id="${s.id}" style="background: var(--card-bg); border: 1px solid var(--border-color); padding: 0.3rem 0.6rem; border-radius: 16px; font-size: 0.8rem; cursor: pointer; display: flex; align-items: center; gap: 0.3rem;">
                    <i class="fas fa-bookmark" style="color: var(--primary-teal);"></i>
                    ${s.name.substring(0, 20)}${s.name.length > 20 ? '...' : ''}
                    <span class="delete-saved" data-id="${s.id}" style="margin-left: 0.25rem; color: #999;">&times;</span>
                </button>
            `).join('');

            // Attach click handlers
            container.querySelectorAll('.saved-search-chip').forEach(chip => {
                chip.addEventListener('click', (e) => {
                    if (e.target.classList.contains('delete-saved')) {
                        const id = parseInt(e.target.dataset.id);
                        if (typeof deleteSavedSearch === 'function') {
                            deleteSavedSearch(id);
                            loadSavedSearches();
                        }
                        return;
                    }
                    const id = parseInt(chip.dataset.id);
                    const searches = getSavedSearches();
                    const saved = searches.find(s => s.id === id);
                    if (saved) {
                        state.filters = { ...saved.filters };
                        const searchInput = document.getElementById('main-search-input');
                        if (searchInput) searchInput.value = state.filters.search || '';
                        renderDirectory();
                    }
                });
            });
        }

        loadSavedSearches();

        updateGrid();
    }

    // ===== RESOURCE DETAIL MODAL =====
    function showResourceDetailModal(resourceId) {
        const res = state.resources.find(r => r.id === resourceId);
        if (!res) return;

        const t = translations[state.language];
        const isEs = state.language === 'es';
        const name = (isEs && res.name_es) ? res.name_es : res.name;
        const desc = (isEs && res.description_es) ? res.description_es : res.description;
        const impactLabel = (isEs && res.impact?.label_es) ? res.impact.label_es : res.impact?.label;

        const dist = typeof getResourceDistance === 'function' ? getResourceDistance(res.id) : null;
        const distText = typeof formatDistance === 'function' && dist !== null ? formatDistance(dist) : '';
        const a11yFeatures = typeof getResourceAccessibility === 'function' ? getResourceAccessibility(res.id) : [];
        const reviews = typeof getResourceReviews === 'function' ? getResourceReviews(res.id) : [];
        const avgRating = typeof getAverageUserRating === 'function' ? getAverageUserRating(res.id) : null;
        const directionsUrl = typeof getDirectionsUrl === 'function' ? getDirectionsUrl(res.location) : '';

        const isFavorite = state.favorites.includes(res.id);

        openModal(`
            <div class="resource-detail-modal" style="max-width: 600px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                    <div>
                        <span class="category-badge">${t[res.category] || res.category}</span>
                        ${distText ? `<span style="margin-left: 0.5rem; background: #2196F3; color: white; padding: 0.2rem 0.6rem; border-radius: 20px; font-size: 0.75rem;">${distText}</span>` : ''}
                    </div>
                    <button class="favorite-btn ${isFavorite ? 'active' : ''}" onclick="toggleFavorite(${res.id}); document.querySelector('.resource-detail-modal .favorite-btn').classList.toggle('active');" style="font-size: 1.5rem;">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
                
                <h2 style="margin-bottom: 0.5rem;">${name}</h2>
                
                ${res.impact ? `
                    <div style="background: linear-gradient(135deg, var(--primary-teal), #00a896); color: white; padding: 1.5rem; border-radius: 12px; text-align: center; margin: 1rem 0;">
                        <div style="font-size: 2.5rem; font-weight: 700;">${res.impact.metric}</div>
                        <div style="opacity: 0.9;">${impactLabel}</div>
                    </div>
                ` : ''}
                
                <p style="color: var(--text-muted); line-height: 1.6;">${desc}</p>
                
                ${a11yFeatures.length > 0 ? `
                    <div style="margin: 1rem 0;">
                        <h4 style="margin-bottom: 0.5rem;"><i class="fas fa-universal-access"></i> Accessibility</h4>
                        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                            ${a11yFeatures.map(f => `<span style="background: #E8F5E9; color: #2E7D32; padding: 0.3rem 0.6rem; border-radius: 8px; font-size: 0.8rem;"><i class="fas ${f.icon}"></i> ${f.label}</span>`).join('')}
                        </div>
                    </div>
                ` : ''}
                
                <div style="background: var(--card-bg); padding: 1rem; border-radius: 12px; margin: 1rem 0; border: 1px solid var(--border-color);">
                    <div style="margin-bottom: 0.75rem;"><i class="fas fa-location-dot" style="color: var(--primary-teal); width: 20px;"></i> ${res.location}</div>
                    <div style="margin-bottom: 0.75rem;"><i class="fas fa-clock" style="color: var(--primary-teal); width: 20px;"></i> ${res.hours}</div>
                    <div><i class="fas fa-star" style="color: #f59e0b; width: 20px;"></i> ${res.rating} (${res.reviews} reviews)${avgRating ? ` | User Rating: ${avgRating}` : ''}</div>
                </div>
                
                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin: 1rem 0;">
                    <a href="${directionsUrl}" target="_blank" class="btn btn-primary" style="flex: 1; text-align: center;">
                        <i class="fas fa-directions"></i> Get Directions
                    </a>
                    ${res.website ? `
                        <a href="${res.website}" target="_blank" class="btn btn-outline" style="flex: 1; text-align: center;">
                            <i class="fas fa-globe"></i> Visit Website
                        </a>
                    ` : ''}
                </div>
                
                <!-- User Reviews Section -->
                <div style="margin-top: 1.5rem; border-top: 1px solid var(--border-color); padding-top: 1rem;">
                    <h4><i class="fas fa-comments"></i> Community Reviews</h4>
                    
                    <form id="review-form" style="margin: 1rem 0; background: var(--card-bg); padding: 1rem; border-radius: 12px;">
                        <div style="margin-bottom: 0.5rem;">
                            <label style="font-weight: 600;">Your Rating:</label>
                            <div class="star-rating" style="font-size: 1.5rem;">
                                ${[1, 2, 3, 4, 5].map(n => `<i class="far fa-star" data-rating="${n}" style="cursor: pointer; color: #f59e0b;"></i>`).join('')}
                            </div>
                            <input type="hidden" id="user-rating" value="0">
                        </div>
                        <textarea id="review-text" placeholder="Share your experience..." style="width: 100%; padding: 0.5rem; border: 1px solid var(--border-color); border-radius: 8px; min-height: 80px; resize: vertical;"></textarea>
                        <button type="submit" class="btn btn-primary" style="margin-top: 0.5rem;">Submit Review</button>
                    </form>
                    
                    <div id="reviews-list">
                        ${reviews.length > 0 ? reviews.map(r => `
                            <div style="padding: 0.75rem; border-bottom: 1px solid var(--border-color);">
                                <div style="display: flex; justify-content: space-between;">
                                    <span style="font-weight: 600;">Anonymous</span>
                                    <span style="color: #f59e0b;">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</span>
                                </div>
                                <p style="margin: 0.5rem 0; color: var(--text-muted);">${r.text}</p>
                                <small style="color: #999;">${new Date(r.timestamp).toLocaleDateString()}</small>
                            </div>
                        `).join('') : '<p style="color: var(--text-muted); text-align: center;">No reviews yet. Be the first!</p>'}
                    </div>
                </div>
            </div>
        `);

        // Star rating interaction
        document.querySelectorAll('.star-rating i').forEach(star => {
            star.addEventListener('click', () => {
                const rating = parseInt(star.dataset.rating);
                document.getElementById('user-rating').value = rating;
                document.querySelectorAll('.star-rating i').forEach((s, i) => {
                    s.className = i < rating ? 'fas fa-star' : 'far fa-star';
                });
            });
        });

        // Review form submission
        document.getElementById('review-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const rating = parseInt(document.getElementById('user-rating').value);
            const text = document.getElementById('review-text').value.trim();

            if (rating === 0) {
                showToast('Please select a rating', 'error');
                return;
            }

            if (typeof addResourceReview === 'function') {
                addResourceReview(res.id, { rating, text });
                showToast('Review submitted!', 'success');
                showResourceDetailModal(res.id); // Refresh modal
            }
        });

        addToRecentlyViewed(res);
    }

    // Expose for map popup
    window.showResourceDetailFromMap = showResourceDetailModal;

    // ===== FEATURED SECTION WITH CAROUSEL =====
    function renderFeatured() {
        const featured = state.resources.filter(r => r.impact).slice(0, 5);
        const t = translations[state.language];
        const isEs = state.language === 'es';

        contentDisplay.innerHTML = `
            <div class="section-header">
                <h2>${t['communitySpotlight'] || 'Community Spotlight'}</h2>
                <p>${t['communitySpotlightSubtitle'] || 'Highlighting the most impactful resources in Houston.'}</p>
            </div>
            
            <div class="carousel-container">
                <div class="carousel-track" id="carousel-track">
                    ${featured.map((res, i) => {
            const name = (isEs && res.name_es) ? res.name_es : res.name;
            const desc = (isEs && res.description_es) ? res.description_es : res.description;
            const impactLabel = (isEs && res.impact?.label_es) ? res.impact.label_es : res.impact?.label;
            return `
                        <div class="carousel-slide">
                            <div class="featured-card animate-in">
                                <div class="featured-image" style="background: linear-gradient(135deg, var(--primary-teal), var(--secondary-coral))">
                                    <div style="text-align: center; color: white;">
                                        <div style="font-size: 4rem; font-weight: 700;">${res.impact?.metric || ''}</div>
                                        <div style="font-size: 1.25rem; opacity: 0.9;">${impactLabel || ''}</div>
                                    </div>
                                </div>
                                <div class="featured-content">
                                    <span class="category-badge">${t[res.category] || res.category}</span>
                                    <h3>${name}</h3>
                                    <p>${desc}</p>
                                    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                                        ${res.website ? `
                                            <a href="${res.website}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                                                <i class="fas fa-external-link-alt"></i> ${t['visitWebsite'] || 'Visit Website'}
                                            </a>
                                        ` : ''}
                                        <button class="btn btn-outline featured-view-details-btn" data-id="${res.id}">
                                            <i class="fas fa-info-circle"></i> ${t['viewDetails'] || 'View Details'}
                                        </button>
                                        <button class="btn btn-outline favorite-featured-btn" data-id="${res.id}">
                                            <i class="fas fa-heart"></i> ${t['save'] || 'Save'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `}).join('')}
                </div>
                <div class="carousel-controls">
                    <button class="carousel-btn" id="carousel-prev" data-i18n-aria-label="previousSlide"><i class="fas fa-chevron-left"></i></button>
                    <div class="carousel-dots">
                        ${featured.map((_, i) => `<button class="carousel-dot ${i === 0 ? 'active' : ''}" data-index="${i}" data-i18n-aria-label="goToSlide ${i + 1}"></button>`).join('')}
                    </div>
                    <button class="carousel-btn" id="carousel-next" data-i18n-aria-label="nextSlide"><i class="fas fa-chevron-right"></i></button>
                </div>
            </div>

            <!-- Volunteer Opportunities -->
            <div class="section-header" style="margin-top: 6rem;">
                <h2>${t['volunteerOpportunities'] || 'Volunteer Opportunities'}</h2>
                <p>${t['volunteerOpportunitiesSubtitle'] || 'Make a difference in your community.'}</p>
            </div>
            <div class="volunteer-grid">
                ${volunteerOpportunities.map(v => {
                const title = (isEs && v.title_es) ? v.title_es : v.title;
                const desc = (isEs && v.description_es) ? v.description_es : v.description;
                return `
                    <div class="volunteer-card animate-in">
                        <span class="volunteer-badge">${t[v.frequency] || v.frequency}</span>
                        <h3>${title}</h3>
                        <p style="color: var(--primary-teal); font-weight: 600;">${v.organization}</p>
                        <p>${desc}</p>
                        <div class="volunteer-meta">
                            <span><i class="fas fa-clock"></i> ${t[v.commitment] || v.commitment}</span>
                            <span><i class="fas fa-map-marker-alt"></i> ${v.location}</span>
                        </div>
                        <div class="tags-container">
                            ${v.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                        <a href="${v.website}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="width: 100%; margin-top: 1.5rem;">${t['signUpToVolunteer'] || 'Sign Up to Volunteer'}</a>
                    </div>
                `}).join('')}
            </div>
        `;

        // Carousel controls
        const track = document.getElementById('carousel-track');
        const dots = document.querySelectorAll('.carousel-dot');
        let currentSlide = 0;

        const updateCarousel = () => {
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        };

        document.getElementById('carousel-prev')?.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + featured.length) % featured.length;
            updateCarousel();
        });

        document.getElementById('carousel-next')?.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % featured.length;
            updateCarousel();
        });

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                currentSlide = parseInt(dot.dataset.index);
                updateCarousel();
            });
        });

        // Auto-advance carousel
        setInterval(() => {
            if (state.currentView === 'featured') {
                currentSlide = (currentSlide + 1) % featured.length;
                updateCarousel();
            }
        }, 5000);

        // Featured View Details buttons
        document.querySelectorAll('.featured-view-details-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                showResourceDetailModal(id);
            });
        });



        // Featured favorite buttons
        document.querySelectorAll('.favorite-featured-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                toggleFavorite(id);
            });
        });
    }

    // ===== CALENDAR SECTION =====
    function renderCalendar() {
        const t = translations[state.language];
        const isEs = state.language === 'es';
        const now = new Date();
        const currentMonth = now.toLocaleString(isEs ? 'es-MX' : 'en-US', { month: 'long', year: 'numeric' });
        const capitalizedMonth = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);

        const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).getDay();

        const eventDates = calendarEvents.map(e => new Date(e.date).getDate());

        let calendarDays = '';
        // Previous month padding
        for (let i = 0; i < firstDay; i++) {
            calendarDays += `<div class="calendar-day other-month"></div>`;
        }
        // Current month days
        for (let day = 1; day <= daysInMonth; day++) {
            const isToday = day === now.getDate();
            const hasEvent = eventDates.includes(day);
            calendarDays += `
            <div class="calendar-day ${isToday ? 'today' : ''} ${hasEvent ? 'has-event' : ''}" data-day="${day}">
                ${day}
            </div>
        `;
        }

        const weekDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

        contentDisplay.innerHTML = `
        <div class="section-header">
            <h2>${t['calendarTitle'] || 'Community Calendar'}</h2>
            <p>${t['calendarSubtitle'] || 'Stay updated with events happening across Houston.'}</p>
        </div>

        <div class="calendar-view animate-in">
            <div class="calendar-header">
                <h3>${capitalizedMonth}</h3>
                <div class="calendar-nav">
                    <button class="carousel-btn" data-i18n-aria-label="previousMonth"><i class="fas fa-chevron-left"></i></button>
                    <button class="carousel-btn" data-i18n-aria-label="nextMonth"><i class="fas fa-chevron-right"></i></button>
                </div>
            </div>
            <div class="calendar-grid">
                ${weekDays.map(d => `<div class="calendar-day-header">${t[d] || d.toUpperCase()}</div>`).join('')}
                ${calendarDays}
            </div>
        </div>

        <div class="section-header">
            <h2>${t['upcomingEvents'] || 'Upcoming Events'}</h2>
        </div>
        <div class="event-grid">
            ${calendarEvents.slice(0, 6).map(event => {
            const title = (isEs && event.title_es) ? event.title_es : event.title;
            const desc = (isEs && event.description_es) ? event.description_es : event.description;
            return `
                <div class="event-card animate-in">
                    <span class="event-category">${t[event.category] || event.category}</span>
                    <h3>${title}</h3>
                    <p><i class="fas fa-calendar"></i> ${event.date}</p>
                    <p><i class="fas fa-clock"></i> ${event.time}</p>
                    <p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                    <p style="margin-top: 1rem; color: var(--text-muted);">${desc}</p>
                    <a href="https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${event.date.replace(/-/g, '')}/${event.date.replace(/-/g, '')}&details=${encodeURIComponent(desc)}&location=${encodeURIComponent(event.location)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="width: 100%; margin-top: 1rem;"><i class="fas fa-calendar-plus"></i> ${t['addToCalendar'] || 'Add to Calendar'}</a>
                </div>
            `}).join('')}
        </div>
    `;
    }
    // ===== SUPPORT SECTION =====
    function renderSupport() {
        const t = translations[state.language];
        const isEs = state.language === 'es';

        contentDisplay.innerHTML = `
            <div class="section-header">
                <h2>${t['supportYourCommunity'] || 'Support Your Community'}</h2>
                <p>${t['supportSubtitle'] || 'Your support helps non-profits provide essential services to Houstonians.'}</p>
            </div>
            <div class="support-grid">
                ${initialNonprofits.map(org => {
            const name = (isEs && org.name_es) ? org.name_es : org.name;
            const desc = (isEs && org.description_es) ? org.description_es : org.description;
            return `
                    <div class="support-card animate-in">
                        <div class="support-icon"><i class="fas fa-heart"></i></div>
                        <h3>${name}</h3>
                        <p>${desc}</p>
                        <a href="${org.link}" target="_blank" class="btn btn-primary">${t['learnMoreDonate'] || 'Learn More & Donate'}</a>
                    </div>
                `}).join('')}
            </div>

            <!-- Transportation Resources -->
            <div class="section-header">
                <h2>${t['transportationResources'] || 'Transportation Resources'}</h2>
                <p>${t['transportationSubtitle'] || 'Get around Houston with these transportation options.'}</p>
            </div>
            <div class="transport-grid">
                ${transportationResources.map(t => {
                const desc = (isEs && t.description_es) ? t.description_es : t.description;
                return `
                    <div class="transport-card animate-in">
                        <div class="transport-icon"><i class="fas ${t.icon}"></i></div>
                        <div>
                            <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem;">${t.name}</h3>
                            <p style="margin-bottom: 0.75rem;">${desc}</p>
                            <p style="font-weight: 600; color: var(--primary-teal);">${t.cost}</p>
                            <a href="${t.website}" target="_blank" class="btn btn-outline" style="margin-top: 1rem;">${translations[state.language]['visitWebsite'] || 'Visit Website'}</a>
                        </div>
                    </div>
                `}).join('')}
            </div>
            
            <div class="section-header">
                <h2>${t['schoolEvents'] || 'School Events'}</h2>
                <p>${t['schoolEventsSubtitle'] || 'Stay updated with events from Houston ISD and local schools.'}</p>
            </div>
            <div class="event-grid">
                ${schoolEvents.map(event => {
                    const title = (isEs && event.title_es) ? event.title_es : event.title;
                    const desc = (isEs && event.description_es) ? event.description_es : ''; // Not rendered in original but good to have
                    return `
                    <div class="event-card animate-in">
                        <span class="event-category">${t[event.category] || event.category}</span>
                        <h3>${title}</h3>
                        <p><strong>${event.school}</strong></p>
                        <p><i class="fas fa-calendar"></i> ${event.date} | ${event.time}</p>
                    </div>
                `}).join('')}
            </div>

            <!-- Community Stories Section -->
            <div class="section-header">
                <h2><i class="fas fa-quote-left"></i> ${t['communityStories'] || 'Community Stories'}</h2>
                <p>${t['communityStoriesSubtitle'] || 'Real experiences from Houstonians who found help through our resources.'}</p>
            </div>
            <div class="stories-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 3rem;">
                ${(typeof communityStories !== 'undefined' ? communityStories : []).map(story => {
                        const storyText = (isEs && story.story_es) ? story.story_es : story.story;
                        const resource = state.resources.find(r => r.id === story.resourceId);
                        return `
                    <div class="story-card animate-in" style="background: var(--card-bg); padding: 1.5rem; border-radius: 16px; border: 1px solid var(--border-color); position: relative;">
                        <i class="fas fa-quote-left" style="position: absolute; top: 1rem; left: 1rem; font-size: 2rem; color: var(--primary-teal); opacity: 0.2;"></i>
                        <p style="font-style: italic; color: var(--text-color); line-height: 1.6; margin-bottom: 1rem; padding-top: 1.5rem;">"${storyText}"</p>
                        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 1rem;">
                            <div>
                                <strong style="color: var(--text-color);">${story.name}</strong>
                                ${resource ? `<br><span style="font-size: 0.85rem; color: var(--primary-teal);">${resource.name}</span>` : ''}
                            </div>
                            <div style="display: flex;">
                                ${[1, 2, 3, 4, 5].map(() => '<i class="fas fa-star" style="color: #f59e0b; font-size: 0.9rem;"></i>').join('')}
                            </div>
                        </div>
                    </div>
                    `;
                    }).join('')}
            </div>

            <div class="newsletter-card animate-in" style="background: linear-gradient(135deg, var(--primary-teal), #00a896); color: white; padding: 2.5rem; border-radius: 20px; text-align: center;">
                <i class="fas fa-envelope-open-text" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <h3 style="font-size: 1.75rem; margin-bottom: 0.5rem;">${t['newsletterTitle'] || 'Houston Hub Newsletter'}</h3>
                <p style="opacity: 0.9; margin-bottom: 1.5rem;">${t['newsletterSubtitle'] || 'Get weekly updates on resources, events, and community news.'}</p>
                <form class="newsletter-form" id="newsletter-form" style="display: flex; gap: 0.5rem; max-width: 500px; margin: 0 auto; flex-wrap: wrap; justify-content: center;">
                    <input type="email" id="newsletter-email" placeholder="${t['enterEmail'] || 'Enter your email address'}" required style="flex: 1; min-width: 250px; padding: 0.875rem 1rem; border: none; border-radius: 12px; font-size: 1rem;">
                    <button type="submit" class="btn" style="background: white; color: var(--primary-teal); font-weight: 600; padding: 0.875rem 1.5rem;">${t['joinNow'] || 'Join Now'}</button>
                </form>
                <p id="newsletter-status" style="margin-top: 1rem; font-size: 0.9rem;"></p>
            </div>
        `;

        document.getElementById('newsletter-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('newsletter-email').value;
            const status = document.getElementById('newsletter-status');

            if (typeof subscribeToNewsletter === 'function') {
                const result = subscribeToNewsletter(email);
                if (result.success) {
                    showToast(result.message, 'success');
                    status.textContent = '✓ ' + (t['subscriptionSuccess'] || 'You\'re subscribed! Check your inbox for updates.');
                    e.target.reset();
                } else {
                    status.textContent = result.message;
                }
            } else {
                showToast(t['thanksSubscribing'] || 'Thanks for subscribing!', 'success');
                e.target.reset();
            }
        });
    }

    // ===== FAVORITES SECTION =====
    function renderFavorites() {
        const favoriteResources = state.resources.filter(r => state.favorites.includes(r.id));
        const t = translations[state.language];
        const isEs = state.language === 'es';

        contentDisplay.innerHTML = `
            <div class="section-header">
                <div>
                    <h2>${t['yourFavorites'] || 'Your Favorites'}</h2>
                    <p>${favoriteResources.length} ${t['savedResources'] || 'saved resources'}</p>
                </div>
                ${favoriteResources.length > 0 ? `
                    <button id="export-pdf-btn" class="btn btn-outline" style="display: flex; align-items: center; gap: 0.5rem;">
                        <i class="fas fa-file-pdf"></i> ${t['exportPDF'] || 'Export to PDF'}
                    </button>
                ` : ''}
            </div>

            <!-- My Submissions Tracker -->
            ${(typeof getSubmissions === 'function' && getSubmissions().length > 0) ? `
                <div class="submissions-tracker animate-in" style="margin-bottom: 3rem; background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.5rem;">
                    <h3 style="margin-bottom: 1rem;"><i class="fas fa-list-check"></i> ${t['mySubmissions'] || 'My Resource Suggestions'}</h3>
                    <div class="submissions-list">
                        ${getSubmissions().map(s => `
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 0; border-bottom: 1px solid var(--border-color);">
                                <div>
                                    <strong style="color: var(--text-color);">${s.name}</strong>
                                    <div style="font-size: 0.85rem; color: var(--text-muted);">${new Date(s.submittedAt).toLocaleDateString()}</div>
                                </div>
                                <span class="status-badge ${s.status}" style="background: ${s.status === 'approved' ? '#E8F5E9' : '#FFF3E0'}; color: ${s.status === 'approved' ? '#2E7D32' : '#EF6C00'}; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.85rem; text-transform: capitalize;">
                                    ${s.status}
                                </span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            ${favoriteResources.length === 0 ? `
                <div style="text-align: center; padding: 6rem 2rem;">
                    <i class="fas fa-heart" style="font-size: 5rem; color: var(--text-muted); margin-bottom: 2rem;"></i>
                    <h3>${t['noFavoritesTitle'] || 'No favorites yet'}</h3>
                    <p style="color: var(--text-muted); margin-bottom: 2rem;">${t['noFavoritesSubtitle'] || 'Save resources by clicking the heart icon on resource cards.'}</p>
                    <a href="#directory" class="btn btn-primary">${t['browseResources'] || 'Browse Resources'}</a>
                </div>
            ` : `
                <div class="resource-grid">
                    ${favoriteResources.map(res => {
            const name = (isEs && res.name_es) ? res.name_es : res.name;
            const desc = (isEs && res.description_es) ? res.description_es : res.description;
            return `
                        <div class="resource-card animate-in">
                            <div class="card-header" style="display: flex; justify-content: space-between;">
                                <span class="category-badge">${t[res.category] || res.category}</span>
                                <button class="favorite-btn active" data-id="${res.id}"><i class="fas fa-heart"></i></button>
                            </div>
                            <h3>${name}</h3>
                            <p>${desc}</p>
                            <div class="card-footer">
                                <span><i class="fas fa-location-dot"></i> ${res.location}</span>
                            </div>
                        </div>
                    `}).join('')}
                </div>
            `}
        `;

        document.querySelectorAll('.favorite-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                toggleFavorite(id);
                renderFavorites();
            });
        });

        document.getElementById('export-pdf-btn')?.addEventListener('click', () => {
            if (typeof exportFavoritesToPDF === 'function') {
                exportFavoritesToPDF(state.favorites, state.resources, state.language);
                showToast(t['pdfExportStarted'] || 'Exporting favorites to PDF...', 'success');
            } else {
                showToast('PDF export feature not loaded.', 'error');
            }
        });
    }

    // Event listeners already moved up for robustness


    function showSuggestModal() {
        console.log('Hub: showSuggestModal executing');
        if (!modal || !modalBody) {
            console.error('Hub: Cannot show modal - missing elements');
            return;
        }
        const isEs = state.language === 'es';
        const contentHtml = `
            <div class="modal-form">
                <h2>${isEs ? 'Sugerir un Recurso' : 'Suggest a New Resource'}</h2>
                <p>${isEs ? 'Ayúdenos a expandir nuestro centro comunitario sugiriendo un servicio local.' : 'Help us expand our community hub by suggesting a local service.'}</p>
                <form id="suggest-form">
                    <div class="form-group">
                        <label>${isEs ? 'Nombre del Recurso' : 'Resource Name'}</label>
                        <input type="text" id="res-name" placeholder="${isEs ? 'ej. Banco de Alimentos de Houston' : 'e.g. Houston Food Bank'}" required>
                    </div>
                    <div class="form-group">
                        <label>${isEs ? 'Categoría' : 'Category'}</label>
                        <select id="res-category">
                            <option>${isEs ? 'Seguridad Alimentaria' : 'Food Security'}</option>
                            <option>${isEs ? 'Recreación' : 'Recreation'}</option>
                            <option>${isEs ? 'Servicios de Apoyo' : 'Support Services'}</option>
                            <option>${isEs ? 'Programas Juveniles' : 'Youth Programs'}</option>
                            <option>${isEs ? 'Centros Comunitarios' : 'Community Centers'}</option>
                            <option>${isEs ? 'Otro' : 'Other'}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>${isEs ? 'Descripción' : 'Description'}</label>
                        <textarea id="res-desc" rows="3" placeholder="${isEs ? '¿Qué servicios proporcionan?' : 'What services do they provide?'}" required></textarea>
                    </div>
                     <div class="form-group">
                        <label>${isEs ? 'Ubicación/Dirección' : 'Location/Address'}</label>
                        <input type="text" id="res-address" placeholder="${isEs ? '123 Calle Principal, Houston, TX' : '123 Main St, Houston, TX'}" required>
                    </div>
                    <button type="submit" class="btn btn-primary w-full" style="margin-top: 1rem;">
                        ${isEs ? 'Enviar Sugerencia' : 'Submit Suggestion'}
                    </button>
                </form>
            </div>
            `;
        openModal(contentHtml);

        document.getElementById('suggest-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('res-name').value;
            const category = document.getElementById('res-category').value;
            const desc = document.getElementById('res-desc').value;
            const location = document.getElementById('res-address').value;

            if (typeof addSubmission === 'function') {
                addSubmission({
                    name,
                    category,
                    description: desc,
                    location
                });
            }

            closeModal();
            showToast(isEs ? '¡Gracias! Su sugerencia ha sido enviada.' : 'Thank you! Your suggestion has been submitted.', 'success');
            createConfetti();
        });
    }

    function showSuccessAnimation() {
        const overlay = document.createElement('div');
        overlay.className = 'success-overlay';
        overlay.innerHTML = `
            <div class="success-checkmark"><i class="fas fa-check"></i></div>
                <div class="success-message">
                    <h2>Thank You!</h2>
                    <p>Your resource suggestion has been submitted successfully.</p>
                </div>
        `;
        document.body.appendChild(overlay);
        createConfetti();

        setTimeout(() => {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 300);
        }, 2500);
    }

    function showBookingModal(res) {
        if (!modal || !modalBody) return;
        const isEs = state.language === 'es';
        const name = (isEs && res.name_es) ? res.name_es : res.name;

        const contentHtml = `
            <div class="modal-form">
                <h2>${isEs ? 'Reservar Lugar: ' : 'Book Venue: '} ${name}</h2>
                <p>${isEs ? 'Seleccione fecha y hora para reservar este espacio.' : 'Select a date and time to reserve this community space.'}</p>
                <form id="booking-form">
                    <div class="form-group">
                        <label>${isEs ? 'Seleccionar Fecha' : 'Select Date'}</label>
                        <input type="date" id="book-date" required>
                    </div>
                    <div class="form-group">
                        <label>${isEs ? 'Seleccionar Hora' : 'Select Time'}</label>
                        <select id="book-time" required>
                            <option>09:00 AM</option>
                            <option>11:00 AM</option>
                            <option>01:00 PM</option>
                            <option>03:00 PM</option>
                            <option>05:00 PM</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>${isEs ? 'Número de Personas' : 'Number of People'}</label>
                        <input type="number" id="book-count" min="1" max="50" value="2" required>
                    </div>
                    <button type="submit" class="btn btn-primary w-full">${isEs ? 'Confirmar Reserva' : 'Confirm Booking'}</button>
                </form>
            </div>
            `;
        openModal(contentHtml);

        document.getElementById('booking-form').addEventListener('submit', (e) => {
            e.preventDefault();
            closeModal();
            showToast(isEs ? `¡Reserva confirmada para ${name} !` : `Booking confirmed for ${res.name}!`, 'success');
        });
    }

    function showPartnerModal() {
        if (!modal || !modalBody) return;
        const isEs = state.language === 'es';
        const contentHtml = `
            <div class="modal-form">
                <h2>${isEs ? 'Asóciese con Nosotros' : 'Partner With Us'}</h2>
                <p>${isEs ? '¿Eres organización sin fines de lucro? Trabajemos juntos.' : 'Are you a non-profit or community organization? Let\'s work together to serve Houston.'}</p>
                <form id="partner-form">
                    <div class="form-group">
                        <label>${isEs ? 'Nombre de Organización' : 'Organization Name'}</label>
                        <input type="text" placeholder="${isEs ? 'Su organización' : 'Your organization'}" required>
                    </div>
                    <div class="form-group">
                        <label>${isEs ? 'Correo de Contacto' : 'Contact Email'}</label>
                        <input type="email" placeholder="email@organization.org" required>
                    </div>
                    <div class="form-group">
                        <label>${isEs ? '¿Cómo podemos ayudar?' : 'How can we help?'}</label>
                        <textarea rows="4" placeholder="${isEs ? 'Cuéntenos sobre su organización...' : 'Tell us about your organization and how we can partner...'}"></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary" style="width: 100%;">${isEs ? 'Enviar Consulta' : 'Submit Inquiry'}</button>
                </form>
            </div>
            `;
        openModal(contentHtml);

        document.getElementById('partner-form').addEventListener('submit', (e) => {
            e.preventDefault();
            closeModal();
            showToast(isEs ? '¡Gracias! Estaremos en contacto pronto.' : 'Thank you! We\'ll be in touch soon.', 'success');
        });
    }



    // ===== KEYBOARD NAVIGATION =====
    document.addEventListener('keydown', (e) => {
        // Escape to close modals
        if (e.key === 'Escape') {
            closeModal();
            a11yPanel?.classList.remove('active');
            langDropdown?.classList.remove('active');
        }

        // Slash to focus search
        if (e.key === '/' && !e.target.closest('input, textarea')) {
            e.preventDefault();
            rootSearch.focus();
        }
    });

    // ===== PETITIONS SECTION =====
    function renderPetitions() {
        const t = translations[state.language];
        const isEs = state.language === 'es';

        contentDisplay.innerHTML = `
            <div class="section-header">
                <div>
                    <h2>${t['petitions'] || 'Create a Change'}</h2>
                    <p>${isEs ? 'Apoye iniciativas que hacen que Houston sea mejor para todos.' : 'Support initiatives that make Houston better for everyone.'}</p>
                </div>
                <button class="btn btn-primary" id="start-petition-btn">
                    <i class="fas fa-plus"></i> ${isEs ? 'Iniciar una Petición' : 'Start a Petition'}
                </button>
            </div>
            <div class="petition-grid" id="petition-list"></div>
        `;

        const list = document.getElementById('petition-list');

        const updatePetitions = () => {
            list.innerHTML = state.petitions.map(pet => {
                const percent = Math.min((pet.signatures / pet.goal) * 100, 100);

                const title = (state.language === 'es' && pet.title_es) ? pet.title_es : pet.title;
                const desc = (state.language === 'es' && pet.description_es) ? pet.description_es : pet.description;

                return `
            <div class="petition-card animate-in">
                        <div class="petition-category">${pet.category}</div>
                        <h3>${title}</h3>
                        <p>${desc}</p>
                        
                        <div class="petition-progress-wrapper">
                            <div class="petition-stats">
                                <span>${pet.signatures.toLocaleString()} ${isEs ? 'firmado' : 'signed'}</span>
                                <span class="goal">${isEs ? 'Meta' : 'Goal'}: ${pet.goal.toLocaleString()}</span>
                            </div>
                            <div class="petition-progress-container">
                                <div class="petition-progress-bar" style="width: ${percent}%"></div>
                            </div>
                        </div>

                        <button class="btn btn-primary sign-btn ${pet.signed ? 'signed' : ''}" 
                                data-id="${pet.id}" ${pet.signed ? 'disabled' : ''}>
                            ${pet.signed ? (isEs ? 'Firmado ✓' : 'Signed ✓') : (isEs ? 'Firmar esta Petición' : 'Sign this Petition')}
                        </button>

                        <div class="petition-author">
                            <span>${isEs ? 'Por' : 'By'} ${pet.creator}</span>
                            <span>${pet.timestamp}</span>
                        </div>
                    </div>
            `;
            }).join('');

            list.querySelectorAll('.sign-btn:not(.signed)').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const id = parseInt(btn.dataset.id);
                    const pet = state.petitions.find(p => p.id === id);
                    if (pet && !pet.signed) {
                        pet.signatures++;
                        pet.signed = true;
                        localStorage.setItem('petitions', JSON.stringify(state.petitions));

                        // Show localized toast immediately
                        showToast(state.language === 'es' ? '¡Gracias por firmar!' : 'Thank you for signing!', 'success');

                        // Local UI update for better performance
                        const card = btn.closest('.petition-card');
                        const progressBar = card.querySelector('.petition-progress-bar');
                        const stats = card.querySelector('.petition-stats span');

                        btn.classList.add('signed');
                        btn.disabled = true;
                        btn.classList.add('signed');
                        btn.disabled = true;
                        btn.textContent = state.language === 'es' ? 'Firmado ✓' : 'Signed ✓';

                        const newPercent = Math.min((pet.signatures / pet.goal) * 100, 100);
                        progressBar.style.width = `${newPercent}%`;
                        stats.textContent = `${pet.signatures.toLocaleString()} ${state.language === 'es' ? 'firmado' : 'signed'}`;
                    }
                });
            });
        };

        document.getElementById('start-petition-btn').addEventListener('click', showPetitionModal);

        updatePetitions();
    }

    // ===== PETITION MODAL =====
    function showPetitionModal() {
        if (!modal || !modalBody) return;
        const isEs = state.language === 'es';
        const contentHtml = `
            <div class="modal-form">
                <h2>${isEs ? 'Iniciar una Petición Comunitaria' : 'Start a Community Petition'}</h2>
                <p>${isEs ? '¿Qué cambio te gustaría ver en Houston?' : 'What change would you like to see in Houston?'}</p>
                <form id="petition-form">
                    <div class="form-group">
                        <label>${isEs ? 'Vecindario/Distrito Objetivo' : 'Target Neighborhood/District'}</label>
                        <select id="pet-category">
                            <option>${isEs ? 'Transporte' : 'Transportation'}</option>
                            <option>${isEs ? 'Educación' : 'Education'}</option>
                            <option>${isEs ? 'Medio Ambiente' : 'Environment'}</option>
                            <option>${isEs ? 'Seguridad' : 'Safety'}</option>
                            <option>${isEs ? 'Salud' : 'Health'}</option>
                            <option>${isEs ? 'Otro' : 'Other'}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>${isEs ? 'Título de la Petición' : 'Petition Title'}</label>
                        <input type="text" id="pet-title" placeholder="${isEs ? 'ej. Salvar el Parque Hernandez' : 'e.g. Save Hernandez Park'}" required>
                    </div>
                    <div class="form-group">
                        <label>${isEs ? 'Meta de Firmas' : 'Signature Goal'}</label>
                        <input type="number" id="pet-goal" value="1000" min="100" required>
                    </div>
                    <div class="form-group">
                        <label>${isEs ? 'Descripción y Por qué importa' : 'Description & Why this matters'}</label>
                        <textarea id="pet-desc" rows="4" placeholder="${isEs ? 'Explique el impacto de este cambio...' : 'Explain the impact of this change...'}" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary w-full" style="padding: 1.25rem; font-size: 1.1rem; margin-top: 1rem;">
                        ${isEs ? 'Lanzar Petición' : 'Launch Petition'}
                    </button>
                </form>
            </div>
            `;
        openModal(contentHtml);

        document.getElementById('petition-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const newPet = {
                id: Date.now(),
                title: document.getElementById('pet-title').value,
                description: document.getElementById('pet-desc').value,
                category: document.getElementById('pet-category').value,
                creator: isEs ? "Residente" : "Resident",
                timestamp: isEs ? "Justo ahora" : "Just now",
                signatures: 1,
                goal: parseInt(document.getElementById('pet-goal').value),
                signed: true
            };
            state.petitions.unshift(newPet);
            localStorage.setItem('petitions', JSON.stringify(state.petitions));
            closeModal();
            showToast(isEs ? '¡Su petición ha sido lanzada!' : 'Your petition has been launched!', 'success');
            if (state.currentView === 'petitions') renderPetitions();
        });
    }

    // Consolidated confetti removed from here


    // ===== SERVICE WORKER REGISTRATION (PWA) =====
    if ('serviceWorker' in navigator) {
        // Service worker would be registered here for full PWA functionality
        console.log('PWA ready - Service Worker support available');
    }
}
