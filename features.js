/**
 * features.js - Extended Features Module
 * Interactive Map, Location Filtering, Reviews, PDF Export, Accessibility, etc.
 */

// ===== RESOURCE COORDINATES (Houston area) =====
const resourceCoordinates = {
    1: { lat: 29.7494, lng: -95.2836 }, // Houston Food Bank
    2: { lat: 29.7655, lng: -95.4239 }, // Memorial Park Tennis
    3: { lat: 29.7840, lng: -95.3196 }, // Finnigan Park
    4: { lat: 29.7560, lng: -95.4050 }, // Houston Area Women's Center
    5: { lat: 29.7284, lng: -95.4144 }, // Levy Park
    6: { lat: 29.7604, lng: -95.3698 }, // Boys & Girls Clubs
    10: { lat: 29.3824, lng: -94.9058 }, // Galveston County Food Bank
    11: { lat: 29.8185, lng: -95.4140 }, // Kids' Meals Houston
    12: { lat: 29.5698, lng: -95.5392 }, // Second Mile Mission
    13: { lat: 29.6196, lng: -95.6349 }, // Sugar Land Community Center
    14: { lat: 29.7550, lng: -95.3565 }, // Discovery Green
    15: { lat: 29.7629, lng: -95.3691 }, // Tellepsen YMCA
    16: { lat: 29.6935, lng: -95.5080 }, // Bayland Community Center
    17: { lat: 29.7452, lng: -95.2527 }, // Star of Hope
    18: { lat: 29.7574, lng: -95.3705 }, // Coalition for the Homeless
    19: { lat: 29.7628, lng: -95.4071 }, // United Way
    20: { lat: 29.7594, lng: -95.3683 }, // Houston Public Library
    21: { lat: 29.6765, lng: -95.3398 }, // Angela House
    22: { lat: 30.0975, lng: -95.6160 }, // Tomball Pregnancy Center
    23: { lat: 29.7580, lng: -95.4000 }, // The HAY Center
    24: { lat: 29.6502, lng: -95.5422 }, // Destiny's Door
    // New resources
    25: { lat: 29.7604, lng: -95.3698 }, // Target Hunger
    26: { lat: 29.9688, lng: -95.6963 }, // Cy-Fair Helping Hands
    27: { lat: 30.0972, lng: -95.6167 }, // TEAM Tomball
    28: { lat: 29.7604, lng: -95.3698 }, // Mission Bells
    29: { lat: 29.7774, lng: -95.5600 }, // WHAM
    30: { lat: 29.7604, lng: -95.3698 }, // Bread of Life
    31: { lat: 29.7604, lng: -95.3698 }, // Second Servings
    32: { lat: 29.7604, lng: -95.3698 }, // Catholic Charities
    33: { lat: 29.7850, lng: -95.4100 }, // Heights Interfaith
    34: { lat: 29.7604, lng: -95.3698 }, // Common Market
    35: { lat: 29.7604, lng: -95.3698 }, // RaiseUp Families
    36: { lat: 29.7612, lng: -95.4145 }, // Buffalo Bayou Park
    37: { lat: 29.7194, lng: -95.3900 }, // Hermann Park
    38: { lat: 29.7655, lng: -95.4400 }, // Memorial Park
    39: { lat: 30.1430, lng: -95.1562 }, // Lake Houston Wilderness
    40: { lat: 29.5740, lng: -95.0860 }, // Armand Bayou
    41: { lat: 29.7194, lng: -95.3885 }, // Miller Outdoor Theatre
    42: { lat: 29.7604, lng: -95.3698 }, // Houston BCycle
    43: { lat: 29.8060, lng: -95.6360 }, // Bear Creek Park
    44: { lat: 29.8410, lng: -95.6430 }, // Cullen Park
    45: { lat: 29.7636, lng: -95.3628 }, // Market Square Park
    46: { lat: 29.7604, lng: -95.3698 }, // BakerRipley
    47: { lat: 29.7604, lng: -95.3698 }, // Precinct 2
    48: { lat: 29.7604, lng: -95.3698 }, // Precinct 4
    49: { lat: 29.7304, lng: -95.3598 }, // S.H.A.P.E.
    50: { lat: 29.7350, lng: -95.3250 }, // The FORGE
    51: { lat: 29.8015, lng: -95.3264 }, // Nehemiah Center
    52: { lat: 29.7790, lng: -95.3940 }, // Wesley Community
    53: { lat: 29.7630, lng: -95.4100 }, // MECA
    54: { lat: 29.7428, lng: -95.3870 }, // Covenant House
    55: { lat: 29.7574, lng: -95.3670 }, // Hope Center
    56: { lat: 29.7574, lng: -95.3668 }, // The Beacon
    57: { lat: 29.7574, lng: -95.3705 }, // SEARCH
    58: { lat: 29.7510, lng: -95.4680 }, // Housing Authority
    59: { lat: 29.6990, lng: -95.4880 }, // Harris Center
    60: { lat: 29.7350, lng: -95.4080 }, // MHA Houston
    61: { lat: 29.7071, lng: -95.3993 }, // Hope & Healing
    62: { lat: 29.7604, lng: -95.3698 }, // re:MIND
    63: { lat: 29.7284, lng: -95.3775 }, // NAMI
    64: { lat: 29.6870, lng: -95.4360 }, // Bo's Place
    65: { lat: 29.7690, lng: -95.4110 }, // Family Houston
    66: { lat: 29.7886, lng: -95.4950 }, // Memorial Assistance
    67: { lat: 29.7590, lng: -95.3650 }, // Big Brothers Big Sisters
    68: { lat: 29.7604, lng: -95.3698 }, // Friends of the Children
    69: { lat: 29.7604, lng: -95.3698 }, // Boys to Men
    70: { lat: 29.7604, lng: -95.3698 }, // Hope for Youth
    71: { lat: 29.7555, lng: -95.3624 }, // Urban League Youth
    72: { lat: 29.7604, lng: -95.3698 }, // GirlStart
    73: { lat: 29.7594, lng: -95.3683 }, // HPL After School
    74: { lat: 29.7604, lng: -95.3698 }, // Kidventure
    75: { lat: 29.7395, lng: -95.3845 }, // Cabrini Center
    76: { lat: 29.7604, lng: -95.3698 }, // Immigration Legal Services
    77: { lat: 29.6870, lng: -95.4880 }, // YMCA International
    78: { lat: 29.7604, lng: -95.3698 }, // BakerRipley Immigration
    79: { lat: 29.4241, lng: -98.4936 }, // RAICES (San Antonio)
    80: { lat: 29.6985, lng: -95.4580 }, // Easter Seals
    81: { lat: 29.6929, lng: -95.5558 }, // The Arc
    82: { lat: 29.7284, lng: -95.3775 }, // Disability Rights TX
    83: { lat: 29.7604, lng: -95.3698 }, // Down Syndrome Assoc
    84: { lat: 29.7604, lng: -95.3698 }, // HCDE Adult Ed
    85: { lat: 29.7230, lng: -95.4770 }, // Houston Center for Literacy
    86: { lat: 29.7604, lng: -95.3698 }, // HCPL Literacy
    87: { lat: 29.7604, lng: -95.3698 }, // HCC Adult Ed
    88: { lat: 29.7604, lng: -95.3698 }, // Barbara Bush Literacy
    89: { lat: 29.7604, lng: -95.3698 }, // Workforce Solutions
    90: { lat: 29.7967, lng: -95.4170 }, // SERJobs
    91: { lat: 29.7555, lng: -95.3624 }, // Urban League Workforce
    92: { lat: 29.7604, lng: -95.3698 }, // WorkTexas
    93: { lat: 29.7604, lng: -95.3698 }, // United Way THRIVE
    94: { lat: 29.7500, lng: -95.3750 }, // Interfaith Ministries
    95: { lat: 29.6850, lng: -95.4130 }, // Area Agency on Aging
    96: { lat: 29.7604, lng: -95.3698 }  // Meals on Wheels
};

