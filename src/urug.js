const vowels = ["a", "e", "i", "o", "u", "y"];
const vowelSounds = [
  ...vowels,
  "ai",
  "au",
  "ay",
  "ea",
  "ee",
  "ei",
  "eu",
  "ey",
  "ie",
  "oa",
  "oe",
  "oi",
  "oo",
  "ou",
  "ow",
  "ue",
  "ui",
]

const onsets = [
  ['b', 'bl', 'br'],
  ['c', 'ch', 'cl', 'cr'],
  ['d', 'dr', 'dw'],
  ['f', 'fl', 'fr'],
  ['g', 'gl', 'gr'],
  ['h'],
  ['j'],
  ['k', 'kn'],
  ['l'],
  ['m'],
  ['n'],
  ['p', 'ph', 'pl', 'pr', 'ps', 'pt'],
  ['qu'],
  ['r', 'wr'],
  ['s', 'sc', 'scr', 'sh', 'shr', 'sk', 'sl', 'sm', 'sn', 'sp', 'spl', 'spr', 'squ', 'sr', 'st', 'str', 'sw'],
  ['t', 'th', 'tr', 'tw', 'thr'],
  ['v', 'vl', 'vr'],
  ['w', 'wh'],
  ['y'],
  ['z']
];

const startingOnsets = [
  'gn',
  'ps',
  'pt',
  'tm',
  'dj',
  'kh',
  'zh',
  'pn',
  'mb',
  'bh',
  'ts', 
];

const codas = [
  ['b', 'bd', 'bs', 'bt'],
  ['c', 'ck', 'ct', 'chs'],
  ['d', 'ds',],
  ['f', 'ft'],
  ['g', 'gg', 'gs', 'gn', 'gue', 'ght'],
  ['k', 'ks'],
  ['l', 'ld', 'lf', 'lk', 'lm', 'lp', 'lt', 'lv', 'ls'],
  ['m', 'mb', 'mp'],
  ['n', 'mn', 'nd', 'ng', 'ln', 'nt'],
  ['p', 'pt', 'ps'],
  ['r', 'rd', 'rf', 'rg', 'rk', 'rm', 'rn', 'rp', 'rs', 'rt', 'rv', 'rz'],
  ['s', 'sh', 'sk', 'sp', 'st', 'sc'],
  ['t', 'ts', 'tch'],
  ['v'],
  ['x'],
  ['y'],
  ['z', 'zz'],
  ['dge'], 
  ['tion'],
  ['sion'],
];

const finisherCodas = [
  'ps',  
  'pt', 
  'rh', 
  'que', 
  'eau', 
  'ch',
  'xe',
  'zh',
];





// const phonems = [
//   ["b", "bl", "br", "by", "bi"],
//   ["c", "ch", "cl", "cr", "cy"],
//   ["d", "dl", "dr", "dy", "di"],
//   ["f", "fl", "fr"],
//   ["g", "gh", "gl", "gn", "gr", "gy", "gu"],
//   ["h", "hy"],
//   ["j", "jh"],
//   ["k", "kh", "kl", "kn", "kr"],
//   ["l", "ll", "ly", "li"],
//   ["m", "my", "mi"],
//   ["n", "ny", "ni"],
//   ["p", "ph", "pl", "pn", "pr", "ps"],
//   ["qu"],
//   ["r", "rr", "ry"],
//   ["s", "sh", "sk", "sl", "sm", "sn", "sp", "squ", "st", "sv", "sw", "si"],
//   ["t", "th", "tl", "tr", "ts", "tw", "ti"],
//   ["v", "vl", "vr", "vi"],
//   ["w", "wh", "wl", "wr"],
//   ["x", "xi"],
//   ["y"],
//   ["z", "zh", "zl", "zn"]
// ];

