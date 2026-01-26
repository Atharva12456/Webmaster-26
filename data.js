// ===== INITIAL RESOURCES =====
const initialResources = [
    // 1. Food Security
    {
        id: 1,
        name: "Houston Food Bank",
        name_es: "Banco de Alimentos de Houston",
        category: "Food Security",
        description: "Leading the fight against hunger in southeast Texas by distributing food to over 1.1 million hungry people annually.",
        description_es: "Liderando la lucha contra el hambre en el sureste de Texas distribuyendo alimentos a más de 1.1 millones de personas hambrientas anualmente.",
        location: "535 Portwall St, Houston, TX 77029",
        hours: "8:00 AM - 6:00 PM",
        rating: 4.8, reviews: 1240, tags: ["Volunteer", "Donations"],
        impact: { metric: "1.1M+", label: "People Fed Annually", label_es: "Personas Alimentadas Anualmente" },
        website: "https://www.houstonfoodbank.org/"
    },
    {
        id: 10,
        name: "Galveston County Food Bank",
        name_es: "Banco de Alimentos del Condado de Galveston",
        category: "Food Security",
        description: "Providing nutrition and hope to the food insecure of Galveston County through advocacy and resource distribution.",
        description_es: "Proporcionando nutrición y esperanza a las personas con inseguridad alimentaria del condado de Galveston a través de la defensa y distribución de recursos.",
        location: "624 4th Ave N, Texas City, TX 77590",
        hours: "8:00 AM - 4:00 PM",
        rating: 4.7, reviews: 310, tags: ["Coastal", "Nutrition"],
        impact: { metric: "25K+", label: "Families Served", label_es: "Familias Servidas" },
        website: "https://www.galvestoncountyfoodbank.org/"
    },
    {
        id: 11,
        name: "Kids' Meals Houston",
        name_es: "Comidas para Niños Houston",
        category: "Food Security",
        description: "The only home-delivery meal program in Houston for preschool-aged children living in poverty.",
        description_es: "El único programa de entrega de comidas a domicilio en Houston para niños en edad preescolar que viven en la pobreza.",
        location: "330 Garden Oaks Blvd, Houston, TX 77018",
        hours: "9:00 AM - 3:00 PM",
        rating: 4.9, reviews: 850, tags: ["Youth", "Poverty Relief"],
        impact: { metric: "3M+", label: "Meals Delivered", label_es: "Comidas Entregadas" },
        website: "https://www.kidsmealsinc.org/"
    },
    {
        id: 12,
        name: "Second Mile Mission District",
        name_es: "Misión Second Mile",
        category: "Food Security",
        description: "Offering hope to neighbors in Fort Bend County by providing food, counseling, and health services.",
        description_es: "Ofreciendo esperanza a los vecinos del condado de Fort Bend proporcionando alimentos, asesoramiento y servicios de salud.",
        location: "1135 Hwy 90A, Missouri City, TX 77489",
        hours: "10:00 AM - 5:00 PM",
        rating: 4.6, reviews: 220, tags: ["Missouri City", "Health"],
        website: "https://www.secondmilemission.org/"
    },

    // 2. Recreation
    {
        id: 2,
        name: "Memorial Park Tennis Center",
        name_es: "Centro de Tenis Memorial Park",
        category: "Recreation",
        description: "One of the best public tennis facilities in the country, featuring 18 courts and professional instruction.",
        description_es: "Una de las mejores instalaciones públicas de tenis del país, con 18 canchas e instrucción profesional.",
        location: "1500 Memorial Loop Dr, Houston, TX 77007",
        hours: "6:00 AM - 9:00 PM",
        rating: 4.6, reviews: 450, tags: ["Court Booking", "Sports"],
        impact: { metric: "18", label: "Courts Available", label_es: "Canchas Disponibles" },
        website: "https://www.memorialparkconservancy.org/tennis/"
    },
    {
        id: 13,
        name: "Sugar Land Community Center",
        name_es: "Centro Comunitario Sugar Land",
        category: "Recreation",
        description: "Providing a wide range of recreational, leisure, and social opportunities for residents of Sugar Land.",
        description_es: "Proporcionando una amplia gama de oportunidades recreativas, de ocio y sociales para los residentes de Sugar Land.",
        location: "226 Matlage Way, Sugar Land, TX 77478",
        hours: "8:00 AM - 8:00 PM",
        rating: 4.4, reviews: 560, tags: ["Classes", "Social"],
        website: "https://www.sugarlandtx.gov/"
    },
    {
        id: 5,
        name: "Levy Park",
        name_es: "Parque Levy",
        category: "Recreation",
        description: "An urban park in Upper Kirby featuring a playground, splash pad, dog park, and community programs.",
        description_es: "Un parque urbano en Upper Kirby que cuenta con un área de juegos, zona de chapoteo, parque para perros y programas comunitarios.",
        location: "3801 Eastside St, Houston, TX 77098",
        hours: "6:00 AM - 11:00 PM",
        rating: 4.7, reviews: 2150, tags: ["Family", "Outdoors"],
        impact: { metric: "500K+", label: "Annual Visitors", label_es: "Visitantes Anuales" },
        website: "https://www.levyparkhouston.org/"
    },
    {
        id: 14,
        name: "Discovery Green",
        name_es: "Discovery Green",
        category: "Recreation",
        description: "Vibrant downtown park offering free events, public art, and green space for Houstonians to gather.",
        description_es: "Vibrante parque en el centro que ofrece eventos gratuitos, arte público y espacios verdes para que los residentes de Houston se reúnan.",
        location: "1500 McKinney St, Houston, TX 77010",
        hours: "6:00 AM - 11:00 PM",
        rating: 4.8, reviews: 8900, tags: ["Downtown", "Free Events"],
        website: "https://www.discoverygreen.com/"
    },

    // 3. Community Centers
    {
        id: 15,
        name: "Tellepsen Family Downtown YMCA",
        name_es: "YMCA de la Familia Tellepsen",
        category: "Community Centers",
        description: "A hub for health, wellness, and community connection in the heart of downtown Houston.",
        description_es: "Un centro de salud, bienestar y conexión comunitaria en el corazón del centro de Houston.",
        location: "808 Pease St, Houston, TX 77002",
        hours: "5:00 AM - 9:00 PM",
        rating: 4.5, reviews: 1100, tags: ["Fitness", "Connection"],
        website: "https://www.ymcahouston.org/"
    },
    {
        id: 16,
        name: "Bayland Community Center",
        name_es: "Centro Comunitario Bayland",
        category: "Community Centers",
        description: "A Harris County Precinct 4 facility offering activities for seniors, youth, and the general public.",
        description_es: "Una instalación del Precinto 4 del Condado de Harris que ofrece actividades para personas mayores, jóvenes y el público en general.",
        location: "6400 Bissonnet St, Houston, TX 77074",
        hours: "8:00 AM - 8:00 PM",
        rating: 4.3, reviews: 290, tags: ["Seniors", "Precinct 4"],
        website: "https://www.hcp4.net/"
    },
    {
        id: 3,
        name: "Finnigan Park Recreation Center",
        name_es: "Centro Recreativo Finnigan Park",
        category: "Community Centers",
        description: "A hub for neighborhood activities, featuring after-school programs, fitness classes, and senior events.",
        description_es: "Un centro para actividades vecinales, con programas extracurriculares, clases de gimnasia y eventos para personas mayores.",
        location: "4900 Providence St, Houston, TX 77020",
        hours: "9:00 AM - 8:00 PM",
        rating: 4.5, reviews: 89, tags: ["Youth", "Seniors"],
        website: "https://www.houstonparks.org/"
    },

    // 4. Support Services
    {
        id: 17,
        name: "Star of Hope Mission",
        name_es: "Misión Star of Hope",
        category: "Support Services",
        description: "Dedicated to meeting the needs of Houston's homeless men, women, and their children through Christ-centered programs.",
        description_es: "Dedicado a satisfacer las necesidades de hombres, mujeres y niños sin hogar en Houston a través de programas centrados en Cristo.",
        location: "4848 Jacinto City, TX 77029",
        hours: "24/7",
        rating: 4.8, reviews: 920, tags: ["Housing", "Pantry"],
        impact: { metric: "2,000+", label: "Beds Available", label_es: "Camas Disponibles" },
        website: "https://www.sohmission.org/"
    },
    {
        id: 18,
        name: "Coalition for the Homeless",
        name_es: "Coalición para los Sin Hogar",
        category: "Support Services",
        description: "Leading the Way Home - coordinating the community response to homelessness in Houston and surrounding counties.",
        description_es: "Liderando el camino a casa: coordinando la respuesta comunitaria a la falta de vivienda en Houston y los condados circundantes.",
        location: "2010 Congress St, Houston, TX 77002",
        hours: "9:00 AM - 5:00 PM",
        rating: 4.7, reviews: 410, tags: ["Advocacy", "Way Home"],
        website: "https://www.homelesshouston.org/"
    },
    {
        id: 4,
        name: "Houston Area Women's Center",
        name_es: "Centro de Mujeres del Área de Houston",
        category: "Support Services",
        description: "Providing shelter, counseling, and advocacy for individuals affected by domestic and sexual violence.",
        description_es: "Proporcionando refugio, asesoramiento y defensa para personas afectadas por violencia doméstica y sexual.",
        location: "1010 Waugh Dr, Houston, TX 77019",
        hours: "24/7 Crisis Line",
        rating: 4.9, reviews: 320, tags: ["Counseling", "Safe Space"],
        impact: { metric: "35K+", label: "People Helped Yearly", label_es: "Personas Ayudadas Anualmente" },
        website: "https://hawc.org/"
    },
    {
        id: 19,
        name: "United Way of Greater Houston",
        name_es: "United Way del Gran Houston",
        category: "Support Services",
        description: "Helping our neighbors thrive by connecting them with people and resources to improve their lives.",
        description_es: "Ayudando a nuestros vecinos a prosperar conectándolos con personas y recursos para mejorar sus vidas.",
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
        name_es: "Centro de Embarazo de Tomball",
        category: "Support Services",
        description: "Providing bilingual client services, medical testing, and parents' resources for mothers in need.",
        description_es: "Proporcionando servicios bilingües para clientes, pruebas médicas y recursos para padres para madres necesitadas.",
        location: "990 Village Square Dr, Tomball, TX 77375",
        hours: "10:00 AM - 4:00 PM",
        rating: 4.7, reviews: 85, tags: ["Family", "Medical"],
        website: "https://www.tomballpregnancy.com/"
    },

    // 5. Youth Programs
    {
        id: 6,
        name: "Boys & Girls Clubs of Greater Houston",
        name_es: "Clubes de Niños y Niñas del Gran Houston",
        category: "Youth Programs",
        description: "Inspiring and enabling all young people to realize their full potential as productive, responsible, and caring citizens.",
        description_es: "Inspirando y capacitando a todos los jóvenes para que alcancen su máximo potencial como ciudadanos productivos, responsables y solidarios.",
        location: "Multiple Locations",
        hours: "2:00 PM - 8:00 PM",
        rating: 4.6, reviews: 180, tags: ["Mentorship", "Education"],
        impact: { metric: "40K+", label: "Youth Served", label_es: "Jóvenes Servidos" },
        website: "https://www.bgcgh.org/"
    },
    {
        id: 20,
        name: "Houston Public Library - Central",
        name_es: "Biblioteca Pública de Houston - Central",
        category: "Youth Programs",
        description: "Providing free access to information, educational programs, and technology for Houston's youth and families.",
        description_es: "Proporcionando acceso gratuito a información, programas educativos y tecnología para los jóvenes y familias de Houston.",
        location: "500 McKinney St, Houston, TX 77002",
        hours: "10:00 AM - 6:00 PM",
        rating: 4.7, reviews: 3400, tags: ["Literacy", "Tech Access"],
        website: "https://houstonlibrary.org/"
    },
    {
        id: 23,
        name: "The HAY Center",
        name_es: "El Centro HAY",
        category: "Youth Programs",
        description: "Empowering foster youth in their transition to adulthood through mentorship, employment, and housing support.",
        description_es: "Empoderando a los jóvenes de acogida en su transición a la edad adulta a través de tutoría, empleo y apoyo de vivienda.",
        location: "1216 West Clay St, Houston, TX 77019",
        hours: "8:30 AM - 5:00 PM",
        rating: 4.9, reviews: 200, tags: ["Foster Youth", "Mentorship"],
        website: "https://www.haycenter.org/"
    },
    {
        id: 24,
        name: "Destiny's Door",
        name_es: "Destiny's Door",
        category: "Youth Programs",
        description: "Empowering young women through mentorship, life skills training, and educational support.",
        description_es: "Empoderando a mujeres jóvenes a través de tutoría, capacitación en habilidades para la vida y apoyo educativo.",
        location: "12603 S. Gessner Rd, Houston, TX 77071",
        hours: "By Appointment",
        rating: 4.6, reviews: 45, tags: ["Mentorship", "Empowerment"],
        website: "https://www.destinysdoor.org/"
    },

    // ========== NEW FOOD SECURITY RESOURCES ==========
    {
        id: 25,
        name: "Target Hunger",
        category: "Food Security",
        description: "Multiple pantries & home delivery serving 23K+ annually across Houston.",
        location: "Houston, TX",
        hours: "9:00 AM - 5:00 PM",
        rating: 4.7, reviews: 340, tags: ["Pantry", "Home Delivery"],
        impact: { metric: "23K+", label: "People Served Annually" },
        website: "https://www.targethunger.org/"
    },
    {
        id: 26,
        name: "Cy-Fair Helping Hands",
        category: "Food Security",
        description: "Food pantry providing toiletries, infant formula, and essential items to families in need.",
        location: "Cypress, TX",
        hours: "9:00 AM - 3:00 PM",
        rating: 4.6, reviews: 180, tags: ["Pantry", "Infant Formula"],
        website: "https://www.cyfairhelpinghands.org/"
    },
    {
        id: 27,
        name: "Tomball Emergency Assistance Ministries (TEAM)",
        category: "Food Security",
        description: "Food pantry serving low-income families in the Tomball area.",
        location: "Tomball, TX",
        hours: "10:00 AM - 2:00 PM",
        rating: 4.5, reviews: 95, tags: ["Pantry", "Emergency"],
        website: "https://www.team-tomball.org/"
    },
    {
        id: 28,
        name: "Mission Bells",
        category: "Food Security",
        description: "Volunteer-driven food pantry serving Harris County residents.",
        location: "Houston, TX",
        hours: "9:00 AM - 12:00 PM",
        rating: 4.4, reviews: 75, tags: ["Volunteer", "Pantry"],
        website: "https://www.missionbellshouston.org/"
    },
    {
        id: 29,
        name: "West Houston Assistance Ministries (WHAM)",
        category: "Food Security",
        description: "Food assistance via drive-thru, walk-up, and food fairs for West Houston families.",
        location: "Houston, TX 77077",
        hours: "9:00 AM - 3:00 PM",
        rating: 4.7, reviews: 220, tags: ["Drive-Thru", "Food Fair"],
        website: "https://www.whamministries.org/"
    },
    {
        id: 30,
        name: "Bread of Life, Inc.",
        category: "Food Security",
        description: "Food & shelter distribution for those experiencing hunger and homelessness.",
        location: "Houston, TX",
        hours: "8:00 AM - 4:00 PM",
        rating: 4.6, reviews: 310, tags: ["Shelter", "Meals"],
        website: "https://www.breadoflifeinc.org/"
    },
    {
        id: 31,
        name: "Second Servings of Houston",
        category: "Food Security",
        description: "Rescues & redistributes food to 250K+ people annually, reducing food waste.",
        location: "Houston, TX",
        hours: "7:00 AM - 5:00 PM",
        rating: 4.8, reviews: 420, tags: ["Food Rescue", "Environment"],
        impact: { metric: "250K+", label: "People Fed Annually" },
        website: "https://www.secondservingshouston.org/"
    },
    {
        id: 32,
        name: "Catholic Charities Food Pantries",
        category: "Food Security",
        description: "3 regional drive-through food pantries serving the Greater Houston area.",
        location: "Multiple Locations",
        hours: "9:00 AM - 2:00 PM",
        rating: 4.7, reviews: 560, tags: ["Drive-Thru", "Regional"],
        website: "https://www.catholiccharities.org/"
    },
    {
        id: 33,
        name: "Heights Interfaith Ministries Food Pantry",
        category: "Food Security",
        description: "Local food assistance serving Houston Heights community.",
        location: "Houston Heights, TX",
        hours: "10:00 AM - 1:00 PM",
        rating: 4.5, reviews: 145, tags: ["Local", "Community"],
        website: "https://www.heightsinterfaith.org/"
    },
    {
        id: 34,
        name: "Common Market",
        category: "Food Security",
        description: "Farm-fresh produce distribution in partnership with Precinct 4.",
        location: "Houston, TX",
        hours: "8:00 AM - 4:00 PM",
        rating: 4.6, reviews: 190, tags: ["Fresh Produce", "Farm"],
        website: "https://www.commonmarket.com/"
    },
    {
        id: 35,
        name: "RaiseUp Families",
        category: "Food Security",
        description: "Financial assistance to prevent family hunger and food insecurity.",
        location: "Houston, TX",
        hours: "9:00 AM - 5:00 PM",
        rating: 4.7, reviews: 85, tags: ["Financial Aid", "Prevention"],
        website: "https://www.raiseupfamilies.org/"
    },

    // ========== NEW RECREATION RESOURCES ==========
    {
        id: 36,
        name: "Buffalo Bayou Park",
        category: "Recreation",
        description: "160+ acres with trails, dog park, kayaking, and beautiful green space along the bayou.",
        location: "1800 Allen Pkwy, Houston, TX 77019",
        hours: "6:00 AM - 11:00 PM",
        rating: 4.9, reviews: 8500, tags: ["Trails", "Kayaking", "Dog Park"],
        impact: { metric: "160+", label: "Acres of Park" },
        website: "https://www.buffalobayou.org/"
    },
    {
        id: 37,
        name: "Hermann Park",
        category: "Recreation",
        description: "Zoo, gardens, train, paddle boats, and one of Houston's most beloved parks.",
        location: "6001 Fannin St, Houston, TX 77030",
        hours: "6:00 AM - 11:00 PM",
        rating: 4.8, reviews: 12000, tags: ["Zoo", "Gardens", "Family"],
        website: "https://www.hermannpark.org/"
    },
    {
        id: 38,
        name: "Memorial Park",
        category: "Recreation",
        description: "1,500 acres of trails, golf courses, sports facilities in the heart of Houston.",
        location: "6501 Memorial Dr, Houston, TX 77007",
        hours: "6:00 AM - 10:00 PM",
        rating: 4.8, reviews: 9200, tags: ["Trails", "Golf", "Sports"],
        impact: { metric: "1,500", label: "Acres of Park" },
        website: "https://www.memorialparkconservancy.org/"
    },
    {
        id: 39,
        name: "Lake Houston Wilderness Park",
        category: "Recreation",
        description: "Camping, hiking, nature center, and fishing in a natural wilderness setting.",
        location: "25840 FM 1485, New Caney, TX 77357",
        hours: "7:00 AM - Dusk",
        rating: 4.6, reviews: 1800, tags: ["Camping", "Hiking", "Fishing"],
        website: "https://www.houstontx.gov/parks/"
    },
    {
        id: 40,
        name: "Armand Bayou Nature Center",
        category: "Recreation",
        description: "Wildlife preserve with hiking trails, kayaking, and environmental education.",
        location: "8500 Bay Area Blvd, Pasadena, TX 77507",
        hours: "9:00 AM - 5:00 PM",
        rating: 4.7, reviews: 2100, tags: ["Wildlife", "Kayaking", "Nature"],
        website: "https://www.abnc.org/"
    },
    {
        id: 41,
        name: "Miller Outdoor Theatre",
        category: "Recreation",
        description: "Free performances March-November featuring music, dance, theater, and film.",
        location: "6000 Hermann Park Dr, Houston, TX 77030",
        hours: "Varies by Event",
        rating: 4.9, reviews: 7500, tags: ["Free Events", "Theater", "Music"],
        website: "https://www.milleroutdoortheatre.com/"
    },
    {
        id: 42,
        name: "Houston BCycle",
        category: "Recreation",
        description: "Bike sharing network with stations citywide for convenient urban cycling.",
        location: "Citywide Stations",
        hours: "24/7",
        rating: 4.5, reviews: 3200, tags: ["Biking", "Transportation", "Green"],
        website: "https://www.houstonbcycle.com/"
    },
    {
        id: 43,
        name: "Bear Creek Pioneers Park",
        category: "Recreation",
        description: "2,154 acres with trails, sports fields, and natural areas in West Houston.",
        location: "3535 War Memorial Dr, Houston, TX 77084",
        hours: "7:00 AM - Dusk",
        rating: 4.6, reviews: 1950, tags: ["Trails", "Sports", "Nature"],
        website: "https://www.hcp4.net/"
    },
    {
        id: 44,
        name: "Cullen Park",
        category: "Recreation",
        description: "Sports fields, trails, and nature areas in a large urban park setting.",
        location: "19008 Saums Rd, Houston, TX 77084",
        hours: "7:00 AM - Dusk",
        rating: 4.5, reviews: 890, tags: ["Sports", "Trails", "Family"],
        website: "https://www.houstontx.gov/parks/"
    },
    {
        id: 45,
        name: "Market Square Park",
        category: "Recreation",
        description: "Downtown park with events, programs, and a beautiful green space in historic district.",
        location: "301 Milam St, Houston, TX 77002",
        hours: "6:00 AM - 11:00 PM",
        rating: 4.7, reviews: 2400, tags: ["Downtown", "Events", "Historic"],
        website: "https://www.marketsquarepark.com/"
    },

    // ========== NEW COMMUNITY CENTERS ==========
    {
        id: 46,
        name: "BakerRipley Community Centers",
        category: "Community Centers",
        description: "Multi-service centers across Houston offering education, workforce, and family services.",
        location: "Multiple Locations",
        hours: "8:00 AM - 6:00 PM",
        rating: 4.7, reviews: 1800, tags: ["Multi-Service", "Education", "Family"],
        website: "https://www.bakerripley.org/"
    },
    {
        id: 47,
        name: "Harris County Precinct 2 Community Centers",
        category: "Community Centers",
        description: "10 centers with activities for all ages including fitness, youth, and senior programs.",
        location: "Multiple Locations",
        hours: "8:00 AM - 8:00 PM",
        rating: 4.5, reviews: 920, tags: ["All Ages", "Fitness", "Programs"],
        website: "https://www.hcp2.com/"
    },
    {
        id: 48,
        name: "Harris County Precinct 4 Community Centers",
        category: "Community Centers",
        description: "Fitness, seniors, and youth programs across Northwest Houston.",
        location: "Multiple Locations",
        hours: "8:00 AM - 8:00 PM",
        rating: 4.6, reviews: 1100, tags: ["Fitness", "Seniors", "Youth"],
        website: "https://www.hcp4.net/"
    },
    {
        id: 49,
        name: "S.H.A.P.E. Community Center",
        category: "Community Centers",
        description: "Cultural & recreation programs celebrating African American heritage.",
        location: "3815 Live Oak St, Houston, TX 77004",
        hours: "9:00 AM - 6:00 PM",
        rating: 4.8, reviews: 650, tags: ["Cultural", "Heritage", "Recreation"],
        website: "https://www.shape.org/"
    },
    {
        id: 50,
        name: "The FORGE for Families",
        category: "Community Centers",
        description: "Safe zone for children & families providing afterschool programs and resources.",
        location: "4815 Polk St, Houston, TX 77023",
        hours: "3:00 PM - 8:00 PM",
        rating: 4.7, reviews: 380, tags: ["Family", "Youth", "Safe Zone"],
        website: "https://www.forgeforfamilies.org/"
    },
    {
        id: 51,
        name: "Nehemiah Center",
        category: "Community Centers",
        description: "After-school enrichment & mentoring programs for youth.",
        location: "4818 Kashmere St, Houston, TX 77026",
        hours: "3:00 PM - 7:00 PM",
        rating: 4.6, reviews: 210, tags: ["Youth", "Mentoring", "After-School"],
        website: "https://www.nehemiahcenter.org/"
    },
    {
        id: 52,
        name: "Wesley Community Center",
        category: "Community Centers",
        description: "K-5 after-school healthy living program focusing on academics and wellness.",
        location: "1410 Lee St, Houston, TX 77009",
        hours: "3:00 PM - 6:00 PM",
        rating: 4.5, reviews: 175, tags: ["K-5", "Healthy Living", "Academic"],
        website: "https://www.wesleyhouston.org/"
    },
    {
        id: 53,
        name: "MECA",
        category: "Community Centers",
        description: "Multicultural Education & Counseling through the Arts - arts classes, academic support, counseling.",
        location: "1900 Kane St, Houston, TX 77007",
        hours: "9:00 AM - 6:00 PM",
        rating: 4.8, reviews: 520, tags: ["Arts", "Education", "Counseling"],
        website: "https://www.maboromeca.org/"
    },

    // ========== NEW SUPPORT SERVICES - HOMELESS & HOUSING ==========
    {
        id: 54,
        name: "Covenant House Texas",
        category: "Support Services",
        description: "Shelter for youth 18-24 with 24/7 support, housing, and life skills training.",
        location: "1111 Lovett Blvd, Houston, TX 77006",
        hours: "24/7",
        rating: 4.8, reviews: 480, tags: ["Youth Shelter", "Housing", "24/7"],
        website: "https://www.covenanthousetx.org/"
    },
    {
        id: 55,
        name: "Hope Center Houston",
        category: "Support Services",
        description: "Day center, emergency shelter, and transitional housing for homeless individuals.",
        location: "1112 Prairie St, Houston, TX 77002",
        hours: "8:00 AM - 4:00 PM",
        rating: 4.6, reviews: 290, tags: ["Day Center", "Shelter", "Transitional"],
        website: "https://www.hopecenterhouston.org/"
    },
    {
        id: 56,
        name: "The Beacon",
        category: "Support Services",
        description: "Day center services for homeless individuals including meals, showers, and case management.",
        location: "1212 Prairie St, Houston, TX 77002",
        hours: "7:00 AM - 3:00 PM",
        rating: 4.7, reviews: 650, tags: ["Day Center", "Meals", "Services"],
        website: "https://www.beaconhomeless.org/"
    },
    {
        id: 57,
        name: "SEARCH Homeless Services",
        category: "Support Services",
        description: "Housing, jobs, and outreach programs helping end chronic homelessness.",
        location: "2015 Congress St, Houston, TX 77002",
        hours: "8:00 AM - 5:00 PM",
        rating: 4.7, reviews: 520, tags: ["Housing", "Jobs", "Outreach"],
        website: "https://www.searchhomeless.org/"
    },
    {
        id: 58,
        name: "Houston Housing Authority",
        category: "Support Services",
        description: "Section 8 & housing vouchers for low-income Houston residents.",
        location: "2640 Fountain View Dr, Houston, TX 77057",
        hours: "8:00 AM - 5:00 PM",
        rating: 4.3, reviews: 380, tags: ["Section 8", "Vouchers", "Housing"],
        website: "https://www.housingforhouston.com/"
    },

    // ========== NEW SUPPORT SERVICES - MENTAL HEALTH ==========
    {
        id: 59,
        name: "The Harris Center for Mental Health",
        category: "Support Services",
        description: "Free/sliding scale mental health services with 24/7 crisis line.",
        location: "9401 Southwest Freeway, Houston, TX 77074",
        hours: "24/7 Crisis Line",
        rating: 4.6, reviews: 890, tags: ["Mental Health", "Crisis", "Sliding Scale"],
        website: "https://www.theharriscenter.org/"
    },
    {
        id: 60,
        name: "Mental Health America of Greater Houston",
        category: "Support Services",
        description: "Care Connect Helpline, therapy referrals, and mental health education.",
        location: "2211 Norfolk St, Houston, TX 77098",
        hours: "9:00 AM - 5:00 PM",
        rating: 4.7, reviews: 340, tags: ["Helpline", "Referrals", "Education"],
        website: "https://www.mhahouston.org/"
    },
    {
        id: 61,
        name: "Hope & Healing Center",
        category: "Support Services",
        description: "Free mental health coaching and support groups for Houston residents.",
        location: "7900 Fannin St, Houston, TX 77054",
        hours: "9:00 AM - 5:00 PM",
        rating: 4.8, reviews: 420, tags: ["Coaching", "Support Groups", "Free"],
        website: "https://www.hopeandhealingcenter.org/"
    },
    {
        id: 62,
        name: "re:MIND",
        category: "Support Services",
        description: "Free support groups for depression and bipolar disorder in Houston.",
        location: "Houston, TX",
        hours: "Varies by Group",
        rating: 4.7, reviews: 180, tags: ["Depression", "Bipolar", "Support Groups"],
        website: "https://www.remindsupport.org/"
    },
    {
        id: 63,
        name: "NAMI Greater Houston",
        category: "Support Services",
        description: "Free education and support for mental illness and family members.",
        location: "2627 Caroline St, Houston, TX 77004",
        hours: "9:00 AM - 5:00 PM",
        rating: 4.8, reviews: 560, tags: ["Education", "Support", "Family"],
        website: "https://www.namigreaterhouston.org/"
    },
    {
        id: 64,
        name: "Bo's Place",
        category: "Support Services",
        description: "Free grief support for children, families, and adults who have lost loved ones.",
        location: "10050 Buffalo Speedway, Houston, TX 77054",
        hours: "9:00 AM - 5:00 PM",
        rating: 4.9, reviews: 720, tags: ["Grief", "Children", "Family"],
        website: "https://www.bosplace.org/"
    },
    {
        id: 65,
        name: "Family Houston",
        category: "Support Services",
        description: "Counseling & family services including therapy, case management, and crisis intervention.",
        location: "4625 Lillian St, Houston, TX 77007",
        hours: "8:00 AM - 6:00 PM",
        rating: 4.6, reviews: 290, tags: ["Counseling", "Family", "Crisis"],
        website: "https://www.familyhouston.org/"
    },
    {
        id: 66,
        name: "Memorial Assistance Ministries",
        category: "Support Services",
        description: "Rent, utilities, ESL, immigration help for families in crisis.",
        location: "1625 Blalock Rd, Houston, TX 77080",
        hours: "8:30 AM - 4:30 PM",
        rating: 4.7, reviews: 510, tags: ["Rent", "Utilities", "ESL"],
        website: "https://www.mamhouston.org/"
    },

    // ========== NEW YOUTH PROGRAMS ==========
    {
        id: 67,
        name: "Big Brothers Big Sisters of Greater Houston",
        category: "Youth Programs",
        description: "One-on-one youth mentorship connecting children with caring adult mentors.",
        location: "1003 Washington Ave, Houston, TX 77002",
        hours: "9:00 AM - 5:00 PM",
        rating: 4.9, reviews: 890, tags: ["Mentorship", "One-on-One"],
        website: "https://www.bbbstx.org/"
    },
    {
        id: 68,
        name: "Friends of the Children - Houston",
        category: "Youth Programs",
        description: "Long-term professional mentoring for youth facing the greatest obstacles.",
        location: "Houston, TX",
        hours: "9:00 AM - 5:00 PM",
        rating: 4.8, reviews: 320, tags: ["Long-Term", "Professional Mentors"],
        website: "https://www.friendshtx.org/"
    },
    {
        id: 69,
        name: "Boys to Men Texas",
        category: "Youth Programs",
        description: "Mentoring programs for young men through community, sports, and life skills.",
        location: "Houston, TX",
        hours: "By Program",
        rating: 4.7, reviews: 210, tags: ["Young Men", "Sports", "Life Skills"],
        website: "https://www.boystomentexas.org/"
    },
    {
        id: 70,
        name: "Hope for Youth",
        category: "Youth Programs",
        description: "Christ-centered youth mentorship and development programs.",
        location: "Houston, TX",
        hours: "By Appointment",
        rating: 4.6, reviews: 145, tags: ["Faith-Based", "Mentorship"],
        website: "https://www.hopeforyouth.org/"
    },
    {
        id: 71,
        name: "Houston Area Urban League - Youth Programs",
        category: "Youth Programs",
        description: "Project Ready and youth development programs for Houston students.",
        location: "1302 Texas Ave, Houston, TX 77002",
        hours: "9:00 AM - 5:00 PM",
        rating: 4.6, reviews: 280, tags: ["Project Ready", "Development"],
        website: "https://www.haul.org/"
    },
    {
        id: 72,
        name: "GirlStart Houston",
        category: "Youth Programs",
        description: "Free STEM programs for 4th-5th grade girls, inspiring future scientists and engineers.",
        location: "Houston, TX",
        hours: "By Program",
        rating: 4.8, reviews: 390, tags: ["STEM", "Girls", "Free"],
        website: "https://www.girlstart.org/"
    },
    {
        id: 73,
        name: "Houston Public Library After School Zone",
        category: "Youth Programs",
        description: "Free activities, homework help, and programs at Houston Public Libraries.",
        location: "Multiple Library Locations",
        hours: "3:00 PM - 6:00 PM",
        rating: 4.7, reviews: 1200, tags: ["Free", "Homework Help", "Library"],
        website: "https://www.houstonlibrary.org/"
    },
    {
        id: 74,
        name: "Kidventure",
        category: "Youth Programs",
        description: "Active learning after-school programs with sports, arts, and academics.",
        location: "Multiple Locations",
        hours: "3:00 PM - 6:00 PM",
        rating: 4.5, reviews: 480, tags: ["Active Learning", "After-School"],
        website: "https://www.kidventure.com/"
    },

    // ========== NEW CATEGORY: IMMIGRATION & REFUGEE SERVICES ==========
    {
        id: 75,
        name: "St. Frances Cabrini Center (Catholic Charities)",
        category: "Immigration Services",
        description: "Largest nonprofit immigration legal aid providing visa, citizenship, and asylum assistance.",
        location: "2900 Louisiana St, Houston, TX 77006",
        hours: "8:00 AM - 5:00 PM",
        rating: 4.7, reviews: 720, tags: ["Legal Aid", "Citizenship", "Asylum"],
        website: "https://www.catholiccharities.org/"
    },
    {
        id: 76,
        name: "Houston Immigration Legal Services Collaborative",
        category: "Immigration Services",
        description: "Immigrant Rights Hotline 1-833-HOU-IMMI for legal referrals and assistance.",
        location: "Houston, TX",
        hours: "9:00 AM - 5:00 PM",
        rating: 4.8, reviews: 380, tags: ["Hotline", "Legal Referrals"],
        website: "https://www.houstonimmigration.org/"
    },
    {
        id: 77,
        name: "YMCA International Services",
        category: "Immigration Services",
        description: "Immigration assistance, refugee resettlement, and cultural integration programs.",
        location: "6671 Southwest Fwy, Houston, TX 77074",
        hours: "8:00 AM - 5:00 PM",
        rating: 4.7, reviews: 540, tags: ["Refugee", "Resettlement", "Integration"],
        website: "https://www.ymcahouston.org/"
    },
    {
        id: 78,
        name: "BakerRipley Immigration Services",
        category: "Immigration Services",
        description: "Citizenship, DACA support, and immigration assistance for Houston residents.",
        location: "Multiple Locations",
        hours: "8:00 AM - 5:00 PM",
        rating: 4.6, reviews: 410, tags: ["Citizenship", "DACA", "Support"],
        website: "https://www.bakerripley.org/"
    },
    {
        id: 79,
        name: "RAICES",
        category: "Immigration Services",
        description: "Refugee & immigrant legal aid providing representation and advocacy.",
        location: "1305 N. Flores St, San Antonio, TX (serves Houston)",
        hours: "9:00 AM - 5:00 PM",
        rating: 4.8, reviews: 920, tags: ["Legal Aid", "Advocacy", "Refugee"],
        website: "https://www.raicestexas.org/"
    },

    // ========== NEW CATEGORY: DISABILITY SERVICES ==========
    {
        id: 80,
        name: "Easter Seals Greater Houston",
        category: "Disability Services",
        description: "Comprehensive disability services including therapy, employment, and support programs.",
        location: "4500 Bissonnet St, Bellaire, TX 77401",
        hours: "8:00 AM - 5:00 PM",
        rating: 4.8, reviews: 650, tags: ["Therapy", "Employment", "Support"],
        website: "https://www.eastersealshouston.org/"
    },
    {
        id: 81,
        name: "The Arc of Greater Houston",
        category: "Disability Services",
        description: "Programs for people with intellectual and developmental disabilities.",
        location: "3737 Belle Park Dr, Houston, TX 77072",
        hours: "8:00 AM - 5:00 PM",
        rating: 4.7, reviews: 410, tags: ["IDD", "Programs", "Support"],
        website: "https://www.thearchouston.org/"
    },
    {
        id: 82,
        name: "Disability Rights Texas",
        category: "Disability Services",
        description: "Advocacy & legal services protecting the rights of people with disabilities.",
        location: "1500 McGowen St, Houston, TX 77004",
        hours: "9:00 AM - 5:00 PM",
        rating: 4.6, reviews: 280, tags: ["Advocacy", "Legal", "Rights"],
        website: "https://www.disabilityrightstx.org/"
    },
    {
        id: 83,
        name: "Down Syndrome Association of Houston",
        category: "Disability Services",
        description: "Support groups, respite services, and resources for families.",
        location: "Houston, TX",
        hours: "9:00 AM - 5:00 PM",
        rating: 4.9, reviews: 340, tags: ["Support Groups", "Respite", "Family"],
        website: "https://www.dsah.org/"
    },

    // ========== NEW CATEGORY: EDUCATION & ADULT LITERACY ==========
    {
        id: 84,
        name: "HCDE Adult Education",
        category: "Education",
        description: "Free ABL, ESL, and GED classes for Harris County adults.",
        location: "Multiple Locations",
        hours: "9:00 AM - 9:00 PM",
        rating: 4.6, reviews: 520, tags: ["GED", "ESL", "Free"],
        website: "https://www.hcde-texas.org/"
    },
    {
        id: 85,
        name: "Houston Center for Literacy",
        category: "Education",
        description: "ABE, GED, ESL, and workplace literacy programs for adults.",
        location: "6100 Westpark Dr, Houston, TX 77057",
        hours: "9:00 AM - 5:00 PM",
        rating: 4.7, reviews: 380, tags: ["Literacy", "GED", "Workplace"],
        website: "https://www.houstonliteracy.org/"
    },
    {
        id: 86,
        name: "Harris County Public Library Adult Literacy",
        category: "Education",
        description: "Free tutoring and Career Online High School for adult learners.",
        location: "Multiple Library Locations",
        hours: "Varies",
        rating: 4.5, reviews: 290, tags: ["Tutoring", "High School", "Free"],
        website: "https://www.hcpl.net/"
    },
    {
        id: 87,
        name: "Houston Community College Adult Education",
        category: "Education",
        description: "GED, ESL, and career pathways programs for adult students.",
        location: "Multiple Campuses",
        hours: "Varies by Campus",
        rating: 4.5, reviews: 620, tags: ["GED", "Career", "College"],
        website: "https://www.hccs.edu/"
    },
    {
        id: 88,
        name: "Barbara Bush Houston Literacy Foundation",
        category: "Education",
        description: "Adult literacy advocacy and family literacy programs.",
        location: "Houston, TX",
        hours: "9:00 AM - 5:00 PM",
        rating: 4.8, reviews: 210, tags: ["Advocacy", "Family Literacy"],
        website: "https://www.bushhoustonliteracy.org/"
    },

    // ========== NEW CATEGORY: JOB TRAINING & EMPLOYMENT ==========
    {
        id: 89,
        name: "Workforce Solutions",
        category: "Job Training",
        description: "Job search, training, and career services for Houston area job seekers.",
        location: "Multiple Career Offices",
        hours: "8:00 AM - 5:00 PM",
        rating: 4.5, reviews: 1800, tags: ["Job Search", "Training", "Career"],
        website: "https://www.wrksolutions.com/"
    },
    {
        id: 90,
        name: "SERJobs",
        category: "Job Training",
        description: "Occupational training and employment placement for underserved communities.",
        location: "1750 Seamist Ct, Houston, TX 77008",
        hours: "8:00 AM - 5:00 PM",
        rating: 4.7, reviews: 640, tags: ["Training", "Placement", "Underserved"],
        website: "https://www.serjobs.org/"
    },
    {
        id: 91,
        name: "Houston Area Urban League - Workforce Development",
        category: "Job Training",
        description: "Job readiness, certifications, and career development programs.",
        location: "1302 Texas Ave, Houston, TX 77002",
        hours: "9:00 AM - 5:00 PM",
        rating: 4.6, reviews: 380, tags: ["Certifications", "Career", "Readiness"],
        website: "https://www.haul.org/"
    },
    {
        id: 92,
        name: "WorkTexas Training Center",
        category: "Job Training",
        description: "Welding, electrical, HVAC, and medical training for in-demand careers.",
        location: "Houston, TX",
        hours: "8:00 AM - 5:00 PM",
        rating: 4.5, reviews: 290, tags: ["Welding", "HVAC", "Medical"],
        website: "https://www.worktexas.org/"
    },
    {
        id: 93,
        name: "United Way THRIVE",
        category: "Job Training",
        description: "Short-term training and career coaching for financial stability.",
        location: "Houston, TX",
        hours: "9:00 AM - 5:00 PM",
        rating: 4.6, reviews: 210, tags: ["Short-Term", "Coaching", "Stability"],
        website: "https://www.unitedwayhouston.org/"
    },

    // ========== NEW CATEGORY: SENIOR SERVICES ==========
    {
        id: 94,
        name: "Interfaith Ministries Senior Companion Program",
        category: "Senior Services",
        description: "Companionship visits for seniors to reduce isolation and provide support.",
        location: "3303 Main St, Houston, TX 77002",
        hours: "9:00 AM - 5:00 PM",
        rating: 4.8, reviews: 420, tags: ["Companionship", "Visits", "Support"],
        website: "https://www.imgh.org/"
    },
    {
        id: 95,
        name: "Harris County Area Agency on Aging",
        category: "Senior Services",
        description: "Senior resources, programs, and benefits assistance for older adults.",
        location: "8410 Lantern Point Dr, Houston, TX 77054",
        hours: "8:00 AM - 5:00 PM",
        rating: 4.6, reviews: 340, tags: ["Resources", "Benefits", "Programs"],
        website: "https://www.hcaaa.org/"
    },
    {
        id: 96,
        name: "Meals on Wheels Greater Houston",
        category: "Senior Services",
        description: "Home-delivered meals and wellness checks for seniors across Houston.",
        location: "Houston, TX",
        hours: "8:00 AM - 4:00 PM",
        rating: 4.9, reviews: 890, tags: ["Meals", "Home Delivery", "Wellness"],
        impact: { metric: "1M+", label: "Meals Delivered Annually" },
        website: "https://www.mealsonwheelshouston.org/"
    }
];

