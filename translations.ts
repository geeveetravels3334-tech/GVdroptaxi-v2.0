
export type Language = 'en' | 'ta' | 'hi' | 'te' | 'kn';

export interface ItineraryStep {
  text: string;
}

export interface PackageDetail {
  title: string;
  description?: string;
  duration: string;
  price: string;
  itinerary: ItineraryStep[];
  inclusions: string[];
}

export const translations = {
  en: {
    brand: "GVDROPTAXI",
    subBrand: "By Geevee Travels",
    nav: {
      home: "Home",
      packages: "Tour Plans",
      fleet: "Fleet",
      tariff: "Tariff",
      reviews: "Reviews",
      bookNow: "BOOK NOW",
      call: "24/7 Booking:"
    },
    booking: {
      onewaydrop: "One Way Drop",
      roundtrip: "Round Trip",
      localairport: "Local / Airport",
      pickup: "Pickup Location",
      drop: "Drop Location",
      date: "Travel Date",
      time: "Pickup Time",
      mobile: "Mobile Number",
      confirm: "Confirm Booking",
      success: "Booking Confirmed!",
      successDesc: "Your request has been received. Our team will contact you shortly on WhatsApp to finalize the details.",
      back: "Back to Home",
      selectVehicle: "Select Your Vehicle",
      chooseFromFleet: "Choose from our premium fleet"
    },
    hero: {
      tagline: "South India's Signature Selection",
      titleTop: "Signature Journeys through",
      titleBottom: "TAMIL NADU",
      subtitle: "Premium outstation and local cab booking service in Tamil Nadu with fixed pricing and professional drivers.",
      bookNow: "Book Your Ride",
      chat: "Chat with Experts",
      eliteDispatch: "Elite Dispatch",
      heritageTours: "Grand Heritage Tours",
      crystaElite: "Crysta Elite Suite",
      flagshipPrestige: "Flagship prestige",
      sanitationTier: "Sanitation Tier",
      eliteGold: "Elite Gold",
      arrivalProtocol: "Arrival Protocol",
      zeroWait: "Zero Wait",
      liveDispatch: "Live Dispatch",
      heritageCollections: "Signature Heritage collections"
    },
    packages: {
      sectionTitle: "Bespoke Tour Packages",
      sectionSubtitle: "Explore our handpicked spiritual, heritage, and leisure tour plans across Tamil Nadu.",
      exploreBtn: "View All Plans",
      closeBtn: "Close Plans",
      title: "Our Tour Plans",
      list: [
        { id: 'pondicherry', name: "Pondicherry", tagline: "The French Riviera of the East" },
        { id: 'velankanni', name: "Velankanni", tagline: "Soul-stirring Spiritual Journey" },
        { id: 'tiruvannamalai', name: "Tiruvannamalai", tagline: "The Abode of Eternal Peace" },
        { id: 'mahabalipuram', name: "Mahabalipuram", tagline: "Ancient Shoreline Heritage" },
        { id: 'kanchipuram', name: "Kanchipuram", tagline: "The Golden City of Temples" },
        { id: 'yercaud', name: "Yercaud", tagline: "Jewel of the Eastern Ghats" },
        { id: 'hogenakkal', name: "Hogenakkal", tagline: "The Niagara of India" },
        { id: 'chennai', name: "Chennai City Tour", tagline: "Gateway to South India" },
        { id: 'ooty', name: "Ooty Hills", tagline: "The Queen of Hill Stations" },
        { id: 'kodaikanal', name: "Kodaikanal", tagline: "Princess of Hill Stations" },
        { id: 'rameswaram', name: "Rameswaram", tagline: "The Island City of Faith" },
        { id: 'madurai', name: "Madurai", tagline: "The Lotus City - Athens of the East" },
        { id: 'kanyakumari', name: "Kanyakumari", tagline: "The Land's End Signature" },
        { id: 'tirupati', name: "Tirupati", tagline: "Sacred Seven Hills Journey" },
        { id: 'arupadaiveedu', name: "Arupadaiveedu", tagline: "Six Holy Abodes of Lord Murugan" },
        { id: 'panchabhoota', name: "Panchabhoota", tagline: "The Five Elements Shiva Tour" }
      ]
    },
    airport: {
      tag: "AIRPORT LOGISTICS",
      desc: "Punctual, clean, and reliable transfers for all major TN airports.",
      benefit1: "On-Time Arrival",
      benefit1Desc: "Flight monitoring ensures we are there when you land.",
      benefit2: "Large Fleet",
      benefit2Desc: "SUVs and Tempo Travellers for family luggage.",
      benefit3: "Safety First",
      benefit3Desc: "Professional drivers with expert local navigation.",
      bookBtn: "Book Airport Ride"
    },
    corporate: {
      tag: "SPECIAL SERVICES",
      title: "Corporate & Industrial Logistics",
      subtitle: "Tailored transportation for major industrial hubs and corporate offices.",
      description: "Our corporate packages cover major cities and industrial SIPCOT parks, providing reliable professional transit.",
      hubs: [
        { name: "Sri City (Tada)", desc: "Integrated Business City" },
        { name: "Sriperumbudur", desc: "Automobile Hub" },
        { name: "Oragadam", desc: "Industrial Corridor" },
        { name: "SIPCOT Parks", desc: "Manufacturing Hubs" }
      ],
      cta: "Enquire for Corporate Plans"
    },
    packageDisclaimer: "Note: Toll, Parking, and State Permit fees are excluded and must be paid as per actuals.",
    packageDetails: {
      pondicherry: {
        title: "Chennai to Pondicherry",
        description: "Experience the unique blend of French heritage and Tamil culture. From the spiritual Auroville to the vibrant Rock Beach, Pondicherry offers a serene escape. Wander through pastel-colored streets and enjoy world-class cafes.",
        duration: "1 or 2 Days",
        price: "Starts at ₹3,250",
        distance: "300 KM (Up & Down)",
        kmsIncluded: "250 KM Min",
        driverBatta: "Extra",
        otherCharges: "Toll, Permit, Parking Extra",
        itinerary: [
          { text: "Early morning pickup from Chennai." },
          { text: "Visit Auroville Matrimandir and Spiritual center." },
          { text: "Explore French Colony and White Town architecture." },
          { text: "Relax at Rock Beach and Promenade." },
          { text: "Enjoy French cafes and local shopping." }
        ],
        inclusions: ["Professional Driver", "Clean AC Vehicle", "24/7 Support"]
      },
      velankanni: {
        title: "Chennai to Velankanni",
        description: "A profound spiritual journey to the 'Lourdes of the East'. Experience divine blessings at the Annai Vailankanni Basilica and find peace by the serene sea shore. Perfect for families seeking a peaceful pilgrimage.",
        duration: "2 Days / 1 Night",
        price: "₹8,190",
        distance: "630 KM (Up & Down)",
        kmsIncluded: "630 KM",
        driverBatta: "₹500 Extra",
        otherCharges: "Toll, Permit, Parking Extra",
        itinerary: [
          { text: "Day 1: Chennai Pickup, Trichy Breakfast Stop." },
          { text: "Day 1: Reach Velankanni, Visit Basilica Church & Sea Shore." },
          { text: "Day 1: Overnight Stay in Velankanni." },
          { text: "Day 2: Morning Prayer, Museum visit, Local sightseeing." },
          { text: "Day 2: Return journey to Chennai with evening drop." }
        ],
        inclusions: ["Fuel Included", "630 KM Coverage", "Professional Driver"]
      },
      tiruvannamalai: {
        title: "Chennai to Tiruvannamalai",
        description: "Connect with your inner self at the feet of the sacred Arunachala Hill. Visit one of the Pancha Bhoota Stalas and immerse yourself in the spiritual energy of Ramana Ashram.",
        duration: "1 Day Tour",
        price: "₹5,200",
        distance: "400 KM (Up & Down)",
        kmsIncluded: "400 KM",
        driverBatta: "Extra",
        otherCharges: "Toll, Permit, Parking Extra",
        itinerary: [
          { text: "Early morning pickup from Chennai." },
          { text: "Lord Arunachaleswarar Temple Darshan." },
          { text: "Spiritual visit to Ramana Ashram & Virupaksha Cave." },
          { text: "Girivalam (Temple parikrama) visit." },
          { text: "Evening return to Chennai." }
        ],
        inclusions: ["Dedicated Driver", "AC Comfort", "Point-to-Point Service"]
      },
      mahabalipuram: {
        title: "Chennai to Mahabalipuram",
        description: "Journey through time at this UNESCO World Heritage site. Admire the exquisite rock-cut architecture, the iconic Shore Temple, and the massive lighthouse overlooking the Bay of Bengal.",
        duration: "1 Day Tour",
        price: "₹3,250",
        distance: "140 KM (Up & Down)",
        kmsIncluded: "250 KM Min",
        driverBatta: "Extra",
        otherCharges: "Toll, Parking Extra",
        itinerary: [
          { text: "Pickup and travel via scenic ECR road." },
          { text: "Visit Shore Temple and Five Rathas." },
          { text: "Explore Arjuna's Penance and Butter Ball." },
          { text: "Relax at Mahabalipuram Beach." },
          { text: "Museum visit and shopping for stone crafts." }
        ],
        inclusions: ["Comfortable Ride", "Local Expertise", "ECR Drive Experience"]
      },
      kanchipuram: {
        title: "Chennai to Kanchipuram",
        description: "Explore the 'Silk City' and its thousand temples. Experience the spiritual aura of Kamakshi Amman Temple and witness the legendary craftsmanship of Kancheepuram Silk Weavers.",
        duration: "1 Day Tour",
        price: "₹3,250",
        distance: "160 KM (Up & Down)",
        kmsIncluded: "250 KM Min",
        driverBatta: "Extra",
        otherCharges: "Toll, Parking Extra",
        itinerary: [
          { text: "Pickup and travel to the Temple City." },
          { text: "Visit Kamakshi Amman and Ekambareswarar Temples." },
          { text: "Explore Varadharaja Perumal Temple architecture." },
          { text: "Exclusive Silk Saree Shopping session." },
          { text: "Evening return journey." }
        ],
        inclusions: ["Temple City Guide Support", "Safe Storage for Shopping", "AC Sedan/SUV"]
      },
      yercaud: {
        title: "Chennai to Yercaud",
        description: "Escape to the 'Poor Man's Ooty' for a refreshing hilltop retreat. Enjoy the cool breeze of the Shevaroy Hills, tranquil boating on the lake, and stunning viewpoints high above the clouds.",
        duration: "2 Days / 1 Night",
        price: "₹9,360",
        distance: "720 KM (Up & Down)",
        kmsIncluded: "720 KM",
        driverBatta: "₹500 Extra",
        otherCharges: "Toll, Permit, Hills, Parking Extra",
        itinerary: [
          { text: "Day 1: Salem Stopover and Hill road drive." },
          { text: "Day 1: Yercaud Lake Boating and Deer Park." },
          { text: "Day 1: Lady's Seat and Pagoda View points." },
          { text: "Day 2: Killiyur Falls and Rose Garden explore." },
          { text: "Day 2: Sightseeing at the hill town and return to Chennai." }
        ],
        inclusions: ["Hill Station Expertise", "Driver Batta Excluded", "Fuel Included"]
      },
      hogenakkal: {
        title: "Chennai to Hogenakkal",
        description: "Witness the raw power of nature at the 'Niagara of India'. Experience the thrill of coracle rides amidst misty waterfalls and enjoy the scenic beauty of the Kaveri river canyon.",
        duration: "2 Days / 1 Night",
        price: "₹9,100",
        distance: "700 KM (Up & Down)",
        kmsIncluded: "700 KM",
        driverBatta: "₹500 Extra",
        otherCharges: "Toll, Permit, Parking Extra",
        itinerary: [
          { text: "Day 1: Depart from Chennai to Hogenakkal." },
          { text: "Day 1: Experience Coracle ride and Waterfall views." },
          { text: "Day 1: Local fish fry lunch and relaxation." },
          { text: "Day 2: Morning visit to nearby scenic spots." },
          { text: "Day 2: Leisure travel back to Chennai." }
        ],
        inclusions: ["Family Safe Drivers", "Clean Vehicles", "24/7 Road Side Support"]
      },
      chennai: {
        title: "Chennai City Package",
        description: "Explore the soul of Madras. From the historic Marina Beach to the spiritual center of Mylapore, discover the heritage, culture, and coastal charm of Chennai in a single day.",
        duration: "1 Day Tour",
        price: "₹3,250",
        distance: "City Limits",
        kmsIncluded: "250 KM Min",
        driverBatta: "Extra",
        otherCharges: "Toll, Parking Extra",
        itinerary: [
          { text: "Marina Beach and Gandhi Statue visit." },
          { text: "Kapaleeshwarar Temple and Mylapore Heritage Walk." },
          { text: "Fort St. George and Museum explore." },
          { text: "ECR scenic drive up to VGP/Mayajaal." },
          { text: "Shopping at T-Nagar or major malls." }
        ],
        inclusions: ["City Expert Driver", "AC Comfort", "Customizable Spots"]
      },
      ooty: {
        title: "Chennai to Ooty Hills",
        description: "Breathe in the fresh mountain air of the Nilgiris. Experience the nostalgic Toy Train, lush tea gardens, and the breathtaking views from Doddabetta peak in the 'Queen of Hill Stations'.",
        duration: "3 Days / 2 Nights",
        price: "₹14,500",
        itinerary: [
          { text: "Day 1: Arrival and Ooty Lake Boating." },
          { text: "Day 2: Coonoor tour and Botanical Gardens." },
          { text: "Day 3: Pykara Falls and Return Journey." }
        ],
        inclusions: ["Hill Station Professional Driver", "Clean SUV/Sedan"]
      },
      kodaikanal: {
        title: "Chennai to Kodaikanal",
        description: "Escape to the misty hills of Kodaikanal. Wander through pine forests, enjoy a boat ride on the star-shaped lake, and witness the stunning Pillar Rocks and Coaker's Walk.",
        duration: "3 Days / 2 Nights",
        price: "₹13,800",
        itinerary: [
          { text: "Day 1: Lake side relaxation and Bryan Park." },
          { text: "Day 2: Pillar Rocks, Guna Caves, and Pine Forest." },
          { text: "Day 3: Silver Cascade Falls and Descent." }
        ],
        inclusions: ["Experienced Mountain Pilot", "AC Vehicle"]
      },
      rameswaram: {
        title: "Chennai to Rameswaram",
        description: "A sacred pilgrimage to the island city of Rameswaram. Cross the majestic Pamban Bridge and seek blessings at the historic Ramanathaswamy Temple near the tip of the Indian peninsula.",
        duration: "2 Days / 1 Night",
        price: "₹9,500",
        itinerary: [
          { text: "Day 1: Pamban Bridge view and Temple visit." },
          { text: "Day 2: Dhanushkodi - The Ghost Town explore." }
        ],
        inclusions: ["Pilgrimage Route Expert", "Fuel Included"]
      },
      madurai: {
        title: "Chennai to Madurai",
        description: "Step into the 'Athens of the East'. Marvel at the architectural grandeur of the Meenakshi Amman Temple and explore the rich history of the Nayak dynasty in this ancient city.",
        duration: "2 Days",
        price: "₹8,400",
        itinerary: [
          { text: "Day 1: Meenakshi Temple and Palace Visit." },
          { text: "Day 2: Alagar Kovil and Local Markets." }
        ],
        inclusions: ["Heritage City Guide Driver", "City Tour Included"]
      },
      kanyakumari: {
        title: "Chennai to Kanyakumari",
        description: "Witness the confluence of three oceans at the southernmost tip of India. Enjoy the spectacular sunrise and sunset, and visit the iconic Vivekananda Rock Memorial.",
        duration: "3 Days / 2 Nights",
        price: "₹15,200",
        itinerary: [
          { text: "Day 1: Arrival and Sunset view at the beach." },
          { text: "Day 2: Vivekananda Rock and Suchindram Temple." },
          { text: "Day 3: Padmanabhapuram Palace return stop." }
        ],
        inclusions: ["Long-distance Specialist Driver", "AC Comfort"]
      },
      tirupati: {
        title: "Chennai to Tirupati",
        description: "A divine journey to the home of Lord Venkateswara. Experience a smooth and timely pilgrimage to the sacred Tirumala hills for a peaceful darshan.",
        duration: "1 Day Tour",
        price: "₹4,500",
        itinerary: [
          { text: "Early morning pickup and Hill drive." },
          { text: "Tirumala Temple Darshan (Ticket separate)." },
          { text: "Alamelumangapuram (Padmavathi) Temple visit." }
        ],
        inclusions: ["Andhra Permit Assistance", "Punctual Service"]
      },
      arupadaiveedu: {
        title: "Arupadaiveedu Spiritual Tour",
        description: "Embark on a soul-stirring journey to the six holy abodes of Lord Murugan. A comprehensive spiritual tour across the most sacred temples of Tamil Nadu.",
        duration: "4 Days / 3 Nights",
        price: "₹21,999",
        itinerary: [
          { text: "Day 1: Swamimalai and Thiruchendur." },
          { text: "Day 2: Palani and Madurai (Pazhamudhircholai)." },
          { text: "Day 3: Tirupparankunram and Return path." },
          { text: "Day 4: Thiruthani and Final Drop." }
        ],
        inclusions: ["Spiritual Route Specialist", "Luggage Support"]
      },
      panchabhoota: {
        title: "Panchabhoota Elements Tour",
        description: "A pilgrimage to the five sacred temples of Lord Shiva, each representing one of the five elements of nature - Earth, Water, Fire, Air, and Space.",
        duration: "5 Days / 4 Nights",
        price: "₹19,500",
        itinerary: [
          { text: "Day 1: Earth (Kanchipuram) & Fire (Tiruvannamalai)." },
          { text: "Day 2: Water (Trichy - Jambukeswarar)." },
          { text: "Day 3: Space (Chidambaram - Nataraja)." },
          { text: "Day 4: Air (Kalahasti) & Sripuram Gold Temple." }
        ],
        inclusions: ["Multi-day Professional Pilot", "AC Vehicle"]
      }
    },
    packageForm: {
      title: "Book This Package",
      name: "Your Name",
      phone: "Phone Number",
      date: "Travel Date",
      submit: "Send Enquiry"
    }
  },
  ta: {
    brand: "GVDROPTAXI",
    subBrand: "ஜீவி டிராவல்ஸ் - தமிழ்நாடு",
    nav: {
      home: "முகப்பு",
      packages: "சுற்றுலா திட்டங்கள்",
      fleet: "வாகனங்கள்",
      tariff: "கட்டணம்",
      reviews: "விமர்சனங்கள்",
      bookNow: "முன்பதிவு",
      call: "24/7 முன்பதிவு:"
    },
    booking: {
      onewaydrop: "ஒரு வழி பயணம்",
      roundtrip: "இரு வழி பயணம்",
      localairport: "உள்ளூர் / விமான நிலையம்",
      pickup: "புறப்படும் இடம்",
      drop: "செல்லும் இடம்",
      date: "பயண தேதி",
      time: "நேரம்",
      mobile: "மொபைல் எண்",
      confirm: "முன்பதிவை உறுதி செய்",
      success: "முன்பதிவு உறுதி செய்யப்பட்டது!",
      successDesc: "உங்கள் கோரிக்கை பெறப்பட்டது. எங்கள் குழு விரைவில் வாட்ஸ்அப் மூலம் உங்களைத் தொடர்பு கொள்ளும்.",
      back: "முகப்புக்குச் செல்",
      selectVehicle: "வாகனத்தைத் தேர்ந்தெடுக்கவும்",
      chooseFromFleet: "எங்கள் பிரீமியம் வாகனங்களில் இருந்து தேர்வு செய்யவும்"
    },
    hero: {
      tagline: "தென்னிந்தியாவின் அடையாளத் தேர்வு",
      titleTop: "அடையாளப் பயணங்கள்",
      titleBottom: "தமிழ்நாடு",
      subtitle: "தமிழ்நாட்டின் சிறந்த வெளியூர் மற்றும் உள்ளூர் டாக்ஸி சேவை. நிலையான கட்டணம் மற்றும் அனுபவமிக்க ஓட்டுநர்கள்.",
      bookNow: "பயணத்தைத் தொடங்க",
      chat: "உரையாடுங்கள்",
      eliteDispatch: "எலைட் டிஸ்பாட்ச்",
      heritageTours: "மாபெரும் பாரம்பரிய சுற்றுலா",
      crystaElite: "க்ரிஸ்டா எலைட் சூட்",
      flagshipPrestige: "முதன்மை கௌரவம்",
      sanitationTier: "சுத்திகரிப்பு அடுக்கு",
      eliteGold: "எலைட் கோல்ட்",
      arrivalProtocol: "வருகை நெறிமுறை",
      zeroWait: "பூஜ்ஜிய காத்திருப்பு",
      liveDispatch: "நேரடி டிஸ்பாட்ச்",
      heritageCollections: "அடையாள பாரம்பரிய தொகுப்புகள்"
    },
    packages: {
      sectionTitle: "சிறப்பு சுற்றுலா திட்டங்கள்",
      sectionSubtitle: "தமிழ்நாட்டின் ஆன்மீக மற்றும் வரலாற்று இடங்களுக்கான எங்கள் சிறப்புத் தொகுப்புகள்.",
      exploreBtn: "அனைத்தையும் காண்க",
      closeBtn: "மூடுக",
      title: "சுற்றுலா தொகுப்புகள்",
      list: [
        { id: 'pondicherry', name: "புதுச்சேரி சுற்றுலா", tagline: "பிரஞ்சு கலாச்சாரம் மற்றும் கடற்கரை அமைதி" },
        { id: 'velankanni', name: "வேளாங்கண்ணி புனித யாத்திரை", tagline: "புனித ஆரோக்கிய அன்னை பேராலய தரிசனம்" },
        { id: 'tiruvannamalai', name: "திருவண்ணாமலை ஆன்மீக பயணம்", tagline: "அண்ணாமலையார் கோவில் தரிசனம்" },
        { id: 'mahabalipuram', name: "மகாபலிபுரம் பாரம்பரிய உலா", tagline: "பல்லவர் கால சிற்பக்கலை அதிசயங்கள்" },
        { id: 'kanchipuram', name: "காஞ்சிபுரம் கோவில் மாநகரம்", tagline: "ஆன்மீகம் மற்றும் பட்டு நகரம்" },
        { id: 'yercaud', name: "ஏற்காடு பனிப்பொழிவு", tagline: "மலைகளின் ரகசியம் - பசுமை உலா" },
        { id: 'hogenakkal', name: "ஒகேனக்கல் நீர்வீழ்ச்சி", tagline: "இந்தியாவின் நயாகரா" },
        { id: 'chennai', name: "சென்னை மாநகர சுற்றுலா", tagline: "தென்னிந்தியாவின் நுழைவுவாயில்" },
        { id: 'ooty', name: "ஊட்டி மலை சுற்றுலா", tagline: "மலைகளின் ராணி" },
        { id: 'kodaikanal', name: "கொடைக்கானல் இயற்கை உலா", tagline: "மலைகளின் இளவரசி" },
        { id: 'rameswaram', name: "ராமேஸ்வரம் ஆன்மீக பயணம்", tagline: "புனித தனுஷ்கோடி மற்றும் கோவில் தரிசனம்" },
        { id: 'madurai', name: "மதுரை கோவில் மாநகரம்", tagline: "தூங்கா நகரம் - மீனாட்சி அம்மன் கோவில்" },
        { id: 'kanyakumari', name: "கன்னியாகுமரி சூரிய உதயம்", tagline: "இந்தியாவின் தென்கோடி முனை" },
        { id: 'tirupati', name: "திருப்பதி ஏழுமலையான் தரிசனம்", tagline: "புனித ஏழுமலை யாத்திரை" },
        { id: 'arupadaiveedu', name: "அறுபடைவீடு ஆன்மீக பயணம்", tagline: "முருகப்பெருமானின் ஆறு படைவீடுகள்" },
        { id: 'panchabhoota', name: "பஞ்சபூத ஸ்தலங்கள்", tagline: "ஐந்து இயற்கை மூலகங்களின் சிவன் தரிசனம்" }
      ]
    },
    airport: {
      tag: "விமான நிலைய சேவை",
      desc: "சென்னை, திருச்சி, மதுரை மற்றும் கோயம்புத்தூர் விமான நிலையங்களுக்கு பாதுகாப்பான மற்றும் நம்பகமான ஆப்-கால் டாக்ஸி சேவை.",
      benefit1: "நேரப்படி வருகை",
      benefit1Desc: "விமான நேரத்தைக் கண்காணித்து உங்கள் வருகைக்கு முன்பே நாங்கள் தயாராக இருப்போம்.",
      benefit2: "பெரிய வாகனங்கள்",
      benefit2Desc: "அதிகமான லக்கேஜ் மற்றும் குடும்பத்தினருடன் வசதியாக பயணம் செய்ய SUV மற்றும் டிராவலர்ஸ்.",
      benefit3: "பாதுகாப்பான பயணம்",
      benefit3Desc: "அனுபவம் வாய்ந்த ஓட்டுநர்களுடன் உங்கள் பயணம் எப்போதும் பாதுகாப்பானது.",
      bookBtn: "விமான பயணத்தை முன்பதிவு செய்"
    },
    corporate: {
      tag: "சிறப்பு சேவைகள்",
      title: "கார்ப்பரேட் மற்றும் தொழில்முறை போக்குவரத்து",
      subtitle: "முக்கிய தொழில்துறை மையங்கள் மற்றும் நிறுவனங்களுக்கான வடிவமைக்கப்பட்ட போக்குவரத்து.",
      description: "சிப்காட் மற்றும் முக்கிய நகரங்களுக்கான தினசரி மற்றும் மாதாந்திர போக்குவரத்து தேவைகளை நாங்கள் நிறைவு செய்கிறோம்.",
      hubs: [
        { name: "ஸ்ரீ சிட்டி (தடா)", desc: "ஒருங்கிணைந்த வணிக நகரம்" },
        { name: "ஸ்ரீபெரும்புதூர்", desc: "ஆட்டோமொபைல் மையம்" },
        { name: "ஒரகடம்", desc: "தொழிற்துறை வழித்தடம்" },
        { name: "சிப்காட் பூங்காக்கள்", desc: "உற்பத்தி மையங்கள்" }
      ],
      cta: "கார்ப்பரேட் திட்டங்களுக்கு விசாரிக்கவும்"
    },
    fleet: {
      title: "எங்கள் வாகனங்கள்",
      subtitle: "சுத்தமான மற்றும் வசதியான பிரீமியம் வாகனங்கள்.",
      features: {
        ac: "ஏசி வசதி",
        music: "இசை அமைப்பு",
        carrier: "கேரியர்/பைகள்",
        clean: "சுத்தமான வாகனங்கள்"
      },
      perKm: "/ கி.மீ"
    },
    packageDisclaimer: "குறிப்பு: சுங்கச்சாவடி, பார்க்கிங் மற்றும் மாநில அனுமதி கட்டணங்கள் தனி.",
    packageDetails: {
      pondicherry: {
        title: "Chennai to Pondicherry",
        description: "Experience the unique blend of French heritage and Tamil culture. From the spiritual Auroville to the vibrant Rock Beach, Pondicherry offers a serene escape. Wander through pastel-colored streets and enjoy world-class cafes.",
        duration: "1 or 2 Days",
        price: "Starts at ₹3,250",
        distance: "300 KM (Up & Down)",
        kmsIncluded: "250 KM Min",
        driverBatta: "Extra",
        otherCharges: "Toll, Permit, Parking Extra",
        itinerary: [
          { text: "Early morning pickup from Chennai." },
          { text: "Visit Auroville Matrimandir and Spiritual center." },
          { text: "Explore French Colony and White Town architecture." },
          { text: "Relax at Rock Beach and Promenade." },
          { text: "Enjoy French cafes and local shopping." }
        ],
        inclusions: ["Professional Driver", "Clean AC Vehicle", "24/7 Support"]
      },
      velankanni: {
        title: "Chennai to Velankanni",
        description: "A profound spiritual journey to the 'Lourdes of the East'. Experience divine blessings at the Annai Vailankanni Basilica and find peace by the serene sea shore. Perfect for families seeking a peaceful pilgrimage.",
        duration: "2 Days / 1 Night",
        price: "₹8,190",
        distance: "630 KM (Up & Down)",
        kmsIncluded: "630 KM",
        driverBatta: "₹500 Extra",
        otherCharges: "Toll, Permit, Parking Extra",
        itinerary: [
          { text: "Day 1: Chennai Pickup, Trichy Breakfast Stop." },
          { text: "Day 1: Reach Velankanni, Visit Basilica Church & Sea Shore." },
          { text: "Day 1: Overnight Stay in Velankanni." },
          { text: "Day 2: Morning Prayer, Museum visit, Local sightseeing." },
          { text: "Day 2: Return journey to Chennai with evening drop." }
        ],
        inclusions: ["Fuel Included", "630 KM Coverage", "Professional Driver"]
      },
      tiruvannamalai: {
        title: "Chennai to Tiruvannamalai",
        description: "Connect with your inner self at the feet of the sacred Arunachala Hill. Visit one of the Pancha Bhoota Stalas and immerse yourself in the spiritual energy of Ramana Ashram.",
        duration: "1 Day Tour",
        price: "₹5,200",
        distance: "400 KM (Up & Down)",
        kmsIncluded: "400 KM",
        driverBatta: "Extra",
        otherCharges: "Toll, Permit, Parking Extra",
        itinerary: [
          { text: "Early morning pickup from Chennai." },
          { text: "Lord Arunachaleswarar Temple Darshan." },
          { text: "Spiritual visit to Ramana Ashram & Virupaksha Cave." },
          { text: "Girivalam (Temple parikrama) visit." },
          { text: "Evening return to Chennai." }
        ],
        inclusions: ["Dedicated Driver", "AC Comfort", "Point-to-Point Service"]
      },
      mahabalipuram: {
        title: "Chennai to Mahabalipuram",
        description: "Journey through time at this UNESCO World Heritage site. Admire the exquisite rock-cut architecture, the iconic Shore Temple, and the massive lighthouse overlooking the Bay of Bengal.",
        duration: "1 Day Tour",
        price: "₹3,250",
        distance: "140 KM (Up & Down)",
        kmsIncluded: "250 KM Min",
        driverBatta: "Extra",
        otherCharges: "Toll, Parking Extra",
        itinerary: [
          { text: "Pickup and travel via scenic ECR road." },
          { text: "Visit Shore Temple and Five Rathas." },
          { text: "Explore Arjuna's Penance and Butter Ball." },
          { text: "Relax at Mahabalipuram Beach." },
          { text: "Museum visit and shopping for stone crafts." }
        ],
        inclusions: ["Comfortable Ride", "Local Expertise", "ECR Drive Experience"]
      },
      kanchipuram: {
        title: "Chennai to Kanchipuram",
        description: "Explore the 'Silk City' and its thousand temples. Experience the spiritual aura of Kamakshi Amman Temple and witness the legendary craftsmanship of Kancheepuram Silk Weavers.",
        duration: "1 Day Tour",
        price: "₹3,250",
        distance: "160 KM (Up & Down)",
        kmsIncluded: "250 KM Min",
        driverBatta: "Extra",
        otherCharges: "Toll, Parking Extra",
        itinerary: [
          { text: "Pickup and travel to the Temple City." },
          { text: "Visit Kamakshi Amman and Ekambareswarar Temples." },
          { text: "Explore Varadharaja Perumal Temple architecture." },
          { text: "Exclusive Silk Saree Shopping session." },
          { text: "Evening return journey." }
        ],
        inclusions: ["Temple City Guide Support", "Safe Storage for Shopping", "AC Sedan/SUV"]
      },
      hogenakkal: {
        title: "Chennai to Hogenakkal",
        description: "Witness the raw power of nature at the 'Niagara of India'. Experience the thrill of coracle rides amidst misty waterfalls and enjoy the scenic beauty of the Kaveri river canyon.",
        duration: "2 Days / 1 Night",
        price: "₹9,100",
        distance: "700 KM (Up & Down)",
        kmsIncluded: "700 KM",
        driverBatta: "₹500 Extra",
        otherCharges: "Toll, Permit, Parking Extra",
        itinerary: [
          { text: "Day 1: Depart from Chennai to Hogenakkal." },
          { text: "Day 1: Experience Coracle ride and Waterfall views." },
          { text: "Day 1: Local fish fry lunch and relaxation." },
          { text: "Day 2: Morning visit to nearby scenic spots." },
          { text: "Day 2: Leisure travel back to Chennai." }
        ],
        inclusions: ["Family Safe Drivers", "Clean Vehicles", "24/7 Road Side Support"]
      },
      chennai: {
        title: "Chennai City Package",
        description: "Explore the soul of Madras. From the historic Marina Beach to the spiritual center of Mylapore, discover the heritage, culture, and coastal charm of Chennai in a single day.",
        duration: "1 Day Tour",
        price: "₹3,250",
        distance: "City Limits",
        kmsIncluded: "250 KM Min",
        driverBatta: "Extra",
        otherCharges: "Toll, Parking Extra",
        itinerary: [
          { text: "Marina Beach and Gandhi Statue visit." },
          { text: "Kapaleeshwarar Temple and Mylapore Heritage Walk." },
          { text: "Fort St. George and Museum explore." },
          { text: "ECR scenic drive up to VGP/Mayajaal." },
          { text: "Shopping at T-Nagar or major malls." }
        ],
        inclusions: ["City Expert Driver", "AC Comfort", "Customizable Spots"]
      },
      ooty: {
        title: "ஊட்டி மலை சுற்றுலா",
        description: "நீலகிரியின் குளிர்ந்த காற்றை சுவாசித்து மகிழுங்கள். பசுமையான தேயிலைத் தோட்டங்கள், அமைதியான ஊட்டி ஏரி என குடும்பத்துடன் சிறந்த சுற்றுலா.",
        duration: "3 நாட்கள் / 2 இரவுகள்",
        price: "தொடக்க விலை ₹8,499",
        itinerary: [
          { text: "நாள் 1: ஊட்டி வருகை, ஊட்டி ஏரி மற்றும் தாவரவியல் பூங்கா தரிசனம்." },
          { text: "நாள் 2: குன்னூர் சுற்றுலா, தேயிலை தொழிற்சாலை மற்றும் தொட்டபெட்டா சிகரம்." },
          { text: "நாள் 3: பைக்காரா நீர்வீழ்ச்சி மற்றும் சென்னை திரும்புதல்." }
        ],
        inclusions: ["எரிபொருள் மற்றும் டிரைவர் பேட்டா", "அனுபவமிக்க ஓட்டுநர்"]
      },
      kodaikanal: {
        title: "கொடைக்கானல் இயற்கை உலா",
        description: "மலைகளின் இளவரசியை கண்டுகளியுங்கள். பைன் காடுகளின் வழியே நடந்து இயற்கையை ரசித்து, நட்சத்திர ஏரியில் படகு சவாரி செய்து மகிழுங்கள்.",
        duration: "3 நாட்கள் / 2 இரவுகள்",
        price: "தொடக்க விலை ₹7,999",
        itinerary: [
          { text: "நாள் 1: வருகை, கொடை ஏரி, பிரையன்ட் பூங்கா மற்றும் கோக்கர்ஸ் வாக்." },
          { text: "நாள் 2: பில்லர் ராக்ஸ், குணா குகைகள் மற்றும் பைன் காடுகள்." },
          { text: "நாள் 3: சில்வர் காஸ்கேட் நீர்வீழ்ச்சி மற்றும் திரும்புதல்." }
        ],
        inclusions: ["எரிபொருள் மற்றும் டிரைவர் பேட்டா", "அனுபவமிக்க ஓட்டுநர்"]
      },
      rameswaram: {
        title: "ராமேஸ்வரம் ஆன்மீக பயணம்",
        description: "மன அமைதி தரும் ஆன்மீகப் பயணம். ராமநாதசுவாமி கோவிலின் பிரம்மாண்டம் மற்றும் பாம்பன் பாலத்தின் அழகிய காட்சிகளை அனுபவியுங்கள்.",
        duration: "2 நாட்கள் / 1 இரவு",
        price: "தொடக்க விலை ₹8,500",
        itinerary: [
          { text: "நாள் 1: ராமநாதசுவாமி கோவில், அக்னி தீர்த்தம் மற்றும் தனுஷ்கோடி." },
          { text: "நாள் 2: அப்துல் கலாம் நினைவகம், பாம்பன் பாலம் மற்றும் திரும்புதல்." }
        ],
        inclusions: ["எரிபொருள் மற்றும் டிரைவர் பேட்டா", "அனுபவமிக்க ஓட்டுநர்"]
      },
      madurai: {
        title: "மதுரை கோவில் மாநகரம்",
        description: "மதுரையின் கம்பீரத்தை உணருங்கள். உலகப் புகழ் பெற்ற மீனாட்சி அம்மன் கோவில் மற்றும் வரலாற்றுச் சிறப்புமிக்க அரண்மணைகளை சுற்றிப் பாருங்கள்.",
        duration: "1 நாள்",
        price: "தொடக்க விலை ₹3,500",
        itinerary: [
          { text: "காலை: மீனாட்சி அம்மன் கோவில் மற்றும் அழகர் கோவில்." },
          { text: "மாலை: திருமலை நாயக்கர் மஹால் மற்றும் காந்தி அருங்காட்சியகம்." }
        ],
        inclusions: ["எரிபொருள் மற்றும் டிரைவர் பேட்டா", "அனுபவமிக்க ஓட்டுநர்"]
      },
      kanyakumari: {
        title: "கன்னியாகுமரி சூரிய உதயம்",
        description: "இந்தியாவின் தென்கோடி முனையில் நின்று கடலின் நடுவே விவேகானந்தர் பாறையை தரிசித்து, கண் கவர் சூரிய உதயத்தை காணுங்கள்.",
        duration: "2 நாட்கள் / 1 இரவு",
        price: "தொடக்க விலை ₹9,000",
        itinerary: [
          { text: "நாள் 1: வருகை, விவேகானந்தர் பாறை மற்றும் திருவள்ளுவர் சிலை." },
          { text: "நாள் 2: சூரிய உதயம், சுசீந்திரம் கோவில் மற்றும் திரும்புதல்." }
        ],
        inclusions: ["எரிபொருள் மற்றும் டிரைவர் பேட்டா", "அனுபவமிக்க ஓட்டுநர்"]
      },
      yercaud: {
        title: "ஏற்காடு பனிப்பொழிவு",
        description: "கிழக்குத் தொடர்ச்சி மலைகளில் ஒரு அமைதியான ஓய்வு. காபி தோட்டங்கள் மற்றும் பனி படர்ந்த மலை முகடுகளை ரசித்து மகிழுங்கள்.",
        duration: "2 நாட்கள் / 1 இரவு",
        price: "தொடக்க விலை ₹6,500",
        itinerary: [
          { text: "நாள் 1: ஏற்காடு ஏரி, லேடிஸ் சீட் மற்றும் பகோடா பாயிண்ட்." },
          { text: "நாள் 2: கிள்ளியூர் நீர்வீழ்ச்சி, ரோஜா தோட்டம் மற்றும் திரும்புதல்." }
        ],
        inclusions: ["எரிபொருள் மற்றும் டிரைவர் பேட்டா", "அனுபவமிக்க ஓட்டுநர்"]
      }
    },
    packageForm: {
      title: "இந்த திட்டத்தை முன்பதிவு செய்",
      name: "உங்கள் பெயர்",
      phone: "மொபைல் எண்",
      date: "பயண தேதி",
      submit: "தகவல் அனுப்பு"
    }
  },
  hi: {
    brand: "GVDROPTAXI",
    subBrand: "जीवी ट्रैवल्स - तमिलनाडु",
    nav: {
      home: "होम",
      packages: "टूर पैकेज",
      fleet: "कारें",
tariff: "किराया",
      reviews: "समीक्षाएं",
      bookNow: "बुक करें",
      call: "24/7 बुकिंग:"
    },
    booking: {
      onewaydrop: "वन वे ड्रॉप",
      roundtrip: "राउंड ट्रिप",
      localairport: "लोकल / एयरपोर्ट",
      pickup: "पिकअप स्थान",
      drop: "ड्रॉप स्थान",
      date: "यात्रा की तारीख",
      time: "समय",
      mobile: "मोबाइल नंबर",
      confirm: "बुकिंग कन्फर्म करें",
      success: "बुकिंग कन्फर्म!",
      successDesc: "आपका अनुरोध प्राप्त हो गया है। हमारी टीम जल्द ही व्हाट्सएप पर आपसे संपर्क करेगी।",
      back: "वापस जाएं",
      selectVehicle: "वाहन चुनें",
      chooseFromFleet: "हमारे प्रीमियम बेड़े से चुनें"
    },
    hero: {
      tagline: "दक्षिण भारत का सिग्नेचर चयन",
      titleTop: "सिग्नेचर यात्राएं",
      titleBottom: "तमिलनाडु",
      subtitle: "तमिलनाडु में प्रीमियम आउटस्टेशन और लोकल कैब बुकिंग सेवा। फिक्स्ड प्राइसिंग और प्रोफेशनल ड्राइवर।",
      bookNow: "अभी बुक करें",
      chat: "चैट करें",
      eliteDispatch: "एलीट डिस्पैच",
      heritageTours: "भव्य विरासत यात्रा",
      crystaElite: "क्रिस्टा एलीट सुइट",
      flagshipPrestige: "प्रमुख प्रतिष्ठा",
      sanitationTier: "स्वच्छता स्तर",
      eliteGold: "एलीट गोल्ड",
      arrivalProtocol: "आगमन प्रोटोकॉल",
      zeroWait: "शून्य प्रतीक्षा",
      liveDispatch: "लाइव डिस्पैच",
      heritageCollections: "सिग्नेचर विरासत संग्रह"
    },
    packages: {
      sectionTitle: "विशेष टूर पैकेज",
      sectionSubtitle: "तमिलनाडु के आध्यात्मिक और ऐतिहासिक स्थलों के लिए हमारे विशेष पैकेज।",
      exploreBtn: "सभी देखें",
      closeBtn: "बंद करें",
      title: "टूर प्लान्स",
      list: [
        { id: 'velankanni', name: "चेन्नई से वेलंकन्नी 2 दिन" },
        { id: 'tiruvannamalai', name: "तिरुवन्नमलाई 2 दिवसीय आध्यात्मिक यात्रा" },
        { id: 'arupadaiveedu', name: "अरुपदाई वीदु आध्यात्मिक यात्रा" },
        { id: 'panchabhoota', name: "पंच भूत स्थल यात्रा" },
        { id: 'kanchipuram', name: "कांचीपुरम मंदिर दर्शन" },
        { id: 'mahabalipuram', name: "महाबलीपुरम डे ट्रिप" },
        { id: 'tirupati', name: "तिरुपति दर्शन यात्रा" },
        { id: 'pondicherry', name: "पांडिचेरी 3 दिन की यात्रा" }
      ]
    },
    airport: {
      tag: "एयरपोर्ट सर्विस",
      desc: "सभी प्रमुख हवाई अड्डों के लिए समय पर और सुरक्षित पिकअप-ड्रॉप सेवा।",
      benefit1: "समय पर आगमन",
      benefit1Desc: "फ्लाइट ट्रैकिंग के साथ हम आपके लैंड करने से पहले तैयार रहते हैं।",
      benefit2: "बड़ी गाड़ियाँ",
      benefit2Desc: "ज्यादा सामान के लिए SUV और टेम्पो ट्रैवलर।",
      benefit3: "सुरक्षा पहले",
      benefit3Desc: "अनुभवी ड्राइवरों के साथ सुरक्षित यात्रा।",
      bookBtn: "एयरपोर्ट कैब बुक करें"
    },
    corporate: {
      tag: "कॉर्पोरेट सेवाएं",
      title: "कॉर्पोरेट और इंडस्ट्रियल",
      subtitle: "प्रमुख औद्योगिक केंद्रों और कार्यालयों के लिए विशेष परिवहन।",
      description: "सिपकॉट और प्रमुख शहरों के लिए दैनिक और मासिक किराये पर गाड़ियाँ उपलब्ध हैं।",
      hubs: [
        { name: "श्री सिटी", desc: "बिज़नेस सिटी" },
        { name: "श्रीपेरಂಬदूर", desc: "ऑटोमोबाइल हब" },
        { name: "ओरागदम", desc: "इंडस्ट्रियल कॉरिडोर" },
        { name: "सिपकॉट", desc: "मैन्युफैक्चरिंग हब" }
      ],
      cta: "पूछताछ करें"
    },
    packageDisclaimer: "नोट: टोल, पार्किंग और स्टेट परमिट शुल्क अलग से देना होगा।",
    packageDetails: {
      velankanni: {
        title: "चेन्नई से वेलंकन्नी 2 दिन",
        description: "वेलंकन्नी में शांति और आध्यात्मिकता का अनुभव करें। प्रार्थना करें और समुद्र तट के साथ-साथ बेसिलिका के दर्शन का आनंद लें।",
        duration: "2 दिन / 1 रात",
        price: "शुरुआती कीमत ₹8,200",
        itinerary: [
          { text: "दिन 1: चेन्नई से वेलंकन्नी यात्रा। बेसिलिका दर्शन।" },
          { text: "दिन 1: शाम को बीच और प्रार्थना।" },
          { text: "दिन 2: सुबह की प्रार्थना और संग्रहालय।" },
          { text: "दिन 2: दोपहर बाद चेन्नई वापसी।" }
        ],
        inclusions: ["फ्यूल और ड्राइवर भत्ता", "सिडान: ₹8,200", "SUV: ₹10,750", "प्रोफेशनल ड्राइवर"]
      },
      tiruvannamalai: {
        title: "चेन्नई से तिरुवन्नमलाई 2 दिवसीय आध्यात्मिक यात्रा",
        description: "अरुणाचलेश्वर मंदिर और शांतिपूर्ण आश्रमों में दर्शन करें। गिरिवलम के साथ पवित्र वातावरण का अनुभव करें।",
        duration: "2 दिन / 1 रात",
        price: "शुरुआती कीमत ₹7,499",
        itinerary: [
          { text: "दिन 1: सुबह 5:00 बजे चेन्नई से प्रस्थान। 9:30 बजे तिरुवन्नमलाई आगमन।" },
          { text: "दिन 1: 11:00 बजे अरुणाचलेश्वर मंदिर दर्शन। शाम 4:00 बजे रमण आश्रम और योगी रामसुरतकुमार आश्रम।" },
          { text: "दिन 2: सुबह 4:00 बजे गिरिवलम (14 किमी परिक्रमा) और अष्ट लिंगम दर्शन। दोपहर 1:00 बजे आदि अन्नामलाई मंदिर।" },
          { text: "दिन 2: दोपहर 3:00 बजे चेन्नई वापसी (वैकल्पिक जिंजी किला)। रात 8:30 बजे चेन्नई ड्रॉप।" }
        ],
        inclusions: ["फ्यूल और ड्राइवर भत्ता", "सिडान: ₹7,499", "SUV: ₹9,799", "स्टेट परमिट शामिल"]
      },
      arupadaiveedu: {
        title: "अरुपदाई वीदु 4 दिवसीय यात्रा",
        description: "भगवान मुरुगन के 6 पवित्र मंदिरों (अरुपदाई वीदु) की विशेष तीर्थ यात्रा का अनुभव करें और आशीर्वाद प्राप्त करें।",
        duration: "4 दिन / 3 रातें",
        price: "शुरुआती कीमत ₹21,999",
        itinerary: [
          { text: "दिन 1: चेन्नई से स्वामीमलाई (चौथा निवास)। स्वामीनाथस्वामी मंदिर दर्शन।" },
          { text: "दिन 2: पज़मुदिर्चोलाई (छठा निवास) और तिरुप्परंकुंद्रम (पहला निवास)। मदुरै यात्रा।" },
          { text: "दिन 3: तिरुचेंदूर (दूसरा निवास)। समुद्र तट मंदिर और पवित्र स्नान।" },
          { text: "दिन 4: पलानी (तीसरा निवास)। रोप कार/विंच द्वारा पहाड़ी मंदिर। चेन्नई वापसी।" }
        ],
        inclusions: ["फ्यूल और ड्राइवर भत्ता", "सिडान: ₹21,999", "SUV: ₹30,999", "सुझाव: पारंपरिक पोशाक अनिवार्य"]
      },
      panchabhoota: {
        title: "पंच भूत स्थल 5 दिन की यात्रा",
        description: "प्रकृति के पांच तत्वों का प्रतिनिधित्व करने वाले पवित्र शिव मंदिरों के दर्शन करें। यह यात्रा आपको आध्यात्मिक शांति प्रदान करेगी।",
        duration: "5 दिन / 4 रातें",
        price: "शुरुआती कीमत ₹19,500",
        itinerary: [
          { text: "दिन 1: कांचीपुरम (पृथ्वी) - एकाम्बरेश्वर।" },
          { text: "दिन 2: तिरुवन्नमलाई (अग्नि) - अरुणाचलेश्वर।" },
          { text: "दिन 3: त्रिची (जल) - जम्बुकेश्वर।" },
          { text: "दिन 4: चिदंबरम (आकाश) - नटराज।" },
          { text: "दिन 5: कालाहस्ती (वायु) और चेन्नई वापसी।" }
        ],
        inclusions: ["फ्यूल और ड्राइवर भत्ता", "सिडान: ₹19,500", "SUV: ₹26,000", "टोल/पार्किंग अलग"]
      },
      kanchipuram: {
        title: "कांचीपुरम और महाबलीपुरम 1 दिन",
        description: "कांचीपुरम के प्रसिद्ध मंदिरों और रेशम खरीदारी के साथ महाबलीपुरम की सुंदर मूर्तियों का एक दिन में आनंद लें।",
        duration: "1 दिन (12-14 घंटे)",
        price: "शुरुआती कीमत ₹3,800",
        itinerary: [
          { text: "सुबह: कामाक्षी अम्मन और कैलासनाथर मंदिर।" },
          { text: "दोपहर: सिल्क शॉपिंग और लंच।" },
          { text: "शाम: महाबलीपुरम शोर मंदिर और पांच रथ।" },
          { text: "रात: चेन्नई वापसी।" }
        ],
        inclusions: ["फ्यूल", "ड्राइवर भत्ता", "सिडान: ₹3,800", "SUV: ₹5,500"]
      },
      mahabalipuram: {
        title: "महाबलीपुरम और पांडिचेरी 2 दिन",
        description: "महाबलीपुरम की ऐतिहासिक वास्तुकला से लेकर पांडिचेरी के फ्रेंच क्वार्टर और शांतिपूर्ण बीच का अनुभव लें।",
        duration: "2 दिन / 1 रात",
        price: "शुरुआती कीमत ₹5,500",
        itinerary: [
          { text: "दिन 1: महाबलीपुरम दर्शन।" },
          { text: "दिन 1: पांडिचेरी यात्रा। शाम को बीच वॉक।" },
          { text: "दिन 2: ऑरोविले, फ्रेंच कॉलोनी और पैराडाइज बीच।" },
          { text: "दिन 2: चेन्नई वापसी।" }
        ],
        inclusions: ["फ्यूल", "ड्राइवर भत्ता", "सिडान: ₹5,500", "SUV: ₹7,500"]
      },
      tirupati: {
        title: "चेन्नई से तिरुपति 1 दिन",
        description: "भगवान वेंकटेश्वर के दर्शन के लिए तिरुपति की सुविधाजनक एक दिवसीय यात्रा। सुगम और आरामदायक सफर का आनंद लें।",
        duration: "1 दिन",
        price: "शुरुआती कीमत ₹4,500",
        itinerary: [
          { text: "चेन्नई से प्रस्थान (सुबह जल्दी)।" },
          { text: "तिरुमाला यात्रा। दर्शन (टिकट यात्री का)।" },
          { text: "तिरुचानूर पद्मावती मंदिर।" },
          { text: "रात को चेन्नई वापसी।" }
        ],
        inclusions: ["फ्यूल", "ड्राइवर भत्ता", "आंध्र परमिट/टैक्स अलग", "सिडान: ₹4,500", "SUV: ₹6,000"]
      },
      pondicherry: {
        title: "पांडिचेरी 3 दिन की यात्रा",
        description: "पांडिचेरी की शांत सड़कों, ऑरोविले और सुंदर समुद्र तटों पर एक आरामदायक छुट्टी पिताएं।",
        duration: "3 दिन / 2 रातें",
        price: "शुरुआती कीमत ₹7,500",
        itinerary: [
          { text: "दिन 1: पांडिचेरी आगमन और प्रोमेनेड बीच।" },
          { text: "दिन 2: ऑरोविले और फ्रेंच क्वार्टर।" },
          { text: "दिन 3: चुन्नमबार बोट हाउस और चेन्नई वापसी।" }
        ],
        inclusions: ["फ्यूल", "ड्राइवर भत्ता", "सिडान: ₹7,500", "SUV: ₹9,800"]
      }
    },
    packageForm: {
      title: "पैकेज बुक करें",
      name: "नाम",
      phone: "फ़ोन नंबर",
      date: "यात्रा की तारीख",
      submit: "पूछताछ भेजें"
    }
  },
  te: {
    brand: "జీవీ ట్రావెల్స్",
    subBrand: "తమిళనాడు టాక్సీ టూర్స్",
    nav: {
      home: "హోమ్",
      packages: "టూర్ ప్లాన్స్",
      fleet: "వాహనాలు",
      tariff: "ధరలు",
      reviews: "సమీక్షలు",
      bookNow: "బుక్ చేయండి",
      call: "24/7 బుకింగ్:"
    },
    booking: {
      onewaydrop: "వన్ వే డ్రాప్",
      roundtrip: "రౌండ్ ట్రిప్",
      localairport: "లోకల్ / విమానాశ్రయం",
      pickup: "పికప్ స్థానం",
      drop: "డ్రాప్ స్థానం",
      date: "ప్రయాణ తేదీ",
      time: "సమయం",
      mobile: "మొబైల్ నంబర్",
      confirm: "బుకింగ్‌ని నిర్ధారించండి",
      success: "బుకింగ్ నిర్ధారించబడింది!",
      successDesc: "మీ అభ్యర్థన స్వీకరించబడింది. వివరాలను ఖరారు చేయడానికి మా బృందం త్వరలో వాట్సాప్‌లో మిమ్మల్ని సంప్రదిస్తుంది.",
      back: "తిరిగి హోమ్‌కి వెళ్ళండి",
      selectVehicle: "మీ వాహనాన్ని ఎంచుకోండి",
      chooseFromFleet: "మా ప్రీమియం వాహనాల నుండి ఎంచుకోండి"
    },
    hero: {
      tagline: "దక్షిణ భారతదేశంలో సిగ్నేచర్ సెలక్షన్",
      titleTop: "సిగ్నేచర్ జర్నీస్ త్రూ",
      titleBottom: "తమిళనాడు",
      subtitle: "తమిళనాడులో ప్రీమియం అవుట్‌స్టేషన్ మరియు లోకల్ క్యాబ్ బుకింగ్ సేవ. ఫిక్స్‌డ్ ధర మరియు ప్రొఫెషనల్ డ్రైవర్లు.",
      bookNow: "ఇప్పుడే బుక్ చేయండి",
      chat: "చాట్ చేయండి",
      eliteDispatch: "ఎలైట్ డిస్పాచ్",
      heritageTours: "గ్రాండ్ హెరిటేజ్ టూర్స్",
      crystaElite: "క్రిస్టా ఎలైట్ సూట్",
      flagshipPrestige: "ఫ్లాగ్‌షిప్ ప్రెస్టీజ్",
      sanitationTier: "శానిటేషన్ టైర్",
      eliteGold: "ఎలైట్ గోల్డ్",
      arrivalProtocol: "అరైవల్ ప్రోటోకాల్",
      zeroWait: "జీరో వెయిట్",
      liveDispatch: "లైవ్ డిస్పాచ్",
      heritageCollections: "సిగ్నేచర్ హెరిటేజ్ కలెక్షన్స్"
    },
    packages: {
      sectionTitle: "ప్రత్యేక టూర్ ప్యాకేజీలు",
      sectionSubtitle: "తమిళనాడులోని ఆధ్యాత్మిక మరియు చారిత్రక ప్రదేశాల కోసం మా ప్రత్యేక ప్యాకేజీలు.",
      exploreBtn: "అన్నీ చూడండి",
      closeBtn: "మూసివేయండి",
      title: "టూర్ ప్లాన్స్",
      list: [
        { id: 'velankanni', name: "చెన్నై నుండి వేళాంగణ్ణి 2 రోజులు" },
        { id: 'tiruvannamalai', name: "తిరువణ్ణామలై 2 రోజుల యాత్ర" },
        { id: 'arupadaiveedu', name: "అరుపడై వీడు ఆధ్యాత్మిక యాత్ర" },
        { id: 'panchabhoota', name: "పంచ భూత స్థల యాత్ర" },
        { id: 'kanchipuram', name: "కాంచీపురం ఆలయ దర్శనం" },
        { id: 'mahabalipuram', name: "మహాబలిపురం డే ట్రిప్" },
        { id: 'tirupati', name: "తిరుపతి దర్శన యాత్ర" },
        { id: 'pondicherry', name: "పాండిచ్చేరి 3 రోజుల యాత్ర" }
      ]
    },
    airport: {
      tag: "విమానాశ్రయ సేవ",
      desc: "అన్ని ప్రధాన విమానాశ్రయాలకు సమయానికి మరియు సురక్షితమైన పికప్-డ్రాప్ సేవ.",
      benefit1: "సమయానికి రాక",
      benefit1Desc: "ఫ్లైట్ ట్రాకింగ్‌తో మీరు ల్యాండ్ అయ్యేలోపు మేము సిద్ధంగా ఉంటాము.",
      benefit2: "పెద్ద వాహనాలు",
      benefit2Desc: "ఎక్కువ లగేజీ కోసం SUV మరియు టెంపో ట్రావెలర్.",
      benefit3: "భద్రత ముఖ్యం",
      benefit3Desc: "అనుభవజ్ఞులైన డ్రైవర్లతో సురక్షిత ప్రయాణం.",
      bookBtn: "ఎయిర్‌పోర్ట్ క్యాబ్ బుక్ చేయండి"
    },
    corporate: {
      tag: "కార్పొరేట్ సేవలు",
      title: "కార్పొరేట్ మరియు ఇండస్ట్రియల్",
      subtitle: "ప్రధాన పారిశ్రామిక కేంద్రాలు మరియు కార్యాలయాలకు ప్రత్యేక రవాణా.",
      description: "సిప్‌కాట్ మరియు ప్రధాన నగరాలకు రోజువారీ మరియు నెలవారీ అద్దెకు వాహనాలు అందుబాటులో ఉన్నాయి.",
      hubs: [
        { name: "శ్రీ సిటీ", desc: "బిజినెస్ సిటీ" },
        { name: "శ్రీపెరంబుదూర్", desc: "ఆటోమొబైల్ హబ్" },
        { name: "ఒరగడం", desc: "ఇండస్ట్రియల్ కారిడార్" },
        { name: "సిప్‌కాట్", desc: "మాన్యుఫ్యాక్చరింగ్ హబ్" }
      ],
      cta: "విచారణ చేయండి"
    },
    packageDisclaimer: "గమనిక: టోల్, పార్కింగ్ మరియు స్టేట్ పర్మిట్ ఫీజులు అదనంగా చెల్లించాలి.",
    packageDetails: {
      velankanni: {
        title: "చెన్నై నుండి వేళాంగణ్ణి 2 రోజులు",
        description: "హైలాండ్స్ అండ్ తీరంలో ప్రశాంతతను ఆస్వాదించండి. అందమైన బసిలికా దర్శనంతో పాటు సముద్ర తీరంలో విహరించండి.",
        duration: "2 రోజులు / 1 రాత్రి",
        price: "ప్రారంభ ధర ₹8,200",
        itinerary: [
          { text: "రోజు 1: చెన్నై నుండి వేళాంగణ్ణి ప్రయాణం. బసిలికా దర్శనం." },
          { text: "రోజు 1: సాయంత్రం బీచ్ మరియు ప్రార్థన." },
          { text: "రోజు 2: ఉదయం ప్రార్థన మరియు మ్యూజియం." },
          { text: "రోజు 2: మధ్యాహ్నం చెన్నైకి తిరుగు ప్రయాణం." }
        ],
        inclusions: ["ఇంధనం మరియు డ్రైవర్ భత్యం", "సెడాన్: ₹8,200", "SUV: ₹10,750", "ప్రొఫెషనల్ డ్రైవర్"]
      },
      tiruvannamalai: {
        title: "చెన్నై నుండి తిరువణ్ణామలై 2 రోజుల యాత్ర",
        description: "అరుణాచలేశ్వర ఆలయంతో పాటు ఆధ్యాత్మిక ఆశ్రమాలను సందర్శించండి. ప్రఖ్యాత గిరివలంను అనుభూతి చెందండి.",
        duration: "2 రోజులు / 1 రాత్రి",
        price: "ప్రారంభ ధర ₹7,499",
        itinerary: [
          { text: "రోజు 1: ఉదయం 5:00 గంటలకు చెన్నై నుండి బయలుదేరుట. 9:30 గంటలకు తిరువణ్ణామలై చేరుట." },
          { text: "రోజు 1: 11:00 గంటలకు అరుణాచలేశ్వర ఆలయ దర్శనం. సాయంత్రం 4:00 రమణ ఆశ్రమం & యోగి రామ్‌సూరత్‌కుమార్ ఆశ్రమం." },
          { text: "రోజు 2: తెల్లవారుజామున 4:00 గంటలకు గిరివలం (14 కి.మీ). మధ్యాహ్నం 1:00 ఆది అన్నామలై ఆలయం." },
          { text: "రోజు 2: మధ్యాహ్నం 3:00 గంటలకు చెన్నై తిరుగు ప్రయాణం (ఐచ్ఛికం జింజీ కోట). రాత్రి 8:30 గంటలకు చెన్నై చేరుట." }
        ],
        inclusions: ["ఇంధనం మరియు డ్రైవర్ భత్యం", "సెడాన్: ₹7,499", "SUV: ₹9,799", "స్టేట్ పర్మిట్ చేర్చబడింది"]
      },
      arupadaiveedu: {
        title: "అరుపడై వీడు 4 రోజుల యాత్ర",
        description: "మురుగన్ స్వామి కొలువైన 6 పవిత్ర క్షేత్రాలను సందర్శించి అనంతమైన ఆధ్యాత్మిక ఆనందాన్ని పొందండి.",
        duration: "4 రోజులు / 3 రాత్రులు",
        price: "ప్రారంభ ధర ₹21,999",
        itinerary: [
          { text: "రోజు 1: చెన్నై నుండి స్వామిమలై (4వ క్షేత్రం). స్వామినాథస్వామి ఆలయ దర్శనం." },
          { text: "రోజు 2: పజముదిర్చోలై (6వ క్షేత్రం) & తిరుప్పరంకుండ్రం (1వ క్షేత్రం). మదురై ప్రయాణం." },
          { text: "రోజు 3: తిరుచెందూర్ (2వ క్షేత్రం). సముద్ర తీర ఆలయం మరియు పవిత్ర స్నానం." },
          { text: "రోజు 4: పళని (3వ క్షేత్రం). రోప్ కార్/వించ్ ద్వారా కొండ ఆలయం. చెన్నైకి తిరుగు ప్రయాణం." }
        ],
        inclusions: ["ఇంధనం మరియు డ్రైవర్ భత్యం", "సెడాన్: ₹21,999", "SUV: ₹30,999", "గమనిక: సాంప్రదాయ దుస్తులు తప్పనిసరి"]
      },
      panchabhoota: {
        title: "పంచ భూత స్థల 5 రోజుల యాత్ర",
        description: "పంచ భూతాలకు ప్రతీకైన ఐదు పవిత్ర శివాలయాలను కనులారా దర్శించి ఆధ్యాత్మిక భావనను పెంపొందించుకోండి.",
        duration: "5 రోజులు / 4 రాత్రులు",
        price: "ప్రారంభ ధర ₹19,500",
        itinerary: [
          { text: "రోజు 1: కాంచీపురం (భూమి) - ఏకాంబరేశ్వరుడు." },
          { text: "రోజు 2: తిరువణ్ణామలై (అగ్ని) - అరుణాచలేశ్వరుడు." },
          { text: "రోజు 3: తిరుచ్చి (నీరు) - జంబుకేశ్వరుడు." },
          { text: "రోజు 4: చిదంబరం (ఆకాశం) - నటరాజు." },
          { text: "రోజు 5: శ్రీకాళహస్తి (వాయువు) మరియు చెన్నైకి తిరుగు ప్రయాణం." }
        ],
        inclusions: ["ఇంధనం మరియు డ్రైవర్ భత్యం", "సెడాన్: ₹19,500", "SUV: ₹26,000", "టోల్/పార్కింగ్ అదనపు"]
      },
      kanchipuram: {
        title: "కాంచీపురం & మహాబలిపురం 1 రోజు",
        description: "ఒకే రోజులో కాంచీపురం పట్టు చీరలు, ప్రసిద్ధ ఆలయాలతో పాటు మహాబలిపురం అద్భుత శిల్పకళను దర్శించండి.",
        duration: "1 రోజు (12-14 గంటలు)",
        price: "ప్రారంభ ధర ₹3,800",
        itinerary: [
          { text: "ఉదయం: కామాక్షి అమ్మన్ & కైలాసనాథర్ ఆలయం." },
          { text: "మధ్యాహ్నం: సిల్క్ షాపింగ్ మరియు లంచ్." },
          { text: "సాయంత్రం: మహాబలిపురం షోర్ టెంపుల్ మరియు పంచ రథాలు." },
          { text: "రాత్రి: చెన్నైకి తిరుగు ప్రయాణం." }
        ],
        inclusions: ["ఇంధనం", "డ్రైవర్ భత్యం", "సెడాన్: ₹3,800", "SUV: ₹5,500"]
      },
      mahabalipuram: {
        title: "మహాబలిపురం & పాండిచ్చేరి 2 రోజులు",
        description: "మహాబలిపురం పురాతన శిల్పాలను ఆస్వాదించి పాండిచ్చేరి తీరాల్లో మరియు ఆరోవిల్ లో ప్రశాంతతను వెదకండి.",
        duration: "2 రోజులు / 1 రాత్రి",
        price: "ప్రారంభ ధర ₹5,500",
        itinerary: [
          { text: "రోజు 1: మహాబలిపురం దర్శనం." },
          { text: "రోజు 1: పాండిచ్చేరి ప్రయాణం. సాయంత్రం బీచ్ వాక్." },
          { text: "రోజు 2: ఆరోవిల్, ఫ్రెంచ్ కాలనీ మరియు ప్యారడైజ్ బీచ్." },
          { text: "రోజు 2: చెన్నైకి తిరుగు ప్రయాణం." }
        ],
        inclusions: ["ఇంధనం", "డ్రైవర్ భత్యం", "సెడాన్: ₹5,500", "SUV: ₹7,500"]
      },
      tirupati: {
        title: "చెన్నై నుండి తిరుపతి 1 రోజు",
        description: "తిరుమల శ్రీ వేంకటేశ్వర స్వామి దర్శనార్థం సౌకర్యవంతమైన, అనుకూలమైన ఒక రోజు ప్రయాణం.",
        duration: "1 రోజు",
        price: "ప్రారంభ ధర ₹4,500",
        itinerary: [
          { text: "చెన్నై నుండి ప్రయాణం (ఉదయం)." },
          { text: "తిరుమల యాత్ర. దర్శనం (టికెట్ యాత్రికుడి బాధ్యత)." },
          { text: "తిరుచానూర్ పద్మావతి అమ్మవారి ఆలయం." },
          { text: "రాత్రికి చెన్నైకి తిరుగు ప్రయాణం." }
        ],
        inclusions: ["ఇంధనం", "డ్రైవర్ భత్యం", "ఆంధ్ర పర్మిట్/టాక్స్ అదనపు", "సెడాన్: ₹4,500", "SUV: ₹6,000"]
      },
      pondicherry: {
        title: "పాండిచ్చేరి 3 రోజుల యాత్ర",
        description: "పాండిచ్చేరి అద్భుతమైన ఫ్రెంచ్ ఆర్కిటెక్చర్, బీచ్‌లు మరియు ఆరోవిల్ ఆశ్రమం అందాలను ఆస్వాదించండి.",
        duration: "3 రోజులు / 2 రాత్రులు",
        price: "ప్రారంభ ధర ₹7,500",
        itinerary: [
          { text: "రోజు 1: పాండిచ్చేరి రాక మరియు ప్రోమెనేడ్ బీచ్." },
          { text: "రోజు 2: ఆరోవిల్ మరియు ఫ్రెంచ్ క్వార్టర్." },
          { text: "రోజు 3: చున్నంబార్ బోట్ హౌస్ మరియు చెన్నైకి తిరుగు ప్రయాణం." }
        ],
        inclusions: ["ఇంధనం", "డ్రైవర్ భత్యం", "సెడాన్: ₹7,500", "SUV: ₹9,800"]
      }
    },
    packageForm: {
      title: "ప్యాకేజీని బుక్ చేయండి",
      name: "పేరు",
      phone: "ఫోన్ నంబర్",
      date: "ప్రయాణ తేదీ",
      submit: "విచారణ పంపండి"
    }
  },
  kn: {
    brand: "ಜೀವಿ ಟ್ರಾವೆಲ್ಸ್",
    subBrand: "ತಮಿಳುನಾಡು ಟ್ಯಾಕ್ಸಿ ಟೂರ್ಸ್",
    nav: {
      home: "ಮುಖಪುಟ",
      packages: "ಪ್ರವಾಸ ಪ್ಯಾಕೇಜುಗಳು",
      fleet: "ವಾಹನಗಳು",
      tariff: "ದರಗಳು",
      reviews: "ವಿಮರ್ಶೆಗಳು",
      bookNow: "ಬುಕ್ ಮಾಡಿ",
      call: "24/7 ಬುಕಿಂಗ್:"
    },
    booking: {
      onewaydrop: "ಒನ್ ವೇ ಡ್ರಾಪ್",
      roundtrip: "ರೌಂಡ್ ಟ್ರಿಪ್",
      localairport: "ಲೋಕಲ್ / ಏರ್‌ಪೋರ್ಟ್",
      pickup: "ಪಿಕಪ್ ಸ್ಥಳ",
      drop: "ಡ್ರಾಪ್ ಸ್ಥಳ",
      date: "ಪ್ರಯಾಣದ ದಿನಾಂಕ",
      time: "ಸಮಯ",
      mobile: "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
      confirm: "ಬುಕಿಂಗ್ ದೃಢೀಕರಿಸಿ",
      success: "ಬುಕಿಂಗ್ ದೃಢೀಕರಿಸಲಾಗಿದೆ!",
      successDesc: "ನಿಮ್ಮ ವಿನಂತಿಯನ್ನು ಸ್ವೀಕರಿಸಲಾಗಿದೆ. ವಿವರಗಳನ್ನು ಅಂತಿಮಗೊಳಿಸಲು ನಮ್ಮ ತಂಡ ಶೀಘ್ರದಲ್ಲೇ ವಾಟ್ಸಾಪ್ ಮೂಲಕ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತದೆ.",
      back: "ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ",
      selectVehicle: "ವಾಹನವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
      chooseFromFleet: "ನಮ್ಮ ಪ್ರೀಮಿಯಂ ವಾಹನಗಳಿಂದ ಆರಿಸಿ"
    },
    hero: {
      tagline: "ದಕ್ಷಿಣ ಭಾರತದ ಸಿಗ್ನೇಚರ್ ಆಯ್ಕೆ",
      titleTop: "ಸಿಗ್ನೇಚರ್ ಜರ್ನಿ ತ್ರೂ",
      titleBottom: "ತಮಿಳುನಾಡು",
      subtitle: "ತಮಿಳುನಾಡಿನಲ್ಲಿ ಪ್ರೀಮಿಯಂ ಔಟ್‌ಸ್ಟೇಷನ್ ಮತ್ತು ಲೋಕಲ್ ಕ್ಯಾಬ್ ಬುಕಿಂಗ್ ಸೇವೆ. ನಿಗದಿತ ದರ ಮತ್ತು ವೃತ್ತಿಪರ ಚಾಲಕರು.",
      bookNow: "ಈಗಲೇ ಬುಕ್ ಮಾಡಿ",
      chat: "ಚಾಟ್ ಮಾಡಿ",
      eliteDispatch: "ಎಲೈಟ್ ಡಿಸ್ಪ್ಯಾಚ್",
      heritageTours: "ಗ್ರ್ಯಾಂಡ್ ಹೆರಿಟೇಜ್ ಟೂರ್ಸ್",
      crystaElite: "ಕ್ರಿಸ್ಟಾ ಎಲೈಟ್ ಸೂಟ್",
      flagshipPrestige: "ಫ್ಲ್ಯಾಗ್‌ಶಿಪ್ ಪ್ರೆಸ್ಟೀಜ್",
      sanitationTier: "ಸ್ಯಾನಿಟೈಸೇಶನ್ ಟೈರ್",
      eliteGold: "ಎಲೈಟ್ ಗೋಲ್ಡ್",
      arrivalProtocol: "ಅರೈವಲ್ ಪ್ರೊಟೊಕಾಲ್",
      zeroWait: "ಜೀರೊ ವೇಟ್",
      liveDispatch: "ಲೈವ್ ಡಿಸ್ಪ್ಯಾಚ್",
      heritageCollections: "ಸಿಗ್ನೇಚರ್ ಹೆರಿಟೇಜ್ ಕಲೆಕ್ಷನ್ಸ್"
    },
    packages: {
      sectionTitle: "ವಿಶೇಷ ಪ್ರವಾಸ ಪ್ಯಾಕೇಜುಗಳು",
      sectionSubtitle: "ತಮಿಳುನಾಡಿನ ಆಧ್ಯಾತ್ಮಿಕ ಮತ್ತು ಐತಿಹಾಸಿಕ ತಾಣಗಳಿಗಾಗಿ ನಮ್ಮ ವಿಶೇಷ ಪ್ಯಾಕೇಜುಗಳು.",
      exploreBtn: "ಎಲ್ಲವನ್ನೂ ವೀಕ್ಷಿಸಿ",
      closeBtn: "ಮುಚ್ಚಿ",
      title: "ಟೂರ್ ಪ್ಲಾನ್",
      list: [
        { id: 'velankanni', name: "ಚೆನ್ನೈನಿಂದ ವೇಲಾಂಗಣ್ಣಿ 2 ದಿನಗಳು" },
        { id: 'tiruvannamalai', name: "ತಿರುವಣ್ಣಾಮಲೈ 2 ದಿನಗಳ ಯಾತ್ರೆ" },
        { id: 'arupadaiveedu', name: "ಅರುಪದೈ ವೀಡು ಆಧ್ಯಾತ್ಮಿಕ ಯಾತ್ರೆ" },
        { id: 'panchabhoota', name: "ಪಂಚ ಭೂತ ಸ್ಥಳ ಯಾತ್ರೆ" },
        { id: 'kanchipuram', name: "ಕಾಂಚೀಪುರಂ ದೇವಸ್ಥಾನ ದರ್ಶನ" },
        { id: 'mahabalipuram', name: "ಮಹಾಬಲಿಪುರಂ ಡೇ ಟ್ರಿಪ್" },
        { id: 'tirupati', name: "ತಿರುಪತಿ ದರ್ಶನ ಯಾತ್ರೆ" },
        { id: 'pondicherry', name: "ಪಾಂಡಿಚೇರಿ 3 ದಿನಗಳ ಯಾತ್ರೆ" }
      ]
    },
    airport: {
      tag: "ವಿಮಾನ ನಿಲ್ದಾಣ ಸೇವೆ",
      desc: "ಎಲ್ಲಾ ಪ್ರಮುಖ ವಿಮಾನ ನಿಲ್ದಾಣಗಳಿಗೆ ಸಮಯಕ್ಕೆ ಸರಿಯಾಗಿ ಮತ್ತು ಸುರಕ್ಷಿತ ಪಿಕಪ್-ಡ್ರಾಪ್ ಸೇವೆ.",
      benefit1: "ಸಮಯಕ್ಕೆ ಸರಿಯಾಗಿ",
      benefit1Desc: "ಫ್ಲೈಟ್ ಟ್ರ್ಯಾಕಿಂಗ್‌ನೊಂದಿಗೆ ನೀವು ಲ್ಯಾಂಡ್ ಆಗುವ ಮೊದಲೇ ನಾವು ಸಿದ್ಧವಾಗಿರುತ್ತೇವೆ.",
      benefit2: "ದೊಡ್ಡ ವಾಹನಗಳು",
      benefit2Desc: "ಹೆಚ್ಚು ಲಗೇಜ್‌ಗಾಗಿ SUV ಮತ್ತು ಟೆಂಪೋ ಟ್ರಾವೆಲರ್.",
      benefit3: "ಸುರಕ್ಷತೆ ಮುಖ್ಯ",
      benefit3Desc: "ಅನುಭವಿ ಚಾಲಕರೊಂದಿಗೆ ಸುರಕ್ಷಿತ ಪ್ರಯಾಣ.",
      bookBtn: "ಏರ್‌ಪೋರ್ಟ್ ಕ್ಯಾಬ್ ಬುಕ್ ಮಾಡಿ"
    },
    corporate: {
      tag: "ಕಾರ್ಪೊರೇಟ್ ಸೇವೆಗಳು",
      title: "ಕಾರ್ಪೊರೇಟ್ ಮತ್ತು ಇಂಡಸ್ಟ್ರಿಯಲ್",
      subtitle: "ಪ್ರಮುಖ ಕೈಗಾರಿಕಾ ಕೇಂದ್ರಗಳು ಮತ್ತು ಕಚೇರಿಗಳಿಗೆ ವಿಶೇಷ ಸಾರಿಗೆ.",
      description: "ಸಿಪ್‌ಕಾಟ್ ಮತ್ತು ಪ್ರಮುಖ ನಗರಗಳಿಗೆ ದೈನಂದಿನ ಮತ್ತು ಮಾಸಿಕ ಬಾಡಿಗೆಗೆ ವಾಹನಗಳು ಲಭ್ಯವಿದೆ.",
      hubs: [
        { name: "ಶ್ರೀ ಸಿಟಿ", desc: "ಬಿಸಿನೆಸ್ ಸಿಟಿ" },
        { name: "ಶ್ರೀಪೆರಂಬದೂರ್", desc: "ಆಟೋಮೊಬైಲ್ ಹಬ್" },
        { name: "ಒರಗಡಂ", desc: "ಇಂಡಸ್ಟ್ರಿಯಲ್ ಕಾರಿಡಾರ್" },
        { name: "ಸಿಪ್‌ಕಾಟ್", desc: "ಮ್ಯಾನುಫ್ಯಾಕ್ಚರಿಂಗ್ ಹಬ್" }
      ],
      cta: "ವಿಚಾರಿಸಿ"
    },
    packageDisclaimer: "ಗಮನಿಸಿ: ಟೋಲ್, ಪಾರ್ಕಿಂಗ್ ಮತ್ತು ಸ್ಟೇಟ್ ಪರ್ಮಿಟ್ ಶುಲ್ಕಗಳು ಹೆಚ್ಚುವರಿಯಾಗಿರುತ್ತದೆ.",
    packageDetails: {
      velankanni: {
        title: "ಚೆನ್ನೈನಿಂದ ವೇಲಾಂಗಣ್ಣಿ 2 ದಿನಗಳು",
        description: "ಪುಣ್ಯಭೂಮಿಯ ಪ್ರಶಾಂತತೆ ಮತ್ತು ಸಮುದ್ರತೀರದ ಆಹ್ಲಾದಕರ ಅನುಭವ. ಸುಂದರವಾದ ಬೆಸಿಲಿಕಾ ದರ್ಶನ ಪಡೆಯಿರಿ.",
        duration: "2 ದಿನಗಳು / 1 ರಾತ್ರಿ",
        price: "ಆರಂಭಿಕ ಬೆಲೆ ₹8,200",
        itinerary: [
          { text: "ದಿನ 1: ಚೆನ್ನೈನಿಂದ ವೇಲಾಂಗಣ್ಣಿ ಪ್ರಯಾಣ. ಬೆಸಿಲಿಕಾ ದರ್ಶನ." },
          { text: "ದಿನ 1: ಸಂಜೆ ಬೀಚ್ ಮತ್ತು ಪ್ರಾರ್ಥನೆ." },
          { text: "ದಿನ 2: ಬೆಳಿಗ್ಗೆ ಪ್ರಾರ್ಥನೆ ಮತ್ತು ಮ್ಯೂಸಿಯಂ." },
          { text: "ದಿನ 2: ಮಧ್ಯಾಹ್ನ ಚೆನ್ನೈಗೆ ಹಿಂತಿರುಗುವ ಪ್ರಯಾಣ." }
        ],
        inclusions: ["ಇಂಧನ ಮತ್ತು ಚಾಲಕ ಭತ್ಯೆ", "ಸೆಡಾನ್: ₹8,200", "SUV: ₹10,750", "ವೃತ್ತಿಪರ ಚಾಲಕ"]
      },
      tiruvannamalai: {
        title: "ಚೆన్నೈನಿಂದ ತಿರುವಣ್ಣಾಮಲೈ 2 ದಿನಗಳ ಯಾತ್ರೆ",
        description: "ಅರುಣಾಚಲೇಶ್ವರ ದೇವಾಲಯ ಮತ್ತು ಶಾಂತಿಯುತ ಆಶ್ರಮಗಳ ಭೇಟಿ. ಪ್ರಸಿದ್ಧ ಗಿರಿವಲಂ ಪ್ರದಕ್ಷಿಣೆ ಅನುಭವಿಸಿ.",
        duration: "2 ದಿನಗಳು / 1 ರಾತ್ರಿ",
        price: "ಆರಂಭಿಕ ಬೆಲೆ ₹7,499",
        itinerary: [
          { text: "ದಿನ 1: ಬೆಳಿಗ್ಗೆ 5:00 ಕ್ಕೆ ಚೆನ್ನೈನಿಂದ ನಿರ್ಗಮನ. 9:30 ಕ್ಕೆ ತಿರುವಣ್ಣಾಮಲೈ ತಲುಪುವುದು." },
          { text: "ದಿನ 1: 11:00 ಕ್ಕೆ ಅರುಣಾಚಲೇಶ್ವರ ದೇವಸ್ಥಾನ ದರ್ಶನ. ಸಂಜೆ 4:00 ರಮಣ ಆಶ್ರಮ & ಯೋಗಿ ರಾಮ್‌ಸೂರತ್‌ಕುಮಾರ್ ಆಶ್ರಮ." },
          { text: "ದಿನ 2: ಬೆಳಿಗ್ಗೆ 4:00 ಕ್ಕೆ ಗಿರಿವಲಂ (14 ಕಿ.ಮೀ) ಮತ್ತು ಅಷ್ಟ ಲಿಂಗಗಳ ದರ್ಶನ. ಮಧ್ಯಾಹ್ನ 1:00 ಆದಿ ಅಣ್ಣಾಮಲೈ ದೇವಸ್ಥಾನ." },
          { text: "ದಿನ 2: ಮಧ್ಯಾಹ್ನ 3:00 ಕ್ಕೆ ಚೆನ್ನೈಗೆ ಹಿಂತಿರುಗುವಿಕೆ (ಐಚ್ಛಿಕ ಜಿಂಜೀ ಕೋಟೆ). ರಾತ್ರಿ 8:30 ಕ್ಕೆ ಚೆನ್ನೈ ತಲುಪುವುದು." }
        ],
        inclusions: ["ಇಂಧನ ಮತ್ತು ಚಾಲಕ ಭತ್ಯೆ", "ಸೆಡಾನ್: ₹7,499", "SUV: ₹9,799", "ರಾಜ್ಯ ಪರವಾನಗಿ ಸೇರಿದೆ"]
      },
      arupadaiveedu: {
        title: "ಅರುಪದೈ ವೀಡು 4 ದಿನಗಳ ಯಾತ್ರೆ",
        description: "ಮುರುಗನ್ ಸ್ವಾಮಿಯ ಆರು ಪವಿತ್ರ ಪುಣ್ಯಕ್ಷೇತ್ರಗಳ ದರ್ಶನ ಮತ್ತು ಅನಂತ ಆಧ್ಯಾತ್ಮಿಕ ಶಾಂತಿಯ ಅನುಭವ.",
        duration: "4 ದಿನಗಳು / 3 ರಾತ್ರಿಗಳು",
        price: "ಆರಂಭಿಕ ಬೆಲೆ ₹21,999",
        itinerary: [
          { text: "ದಿನ 1: ಚೆನ್ನೈನಿಂದ ಸ್ವಾಮಿಮಲೈ (4ನೇ ಕ್ಷೇತ್ರ). ಸ್ವಾಮಿನಾಥಸ್ವಾಮಿ ದೇವಸ್ಥಾನ ದರ್ಶನ." },
          { text: "ದಿನ 2: ಪಜಮುದಿರ್ಚೋಲೈ (6ನೇ ಕ್ಷೇತ್ರ) ಮತ್ತು ತಿರುಪ್ಪರಂಕುಂದ್ರಂ (1ನೇ ಕ್ಷೇತ್ರ). ಮಧುರೈ ಪ್ರಯಾಣ." },
          { text: "ದಿನ 3: ತಿರುಚೆಂದೂರ್ (2ನೇ ಕ್ಷೇತ್ರ). ಸಮುದ್ರ ತೀರದ ದೇವಸ್ಥಾನ ಮತ್ತು ಪವಿತ್ರ ಸ್ನಾನ." },
          { text: "ದಿನ 4: ಪಳನಿ (3ನೇ ಕ್ಷೇತ್ರ). ರೋಪ್ ಕಾರ್/ವಿಂಚ್ ಮೂಲಕ ಬೆಟ್ಟದ ದೇವಸ್ಥಾನ. ಚೆನ್ನೈಗೆ ಹಿಂತಿರುಗುವ ಪ್ರಯಾಣ." }
        ],
        inclusions: ["ಇಂಧನ ಮತ್ತು ಚಾಲಕ ಭತ್ಯೆ", "ಸೆಡಾನ್: ₹21,999", "SUV: ₹30,999", "ಸೂಚನೆ: ಸಾಂಪ್ರದಾಯಿಕ ಉಡುಗೆ ಕಡ್ಡಾಯ"]
      },
      panchabhoota: {
        title: "ಪಂಚ ಭೂತ ಸ್ಥಳ 5 ದಿನಗಳ ಯಾತ್ರೆ",
        description: "ಪಂಚ ಭೂತಗಳನ್ನು ಪ್ರತಿನಿಧಿಸುವ ಐದು ಪ್ರಮುಖ ಶಿವ ದೇವಾಲಯಗಳ ದರ್ಶನ ಪಡೆದು ಆಧ್ಯಾತ್ಮಿಕವಾಗಿ ಆನಂದಿಸಿ.",
        duration: "5 ದಿನಗಳು / 4 ರಾತ್ರಿಗಳು",
        price: "ಆರಂಭಿಕ ಬೆಲೆ ₹19,500",
        itinerary: [
          { text: "ದಿನ 1: ಕಾಂಚೀಪುರಂ (ಭೂಮಿ) - ಏಕಾಂಬರೇಶ್ವರ." },
          { text: "ದಿನ 2: ತಿರುವಣ್ಣಾಮಲೈ (ಅಗ್ನಿ) - ಅರುಣಾಚಲೇಶ್ವರ." },
          { text: "ದಿನ 3: ತಿರುಚ್ಚಿ (ನೀರು) - ಜಂಬುಕೇಶ್ವರ." },
          { text: "ದಿನ 4: ಚಿದಂಬರಂ (ಆಕಾಶ) - ನಟರಾಜ." },
          { text: "ದಿನ 5: ಶ್ರೀಕಾಳಹಸ್ತಿ (ವಾಯು) ಮತ್ತು ಚೆನ್ನೈಗೆ ಹಿಂತಿರುಗುವ ಪ್ರಯಾಣ." }
        ],
        inclusions: ["ಇಂಧನ ಮತ್ತು ಚಾಲಕ ಭತ್ಯೆ", "ಸೆಡಾನ್: ₹19,500", "SUV: ₹26,000", "ಟೋಲ್/ಪಾರ್ಕಿಂಗ್ ಪ್ರತ್ಯೇಕ"]
      },
      kanchipuram: {
        title: "ಕಾಂಚೀಪುರಂ ಮತ್ತು ಮಹಾಬಲಿಪುರಂ 1 ದಿನ",
        description: "ಒಂದೇ ದಿನದಲ್ಲಿ ಕಾಂಚೀಪುರಂ ದೇವಸ್ಥಾನಗಳು, ಸಿಲ್ಕ್ ಸೀರೆಗಳ ಶಾಪಿಂಗ್ ಮತ್ತು ಮಹಾಬಲಿಪುರಂ ಶಿಲ್ಪಕಲೆಗಳ ದರ್ಶನ.",
        duration: "1 ದಿನ (12-14 ಗಂಟೆಗಳು)",
        price: "ಆರಂಭಿಕ ಬೆಲೆ ₹3,800",
        itinerary: [
          { text: "ಬೆಳಿಗ್ಗೆ: ಕಾಮಾಕ್ಷಿ ಅಮ್ಮನ್ ಮತ್ತು ಕೈಲಾಸನಾಥರ್ ದೇವಸ್ಥಾನ." },
          { text: "ಮಧ್ಯಾಹ್ನ: ಸಿಲ್ಕ್ ಶಾಪಿಂಗ್ ಮತ್ತು ಊಟ." },
          { text: "ಸಂಜೆ: ಮಹಾಬಲಿಪುರಂ ಶೋರ್ ಟೆಂಪಲ್ ಮತ್ತು ಪಂಚ ರಥಗಳು." },
          { text: "ರಾತ್ರಿ: ಚೆನ್ನೈಗೆ ಹಿಂತಿರುಗುವ ಪ್ರಯಾಣ." }
        ],
        inclusions: ["ಇಂಧನ", "ಚಾಲಕ ಭತ್ಯೆ", "ಸೆಡಾನ್: ₹3,800", "SUV: ₹5,500"]
      },
      mahabalipuram: {
        title: "ಮಹಾಬಲಿಪುರಂ ಮತ್ತು ಪಾಂಡಿಚೇರಿ 2 ದಿನಗಳು",
        description: "ಪ್ರಾಚೀನ ಶಿಲ್ಪಕಲೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ ಪಾಂಡಿಚೇರಿಯ ಸುಂದರ ಬೀಚ್‌ಗಳು, ಫ್ರೆಂಚ್ ವಾಸ್ತುಶಿಲ್ಪದಲ್ಲಿ ವಿಶ್ರಾಂತಿ ಪಡೆಯಿರಿ.",
        duration: "2 ದಿನಗಳು / 1 ರಾತ್ರಿ",
        price: "ಆರಂಭಿಕ ಬೆಲೆ ₹5,500",
        itinerary: [
          { text: "ದಿನ 1: ಮಹಾಬಲಿಪುರಂ ದರ್ಶನ." },
          { text: "ದಿನ 1: ಪಾಂಡಿಚೇರಿ ಪ್ರಯಾಣ. ಸಂಜೆ ಬೀಚ್ ವಾಕ್." },
          { text: "ದಿನ 2: ಆರೋವಿಲ್, ಫ್ರೆಂಚ್ ಕಾಲೋನಿ ಮತ್ತು ಪ್ಯಾರಡೈಸ್ ಬೀಚ್." },
          { text: "ದಿನ 2: ಚೆನ್ನೈಗೆ ಹಿಂತಿರುಗುವ ಪ್ರಯಾಣ." }
        ],
        inclusions: ["ಇಂಧನ", "ಚಾಲಕ ಭತ್ಯೆ", "ಸೆಡಾನ್: ₹5,500", "SUV: ₹7,500"]
      },
      tirupati: {
        title: "ಚೆನ್ನೈನಿಂದ ತಿರುಪತಿ 1 ದಿನ",
        description: "ತಿರುಮಲ ಶ್ರೀ ವೆಂಕಟೇಶ್ವರ ಸ್ವಾಮಿ ದರ್ಶನಕ್ಕಾಗಿ ಆರಾಮದಾಯಕ ಮತ್ತು ಸುಲಭವಾದ ಒಂದು ದಿನದ ಪ್ರವಾಸ.",
        duration: "1 ದಿನ",
        price: "ಆರಂಭಿಕ ಬೆಲೆ ₹4,500",
        itinerary: [
          { text: "ಚೆನ್ನೈನಿಂದ ಪ್ರಯಾಣ (ಬೆಳಿಗ್ಗೆ ಬೇಗ)." },
          { text: "ತಿರುಮಲ ಯಾತ್ರೆ. ದರ್ಶನ (ಟಿಕೆಟ್ ಯಾತ್ರಿಕರ ಜವಾಬ್ದಾರಿ)." },
          { text: "ತಿರುಚಾನೂರ್ ಪದ್ಮಾವತಿ ಅಮ್ಮನವರ ದೇವಸ್ಥಾನ." },
          { text: "ರಾತ್ರಿ ಚೆನ್ನೈಗೆ ಹಿಂತಿರುಗುವ ಪ್ರಯಾಣ." }
        ],
        inclusions: ["ಇಂಧನ", "ಚಾಲಕ ಭತ್ಯೆ", "ಆಂಧ್ರ ಪರ್ಮಿಟ್/ಟ್ಯಾಕ್ಸ್ ಪ್ರತ್ಯೇಕ", "ಸೆಡಾನ್: ₹4,500", "SUV: ₹6,000"]
      },
      pondicherry: {
        title: "ಪಾಂಡಿಚೇರಿ 3 ದಿನಗಳ ಯಾತ್ರೆ",
        description: "ಪಾಂಡಿಚೇರಿಯ ಸುಂದರ ಫ್ರೆಂಚ್ ಕ್ವಾರ್ಟರ್ಸ್, ಶುದ್ಧ ಬೀಚ್‌ಗಳು ಮತ್ತು ಆರೋವಿಲ್ಲೆ ಆಶ್ರಮವನ್ನು ಆನಂದಿಸಿ.",
        duration: "3 ದಿನಗಳು / 2 ರಾತ್ರಿಗಳು",
        price: "ಆರಂಭಿಕ ಬೆಲೆ ₹7,500",
        itinerary: [
          { text: "ದಿನ 1: ಪಾಂಡಿಚೇರಿ ಆಗಮನ ಮತ್ತು ಪ್ರೊಮೆನೇಡ್ ಬೀಚ್." },
          { text: "ದಿನ 2: ಆರೋವಿಲ್ ಮತ್ತು ಫ್ರೆಂಚ್ ಕ್ವಾರ್ಟರ್." },
          { text: "ದಿನ 3: ಚುನ್ನಂಬಾರ್ ಬೋಟ್ ಹೌಸ್ ಮತ್ತು ಚೆನ್ನೈಗೆ ಹಿಂತಿರುಗುವ ಪ್ರಯಾಣ." }
        ],
        inclusions: ["ಇಂಧನ", "ಚಾಲಕ ಭತ್ಯೆ", "ಸೆಡಾನ್: ₹7,500", "SUV: ₹9,800"]
      }
    },
    packageForm: {
      title: "ಪ್ಯಾಕೇಜ್ ಬುಕ್ ಮಾಡಿ",
      name: "ಹೆಸರು",
      phone: "ಫೋನ್ ಸಂಖ್ಯೆ",
      date: "ಪ್ರಯಾಣದ ದಿನಾಂಕ",
      submit: "ವಿಚಾರಣೆ ಕಳುಹಿಸಿ"
    }
  }
};
