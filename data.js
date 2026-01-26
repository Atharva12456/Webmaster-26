// ===== INITIAL RESOURCES =====
const initialResources = [
    // 1. Food Security
    {
        id: 1,
        name: "Houston Food Bank",
        category: "Food Security",
        description: "Leading the fight against hunger in southeast Texas by distributing food to over 1.1 million hungry people annually.",
        location: "535 Portwall St, Houston, TX 77029",
        hours: "8:00 AM - 6:00 PM",
        rating: 4.8, reviews: 1240, tags: ["Volunteer", "Donations"],
        impact: { metric: "1.1M+", label: "People Fed Annually" },
        website: "https://www.houstonfoodbank.org/"
    },
    {
        id: 10,
        name: "Galveston County Food Bank",
        category: "Food Security",
        description: "Providing nutrition and hope to the food insecure of Galveston County through advocacy and resource distribution.",
        location: "624 4th Ave N, Texas City, TX 77590",
        hours: "8:00 AM - 4:00 PM",
        rating: 4.7, reviews: 310, tags: ["Coastal", "Nutrition"],
        impact: { metric: "25K+", label: "Families Served" },
        website: "https://www.galvestoncountyfoodbank.org/"
    },
    {
        id: 11,
        name: "Kids' Meals Houston",
        category: "Food Security",
        description: "The only home-delivery meal program in Houston for preschool-aged children living in poverty.",
        location: "330 Garden Oaks Blvd, Houston, TX 77018",
        hours: "9:00 AM - 3:00 PM",
        rating: 4.9, reviews: 850, tags: ["Youth", "Poverty Relief"],
        impact: { metric: "3M+", label: "Meals Delivered" },
        website: "https://www.kidsmealsinc.org/"
    },
    {
        id: 12,
        name: "Second Mile Mission District",
        category: "Food Security",
        description: "Offering hope to neighbors in Fort Bend County by providing food, counseling, and health services.",
        location: "1135 Hwy 90A, Missouri City, TX 77489",
        hours: "10:00 AM - 5:00 PM",
        rating: 4.6, reviews: 220, tags: ["Missouri City", "Health"],
        website: "https://www.secondmilemission.org/"
    },

    // 2. Recreation
    {
        id: 2,
        name: "Memorial Park Tennis Center",
        category: "Recreation",
        description: "One of the best public tennis facilities in the country, featuring 18 courts and professional instruction.",
        location: "1500 Memorial Loop Dr, Houston, TX 77007",
        hours: "6:00 AM - 9:00 PM",
        rating: 4.6, reviews: 450, tags: ["Court Booking", "Sports"],
        impact: { metric: "18", label: "Courts Available" },
        website: "https://www.memorialparkconservancy.org/tennis/"
    },
    {
        id: 13,
        name: "Sugar Land Community Center",
        category: "Recreation",
        description: "Providing a wide range of recreational, leisure, and social opportunities for residents of Sugar Land.",
        location: "226 Matlage Way, Sugar Land, TX 77478",
        hours: "8:00 AM - 8:00 PM",
        rating: 4.4, reviews: 560, tags: ["Classes", "Social"],
        website: "https://www.sugarlandtx.gov/"
    },
    {
        id: 5,
        name: "Levy Park",
        category: "Recreation",
        description: "An urban park in Upper Kirby featuring a playground, splash pad, dog park, and community programs.",
        location: "3801 Eastside St, Houston, TX 77098",
        hours: "6:00 AM - 11:00 PM",
        rating: 4.7, reviews: 2150, tags: ["Family", "Outdoors"],
        impact: { metric: "500K+", label: "Annual Visitors" },
        website: "https://www.levyparkhouston.org/"
    },
    {
        id: 14,
        name: "Discovery Green",
        category: "Recreation",
        description: "Vibrant downtown park offering free events, public art, and green space for Houstonians to gather.",
        location: "1500 McKinney St, Houston, TX 77010",
        hours: "6:00 AM - 11:00 PM",
        rating: 4.8, reviews: 8900, tags: ["Downtown", "Free Events"],
        website: "https://www.discoverygreen.com/"
    },

    // 3. Community Centers
    {
        id: 15,
        name: "Tellepsen Family Downtown YMCA",
        category: "Community Centers",
        description: "A hub for health, wellness, and community connection in the heart of downtown Houston.",
        location: "808 Pease St, Houston, TX 77002",
        hours: "5:00 AM - 9:00 PM",
        rating: 4.5, reviews: 1100, tags: ["Fitness", "Connection"],
        website: "https://www.ymcahouston.org/"
    },
    {
        id: 16,
        name: "Bayland Community Center",
        category: "Community Centers",
        description: "A Harris County Precinct 4 facility offering activities for seniors, youth, and the general public.",
        location: "6400 Bissonnet St, Houston, TX 77074",
        hours: "8:00 AM - 8:00 PM",
        rating: 4.3, reviews: 290, tags: ["Seniors", "Precinct 4"],
        website: "https://www.hcp4.net/"
    },
    {
        id: 3,
        name: "Finnigan Park Recreation Center",
        category: "Community Centers",
        description: "A hub for neighborhood activities, featuring after-school programs, fitness classes, and senior events.",
        location: "4900 Providence St, Houston, TX 77020",
        hours: "9:00 AM - 8:00 PM",
        rating: 4.5, reviews: 89, tags: ["Youth", "Seniors"],
        website: "https://www.houstonparks.org/"
    },

    // 4. Support Services
    {
        id: 17,
        name: "Star of Hope Mission",
        category: "Support Services",
        description: "Dedicated to meeting the needs of Houston's homeless men, women, and their children through Christ-centered programs.",
        location: "4848 Jacinto City, TX 77029",
        hours: "24/7",
        rating: 4.8, reviews: 920, tags: ["Housing", "Pantry"],
        impact: { metric: "2,000+", label: "Beds Available" },
        website: "https://www.sohmission.org/"
    },
    {
        id: 18,
        name: "Coalition for the Homeless",
        category: "Support Services",
        description: "Leading the Way Home - coordinating the community response to homelessness in Houston and surrounding counties.",
        location: "2010 Congress St, Houston, TX 77002",
        hours: "9:00 AM - 5:00 PM",
        rating: 4.7, reviews: 410, tags: ["Advocacy", "Way Home"],
        website: "https://www.homelesshouston.org/"
    },
    {
        id: 4,
        name: "Houston Area Women's Center",
        category: "Support Services",
        description: "Providing shelter, counseling, and advocacy for individuals affected by domestic and sexual violence.",
        location: "1010 Waugh Dr, Houston, TX 77019",
        hours: "24/7 Crisis Line",
        rating: 4.9, reviews: 320, tags: ["Counseling", "Safe Space"],
        impact: { metric: "35K+", label: "People Helped Yearly" },
        website: "https://hawc.org/"
    },
    {
        id: 19,
        name: "United Way of Greater Houston",
        category: "Support Services",
        description: "Helping our neighbors thrive by connecting them with people and resources to improve their lives.",
        location: "50 Waugh Dr, Houston, TX 77007",
        hours: "8:30 AM - 5:00 PM",
        rating: 4.6, reviews: 1500, tags: ["Financial", "2-1-1"],
        website: "https://www.unitedwayhouston.org/"
    },
    {
        id: 21,
        name: "Angela House",
        category: "Support Services",
        description: "Successfully transitioning women into society after incarceration through a residential program of recovery.",
        location: "6725 Reed Rd, Houston, TX 77087",
        hours: "9:00 AM - 5:00 PM",
        rating: 4.8, reviews: 120, tags: ["Recovery", "Re-entry"],
        website: "https://www.angelahouse.org/"
    },
    {
        id: 22,
        name: "Tomball Pregnancy Center",
        category: "Support Services",
        description: "Providing bilingual client services, medical testing, and parents' resources for mothers in need.",
        location: "990 Village Square Dr, Tomball, TX 77375",
        hours: "10:00 AM - 4:00 PM",
        rating: 4.7, reviews: 85, tags: ["Family", "Medical"],
        website: "https://www.tomballpregnancy.com/"
    },

    // 5. Youth Programs
    {
        id: 6,
        name: "Boys & Girls Clubs of Greater Houston",
        category: "Youth Programs",
        description: "Inspiring and enabling all young people to realize their full potential as productive, responsible, and caring citizens.",
        location: "Multiple Locations",
        hours: "2:00 PM - 8:00 PM",
        rating: 4.6, reviews: 180, tags: ["Mentorship", "Education"],
        impact: { metric: "40K+", label: "Youth Served" },
        website: "https://www.bgcgh.org/"
    },
    {
        id: 20,
        name: "Houston Public Library - Central",
        category: "Youth Programs",
        description: "Providing free access to information, educational programs, and technology for Houston's youth and families.",
        location: "500 McKinney St, Houston, TX 77002",
        hours: "10:00 AM - 6:00 PM",
        rating: 4.7, reviews: 3400, tags: ["Literacy", "Tech Access"],
        website: "https://houstonlibrary.org/"
    },
    {
        id: 23,
        name: "The HAY Center",
        category: "Youth Programs",
        description: "Empowering foster youth in their transition to adulthood through mentorship, employment, and housing support.",
        location: "1216 West Clay St, Houston, TX 77019",
        hours: "8:30 AM - 5:00 PM",
        rating: 4.9, reviews: 200, tags: ["Foster Youth", "Mentorship"],
        website: "https://www.haycenter.org/"
    },
    {
        id: 24,
        name: "Destiny's Door",
        category: "Youth Programs",
        description: "Empowering young women through mentorship, life skills training, and educational support.",
        location: "12603 S. Gessner Rd, Houston, TX 77071",
        hours: "By Appointment",
        rating: 4.6, reviews: 45, tags: ["Mentorship", "Empowerment"],
        website: "https://www.destinysdoor.org/"
    }
];

