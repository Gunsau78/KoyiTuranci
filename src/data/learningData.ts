/**
 * Curriculum & Vocabulary Data for Hausa Speakers Learning English.
 * Tailored with Hausa phonetics, practical cultural contexts, and common pitfalls.
 */

export interface VocabWord {
  id: string;
  english: string;
  hausa: string;
  phonetic: string; // Phonetic guide for Hausa speakers (e.g. "WAH-tuh")
  category: string;
  partOfSpeech: 'Suna (Noun)' | 'Fi\'ili (Verb)' | 'Sifa (Adj)' | 'Gaisuwa (Greeting)' | 'Kalmar Haɗi (Other)';
  exampleEn: string;
  exampleHa: string;
  hausaTip?: string; // Cultural or pronunciation tip in Hausa
  difficulty: 'fari' | 'matsakaici' | 'gwani'; // beginner, intermediate, advanced
}

export interface Category {
  id: string;
  titleHa: string;
  titleEn: string;
  icon: string;
  descriptionHa: string;
  color: string;
}

export interface SentenceChallenge {
  id: string;
  hausaPrompt: string;
  englishAnswer: string[];
  options: string[]; // Scrambled options including distractors
  hintHa: string;
  grammarNoteHa: string;
}

export interface PronunciationTopic {
  id: string;
  titleHa: string;
  titleEn: string;
  summaryHa: string;
  descriptionHa: string;
  practiceWords: { en: string; ha: string; soundFocus: string }[];
  audioSample: string;
}

export interface PracticalPhrase {
  id: string;
  english: string;
  hausa: string;
  contextHa: string;
  category: string;
}

export const CATEGORIES: Category[] = [
  {
    id: 'greetings',
    titleHa: 'Gaisuwa & Sadarwa',
    titleEn: 'Greetings & Communication',
    icon: 'Handshake',
    descriptionHa: 'Yadda ake gaisawa, gabatar da kai, da yin bankwana da Turanci.',
    color: 'emerald',
  },
  {
    id: 'market',
    titleHa: 'Kasuwa & Siyayya',
    titleEn: 'Market & Shopping',
    icon: 'ShoppingBag',
    descriptionHa: 'Tambayar farashi, ciniki, biyan kuɗi, da neman kaya.',
    color: 'amber',
  },
  {
    id: 'work',
    titleHa: 'Aiki & Sana\'a',
    titleEn: 'Work & Business',
    icon: 'Briefcase',
    descriptionHa: 'Kalmomin ofis, sana\'ar hannu, neman aiki, da tattaunawa.',
    color: 'blue',
  },
  {
    id: 'food',
    titleHa: 'Abinci & Sha',
    titleEn: 'Food & Dining',
    icon: 'Utensils',
    descriptionHa: "Sunayen abinci, 'ya'yan itace, girki, da oda a gidan abinci.",
    color: 'rose',
  },
  {
    id: 'family',
    titleHa: 'Iyali & Dangantaka',
    titleEn: 'Family & Home',
    icon: 'Users',
    descriptionHa: "Sunayen 'yan uwa, iyaye, abokai, da rayuwar gida.",
    color: 'indigo',
  },
  {
    id: 'health',
    titleHa: 'Lafiya & Asibiti',
    titleEn: 'Health & Hospital',
    icon: 'HeartPulse',
    descriptionHa: 'Bayyana ciwo, magunguna, likita, da kiran agaji.',
    color: 'teal',
  },
  {
    id: 'travel',
    titleHa: 'Tafiya & Sufuri',
    titleEn: 'Travel & Directions',
    icon: 'Navigation',
    descriptionHa: 'Neman hanya, mota, tashar jirgi, da tuki a titi.',
    color: 'purple',
  },
  {
    id: 'education',
    titleHa: 'Karatu & Lambobi',
    titleEn: 'School & Numbers',
    icon: 'GraduationCap',
    descriptionHa: 'Karatu, rubutu, kwanakin mako, da lissafi.',
    color: 'cyan',
  },
];

