// eslint-disable-next-line no-unused-vars
var EXPERIENCES = [
  // ── ATRAÇÕES ────────────────────────────────────────────────────────────────
  {
    id: 'seven_dwarfs',
    name: 'Seven Dwarfs Mine Train',
    category: 'ride',
    thrill: 'moderate',
    emoji: '⛏️',
    photos: ['assets/photos/seven_dwarfs/01.jpg'],
    description: 'Montanha-russa temática que percorre as minas dos Sete Anões com cenas animadas do clássico da Disney. Divertida para todas as idades e uma das mais disputadas do parque.',
    tip: 'A fila pode ultrapassar 2 horas! Prioridade máxima no rope drop — é a primeira atração a ter fila enorme.'
  },
  {
    id: 'tron',
    name: 'TRON Lightcycle / Run',
    category: 'ride',
    thrill: 'thrill',
    emoji: '🏍️',
    photos: ['assets/photos/tron/01.jpg'],
    description: 'A montanha-russa mais rápida do Magic Kingdom! Você "pilota" uma moto de luz em alta velocidade por dentro e fora do edifício. Uma experiência futurista e eletrizante.',
    tip: 'Bolsos cheios podem ser um problema — há armários gratuitos antes da fila. Outra atração para priorizar bem cedo!'
  },
  {
    id: 'space_mountain',
    name: 'Space Mountain',
    category: 'ride',
    thrill: 'thrill',
    emoji: '🚀',
    photos: ['assets/photos/space_mountain/01.jpg'],
    description: 'Clássico absoluto desde 1975! Uma montanha-russa no escuro com efeitos de estrelas e nebulosas, dando a sensação de voar pelo espaço. Ícone do Magic Kingdom.',
    tip: 'É no escuro, o que pode assustar mais do que a velocidade. Comece pelo Barnstormer se alguém ainda não conhece coaster.'
  },
  {
    id: 'tianas_bayou',
    name: "Tiana's Bayou Adventure",
    category: 'ride',
    thrill: 'moderate',
    emoji: '🐸',
    photos: ['assets/photos/tianas_bayou/01.jpg'],
    description: 'Atração temática da Princesa Tiana com cenários lindos de Louisiana e uma descida d\'água animada. Prepare-se para se molhar — faz parte da diversão!',
    tip: 'Leve uma muda de roupa ou compre uma capa descartável. Melhor de manhã antes do calor do meio-dia.'
  },
  {
    id: 'haunted_mansion',
    name: 'Haunted Mansion',
    category: 'ride',
    thrill: 'calm',
    emoji: '👻',
    photos: ['assets/photos/haunted_mansion/01.jpg'],
    description: 'Uma das atrações mais icônicas da Disney no mundo! Passeio de "Doom Buggy" por uma mansão mal-assombrada com 999 fantasmas, humor sutil e efeitos visuais geniais.',
    tip: 'Não é de dar medo de verdade — é bem-humorada! A fila decorada com lápides engraçadas já é parte da experiência.'
  },
  {
    id: 'pirates',
    name: 'Pirates of the Caribbean',
    category: 'ride',
    thrill: 'calm',
    emoji: '☠️',
    photos: ['assets/photos/pirates/01.jpg'],
    description: 'Passeio de barco pelos mares do Caribe com piratas animatrônicos e batalhas navais. A atração que inspirou os filmes com Johnny Depp. Clássico para toda a família.',
    tip: 'Ótima para o calor do dia — é fresca e com fila geralmente rápida. Procure o Jack Sparrow escondido nas cenas!'
  },
  {
    id: 'jungle_cruise',
    name: 'Jungle Cruise',
    category: 'ride',
    thrill: 'calm',
    emoji: '🌿',
    photos: ['assets/photos/jungle_cruise/01.jpg'],
    description: 'Passeio de barco por selvas tropicais com animais animatrônicos e um guia cheio de piadas terríveis (de propósito!). Clássica e divertida para todas as idades.',
    tip: 'O humor do guia é o show — cada grupo tem piadas diferentes! Tente fazer duas vezes e compare os roteiros.'
  },
  {
    id: 'peter_pan',
    name: "Peter Pan's Flight",
    category: 'ride',
    thrill: 'calm',
    emoji: '🧚',
    photos: ['assets/photos/peter_pan/01.jpg'],
    description: 'Voe sobre Londres e a Terra do Nunca em um galeão voador! Uma das atrações mais amadas do parque, com cenários mágicos vistos de cima. Perfeita para fãs do Peter Pan.',
    tip: 'Fila enorme o dia todo mesmo sendo curta (3 min). Vale usar o Lightning Lane — ou chegar cedo e pegar logo.'
  },
  {
    id: 'its_a_small_world',
    name: "It's a Small World",
    category: 'ride',
    thrill: 'calm',
    emoji: '🌍',
    photos: ['assets/photos/its_a_small_world/01.jpg'],
    description: 'Passeio de barco pelo mundo todo com centenas de bonecos cantando a música mais grudenta da Disney! Tem Brasil, tem samba — procure as representações de vários países.',
    tip: 'Ótima para descansar os pés e se refrescar. A música vai ficar na cabeça por dias... considere-se avisado!'
  },
  {
    id: 'winnie_the_pooh',
    name: 'The Many Adventures of Winnie the Pooh',
    category: 'ride',
    thrill: 'calm',
    emoji: '🐻',
    photos: ['assets/photos/winnie_the_pooh/01.jpg'],
    description: 'Passeio fofinho em um "honeypot" pela Floresta dos Cem Acres com cenas de sonhos e dias de vento. Ideal para crianças e para quem ama o Ursinho Pooh.',
    tip: 'Fila relativamente rápida. Tente de manhã cedo. Os cenários internos são coloridos e muito bem feitos.'
  },
  {
    id: 'philharmagic',
    name: "Mickey's PhilharMagic",
    category: 'ride',
    thrill: 'calm',
    emoji: '🎵',
    photos: ['assets/photos/philharmagic/01.jpg'],
    description: 'Show 4D em cinema com 180° de tela, onde o Pato Donald vai parar em vários filmes da Disney. Vento, água e aromas fazem parte da experiência. Todos os filmes favoritos numa cena só!',
    tip: 'Ótimo para escapar do calor. O show leva uns 12 minutos e quase sempre tem fila rápida. Toda a família vai adorar!'
  },
  {
    id: 'buzz_lightyear',
    name: "Buzz Lightyear's Space Ranger Spin",
    category: 'ride',
    thrill: 'calm',
    emoji: '🤖',
    photos: ['assets/photos/buzz_lightyear/01.jpg'],
    description: 'Atração interativa onde você é um Ranger Espacial e atira em alvos para ganhar pontos! Os carrinhos giram e cada passageiro tem seu próprio canhão laser. Vira competição em família!',
    tip: 'Mire nos alvos menores e nos diamantes para pontuar mais. Cada um pontua separadamente — quem vai ser o campeão da família?'
  },
  {
    id: 'little_mermaid',
    name: 'Under the Sea – Journey of The Little Mermaid',
    category: 'ride',
    thrill: 'calm',
    emoji: '🧜',
    photos: ['assets/photos/little_mermaid/01.jpg'],
    description: 'Passeio encantador pelas cenas de A Pequena Sereia com personagens animatrônicos deslumbrantes e as músicas do filme. O castelo de New Fantasyland é lindo para fotos!',
    tip: 'Fila rápida na maior parte do dia. Ótima escolha para o intervalo entre as atrações mais disputadas.'
  },
  {
    id: 'dumbo',
    name: 'Dumbo the Flying Elephant',
    category: 'ride',
    thrill: 'calm',
    emoji: '🐘',
    photos: ['assets/photos/dumbo/01.jpg'],
    description: 'O elefante voador mais famoso da Disney! Você controla a altura enquanto gira ao redor da atração. Um ícone do parque e eterno favorito das crianças.',
    tip: 'Tem duas rodas duplas e a fila anda rápido. Há área de playground coberta para esperar — pegue uma senha e brinque enquanto aguarda!'
  },
  {
    id: 'barnstormer',
    name: 'The Barnstormer',
    category: 'ride',
    thrill: 'moderate',
    emoji: '✈️',
    photos: ['assets/photos/barnstormer/01.jpg'],
    description: 'Mini montanha-russa temática do Pateta Piloto, perfeita para introduzir crianças e adultos às coaster rides. Rápida, divertida e sem ser assustadora demais.',
    tip: 'Excelente primeira montanha-russa! Se alguém nunca andou em coaster, comece aqui antes de Space Mountain ou TRON.'
  },
  {
    id: 'astro_orbiter',
    name: 'Astro Orbiter',
    category: 'ride',
    thrill: 'moderate',
    emoji: '🪐',
    photos: ['assets/photos/astro_orbiter/01.jpg'],
    description: 'Foguetes em órbita no alto de Tomorrowland! Você controla a altura enquanto gira com vista para todo o parque lá de cima. Diferente e com visual incrível.',
    tip: 'Fica bem alto — quem tem vertigem deve pensar duas vezes. A fila fica no elevador e costuma ser longa para o que é.'
  },
  {
    id: 'mad_tea_party',
    name: 'Mad Tea Party',
    category: 'ride',
    thrill: 'calm',
    emoji: '🫖',
    photos: ['assets/photos/mad_tea_party/01.jpg'],
    description: 'As xícaras giratórias do Chapeleiro Maluco! Você controla a velocidade de giro. Quanto mais girar o volante, mais tontura — diversão garantida ou enjoo na certa!',
    tip: 'Cuidado com refeições antes dessa! Muito divertida para grupos que competem quem aguenta girar mais. Os kids adoram!'
  },
  {
    id: 'magic_carpets',
    name: 'The Magic Carpets of Aladdin',
    category: 'ride',
    thrill: 'calm',
    emoji: '🧞',
    photos: ['assets/photos/magic_carpets/01.jpg'],
    description: 'Voe em um tapete mágico do Aladdin sobre Agrabah! Controle altura e inclinação enquanto gira. Similar ao Dumbo, ótima para crianças e fãs do filme.',
    tip: 'Há um camelo que cospe água nos passageiros! Observe de onde vem antes de escolher onde sentar.'
  },
  {
    id: 'monsters_inc',
    name: 'Monsters Inc. Laugh Floor',
    category: 'ride',
    thrill: 'calm',
    emoji: '👾',
    photos: ['assets/photos/monsters_inc/01.jpg'],
    description: 'Show interativo ao vivo onde personagens digitais de Monstros S.A. fazem piadas e brincam com a plateia em tempo real! Sempre diferente e muito engraçado.',
    tip: 'Sente-se no meio — as câmeras adoram pegar reações do público. Quem gosta de atenção pode acabar na tela gigante!'
  },
  {
    id: 'tomorrowland_speedway',
    name: 'Tomorrowland Speedway',
    category: 'ride',
    thrill: 'calm',
    emoji: '🏎️',
    photos: ['assets/photos/tomorrowland_speedway/01.jpg'],
    description: 'Dirija um carro de corrida em um circuito especial no Tomorrowland! Os carros ficam em trilho mas você controla o volante. Ótima experiência para crianças que adoram carros.',
    tip: 'Crianças com altura suficiente podem "dirigir"! Os carros são barulhentos e cheirosos — faz parte do charme retrô.'
  },
  {
    id: 'peoplemover',
    name: 'Tomorrowland PeopleMover',
    category: 'ride',
    thrill: 'calm',
    emoji: '🚄',
    photos: ['assets/photos/peoplemover/01.jpg'],
    description: 'Tour relaxante pelo Tomorrowland, passando por dentro do Space Mountain e Buzz Lightyear! Vista aérea das atrações sem fila. Perfeito para descansar os pés.',
    tip: 'Quase sem fila! Ótimo jeito de ver o Tomorrowland de cima e espiar por dentro de outras atrações antes de decidir.'
  },
  {
    id: 'swiss_family',
    name: 'Swiss Family Treehouse',
    category: 'ride',
    thrill: 'calm',
    emoji: '🌳',
    photos: ['assets/photos/swiss_family/01.jpg'],
    description: 'Explore a pé a enorme árvore da família Robinson com vários andares cheios de engenhocas criativas. Vista linda do Adventureland e muita imaginação dos náufragos.',
    tip: 'São muitos degraus — quem tiver dificuldade de mobilidade pode preferir pular. Muito legal para crianças curiosas!'
  },
  {
    id: 'wdw_railroad',
    name: 'Walt Disney World Railroad',
    category: 'ride',
    thrill: 'calm',
    emoji: '🚂',
    photos: ['assets/photos/wdw_railroad/01.jpg'],
    description: 'Trem a vapor vintage que circunda todo o Magic Kingdom! Passe pelas principais "terras" do parque com narração histórica. Perfeito para descansar os pés.',
    tip: 'Use o trem para se locomover! Tem paradas no Main Street, Frontierland e Fantasyland — economiza caminhada.'
  },
  {
    id: 'carousel_progress',
    name: "Walt Disney's Carousel of Progress",
    category: 'ride',
    thrill: 'calm',
    emoji: '💡',
    photos: ['assets/photos/carousel_progress/01.jpg'],
    description: 'Teatro giratório único no mundo que mostra a evolução tecnológica americana de 1900 até hoje, com família animatrônica. Criado pelo próprio Walt Disney para a Feira Mundial de 1964.',
    tip: 'Teatro com ar-condicionado, quase sem fila. Ótimo para descansar e aprender um pouco de história americana!'
  },
  {
    id: 'hall_presidents',
    name: 'The Hall of Presidents',
    category: 'ride',
    thrill: 'calm',
    emoji: '🏛️',
    photos: ['assets/photos/hall_presidents/01.jpg'],
    description: 'Show de 25 minutos com todos os presidentes americanos em tamanho real — animatrônicos hiper-realistas que falam e se movem. Uma obra de arte tecnológica.',
    tip: 'Mais cultural do que entretenimento puro. Ótimo para quem gosta de história americana. Ar-condicionado excelente!'
  },
  {
    id: 'main_street_vehicles',
    name: 'Main Street Vehicles',
    category: 'ride',
    thrill: 'calm',
    emoji: '🚌',
    photos: ['assets/photos/main_street_vehicles/01.jpg'],
    description: 'Veículos vintage — bonde, ônibus a motor e carruagem — que percorrem a Main Street dos anos 1900. Um charme autêntico e ótimo para fotos nostálgicas.',
    tip: 'Funciona só durante parte do dia. Não planeje, mas se estiver passando e tiver disponível, vale a pena subir!'
  },
  {
    id: 'prince_charming',
    name: 'Prince Charming Regal Carrousel',
    category: 'ride',
    thrill: 'calm',
    emoji: '🎠',
    photos: ['assets/photos/prince_charming/01.jpg'],
    description: 'Carrossel clássico no coração de Fantasyland, com 90 cavalos pintados à mão. Um carrossel original do século XIX, restaurado pela Disney com cuidado artesanal.',
    tip: 'Procure o cavalo com fita amarela — é o da Cinderela! As fotos ficam maravilhosas com o Castelo ao fundo.'
  },

  // ── DESFILES ────────────────────────────────────────────────────────────────
  {
    id: 'festival_fantasy',
    name: 'Disney Festival of Fantasy Parade',
    category: 'parade',
    thrill: null,
    emoji: '🎪',
    photos: ['assets/photos/festival_fantasy/01.jpg'],
    description: 'O desfile mais espetacular do Magic Kingdom! Carros alegóricos gigantes, personagens dançantes, fantasias incríveis e música ao vivo. A Malévola cospe fogo — inesquecível!',
    tip: 'Acontece às 12h e 15h. Chegue 30 min antes e ocupe lugar na Main Street. O carro da Malévola passando com fogo é um dos momentos mais impressionantes do parque!'
  },
  {
    id: 'adventure_cavalcade',
    name: 'Disney Adventure Friends Cavalcade',
    category: 'parade',
    thrill: null,
    emoji: '🎡',
    photos: ['assets/photos/adventure_cavalcade/01.jpg'],
    description: 'Cavalcata com mais de 20 personagens da Disney num só desfile! Mais íntimo que o Festival of Fantasy, com personagens de Moana, Ratatouille, Zootopia e muito mais.',
    tip: 'Passa às 17h10 e 18h25. Como é menos conhecido, a multidão é menor e você fica bem mais perto dos personagens!'
  },
  {
    id: 'starlight',
    name: 'Disney Starlight: Dream the Night Away',
    category: 'parade',
    thrill: null,
    emoji: '✨',
    photos: ['assets/photos/starlight/01.jpg'],
    description: 'O desfile noturno iluminado com personagens em carros brilhantes e fantasias com luzes! Uma experiência mágica diferente, aproveitando a magia da noite no Magic Kingdom.',
    tip: 'Acontece às 20h30, pouco antes dos fogos. Garanta lugar na Main Street cedo para ver o desfile e ficar posicionado para os fogos!'
  },

  // ── FOGOS ───────────────────────────────────────────────────────────────────
  {
    id: 'happily_ever_after',
    name: 'Happily Ever After',
    category: 'fireworks',
    thrill: null,
    emoji: '🎆',
    photos: ['assets/photos/happily_ever_after/01.jpg'],
    description: 'O espetáculo de fogos mais lindo da Disney! Projeções mágicas no Castelo da Cinderela, fogos sincronizados com músicas dos filmes e um finale de arrepiar. A família inteira vai se emocionar.',
    tip: 'Às 21h30. Posicione-se na Main Street com o castelo à frente bem antes das 21h — lota rápido. Traga lenços: é impossível não se emocionar!'
  },

  // ── SHOWS ───────────────────────────────────────────────────────────────────
  {
    id: 'magical_friendship',
    name: "Mickey's Magical Friendship Faire",
    category: 'show',
    thrill: null,
    emoji: '🎭',
    photos: ['assets/photos/magical_friendship/01.jpg'],
    description: 'Show musical ao vivo no palco do Castelo com Mickey, Minnie, Donald, Pateta e personagens de Frozen, Enrolados e Princesa e o Sapo. Dança, canto e muita magia!',
    tip: 'Chega 20 min antes para garantir espaço na praça. O show da manhã tem menos gente. Imperdível para fãs da Disney!'
  },
  {
    id: 'enchanted_belle',
    name: 'Enchanted Tales with Belle',
    category: 'show',
    thrill: null,
    emoji: '📚',
    photos: ['assets/photos/enchanted_belle/01.jpg'],
    description: 'Experiência interativa onde visitantes participam da história de A Bela e a Fera! Crianças são convidadas a encenar partes do conto com a própria Bela. Mágico e muito especial!',
    tip: 'Crianças que quiserem participar devem se oferecer no início. Tem um espelho mágico animatrônico incrível na entrada. Faz crianças felizes por dias!'
  },
  {
    id: 'country_bear',
    name: 'Country Bear Musical Jamboree',
    category: 'show',
    thrill: null,
    emoji: '🎸',
    photos: ['assets/photos/country_bear/01.jpg'],
    description: 'Show de animatrônicos com ursos cantores de música country! Um clássico original do parque desde 1971, recentemente renovado. Curioso, divertido e totalmente único.',
    tip: 'Totalmente diferente das atrações modernas — é nostálgico e exótico. Vale conferir pela originalidade. Quase sem fila!'
  },
  {
    id: 'tiki_room',
    name: "Walt Disney's Enchanted Tiki Room",
    category: 'show',
    thrill: null,
    emoji: '🌺',
    photos: ['assets/photos/tiki_room/01.jpg'],
    description: 'O primeiro uso de animatrônicos na história da Disney! Centenas de pássaros, flores e tikis cantam músicas tropicais em uníssono. Atração histórica, relaxante e refrescante.',
    tip: 'Show de 15 min com ar-condicionado e fila zero. Um pedaço da história do parque — e ótimo refúgio do calor da tarde!'
  },
  {
    id: 'caseys_pianist',
    name: "Casey's Corner Pianist",
    category: 'show',
    thrill: null,
    emoji: '🎹',
    photos: ['assets/photos/caseys_pianist/01.jpg'],
    description: 'Pianista ao vivo toca ragtime e clássicos da Disney na praça do Casey\'s Corner na Main Street! Ambiente descontraído e autêntico enquanto você come ou descansa.',
    tip: 'Acontece ao longo do dia, especialmente de manhã e à tarde. Dê uma pausa para ouvir enquanto come um hot dog no Casey\'s Corner!'
  },
  {
    id: 'dapper_dans',
    name: 'The Dapper Dans',
    category: 'show',
    thrill: null,
    emoji: '🎩',
    photos: ['assets/photos/dapper_dans/01.jpg'],
    description: 'Quarteto de barbershop dos anos 1900 que desfila pela Main Street cantando a cappella! Com figurinos elegantes de época, cantam clássicos da Disney e músicas do início do século XX.',
    tip: 'Aparecem várias vezes ao dia na Main Street. Quando ouvir, pare e aplauda — eles adoram interação! Único e muito charmoso.'
  }
];
