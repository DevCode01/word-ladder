#!/usr/bin/env node
/**
 * word-ladder — A Word Ladder (Doublets) puzzle game
 *
 * Transform one word into another by changing one letter at a time,
 * with each intermediate step being a valid word.
 *
 * Usage: node word-ladder.js [start end]
 *        If no args, random puzzle is generated.
 */

const WORDS = [
  // 500+ common 4-letter words for good graph connectivity
  "also","able","acid","aged","aide","ante","arch","area","arms","army",
  "aunt","auto","avid","axed","back","bait","bake","bald","bale","ball",
  "band","bane","bank","bare","bark","barn","base","bath","bead","beak",
  "beam","bear","beat","beef","been","beer","bell","belt","bend","bent",
  "best","bias","bike","bill","bind","bird","bite","bled","blew","blob",
  "blot","blow","blue","blur","boar","boat","body","bold","bolt","bomb",
  "bond","bone","book","boom","boot","bore","born","boss","both","bowl",
  "burn","bury","bush","busy","cage","cake","calf","call","calm","came",
  "camp","cane","cape","card","care","cart","case","cash","cast","cave",
  "cell","chat","chef","chin","chip","chop","cite","city","clad","clam",
  "clan","clap","claw","clay","clip","clog","club","clue","coal","coat",
  "code","coil","coin","cold","colt","comb","come","cone","cook","cool",
  "cope","copy","cord","core","cork","corn","cost","cosy","coup","cove",
  "cozy","crab","crew","crib","crop","crow","cube","cult","curb","cure",
  "curl","cute","dame","damp","dare","dark","darn","dart","dash","data",
  "dawn","dead","deaf","deal","dear","debt","deck","deep","deer","demo",
  "dent","deny","desk","dial","dice","died","diet","dime","dine","dire",
  "dirt","disc","dish","disk","dock","does","dome","done","doom","door",
  "dose","dove","down","doze","drab","drag","draw","drew","drip","drop",
  "drum","dual","dude","duel","dull","dumb","dump","dune","dunk","dusk",
  "dust","duty","each","ease","east","easy","edge","edit","else","emit",
  "ends","epic","even","ever","evil","exam","exit","face","fact","fade",
  "fail","fair","fake","fall","fame","fang","fare","farm","fast","fate",
  "fawn","fear","feat","feed","feel","fell","felt","fern","file","fill",
  "film","find","fine","fire","firm","fish","fist","five","flag","flap",
  "flat","flea","fled","flew","flex","flip","flit","flog","flow","foam",
  "foil","fold","folk","fond","font","food","fool","foot","ford","fore",
  "fork","form","fort","foul","four","fowl","free","from","fuel","full",
  "fume","fund","fuse","fuss","gain","gait","gale","gall","game","gang",
  "gape","garb","gate","gave","gaze","gear","gene","gift","gild","gilt",
  "girl","give","glad","glow","glue","gnat","goat","goes","gold","golf",
  "gone","good","gore","grab","grad","gram","gray","grew","grid","grim",
  "grin","grip","grit","grow","gulf","gull","gulp","guru","gust","guts",
  "hack","hail","hair","hale","half","hall","halt","hand","hang","hard",
  "hare","harm","harp","hash","haste","hate","haul","have","hawk","haze",
  "hazy","head","heal","heap","hear","heat","heed","heel","heir","held",
  "hell","helm","help","herb","herd","here","hero","hide","high","hike",
  "hill","hilt","hind","hint","hire","hiss","hive","hold","hole","holy",
  "home","hone","hood","hook","hope","horn","hose","host","hour","howl",
  "huge","hull","hump","hung","hunt","hurt","hush","icon","idea","inch",
  "into","iron","isle","item","jack","jail","jazz","jean","jerk","jest",
  "joke","jolt","jury","keen","keep","kept","kick","kill","kind","king",
  "kiss","kite","knit","knob","knot","know","lace","lack","lady","laid",
  "lake","lamb","lame","lamp","land","lane","lark","lash","lass","last",
  "late","lawn","lead","leaf","leak","lean","leap","left","lend","lens",
  "less","liar","lick","life","lift","like","limb","lime","limp","line",
  "link","lint","lion","list","live","load","loaf","loan","lock","loft",
  "logo","lone","long","look","loop","loose","lord","lore","lose","loss",
  "lost","loud","love","luck","lull","lump","lung","lure","lurk","lust",
  "made","maid","mail","main","make","male","mall","malt","mane","many",
  "mare","mark","mash","mask","mass","mast","mate","maze","mead","meal",
  "mean","meat","meet","melt","memo","mend","menu","mere","mesh","mess",
  "mild","mile","milk","mill","mime","mind","mine","mint","miss","mist",
  "moan","moat","mock","mode","mold","mole","molt","monk","mood","moon",
  "moor","more","moss","most","moth","move","much","muck","mule","mull",
  "muse","mush","must","mute","myth","nail","name","nape","narrow","navy",
  "near","neat","neck","need","nest","next","nice","nine","node","none",
  "noon","norm","nose","note","noun","nude","numb","obey","odds","odes",
  "ogle","oils","oily","oink","okay","omen","omit","once","only","onto",
  "ooze","open","oral","orca","oven","over","pace","pack","page","paid",
  "pail","pain","pair","pale","palm","pane","pang","park","part","pass",
  "past","path","pave","peak","peal","pear","peat","peck","peel","peer",
  "pelt","pend","perk","pest","pick","pier","pike","pile","pill","pine",
  "pink","pipe","pity","plan","play","plea","plod","plot","ploy","plug",
  "plum","plus","poem","poet","poke","pole","poll","polo","pond","pony",
  "pool","poor","pope","pore","pork","port","pose","post","pour","pray",
  "prep","prey","prop","pull","pulp","pump","punk","pure","purr","push",
  "quit","quiz","race","rack","raft","rage","raid","rail","rain","rake",
  "ramp","rang","rank","rant","rare","rash","rate","rave","read","real",
  "reap","rear","reef","reek","reel","rein","rely","rend","rent","rest",
  "rich","ride","rift","right","rigid","ring","riot","rise","risk","rite",
  "road","roam","roar","robe","rock","rode","role","roll","romp","roof",
  "room","root","rope","rose","rosy","rota","rote","rout","roam","rude",
  "ruin","rule","rung","ruse","rush","rust","sack","safe","saga","sage",
  "said","sail","sake","sale","salt","same","sand","sane","sang","sank",
  "save","scab","scam","scan","scar","seal","seam","sear","seat","seed",
  "seek","seem","seen","self","sell","send","sent","shed","shin","ship",
  "shoe","shoo","shop","shot","shut","sick","side","sift","sigh","sign",
  "silk","sill","silt","sing","sink","sire","site","size","skid","skim",
  "skin","skip","slab","slag","slam","slap","slat","slay","sled","slew",
  "slid","slim","slip","slit","slob","slop","slot","slow","slug","slum",
  "slur","smog","snap","snip","snob","snow","snub","snug","soak","soap",
  "soar","sock","soda","sofa","soft","soil","sold","sole","some","song",
  "soon","soot","sore","sort","soul","sour","sown","span","spar","spec",
  "sped","spin","spit","spot","spry","spur","stab","stag","star","stay",
  "stem","step","stew","stir","stop","stub","stud","stun","such","suit",
  "sumo","sung","sunk","sure","surf","swan","swap","swim","swirl","tabs",
  "tack","tact","tail","take","tale","talk","tall","tame","tang","tank",
  "tape","taps","tarn","tart","task","taxi","teach","team","tear","tell",
  "temp","tend","tent","term","test","text","than","that","them","then",
  "they","thin","this","thus","tick","tide","tidy","tied","tier","tile",
  "till","tilt","time","tint","tiny","tire","toad","toil","told","toll",
  "tomb","tone","took","tool","tops","tore","torn","toss","tour","town",
  "trap","tray","tree","trek","trim","trio","trip","trod","trot","true",
  "tuba","tube","tuck","tuft","tune","turf","turn","tusk","twin","twig",
  "type","ugly","undo","unit","unto","upon","urge","used","user","vain",
  "vale","vamp","vane","vary","vast","veal","veer","veil","vein","vent",
  "verb","very","vest","veto","vice","view","vine","void","volt","vote",
  "vows","wade","wage","wail","wait","wake","walk","wall","wand","want",
  "ward","warm","warn","warp","wart","wary","wash","wasp","wave","wavy",
  "waxy","weak","wean","wear","weed","week","weep","weld","well","went",
  "were","west","what","when","whim","whip","whom","wick","wide","wife",
  "wild","will","wilt","wily","wimp","wind","wine","wing","wink","wipe",
  "wire","wise","wish","with","woke","wolf","womb","wood","wool","word",
  "wore","work","worm","worn","worse","worst","wrap","wren","yank","yard",
  "yarn","year","yell","yoga","yoke","your","zeal","zero","zest","zone",
  "zoom"
];