export const VOCABULARY_LIST: VocabWord[] = [
  // Greetings
  {
    id: 'v1',
    english: 'Good morning',
    hausa: 'Ina kwana / Barka da asuba',
    phonetic: 'Gud MOR-ning',
    category: 'greetings',
    partOfSpeech: 'Gaisuwa (Greeting)',
    exampleEn: 'Good morning, how are you today?',
    exampleHa: 'Ina kwana, yaya kake yau?',
    hausaTip: 'A Turanci ana amfani da "Good morning" har zuwa karfe 12 na rana.',
    difficulty: 'fari',
  },
  {
    id: 'v2',
    english: 'Please',
    hausa: 'Don Allah / Don girman Allah',
    phonetic: 'Pleez',
    category: 'greetings',
    partOfSpeech: 'Gaisuwa (Greeting)',
    exampleEn: 'Please, help me with this bag.',
    exampleHa: 'Don Allah, taimake ni da wannan jakar.',
    hausaTip: 'Amfani da "Please" yana nuna ladabi da mutuntawa sosai.',
    difficulty: 'fari',
  },
  {
    id: 'v3',
    english: 'Thank you',
    hausa: 'Na gode / Mun gode',
    phonetic: 'Thank yoo',
    category: 'greetings',
    partOfSpeech: 'Gaisuwa (Greeting)',
    exampleEn: 'Thank you very much for your kindness.',
    exampleHa: 'Na gode kwarai da karamcin ka.',
    hausaTip: 'Kula: Furta "Th" da harshe tsakanin hakora (kar a ce "Sank you").',
    difficulty: 'fari',
  },
  {
    id: 'v4',
    english: 'You are welcome',
    hausa: 'Babu komai / Ba komai',
    phonetic: 'Yoo ahr WEL-kum',
    category: 'greetings',
    partOfSpeech: 'Gaisuwa (Greeting)',
    exampleEn: 'You are welcome, my brother.',
    exampleHa: 'Babu komai, dan\'uwana.',
    hausaTip: 'Amsa ce idan wani ya ce maka "Thank you".',
    difficulty: 'fari',
  },
  {
    id: 'v5',
    english: 'Excuse me',
    hausa: 'Gafara dai / Yi hakuri',
    phonetic: 'Ek-SKYOOZ mee',
    category: 'greetings',
    partOfSpeech: 'Gaisuwa (Greeting)',
    exampleEn: 'Excuse me, where is the main road?',
    exampleHa: 'Gafara dai, ina babbar hanyar take?',
    hausaTip: 'Ana cewa idan kana so ka tambayi wani abu ko wucewa.',
    difficulty: 'fari',
  },
  {
    id: 'v6',
    english: 'Nice to meet you',
    hausa: 'Na ji dadin haduwa da kai',
    phonetic: 'Nais too meet yoo',
    category: 'greetings',
    partOfSpeech: 'Gaisuwa (Greeting)',
    exampleEn: 'Hello Amina, nice to meet you.',
    exampleHa: 'Sannu Amina, na ji dadin haduwa da ke.',
    hausaTip: 'Ana fada ne a farkon haduwa da sabon mutum.',
    difficulty: 'fari',
  },

  // Market & Shopping
  {
    id: 'v7',
    english: 'How much is this?',
    hausa: 'Nawa ne wannan?',
    phonetic: 'How much iz this?',
    category: 'market',
    partOfSpeech: 'Gaisuwa (Greeting)',
    exampleEn: 'How much is this bag of rice?',
    exampleHa: 'Nawa ne wannan buhun shinkafar?',
    hausaTip: 'Babbar kalma ce a kasuwa. Ana iya cewa "How much?" a takaice.',
    difficulty: 'fari',
  },
  {
    id: 'v8',
    english: 'Discount',
    hausa: 'Ragi / Sauki a kudi',
    phonetic: 'DIS-kownt',
    category: 'market',
    partOfSpeech: 'Suna (Noun)',
    exampleEn: 'Can you give me a small discount?',
    exampleHa: "Za ka iya min 'yar ragi kadan?",
    hausaTip: 'Hanyar ciniki ce idan kana so mai kaya ya sauko da farashi.',
    difficulty: 'fari',
  },
  {
    id: 'v9',
    english: 'Receipt',
    hausa: 'Takardar biyan kudi (Rasit)',
    phonetic: 'Reh-SEET',
    category: 'market',
    partOfSpeech: 'Suna (Noun)',
    exampleEn: 'Please give me the receipt for the phone.',
    exampleHa: 'Don Allah ba ni takardar shaidar biyan kudin wayar.',
    hausaTip: 'Lura: Harafancin "p" a "Receipt" ba a fada (silent "p"). Ana cewa "Re-seet".',
    difficulty: 'matsakaici',
  },
  {
    id: 'v10',
    english: 'Expensive',
    hausa: 'Yana da tsada',
    phonetic: 'Ek-SPEN-siv',
    category: 'market',
    partOfSpeech: 'Sifa (Adj)',
    exampleEn: 'This cloth is too expensive for me.',
    exampleHa: 'Wannan yadin ya yi min tsada da yawa.',
    hausaTip: 'Kishiyar kalmar ita ce "Cheap" (mai sauki).',
    difficulty: 'fari',
  },
  {
    id: 'v11',
    english: 'Change',
    hausa: 'Canji / Ragowar kudi',
    phonetic: 'Chaynj',
    category: 'market',
    partOfSpeech: 'Suna (Noun)',
    exampleEn: 'Wait, you forgot your change!',
    exampleHa: 'Dakata, ka manta canjin ka!',
    hausaTip: 'Yana nufin ragowar kudin da za a ba ka bayan ka biya fiye da kudin kaya.',
    difficulty: 'fari',
  },

  // Work & Career
  {
    id: 'v12',
    english: 'Opportunity',
    hausa: 'Dama / Tagomashi',
    phonetic: 'Op-er-TOO-ni-tee',
    category: 'work',
    partOfSpeech: 'Suna (Noun)',
    exampleEn: 'This new job is a great opportunity.',
    exampleHa: 'Wannan sabon aikin wata babbar dama ce.',
    hausaTip: 'Haruffan "P" guda biyu suna bukatar matse baki sosai wajen furtawa.',
    difficulty: 'matsakaici',
  },
  {
    id: 'v13',
    english: 'Meeting',
    hausa: 'Taro / Zama don tattaunawa',
    phonetic: 'MEE-ting',
    category: 'work',
    partOfSpeech: 'Suna (Noun)',
    exampleEn: 'We have an important meeting at 2 PM.',
    exampleHa: 'Muna da wani muhimmin taro da karfe biyu na rana.',
    hausaTip: 'Ana amfani da ita a wurin aiki da kasuwanci.',
    difficulty: 'fari',
  },
  {
    id: 'v14',
    english: 'Salary',
    hausa: 'Albashi / Kudin aiki',
    phonetic: 'SAL-uh-ree',
    category: 'work',
    partOfSpeech: 'Suna (Noun)',
    exampleEn: 'He received his monthly salary today.',
    exampleHa: 'Ya karbi albashin sa na wata yau.',
    hausaTip: 'Yana nufin kudin da ma\'aikaci ke samu a karshen kowane wata.',
    difficulty: 'fari',
  },
  {
    id: 'v15',
    english: 'Deadline',
    hausa: 'Ranar karewar aiki / Lokaci na karshe',
    phonetic: 'DED-lain',
    category: 'work',
    partOfSpeech: 'Suna (Noun)',
    exampleEn: 'The project deadline is on Friday.',
    exampleHa: 'Ranar kammala aikin tana kan ranar Jumma\'a.',
    hausaTip: 'Dole a mika aiki kafin wannan lokacin ya cika.',
    difficulty: 'matsakaici',
  },

  // Food & Dining
  {
    id: 'v16',
    english: 'Water',
    hausa: 'Ruwa',
    phonetic: 'WAH-ter',
    category: 'food',
    partOfSpeech: 'Suna (Noun)',
    exampleEn: 'Please give me a glass of cold water.',
    exampleHa: 'Don Allah ba ni kofin ruwan sanyi.',
    hausaTip: 'Kalmar da kowa ke bukata a kowace rana.',
    difficulty: 'fari',
  },
  {
    id: 'v17',
    english: 'Delicious',
    hausa: 'Yana da dadi sosai',
    phonetic: 'Dih-LISH-us',
    category: 'food',
    partOfSpeech: 'Sifa (Adj)',
    exampleEn: 'This tuwo and miyan kuka is delicious!',
    exampleHa: 'Wannan tuwon da miyar kuka yana da dadi kwarai!',
    hausaTip: 'Furuci: "Dih-LISH-us", kar a furta "c" a matsayin "k".',
    difficulty: 'fari',
  },
  {
    id: 'v18',
    english: 'Breakfast',
    hausa: 'Karin kumallo / Karin safe',
    phonetic: 'BREK-fuhst',
    category: 'food',
    partOfSpeech: 'Suna (Noun)',
    exampleEn: 'I always eat breakfast before leaving home.',
    exampleHa: 'Kullum ina cin karin kumallo kafin in fita daga gida.',
    hausaTip: 'Kula: Ba a cewa "Break-fast", ana cewa "BREK-fuhst".',
    difficulty: 'fari',
  },

  // Health
  {
    id: 'v19',
    english: 'Medicine',
    hausa: 'Magani',
    phonetic: 'MED-ih-sin',
    category: 'health',
    partOfSpeech: 'Suna (Noun)',
    exampleEn: 'Take this medicine after your meal.',
    exampleHa: 'Sha wannan maganin bayan ka gama cin abinci.',
    hausaTip: 'Furuci: ana rage sauti tsakiya: "MED-sin" ko "MED-ih-sin".',
    difficulty: 'fari',
  },
  {
    id: 'v20',
    english: 'Headache',
    hausa: 'Ciwon kai',
    phonetic: 'HED-ayk',
    category: 'health',
    partOfSpeech: 'Suna (Noun)',
    exampleEn: 'I have a severe headache today.',
    exampleHa: 'Ina fama da matsanancin ciwon kai yau.',
    hausaTip: '"Ache" ana furta shi "Ayk" (kamar kalmar "Ake"), yana nufin radadin ciwo.',
    difficulty: 'matsakaici',
  },
  {
    id: 'v21',
    english: 'Emergency',
    hausa: 'Gaggawa / Wani abu na bazata',
    phonetic: 'Ee-MER-jen-see',
    category: 'health',
    partOfSpeech: 'Suna (Noun)',
    exampleEn: 'Call the emergency ambulance quickly!',
    exampleHa: 'Kira motar asibiti ta gaggawa da sauri!',
    hausaTip: 'Lokacin da ake bukatar dauki cikin gaggawa a asibiti ko hadari.',
    difficulty: 'matsakaici',
  },

  // Family & Home
  {
    id: 'v22',
    english: 'Parents',
    hausa: 'Iyaye (Uwa da Uba)',
    phonetic: 'PAIR-ents',
    category: 'family',
    partOfSpeech: 'Suna (Noun)',
    exampleEn: 'My parents always pray for my success.',
    exampleHa: 'Iyayena kullum suna yi min addu\'ar nasara.',
    hausaTip: 'Yana hada uba da uwa a kalma daya.',
    difficulty: 'fari',
  },
  {
    id: 'v23',
    english: 'Neighbor',
    hausa: 'Makwabci / Makwabtaciya',
    phonetic: 'NAY-ber',
    category: 'family',
    partOfSpeech: 'Suna (Noun)',
    exampleEn: 'Our neighbor is very kind and helpful.',
    exampleHa: 'Makwabcinmu yana da kirki da taimako sosai.',
    hausaTip: 'Haruffan "gh" ba a furta su ba (silent "gh").',
    difficulty: 'matsakaici',
  },

  // Travel & Directions
  {
    id: 'v24',
    english: 'Straight ahead',
    hausa: 'Kai tsaye a gaba',
    phonetic: 'Strayt uh-HED',
    category: 'travel',
    partOfSpeech: 'Sifa (Adj)',
    exampleEn: 'Go straight ahead and turn right at the junction.',
    exampleHa: 'Ka tafi kai tsaye a gaba, sannan ka karya dama a mararraba.',
    hausaTip: 'Ana amfani da ita wajen nuna hanya idan ba a bukatar karkata.',
    difficulty: 'fari',
  },
  {
    id: 'v25',
    english: 'Airport',
    hausa: 'Filin jirgin sama',
    phonetic: 'AIR-port',
    category: 'travel',
    partOfSpeech: 'Suna (Noun)',
    exampleEn: 'We arrived at Kano airport on time.',
    exampleHa: 'Mun isa filin jirgin saman Kano a kan lokaci.',
    hausaTip: 'Hadakar kalmomin "Air" (iska/sama) da "Port" (tashar sauka).',
    difficulty: 'fari',
  },

  // Education & Grammar
  {
    id: 'v26',
    english: 'Knowledge',
    hausa: 'Ilimi / Sani',
    phonetic: 'NOL-ij',
    category: 'education',
    partOfSpeech: 'Suna (Noun)',
    exampleEn: 'Knowledge is light in every darkness.',
    exampleHa: 'Ilimi haske ne a cikin kowane duhu.',
    hausaTip: 'Harafancin "K" a farko ba a furtawa (silent "K"). Ana cewa "NOL-ij".',
    difficulty: 'matsakaici',
  },
  {
    id: 'v27',
    english: 'Practice',
    hausa: 'Atisaye / Maimaitawa don kwarewa',
    phonetic: 'PRAK-tis',
    category: 'education',
    partOfSpeech: 'Fi\'ili (Verb)',
    exampleEn: 'Practice English speaking every single day.',
    exampleHa: 'Yi atisayen magana da Turanci a kowace rana.',
    hausaTip: 'Kamar yadda Hausawa ke cewa: "Maimaitawa ita ce uwar ilimi."',
    difficulty: 'fari',
  },
  {
    id: 'v28',
    english: 'Confidence',
    hausa: 'Kwarin gwiwa / Dogaro da kai',
    phonetic: 'KON-fih-dens',
    category: 'education',
    partOfSpeech: 'Suna (Noun)',
    exampleEn: 'Speak English with high confidence and pride.',
    exampleHa: 'Yi magana da Turanci da kwarin gwiwa da jin dadi.',
    hausaTip: 'Kada kaji tsoron kuskure; kuskure hanyar koyo ce.',
    difficulty: 'gwani',
  },
];