// const finishers = [
//   ["b", "bc", "bl", "br", "bs", "bt", "by", "bz"],
//   ["c", "cc", "ck", "cs", "ct", "cz"],
//   ["d", "ds", "dy", "dz"],
//   ["f", "fk", "ft", "fy", "fz"],
//   ["g", "gs", "gt", "gy"],
//   ["k", "ks", "kt"],
//   ["l", "ld", "lf", "lk", "ll", "lm", "ln", "lp", "lr", "ls", "lt", "lz"],
//   ["m", "mb", "md", "mk", "mn", "mp", "mt", "ms", "mz"],
//   ["n", "nb", "nd", "nk", "np", "nt", "ns"],
//   ["p", "pl", "pr", "ps", "pt", "pz"],
//   ["r", "rb", "rd", "rf", "rk", "rl", "rm", "rn", "rr", "rs", "rt", "rx", "ry", "rz"],
//   ["s", "sb", "sc", "sd", "sh", "sk", "sm", "sn", "sp", "ss", "st", "sw"],
//   ["t", "ts"],
//   ["v", "vs"],
//   ["w", "ws"],
//   ["x"],
//   ["y", "yd", "ys", "yl"],
//   ["z", "zt"]
// ];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomOnset(start, length = 5) {
  if(length <= 0) return ''
  let onsetsC = []
  if (start) {
    onsetsC = [...onsets, startingOnsets]
  } else {
    onsetsC = [...onsets]
  }
  const randlen = Math.floor(Math.random() * 3) + 1
  onsetsC = onsetsC.map(v => v.filter(c => length >= randlen ? c.length === randlen : c.length === length)).filter(v => v.length > 0)

  const on = getRandomItem(onsetsC)
  const onset = getRandomItem(on)
  return onset
}

function getRandomCoda(length = 5) {
  if(length <= 0) return ''
  let codasC = []
  const randlen = Math.floor(Math.random() * 4) + 1
  if (length - randlen <= 0) {
    codasC = [...codas, finisherCodas]
  } else {
    codasC = [...codas]
  }

  codasC = codasC.map(v => v.filter(c => length >= randlen ? c.length === randlen : c.length === length)).filter(v => v.length > 0)


  let co = getRandomItem(codasC)
  let coda = getRandomItem(co)
  return coda
}

function getRandomVowelS(lastStr, length = 5) {
  if(length <= 0) return ''
  let cvowels = [...vowelSounds]
  
  if (lastStr == '') {
    cvowels = cvowels.filter(v => v !== 'y')
  }

  const randlen = Math.floor(Math.random() * 2) + 1

  cvowels.filter(c => length >= randlen ? c.length === randlen : c.length === length).filter(v => v.length > 0)


  const v = getRandomItem(cvowels)
  return getRandomItem(v)
}

export function createSyllable(laststr, stype, length) {
  let syllable = "";

  switch (stype) {
    case 1: { // CV
      const c = getRandomOnset(!laststr, length);
      length -= c?.length
      const v = getRandomVowelS(laststr, length);
      length -= v?.length
      syllable = c + v;
      break;
    }
    case 2: { // CVF
      const c = getRandomOnset(!laststr, length);
      length -= c?.length
      const v = getRandomVowelS(laststr, length);
      length -= v?.length
      const f = getRandomCoda(length);
      length -= f?.length
      syllable = c + v + f;
      break;
    }
    case 3: { // VF
      const v = getRandomVowelS(laststr, length);
      length -= v?.length
      const f = getRandomCoda(length);
      length -= f?.length
      syllable = v + f;
      break;
    }
    case 4: { // V
      const v = getRandomVowelS(laststr, length);
      length -= v?.length
      syllable = v;
      break;
    }
  }

  return syllable;
}

export function generate(length) {
  let name = "";

  // for (let i = 0; i < length; i++) {
  //   const stype = Math.floor(Math.random() * 4) + 1;
  //   const lastS = i+1 === length
  //   name += createSyllable(name, stype, lastS);
  // }

  while (length > 0) {
    let types = [
      {type: 1, value: 2},
      {type: 2, value: 3},
      {type: 3, value: 2},
      {type: 4, value: 1}
    ]

    if (length < 3) {
      types = types.filter( v => v.value <= length)
    }

    const rType = getRandomItem(types);
    
    const syll = createSyllable(name, rType.type, length)
    length -= syll.length
    
    name += syll

    // console.log(rType)
  }

  return name;
}

