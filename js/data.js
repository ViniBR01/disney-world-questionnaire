/* eslint-disable no-unused-vars */

// Interleaved display order so types don't cluster together
var EXPERIENCE_ORDER = [
  'seven_dwarfs','haunted_mansion','tron','jungle_cruise','festival_fantasy',
  'space_mountain','philharmagic','pirates','dumbo','tianas_bayou',
  'peter_pan','magical_friendship','peoplemover','barnstormer','its_a_small_world',
  'monsters_inc','wdw_railroad','happily_ever_after','winnie_the_pooh','enchanted_belle',
  'mad_tea_party','little_mermaid','carousel_progress','astro_orbiter','buzz_lightyear',
  'country_bear','magic_carpets','starlight','hall_presidents','tiki_room',
  'tomorrowland_speedway','adventure_cavalcade','prince_charming','main_street_vehicles',
  'swiss_family','caseys_pianist','dapper_dans'
];

var SUBCATEGORIES = {
  coaster:  { label: 'Montanhas-Russas',       bg: '#b71c1c', fg: '#fff', icon: '🎢' },
  darkride: { label: 'Passeios Lentos',        bg: '#1a237e', fg: '#fff', icon: '⛵' },
  show:     { label: 'Shows & Entretenimento', bg: '#1b5e20', fg: '#fff', icon: '🎭' },
  spinner:  { label: 'Carrosséis & Transporte',bg: '#bf360c', fg: '#fff', icon: '🎡' },
  parade:   { label: 'Desfiles & Fogos',       bg: '#4a148c', fg: '#fff', icon: '✨' }
};