export const DAILY_WORDS_CYCLE: { dayIndex: number; word: VocabWord; proverbHa: string; proverbEn: string }[] = [
  {
    dayIndex: 0,
    word: VOCABULARY_LIST[0], // Good morning
    proverbHa: 'Gaisuwa ita ce kofar shiga zuciyar mutum.',
    proverbEn: 'Greetings are the doorway to a person\'s heart.',
  },
  {
    dayIndex: 1,
    word: VOCABULARY_LIST[1], // Please
    proverbHa: 'Ladabi ba tsoro ba ne, ado ne na mutunci.',
    proverbEn: 'Politeness is not cowardice, it is the crown of dignity.',
  },
  {
    dayIndex: 2,
    word: VOCABULARY_LIST[2], // Thank you
    proverbHa: 'Godiya ga wanda ya yi maka alheri tana kara budin hanya.',
    proverbEn: 'Gratitude for a kindness opens more doors for the future.',
  },
  {
    dayIndex: 3,
    word: VOCABULARY_LIST[7], // How much
    proverbHa: 'Sanin kasuwa yana farawa da tambaya da gaskiya.',
    proverbEn: 'Market wisdom begins with honest inquiry.',
  },
  {
    dayIndex: 4,
    word: VOCABULARY_LIST[11], // Opportunity
    proverbHa: 'Dama ba ta jira wanda ya yi barci.',
    proverbEn: 'Opportunity does not wait for one who sleeps.',
  },
  {
    dayIndex: 5,
    word: VOCABULARY_LIST[25], // Knowledge
    proverbHa: 'Ilimi garkuwar mai neman sa ne a rayuwa.',
    proverbEn: 'Knowledge is the shield of whoever seeks it in life.',
  },
  {
    dayIndex: 6,
    word: VOCABULARY_LIST[27], // Confidence
    proverbHa: 'Kwarin gwiwa yana maida babban tsauni ya zama tudu.',
    proverbEn: 'Confidence turns a towering mountain into a gentle hill.',
  },
];