// ===== PETITIONS =====
const initialPetitions = [
    {
        id: 1,
        title: "Protected Bike Lanes on Main Street",
        title_es: "Carriles Bici Protegidos en Main Street",
        description: "Requesting the City of Houston to install physical barriers for bike lanes on Main St to protect cyclists from traffic and encourage sustainable commuting.",
        description_es: "Solicitando a la Ciudad de Houston instalar barreras físicas para carriles bici en Main St para proteger a los ciclistas del tráfico y fomentar el transporte sostenible.",
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
        title_es: "Extender Horario de Biblioteca Pública",
        description: "Our community libraries currently close at 6 PM. We are petitioning for hours to be extended to 9 PM at least two days a week to support students and working families.",
        description_es: "Nuestras bibliotecas comunitarias cierran actualmente a las 6 PM. Solicitamos que el horario se extienda hasta las 9 PM al menos dos días a la semana para apoyar a estudiantes y familias trabajadoras.",
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
        title_es: "Nuevo Jardín Comunitario en Third Ward",
        description: "We are seeking approval and funding for a new community managed garden near Emancipation Park to provide fresh produce and green space for local residents.",
        description_es: "Buscamos aprobación y financiamiento para un nuevo jardín gestionado por la comunidad cerca de Emancipation Park para proporcionar productos frescos y espacios verdes para los residentes locales.",
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
        title_es: "Mejorar Iluminación en Hermann Park",
        description: "For the safety of evening joggers and families, we demand the installation of energy-efficient LED streetlights along the outer loop of Hermann Park.",
        description_es: "Para la seguridad de los corredores nocturnos y las familias, exigimos la instalación de farolas LED de bajo consumo a lo largo del circuito exterior de Hermann Park.",
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
        signed: false,
        title_es: "Servicios de Salud Mental Juvenil Ampliados",
        description_es: "Instando al HISD a aumentar el número de consejeros con licencia y especialistas en salud mental en las escuelas secundarias y preparatorias del distrito."
    }
];