// Remove any entries with commas (typos in my list)
const WORD_SET = new Set(WORDS.filter(w => /^[a-z]{4}$/.test(w)));

/** Check if two words differ by exactly one letter */
function oneLetterApart(a, b) {
  let diff = 0;
  for (let i = 0; i < 4; i++) {
    if (a[i] !== b[i]) diff++;
    if (diff > 1) return false;
  }
  return diff === 1;
}

/** BFS shortest path from start to end */
function solve(start, end) {
  if (start === end) return [start];
  const visited = new Set([start]);
  const prev = new Map();
  const queue = [start];
  while (queue.length > 0) {
    const curr = queue.shift();
    for (const w of WORD_SET) {
      if (!visited.has(w) && oneLetterApart(curr, w)) {
        visited.add(w);
        prev.set(w, curr);
        if (w === end) {
          // Reconstruct path
          const path = [end];
          let node = end;
          while (node !== start) {
            node = prev.get(node);
            path.unshift(node);
          }
          return path;
        }
        queue.push(w);
      }
    }
  }
  return null; // No solution
}

/** Generate a random puzzle with a solution */
function generatePuzzle() {
  const words = [...WORD_SET];
  const start = words[Math.floor(Math.random() * words.length)];
  // Try to find a reachable word at least 3 steps away
  for (let attempt = 0; attempt < 500; attempt++) {
    const end = words[Math.floor(Math.random() * words.length)];
    if (start === end) continue;
    const path = solve(start, end);
    if (path && path.length >= 4) return { start, end, solution: path };
  }
  // Fallback: if we can't find a long enough path, just return one
  for (let attempt = 0; attempt < 500; attempt++) {
    const end = words[Math.floor(Math.random() * words.length)];
    if (start === end) continue;
    const path = solve(start, end);
    if (path) return { start, end, solution: path };
  }
  return null;
}

