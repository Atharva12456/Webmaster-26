/**
 * Houston Community Hub - Main Application Logic
 * Implements SPA navigation, search/filter, and state persistence.
 */

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    // State management
    const state = {
        resources: JSON.parse(localStorage.getItem('resources')) || initialResources,
        petitions: JSON.parse(localStorage.getItem('petitions')) || initialPetitions,
        currentView: 'directory',
        filters: {
            search: '',
            category: 'All'
        },
        theme: localStorage.getItem('theme') || 'light'
    };

    // DOM Elements
    const contentDisplay = document.getElementById('content-display');
    const navLinks = document.querySelectorAll('.nav-links a, .sidebar-links a');
    const themeToggle = document.getElementById('theme-toggle');
    const rootSearch = document.getElementById('main-search-input');
    const logo = document.querySelector('.logo');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const sidebar = document.getElementById('mobile-sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const closeSidebar = document.querySelector('.close-sidebar');

    // Sidebar Logic
    const toggleSidebar = () => {
        sidebar.classList.toggle('active');
        sidebarOverlay.classList.toggle('active');
    };

    mobileMenuBtn.addEventListener('click', toggleSidebar);
    sidebarOverlay.addEventListener('click', toggleSidebar);
    closeSidebar.addEventListener('click', toggleSidebar);

    // Initial Render Settings
    logo.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default anchor behavior to allow filter reset
        state.filters.search = '';
        state.filters.category = 'All';
        rootSearch.value = '';
        window.location.hash = '#directory';
        renderDirectory(); // Force re-render if already on directory
    });

    // Centralized search listener (prevents duplicates on re-render)
    rootSearch.addEventListener('input', (e) => {
        state.filters.search = e.target.value;
        if (window.location.hash !== '#directory') window.location.hash = 'directory';
        // Re-render if already on directory, else hashchange will handle it
        if (state.currentView === 'directory') {
            renderDirectoryGrid();
        }
    });

    // Initialize Theme
    document.body.setAttribute('data-theme', state.theme);
    updateThemeIcon();

    // Navigation Logic
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.replace('#', '') || 'directory';
        renderSection(hash);
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    themeToggle.addEventListener('click', toggleTheme);

    // Sidebar-specific event listeners
    const sidebarThemeToggle = document.getElementById('sidebar-theme-toggle');
    const sidebarSuggestBtn = document.getElementById('sidebar-suggest-btn');

    sidebarThemeToggle.addEventListener('click', toggleTheme);
    sidebarSuggestBtn.addEventListener('click', () => {
        toggleSidebar(); // Close sidebar first
        showSuggestModal();
    });

    function toggleTheme() {
        state.theme = state.theme === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', state.theme);
        localStorage.setItem('theme', state.theme);
        updateThemeIcon();
    }

    function updateThemeIcon() {
        const icon = themeToggle.querySelector('i');
        const sidebarIcon = sidebarThemeToggle.querySelector('i');
        const iconClass = state.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        icon.className = iconClass;
        sidebarIcon.className = iconClass;
    }

    // Initial Render
    const initialHash = window.location.hash.replace('#', '') || 'directory';
    renderSection(initialHash);

    // Dynamic Rendering Core
    function renderSection(section) {
        contentDisplay.innerHTML = '';
        state.currentView = section;

        switch (section) {
            case 'directory':
                renderDirectory();
                break;
            case 'featured':
                renderFeatured();
                break;
            case 'petitions':
                renderPetitions();
                break;
            case 'support':
                renderSupport();
                break;
            default:
                renderDirectory();
        }
    }

    function renderDirectory() {
        contentDisplay.innerHTML = `
            <div class="trending-banner animate-in">
                <div class="trending-badge">TRENDING NOW</div>
                <p><strong>Memorial Park Tennis Center</strong> just added 4 new clay courts! <a href="#directory" onclick="state.filters.category='Recreation'; updateGrid();">Book now &rarr;</a></p>
            </div>
            <div class="section-header">
                <div>
                    <h2>Resource Directory</h2>
                    <p id="results-count" class="text-muted"></p>
                </div>
                <div class="directory-controls">
                    <select id="category-filter">
                        <option value="All">All Categories</option>
                        <option value="Food Security">Food Security</option>
                        <option value="Recreation">Recreation</option>
                        <option value="Community Centers">Community Centers</option>
                        <option value="Support Services">Support Services</option>
                        <option value="Youth Programs">Youth Programs</option>
                    </select>
                </div>
            </div>
            <div id="resource-grid" class="resource-grid"></div>
        `;

        const grid = document.getElementById('resource-grid');

        const updateGrid = () => {
            const filtered = state.resources.filter(res => {
                const matchesSearch = res.name.toLowerCase().includes(state.filters.search.toLowerCase()) ||
                    res.description.toLowerCase().includes(state.filters.search.toLowerCase());
                const matchesCategory = state.filters.category === 'All' || res.category === state.filters.category;
                return matchesSearch && matchesCategory;
            });

            document.getElementById('results-count').textContent = `Showing ${filtered.length} resources in Houston`;

            grid.innerHTML = filtered.map(res => `
                <div class="resource-card animate-in">
                    <div class="card-header">
                        <span class="category-badge">${res.category}</span>
                        <h3>${res.name}</h3>
                    </div>
                    <p>${res.description}</p>
                    <div class="card-footer">
                        <span><i class="fas fa-location-dot"></i> ${res.location}</span>
                        <div class="rating-row">
                            <div class="rating">
                                <i class="fas fa-star"></i> ${res.rating} (${res.reviews})
                            </div>
                            ${res.category === 'Recreation' ? `<button class="btn btn-primary btn-sm book-btn" data-id="${res.id}">Book Venue</button>` : ''}
                        </div>
                    </div>
                </div>
            `).join('');

            grid.querySelectorAll('.book-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const id = parseInt(e.target.dataset.id);
                    const res = state.resources.find(r => r.id === id);
                    showBookingModal(res);
                });
            });
        };

        document.getElementById('category-filter').addEventListener('change', (e) => {
            state.filters.category = e.target.value;
            updateGrid();
        });

        // Expose updateGrid so the centralized search listener can call it
        renderDirectoryGrid = updateGrid;


        updateGrid();
    }

    // Modal Handling
    const modal = document.getElementById('modal-container');
    const modalBody = document.getElementById('modal-body');
    const suggestBtn = document.getElementById('suggest-resource-btn');
    const closeModal = document.querySelector('.close-modal');

    suggestBtn.addEventListener('click', () => {
        showSuggestModal();
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    function showSuggestModal() {
        modalBody.innerHTML = `
            <div class="modal-form">
                <h2>Suggest a New Resource</h2>
                <p>Help us expand our community hub by suggesting a local service.</p>
                <form id="suggest-form">
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
                    <div class="form-group">
                        <label for="res-location">Location</label>
                        <input type="text" id="res-location" placeholder="Address or neighborhood" required>
                    </div>
                    <div class="form-group">
                        <label for="res-desc">Brief Description</label>
                        <textarea id="res-desc" rows="4" placeholder="How does this resource help the community?" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary w-full" style="padding: 1.25rem; font-size: 1.1rem; margin-top: 1rem;">
                        Submit Resource
                    </button>
                </form>
            </div>
        `;
        modal.classList.add('active');

        document.getElementById('suggest-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const newRes = {
                id: Date.now(),
                name: document.getElementById('res-name').value,
                category: document.getElementById('res-category').value,
                description: document.getElementById('res-desc').value,
                location: document.getElementById('res-location').value,
                hours: "To be verified",
                rating: 5.0,
                reviews: 0,
                tags: ["User Suggested"]
            };
            state.resources.unshift(newRes);
            localStorage.setItem('resources', JSON.stringify(state.resources));
            modal.classList.remove('active');
            if (state.currentView === 'directory') renderDirectory();
            alert('Thank you! Your suggestion has been added locally.');
        });
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
            alert(`Booking Confirmed!\nVenue: ${res.name}\nDate: ${document.getElementById('book-date').value}\nTime: ${document.getElementById('book-time').value}`);
            modal.classList.remove('active');
        });
    }

    function renderFeatured() {
        const featured = state.resources.slice(0, 3);
        contentDisplay.innerHTML = `
            <div class="section-header">
                <h2>Community Spotlight</h2>
                <p>Highlighting the most impactful resources in Houston.</p>
            </div>
            <div class="featured-container">
                ${featured.map(res => `
                    <div class="featured-card animate-in">
                        <div class="featured-image" style="background: linear-gradient(135deg, var(--primary-teal), var(--secondary-coral))">
                            <i class="fas fa-star spotlight-icon"></i>
                        </div>
                        <div class="featured-content">
                            <span class="category-badge">${res.category}</span>
                            <h3>${res.name}</h3>
                            <p>${res.description}</p>
                            <button class="btn btn-outline" onclick="window.location.hash = '#directory'">Learn More</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    function renderPetitions() {
        contentDisplay.innerHTML = `
            <div class="section-header">
                <div>
                    <h2>Community Petitions</h2>
                    <p>Support initiatives that make Houston better for everyone.</p>
                </div>
                <div style="display: flex; gap: 1rem;">
                    <button class="btn btn-outline" id="export-petitions-btn"><i class="fas fa-download"></i> Export</button>
                    <button class="btn btn-primary" id="start-petition-btn">Start a Petition</button>
                </div>
            </div>
            <div class="petition-grid" id="petition-list"></div>
        `;

        const list = document.getElementById('petition-list');

        const updatePetitions = () => {
            list.innerHTML = state.petitions.map(pet => {
                const percent = Math.min((pet.signatures / pet.goal) * 100, 100);
                return `
                    <div class="petition-card animate-in">
                        <h3>${pet.title}</h3>
                        <p>${pet.description}</p>
                        <div class="petition-info">
                            <span class="text-muted" style="font-size: 0.85rem">Started by ${pet.creator} • ${pet.timestamp}</span>
                        </div>
                        <div class="progress-wrapper" style="margin-top: 1rem">
                            <div class="progress-container">
                                <div class="progress-bar" style="width: ${percent}%"></div>
                            </div>
                            <div class="petition-meta">
                                <span>${pet.signatures.toLocaleString()} signed</span>
                                <span>Goal: ${pet.goal.toLocaleString()}</span>
                            </div>
                        </div>
                        <button class="btn btn-primary sign-btn" data-id="${pet.id}" ${pet.signed ? 'disabled' : ''} style="margin-top: 1.5rem; width: 100%">
                            ${pet.signed ? 'Signed ✓' : 'Sign Petition'}
                        </button>
                    </div>
                `;
            }).join('');

            list.querySelectorAll('.sign-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const id = parseInt(e.target.dataset.id);
                    const pet = state.petitions.find(p => p.id === id);
                    if (pet && !pet.signed) {
                        pet.signatures++;
                        pet.signed = true;
                        localStorage.setItem('petitions', JSON.stringify(state.petitions));
                        updatePetitions();
                    }
                });
            });
        };

        document.getElementById('start-petition-btn').addEventListener('click', () => {
            showPetitionModal();
        });

        document.getElementById('export-petitions-btn').addEventListener('click', () => {
            alert('Signatures exported to HoustonHub_Petitions.csv (Simulated)');
        });

        updatePetitions();
    }

    function showPetitionModal() {
        modalBody.innerHTML = `
            <div class="modal-form">
                <h2>Start a Petition</h2>
                <p>What change would you like to see in Houston?</p>
                <form id="petition-form">
                    <div class="form-group">
                        <label>Petition Title</label>
                        <input type="text" id="pet-title" placeholder="e.g. Save Hernandez Park" required>
                    </div>
                    <div class="form-group">
                        <label>Target Signature Goal</label>
                        <input type="number" id="pet-goal" value="1000" required>
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <textarea id="pet-desc" rows="4" placeholder="Explain why this change is needed..." required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary w-full">Launch Petition</button>
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
                creator: "Resident",
                timestamp: "Just now",
                signatures: 1,
                goal: parseInt(document.getElementById('pet-goal').value),
                signed: true
            };
            state.petitions.unshift(newPet);
            localStorage.setItem('petitions', JSON.stringify(state.petitions));
            modal.classList.remove('active');
            renderPetitions();
        });
    }

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

        document.getElementById('newsletter-form').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thanks for subscribing! We will keep you updated.');
            e.target.reset();
        });
    }
}