var EXPERIENCES = [
  // ── MONTANHAS-RUSSAS ────────────────────────────────────────────────────────
  {
    id: 'tron',
    name: 'TRON Lightcycle / Run',
    subcategory: 'coaster',
    category: 'ride', thrill: 'thrill', emoji: '🏍️',
    photos: ['assets/photos/tron/01.jpg','assets/photos/tron/02.jpg','assets/photos/tron/03.jpg'],
    year: 2023, speed: '95 km/h', duration: '~2 min',
    description: 'A montanha-russa mais rápida do Magic Kingdom! Pilote uma moto de luz a 95 km/h por dentro de um edifício futurista.',
    tip: 'Bolsos cheios: use os armários gratuitos antes da fila. Priorize bem cedo — fila esgota rápido!'
  },
  {
    id: 'space_mountain',
    name: 'Space Mountain',
    subcategory: 'coaster',
    category: 'ride', thrill: 'thrill', emoji: '🚀',
    photos: ['assets/photos/space_mountain/01.jpg','assets/photos/space_mountain/02.jpg','assets/photos/space_mountain/03.jpg'],
    year: 1975, speed: '44 km/h', duration: '2 min 30 seg',
    description: 'Clássico desde 1975 — uma corrida pelo espaço no escuro absoluto com efeitos de estrelas e nebulosas. Ícone do Magic Kingdom.',
    tip: 'A escuridão assusta mais do que a velocidade. Comece pelo Barnstormer se alguém for estreante em coasters.'
  },
  {
    id: 'seven_dwarfs',
    name: 'Seven Dwarfs Mine Train',
    subcategory: 'coaster',
    category: 'ride', thrill: 'moderate', emoji: '⛏️',
    photos: ['assets/photos/seven_dwarfs/01.jpg','assets/photos/seven_dwarfs/02.jpg','assets/photos/seven_dwarfs/03.jpg'],
    year: 2014, speed: '55 km/h', duration: '2 min 30 seg',
    description: 'Montanha-russa familiar com vagões que balançam suavemente, passando por cenas iluminadas das minas dos Sete Anões.',
    tip: 'Fila pode passar de 2 horas. Prioridade máxima no rope drop — é a primeira atração a lotar.'
  },
  {
    id: 'tianas_bayou',
    name: "Tiana's Bayou Adventure",
    subcategory: 'coaster',
    category: 'ride', thrill: 'moderate', emoji: '🐸',
    photos: ['assets/photos/tianas_bayou/01.jpg','assets/photos/tianas_bayou/02.jpg','assets/photos/tianas_bayou/03.jpg'],
    year: 2024, speed: '64 km/h (queda final)', duration: '11 min',
    description: 'Splash com cenários musicais de Louisiana culminando em uma descida vertiginosa — você VAI se molhar!',
    tip: 'Leve muda de roupa ou capa descartável. Melhor de manhã, antes do calor.'
  },
  {
    id: 'barnstormer',
    name: 'The Barnstormer',
    subcategory: 'coaster',
    category: 'ride', thrill: 'moderate', emoji: '✈️',
    photos: ['assets/photos/barnstormer/01.jpg','assets/photos/barnstormer/02.jpg','assets/photos/barnstormer/03.jpg'],
    year: 1996, speed: '40 km/h', duration: '1 min 3 seg',
    description: 'Mini coaster do Pateta Piloto: a porta de entrada perfeita para quem nunca andou em montanha-russa.',
    tip: 'Comece aqui antes de Space Mountain ou TRON se alguém for novato em coasters.'
  },

  // ── DARK RIDES & BARCO ──────────────────────────────────────────────────────
  {
    id: 'haunted_mansion',
    name: 'Haunted Mansion',
    subcategory: 'darkride',
    category: 'ride', thrill: 'calm', emoji: '👻',
    photos: ['assets/photos/haunted_mansion/01.jpg','assets/photos/haunted_mansion/02.jpg','assets/photos/haunted_mansion/03.jpg'],
    year: 1971, speed: null, duration: '7 min 30 seg',
    description: '999 fantasmas felizes te esperam nesta mansão icônica — bem-humorada, com efeitos visuais geniais.',
    tip: 'A fila decorada com lápides engraçadas já é parte da experiência. Não é assustadora de verdade!'
  },
  {
    id: 'pirates',
    name: 'Pirates of the Caribbean',
    subcategory: 'darkride',
    category: 'ride', thrill: 'calm', emoji: '☠️',
    photos: ['assets/photos/pirates/01.jpg','assets/photos/pirates/02.jpg','assets/photos/pirates/03.jpg'],
    year: 1973, speed: null, duration: '8 min 30 seg',
    description: 'Passeio de barco com animatrônicos impressionantes pelos mares do Caribe — a atração que inspirou os filmes!',
    tip: 'Ótima para o calor — fresca e com fila geralmente rápida. Procure o Jack Sparrow escondido!'
  },
  {
    id: 'jungle_cruise',
    name: 'Jungle Cruise',
    subcategory: 'darkride',
    category: 'ride', thrill: 'calm', emoji: '🌿',
    photos: ['assets/photos/jungle_cruise/01.jpg','assets/photos/jungle_cruise/02.jpg','assets/photos/jungle_cruise/03.jpg'],
    year: 1971, speed: null, duration: '9 min 5 seg',
    description: 'Passeio fluvial com animais animatrônicos e um guia com piadas terríveis (de propósito!) — um clássico eterno.',
    tip: 'O humor do guia é o show. Cada grupo tem roteiro diferente — tente duas vezes!'
  },
  {
    id: 'peter_pan',
    name: "Peter Pan's Flight",
    subcategory: 'darkride',
    category: 'ride', thrill: 'calm', emoji: '🧚',
    photos: ['assets/photos/peter_pan/01.jpg','assets/photos/peter_pan/02.jpg','assets/photos/peter_pan/03.jpg'],
    year: 1971, speed: null, duration: '2 min 45 seg',
    description: 'Voe sobre Londres e a Terra do Nunca em um galeão suspenso — uma das mais amadas do parque desde 1971.',
    tip: 'Fila enorme o dia todo. Vale muito o Lightning Lane — ou chegue cedo e priorize.'
  },
  {
    id: 'its_a_small_world',
    name: "It's a Small World",
    subcategory: 'darkride',
    category: 'ride', thrill: 'calm', emoji: '🌍',
    photos: ['assets/photos/its_a_small_world/01.jpg','assets/photos/its_a_small_world/02.jpg','assets/photos/its_a_small_world/03.jpg'],
    year: 1971, speed: null, duration: '10 min 30 seg',
    description: 'Viagem de barco por todas as culturas do mundo com centenas de bonecos — tem Brasil! A música gruda na cabeça.',
    tip: 'Ótima para descansar e se refrescar. Procure os bonecos brasileiros!'
  },
  {
    id: 'winnie_the_pooh',
    name: 'The Many Adventures of Winnie the Pooh',
    subcategory: 'darkride',
    category: 'ride', thrill: 'calm', emoji: '🐻',
    photos: ['assets/photos/winnie_the_pooh/01.jpg','assets/photos/winnie_the_pooh/02.jpg','assets/photos/winnie_the_pooh/03.jpg'],
    year: 1999, speed: null, duration: '3 min 8 seg',
    description: 'Aventura fofa pelo Hundred Acre Wood em um melão de mel — cenários coloridos e encantadores.',
    tip: 'Fila relativamente rápida. Tente de manhã cedo para garantir.'
  },
  {
    id: 'little_mermaid',
    name: 'Under the Sea – Journey of The Little Mermaid',
    subcategory: 'darkride',
    category: 'ride', thrill: 'calm', emoji: '🧜',
    photos: ['assets/photos/little_mermaid/01.jpg','assets/photos/little_mermaid/02.jpg','assets/photos/little_mermaid/03.jpg'],
    year: 2012, speed: null, duration: '6 min 15 seg',
    description: 'Omnimover encantador pelas cenas de A Pequena Sereia com animatrônicos deslumbrantes e músicas do filme.',
    tip: 'Fila rápida na maior parte do dia. Ótima opção entre as atrações mais disputadas.'
  },
  {
    id: 'buzz_lightyear',
    name: "Buzz Lightyear's Space Ranger Spin",
    subcategory: 'darkride',
    category: 'ride', thrill: 'calm', emoji: '🤖',
    photos: ['assets/photos/buzz_lightyear/01.jpg','assets/photos/buzz_lightyear/02.jpg','assets/photos/buzz_lightyear/03.jpg'],
    year: 1998, speed: null, duration: '4 min 3 seg',
    description: 'Dark ride interativo: atire nos alvos com seu canhão laser e acumule pontos — vira uma competição em família!',
    tip: 'Mire nos alvos menores e diamantes para pontuar mais. Placar individual por passageiro!'
  },

  // ── SHOWS & ENTRETENIMENTO ─────────────────────────────────────────────────
  {
    id: 'monsters_inc',
    name: 'Monsters Inc. Laugh Floor',
    subcategory: 'show',
    category: 'ride', thrill: 'calm', emoji: '👾',
    photos: ['assets/photos/monsters_inc/01.jpg','assets/photos/monsters_inc/02.jpg','assets/photos/monsters_inc/03.jpg'],
    year: 2007, speed: null, duration: '11 min',
    description: 'Show digital interativo onde personagens de Monstros S.A. fazem piadas com o público em tempo real — sempre diferente!',
    tip: 'Sente-se no meio — as câmeras adoram pegar reações da plateia. Você pode virar a estrela do show!'
  },
  {
    id: 'philharmagic',
    name: "Mickey's PhilharMagic",
    subcategory: 'show',
    category: 'ride', thrill: 'calm', emoji: '🎵',
    photos: ['assets/photos/philharmagic/01.jpg','assets/photos/philharmagic/02.jpg','assets/photos/philharmagic/03.jpg'],
    year: 2003, speed: null, duration: '12 min',
    description: 'Cinema 4D de 180° com vento, água e aromas — Donald percorre os clássicos da Disney numa aventura sensorial.',
    tip: 'Ótimo para escapar do calor. Fila quase sempre rápida e toda a família vai adorar.'
  },
  {
    id: 'hall_presidents',
    name: 'The Hall of Presidents',
    subcategory: 'show',
    category: 'ride', thrill: 'calm', emoji: '🏛️',
    photos: ['assets/photos/hall_presidents/01.jpg','assets/photos/hall_presidents/02.jpg'],
    year: 1971, speed: null, duration: '21 min 35 seg',
    description: 'Todos os presidentes americanos em animatrônicos de tamanho real que falam e se movem — tecnologia de ponta.',
    tip: 'Mais cultural do que entretenimento puro. Ótimo para quem gosta de história americana.'
  },
  {
    id: 'carousel_progress',
    name: "Walt Disney's Carousel of Progress",
    subcategory: 'show',
    category: 'ride', thrill: 'calm', emoji: '💡',
    photos: ['assets/photos/carousel_progress/01.jpg','assets/photos/carousel_progress/02.jpg','assets/photos/carousel_progress/03.jpg'],
    year: 1975, speed: null, duration: '20 min 45 seg',
    description: 'Teatro giratório único criado pelo próprio Walt Disney mostrando um século de evolução tecnológica americana.',
    tip: 'Ar-condicionado excelente e quase sem fila. Peça especial da história da Disney.'
  },
  {
    id: 'tiki_room',
    name: "Walt Disney's Enchanted Tiki Room",
    subcategory: 'show',
    category: 'show', thrill: 'calm', emoji: '🌺',
    photos: ['assets/photos/tiki_room/01.jpg','assets/photos/tiki_room/02.jpg','assets/photos/tiki_room/03.jpg'],
    year: 1971, speed: null, duration: '10 min',
    description: 'O primeiro animatrônico da Disney (1971): centenas de pássaros e flores cantando músicas tropicais em uníssono.',
    tip: 'Show de 10 min com ar-condicionado e fila zero. Um pedaço da história do parque!'
  },
  {
    id: 'country_bear',
    name: 'Country Bear Musical Jamboree',
    subcategory: 'show',
    category: 'show', thrill: 'calm', emoji: '🎸',
    photos: ['assets/photos/country_bear/01.jpg','assets/photos/country_bear/02.jpg'],
    year: 1971, speed: null, duration: '12 min',
    description: 'Ursos animatrônicos cantores de country — um clássico excêntrico que sobrevive desde 1971, renovado em 2024.',
    tip: 'Totalmente único e nostálgico. Quase sem fila. Vale conferir pela originalidade!'
  },
  {
    id: 'enchanted_belle',
    name: 'Enchanted Tales with Belle',
    subcategory: 'show',
    category: 'show', thrill: 'calm', emoji: '📚',
    photos: ['assets/photos/enchanted_belle/01.jpg','assets/photos/enchanted_belle/02.jpg','assets/photos/enchanted_belle/03.jpg'],
    year: 2012, speed: null, duration: '~20 min',
    description: 'Experiência interativa onde visitantes encenam A Bela e a Fera com a própria Bela — mágico e muito especial!',
    tip: 'Crianças que se oferecerem no início participam da história. O espelho mágico animatrônico é incrível!'
  },
  {
    id: 'magical_friendship',
    name: "Mickey's Magical Friendship Faire",
    subcategory: 'show',
    category: 'show', thrill: 'calm', emoji: '🎭',
    photos: ['assets/photos/magical_friendship/01.jpg','assets/photos/magical_friendship/02.jpg','assets/photos/magical_friendship/03.jpg'],
    year: 2016, speed: null, duration: '~12 min',
    description: 'Show musical ao vivo no palco do Castelo com Mickey, Minnie, Donald e personagens de Frozen, Enrolados e mais.',
    tip: 'Chegue 20 min antes para garantir lugar. Show da manhã tem menos gente.'
  },
  {
    id: 'caseys_pianist',
    name: "Casey's Corner Pianist",
    subcategory: 'show',
    category: 'show', thrill: 'calm', emoji: '🎹',
    photos: ['assets/photos/caseys_pianist/01.jpg','assets/photos/caseys_pianist/02.jpg'],
    year: 1971, speed: null, duration: 'Variável',
    description: 'Pianista ao vivo com ragtime e clássicos da Disney na praça do Casey\'s Corner — descontraído e autêntico.',
    tip: 'Ouça enquanto come um hot dog no Casey\'s Corner — clima de Main Street dos anos 1900!'
  },
  {
    id: 'dapper_dans',
    name: 'The Dapper Dans',
    subcategory: 'show',
    category: 'show', thrill: 'calm', emoji: '🎩',
    photos: ['assets/photos/dapper_dans/01.jpg','assets/photos/dapper_dans/02.jpg'],
    year: 1971, speed: null, duration: 'Variável',
    description: 'Quarteto a cappella estilo 1900 que desfila pela Main Street com figurinos elegantes de época — único e charmoso.',
    tip: 'Aparecem várias vezes ao dia. Quando ouvir, pare e aplauda — eles adoram interação!'
  },
  {
    id: 'swiss_family',
    name: 'Swiss Family Treehouse',
    subcategory: 'show',
    category: 'ride', thrill: 'calm', emoji: '🌳',
    photos: ['assets/photos/swiss_family/01.jpg','assets/photos/swiss_family/02.jpg','assets/photos/swiss_family/03.jpg'],
    year: 1971, speed: null, duration: 'Auto-guiada',
    description: 'Explore o engenhoso lar dos náufragos Robinson em uma árvore gigante com vários andares cheios de invenções.',
    tip: 'Muitos degraus — quem tiver dificuldade de mobilidade pode pular. Legal para crianças curiosas!'
  },

  // ── CARROSSÉIS & TRANSPORTE ────────────────────────────────────────────────
  {
    id: 'dumbo',
    name: 'Dumbo the Flying Elephant',
    subcategory: 'spinner',
    category: 'ride', thrill: 'calm', emoji: '🐘',
    photos: ['assets/photos/dumbo/01.jpg','assets/photos/dumbo/02.jpg','assets/photos/dumbo/03.jpg'],
    year: 1971, speed: null, duration: '1 min 30 seg',
    description: 'O elefante voador mais famoso da Disney — você controla a altura do voo! Um ícone do parque.',
    tip: 'Duas rodas duplas = fila rápida. Há playground coberto para esperar com senha!'
  },
  {
    id: 'mad_tea_party',
    name: 'Mad Tea Party',
    subcategory: 'spinner',
    category: 'ride', thrill: 'calm', emoji: '🫖',
    photos: ['assets/photos/mad_tea_party/01.jpg','assets/photos/mad_tea_party/02.jpg'],
    year: 1971, speed: null, duration: '1 min 30 seg',
    description: 'Xícaras giratórias do Chapeleiro Maluco — quanto mais girar o volante, mais tontura. Diversão garantida!',
    tip: 'Cuidado após refeições! Competição familiar de quem aguenta girar mais.'
  },
  {
    id: 'astro_orbiter',
    name: 'Astro Orbiter',
    subcategory: 'spinner',
    category: 'ride', thrill: 'moderate', emoji: '🪐',
    photos: ['assets/photos/astro_orbiter/01.jpg','assets/photos/astro_orbiter/02.jpg','assets/photos/astro_orbiter/03.jpg'],
    year: 1974, speed: null, duration: '1 min 30 seg',
    description: 'Foguetes em órbita no alto de Tomorrowland com vista panorâmica do parque — altitude real, não simulada!',
    tip: 'Fica bem alto — quem tem vertigem deve pensar duas vezes. Fila no elevador costuma ser longa.'
  },
  {
    id: 'magic_carpets',
    name: 'The Magic Carpets of Aladdin',
    subcategory: 'spinner',
    category: 'ride', thrill: 'calm', emoji: '🧞',
    photos: ['assets/photos/magic_carpets/01.jpg','assets/photos/magic_carpets/02.jpg','assets/photos/magic_carpets/03.jpg'],
    year: 2001, speed: null, duration: '1 min 30 seg',
    description: 'Tapetes mágicos do Aladdin sobre Agrabah — controle altura e inclinação. Cuidado com o camelo que cospe água!',
    tip: 'Observe de onde o camelo cospe antes de escolher onde sentar!'
  },
  {
    id: 'prince_charming',
    name: 'Prince Charming Regal Carrousel',
    subcategory: 'spinner',
    category: 'ride', thrill: 'calm', emoji: '🎠',
    photos: ['assets/photos/prince_charming/01.jpg','assets/photos/prince_charming/02.jpg'],
    year: 1971, speed: null, duration: '2 min',
    description: 'Carrossel original do século XIX com 90 cavalos pintados à mão — restaurado pela Disney com capricho artesanal.',
    tip: 'Procure o cavalo com fita amarela — é o da Cinderela! Fotos lindas com o Castelo ao fundo.'
  },
  {
    id: 'peoplemover',
    name: 'Tomorrowland PeopleMover',
    subcategory: 'spinner',
    category: 'ride', thrill: 'calm', emoji: '🚄',
    photos: ['assets/photos/peoplemover/01.jpg','assets/photos/peoplemover/02.jpg','assets/photos/peoplemover/03.jpg'],
    year: 1975, speed: null, duration: '10 min 4 seg',
    description: 'Tour elevado e relaxante pelo Tomorrowland — espreite dentro do Space Mountain sem precisar encarar a fila!',
    tip: 'Quase sem fila! Ótimo jeito de orientar-se no Tomorrowland e decidir o que priorizar.'
  },
  {
    id: 'wdw_railroad',
    name: 'Walt Disney World Railroad',
    subcategory: 'spinner',
    category: 'ride', thrill: 'calm', emoji: '🚂',
    photos: ['assets/photos/wdw_railroad/01.jpg','assets/photos/wdw_railroad/02.jpg','assets/photos/wdw_railroad/03.jpg'],
    year: 1971, speed: null, duration: '20 min',
    description: 'Trem a vapor vintage que circunda todo o Magic Kingdom com paradas em Main Street, Frontierland e Fantasyland.',
    tip: 'Use o trem para se locomover entre as "terras" — economiza bastante caminhada!'
  },
  {
    id: 'tomorrowland_speedway',
    name: 'Tomorrowland Speedway',
    subcategory: 'spinner',
    category: 'ride', thrill: 'calm', emoji: '🏎️',
    photos: ['assets/photos/tomorrowland_speedway/01.jpg','assets/photos/tomorrowland_speedway/02.jpg','assets/photos/tomorrowland_speedway/03.jpg'],
    year: 1971, speed: '11 km/h', duration: '4 min 45 seg',
    description: 'Circuito de kart a gasolina em Tomorrowland — os carros ficam em trilho mas você dirige! Barulhento e divertido.',
    tip: 'A experiência de "dirigir" é o charme. Crianças adoram, adultos se surpreendem com o barulho!'
  },
  {
    id: 'main_street_vehicles',
    name: 'Main Street Vehicles',
    subcategory: 'spinner',
    category: 'ride', thrill: 'calm', emoji: '🚌',
    photos: ['assets/photos/main_street_vehicles/01.jpg','assets/photos/main_street_vehicles/02.jpg'],
    year: 1971, speed: null, duration: '~5 min',
    description: 'Veículos vintage dos anos 1900 — bonde, ônibus a motor e carruagem percorrendo a Main Street U.S.A.',
    tip: 'Funciona por parte do dia. Não planeje, mas se estiver disponível ao passar, suba!'
  },

  // ── DESFILES & FOGOS ───────────────────────────────────────────────────────
  {
    id: 'festival_fantasy',
    name: 'Disney Festival of Fantasy Parade',
    subcategory: 'parade',
    category: 'parade', thrill: null, emoji: '🎪',
    photos: ['assets/photos/festival_fantasy/01.jpg','assets/photos/festival_fantasy/02.jpg','assets/photos/festival_fantasy/03.jpg'],
    year: 2014, speed: null, duration: '25 min',
    description: 'O desfile mais espetacular do parque com carros alegóricos gigantes e personagens dançantes. A Malévola COSPE FOGO!',
    tip: 'Acontece às 12h e 15h. Chegue 30 min antes e ocupe lugar na Main Street.'
  },
  {
    id: 'adventure_cavalcade',
    name: 'Disney Adventure Friends Cavalcade',
    subcategory: 'parade',
    category: 'parade', thrill: null, emoji: '🎡',
    photos: ['assets/photos/adventure_cavalcade/01.jpg','assets/photos/adventure_cavalcade/02.jpg','assets/photos/adventure_cavalcade/03.jpg'],
    year: 2022, speed: null, duration: '~10 min',
    description: 'Mini-cavalcata frequente com mais de 20 personagens — Moana, Ratatouille, Zootopia e muito mais. Ótima para fotos!',
    tip: 'Passa às 17h10 e 18h25. Multidão menor = você fica mais perto dos personagens!'
  },
  {
    id: 'starlight',
    name: 'Disney Starlight: Dream the Night Away',
    subcategory: 'parade',
    category: 'parade', thrill: null, emoji: '✨',
    photos: ['assets/photos/starlight/01.jpg','assets/photos/starlight/02.jpg','assets/photos/starlight/03.jpg'],
    year: 2025, speed: null, duration: '~25 min',
    description: 'Desfile noturno iluminado com fantasias brilhantes e carros com luzes — a magia da noite no Magic Kingdom.',
    tip: 'Às 20h30. Garanta lugar cedo na Main Street para ver o desfile e já ficar posicionado para os fogos!'
  },
  {
    id: 'happily_ever_after',
    name: 'Happily Ever After',
    subcategory: 'parade',
    category: 'fireworks', thrill: null, emoji: '🎆',
    photos: ['assets/photos/happily_ever_after/01.jpg','assets/photos/happily_ever_after/02.jpg','assets/photos/happily_ever_after/03.jpg'],
    year: 2017, speed: null, duration: '18 min',
    description: 'O espetáculo de fogos mais emocionante da Disney com projeções no Castelo da Cinderela e lasers sincronizados.',
    tip: 'Às 21h30. Posicione-se na Main Street antes das 21h — lota muito! Traga lenços.'
  }
];

// Sort in-place so all scripts get the interleaved order
EXPERIENCES.sort(function (a, b) {
  var ai = EXPERIENCE_ORDER.indexOf(a.id);
  var bi = EXPERIENCE_ORDER.indexOf(b.id);
  return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
});