// ─── Terminal UI ──────────────────────────────────────────

const BOLD = '\x1b[1m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const RED = '\x1b[31m';
const MAGENTA = '\x1b[35m';
const RESET = '\x1b[0m';
const CLR = '\x1b[2J\x1b[H';

function colorDiff(prevWord, currWord) {
  let out = '';
  for (let i = 0; i < 4; i++) {
    if (currWord[i] !== prevWord[i]) {
      out += YELLOW + currWord[i].toUpperCase() + RESET;
    } else {
      out += currWord[i];
    }
  }
  return out;
}

function printLadder(ladder, target) {
  console.log(`\n  ${BOLD}Ladder:${RESET}`);
  ladder.forEach((w, i) => {
    const prefix = i === 0 ? '    ' : '    → ';
    const color = w === target ? GREEN : '';
    if (i === 0) {
      console.log(`  ${i + 1}. ${CYAN}${w}${RESET}`);
    } else {
      console.log(`  ${i + 1}. ${prefix}${color}${colorDiff(ladder[i - 1], w)}${RESET}`);
    }
  });
}

function showControls() {
  console.log(`\n  ${BOLD}Commands:${RESET} /hint  /solve  /new  /quit`);
}

// ─── Game Loop ────────────────────────────────────────────

const readline = require('readline');

async function playGame(startWord, endWord) {
  const puzzle = generatePuzzle();
  if (!puzzle) {
    console.log('Could not generate puzzle. Try again.');
    return;
  }

  let { start, end, solution } = puzzle;
  // Override if user provided words
  if (startWord && endWord) {
    start = startWord.toLowerCase();
    end = endWord.toLowerCase();
    const sol = solve(start, end);
    if (!sol) {
      console.log(`${RED}No possible ladder between "${start}" and "${end}".${RESET}`);
      console.log('Starting with random puzzle instead.');
      return playGame();
    }
    solution = sol;
  }

  const ladder = [start];
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  let usedHint = false;

  const prompt = () => {
    console.log(CLR + BOLD + '╔════════════════════════════╗' + RESET);
    console.log(BOLD + '║   WORD LADDER (Doublets)   ║' + RESET);
    console.log(BOLD + '╚════════════════════════════╝' + RESET);
    console.log(`\n  ${BOLD}Goal:${RESET} Turn ${CYAN}${start}${RESET} → ${GREEN}${end}${RESET}`);
    console.log(`  ${BOLD}Steps so far:${RESET} ${ladder.length - 1}`);
    if (usedHint) {
      console.log(`  ${YELLOW}Optimal: ${solution.length - 1} steps${RESET}`);
    }
    printLadder(ladder, end);
    showControls();
    rl.question(`\n  ${BOLD}Your word >${RESET} `, handleInput);
  };

  const handleInput = (input) => {
    const cmd = input.trim().toLowerCase();

    if (cmd === '/quit') {
      console.log('\n  Thanks for playing!\n');
      rl.close();
      return;
    }

    if (cmd === '/new') {
      rl.close();
      return playGame();
    }

    if (cmd === '/hint') {
      usedHint = true;
      const curr = ladder[ladder.length - 1];
      const idx = solution.indexOf(curr);
      if (idx >= 0 && idx < solution.length - 1) {
        const next = solution[idx + 1];
        console.log(`\n  ${YELLOW}Hint: Try → ${GREEN}${next}${RESET}`);
      } else {
        console.log(`\n  ${RED}No hint available (you may have deviated from optimal path).${RESET}`);
      }
      rl.question(`\n  ${BOLD}Your word >${RESET} `, handleInput);
      return;
    }

    if (cmd === '/solve') {
      usedHint = true;
      console.log(`\n  ${BOLD}Optimal solution (${solution.length - 1} steps):${RESET}`);
      solution.forEach((w, i) => {
        if (i === 0) console.log(`    ${CYAN}${w}${RESET}`);
        else console.log(`    → ${colorDiff(solution[i - 1], w)}`);
      });
      rl.question(`\n  ${BOLD}Your word >${RESET} `, handleInput);
      return;
    }

    const word = cmd;
    if (!/^[a-z]{4}$/.test(word)) {
      console.log(`\n  ${RED}Please enter a 4-letter word.${RESET}`);
      rl.question(`\n  ${BOLD}Your word >${RESET} `, handleInput);
      return;
    }

    if (!WORD_SET.has(word)) {
      console.log(`\n  ${RED}"${word}" is not in the dictionary.${RESET}`);
      rl.question(`\n  ${BOLD}Your word >${RESET} `, handleInput);
      return;
    }

    const last = ladder[ladder.length - 1];
    if (!oneLetterApart(last, word)) {
      console.log(`\n  ${RED}"${word}" differs by more than one letter from "${last}".${RESET}`);
      rl.question(`\n  ${BOLD}Your word >${RESET} `, handleInput);
      return;
    }

    if (ladder.includes(word)) {
      console.log(`\n  ${RED}"${word}" is already in your ladder.${RESET}`);
      rl.question(`\n  ${BOLD}Your word >${RESET} `, handleInput);
      return;
    }

    ladder.push(word);

    if (word === end) {
      console.log(CLR);
      console.log(`  ${GREEN}${BOLD}Congratulations!${RESET}`);
      console.log(`  You solved it in ${BOLD}${ladder.length - 1}${RESET} steps.`);
      if (usedHint) {
        console.log(`  (Optimal: ${solution.length - 1} steps)`);
      }
      printLadder(ladder, end);
      console.log('\n');
      rl.question(`  ${BOLD}Play again?${RESET} (y/n) > `, (ans) => {
        if (ans.toLowerCase().startsWith('y')) {
          rl.close();
          return playGame();
        }
        console.log('  Thanks for playing!\n');
        rl.close();
      });
      return;
    }

    prompt();
  };

  prompt();
}

// ─── Main ──────────────────────────────────────────────────

const args = process.argv.slice(2);
if (args.length === 2) {
  playGame(args[0], args[1]);
} else if (args.length > 0) {
  console.log('Usage: node word-ladder.js [start end]');
  console.log('       If no arguments, a random puzzle is generated.');
  process.exit(1);
} else {
  playGame();
}
