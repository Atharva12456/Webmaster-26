/**
 * Houston Community Hub - Main Application Logic
 * Implements SPA navigation, search/filter, favorites, toasts, accessibility, and more.
 */

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
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
            category: 'All',
            openNow: false
        },
        theme: localStorage.getItem('theme') || 'light',
        fontSize: localStorage.getItem('fontSize') || 'normal',
        contrast: localStorage.getItem('contrast') || 'normal',
        language: localStorage.getItem('language') || 'en',
        hasSeenTour: localStorage.getItem('hasSeenTour') === 'true',
        carouselIndex: 0
    };

    // ===== DOM ELEMENTS =====
    const contentDisplay = document.getElementById('content-display');
    const navLinks = document.querySelectorAll('.nav-links a, .sidebar-links a, .bottom-nav-items a');
    const themeToggle = document.getElementById('theme-toggle');
    const rootSearch = document.getElementById('main-search-input');
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

        // Update document direction if needed (for RTL languages, though not applicable here yet)
        document.documentElement.lang = lang;
    };

    // Initial translation apply
    updateLanguage(state.language);

    langOptionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            state.language = btn.dataset.lang;
            localStorage.setItem('language', state.language);
            langToggle.innerHTML = `<i class="fas fa-globe"></i> ${state.language.toUpperCase()}`;

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
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 2 + 's';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            document.querySelector('.success-overlay')?.appendChild(confetti);
        }
    }

    // ===== INITIAL RENDER =====
    const initialHash = window.location.hash.replace('#', '') || 'directory';
    renderSection(initialHash);
    updateActiveNav(initialHash);

    // Show onboarding tour for first-time visitors
    if (!state.hasSeenTour) {
        setTimeout(() => startTour(), 1500);
    }

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
        const categories = ['All', 'Food Security', 'Recreation', 'Community Centers', 'Support Services', 'Youth Programs'];
        const categoryCounts = {};
        categories.forEach(cat => {
            if (cat === 'All') {
                categoryCounts[cat] = state.resources.length;
            } else {
                categoryCounts[cat] = state.resources.filter(r => r.category === cat).length;
            }
        });

        contentDisplay.innerHTML = `
            <!-- Emergency Resources Section -->
            <div class="emergency-section animate-in">
                <div class="emergency-header">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>Emergency Resources</h3>
                </div>
                <div class="emergency-grid">
                    ${emergencyResources.map(e => `
                        <div class="emergency-card">
                            <div class="emergency-icon"><i class="fas ${e.icon}"></i></div>
                            <div class="emergency-info">
                                <h4>${e.name}</h4>
                                <a href="tel:${e.number.replace(/[^0-9]/g, '')}" class="emergency-number">${e.number}</a>
                                <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.25rem">${e.description}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Recently Viewed -->
            ${state.recentlyViewed.length > 0 ? `
                <div class="recently-viewed animate-in">
                    <h3><i class="fas fa-history"></i> Recently Viewed</h3>
                    <div class="recent-items">
                        ${state.recentlyViewed.map(r => `
                            <div class="recent-item" data-id="${r.id}">
                                <h4>${r.name}</h4>
                                <span>${r.category}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            <!-- Trending Banner -->
            <div class="trending-banner animate-in">
                <div class="trending-badge">TRENDING NOW</div>
                <p><strong>Memorial Park Tennis Center</strong> just added 4 new clay courts! <a href="#directory">Book now &rarr;</a></p>
            </div>

            <!-- Section Header -->
            <div class="section-header">
                <div>
                    <h2>Resource Directory</h2>
                    <p id="results-count" class="text-muted"></p>
                </div>
                <div class="directory-controls" style="display: flex; gap: 1rem; align-items: center;">
                    <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer; font-weight: 600;">
                        <input type="checkbox" id="open-now-filter" ${state.filters.openNow ? 'checked' : ''}>
                        <span class="open-badge">Open Now</span>
                    </label>
                </div>
            </div>

            <!-- Filter Chips -->
            <div class="filter-chips">
                ${categories.map(cat => `
                    <button class="filter-chip ${state.filters.category === cat ? 'active' : ''}" data-category="${cat}">
                        ${cat} <span class="count">${categoryCounts[cat]}</span>
                    </button>
                `).join('')}
                ${state.filters.category !== 'All' || state.filters.search ? `
                    <button class="clear-filters"><i class="fas fa-times"></i> Clear Filters</button>
                ` : ''}
            </div>

            <!-- Resource Grid -->
            <div id="resource-grid" class="resource-grid"></div>
        `;

        const grid = document.getElementById('resource-grid');

        const updateGrid = () => {
            const filtered = state.resources.filter(res => {
                const matchesSearch = res.name.toLowerCase().includes(state.filters.search.toLowerCase()) ||
                    res.description.toLowerCase().includes(state.filters.search.toLowerCase()) ||
                    (res.tags && res.tags.some(tag => tag.toLowerCase().includes(state.filters.search.toLowerCase())));
                const matchesCategory = state.filters.category === 'All' || res.category === state.filters.category;
                const matchesOpen = !state.filters.openNow || isOpenNow(res.hours);
                return matchesSearch && matchesCategory && matchesOpen;
            });

            document.getElementById('results-count').textContent = `Showing ${filtered.length} resources in Houston`;

            if (filtered.length === 0) {
                grid.innerHTML = `
                    <div style="grid-column: 1/-1; text-align: center; padding: 4rem;">
                        <i class="fas fa-search" style="font-size: 4rem; color: var(--text-muted); margin-bottom: 1rem;"></i>
                        <h3>No resources found</h3>
                        <p style="color: var(--text-muted)">Try adjusting your filters or search terms.</p>
                    </div>
                `;
                return;
            }

            grid.innerHTML = filtered.map(res => {
                const isFavorite = state.favorites.includes(res.id);
                const openStatus = isOpenNow(res.hours);
                return `
                    <div class="resource-card animate-in" data-id="${res.id}">
                        <div class="card-header" style="display: flex; justify-content: space-between; align-items: flex-start;">
                            <div>
                                <span class="category-badge">${res.category}</span>
                                <span class="${openStatus ? 'open-badge' : 'open-badge closed-badge'}" style="margin-left: 0.5rem;">
                                    ${openStatus ? 'Open' : 'Closed'}
                                </span>
                            </div>
                            <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-id="${res.id}" aria-label="${isFavorite ? 'Remove from favorites' : 'Add to favorites'}">
                                <i class="fas fa-heart"></i>
                            </button>
                        </div>
                        <h3>${res.name}</h3>
                        <p>${res.description}</p>
                        ${res.impact ? `
                            <div style="background: rgba(0, 121, 107, 0.05); padding: 1rem; border-radius: 12px; text-align: center;">
                                <div style="font-size: 1.75rem; font-weight: 700; color: var(--primary-teal);">${res.impact.metric}</div>
                                <div style="font-size: 0.85rem; color: var(--text-muted);">${res.impact.label}</div>
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
                                <button class="share-btn twitter" data-share="twitter" data-name="${res.name}" aria-label="Share on Twitter"><i class="fab fa-twitter"></i></button>
                                <button class="share-btn facebook" data-share="facebook" data-name="${res.name}" aria-label="Share on Facebook"><i class="fab fa-facebook-f"></i></button>
                                <button class="share-btn copy" data-share="copy" data-name="${res.name}" aria-label="Copy link"><i class="fas fa-link"></i></button>
                            </div>
                        </div>
                        <div class="card-actions" style="display: flex; gap: 0.5rem; margin-top: 1rem; flex-wrap: wrap;">
                            ${res.website ? `
                                <a href="${res.website}" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="flex: 1;">
                                    <i class="fas fa-external-link-alt"></i> Visit Website
                                </a>
                            ` : ''}
                            ${res.category === 'Recreation' ? `
                                <button class="btn btn-primary book-btn" data-id="${res.id}" style="flex: 1;">
                                    <i class="fas fa-calendar-check"></i> Book Venue
                                </button>
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
                    rootSearch.value = tag.dataset.tag;
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
                state.filters.category = chip.dataset.category;
                document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                updateGrid();
            });
        });

        // Clear filters
        document.querySelector('.clear-filters')?.addEventListener('click', () => {
            state.filters.category = 'All';
            state.filters.search = '';
            state.filters.openNow = false;
            rootSearch.value = '';
            document.getElementById('open-now-filter').checked = false;
            renderDirectory();
        });

        // Open now filter
        document.getElementById('open-now-filter')?.addEventListener('change', (e) => {
            state.filters.openNow = e.target.checked;
            updateGrid();
        });

        // Search input
        rootSearch.addEventListener('input', (e) => {
            state.filters.search = e.target.value;
            if (window.location.hash !== '#directory') window.location.hash = 'directory';
            updateGrid();
        });

        // Recently viewed clicks
        document.querySelectorAll('.recent-item').forEach(item => {
            item.addEventListener('click', () => {
                const id = parseInt(item.dataset.id);
                const res = state.resources.find(r => r.id === id);
                if (res) {
                    state.filters.search = res.name;
                    rootSearch.value = res.name;
                    updateGrid();
                }
            });
        });

        updateGrid();
    }

    // ===== FEATURED SECTION WITH CAROUSEL =====
    function renderFeatured() {
        const featured = state.resources.filter(r => r.impact).slice(0, 5);

        contentDisplay.innerHTML = `
            <div class="section-header">
                <h2>Community Spotlight</h2>
                <p>Highlighting the most impactful resources in Houston.</p>
            </div>
            
            <div class="carousel-container">
                <div class="carousel-track" id="carousel-track">
                    ${featured.map((res, i) => `
                        <div class="carousel-slide">
                            <div class="featured-card animate-in">
                                <div class="featured-image" style="background: linear-gradient(135deg, var(--primary-teal), var(--secondary-coral))">
                                    <div style="text-align: center; color: white;">
                                        <div style="font-size: 4rem; font-weight: 700;">${res.impact?.metric || ''}</div>
                                        <div style="font-size: 1.25rem; opacity: 0.9;">${res.impact?.label || ''}</div>
                                    </div>
                                </div>
                                <div class="featured-content">
                                    <span class="category-badge">${res.category}</span>
                                    <h3>${res.name}</h3>
                                    <p>${res.description}</p>
                                    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                                        ${res.website ? `
                                            <a href="${res.website}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                                                <i class="fas fa-external-link-alt"></i> Visit Website
                                            </a>
                                        ` : ''}
                                        <button class="btn btn-outline" onclick="window.location.hash = '#directory'">View Details</button>
                                        <button class="btn btn-outline favorite-featured-btn" data-id="${res.id}">
                                            <i class="fas fa-heart"></i> Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="carousel-controls">
                    <button class="carousel-btn" id="carousel-prev"><i class="fas fa-chevron-left"></i></button>
                    <div class="carousel-dots">
                        ${featured.map((_, i) => `<button class="carousel-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></button>`).join('')}
                    </div>
                    <button class="carousel-btn" id="carousel-next"><i class="fas fa-chevron-right"></i></button>
                </div>
            </div>

            <!-- Volunteer Opportunities -->
            <div class="section-header" style="margin-top: 6rem;">
                <h2>Volunteer Opportunities</h2>
                <p>Make a difference in your community.</p>
            </div>
            <div class="volunteer-grid">
                ${volunteerOpportunities.map(v => `
                    <div class="volunteer-card animate-in">
                        <span class="volunteer-badge">${v.frequency}</span>
                        <h3>${v.title}</h3>
                        <p style="color: var(--primary-teal); font-weight: 600;">${v.organization}</p>
                        <p>${v.description}</p>
                        <div class="volunteer-meta">
                            <span><i class="fas fa-clock"></i> ${v.commitment}</span>
                            <span><i class="fas fa-map-marker-alt"></i> ${v.location}</span>
                        </div>
                        <div class="tags-container">
                            ${v.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                        <a href="${v.website}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="width: 100%; margin-top: 1.5rem;">Sign Up to Volunteer</a>
                    </div>
                `).join('')}
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
        const now = new Date();
        const currentMonth = now.toLocaleString('default', { month: 'long', year: 'numeric' });
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

        contentDisplay.innerHTML = `
            <div class="section-header">
                <h2>Community Calendar</h2>
                <p>Stay updated with events happening across Houston.</p>
            </div>

            <div class="calendar-view animate-in">
                <div class="calendar-header">
                    <h3>${currentMonth}</h3>
                    <div class="calendar-nav">
                        <button class="carousel-btn"><i class="fas fa-chevron-left"></i></button>
                        <button class="carousel-btn"><i class="fas fa-chevron-right"></i></button>
                    </div>
                </div>
                <div class="calendar-grid">
                    <div class="calendar-day-header">Sun</div>
                    <div class="calendar-day-header">Mon</div>
                    <div class="calendar-day-header">Tue</div>
                    <div class="calendar-day-header">Wed</div>
                    <div class="calendar-day-header">Thu</div>
                    <div class="calendar-day-header">Fri</div>
                    <div class="calendar-day-header">Sat</div>
                    ${calendarDays}
                </div>
            </div>

            <div class="section-header">
                <h2>Upcoming Events</h2>
            </div>
            <div class="event-grid">
                ${calendarEvents.slice(0, 6).map(event => `
                    <div class="event-card animate-in">
                        <span class="event-category">${event.category}</span>
                        <h3>${event.title}</h3>
                        <p><i class="fas fa-calendar"></i> ${event.date}</p>
                        <p><i class="fas fa-clock"></i> ${event.time}</p>
                        <p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                        <p style="margin-top: 1rem; color: var(--text-muted);">${event.description}</p>
                        <a href="https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.date.replace(/-/g, '')}/${event.date.replace(/-/g, '')}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="width: 100%; margin-top: 1rem;"><i class="fas fa-calendar-plus"></i> Add to Calendar</a>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // ===== SUPPORT SECTION =====
    function renderSupport() {
        contentDisplay.innerHTML = `
            <div class="section-header">
                <h2>Support Your Community</h2>
                <p>Your support helps non-profits provide essential services to Houstonians.</p>
            </div>
            <div class="support-grid">
                ${initialNonprofits.map(org => `
                    <div class="support-card animate-in">
                        <div class="support-icon"><i class="fas fa-heart"></i></div>
                        <h3>${org.name}</h3>
                        <p>${org.description}</p>
                        <a href="${org.link}" target="_blank" class="btn btn-primary">Learn More & Donate</a>
                    </div>
                `).join('')}
            </div>

            <!-- Transportation Resources -->
            <div class="section-header">
                <h2>Transportation Resources</h2>
                <p>Get around Houston with these transportation options.</p>
            </div>
            <div class="transport-grid">
                ${transportationResources.map(t => `
                    <div class="transport-card animate-in">
                        <div class="transport-icon"><i class="fas ${t.icon}"></i></div>
                        <div>
                            <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem;">${t.name}</h3>
                            <p style="margin-bottom: 0.75rem;">${t.description}</p>
                            <p style="font-weight: 600; color: var(--primary-teal);">${t.cost}</p>
                            <a href="${t.website}" target="_blank" class="btn btn-outline" style="margin-top: 1rem;">Visit Website</a>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="section-header">
                <h2>School Events</h2>
                <p>Stay updated with events from Houston ISD and local schools.</p>
            </div>
            <div class="event-grid">
                ${schoolEvents.map(event => `
                    <div class="event-card animate-in">
                        <span class="event-category">${event.category}</span>
                        <h3>${event.title}</h3>
                        <p><strong>${event.school}</strong></p>
                        <p><i class="fas fa-calendar"></i> ${event.date} | ${event.time}</p>
                    </div>
                `).join('')}
            </div>

            <div class="newsletter-card animate-in">
                <h3>Houston Hub Newsletter</h3>
                <p>Get weekly updates on resources, events, and community news.</p>
                <form class="newsletter-form" id="newsletter-form">
                    <input type="email" placeholder="Enter your email address" required>
                    <button type="submit" class="btn btn-primary">Join Now</button>
                </form>
            </div>
        `;

        document.getElementById('newsletter-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Thanks for subscribing! We\'ll keep you updated.', 'success');
            e.target.reset();
        });
    }

    // ===== FAVORITES SECTION =====
    function renderFavorites() {
        const favoriteResources = state.resources.filter(r => state.favorites.includes(r.id));

        contentDisplay.innerHTML = `
            <div class="section-header">
                <h2>Your Favorites</h2>
                <p>${favoriteResources.length} saved resources</p>
            </div>
            ${favoriteResources.length === 0 ? `
                <div style="text-align: center; padding: 6rem 2rem;">
                    <i class="fas fa-heart" style="font-size: 5rem; color: var(--text-muted); margin-bottom: 2rem;"></i>
                    <h3>No favorites yet</h3>
                    <p style="color: var(--text-muted); margin-bottom: 2rem;">Save resources by clicking the heart icon on resource cards.</p>
                    <a href="#directory" class="btn btn-primary">Browse Resources</a>
                </div>
            ` : `
                <div class="resource-grid">
                    ${favoriteResources.map(res => `
                        <div class="resource-card animate-in">
                            <div class="card-header" style="display: flex; justify-content: space-between;">
                                <span class="category-badge">${res.category}</span>
                                <button class="favorite-btn active" data-id="${res.id}"><i class="fas fa-heart"></i></button>
                            </div>
                            <h3>${res.name}</h3>
                            <p>${res.description}</p>
                            <div class="card-footer">
                                <span><i class="fas fa-location-dot"></i> ${res.location}</span>
                            </div>
                        </div>
                    `).join('')}
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
    }

    // ===== MODALS =====
    const modal = document.getElementById('modal-container');
    const modalBody = document.getElementById('modal-body');
    const suggestBtn = document.getElementById('suggest-resource-btn');
    const closeModalBtn = document.querySelector('.close-modal');
    const partnerBtn = document.getElementById('partner-inquiry-btn');

    suggestBtn?.addEventListener('click', showSuggestModal);
    partnerBtn?.addEventListener('click', showPartnerModal);
    closeModalBtn?.addEventListener('click', () => modal.classList.remove('active'));

    function showSuggestModal() {
        modalBody.innerHTML = `
            <div class="modal-form">
                <h2>Suggest a New Resource</h2>
                <p>Help us expand our community hub by suggesting a local service.</p>
                
                <div class="form-steps">
                    <div class="form-step active" data-step="1">
                        <div class="step-number">1</div>
                        <span class="step-label">Basic Info</span>
                    </div>
                    <div class="form-step" data-step="2">
                        <div class="step-number">2</div>
                        <span class="step-label">Details</span>
                    </div>
                    <div class="form-step" data-step="3">
                        <div class="step-number">3</div>
                        <span class="step-label">Submit</span>
                    </div>
                </div>

                <form id="suggest-form">
                    <div class="form-panel active" data-panel="1">
                        <div class="form-group">
                            <label for="res-name">Organization Name</label>
                            <input type="text" id="res-name" placeholder="e.g. Houston Literacy Center" required>
                        </div>
                        <div class="form-group">
                            <label for="res-category">Category</label>
                            <select id="res-category">
                                <option>Food Security</option>
                                <option>Recreation</option>
                                <option>Community Centers</option>
                                <option>Support Services</option>
                                <option>Youth Programs</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-panel" data-panel="2">
                        <div class="form-group">
                            <label for="res-location">Location</label>
                            <input type="text" id="res-location" placeholder="Address or neighborhood" required>
                        </div>
                        <div class="form-group">
                            <label for="res-hours">Operating Hours</label>
                            <input type="text" id="res-hours" placeholder="e.g. 9:00 AM - 5:00 PM">
                        </div>
                        <div class="form-group">
                            <label for="res-website">Website (optional)</label>
                            <input type="url" id="res-website" placeholder="https://...">
                        </div>
                    </div>

                    <div class="form-panel" data-panel="3">
                        <div class="form-group">
                            <label for="res-desc">Brief Description</label>
                            <textarea id="res-desc" rows="4" placeholder="How does this resource help the community?" required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="res-contact">Your Email (optional)</label>
                            <input type="email" id="res-contact" placeholder="For follow-up questions">
                        </div>
                    </div>

                    <div class="form-nav">
                        <button type="button" class="btn btn-outline" id="prev-step" style="display: none;">Previous</button>
                        <button type="button" class="btn btn-primary" id="next-step">Next</button>
                    </div>
                </form>
            </div>
        `;
        modal.classList.add('active');

        // Multi-step form logic
        let currentStep = 1;
        const totalSteps = 3;
        const prevBtn = document.getElementById('prev-step');
        const nextBtn = document.getElementById('next-step');

        const updateStepUI = () => {
            document.querySelectorAll('.form-step').forEach(step => {
                const stepNum = parseInt(step.dataset.step);
                step.classList.remove('active', 'completed');
                if (stepNum === currentStep) step.classList.add('active');
                if (stepNum < currentStep) step.classList.add('completed');
            });

            document.querySelectorAll('.form-panel').forEach(panel => {
                panel.classList.remove('active');
                if (parseInt(panel.dataset.panel) === currentStep) panel.classList.add('active');
            });

            prevBtn.style.display = currentStep === 1 ? 'none' : 'block';
            nextBtn.textContent = currentStep === totalSteps ? 'Submit Resource' : 'Next';
        };

        prevBtn.addEventListener('click', () => {
            if (currentStep > 1) {
                currentStep--;
                updateStepUI();
            }
        });

        nextBtn.addEventListener('click', () => {
            if (currentStep < totalSteps) {
                currentStep++;
                updateStepUI();
            } else {
                // Submit
                const newRes = {
                    id: Date.now(),
                    name: document.getElementById('res-name').value,
                    category: document.getElementById('res-category').value,
                    description: document.getElementById('res-desc').value,
                    location: document.getElementById('res-location').value,
                    hours: document.getElementById('res-hours').value || "To be verified",
                    rating: 5.0,
                    reviews: 0,
                    tags: ["User Suggested"]
                };
                state.resources.unshift(newRes);
                localStorage.setItem('resources', JSON.stringify(state.resources));
                modal.classList.remove('active');

                // Show success animation
                showSuccessAnimation();

                if (state.currentView === 'directory') {
                    setTimeout(() => renderDirectory(), 2500);
                }
            }
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
        modalBody.innerHTML = `
            <div class="modal-form">
                <h2>Book Venue: ${res.name}</h2>
                <p>Select a date and time to reserve this community space.</p>
                <form id="booking-form">
                    <div class="form-group">
                        <label>Select Date</label>
                        <input type="date" id="book-date" required>
                    </div>
                    <div class="form-group">
                        <label>Select Time</label>
                        <select id="book-time" required>
                            <option>09:00 AM</option>
                            <option>11:00 AM</option>
                            <option>01:00 PM</option>
                            <option>03:00 PM</option>
                            <option>05:00 PM</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Number of People</label>
                        <input type="number" id="book-count" min="1" max="50" value="2" required>
                    </div>
                    <button type="submit" class="btn btn-primary w-full">Confirm Booking</button>
                </form>
            </div>
        `;
        modal.classList.add('active');

        document.getElementById('booking-form').addEventListener('submit', (e) => {
            e.preventDefault();
            modal.classList.remove('active');
            showToast(`Booking confirmed for ${res.name}!`, 'success');
        });
    }

    function showPartnerModal() {
        modalBody.innerHTML = `
            <div class="modal-form">
                <h2>Partner With Us</h2>
                <p>Are you a non-profit or community organization? Let's work together to serve Houston.</p>
                <form id="partner-form">
                    <div class="form-group">
                        <label>Organization Name</label>
                        <input type="text" placeholder="Your organization" required>
                    </div>
                    <div class="form-group">
                        <label>Contact Email</label>
                        <input type="email" placeholder="email@organization.org" required>
                    </div>
                    <div class="form-group">
                        <label>How can we help?</label>
                        <textarea rows="4" placeholder="Tell us about your organization and how we can partner..."></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary" style="width: 100%;">Submit Inquiry</button>
                </form>
            </div>
        `;
        modal.classList.add('active');

        document.getElementById('partner-form').addEventListener('submit', (e) => {
            e.preventDefault();
            modal.classList.remove('active');
            showToast('Thank you! We\'ll be in touch soon.', 'success');
        });
    }

    // ===== ONBOARDING TOUR =====
    function startTour() {
        if (tourSteps.length === 0) return;

        let currentTourStep = 0;
        const overlay = document.getElementById('tour-overlay');
        const tooltip = document.getElementById('tour-tooltip');
        const titleEl = document.getElementById('tour-title');
        const descEl = document.getElementById('tour-desc');
        const dotsEl = document.getElementById('tour-dots');
        const nextBtn = document.getElementById('tour-next');

        // Helper to clear highlights
        const clearHighlights = () => {
            document.querySelectorAll('.tour-highlight').forEach(el => {
                el.classList.remove('tour-highlight');
            });
        };

        const showStep = () => {
            clearHighlights();
            const step = tourSteps[currentTourStep];
            const target = document.querySelector(step.target);

            if (!target) {
                currentTourStep++;
                if (currentTourStep < tourSteps.length) showStep();
                else endTour();
                return;
            }

            // Add highlight class to target
            target.classList.add('tour-highlight');

            overlay.classList.add('active');
            tooltip.style.display = 'block';

            titleEl.textContent = step.title;
            descEl.textContent = step.description;

            dotsEl.innerHTML = tourSteps.map((_, i) =>
                `<div class="tour-dot ${i === currentTourStep ? 'active' : ''}"></div>`
            ).join('');

            nextBtn.textContent = currentTourStep === tourSteps.length - 1 ? 'Got it!' : 'Next';

            // Position tooltip
            const rect = target.getBoundingClientRect();
            // Ensure tooltip fits within viewport
            let top = rect.bottom + 20;
            let left = Math.max(20, rect.left);

            // Should add boundary checks ideally, but basic positioning:
            tooltip.style.top = `${top}px`;
            tooltip.style.left = `${left}px`;

            // Scroll target into view if needed
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        };

        const endTour = () => {
            clearHighlights();
            overlay.classList.remove('active');
            tooltip.style.display = 'none';
            state.hasSeenTour = true;
            localStorage.setItem('hasSeenTour', 'true');
            showToast('Welcome to Houston Hub! 👋', 'success');
        };

        // Clone button to remove old event listeners if any (simple safety)
        const newNextBtn = nextBtn.cloneNode(true);
        nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);

        newNextBtn.addEventListener('click', () => {
            currentTourStep++;
            if (currentTourStep < tourSteps.length) {
                showStep();
            } else {
                endTour();
            }
        });

        overlay.addEventListener('click', endTour);

        showStep();
    }

    // ===== KEYBOARD NAVIGATION =====
    document.addEventListener('keydown', (e) => {
        // Escape to close modals
        if (e.key === 'Escape') {
            modal.classList.remove('active');
            a11yPanel.classList.remove('active');
            langDropdown.classList.remove('active');
        }

        // Slash to focus search
        if (e.key === '/' && !e.target.closest('input, textarea')) {
            e.preventDefault();
            rootSearch.focus();
        }
    });

    // ===== PETITIONS SECTION =====
    function renderPetitions() {
        contentDisplay.innerHTML = `
            <div class="section-header">
                <div>
                    <h2>Create a Change</h2>
                    <p>Support initiatives that make Houston better for everyone.</p>
                </div>
                <button class="btn btn-primary" id="start-petition-btn">
                    <i class="fas fa-plus"></i> Start a Petition
                </button>
            </div>
            <div class="petition-grid" id="petition-list"></div>
        `;

        const list = document.getElementById('petition-list');

        const updatePetitions = () => {
            list.innerHTML = state.petitions.map(pet => {
                const percent = Math.min((pet.signatures / pet.goal) * 100, 100);
                return `
                    <div class="petition-card animate-in">
                        <div class="petition-category">${pet.category}</div>
                        <h3>${pet.title}</h3>
                        <p>${pet.description}</p>
                        
                        <div class="petition-progress-wrapper">
                            <div class="petition-stats">
                                <span>${pet.signatures.toLocaleString()} signed</span>
                                <span class="goal">Goal: ${pet.goal.toLocaleString()}</span>
                            </div>
                            <div class="petition-progress-container">
                                <div class="petition-progress-bar" style="width: ${percent}%"></div>
                            </div>
                        </div>

                        <button class="btn btn-primary sign-btn ${pet.signed ? 'signed' : ''}" 
                                data-id="${pet.id}" ${pet.signed ? 'disabled' : ''}>
                            ${pet.signed ? 'Signed ✓' : 'Sign this Petition'}
                        </button>

                        <div class="petition-author">
                            <span>By ${pet.creator}</span>
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
                        showToast('Thank you for signing!', 'success');

                        // Local UI update for better performance
                        const card = btn.closest('.petition-card');
                        const progressBar = card.querySelector('.petition-progress-bar');
                        const stats = card.querySelector('.petition-stats span');

                        btn.classList.add('signed');
                        btn.disabled = true;
                        btn.textContent = 'Signed ✓';

                        const newPercent = Math.min((pet.signatures / pet.goal) * 100, 100);
                        progressBar.style.width = `${newPercent}%`;
                        stats.textContent = `${pet.signatures.toLocaleString()} signed`;
                    }
                });
            });
        };

        document.getElementById('start-petition-btn').addEventListener('click', showPetitionModal);

        updatePetitions();
    }

    function showPetitionModal() {
        modalBody.innerHTML = `
            <div class="modal-form">
                <h2>Start a Community Petition</h2>
                <p>What change would you like to see in Houston?</p>
                <form id="petition-form">
                    <div class="form-group">
                        <label>Target Neighborhood/District</label>
                        <select id="pet-category">
                            <option>Transportation</option>
                            <option>Education</option>
                            <option>Environment</option>
                            <option>Safety</option>
                            <option>Health</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Petition Title</label>
                        <input type="text" id="pet-title" placeholder="e.g. Save Hernandez Park" required>
                    </div>
                    <div class="form-group">
                        <label>Signature Goal</label>
                        <input type="number" id="pet-goal" value="1000" min="100" required>
                    </div>
                    <div class="form-group">
                        <label>Description & Why this matters</label>
                        <textarea id="pet-desc" rows="4" placeholder="Explain the impact of this change..." required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary w-full" style="padding: 1.25rem; font-size: 1.1rem; margin-top: 1rem;">
                        Launch Petition
                    </button>
                </form>
            </div>
        `;
        modal.classList.add('active');

        document.getElementById('petition-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const newPet = {
                id: Date.now(),
                title: document.getElementById('pet-title').value,
                description: document.getElementById('pet-desc').value,
                category: document.getElementById('pet-category').value,
                creator: "Resident",
                timestamp: "Just now",
                signatures: 1,
                goal: parseInt(document.getElementById('pet-goal').value),
                signed: true
            };
            state.petitions.unshift(newPet);
            localStorage.setItem('petitions', JSON.stringify(state.petitions));
            modal.classList.remove('active');
            showToast('Your petition has been launched!', 'success');
            if (state.currentView === 'petitions') renderPetitions();
        });
    }

    // ===== CONFETTI ANIMATION =====
    function createConfetti() {
        const colors = ['#00796b', '#ff7043', '#ffffff', '#ffd54f'];
        const container = document.querySelector('.success-overlay');

        if (!container) return;

        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'absolute';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = -10 + 'px';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.opacity = Math.random();
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

            const duration = Math.random() * 2 + 1;
            confetti.style.transition = `top ${duration}s ease-in, opacity ${duration}s ease-in`;

            container.appendChild(confetti);

            // Animate
            setTimeout(() => {
                confetti.style.top = '100%';
                confetti.style.opacity = '0';
            }, 100);
        }
    }

    // ===== SERVICE WORKER REGISTRATION (PWA) =====
    if ('serviceWorker' in navigator) {
        // Service worker would be registered here for full PWA functionality
        console.log('PWA ready - Service Worker support available');
    }
}