export const SENTENCE_CHALLENGES: SentenceChallenge[] = [
  {
    id: 's1',
    hausaPrompt: 'Ina so in sha ruwa.',
    englishAnswer: ['I', 'want', 'to', 'drink', 'water'],
    options: ['I', 'want', 'drink', 'to', 'water', 'food', 'tea'],
    hintHa: 'A Turanci: Mai magana (I) + Buƙata (want) + to drink + abin sha (water).',
    grammarNoteHa: 'Kula: Bayan "want", idan wani aiki zai biyo baya ana sa "to" (want TO drink).',
  },
  {
    id: 's2',
    hausaPrompt: 'Nawa ne kudin wannan littafin?',
    englishAnswer: ['How', 'much', 'is', 'this', 'book'],
    options: ['How', 'much', 'is', 'this', 'book', 'are', 'pen'],
    hintHa: 'Fara da "How much" sannan kalmar tambaya "is" domin littafi guda daya ne.',
    grammarNoteHa: 'Saboda abu guda daya ne (singular), muna amfani da "is this" ba "are these" ba.',
  },
  {
    id: 's3',
    hausaPrompt: 'Zan tafi kasuwa gobe da safe.',
    englishAnswer: ['I', 'will', 'go', 'to', 'the', 'market', 'tomorrow', 'morning'],
    options: ['I', 'will', 'go', 'to', 'the', 'market', 'tomorrow', 'morning', 'yesterday', 'home'],
    hintHa: 'Lokacin gaba (future tense) yana amfani da "will go".',
    grammarNoteHa: '"Will" tana nuna aikin gaba ne (kamar "zan" a Hausa).',
  },
  {
    id: 's4',
    hausaPrompt: 'Mahaifiyata tana dahuwa a dakin girki.',
    englishAnswer: ['My', 'mother', 'is', 'cooking', 'in', 'the', 'kitchen'],
    options: ['My', 'mother', 'is', 'cooking', 'in', 'the', 'kitchen', 'eating', 'father'],
    hintHa: 'Aikin da ke gudana a yanzu (continuous) yana amfani da "is cooking".',
    grammarNoteHa: 'Duk aikin da ake ciki a yanzu a Turanci yana karbar "-ing" a karshen fi\'ili.',
  },
  {
    id: 's5',
    hausaPrompt: 'Don Allah za ka iya taimaka mini?',
    englishAnswer: ['Please', 'can', 'you', 'help', 'me'],
    options: ['Please', 'can', 'you', 'help', 'me', 'him', 'tell'],
    hintHa: 'Fara da "Please" ko "Can you help me, please?".',
    grammarNoteHa: '"Can you" hanya ce mai ladabi ta neman taimako (kamar "za ka iya...").',
  },
  {
    id: 's6',
    hausaPrompt: 'Ina koyon Turanci a kowace rana.',
    englishAnswer: ['I', 'am', 'learning', 'English', 'every', 'day'],
    options: ['I', 'am', 'learning', 'English', 'every', 'day', 'was', 'Hausa'],
    hintHa: '"I am learning" yana nufin "Ina koyo".',
    grammarNoteHa: 'Sunan harshe kamar English ko Hausa koyaushe babban baki ake rubuta shi da farko (Capital Letter).',
  },
];