// ===== NONPROFITS =====
const initialNonprofits = [
    {
        name: "United Way of Greater Houston",
        description: "Connecting people with local resources to help them improve their lives.",
        link: "https://www.unitedwayhouston.org/",
        name_es: "United Way del Gran Houston",
        description_es: "Conectando a personas con recursos locales para ayudarlas a mejorar sus vidas."
    },
    {
        name: "Star of Hope Mission",
        description: "Providing essential services to Houston's homeless population.",
        link: "https://www.sohmission.org/",
        name_es: "Misión Star of Hope",
        description_es: "Proporcionando servicios esenciales a la población sin hogar de Houston."
    },
    {
        name: "Houston Area Women's Center",
        description: "Supporting survivors of domestic and sexual violence.",
        link: "https://hawc.org/",
        name_es: "Centro de Mujeres del Área de Houston",
        description_es: "Apoyando a sobrevivientes de violencia doméstica y sexual."
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
        category: "Arts",
        title_es: "Concierto de Cuerdas Juvenil de Houston",
        description_es: "Concierto de cuerdas juvenil."
    }
];

// Add translations fields to other school events
schoolEvents[0].title_es = "Feria de Empleo Comunitaria HISD";
schoolEvents[0].description_es = "Reúnase con empleadores locales.";
schoolEvents[1].title_es = "Noche STEM y Feria de Ciencias";
schoolEvents[1].description_es = "Proyectos estudiantiles y exhibiciones.";

