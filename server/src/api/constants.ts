export const PERIODS = ['5min', 'day', 'week', 'month', 'year'];

export const PLAYER_TYPES = ['unknown', 'regular', 'ironman', 'hardcore', 'ultimate'];

export const GROUP_ROLES = [
  'achiever',
  'adamant',
  'adept',
  'administrator',
  'admiral',
  'adventurer',
  'air',
  'anchor',
  'apothecary',
  'archer',
  'armadylean',
  'artillery',
  'artisan',
  'asgarnian',
  'assassin',
  'assistant',
  'astral',
  'athlete',
  'attacker',
  'bandit',
  'bandosian',
  'barbarian',
  'battlemage',
  'beast',
  'berserker',
  'blisterwood',
  'blood',
  'blue',
  'bob',
  'body',
  'brassican',
  'brawler',
  'brigadier',
  'brigand',
  'bronze',
  'bruiser',
  'bulwark',
  'burglar',
  'burnt',
  'cadet',
  'captain',
  'carry',
  'champion',
  'chaos',
  'cleric',
  'collector',
  'colonel',
  'commander',
  'competitor',
  'completionist',
  'constructor',
  'cook',
  'coordinator',
  'corporal',
  'cosmic',
  'councillor',
  'crafter',
  'crew',
  'crusader',
  'cutpurse',
  'death',
  'defender',
  'defiler',
  'deputy owner',
  'destroyer',
  'diamond',
  'diseased',
  'doctor',
  'dogsbody',
  'dragon',
  'dragonstone',
  'druid',
  'duellist',
  'earth',
  'elite',
  'emerald',
  'enforcer',
  'epic',
  'executive',
  'expert',
  'explorer',
  'farmer',
  'feeder',
  'fighter',
  'fire',
  'firemaker',
  'firestarter',
  'fisher',
  'fletcher',
  'forager',
  'fremennik',
  'gamer',
  'gatherer',
  'general',
  'gnome child',
  'gnome elder',
  'goblin',
  'gold',
  'goon',
  'green',
  'grey',
  'guardian',
  'guthixian',
  'harpoon',
  'healer',
  'hellcat',
  'helper',
  'herbologist',
  'hero',
  'holy',
  'hoarder',
  'hunter',
  'ignitor',
  'illusionist',
  'imp',
  'infantry',
  'inquisitor',
  'iron',
  'jade',
  'justiciar',
  'kandarin',
  'karamjan',
  'kharidian',
  'kitten',
  'knight',
  'labourer',
  'law',
  'leader',
  'learner',
  'legacy',
  'legend',
  'legionnaire',
  'lieutenant',
  'looter',
  'lumberjack',
  'magic',
  'magician',
  'major',
  'maple',
  'marshal',
  'master',
  'maxed',
  'mediator',
  'medic',
  'mentor',
  'member',
  'merchant',
  'mind',
  'miner',
  'minion',
  'misthalinian',
  'mithril',
  'moderator',
  'monarch',
  'morytanian',
  'mystic',
  'myth',
  'natural',
  'nature',
  'necromancer',
  'ninja',
  'noble',
  'novice',
  'nurse',
  'oak',
  'officer',
  'onyx',
  'opal',
  'oracle',
  'orange',
  'owner',
  'page',
  'paladin',
  'pawn',
  'pilgrim',
  'pine',
  'pink',
  'prefect',
  'priest',
  'private',
  'prodigy',
  'proselyte',
  'prospector',
  'protector',
  'pure',
  'purple',
  'pyromancer',
  'quester',
  'racer',
  'raider',
  'ranger',
  'record-chaser',
  'recruit',
  'recruiter',
  'red topaz',
  'red',
  'rogue',
  'ruby',
  'rune',
  'runecrafter',
  'sage',
  'sapphire',
  'saradominist',
  'saviour',
  'scavenger',
  'scholar',
  'scourge',
  'scout',
  'scribe',
  'seer',
  'senator',
  'sentry',
  'serenist',
  'sergeant',
  'shaman',
  'sheriff',
  'short green guy',
  'skiller',
  'skulled',
  'slayer',
  'smiter',
  'smith',
  'smuggler',
  'sniper',
  'soul',
  'specialist',
  'speed-runner',
  'spellcaster',
  'squire',
  'staff',
  'steel',
  'strider',
  'striker',
  'summoner',
  'superior',
  'supervisor',
  'teacher',
  'templar',
  'therapist',
  'thief',
  'tirannian',
  'trialist',
  'trickster',
  'tzkal',
  'tztok',
  'unholy',
  'vagrant',
  'vanguard',
  'walker',
  'wanderer',
  'warden',
  'warlock',
  'warrior',
  'water',
  'wild',
  'willow',
  'wily',
  'wintumber',
  'witch',
  'wizard',
  'worker',
  'wrath',
  'xerician',
  'yellow',
  'yew',
  'zamorakian',
  'zarosian',
  'zealot',
  'zenyte'
];