export const WORD_MATCH_PAIRS = [
  { en: 'Water', ha: 'Ruwa', id: 'm1' },
  { en: 'Market', ha: 'Kasuwa', id: 'm2' },
  { en: 'Book', ha: 'Littafi', id: 'm3' },
  { en: 'Money', ha: 'Kuɗi', id: 'm4' },
  { en: 'Friend', ha: 'Aboki', id: 'm5' },
  { en: 'Road', ha: 'Hanya', id: 'm6' },
  { en: 'School', ha: 'Makaranta', id: 'm7' },
  { en: 'Doctor', ha: 'Likita', id: 'm8' },
  { en: 'Food', ha: 'Abinci', id: 'm9' },
  { en: 'Family', ha: 'Iyali', id: 'm10' },
  { en: 'Sun', ha: 'Rana', id: 'm11' },
  { en: 'Night', ha: 'Dare', id: 'm12' },
];

export const PRONUNCIATION_TOPICS: PronunciationTopic[] = [
  {
    id: 'p-vs-f',
    titleHa: 'Bambancin "P" da "F"',
    titleEn: 'The "P" vs "F" Sound Distinction',
    summaryHa: 'Hausa ba ta da harafancin "P" a asali, don haka mutane da yawa sukan furta "Pen" a matsayin "Fen".',
    descriptionHa: 'Yadda ake furta "P": Haɗa leɓunanka biyu waje ɗaya sosai, sannan ka buɗe su da sauri tare da fitar da iska kamar fashewa (pop). Kada ka cije leɓen ƙasa da haƙoranka—haka ake yin "F" kawai!',
    practiceWords: [
      { en: 'Pen', ha: 'Alƙalami', soundFocus: 'P - haɗa leɓuna biyu, kar a ce "Fen"' },
      { en: 'Paper', ha: 'Takarda', soundFocus: 'P - furucin "P" guda biyu' },
      { en: 'People', ha: 'Mutane', soundFocus: 'Pee-pol' },
      { en: 'Problem', ha: 'Matsala / Damuwa', soundFocus: 'Pro-blem' },
      { en: 'Fan', ha: 'Fanka / Mai ba da iska', soundFocus: 'F - cije leɓen ƙasa da haƙori' },
      { en: 'Phone', ha: 'Waya', soundFocus: 'Fown - "ph" ana karanta shi kamar "F"' },
    ],
    audioSample: 'Pen and Fan, Paper and Phone, People and Problem.',
  },
  {
    id: 'th-sounds',
    titleHa: 'Furuci da Harafancin "TH"',
    titleEn: 'Mastering the "TH" Sound',
    summaryHa: 'Kar a ce "Sank you" maimakon "Thank you", ko "Dis" maimakon "This".',
    descriptionHa: 'A Turanci "TH" tana da sautuka biyu: 1) Marar kauri (Voiceless): Sanya tsakiyar harshenka a tsakanin haƙoranka na sama da ƙasa, sannan ka busa iska a hankali (kamar "Think", "Thank you"). 2) Mai kauri (Voiced): Sanya harshe tsakanin haƙora sannan ka saki kukan murya (kamar "This", "That", "Mother").',
    practiceWords: [
      { en: 'Thank you', ha: 'Na gode', soundFocus: 'Th mai taushi, kar a ce "Sank"' },
      { en: 'Think', ha: 'Tunanin abu', soundFocus: 'Th-ink' },
      { en: 'This', ha: 'Wannan (kusa)', soundFocus: 'Th mai rawa a murya' },
      { en: 'That', ha: 'Wancan (nesa)', soundFocus: 'Th mai rawa' },
      { en: 'Brother', ha: 'Ɗan\'uwa', soundFocus: 'Bruh-ther' },
    ],
    audioSample: 'Thank you for this thoughtful thing, my brother.',
  },
  {
    id: 'consonant-clusters',
    titleHa: 'Kaucewa Ƙara "I" a Farko (School vs Iskul)',
    titleEn: 'Word-Initial Consonant Clusters',
    summaryHa: 'A harshen Hausa kalmomi ba sa farawa da haruffa biyu marasa wasali tare (kamar "Sc-", "St-", "Sp-").',
    descriptionHa: 'Saboda al\'adar harshe, Hausawa da yawa sukan kara harafancin "I" a farko, kamar "Iskul" maimakon "School", ko "Istop" maimakon "Stop", ko "Isbidi" maimakon "Speed". Shawara: Fara busa sautin "Ssss" kafin ka shiga harafanci na gaba ba tare da cusa "I" a farko ba.',
    practiceWords: [
      { en: 'School', ha: 'Makaranta', soundFocus: 'Sss-kool (ba "Is-kul" ba)' },
      { en: 'Station', ha: 'Tashar mota ko jirgi', soundFocus: 'Sss-tay-shun (ba "Is-teshan" ba)' },
      { en: 'Student', ha: 'Ɗalibi', soundFocus: 'Sss-tyoo-dent' },
      { en: 'Special', ha: 'Na musamman', soundFocus: 'Sss-peh-shul' },
      { en: 'Stop', ha: 'Tsaya', soundFocus: 'Sss-top' },
    ],
    audioSample: 'The student will stop at the special school station.',
  },
  {
    id: 'grammar-is-are',
    titleHa: 'Bambancin "Is" da "Are" da "Am"',
    titleEn: 'Using "Am", "Is", and "Are" Correctly',
    summaryHa: 'A Hausa kalmomin "ne" da "ce" suke aiki, amma a Turanci ya danganta da adadi da mai magana.',
    descriptionHa: '1) "AM" ana amfani da ita ne KAWAI tare da "I" (I am = Ni ne / Ina). 2) "IS" ana amfani da ita da abu guda daya (He is, She is, It is, The car is). 3) "ARE" ana amfani da ita ga jama\'a ko mai saurare (You are, We are, They are, The cars are).',
    practiceWords: [
      { en: 'I am a teacher', ha: 'Ni malami ne', soundFocus: 'I + AM' },
      { en: 'He is my friend', ha: 'Shi abokina ne', soundFocus: 'He + IS' },
      { en: 'They are happy', ha: 'Suna cikin farin ciki', soundFocus: 'They + ARE' },
      { en: 'We are learning', ha: 'Muna koyo', soundFocus: 'We + ARE' },
    ],
    audioSample: 'I am ready, he is coming, and they are already here.',
  },
];