// ===== USER LOCATION & DISTANCE =====
let userLocation = null;

function getUserLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation not supported'));
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                localStorage.setItem('userLocation', JSON.stringify(userLocation));
                resolve(userLocation);
            },
            (error) => {
                // Try to get cached location
                const cached = localStorage.getItem('userLocation');
                if (cached) {
                    userLocation = JSON.parse(cached);
                    resolve(userLocation);
                } else {
                    // Default to downtown Houston
                    userLocation = { lat: 29.7604, lng: -95.3698 };
                    resolve(userLocation);
                }
            },
            { enableHighAccuracy: true, timeout: 10000 }
        );
    });
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 3959; // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function getResourceDistance(resourceId) {
    if (!userLocation) return null;
    const coords = resourceCoordinates[resourceId];
    if (!coords) return null;
    return calculateDistance(userLocation.lat, userLocation.lng, coords.lat, coords.lng);
}

function formatDistance(miles) {
    if (miles === null || miles === undefined) return '';
    if (miles < 0.1) return '< 0.1 mi';
    return miles.toFixed(1) + ' mi';
}

// ===== USER REVIEWS =====
function getResourceReviews(resourceId) {
    const reviews = JSON.parse(localStorage.getItem('userReviews') || '{}');
    return reviews[resourceId] || [];
}