// ===== PETITIONS =====
const initialPetitions = [
    {
        id: 1,
        title: "Protected Bike Lanes on Main Street",
        description: "Requesting the City of Houston to install physical barriers for bike lanes on Main St to protect cyclists from traffic and encourage sustainable commuting.",
        creator: "Sarah Jenkins",
        timestamp: "2 days ago",
        signatures: 450,
        goal: 1000,
        category: "Transportation",
        signed: false
    },
    {
        id: 2,
        title: "Extend Public Library Hours",
        description: "Our community libraries currently close at 6 PM. We are petitioning for hours to be extended to 9 PM at least two days a week to support students and working families.",
        creator: "Mark Thompson",
        timestamp: "1 week ago",
        signatures: 820,
        goal: 1000,
        category: "Education",
        signed: false
    },
    {
        id: 3,
        title: "New Community Garden in Third Ward",
        description: "We are seeking approval and funding for a new community managed garden near Emancipation Park to provide fresh produce and green space for local residents.",
        creator: "Elena Rodriguez",
        timestamp: "3 days ago",
        signatures: 125,
        goal: 500,
        category: "Environment",
        signed: false
    },
    {
        id: 4,
        title: "Improve Lighting in Hermann Park",
        description: "For the safety of evening joggers and families, we demand the installation of energy-efficient LED streetlights along the outer loop of Hermann Park.",
        creator: "David Chen",
        timestamp: "5 days ago",
        signatures: 940,
        goal: 1500,
        category: "Safety",
        signed: false
    },
    {
        id: 5,
        title: "Expanded Youth Mental Health Services",
        description: "Urging HISD to increase the number of licensed counselors and mental health specialists in middle and high schools across the district.",
        creator: "Dr. Maya Patil",
        timestamp: "2 weeks ago",
        signatures: 2300,
        goal: 5000,
        category: "Health",
        signed: false
    }
];

