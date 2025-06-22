const vowels = ["a", "e", "i", "o", "u", "y"];

const phonems = [
  ["b", "bl", "br", "by", "bi"],
  ["c", "ch", "cl", "cr", "cy"],
  ["d", "dl", "dr", "dy", "di"],
  ["f", "fl", "fr"],
  ["g", "gh", "gl", "gn", "gr", "gy", "gu"],
  ["h", "hy"],
  ["j", "jh"],
  ["k", "kh", "kl", "kn", "kr"],
  ["l", "ll", "ly", "li"],
  ["m", "my", "mi"],
  ["n", "ny", "ni"],
  ["p", "ph", "pl", "pn", "pr", "ps"],
  ["qu"],
  ["r", "rr", "ry"],
  ["s", "sh", "sk", "sl", "sm", "sn", "sp", "squ", "st", "sv", "sw", "si"],
  ["t", "th", "tl", "tr", "ts", "tw", "ti"],
  ["v", "vl", "vr", "vi"],
  ["w", "wh", "wl", "wr"],
  ["x", "xi"],
  ["y"],
  ["z", "zh", "zl", "zn"]
];

const finishers = [
  ["b", "bc", "bl", "br", "bs", "bt", "by", "bz"],
  ["c", "cc", "ck", "cs", "ct", "cz"],
  ["d", "ds", "dy", "dz"],
  ["f", "fk", "ft", "fy", "fz"],
  ["g", "gs", "gt", "gy"],
  ["k", "ks", "kt"],
  ["l", "ld", "lf", "lk", "ll", "lm", "ln", "lp", "lr", "ls", "lt", "lz"],
  ["m", "mb", "md", "mk", "mn", "mp", "mt", "ms", "mz"],
  ["n", "nb", "nd", "nk", "np", "nt", "ns"],
  ["p", "pl", "pr", "ps", "pt", "pz"],
  ["r", "rb", "rd", "rf", "rk", "rl", "rm", "rn", "rr", "rs", "rt", "rx", "ry", "rz"],
  ["s", "sb", "sc", "sd", "sh", "sk", "sm", "sn", "sp", "ss", "st", "sw"],
  ["t", "ts"],
  ["v", "vs"],
  ["w", "ws"],
  ["x"],
  ["y", "yd", "ys", "yl"],
  ["z", "zt"]
];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function createRandomConsonant() {
  const ph = getRandomItem(phonems);
  return getRandomItem(ph);
}

function createRandomFinisher() {
  const fr = getRandomItem(finishers);
  return getRandomItem(fr);
}

function createRandomVowel(prev, vowely = true) {
  let cvowels = [...vowels];
  
  if (prev && prev.length > 0) {
    const lastc = prev[prev.length - 1];
    if (lastc === "y" || lastc === "i") {
      cvowels = cvowels.filter(v => v !== "y" && v !== "i");
    } else if (lastc === "u") {
      cvowels = cvowels.filter(v => v !== "y" && v !== "u");
    } else if (!vowely) {
      cvowels = cvowels.filter(v => v !== "y");
    }
  } else {
    cvowels = cvowels.filter(v => v !== "y");
  }

  return getRandomItem(cvowels);
}

export function createSyllable(lastc, stype) {
  let syllable = "";

  switch (stype) {
    case 1: { // CV
      const c = createRandomConsonant();
      const v = createRandomVowel(c);
      syllable = c + v;
      break;
    }
    case 2: { // CVF
      const c = createRandomConsonant();
      const v = createRandomVowel(c, false);
      const f = createRandomFinisher();
      syllable = c + v + f;
      break;
    }
    case 3: { // VF
      const v = createRandomVowel(lastc, false);
      const f = createRandomFinisher();
      syllable = v + f;
      break;
    }
    case 4: { // VCV
      const v = createRandomVowel(lastc);
      const c = createRandomConsonant();
      const v2 = createRandomVowel(c);
      syllable = v + c + v2;
      break;
    }
  }

  return syllable;
}

export function generate(length) {
  let name = "";

  for (let i = 0; i < length; i++) {
    const stype = Math.floor(Math.random() * 4) + 1;
    name += createSyllable(name, stype);
  }

  return name;
}

