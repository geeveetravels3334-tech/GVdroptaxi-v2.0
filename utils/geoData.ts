import locationsJson from '../src/data/locations.json';
import routeMatrixJson from '../src/data/routeMatrix.json';

export interface OfflineCity {
  name: string;
  tamilName: string;
  coords: [number, number];
  synonyms: string[];
  region: string;
  isHillStation?: boolean;
}

export const OFFLINE_CITIES_DATABASE: OfflineCity[] = (locationsJson as any[]).map(loc => ({
  name: loc.name,
  tamilName: loc.tamilName,
  coords: [loc.latitude, loc.longitude],
  synonyms: loc.synonyms || [],
  region: `${loc.district}, ${loc.state}`,
  isHillStation: !!loc.isHillStation
}));

const OLD_OFFLINE_CITIES_DATABASE: any[] = [
  // TAMIL NADU
  { 
    name: 'Chennai', 
    tamilName: 'சென்னை', 
    coords: [13.0827, 80.2707], 
    synonyms: ['madras', 'mas', 'chennai airport', 'central', 'egmore', 'sholinganallur', 'omr', 'guindy', 'velachery', 'porur', 'chen', 'chenn'], 
    region: 'Tamil Nadu, India' 
  },
  { 
    name: 'Tambaram', 
    tamilName: 'தாம்பரம்', 
    coords: [12.9238, 80.1171], 
    synonyms: ['mepz', 'chennai suburbs', 'tambaram railway station', 'tam', 'tamb'], 
    region: 'Chennai Suburbs, Tamil Nadu' 
  },
  { 
    name: 'Chengalpattu', 
    tamilName: 'செங்கல்பட்டு', 
    coords: [12.6825, 79.9864], 
    synonyms: ['cgl', 'chengalpet', 'chengalpattu junction', 'cheng'], 
    region: 'Tamil Nadu, India' 
  },
  { 
    name: 'Tindivanam', 
    tamilName: 'திண்டிவனம்', 
    coords: [12.2359, 79.6502], 
    synonyms: ['tindi', 'tvm', 'tindivanam toll', 'tind'], 
    region: 'Tamil Nadu, India' 
  },
  { 
    name: 'Villupuram', 
    tamilName: 'விழுப்புரம்', 
    coords: [11.9401, 79.4861], 
    synonyms: ['vpm', 'villupuram junction', 'vilu', 'vill'], 
    region: 'Tamil Nadu, India' 
  },
  { 
    name: 'Ulundurpet', 
    tamilName: 'உளுந்தூர்பேட்டை', 
    coords: [11.6853, 79.2882], 
    synonyms: ['ult', 'ulundurpettai', 'ulund'], 
    region: 'Tamil Nadu, India' 
  },
  { 
    name: 'Cuddalore', 
    tamilName: 'கடலூர்', 
    coords: [11.7480, 79.7714], 
    synonyms: ['cud', 'cuddalore port', 'silver beach', 'cudd'], 
    region: 'Tamil Nadu, India' 
  },
  { 
    name: 'Pondicherry', 
    tamilName: 'பாண்டிச்சேரி', 
    coords: [11.9416, 79.8083], 
    synonyms: ['puducherry', 'pondy', 'white town', 'auroville', 'pandi', 'pond', 'pondi'], 
    region: 'Puducherry, India' 
  },
  { 
    name: 'Tiruchirappalli', 
    tamilName: 'திருச்சிராப்பள்ளி', 
    coords: [10.7905, 78.7047], 
    synonyms: ['trichy', 'trz', 'chatram', 'rockfort', 'trichy airport', 'tiru', 'tiruchy', 'tiruc'], 
    region: 'Tamil Nadu, India' 
  },
  { 
    name: 'Madurai', 
    tamilName: 'மதுரை', 
    coords: [9.9252, 78.1198], 
    synonyms: ['temple city', 'ixm', 'mattuthavani', 'periyar', 'madurai airport', 'mad', 'mdu'], 
    region: 'Tamil Nadu, India' 
  },
  { 
    name: 'Coimbatore', 
    tamilName: 'கோயம்புத்தூர்', 
    coords: [11.0168, 76.9558], 
    synonyms: ['kovai', 'cbe', 'gandhipuram', 'peelamedu', 'singanallur', 'coimbatore airport', 'coim', 'coimb'], 
    region: 'Tamil Nadu, India' 
  },
  { 
    name: 'Salem', 
    tamilName: 'சேலம்', 
    coords: [11.6643, 78.1460], 
    synonyms: ['steel city', 'shevaroys', 'yercaud foothills', 'sal'], 
    region: 'Tamil Nadu, India' 
  },
  { 
    name: 'Erode', 
    tamilName: 'ஈரோடு', 
    coords: [11.3410, 77.7172], 
    synonyms: ['turmeric city', 'texvalley', 'ero'], 
    region: 'Tamil Nadu, India' 
  },
  { 
    name: 'Namakkal', 
    tamilName: 'நாமக்கல்', 
    coords: [11.2189, 78.1674], 
    synonyms: ['poultry town', 'namakkal fort', 'nam', 'nama'], 
    region: 'Tamil Nadu, India' 
  },
  { 
    name: 'Karur', 
    tamilName: 'கரூர்', 
    coords: [10.9601, 78.0766], 
    synonyms: ['textile city', 'karur junction', 'kar'], 
    region: 'Tamil Nadu, India' 
  },
  { 
    name: 'Thoothukudi', 
    tamilName: 'தூத்துக்குடி', 
    coords: [8.7642, 78.1348], 
    synonyms: ['tuticorin', 'pearl city', 'port city', 'thoo', 'thoothu'], 
    region: 'Tamil Nadu, India' 
  },
  { 
    name: 'Tirunelveli', 
    tamilName: 'திருநெல்வேலி', 
    coords: [8.7139, 77.7567], 
    synonyms: ['nellai', 'halwa city', 'palayamkottai', 'tiru', 'tirun', 'nel'], 
    region: 'Tamil Nadu, India' 
  },
  { 
    name: 'Kanyakumari', 
    tamilName: 'கன்னியாகுமரி', 
    coords: [8.0883, 77.5385], 
    synonyms: ['cape comorin', 'sun rise point', 'vivekananda rock', 'kan', 'kanya'], 
    region: 'Tamil Nadu, India' 
  },
  { 
    name: 'Nagercoil', 
    tamilName: 'நாகர்கோவில்', 
    coords: [8.1830, 77.4119], 
    synonyms: ['kanyakumari district', 'cape route', 'nag', 'nagerc'], 
    region: 'Tamil Nadu, India' 
  },
  { 
    name: 'Pollachi', 
    tamilName: 'பொள்ளாச்சி', 
    coords: [10.6589, 77.0094], 
    synonyms: ['coconut city', 'pollachi junction', 'pol', 'polla'], 
    region: 'Tamil Nadu, India' 
  },
  { 
    name: 'Ooty', 
    tamilName: 'ஊட்டி', 
    coords: [11.4102, 76.6950], 
    synonyms: ['udhamandalam', 'queen of hills', 'nilgiris', 'ooti', 'ooty hill', 'oot_y'], 
    region: 'Tamil Nadu, India',
    isHillStation: true 
  },
  { 
    name: 'Kodaikanal', 
    tamilName: 'கொடைக்கானல்', 
    coords: [10.2381, 77.4892], 
    synonyms: ['kodai', 'princess of hills', 'koda', 'kodai hill'], 
    region: 'Tamil Nadu, India',
    isHillStation: true 
  },
  { 
    name: 'Yercaud', 
    tamilName: 'ஏற்காடு', 
    coords: [11.7758, 78.2093], 
    synonyms: ['poor mans ooty', 'shevaroys hill', 'yer', 'yerc'], 
    region: 'Tamil Nadu, India',
    isHillStation: true 
  },
  { 
    name: 'Velankanni', 
    tamilName: 'வேளாங்கண்ணி', 
    coords: [10.6796, 79.8424], 
    synonyms: ['shrine basilica', 'our lady of health', 'vel', 'velan'], 
    region: 'Tamil Nadu, India' 
  },
  { 
    name: 'Nagapattinam', 
    tamilName: 'நாகப்பட்டினம்', 
    coords: [10.7656, 79.8424], 
    synonyms: ['nagai', 'port town', 'naga'], 
    region: 'Tamil Nadu, India' 
  },
  { 
    name: 'Mayiladuthurai', 
    tamilName: 'மயிலாடுதுறை', 
    coords: [11.1018, 79.6522], 
    synonyms: ['mayuram', 'mayavaram', 'mayi', 'may'], 
    region: 'Tamil Nadu, India' 
  },
  { 
    name: 'Sirkazhi', 
    tamilName: 'சீர்காழி', 
    coords: [11.2382, 79.7346], 
    synonyms: ['sirkali', 'temple village', 'sir', 'sirk'], 
    region: 'Tamil Nadu, India' 
  },
  { 
    name: 'Thanjavur', 
    tamilName: 'தஞ்சாவூர்', 
    coords: [10.7870, 79.1378], 
    synonyms: ['tanjore', 'big temple', 'brihadeeswarar', 'than', 'thanj'], 
    region: 'Tamil Nadu, India' 
  },
  { 
    name: 'Kumbakonam', 
    tamilName: 'கும்பகோணம்', 
    coords: [10.9617, 79.3881], 
    synonyms: ['temple town', 'mahamaham', 'kum', 'kumba'], 
    region: 'Tamil Nadu, India' 
  },
  { 
    name: 'Chidambaram', 
    tamilName: 'சிதம்பரம்', 
    coords: [11.3996, 79.6936], 
    synonyms: ['nat封装temple', 'annamalainagar', 'chid', 'chida'], 
    region: 'Tamil Nadu, India' 
  },
  { 
    name: 'Tiruvannamalai', 
    tamilName: 'திருவண்ணாமலை', 
    coords: [12.2253, 79.0747], 
    synonyms: ['arunachala', 'girivalam', 'deepam', 'tiru', 'tiruv', 'tiruvan'], 
    region: 'Tamil Nadu, India' 
  },
  { 
    name: 'Vellore', 
    tamilName: 'வேலூர்', 
    coords: [12.9165, 79.1325], 
    synonyms: ['cmc', 'katpadi', 'vellore fort', 'vel', 'vell'], 
    region: 'Tamil Nadu, India' 
  },
  { 
    name: 'Hosur', 
    tamilName: 'ஓசூர்', 
    coords: [12.7409, 77.8253], 
    synonyms: ['border town', 'industrial city', 'sipcot', 'hos'], 
    region: 'Tamil Nadu, India' 
  },
  { 
    name: 'Krishnagiri', 
    tamilName: 'கிருஷ்ணகிரி', 
    coords: [12.5186, 78.2137], 
    synonyms: ['mango city', 'krishnagiri dam', 'krish', 'kris'], 
    region: 'Tamil Nadu, India' 
  },
  { 
    name: 'Dharmapuri', 
    tamilName: 'தர்மபுரி', 
    coords: [12.1353, 78.1576], 
    synonyms: ['hogenakkal route', 'dhar', 'dharm'], 
    region: 'Tamil Nadu, India' 
  },
  { 
    name: 'Dindigul', 
    tamilName: 'திண்டுக்கல்', 
    coords: [10.3673, 77.9803], 
    synonyms: ['biryani city', 'lock city', 'din', 'dind'], 
    region: 'Tamil Nadu, India' 
  },
  { 
    name: 'Virudhunagar', 
    tamilName: 'விருதுநகர்', 
    coords: [9.5680, 77.9624], 
    synonyms: ['vnr', 'business hub', 'vir', 'viru'], 
    region: 'Tamil Nadu, India' 
  },
  { 
    name: 'Tenkasi', 
    tamilName: 'தென்காசி', 
    coords: [8.9592, 77.3150], 
    synonyms: ['courtallam falls', 'tenkasi junction', 'ten', 'tenk'], 
    region: 'Tamil Nadu, India' 
  },
  { 
    name: 'Sankarankovil', 
    tamilName: 'சங்கரன்கோவில்', 
    coords: [9.1713, 77.5332], 
    synonyms: ['temple town', 'sankaranainar koil', 'sank', 'sankar'], 
    region: 'Tamil Nadu, India' 
  },
  { 
    name: 'Marthandam', 
    tamilName: 'மார்த்தாண்டம்', 
    coords: [8.3039, 77.2215], 
    synonyms: ['border market town', 'martandam', 'mar', 'mart'], 
    region: 'Tamil Nadu, India' 
  },
  { 
    name: 'Tiruchendur', 
    tamilName: 'திருச்செந்தூர்', 
    coords: [8.4900, 78.1200], 
    synonyms: ['murugan temple beach', 'tiru', 'tiruc', 'tiruches'], 
    region: 'Tamil Nadu, India' 
  },
  { 
    name: 'Ariyalur', 
    tamilName: 'அரியலூர்', 
    coords: [11.1401, 79.0786], 
    synonyms: ['cement city', 'ari', 'ariy'], 
    region: 'Tamil Nadu, India' 
  },
  { 
    name: 'Perambalur', 
    tamilName: 'பெரம்பலூர்', 
    coords: [11.2342, 78.8836], 
    synonyms: ['onion farming city', 'per', 'peram'], 
    region: 'Tamil Nadu, India' 
  },
  { 
    name: 'Valasaravakkam', 
    tamilName: 'வளசரவாக்கம்', 
    coords: [13.0382, 80.1770], 
    synonyms: ['kk nagar transit', 'chennai west', 'va', 'valas', 'val'], 
    region: 'Chennai Hub, India' 
  },
  { 
    name: 'Koyambedu', 
    tamilName: 'கோயம்பேடு', 
    coords: [13.0694, 80.1948], 
    synonyms: ['cmbt', 'koyambedu market', 'chennai bus terminal', 'koy', 'koyam'], 
    region: 'Chennai Hub, India' 
  },
  { 
    name: 'Mahabalipuram', 
    tamilName: 'மகாபலிபுரம்', 
    coords: [12.6208, 80.1945], 
    synonyms: ['mamallapuram', 'shore temple', 'five rathas', 'maha', 'mahab'], 
    region: 'Tamil Nadu, India' 
  },
  { 
    name: 'Rameswaram', 
    tamilName: 'ராமேஸ்வரம்', 
    coords: [9.2876, 79.3129], 
    synonyms: ['rameshwaram', 'pamban bidge', 'holy island', 'ram', 'rames'], 
    region: 'Tamil Nadu, India' 
  },

  // KERALA
  { 
    name: 'Kochi', 
    tamilName: 'கொச்சி', 
    coords: [9.9312, 76.2673], 
    synonyms: ['cochin', 'ernakulam', 'infopark', 'fort kochi', 'koc'], 
    region: 'Kerala, India' 
  },
  { 
    name: 'Munnar', 
    tamilName: 'மூணார்', 
    coords: [10.0889, 77.0595], 
    synonyms: ['mun', 'munn', 'tea estates', 'kerala hill station'], 
    region: 'Kerala, India', 
    isHillStation: true 
  },
  { 
    name: 'Alleppey', 
    tamilName: 'ஆலப்புழை', 
    coords: [9.4981, 76.3388], 
    synonyms: ['alappuzha', 'backwaters houseboats', 'all', 'allep'], 
    region: 'Kerala, India' 
  },
  { 
    name: 'Palakkad', 
    tamilName: 'பாலக்காடு', 
    coords: [10.7867, 76.6547], 
    synonyms: ['palghat', 'pal', 'pala'], 
    region: 'Kerala, India' 
  },
  { 
    name: 'Thrissur', 
    tamilName: 'திருச்சூர்', 
    coords: [10.5276, 76.2144], 
    synonyms: ['trichur', 'cultural capital', 'thr', 'thri'], 
    region: 'Kerala, India' 
  },
  { 
    name: 'Kollam', 
    tamilName: 'கொல்லம்', 
    coords: [8.8932, 76.6141], 
    synonyms: ['quilon', 'cashew hub', 'kol', 'koll'], 
    region: 'Kerala, India' 
  },
  { 
    name: 'Trivandrum', 
    tamilName: 'திருவனந்தபுரம்', 
    coords: [8.5241, 76.9366], 
    synonyms: ['thiruvananthapuram', 'capital city', 'tri', 'triv'], 
    region: 'Kerala, India' 
  },
  { 
    name: 'Wayanad', 
    tamilName: 'வயநாடு', 
    coords: [11.6854, 76.1320], 
    synonyms: ['way', 'waya', 'kalpetta hill station'], 
    region: 'Kerala, India', 
    isHillStation: true 
  },
  { 
    name: 'Thekkady', 
    tamilName: 'தேக்கடி', 
    coords: [9.6031, 77.1614], 
    synonyms: ['periyar wildlife sanctuary', 'thek', 'kumily'], 
    region: 'Kerala, India', 
    isHillStation: true 
  },
  { 
    name: 'Vagamon', 
    tamilName: 'வாகமண்', 
    coords: [9.6894, 76.9042], 
    synonyms: ['vagamon pine forest', 'misty hills', 'vag', 'vaga'], 
    region: 'Kerala, India', 
    isHillStation: true 
  },
  { 
    name: 'Kumarakom', 
    tamilName: 'குமரகம்', 
    coords: [9.5928, 76.4227], 
    synonyms: ['vembanad lakehouseboats', 'kum', 'kumar'], 
    region: 'Kerala, India' 
  },
  { 
    name: 'Kozhikode', 
    tamilName: 'கோழிக்கோடு', 
    coords: [11.2588, 75.7804], 
    synonyms: ['calicut', 'sweetmeat street', 'koz', 'kozh'], 
    region: 'Kerala, India' 
  },

  // KARNATAKA
  { 
    name: 'Bangalore', 
    tamilName: 'பெங்களூர்', 
    coords: [12.9716, 77.5946], 
    synonyms: ['bengaluru', 'blr', 'bangalore airport', 'majestic', 'whitefield', 'indiranagar', 'hsr layout', 'electronic city', 'bang', 'bng', 'ben', 'beng'], 
    region: 'Karnataka, India' 
  },
  { 
    name: 'Mysore', 
    tamilName: 'மைசூர்', 
    coords: [12.2958, 76.6394], 
    synonyms: ['mysuru', 'mysore palace', 'mys', 'myso'], 
    region: 'Karnataka, India' 
  },
  { 
    name: 'Coorg', 
    tamilName: 'குடகு', 
    coords: [12.4244, 75.7382], 
    synonyms: ['madikeri', 'kodagu', 'coo', 'coor', 'coffee country'], 
    region: 'Karnataka, India', 
    isHillStation: true 
  },
  { 
    name: 'Mangalore', 
    tamilName: 'மங்களூர்', 
    coords: [12.9141, 74.8560], 
    synonyms: ['mangaluru', 'mlr', 'port city', 'man', 'mang'], 
    region: 'Karnataka, India' 
  },
  { 
    name: 'Chikmagalur', 
    tamilName: 'சிக்கமகளூர்', 
    coords: [13.3153, 75.7754], 
    synonyms: ['chickmagalur', 'chi', 'chik', 'mullayanagiri'], 
    region: 'Karnataka, India', 
    isHillStation: true 
  },
  { 
    name: 'Udupi', 
    tamilName: 'உடுப்பி', 
    coords: [13.3409, 74.7421], 
    synonyms: ['manipal', 'krishna temple', 'udu', 'udup'], 
    region: 'Karnataka, India' 
  },

  // ANDHRA PRADESH
  { 
    name: 'Tirupati', 
    tamilName: 'திருப்பதி', 
    coords: [13.6288, 79.4192], 
    synonyms: ['tirumala', 'balaji temple', 'andhra hill shrine', 'tiru', 'tiru', 'tirup'], 
    region: 'Andhra Pradesh, India' 
  },
  { 
    name: 'Nellore', 
    tamilName: 'நெல்லூர்', 
    coords: [14.4426, 79.9865], 
    synonyms: ['pennar river bank', 'nel', 'nell'], 
    region: 'Andhra Pradesh, India' 
  },
  { 
    name: 'Chittoor', 
    tamilName: 'சித்தூர்', 
    coords: [13.2172, 79.1003], 
    synonyms: ['andhra border town', 'ctr', 'chi', 'chit'], 
    region: 'Andhra Pradesh, India' 
  },
  { 
    name: 'Vijayawada', 
    tamilName: 'விஜயவாடா', 
    coords: [16.5062, 80.6480], 
    synonyms: ['bezawada', 'andhra core', 'vij', 'vija'], 
    region: 'Andhra Pradesh, India' 
  }
];