// ===== NONPROFITS =====
const initialNonprofits = [
    {
        name: "United Way of Greater Houston",
        description: "Connecting people with local resources to help them improve their lives.",
        link: "https://www.unitedwayhouston.org/"
    },
    {
        name: "Star of Hope Mission",
        description: "Providing essential services to Houston's homeless population.",
        link: "https://www.sohmission.org/"
    },
    {
        name: "Houston Area Women's Center",
        description: "Supporting survivors of domestic and sexual violence.",
        link: "https://hawc.org/"
    }
];

// ===== SCHOOL EVENTS =====
const schoolEvents = [
    {
        title: "HISD Community Job Fair",
        school: "Yates High School",
        date: "Jan 30, 2026",
        time: "10:00 AM - 2:00 PM",
        category: "Career"
    },
    {
        title: "STEM Night & Science Fair",
        school: "Lamar High School",
        date: "Feb 5, 2026",
        time: "6:00 PM - 8:30 PM",
        category: "Education"
    },
    {
        title: "Houston Youth Strings Concert",
        school: "Kinder HSPVA",
        date: "Feb 12, 2026",
        time: "7:00 PM",
        category: "Arts"
    }
];

// ===== EMERGENCY RESOURCES =====
const emergencyResources = [
    {
        id: 1,
        name: "Emergency Services",
        number: "911",
        icon: "fa-phone-volume",
        description: "Police, Fire, Medical Emergencies"
    },
    {
        id: 2,
        name: "National Suicide Prevention",
        number: "988",
        icon: "fa-hand-holding-heart",
        description: "24/7 Crisis Support & Counseling"
    },
    {
        id: 3,
        name: "Houston Area Women's Center Hotline",
        number: "(713) 528-2121",
        icon: "fa-user-shield",
        description: "Domestic Violence & Sexual Assault"
    },
    {
        id: 4,
        name: "Texas Poison Center",
        number: "1-800-222-1222",
        icon: "fa-skull-crossbones",
        description: "24/7 Poison Emergency Assistance"
    },
    {
        id: 5,
        name: "United Way 2-1-1",
        number: "211",
        icon: "fa-info-circle",
        description: "Community Resources & Referrals"
    },
    {
        id: 6,
        name: "Mental Health Crisis Line",
        number: "(832) 416-1177",
        icon: "fa-brain",
        description: "Harris County Mental Health Support"
    }
];