export const PRIVELEGED_GROUP_ROLES = ['leader', 'owner', 'administrator', 'moderator', 'deputy owner'];

export const PLAYER_BUILDS = ['f2p', 'lvl3', '1def', '10hp', 'zerker', 'main'];

export const COMPETITION_STATUSES = ['upcoming', 'ongoing', 'finished'];
export const COMPETITION_TYPES = ['classic', 'team'];

export const OSRS_HISCORES = {
  regular: 'https://services.runescape.com/m=hiscore_oldschool/index_lite.ws',
  ironman: 'https://services.runescape.com/m=hiscore_oldschool_ironman/index_lite.ws',
  hardcore: 'https://services.runescape.com/m=hiscore_oldschool_hardcore_ironman/index_lite.ws',
  ultimate: 'https://services.runescape.com/m=hiscore_oldschool_ultimate/index_lite.ws',
  nameCheck: 'https://secure.runescape.com/m=hiscore_oldschool/overall?table=0'
};

export const CML = {
  HISTORY: 'https://crystalmathlabs.com/tracker/api.php?type=datapoints',
  MEMBERS: 'https://www.crystalmathlabs.com/tracker/compcreate.php'
};

export const TEMPLE_OSRS = {
  // Limited to 200 datapoints
  HISTORY: 'https://templeosrs.com/api/player_datapoints.php',
  MEMBERS: 'https://templeosrs.com/api/groupmembers.php',
  PARTICIPANTS: 'https://templeosrs.com/api/compmembers.php',
  GROUP_INFO: 'https://templeosrs.com/api/group_info.php'
};

export const SKILLS_MAP = [
  { key: 'overall', name: 'Overall' },
  { key: 'attack', name: 'Attack' },
  { key: 'defence', name: 'Defence' },
  { key: 'strength', name: 'Strength' },
  { key: 'hitpoints', name: 'Hitpoints' },
  { key: 'ranged', name: 'Ranged' },
  { key: 'prayer', name: 'Prayer' },
  { key: 'magic', name: 'Magic' },
  { key: 'cooking', name: 'Cooking' },
  { key: 'woodcutting', name: 'Woodcutting' },
  { key: 'fletching', name: 'Fletching' },
  { key: 'fishing', name: 'Fishing' },
  { key: 'firemaking', name: 'Firemaking' },
  { key: 'crafting', name: 'Crafting' },
  { key: 'smithing', name: 'Smithing' },
  { key: 'mining', name: 'Mining' },
  { key: 'herblore', name: 'Herblore' },
  { key: 'agility', name: 'Agility' },
  { key: 'thieving', name: 'Thieving' },
  { key: 'slayer', name: 'Slayer' },
  { key: 'farming', name: 'Farming' },
  { key: 'runecrafting', name: 'Runecrafting' },
  { key: 'hunter', name: 'Hunter' },
  { key: 'construction', name: 'Construction' }
];

export const ACTIVITIES_MAP = [
  { key: 'league_points', name: 'League Points' },
  { key: 'bounty_hunter_hunter', name: 'Bounty Hunter (Hunter)' },
  { key: 'bounty_hunter_rogue', name: 'Bounty Hunter (Rogue)' },
  { key: 'clue_scrolls_all', name: 'Clue Scrolls (All)' },
  { key: 'clue_scrolls_beginner', name: 'Clue Scrolls (Beginner)' },
  { key: 'clue_scrolls_easy', name: 'Clue Scrolls (Easy)' },
  { key: 'clue_scrolls_medium', name: 'Clue Scrolls (Medium)' },
  { key: 'clue_scrolls_hard', name: 'Clue Scrolls (Hard)' },
  { key: 'clue_scrolls_elite', name: 'Clue Scrolls (Elite)' },
  { key: 'clue_scrolls_master', name: 'Clue Scrolls (Master)' },
  { key: 'last_man_standing', name: 'Last Man Standing' },
  { key: 'soul_wars_zeal', name: 'Soul Wars Zeal' }
];