// Matrix of EXACT, verified outstation highway kilometer pairings.
const ROUTE_KM_EXACT: Record<string, number> = routeMatrixJson;

/**
 * Normalizes place names for precise key pairing.
 */
const getRouteKey = (cityA: string, cityB: string): string => {
  const normA = cityA.toLowerCase().trim();
  const normB = cityB.toLowerCase().trim();
  return `${normA}-${normB}`;
};

/**
 * Smart Typo Tolerant/Phonetic Suggestion Query Parser
 */
export const searchOfflineSuggestions = (query: string): OfflineCity[] => {
  const norm = query.toLowerCase().trim();
  if (!norm) return OFFLINE_CITIES_DATABASE.slice(0, 15);

  const scoredList = OFFLINE_CITIES_DATABASE.map(city => {
    const eng = city.name.toLowerCase();
    const tam = city.tamilName;
    let score = 0;

    // Full literal matches
    if (eng === norm || tam === norm) {
      score = 100;
    } 
    // Starts-with prefixes
    else if (eng.startsWith(norm) || tam.startsWith(norm)) {
      score = 90;
    }
    // Starts-with on synonyms
    else if (city.synonyms.some(syn => syn === norm)) {
      score = 85;
    }
    else if (city.synonyms.some(syn => syn.startsWith(norm))) {
      score = 80;
    }
    // Deep substring matching
    else if (eng.includes(norm) || tam.includes(norm)) {
      score = 70;
    }
    else if (city.synonyms.some(syn => syn.includes(norm))) {
      score = 50;
    }
    
    // Typo/Phonetic tolerance mappings (e.g. ooti -> ooty)
    if (score === 0) {
      // Allow single character substitution or swap checking
      if (eng === 'ooty' && norm === 'ooti') score = 95;
      if (eng === 'pondicherry' && norm.startsWith('pandi')) score = 95;
      if (eng === 'pondicherry' && norm.startsWith('pondy')) score = 95;
      if (eng === 'tirupati' && norm.startsWith('tiru')) score = 85;
      if (eng === 'tirunelveli' && norm.startsWith('tiru')) score = 80;
      if (eng === 'tiruvannamalai' && norm.startsWith('tiru')) score = 80;
      if (eng === 'velankanni' && norm.startsWith('vel')) score = 85;
      if (eng === 'vellore' && norm.startsWith('vel')) score = 85;
      if (eng === 'valasaravakkam' && norm.startsWith('va')) score = 85;
      if (eng === 'koyambedu' && norm.startsWith('koy')) score = 85;
    }

    return { city, score };
  });

  return scoredList
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.city);
};