function addResourceReview(resourceId, review) {
    const reviews = JSON.parse(localStorage.getItem('userReviews') || '{}');
    if (!reviews[resourceId]) reviews[resourceId] = [];
    reviews[resourceId].unshift({
        ...review,
        id: Date.now(),
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('userReviews', JSON.stringify(reviews));
    return reviews[resourceId];
}

function getAverageUserRating(resourceId) {
    const reviews = getResourceReviews(resourceId);
    if (reviews.length === 0) return null;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / reviews.length).toFixed(1);
}


// ===== RESOURCE SUBMISSIONS TRACKER =====
function getSubmissions() {
    return JSON.parse(localStorage.getItem('resourceSubmissions') || '[]');
}

function addSubmission(submission) {
    const submissions = getSubmissions();
    const newSubmission = {
        ...submission,
        id: Date.now(),
        status: 'pending',
        submittedAt: new Date().toISOString()
    };
    submissions.unshift(newSubmission);
    localStorage.setItem('resourceSubmissions', JSON.stringify(submissions));
    return newSubmission;
}

function getSubmissionStatus(submissionId) {
    const submissions = getSubmissions();
    return submissions.find(s => s.id === submissionId);
}

// ===== ACCESSIBILITY FEATURES =====
const accessibilityFeatures = {
    wheelchair: { icon: 'fa-wheelchair', label: 'Wheelchair Accessible', label_es: 'Accesible para sillas de ruedas' },
    tty: { icon: 'fa-tty', label: 'TTY Available', label_es: 'TTY Disponible' },
    interpreter: { icon: 'fa-language', label: 'Interpreter Services', label_es: 'Servicios de Intérprete' },
    braille: { icon: 'fa-braille', label: 'Braille Materials', label_es: 'Materiales en Braille' },
    hearing: { icon: 'fa-ear-deaf', label: 'Hearing Loop', label_es: 'Bucle de Audición' },
    parking: { icon: 'fa-square-parking', label: 'Accessible Parking', label_es: 'Estacionamiento Accesible' }
};

// Resource accessibility data (sample - expand as needed)
const resourceAccessibility = {
    1: ['wheelchair', 'interpreter', 'parking'], // Houston Food Bank
    2: ['wheelchair', 'parking'], // Memorial Park Tennis
    4: ['wheelchair', 'tty', 'interpreter', 'parking'], // Houston Area Women's Center
    14: ['wheelchair', 'parking'], // Discovery Green
    15: ['wheelchair', 'hearing', 'parking'], // Tellepsen YMCA
    17: ['wheelchair', 'tty', 'interpreter', 'parking'], // Star of Hope
    19: ['wheelchair', 'tty', 'interpreter', 'parking'], // United Way
    20: ['wheelchair', 'tty', 'braille', 'hearing', 'parking'], // Houston Public Library
    36: ['wheelchair', 'parking'], // Buffalo Bayou Park
    37: ['wheelchair', 'parking'], // Hermann Park
    38: ['wheelchair', 'parking'], // Memorial Park
    41: ['wheelchair', 'hearing', 'parking'], // Miller Outdoor Theatre
    54: ['wheelchair', 'interpreter', 'parking'], // Covenant House
    59: ['wheelchair', 'tty', 'interpreter', 'hearing', 'parking'], // Harris Center
    63: ['wheelchair', 'tty', 'interpreter', 'parking'], // NAMI
    80: ['wheelchair', 'tty', 'interpreter', 'hearing', 'braille', 'parking'], // Easter Seals
    81: ['wheelchair', 'tty', 'interpreter', 'parking'], // The Arc
    82: ['wheelchair', 'tty', 'interpreter', 'parking'] // Disability Rights TX
};

function getResourceAccessibility(resourceId) {
    const features = resourceAccessibility[resourceId] || [];
    return features.map(f => accessibilityFeatures[f]);
}

// ===== COMMUNITY STORIES =====
const communityStories = [
    {
        id: 1,
        name: "Maria G.",
        story: "The Houston Food Bank helped my family during a really difficult time. We received fresh produce and pantry staples every week. Now I volunteer there to give back!",
        story_es: "El Banco de Alimentos de Houston ayudó a mi familia durante un momento muy difícil. Recibíamos productos frescos y alimentos básicos cada semana. ¡Ahora soy voluntaria para devolver el favor!",
        resourceId: 1,
        image: null
    },
    {
        id: 2,
        name: "James T.",
        story: "Big Brothers Big Sisters matched me with a mentor who became like family. He helped me graduate high school and get into college. This program changed my life.",
        story_es: "Big Brothers Big Sisters me emparejó con un mentor que se convirtió en familia. Me ayudó a graduarme de la preparatoria y entrar a la universidad. Este programa cambió mi vida.",
        resourceId: 67,
        image: null
    },
    {
        id: 3,
        name: "Sandra L.",
        story: "NAMI's support groups helped me understand I wasn't alone. The free education about mental health gave my family the tools to support my recovery.",
        story_es: "Los grupos de apoyo de NAMI me ayudaron a entender que no estaba sola. La educación gratuita sobre salud mental le dio a mi familia las herramientas para apoyar mi recuperación.",
        resourceId: 63,
        image: null
    },
    {
        id: 4,
        name: "Robert K.",
        story: "After losing my job, Workforce Solutions helped me get certified in HVAC. Within 3 months, I had a better paying job than before. They really care about your success.",
        story_es: "Después de perder mi trabajo, Workforce Solutions me ayudó a certificarme en HVAC. En 3 meses, tenía un trabajo mejor pagado que antes. Realmente les importa tu éxito.",
        resourceId: 89,
        image: null
    },
    {
        id: 5,
        name: "Patricia M.",
        story: "Meals on Wheels doesn't just bring food - they bring friendship. The volunteers check on me every day and make sure I'm doing okay. It means the world to me.",
        story_es: "Meals on Wheels no solo trae comida - trae amistad. Los voluntarios me visitan todos los días y se aseguran de que esté bien. Significa mucho para mí.",
        resourceId: 96,
        image: null
    }
];


// ===== MAP FUNCTIONALITY =====
let resourceMap = null;
let mapMarkers = [];

function initializeMap(containerId, resources, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return null;

    // Default to Houston center
    const center = options.center || [29.7604, -95.3698];
    const zoom = options.zoom || 11;

    // Destroy existing map if present
    if (resourceMap) {
        resourceMap.remove();
        resourceMap = null;
    }

    resourceMap = L.map(containerId).setView(center, zoom);

    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(resourceMap);

    // Add markers for resources
    updateMapMarkers(resources, options.onMarkerClick);

    // Add user location marker if available
    if (userLocation) {
        L.marker([userLocation.lat, userLocation.lng], {
            icon: L.divIcon({
                className: 'user-location-marker',
                html: '<i class="fas fa-user-circle" style="color: #2196F3; font-size: 24px;"></i>',
                iconSize: [24, 24],
                iconAnchor: [12, 12]
            })
        }).addTo(resourceMap).bindPopup('📍 Your Location');
    }

    return resourceMap;
}

function updateMapMarkers(resources, onMarkerClick) {
    // Clear existing markers
    mapMarkers.forEach(m => m.remove());
    mapMarkers = [];

    if (!resourceMap) return;

    resources.forEach(res => {
        const coords = resourceCoordinates[res.id];
        if (!coords) return;

        const categoryColors = {
            'Food Security': '#4CAF50',
            'Recreation': '#2196F3',
            'Community Centers': '#9C27B0',
            'Support Services': '#FF5722',
            'Youth Programs': '#FFC107',
            'Immigration Services': '#00BCD4',
            'Disability Services': '#E91E63',
            'Education': '#3F51B5',
            'Job Training': '#795548',
            'Senior Services': '#607D8B'
        };

        const color = categoryColors[res.category] || '#00796b';

        const marker = L.marker([coords.lat, coords.lng], {
            icon: L.divIcon({
                className: 'resource-marker',
                html: `<div style="background: ${color}; color: white; padding: 6px 10px; border-radius: 20px; font-weight: 600; box-shadow: 0 2px 8px rgba(0,0,0,0.3); white-space: nowrap; font-size: 11px;"><i class="fas fa-map-marker-alt"></i></div>`,
                iconSize: [32, 32],
                iconAnchor: [16, 32]
            })
        });

        const dist = getResourceDistance(res.id);
        const distText = dist ? ` • ${formatDistance(dist)}` : '';

        marker.bindPopup(`
            <div style="min-width: 200px;">
                <strong>${res.name}</strong><br>
                <span style="color: ${color};">${res.category}</span>${distText}<br>
                <small>${res.location}</small><br>
                <small>🕐 ${res.hours}</small>
                <div style="margin-top: 8px;">
                    <button onclick="window.showResourceDetailFromMap(${res.id})" style="background: ${color}; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 12px;">
                        View Details
                    </button>
                    <a href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(res.location)}" target="_blank" style="background: #4CAF50; color: white; border: none; padding: 6px 12px; border-radius: 6px; text-decoration: none; font-size: 12px; margin-left: 4px;">
                        Directions
                    </a>
                </div>
            </div>
        `);

        marker.addTo(resourceMap);
        mapMarkers.push(marker);
    });
}

function filterMapByDistance(maxMiles, resources) {
    if (!userLocation) return resources;
    return resources.filter(res => {
        const dist = getResourceDistance(res.id);
        return dist !== null && dist <= maxMiles;
    });
}

// ===== GET DIRECTIONS =====
function getDirectionsUrl(location, mode = 'driving') {
    const encoded = encodeURIComponent(location);
    // Check if on iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS) {
        return `maps://maps.apple.com/?daddr=${encoded}&dirflg=${mode === 'walking' ? 'w' : 'd'}`;
    }
    return `https://www.google.com/maps/dir/?api=1&destination=${encoded}&travelmode=${mode}`;
}

