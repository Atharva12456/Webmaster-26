const initialResources = [
    // 1. Food Security
    {
        id: 1,
        name: "Houston Food Bank",
        category: "Food Security",
        description: "Leading the fight against hunger in southeast Texas by distributing food to over 1.1 million hungry people annually.",
        location: "535 Portwall St, Houston, TX 77029",
        hours: "8:00 AM - 6:00 PM",
        rating: 4.8, reviews: 1240, tags: ["Volunteer", "Donations"]
    },
    {
        id: 10,
        name: "Galveston County Food Bank",
        category: "Food Security",
        description: "Providing nutrition and hope to the food insecure of Galveston County through advocacy and resource distribution.",
        location: "624 4th Ave N, Texas City, TX 77590",
        hours: "8:00 AM - 4:00 PM",
        rating: 4.7, reviews: 310, tags: ["Coastal", "Nutrition"]
    },
    {
        id: 11,
        name: "Kids' Meals Houston",
        category: "Food Security",
        description: "The only home-delivery meal program in developer Houston for preschool-aged children living in poverty.",
        location: "330 Garden Oaks Blvd, Houston, TX 77018",
        hours: "9:00 AM - 3:00 PM",
        rating: 4.9, reviews: 850, tags: ["Youth", "Poverty Relief"]
    },
    {
        id: 12,
        name: "Second Mile Mission District",
        category: "Food Security",
        description: "Offering hope to neighbors in Fort Bend County by providing food, counseling, and health services.",
        location: "1135 Hwy 90A, Missouri City, TX 77489",
        hours: "10:00 AM - 5:00 PM",
        rating: 4.6, reviews: 220, tags: ["Missouri City", "Health"]
    },

    // 2. Recreation
    {
        id: 2,
        name: "Memorial Park Tennis Center",
        category: "Recreation",
        description: "One of the best public tennis facilities in the country, featuring 18 courts and professional instruction.",
        location: "1500 Memorial Loop Dr, Houston, TX 77007",
        hours: "6:00 AM - 9:00 PM",
        rating: 4.6, reviews: 450, tags: ["Court Booking", "Sports"]
    },
    {
        id: 13,
        name: "Sugar Land Community Center",
        category: "Recreation",
        description: "Providing a wide range of recreational, leisure, and social opportunities for residents of Sugar Land.",
        location: "226 Matlage Way, Sugar Land, TX 77478",
        hours: "8:00 AM - 8:00 PM",
        rating: 4.4, reviews: 560, tags: ["Classes", "Social"]
    },
    {
        id: 5,
        name: "Levy Park",
        category: "Recreation",
        description: "An urban park in Upper Kirby featuring a playground, splash pad, dog park, and community programs.",
        location: "3801 Eastside St, Houston, TX 77098",
        hours: "6:00 AM - 11:00 PM",
        rating: 4.7, reviews: 2150, tags: ["Family", "Outdoors"]
    },
    {
        id: 14,
        name: "Discovery Green",
        category: "Recreation",
        description: "Vibrant downtown park offering free events, public art, and green space for Houstonians to gather.",
        location: "1500 McKinney St, Houston, TX 77010",
        hours: "6:00 AM - 11:00 PM",
        rating: 4.8, reviews: 8900, tags: ["Downtown", "Free Events"]
    },

    // 3. Community Centers
    {
        id: 15,
        name: "Tellepsen Family Downtown YMCA",
        category: "Community Centers",
        description: "A hub for health, wellness, and community connection in the heart of downtown Houston.",
        location: "808 Pease St, Houston, TX 77002",
        hours: "5:00 AM - 9:00 PM",
        rating: 4.5, reviews: 1100, tags: ["Fitness", "Connection"]
    },
    {
        id: 16,
        name: "Bayland Community Center",
        category: "Community Centers",
        description: "A Harris County Precint 4 facility offering activities for seniors, youth, and the general public.",
        location: "6400 Bissonnet St, Houston, TX 77074",
        hours: "8:00 AM - 8:00 PM",
        rating: 4.3, reviews: 290, tags: ["Seniors", "Precinct 4"]
    },
    {
        id: 3,
        name: "Finnigan Park Recreation Center",
        category: "Community Centers",
        description: "A hub for neighborhood activities, featuring after-school programs, fitness classes, and senior events.",
        location: "4900 Providence St, Houston, TX 77020",
        hours: "9:00 AM - 8:00 PM",
        rating: 4.5, reviews: 89, tags: ["Youth", "Seniors"]
    },

    // 4. Support Services
    {
        id: 17,
        name: "Star of Hope Mission",
        category: "Support Services",
        description: "Dedicated to meeting the needs of Houston's homeless men, women, and their children through Christ-centered programs.",
        location: "4848 Jacinto City, TX 77029",
        hours: "24/7",
        rating: 4.8, reviews: 920, tags: ["Housing", "Pantry"]
    },
    {
        id: 18,
        name: "Coalition for the Homeless",
        category: "Support Services",
        description: "Leading the Way Home - coordinating the community response to homelessness in Houston and surrounding counties.",
        location: "2010 Congress St, Houston, TX 77002",
        hours: "9:00 AM - 5:00 PM",
        rating: 4.7, reviews: 410, tags: ["Advocacy", "Way Home"]
    },
    {
        id: 4,
        name: "Houston Area Women's Center",
        category: "Support Services",
        description: "Providing shelter, counseling, and advocacy for individuals affected by domestic and sexual violence.",
        location: "1010 Waugh Dr, Houston, TX 77019",
        hours: "24/7 Crisis Line",
        rating: 4.9, reviews: 320, tags: ["Counseling", "Safe Space"]
    },
    {
        id: 19,
        name: "United Way of Greater Houston",
        category: "Support Services",
        description: "Helping our neighbors thrive by connecting them with people and resources to improve their lives.",
        location: "50 Waugh Dr, Houston, TX 77007",
        hours: "8:30 AM - 5:00 PM",
        rating: 4.6, reviews: 1500, tags: ["Financial", "2-1-1"]
    },

    // 5. Youth Programs
    {
        id: 6,
        name: "Boys & Girls Clubs of Greater Houston",
        category: "Youth Programs",
        description: "Inspiring and enabling all young people to realize their full potential as productive, responsible, and caring citizens.",
        location: "Multiple Locations",
        hours: "2:00 PM - 8:00 PM",
        rating: 4.6, reviews: 180, tags: ["Mentorship", "Education"]
    },
    {
        id: 20,
        name: "Houston Public Library - Central",
        category: "Youth Programs",
        description: "Providing free access to information, educational programs, and technology for Houston's youth and families.",
        location: "500 McKinney St, Houston, TX 77002",
        hours: "10:00 AM - 6:00 PM",
        rating: 4.7, reviews: 3400, tags: ["Literacy", "Tech Access"]
    }
];

const initialPetitions = [
    {
        id: 1,
        title: "Improved Bike Lanes in Downtown",
        description: "Requesting the city council to implement protected bike lanes to improve safety for commuters.",
        creator: "Sarah Jenkins",
        timestamp: "2 days ago",
        signatures: 450,
        goal: 1000
    },
    {
        id: 2,
        title: "Extended Library Hours",
        description: "Advocating for evening hours at public library branches to support working families and students.",
        creator: "Mark Thompson",
        timestamp: "1 week ago",
        signatures: 820,
        goal: 1000
    }
];

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