// ===== VOLUNTEER OPPORTUNITIES =====
const volunteerOpportunities = [
    {
        id: 1,
        title: "Food Bank Distribution Helper",
        organization: "Houston Food Bank",
        description: "Help sort and distribute food packages to families in need. Great for groups and individuals.",
        commitment: "4 hours",
        frequency: "Weekly",
        location: "Multiple Locations",
        tags: ["Physical", "Groups Welcome"],
        website: "https://www.houstonfoodbank.org/volunteer/"
    },
    {
        id: 2,
        title: "Youth Tutoring Program",
        organization: "Boys & Girls Clubs of Greater Houston",
        description: "Mentor and tutor students in math, reading, and science after school.",
        commitment: "2 hours",
        frequency: "Twice Weekly",
        location: "Various Club Locations",
        tags: ["Education", "Mentorship"],
        website: "https://www.bgcgh.org/volunteer"
    },
    {
        id: 3,
        title: "Community Garden Volunteer",
        organization: "Urban Harvest",
        description: "Help maintain community gardens and teach sustainable gardening practices.",
        commitment: "3 hours",
        frequency: "Weekend",
        location: "Eastside Houston",
        tags: ["Outdoors", "Environment"],
        website: "https://www.urbanharvest.org/volunteer/"
    },
    {
        id: 4,
        title: "Senior Companion Program",
        organization: "Interfaith Ministries",
        description: "Visit with seniors, provide companionship, and assist with light activities.",
        commitment: "2-3 hours",
        frequency: "Weekly",
        location: "Citywide",
        tags: ["Seniors", "Compassion"],
        website: "https://www.imgh.org/volunteer/"
    },
    {
        id: 5,
        title: "Green Team Conservation",
        organization: "Houston Parks Board",
        description: "Help with invasive species removal, planting, and conservation efforts along Houston's bayous.",
        commitment: "3-4 hours",
        frequency: "Monthly",
        location: "Various Bayous",
        tags: ["Environment", "Outdoors"],
        website: "https://houstonparksboard.org/volunteer/"
    },
    {
        id: 6,
        title: "Administrative Support",
        organization: "Angela House",
        description: "Assist with office tasks and organization to support women transitioning after incarceration.",
        commitment: "Varies",
        frequency: "Weekly",
        location: "6725 Reed Rd",
        tags: ["Admin", "Support"],
        website: "https://www.angelahouse.org/volunteer/"
    }
];

// ===== TRANSPORTATION RESOURCES =====
const transportationResources = [
    {
        id: 1,
        name: "METRO Bus & Rail",
        description: "Houston's public transit system with buses, METRORail, and Park & Ride services.",
        website: "https://www.ridemetro.org/",
        icon: "fa-bus",
        cost: "$1.25 per ride"
    },
    {
        id: 2,
        name: "Harris County Rides",
        description: "Free and low-cost transportation for seniors and persons with disabilities.",
        website: "https://www.harristransit.com/",
        icon: "fa-wheelchair",
        cost: "Free - Low Cost"
    },
    {
        id: 3,
        name: "Houston BCycle",
        description: "Bike share program with stations across Houston for short trips.",
        website: "https://www.houstonbcycle.com/",
        icon: "fa-bicycle",
        cost: "$3 per 30 min"
    },
    {
        id: 4,
        name: "Medical Transportation Program",
        description: "Texas Medicaid transportation for medical appointments.",
        website: "https://www.hhs.texas.gov/",
        icon: "fa-ambulance",
        cost: "Medicaid Covered"
    }
];