// ===== NEWSLETTER =====
function subscribeToNewsletter(email) {
    const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
    if (subscribers.includes(email)) {
        return { success: false, message: 'Already subscribed!' };
    }
    subscribers.push(email);
    localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
    return { success: true, message: 'Thanks for subscribing!' };
}

// ===== EXPOSE GLOBAL FUNCTIONS =====
window.resourceCoordinates = resourceCoordinates;
window.getUserLocation = getUserLocation;
window.getResourceDistance = getResourceDistance;
window.formatDistance = formatDistance;
window.getResourceReviews = getResourceReviews;
window.addResourceReview = addResourceReview;
window.getAverageUserRating = getAverageUserRating;
window.getSubmissions = getSubmissions;
window.addSubmission = addSubmission;
window.getSubmissionStatus = getSubmissionStatus;
window.accessibilityFeatures = accessibilityFeatures;
window.getResourceAccessibility = getResourceAccessibility;
window.communityStories = communityStories;
window.initializeMap = initializeMap;
window.updateMapMarkers = updateMapMarkers;
window.filterMapByDistance = filterMapByDistance;
window.getDirectionsUrl = getDirectionsUrl;
window.subscribeToNewsletter = subscribeToNewsletter;
window.userLocation = null;

// Initialize user location on load
getUserLocation().then(loc => {
    window.userLocation = loc;
    console.log('User location:', loc);
}).catch(err => {
    console.log('Location error:', err);
});