export const BOSSES_MAP = [
  { key: 'abyssal_sire', name: 'Abyssal Sire' },
  { key: 'alchemical_hydra', name: 'Alchemical Hydra' },
  { key: 'barrows_chests', name: 'Barrows Chests' },
  { key: 'bryophyta', name: 'Bryophyta' },
  { key: 'callisto', name: 'Callisto' },
  { key: 'cerberus', name: 'Cerberus' },
  { key: 'chambers_of_xeric', name: 'Chambers Of Xeric' },
  { key: 'chambers_of_xeric_challenge_mode', name: 'Chambers Of Xeric (CM)' },
  { key: 'chaos_elemental', name: 'Chaos Elemental' },
  { key: 'chaos_fanatic', name: 'Chaos Fanatic' },
  { key: 'commander_zilyana', name: 'Commander Zilyana' },
  { key: 'corporeal_beast', name: 'Corporeal Beast' },
  { key: 'crazy_archaeologist', name: 'Crazy Archaeologist' },
  { key: 'dagannoth_prime', name: 'Dagannoth Prime' },
  { key: 'dagannoth_rex', name: 'Dagannoth Rex' },
  { key: 'dagannoth_supreme', name: 'Dagannoth Supreme' },
  { key: 'deranged_archaeologist', name: 'Deranged Archaeologist' },
  { key: 'general_graardor', name: 'General Graardor' },
  { key: 'giant_mole', name: 'Giant Mole' },
  { key: 'grotesque_guardians', name: 'Grotesque Guardians' },
  { key: 'hespori', name: 'Hespori' },
  { key: 'kalphite_queen', name: 'Kalphite Queen' },
  { key: 'king_black_dragon', name: 'King Black Dragon' },
  { key: 'kraken', name: 'Kraken' },
  { key: 'kreearra', name: "Kree'Arra" },
  { key: 'kril_tsutsaroth', name: "K'ril Tsutsaroth" },
  { key: 'mimic', name: 'Mimic' },
  { key: 'nex', name: 'Nex' },
  { key: 'nightmare', name: 'Nightmare' },
  { key: 'phosanis_nightmare', name: "Phosani's Nightmare" },
  { key: 'obor', name: 'Obor' },
  { key: 'sarachnis', name: 'Sarachnis' },
  { key: 'scorpia', name: 'Scorpia' },
  { key: 'skotizo', name: 'Skotizo' },
  { key: 'tempoross', name: 'Tempoross' },
  { key: 'the_gauntlet', name: 'The Gauntlet' },
  { key: 'the_corrupted_gauntlet', name: 'The Corrupted Gauntlet' },
  { key: 'theatre_of_blood', name: 'Theatre Of Blood' },
  { key: 'theatre_of_blood_hard_mode', name: 'Theatre Of Blood (HM)' },
  { key: 'thermonuclear_smoke_devil', name: 'Thermonuclear Smoke Devil' },
  { key: 'tzkal_zuk', name: 'TzKal-Zuk' },
  { key: 'tztok_jad', name: 'TzTok-Jad' },
  { key: 'venenatis', name: 'Venenatis' },
  { key: 'vetion', name: "Vet'ion" },
  { key: 'vorkath', name: 'Vorkath' },
  { key: 'wintertodt', name: 'Wintertodt' },
  { key: 'zalcano', name: 'Zalcano' },
  { key: 'zulrah', name: 'Zulrah' }
];

export const VIRTUAL_MAP = [
  { key: 'ehp', name: 'EHP' },
  { key: 'ehb', name: 'EHB' }
];

export const MEMBER_SKILLS = [
  'agility',
  'construction',
  'farming',
  'fletching',
  'herblore',
  'hunter',
  'thieving',
  'slayer'
];

export const F2P_BOSSES = ['obor', 'bryophyta'];

export const COMBAT_SKILLS = ['attack', 'strength', 'defence', 'hitpoints', 'ranged', 'prayer', 'magic'];

export const SKILLS = SKILLS_MAP.map(s => s.key);
export const ACTIVITIES = ACTIVITIES_MAP.map(s => s.key);
export const BOSSES = BOSSES_MAP.map(s => s.key);
export const REAL_SKILLS = SKILLS.filter(s => s !== 'overall');

export const VIRTUAL = VIRTUAL_MAP.map(s => s.key);

export const ALL_METRICS = [...SKILLS, ...ACTIVITIES, ...BOSSES, ...VIRTUAL];