// ===== EMERGENCY RESOURCES =====
const emergencyResources = [
    {
        id: 1,
        name: "Emergency Services",
        number: "911",
        icon: "fa-phone-volume",
        description: "Police, Fire, Medical Emergencies",
        name_es: "Servicios de Emergencia",
        description_es: "Policía, Bomberos, Emergencias Médicas"
    },
    {
        id: 2,
        name: "National Suicide Prevention",
        number: "988",
        icon: "fa-hand-holding-heart",
        description: "24/7 Crisis Support & Counseling",
        name_es: "Prevención Nacional del Suicidio",
        description_es: "Apoyo y Asesoramiento de Crisis 24/7"
    },
    {
        id: 3,
        name: "Houston Area Women's Center Hotline",
        number: "(713) 528-2121",
        icon: "fa-user-shield",
        description: "Domestic Violence & Sexual Assault",
        name_es: "Línea Directa del Centro de Mujeres",
        description_es: "Violencia Doméstica y Agresión Sexual"
    },
    {
        id: 4,
        name: "Texas Poison Center",
        number: "1-800-222-1222",
        icon: "fa-skull-crossbones",
        description: "24/7 Poison Emergency Assistance",
        name_es: "Centro de Envenenamiento de Texas",
        description_es: "Asistencia de Emergencia por Envenenamiento 24/7"
    },
    {
        id: 5,
        name: "United Way 2-1-1",
        number: "211",
        icon: "fa-info-circle",
        description: "Community Resources & Referrals",
        name_es: "United Way 2-1-1",
        description_es: "Recursos Comunitarios y Referencias"
    },
    {
        id: 6,
        name: "Mental Health Crisis Line",
        number: "(832) 416-1177",
        icon: "fa-brain",
        description: "Harris County Mental Health Support",
        name_es: "Línea de Crisis de Salud Mental",
        description_es: "Apoyo de Salud Mental del Condado de Harris"
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
        website: "https://www.houstonfoodbank.org/volunteer/",
        title_es: "Ayudante de Distribución del Banco de Alimentos",
        description_es: "Ayude a clasificar y distribuir paquetes de alimentos a familias necesitadas."
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
        website: "https://www.bgcgh.org/volunteer",
        title_es: "Programa de Tutoría Juvenil",
        description_es: "Mentorear y dar tutoría a estudiantes en matemáticas, lectura y ciencias."
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
        website: "https://www.urbanharvest.org/volunteer/",
        title_es: "Voluntario de Jardín Comunitario",
        description_es: "Ayude a mantener jardines comunitarios y enseñar prácticas de jardinería sostenible."
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
        website: "https://www.imgh.org/volunteer/",
        title_es: "Programa de Compañeros Mayores",
        description_es: "Visite a personas mayores, brinde compañía y ayude con actividades ligeras."
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
        website: "https://houstonparksboard.org/volunteer/",
        title_es: "Equipo Verde de Conservación",
        description_es: "Ayude con la eliminación de especies invasoras, plantación y esfuerzos de conservación."
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
        website: "https://www.angelahouse.org/volunteer/",
        title_es: "Apoyo Administrativo",
        description_es: "Ayude con tareas de oficina y organización para apoyar a mujeres en transición."
    },
];