/**
 * Calculate offline distance utilizing optimized coordinates & Haversine formula
 */
export const calculateOfflineDistance = (
  cityAName: string,
  cityBName: string,
  coordsA?: [number, number] | null,
  coordsB?: [number, number] | null
): { distance: number; durationText: string; distanceText: string; hasHills: boolean } => {
  const normA = cityAName.toLowerCase().trim();
  const normB = cityBName.toLowerCase().trim();
  
  // Determine if it is a high altitude/scenic mountain course
  const isHillStationTrip = OFFLINE_CITIES_DATABASE.some(city => 
    (city.name.toLowerCase() === normA || city.name.toLowerCase() === normB || city.tamilName === normA || city.tamilName === normB) && city.isHillStation
  );

  // 1. Check direct exact matrix match
  const rawKey = getRouteKey(normA, normB);
  const revKey = getRouteKey(normB, normA);
  
  const m1 = ROUTE_KM_EXACT[rawKey] || ROUTE_KM_EXACT[revKey];
  if (m1) {
    const avgSpeed = isHillStationTrip ? 32 : 55;
    const hours = Math.floor(m1 / avgSpeed);
    const mins = Math.round(((m1 / avgSpeed) - hours) * 60);
    return {
      distance: m1,
      distanceText: `${m1} KM`,
      durationText: `${hours > 0 ? `${hours}h ` : ''}${mins > 0 ? `${mins}m` : '0m'}`,
      hasHills: isHillStationTrip
    };
  }

  // 2. Fetch coordinates from offline catalog if missing
  let lat1 = coordsA ? coordsA[0] : 0;
  let lon1 = coordsA ? coordsA[1] : 0;
  let lat2 = coordsB ? coordsB[0] : 0;
  let lon2 = coordsB ? coordsB[1] : 0;

  if (!lat1 || !lon1) {
    const matchA = OFFLINE_CITIES_DATABASE.find(c => 
      c.name.toLowerCase() === normA || c.tamilName === normA
    );
    if (matchA) {
      lat1 = matchA.coords[0];
      lon1 = matchA.coords[1];
    }
  }

  if (!lat2 || !lon2) {
    const matchB = OFFLINE_CITIES_DATABASE.find(c => 
      c.name.toLowerCase() === normB || c.tamilName === normB
    );
    if (matchB) {
      lat2 = matchB.coords[0];
      lon2 = matchB.coords[1];
    }
  }

  // If coordinates are missing, fallback to standard 150 KM manual estimate
  if (!lat1 || !lon1 || !lat2 || !lon2) {
    return {
      distance: 150,
      distanceText: `150 KM (Est.)`,
      durationText: '3h 15m',
      hasHills: isHillStationTrip
    };
  }

  // 3. Compute Haversine Geodesic Distance
  const R = 6371; // Earth's Radius
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const rawDistance = R * c;

  // South Indian Highway Curve Factor estimation (Typically 25-30% additional path buffer)
  let curveRatio = 1.28;

  if (isHillStationTrip) {
    curveRatio = 1.45; // Steep mountain curves increase the actual route kilometers
  }

  const drivingEstDistance = Math.max(15, Math.round(rawDistance * curveRatio));
  const avgSpeed = isHillStationTrip ? 32 : 55; // Slower average speeds for mountain roads
  const hours = Math.floor(drivingEstDistance / avgSpeed);
  const mins = Math.round(((drivingEstDistance / avgSpeed) - hours) * 60);

  return {
    distance: drivingEstDistance,
    distanceText: `${drivingEstDistance} KM`,
    durationText: `${hours > 0 ? `${hours}h ` : ''}${mins > 0 ? `${mins}m` : '0m'}`,
    hasHills: isHillStationTrip
  };
};