export const PRACTICAL_PHRASES: PracticalPhrase[] = [
  {
    id: 'ph1',
    english: 'Where can I find an ATM or bank nearby?',
    hausa: 'Ina zan iya samun na\'urar cire kuɗi (ATM) ko banki a kusa?',
    contextHa: 'Lokacin da kake neman cire kuɗi ko asusun ajiya.',
    category: 'Kasuwanci & Kuɗi',
  },
  {
    id: 'ph2',
    english: 'Could you please speak a bit more slowly?',
    hausa: 'Don Allah za ka iya yin magana a hankali kaɗan?',
    contextHa: 'Idan Bature ko mai magana da Turanci yana sauri sosai.',
    category: 'Gaisuwa & Sadarwa',
  },
  {
    id: 'ph3',
    english: 'I would like to order a bottle of cold water, please.',
    hausa: 'Ina so in nemi gora guda ta ruwan sanyi, don Allah.',
    contextHa: 'A gidan cin abinci ko otal.',
    category: 'Abinci & Sha',
  },
  {
    id: 'ph4',
    english: 'What is the last price you can give me?',
    hausa: 'Mene ne farashin karshe da za ka iya bani?',
    contextHa: 'A kasuwa wajen ciniki.',
    category: 'Kasuwa & Siyayya',
  },
  {
    id: 'ph5',
    english: 'I need to see a doctor immediately.',
    hausa: 'Ina bukatar ganin likita cikin gaggawa.',
    contextHa: 'A asibiti ko wajen jinya.',
    category: 'Lafiya & Asibiti',
  },
  {
    id: 'ph6',
    english: 'Could you please direct me to the airport terminal?',
    hausa: 'Za ka iya nuna min hanyar zuwa tashar filin jirgi?',
    contextHa: 'Wajen tafiya da neman hanya.',
    category: 'Tafiya & Sufuri',
  },
  {
    id: 'ph7',
    english: 'Thank you for your time and assistance.',
    hausa: 'Na gode da lokacinka da taimakon da ka bani.',
    contextHa: 'Kammala tattaunawa ko bayan an taimake ka.',
    category: 'Gaisuwa & Sadarwa',
  },
  {
    id: 'ph8',
    english: 'I am still learning English, please bear with me.',
    hausa: 'Har yanzu ina koyon Turanci ne, don Allah ka yi hakuri da ni.',
    contextHa: 'Hanya mai kyau ta bude tattaunawa ba tare da jin kunya ba.',
    category: 'Gaisuwa & Sadarwa',
  },
];