// ===== COMMUNITY CALENDAR EVENTS =====
const calendarEvents = [
    {
        id: 1,
        title: "Houston Community Health Fair",
        date: "2026-01-28",
        time: "9:00 AM - 2:00 PM",
        location: "George R. Brown Convention Center",
        category: "Health",
        description: "Free health screenings, vaccinations, and wellness resources."
    },
    {
        id: 2,
        title: "Mayor's Back to School Fest",
        date: "2026-01-30",
        time: "8:00 AM - 1:00 PM",
        location: "NRG Center",
        category: "Education",
        description: "Free backpacks, school supplies, and immunizations for students."
    },
    {
        id: 3,
        title: "Houston Restaurant Weeks",
        date: "2026-02-01",
        time: "All Day",
        location: "Citywide",
        category: "Community",
        description: "Dining to benefit Houston Food Bank. Special menus at participating restaurants."
    },
    {
        id: 4,
        title: "Rodeo Houston Opening Day",
        date: "2026-02-25",
        time: "11:00 AM",
        location: "NRG Park",
        category: "Entertainment",
        description: "The world's largest livestock exhibition and rodeo begins!"
    },
    {
        id: 5,
        title: "STEM Night & Science Fair",
        date: "2026-02-05",
        time: "6:00 PM - 8:30 PM",
        location: "Lamar High School",
        category: "Education",
        description: "Student projects and interactive STEM exhibits."
    },
    {
        id: 6,
        title: "Free Tax Prep Workshop",
        date: "2026-02-08",
        time: "10:00 AM - 4:00 PM",
        location: "Houston Public Library - Central",
        category: "Financial",
        description: "Free VITA tax preparation services for qualifying households."
    },
    {
        id: 7,
        title: "Community Cleanup Day",
        date: "2026-02-15",
        time: "8:00 AM - 12:00 PM",
        location: "Buffalo Bayou Park",
        category: "Environment",
        description: "Join volunteers to clean up Houston's waterways."
    },
    {
        id: 8,
        title: "FIFA World Cup 2026™ Houston",
        date: "2026-06-14",
        time: "TBA",
        location: "NRG Stadium",
        category: "Entertainment",
        description: "Houston hosts the world's biggest sporting event! International matches at NRG Stadium."
    },
    {
        id: 9,
        title: "National Night Out",
        date: "2026-10-06",
        time: "6:00 PM - 9:00 PM",
        location: "Citywide Neighborhoods",
        category: "Community",
        description: "Building community-police partnerships and neighborhood camaraderie."
    },
    {
        id: 10,
        title: "Houston Restaurant Weeks 2026",
        date: "2026-08-01",
        time: "All Day",
        location: "Participating Restaurants",
        category: "Community",
        description: "The largest annual fundraiser for the Houston Food Bank featuring special menus."
    }
];

// ===== ONBOARDING TOUR STEPS =====
const tourSteps = [
    {
        target: "#main-search-input",
        title: "Search Resources",
        description: "Use the search bar to find community resources, support services, and programs in your area."
    },
    {
        target: ".filter-chips",
        title: "Filter by Category",
        description: "Click on category chips to quickly filter resources by type - food, recreation, support, and more."
    },
    {
        target: "#suggest-resource-btn",
        title: "Suggest a Resource",
        description: "Know of a great community resource? Click here to submit it for inclusion in our directory."
    },
    {
        target: ".a11y-toggle",
        title: "Accessibility Options",
        description: "Adjust font size and contrast settings to make the site easier to read."
    }
];

// ===== TRANSLATIONS (English/Spanish) =====
const translations = {
    en: {
        heroTitle: "Connecting Houston",
        heroSubtitle: "To What Matters.",
        heroDescription: "Find non-profits, support services, recreation, and youth programs in your neighborhood.",
        searchPlaceholder: "What are you looking for today?",
        directory: "Directory",
        featured: "Featured",
        calendar: "Calendar",
        support: "Support",
        suggestResource: "Suggest Resource",
        resourcesListed: "Resources Listed",
        categories: "Categories",
        usersHelped: "Users Helped",
        openNow: "Open Now",
        closed: "Closed",
        addToFavorites: "Add to favorites",
        removeFromFavorites: "Remove from favorites"
    },
    es: {
        heroTitle: "Conectando Houston",
        heroSubtitle: "Con Lo Que Importa.",
        heroDescription: "Encuentre organizaciones sin fines de lucro, servicios de apoyo, recreación y programas juveniles en su vecindario.",
        searchPlaceholder: "¿Qué estás buscando hoy?",
        directory: "Directorio",
        featured: "Destacados",
        calendar: "Calendario",
        support: "Apoyo",
        suggestResource: "Sugerir Recurso",
        resourcesListed: "Recursos Listados",
        categories: "Categorías",
        usersHelped: "Usuarios Ayudados",
        openNow: "Abierto Ahora",
        closed: "Cerrado",
        addToFavorites: "Agregar a favoritos",
        removeFromFavorites: "Quitar de favoritos"
    }
};