/**
 * Premium Outstation / Tour Premium Fare Estimation Engine
 * Calculates fare estimates, toll, driver batta, hill charges, night charges
 * Output: Detailed breakdown plus Range matching the requested 'Estimated Fare Range' like ₹3,500 - ₹4,000
 */
export interface FareBreakdownOffline {
  baseFare: number;
  driverBatta: number;
  tollEstimate: number;
  hillCharges: number;
  nightCharges: number;
  minTotal: number;
  maxTotal: number;
  rangeDisplay: string;
  kmsUsed: number;
  breakdownString: string;
}

export const estimatePremiumOfflineFareByVehicle = (
  distanceKm: number,
  isRoundTrip: boolean,
  vehicleType: string,
  travelDate?: string
): FareBreakdownOffline => {
  // Vehicle classification matching actual database
  let ratePerKm = 14;
  let battaPerDay = 500;
  let label = vehicleType;

  const tag = vehicleType.toLowerCase();
  
  if (tag.includes('mini') || tag.includes('wagon')) {
    ratePerKm = isRoundTrip ? 14 : 15;
    battaPerDay = 400;
    label = 'Mini (WagonR)';
  } else if (tag.includes('sedan') || tag.includes('dzire')) {
    ratePerKm = isRoundTrip ? 14 : 15;
    battaPerDay = 500;
    label = 'Sedan (Dzire)';
  } else if (tag.includes('etios')) {
    ratePerKm = isRoundTrip ? 15 : 16;
    battaPerDay = 500;
    label = 'Etios Sedan';
  } else if (tag.includes('innova-crysta') || tag.includes('crysta')) {
    ratePerKm = 24; // Round trip default
    battaPerDay = 700;
    label = 'Innova Crysta';
  } else if (tag.includes('innova')) {
    ratePerKm = isRoundTrip ? 20 : 22;
    battaPerDay = 600;
    label = 'Premium Innova';
  } else if (tag.includes('suv') || tag.includes('ertiga') || tag.includes('xylo')) {
    ratePerKm = isRoundTrip ? 19 : 21;
    battaPerDay = 500;
    label = 'SUV (Ertiga/Xylo)';
  } else if (tag.includes('tempo') || tag.includes('traveller')) {
    ratePerKm = 26; // Luxury Tempo
    battaPerDay = 800;
    label = 'Tempo Traveller';
  }

  // Adjust distance depending on rules
  const kmsToBill = isRoundTrip 
    ? Math.max(distanceKm * 2, 250) // Roundtrip min 250KM
    : Math.max(distanceKm, 130);   // Oneway min 130KM

  const baseFare = Math.round(kmsToBill * ratePerKm);
  
  // Estimates
  const totalDays = isRoundTrip ? Math.max(1, Math.ceil(kmsToBill / 300)) : 1;
  const driverBatta = battaPerDay * totalDays;

  // Approximate tolls: ₹100 per 100 KM
  const tollEstimate = Math.round((kmsToBill / 100) * 85);

  // Hill Station Charge if distance implies high-terrain
  let hillCharges = 0;
  if (distanceKm > 60) {
    hillCharges = 350; // Flat hill road handling guard estimate
  }

  // Night Charges
  const nightCharges = 150 * totalDays;

  // Minimum & Maximum estimated boundaries for the fare range
  // Adds 8-15% fluctuation ranges for client guidance
  const minTotal = baseFare + driverBatta + tollEstimate + hillCharges + nightCharges;
  
  // Apply visual buffer rounding to 50s
  const roundedMin = Math.round(minTotal / 50) * 50;
  const roundedMax = Math.round((minTotal * 1.15) / 50) * 50;

  const rangeDisplay = `₹${roundedMin.toLocaleString('en-IN')} - ₹${roundedMax.toLocaleString('en-IN')}`;

  const breakdownString = `${kmsToBill} KM total (Min applied) x ₹${ratePerKm}/KM = ₹${baseFare}. ` +
    `Driver Batta (Extra) ₹${driverBatta}, Toll Estimated ₹${tollEstimate}, Night/Hill Estimate ₹${hillCharges + nightCharges}.`;

  return {
    baseFare,
    driverBatta,
    tollEstimate,
    hillCharges,
    nightCharges,
    minTotal: roundedMin,
    maxTotal: roundedMax,
    rangeDisplay,
    kmsUsed: kmsToBill,
    breakdownString
  };
};
