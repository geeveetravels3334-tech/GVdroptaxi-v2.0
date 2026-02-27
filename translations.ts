
export type Language = 'en' | 'ta' | 'hi' | 'te' | 'kn';

export interface ItineraryStep {
  text: string;
}

export interface PackageDetail {
  title: string;
  duration: string;
  price: string;
  itinerary: ItineraryStep[];
  inclusions: string[];
}

export const translations = {
  en: {
    brand: "Geevee Travels",
    subBrand: "Tamilnadu Taxi Tours",
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
      subtitle: "Premium outstation and local cab booking service in Tamil Nadu with fixed pricing and professional drivers.",
      bookNow: "Book Your Ride",
      chat: "Chat with Experts"
    },
    packages: {
      sectionTitle: "Bespoke Tour Packages",
      sectionSubtitle: "Explore our handpicked spiritual, heritage, and leisure tour plans across Tamil Nadu.",
      exploreBtn: "View All Plans",
      closeBtn: "Close Plans",
      title: "Our Tour Plans",
      list: [
        { id: 'velankanni', name: "Chennai to Velankanni 2 Days" },
        { id: 'tiruvannamalai', name: "Tiruvannamalai Spiritual 2 Days" },
        { id: 'arupadaiveedu', name: "Arupadai Veedu Tour" },
        { id: 'panchabhoota', name: "5 Elements Temple Tour" },
        { id: 'kanchipuram', name: "Kanchipuram Temple Tour" },
        { id: 'mahabalipuram', name: "Mahabalipuram Day Trip" },
        { id: 'tirupati', name: "Tirupati Spiritual Tour" },
        { id: 'pondicherry', name: "Pondicherry 3 Days Tour" }
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
      velankanni: {
        title: "Chennai to Velankanni 2 Days Tour Package",
        duration: "2 Days / 1 Night",
        price: "Starts at ₹8,200",
        itinerary: [
          { text: "Day 1: Pickup from Chennai and drive to Velankanni. Visit Our Lady of Health Basilica." },
          { text: "Day 1: Evening attendance at the Holy Rosary and Beach visit." },
          { text: "Day 2: Morning Mass at the Basilica, Visit the Museum of Offerings." },
          { text: "Day 2: Afternoon departure and Safe Return journey to Chennai." }
        ],
        inclusions: ["Fuel and Driver Batta", "Sedan: ₹8,200", "SUV: ₹10,750", "Professional Chauffeur"]
      },
      tiruvannamalai: {
        title: "Divine Spiritual Journey: Chennai to Tiruvannamalai",
        duration: "2 Days / 1 Night",
        price: "Starts at ₹7,499",
        itinerary: [
          { text: "Day 1: 05:00 AM Pickup. 09:30 AM Arrival & Check-in. 11:00 AM Arunachaleswarar Temple Darshan." },
          { text: "Day 1: 04:00 PM Sri Ramana & Yogi Ramsuratkumar Ashrams. Optional trek to Virupaksha Cave." },
          { text: "Day 2: 04:00 AM Girivalam (14 km circumambulation) & Ashta Lingams visit. 12:00 PM Check-out." },
          { text: "Day 2: Visit Adi Annamalai Temple. 03:00 PM Departure (Optional Gingee Fort). 08:30 PM Drop." }
        ],
        inclusions: ["Fuel and Driver Batta", "Sedan: ₹7,499", "SUV: ₹9,799", "Temple Guidance"]
      },
      arupadaiveedu: {
        title: "Arupadai Veedu (6 Abodes of Murugan) 4 Days Tour",
        duration: "4 Days / 3 Nights",
        price: "Starts at ₹21,999",
        itinerary: [
          { text: "Day 1: Chennai ➔ Swamimalai (4th Abode). Drive 6-7 hrs. Visit Swaminathaswamy Temple (Where Murugan taught Pranava Mantra to Shiva)." },
          { text: "Day 2: Pazhamudircholai (6th Abode) & Thiruparankundram (1st Abode). Drive to Madurai. Visit Alagar Hill & Marriage site of Murugan." },
          { text: "Day 3: Tiruchendur (2nd Abode). Seashore Temple. Traditional sea dip before darshan. Viswaroopa Darshan at 5:30 AM." },
          { text: "Day 4: Palani (3rd Abode) ➔ Return to Chennai. Reach hilltop via Rope Car/Winch. Famous for Panchamirtham." }
        ],
        inclusions: ["Fuel and Driver Batta", "Sedan: ₹21,999", "SUV: ₹30,999", "Temple Guidance", "Travel Tips: Traditional Dress Code Mandatory"]
      },
      panchabhoota: {
        title: "Pancha Bhoota Sthalam (5 Elements) 5 Days Tour",
        duration: "5 Days / 4 Nights",
        price: "Starts at ₹19,500",
        itinerary: [
          { text: "Day 1: Kanchipuram (Earth/Prithvi) - Ekambareswarar Temple." },
          { text: "Day 2: Tiruvannamalai (Fire/Agni) - Arunachaleswarar Temple." },
          { text: "Day 3: Trichy/Thiruvanaikaval (Water/Appu) - Jambukeswarar Temple." },
          { text: "Day 4: Chidambaram (Sky/Akash) - Natarajar Temple." },
          { text: "Day 5: Srikalahasti (Air/Vayu) and return to Chennai." }
        ],
        inclusions: ["Fuel and Driver Batta", "Sedan: ₹19,500", "SUV: ₹26,000", "Toll/Parking Extra"]
      },
      kanchipuram: {
        title: "Kanchipuram & Mahabalipuram 1 Day Tour",
        duration: "1 Day (12-14 Hours)",
        price: "Starts at ₹3,800",
        itinerary: [
          { text: "Morning: Pickup from Chennai, Drive to Kanchipuram. Visit Kamakshi Amman & Kailasanathar Temples." },
          { text: "Afternoon: Silk Saree Shopping (Optional) and Lunch." },
          { text: "Evening: Drive to Mahabalipuram. Visit Shore Temple and Five Rathas." },
          { text: "Night: Return to Chennai drop." }
        ],
        inclusions: ["Fuel", "Driver Batta", "Sedan: ₹3,800", "SUV: ₹5,500"]
      },
      mahabalipuram: {
        title: "Mahabalipuram & Pondicherry 2 Days Tour",
        duration: "2 Days / 1 Night",
        price: "Starts at ₹5,500",
        itinerary: [
          { text: "Day 1: Chennai to Mahabalipuram sightseeing (UNESCO sites)." },
          { text: "Day 1: Drive to Pondicherry via ECR. Evening Beach walk." },
          { text: "Day 2: Auroville, French Colony, and Paradise Beach." },
          { text: "Day 2: Return to Chennai." }
        ],
        inclusions: ["Fuel", "Driver Batta", "Sedan: ₹5,500", "SUV: ₹7,500"]
      },
      tirupati: {
        title: "Chennai to Tirupati One Day Tour",
        duration: "1 Day / Same Day Return",
        price: "Starts at ₹4,500",
        itinerary: [
          { text: "Pickup from Chennai (Early Morning)." },
          { text: "Drive to Tirumala. Darshan assistance (Tickets to be booked by guest)." },
          { text: "Visit Padmavathi Ammavari Temple at Tiruchanur." },
          { text: "Return to Chennai by night." }
        ],
        inclusions: ["Fuel", "Driver Batta", "Andhra Permit & Tax Extra", "Sedan: ₹4,500", "SUV: ₹6,000"]
      },
      pondicherry: {
        title: "Pondicherry Leisure 3 Days Tour",
        duration: "3 Days / 2 Nights",
        price: "Starts at ₹7,500",
        itinerary: [
          { text: "Day 1: Arrival in Pondicherry. Check-in and Promenade Beach." },
          { text: "Day 2: Auroville Globe (Matrimandir) and French Quarter Heritage Walk." },
          { text: "Day 3: Chunnambar Boat House and Return to Chennai." }
        ],
        inclusions: ["Fuel", "Driver Batta", "Sedan: ₹7,500", "SUV: ₹9,800"]
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
    brand: "ஜீவி டிராவல்ஸ்",
    subBrand: "தமிழ்நாடு டாக்ஸி டூர்ஸ்",
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
      subtitle: "தமிழ்நாட்டின் சிறந்த வெளியூர் மற்றும் உள்ளூர் டாக்ஸி சேவை. நிலையான கட்டணம் மற்றும் அனுபவமிக்க ஓட்டுநர்கள்.",
      bookNow: "பயணத்தைத் தொடங்க",
      chat: "உரையாடுங்கள்"
    },
    packages: {
      sectionTitle: "சிறப்பு சுற்றுலா திட்டங்கள்",
      sectionSubtitle: "தமிழ்நாட்டின் ஆன்மீக மற்றும் வரலாற்று இடங்களுக்கான எங்கள் சிறப்புத் தொகுப்புகள்.",
      exploreBtn: "அனைத்தையும் காண்க",
      closeBtn: "மூடுக",
      title: "சுற்றுலா தொகுப்புகள்",
      list: [
        { id: 'velankanni', name: "சென்னை - வேளாங்கண்ணி 2 நாட்கள்" },
        { id: 'tiruvannamalai', name: "திருவண்ணாமலை 2 நாட்கள் ஆன்மீக பயணம்" },
        { id: 'arupadaiveedu', name: "அறுபடை வீடு ஆன்மீக பயணம்" },
        { id: 'panchabhoota', name: "பஞ்ச பூத ஸ்தலங்கள்" },
        { id: 'kanchipuram', name: "காஞ்சிபுரம் கோவில் உலா" },
        { id: 'mahabalipuram', name: "மகாபலிபுரம் ஒரு நாள் பயணம்" },
        { id: 'tirupati', name: "திருப்பதி தரிசன பயணம்" },
        { id: 'pondicherry', name: "புதுச்சேரி 3 நாட்கள் உலா" }
      ]
    },
    airport: {
      tag: "விமான நிலைய சேவை",
      desc: "அனைத்து முக்கிய விமான நிலையங்களுக்கும் சரியான நேரத்தில், பாதுகாப்பான பயண சேவை.",
      benefit1: "சரியான நேரம்",
      benefit1Desc: "விமானம் தரையிறங்கும் முன்பே நாங்கள் காத்திருப்போம்.",
      benefit2: "பெரிய வாகனங்கள்",
      benefit2Desc: "குடும்ப லக்கேஜ்களுக்கான SUV மற்றும் வேன் வசதி.",
      benefit3: "பாதுகாப்பு முக்கியம்",
      benefit3Desc: "பாதுகாப்பான பயணத்திற்கு அனுபவமிக்க ஓட்டுநர்கள்.",
      bookBtn: "முன்பதிவு செய்க"
    },
    corporate: {
      tag: "சிறப்பு சேவைகள்",
      title: "கார்ப்பரேட் மற்றும் இண்டஸ்ட்ரியல்",
      subtitle: "முக்கிய தொழில் நிறுவனங்களுக்கான பிரத்யேக போக்குவரத்து சேவை.",
      description: "சிப்காட் மற்றும் முக்கிய தொழில் நகரங்களுக்கு தினசரி மற்றும் மாதந்திர வாடகை அடிப்படையில் வாகனங்கள்.",
      hubs: [
        { name: "ஸ்ரீ சிட்டி (தடா)", desc: "பிசினஸ் சிட்டி" },
        { name: "ஸ்ரீபெரும்புதூர்", desc: "ஆட்டோமொபைல் ஹப்" },
        { name: "ஒரகடம்", desc: "தொழில் வழித்தடம்" },
        { name: "சிப்காட்", desc: "உற்பத்தி ஆலைகள்" }
      ],
      cta: "விவரம் கேட்க"
    },
    packageDisclaimer: "குறிப்பு: சுங்கச்சாவடி (Toll), பார்க்கிங் மற்றும் மாநில வரி (Permit) ஆகியவை பயணத்தின் போது தனியாக செலுத்த வேண்டும்.",
    packageDetails: {
      velankanni: {
        title: "சென்னை - வேளாங்கண்ணி 2 நாட்கள்",
        duration: "2 நாட்கள் / 1 இரவு",
        price: "தொடக்க விலை ₹8,200",
        itinerary: [
          { text: "நாள் 1: சென்னையிலிருந்து வேளாங்கண்ணி பயணம். மாதா பேராலயம் தரிசனம்." },
          { text: "நாள் 1: மாலை கடற்கரை மற்றும் செபம்." },
          { text: "நாள் 2: காலை திருப்பலி மற்றும் மியூசியம்." },
          { text: "நாள் 2: மதியம் சென்னை திரும்புதல்." }
        ],
        inclusions: ["எரிபொருள் மற்றும் டிரைவர் பேட்டா", "செடான்: ₹8,200", "SUV: ₹10,750", "அனுபவமிக்க ஓட்டுநர்"]
      },
      tiruvannamalai: {
        title: "சென்னை - திருவண்ணாமலை 2 நாட்கள் ஆன்மீக பயணம்",
        duration: "2 நாட்கள் / 1 இரவு",
        price: "தொடக்க விலை ₹7,499",
        itinerary: [
          { text: "நாள் 1: காலை 5:00 சென்னை புறப்பாடு. காலை 9:30 திருவண்ணாமலை வருகை." },
          { text: "நாள் 1: காலை 11:00 அண்ணாமலையார் கோவில் தரிசனம். மாலை 4:00 ரமணா & யோகி ராம்சுரத்குமார் ஆசிரமம்." },
          { text: "நாள் 2: அதிகாலை 4:00 கிரிவலம் (14 கி.மீ) மற்றும் அஷ்ட லிங்க தரிசனம். பிற்பகல் 1:00 ஆதி அண்ணாமலை கோவில்." },
          { text: "நாள் 2: பிற்பகல் 3:00 சென்னை திரும்புதல் (செஞ்சி கோட்டை விருப்பம்). இரவு 8:30 சென்னை சேருதல்." }
        ],
        inclusions: ["எரிபொருள் மற்றும் டிரைவர் பேட்டா", "செடான்: ₹7,499", "SUV: ₹9,799", "மாநில வரி உட்பட"]
      },
      arupadaiveedu: {
        title: "அறுபடை வீடு 4 நாட்கள் ஆன்மீக பயணம்",
        duration: "4 நாட்கள் / 3 இரவுகள்",
        price: "தொடக்க விலை ₹21,999",
        itinerary: [
          { text: "நாள் 1: சென்னை ➔ சுவாமிமலை (4ம் படைவீடு). சுவாமிநாதசுவாமி தரிசனம் (தகப்பன் சுவாமி)." },
          { text: "நாள் 2: பழமுதிர்ச்சோலை (6ம் படைவீடு) & திருப்பரங்குன்றம் (1ம் படைவீடு). மதுரை பயணம்." },
          { text: "நாள் 3: திருச்செந்தூர் (2ம் படைவீடு). கடற்கரை கோவில் மற்றும் புனித நீராடல்." },
          { text: "நாள் 4: பழனி (3ம் படைவீடு). ரோப் கார் அல்லது வின்ச் மூலம் மலை தரிசனம். சென்னை திரும்புதல்." }
        ],
        inclusions: ["எரிபொருள் மற்றும் டிரைவர் பேட்டா", "செடான்: ₹21,999", "SUV: ₹30,999", "குறிப்பு: பாரம்பரிய உடை அவசியம்"]
      },
      panchabhoota: {
        title: "பஞ்ச பூத ஸ்தலங்கள் 5 நாட்கள் பயணம்",
        duration: "5 நாட்கள் / 4 இரவுகள்",
        price: "தொடக்க விலை ₹19,500",
        itinerary: [
          { text: "நாள் 1: காஞ்சிபுரம் (நிலம்) - ஏகாம்பரேஸ்வரர்." },
          { text: "நாள் 2: திருவண்ணாமலை (நெருப்பு) - அருணாசலேஸ்வரர்." },
          { text: "நாள் 3: திருச்சி (நீர்) - ஜம்புகேஸ்வரர்." },
          { text: "நாள் 4: சிதம்பரம் (ஆகாயம்) - நடராஜர்." },
          { text: "நாள் 5: காளஹஸ்தி (காற்று) மற்றும் சென்னை திரும்புதல்." }
        ],
        inclusions: ["எரிபொருள் மற்றும் டிரைவர் பேட்டா", "செடான்: ₹19,500", "SUV: ₹26,000", "சுங்கச்சாவடி கட்டணம் தனி"]
      },
      kanchipuram: {
        title: "காஞ்சிபுரம் & மகாபலிபுரம் 1 நாள் பயணம்",
        duration: "1 நாள் (12-14 மணிநேரம்)",
        price: "தொடக்க விலை ₹3,800",
        itinerary: [
          { text: "காலை: காமாட்சி அம்மன் & கைலாசநாதர் கோவில்." },
          { text: "மதியம்: பட்டு சேலை ஷாப்பிங் மற்றும் மதிய உணவு." },
          { text: "மாலை: மகாபலிபுரம் கடற்கரை கோவில் மற்றும் ஐந்து ரதங்கள்." },
          { text: "இரவு: சென்னை திரும்புதல்." }
        ],
        inclusions: ["எரிபொருள்", "டிரைவர் பேட்டா", "செடான்: ₹3,800", "SUV: ₹5,500"]
      },
      mahabalipuram: {
        title: "மகாபலிபுரம் & பாண்டிச்சேரி 2 நாட்கள்",
        duration: "2 நாட்கள் / 1 இரவு",
        price: "தொடக்க விலை ₹5,500",
        itinerary: [
          { text: "நாள் 1: மகாபலிபுரம் சுற்றுலா." },
          { text: "நாள் 1: ஈசிஆர் வழியாக பாண்டிச்சேரி பயணம். கடற்கரை நடை." },
          { text: "நாள் 2: ஆரோவில், பிரஞ்சு காலனி மற்றும் பாரடைஸ் பீச்." },
          { text: "நாள் 2: சென்னை திரும்புதல்." }
        ],
        inclusions: ["எரிபொருள்", "டிரைவர் பேட்டா", "செடான்: ₹5,500", "SUV: ₹7,500"]
      },
      tirupati: {
        title: "சென்னை - திருப்பதி ஒரு நாள் பயணம்",
        duration: "1 நாள்",
        price: "தொடக்க விலை ₹4,500",
        itinerary: [
          { text: "அதிகாலை சென்னையில் இருந்து புறப்படுதல்." },
          { text: "திருமலை பயணம். தரிசனம் (டிக்கெட் பயணிகள் பொறுப்பு)." },
          { text: "திருச்சானூர் பத்மாவதி தாயார் கோவில்." },
          { text: "இரவு சென்னை திரும்புதல்." }
        ],
        inclusions: ["எரிபொருள்", "டிரைவர் பேட்டா", "ஆந்திர மாநில வரி தனி", "செடான்: ₹4,500", "SUV: ₹6,000"]
      },
      pondicherry: {
        title: "பாண்டிச்சேரி 3 நாட்கள் உலா",
        duration: "3 நாட்கள் / 2 இரவுகள்",
        price: "தொடக்க விலை ₹7,500",
        itinerary: [
          { text: "நாள் 1: பாண்டிச்சேரி வருகை மற்றும் ப்ரோமினேட் கடற்கரை." },
          { text: "நாள் 2: ஆரோவில் மற்றும் பிரஞ்சு காலனி." },
          { text: "நாள் 3: சுண்ணம்பார் படகு சவாரி மற்றும் சென்னை திரும்புதல்." }
        ],
        inclusions: ["எரிபொருள்", "டிரைவர் பேட்டா", "செடான்: ₹7,500", "SUV: ₹9,800"]
      }
    },
    packageForm: {
      title: "விவரம் பெற",
      name: "பெயர்",
      phone: "தொலைபேசி எண்",
      date: "பயண தேதி",
      submit: "அனுப்பவும்"
    }
  },
  hi: {
    brand: "जीवी ट्रेवल्स",
    subBrand: "तमिलनाडु टैक्सी टूर्स",
    nav: {
      home: "होम",
      packages: "टूर पैकेज",
      fleet: "गाड़ियाँ",
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
      subtitle: "तमिलनाडु में प्रीमियम आउटस्टेशन और लोकल कैब बुकिंग सेवा। फिक्स्ड प्राइसिंग और प्रोफेशनल ड्राइवर।",
      bookNow: "अभी बुक करें",
      chat: "चैट करें"
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
      subtitle: "తమిళనాడులో ప్రీమియం అవుట్‌స్టేషన్ మరియు లోకల్ క్యాబ్ బుకింగ్ సేవ. ఫిక్స్‌డ్ ధర మరియు ప్రొఫెషనల్ డ్రైవర్లు.",
      bookNow: "ఇప్పుడే బుక్ చేయండి",
      chat: "చాట్ చేయండి"
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
      subtitle: "ತಮಿಳುನಾಡಿನಲ್ಲಿ ಪ್ರೀಮಿಯಂ ಔಟ್‌ಸ್ಟೇಷನ್ ಮತ್ತು ಲೋಕಲ್ ಕ್ಯಾಬ್ ಬುಕಿಂಗ್ ಸೇವೆ. ನಿಗದಿತ ದರ ಮತ್ತು ವೃತ್ತಿಪರ ಚಾಲಕರು.",
      bookNow: "ಈಗಲೇ ಬುಕ್ ಮಾಡಿ",
      chat: "ಚಾಟ್ ಮಾಡಿ"
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
        title: "ಚೆನ್ನೈನಿಂದ ತಿರುವಣ್ಣಾಮಲೈ 2 ದಿನಗಳ ಯಾತ್ರೆ",
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