// ===== TRANSPORTATION RESOURCES =====
const transportationResources = [
    {
        name: "METRO Bus & Rail",
        icon: "fa-bus",
        description: "Affordable public transit across the city.",
        description_es: "Transporte público asequible en toda la ciudad.",
        cost: "$1.25 / ride",
        website: "https://www.ridemetro.org/"
    },
    {
        name: "Houston BCycle",
        icon: "fa-bicycle",
        description: "Bike sharing network with stations citywide.",
        description_es: "Red de bicicletas compartidas con estaciones en toda la ciudad.",
        cost: "$3 / 30 mins",
        website: "https://www.houstonbcycle.com/"
    },
    {
        name: "Harris County Rides",
        icon: "fa-taxi",
        description: "Subsidized transportation for seniors and disabilities.",
        description_es: "Transporte subsidiado para personas mayores y discapacitadas.",
        cost: "Varies",
        website: "https://harriscountyrides.com/"
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
        category: "Career",
        description: "Meet with over 50 local employers hiring for entry-level positions.",
        title_es: "Feria de Empleo Comunitaria HISD",
        description_es: "Reúnase con más de 50 empleadores locales que contratan para puestos de nivel de entrada."
    },
    {
        id: 2,
        title: "Mayor's Back to School Fest",
        date: "2026-01-30",
        time: "8:00 AM - 1:00 PM",
        location: "NRG Center",
        category: "Education",
        description: "Free backpacks, school supplies, and immunizations for students.",
        title_es: "Feria de Regreso a Clases de la Ciudad",
        description_es: "Mochilas gratis, útiles escolares e inmunizaciones para estudiantes."
    },
    {
        id: 3,
        title: "Houston Restaurant Weeks",
        date: "2026-02-01",
        time: "All Day",
        location: "Citywide",
        category: "Community",
        description: "Dining to benefit Houston Food Bank. Special menus at participating restaurants.",
        title_es: "Semanas de Restaurantes de Houston",
        description_es: "Cenas a beneficio del Banco de Alimentos de Houston. Menús especiales en restaurantes participantes."
    },
    {
        id: 4,
        title: "Rodeo Houston Opening Day",
        date: "2026-02-25",
        time: "11:00 AM",
        location: "NRG Park",
        category: "Entertainment",
        description: "The world's largest livestock exhibition and rodeo begins!",
        title_es: "Día de Apertura del Rodeo Houston",
        description_es: "¡Comienza la exhibición de ganado y rodeo más grande del mundo!"
    },
    {
        id: 5,
        title: "STEM Night & Science Fair",
        date: "2026-02-05",
        time: "6:00 PM - 8:30 PM",
        location: "Lamar High School",
        category: "Education",
        description: "Student projects and interactive STEM exhibits.",
        title_es: "Noche STEM y Feria de Ciencias",
        description_es: "Proyectos estudiantiles y exhibiciones interactivas STEM."
    },
    {
        id: 6,
        title: "Free Tax Prep Workshop",
        date: "2026-02-08",
        time: "10:00 AM - 4:00 PM",
        location: "Houston Public Library - Central",
        category: "Financial",
        description: "Free VITA tax preparation services for qualifying households.",
        title_es: "Taller Gratuito de Preparación de Impuestos",
        description_es: "Servicios gratuitos de preparación de impuestos VITA para hogares que califican."
    },
    {
        id: 7,
        title: "Community Cleanup Day",
        date: "2026-02-15",
        time: "8:00 AM - 12:00 PM",
        location: "Buffalo Bayou Park",
        category: "Environment",
        description: "Join volunteers to clean up Houston's waterways.",
        title_es: "Día de Limpieza Comunitaria",
        description_es: "Únase a voluntarios para limpiar las vías fluviales de Houston."
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



// ===== TRANSLATIONS (English/Spanish) =====
// ===== TRANSLATIONS (English/Spanish) =====
const translations = {
    en: {
        heroTitle: "Connecting Houston",
        heroSubtitle: "To What Matters.",
        heroDescription: "Find non-profits, support services, recreation, and youth programs in your neighborhood.",
        searchPlaceholder: "What are you looking for today?",
        search: "Search",
        directory: "Directory",
        featured: "Featured",
        calendar: "Calendar",
        petitions: "Create a Change",
        support: "Support",
        suggestResource: "Suggest Resource",
        resourcesListed: "Resources Listed",
        categories: "Categories",
        usersHelped: "Users Helped",
        openNow: "Open Now",
        closed: "Closed",
        addToFavorites: "Add to favorites",
        removeFromFavorites: "Remove from favorites",
        // Categories
        "Recreation": "Recreation",
        "Community Centers": "Community Centers",
        "Support Services": "Support Services",
        "Youth Programs": "Youth Programs",
        "All": "All",
        // Dynamic
        "Emergency Resources": "Emergency Resources",
        "Browse by Category": "Browse by Category",
        // Sidebar & UI
        "navigation": "Navigation",
        "settings": "Settings",
        "appearance": "Appearance",
        "theme": "Theme",
        "fontSize": "Font Size",
        "highContrast": "High Contrast",
        "language": "Language",
        "notifications": "Notifications",
        "pushNotifications": "Push Notifications",
        "emailUpdates": "Email Updates",
        "data": "Data",
        "clearData": "Clear All Data",
        // Footer & Bottom Nav
        "quickLinks": "Quick Links",
        "getInvolved": "Get Involved",
        "partnerInquiry": "Partner Inquiry",
        "resourceHub": "Resource Hub",
        "communityCalendar": "Community Calendar",
        "spotlight": "Spotlight",
        "events": "Events",
        "change": "Change",
        "communitySpotlight": "Community Spotlight",
        "communitySpotlightSubtitle": "Highlighting the most impactful resources in Houston.",
        "viewDetails": "View Details",
        "save": "Save",
        "volunteerOpportunities": "Volunteer Opportunities",
        "volunteerOpportunitiesSubtitle": "Make a difference in your community.",
        "signUpToVolunteer": "Sign Up to Volunteer",
        "supportYourCommunity": "Support Your Community",
        "supportSubtitle": "Your support helps non-profits provide essential services to Houstonians.",
        "learnMoreDonate": "Learn More & Donate",
        "transportationResources": "Transportation Resources",
        "transportationSubtitle": "Get around Houston with these transportation options.",
        "visitWebsite": "Visit Website",
        "schoolEvents": "School Events",
        "schoolEventsSubtitle": "Stay updated with events from Houston ISD and local schools.",
        "newsletterTitle": "Houston Hub Newsletter",
        "newsletterSubtitle": "Get weekly updates on resources, events, and community news.",
        "enterEmail": "Enter your email address",
        "joinNow": "Join Now",
        "thanksSubscribing": "Thanks for subscribing! We'll keep you updated.",
        "yourFavorites": "Your Favorites",
        "savedResources": "saved resources",
        "noFavoritesTitle": "No favorites yet",
        "noFavoritesSubtitle": "Save resources by clicking the heart icon on resource cards.",
        "browseResources": "Browse Resources",
        "trendingNow": "TRENDING NOW",
        "resourceDirectory": "Resource Directory",
        "clearFilters": "Clear Filters",
        "showing": "Showing",
        "resourcesInHouston": "resources in Houston",
        "noResourcesFound": "No resources found",
        "tryAdjustingFilters": "Try adjusting your filters or search terms.",
        "clearAllFilters": "Clear All Filters",
        "openNow": "Open Now",
        "bookVenue": "Book Venue",
        "shareOnTwitter": "Share on Twitter",
        "shareOnFacebook": "Share on Facebook",
        "copyLink": "Copy link",
        "previousSlide": "Previous Slide",
        "nextSlide": "Next Slide",
        "goToSlide": "Go to slide",
        "previousMonth": "Previous Month",
        "nextMonth": "Next Month",
        "favorites": "Favorites",
        "footerTagline": "Bridging the gap between Houston residents and community resources.",
        "partnerText": "Are you a non-profit? Partner with us!",
        "copyright": "© 2026 Houston Community Hub. TSA Webmaster Submission.",
        "trendingText": "<strong>Memorial Park Tennis Center</strong> just added 4 new clay courts!",
        "bookNow": "Book now",
        "goHome": "Go to homepage",
        "openMenu": "Open menu",
        "closeMenu": "Close menu",
        "backToTop": "Back to top",
        "calendarTitle": "Community Calendar",
        "calendarSubtitle": "Stay updated with events happening across Houston.",
        "upcomingEvents": "Upcoming Events",
        "addToCalendar": "Add to Calendar",
        "searchPlaceholder": "What are you looking for today?",
        "sun": "Sun", "mon": "Mon", "tue": "Tue", "wed": "Wed", "thu": "Thu", "fri": "Fri", "sat": "Sat"
    },
    es: {
        heroTitle: "Conectando Houston",
        heroSubtitle: "Con Lo Que Importa.",
        heroDescription: "Encuentre organizaciones sin fines de lucro, servicios de apoyo, recreación y programas juveniles en su vecindario.",
        searchPlaceholder: "¿Qué estás buscando hoy?",
        search: "Buscar",
        directory: "Directorio",
        featured: "Destacados",
        calendar: "Calendario",
        petitions: "Crear un Cambio",
        support: "Apoyo",
        suggestResource: "Sugerir Recurso",
        resourcesListed: "Recursos Listados",
        categories: "Categorías",
        usersHelped: "Usuarios Ayudados",
        openNow: "Abierto Ahora",
        closed: "Cerrado",
        addToFavorites: "Agregar a favoritos",
        removeFromFavorites: "Quitar de favoritos",
        // Categories
        "Food Security": "Seguridad Alimentaria",
        "Recreation": "Recreación",
        "Community Centers": "Centros Comunitarios",
        "Support Services": "Servicios de Apoyo",
        "Youth Programs": "Programas Juveniles",
        "All": "Todos",
        // Dynamic
        "Emergency Resources": "Recursos de Emergencia",
        "Browse by Category": "Explorar por Categoría",
        // Sidebar & UI
        "navigation": "Navegación",
        "settings": "Ajustes",
        "appearance": "Apariencia",
        "theme": "Tema",
        "fontSize": "Tamaño de Fuente",
        "highContrast": "Alto Contraste",
        "language": "Idioma",
        "notifications": "Notificaciones",
        "pushNotifications": "Notificaciones Push",
        "emailUpdates": "Actualizaciones por Correo",
        "data": "Datos",
        "clearData": "Borrar Todos los Datos",
        // Footer & Bottom Nav
        "quickLinks": "Enlaces Rápidos",
        "getInvolved": "Involucrarse",
        "partnerInquiry": "Consulta de Socios",
        "resourceHub": "Centro de Recursos",
        "communityCalendar": "Calendario Comunitario",
        "spotlight": "Destacado",
        "events": "Eventos",
        "change": "Cambio",
        "communitySpotlight": "Destacado Comunitario",
        "communitySpotlightSubtitle": "Destacando los recursos más impactantes en Houston.",
        "viewDetails": "Ver Detalles",
        "save": "Guardar",
        "volunteerOpportunities": "Oportunidades de Voluntariado",
        "volunteerOpportunitiesSubtitle": "Marque la diferencia en su comunidad.",
        "signUpToVolunteer": "Regístrese para ser Voluntario",
        "supportYourCommunity": "Apoye a su Comunidad",
        "supportSubtitle": "Su apoyo ayuda a las organizaciones sin fines de lucro a brindar servicios esenciales a los habitantes de Houston.",
        "learnMoreDonate": "Más Información y Donar",
        "transportationResources": "Recursos de Transporte",
        "transportationSubtitle": "Muévase por Houston con estas opciones de transporte.",
        "visitWebsite": "Visitar Sitio",
        "schoolEvents": "Eventos Escolares",
        "schoolEventsSubtitle": "Manténgase al día con los eventos de Houston ISD y las escuelas locales.",
        "newsletterTitle": "Boletín de Houston Hub",
        "newsletterSubtitle": "Reciba actualizaciones semanales sobre recursos, eventos y noticias de la comunidad.",
        "enterEmail": "Ingrese su dirección de correo electrónico",
        "joinNow": "Únete Ahora",
        "thanksSubscribing": "¡Gracias por suscribirte! Te mantendremos informado.",
        "yourFavorites": "Tus Favoritos",
        "savedResources": "recursos guardados",
        "noFavoritesTitle": "Aún no hay favoritos",
        "noFavoritesSubtitle": "Guarde recursos haciendo clic en el icono del corazón en las tarjetas de recursos.",
        "browseResources": "Explorar Recursos",
        "trendingNow": "TENDENCIA AHORA",
        "resourceDirectory": "Directorio de Recursos",
        "clearFilters": "Borrar Filtros",
        "showing": "Mostrando",
        "resourcesInHouston": "recursos en Houston",
        "noResourcesFound": "No se encontraron recursos",
        "tryAdjustingFilters": "Intente ajustar sus filtros o términos de búsqueda.",
        "clearAllFilters": "Borrar Todos los Filtros",
        "openNow": "Abierto Ahora",
        "bookVenue": "Reservar Lugar",
        "shareOnTwitter": "Compartir en Twitter",
        "shareOnFacebook": "Compartir en Facebook",
        "copyLink": "Copiar enlace",
        "previousSlide": "Diapositiva Anterior",
        "nextSlide": "Diapositiva Siguiente",
        "goToSlide": "Ir a la diapositiva",
        "previousMonth": "Mes Anterior",
        "nextMonth": "Mes Siguiente",
        "favorites": "Favoritos",
        "footerTagline": "Cerrando la brecha entre residentes de Houston y recursos comunitarios.",
        "partnerText": "¿Eres una organización sin fines de lucro? ¡Asóciate con nosotros!",
        "copyright": "© 2026 Houston Community Hub. Presentación TSA Webmaster.",
        "trendingText": "<strong>Memorial Park Tennis Center</strong> acaba de añadir 4 canchas nuevas!",
        "bookNow": "Reservar ahora",
        "goHome": "Ir a la página de inicio",
        "openMenu": "Abrir menú",
        "closeMenu": "Cerrar menú",
        "backToTop": "Volver arriba",
        "calendarTitle": "Calendario Comunitario",
        "calendarSubtitle": "Manténgase actualizado con los eventos en todo Houston.",
        "upcomingEvents": "Próximos Eventos",
        "addToCalendar": "Añadir al Calendario",
        "searchPlaceholder": "¿Qué estás buscando hoy?",
        "sun": "Dom", "mon": "Lun", "tue": "Mar", "wed": "Mié", "thu": "Jue", "fri": "Vie", "sat": "Sáb"
    }
};
