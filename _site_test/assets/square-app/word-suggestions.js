/**
 * word-suggestions.js — themed word pools for the generator.
 *
 * Curated word lists organized by theme. Visitors who don't want to
 * think can pick a theme and get four words; or roll one quadrant at a
 * time. Lists are broad and human — values, places, people, moods,
 * simple things.
 */

export const WORD_THEMES = {
  values: [
    "peace","power","planet","people","truth","beauty","good","love",
    "hope","grit","luck","time","faith","family","friends","future",
    "calm","focus","craft","care","trust","courage","kindness","wonder",
    "honesty","mercy","justice","joy","duty","freedom","loyalty","grace",
  ],
  practice: [
    "rest","read","run","write","walk","talk","listen","wait",
    "build","ship","learn","play","draw","sing","dance","cook",
    "make","mend","tend","try","sleep","stretch","study","teach",
    "wake","work","train","share","clean","plant","carry","help",
  ],
  nature: [
    "sky","sea","sand","sun","moon","star","tree","stone",
    "river","mountain","forest","field","wave","wind","fire","earth",
    "rain","snow","light","dark","root","seed","leaf","branch",
    "north","south","east","west","tide","cloud","dawn","dusk",
  ],
  loves: [
    "mom","dad","sis","bro","gran","papa","mama","baba",
    "friend","love","home","city","town","crew","band","team",
    "dog","cat","bird","plant","kid","baby","partner","mentor",
  ],
  moods: [
    "wild","quiet","slow","deep","soft","loud","still","sharp",
    "bright","dark","warm","cool","brave","kind","strange","simple",
    "open","light","heavy","tender","fierce","tired","awake","alive",
  ],
  intentions: [
    "now","then","later","still","yes","no","maybe","always",
    "more","less","again","here","there","this","that",
    "go","stay","wait","begin","try","do","done","next",
    "look","see","know","be","grow","return","let",
  ],
  questions: [
    "who","what","when","where","why","how","which","whose",
    "us","them","me","you","one","many","some","each",
  ],
};

export const THEME_LABELS = {
  values: "Values",
  practice: "Practice",
  nature: "Nature",
  loves: "Loves",
  moods: "Moods",
  intentions: "Intentions",
  questions: "Questions",
};

/** Pick 4 unique words from a theme. */
export function pickFourFromTheme(theme) {
  const pool = [...(WORD_THEMES[theme] || [])];
  const out = [];
  for (let i = 0; i < 4 && pool.length; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    const word = pool[idx];
    out.push(word);
    for (let j = pool.length - 1; j >= 0; j--) {
      if (pool[j] === word) pool.splice(j, 1);
    }
  }
  while (out.length < 4) out.push("");
  return out;
}

/** Pick a single word from a theme. */
export function pickOneFromTheme(theme) {
  const pool = WORD_THEMES[theme] || [];
  return pool[Math.floor(Math.random() * pool.length)];
}

if (typeof window !== "undefined") {
  window.WordSuggestions = { WORD_THEMES, THEME_LABELS, pickFourFromTheme, pickOneFromTheme };
}
