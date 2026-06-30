# Word Ladder

A terminal-based Word Ladder (Doublets) puzzle game in Node.js.

Transform one word into another by changing a single letter at a time, with each intermediate step being a valid word.

## Features

- **Random puzzles** — automatically generated pairs with a guaranteed solution
- **Custom challenges** — specify your own start and end words
- **BFS solver** — finds the optimal (shortest) solution
- **Interactive hints** — see the next best move when stuck
- **Full solution display** — reveals the entire optimal path
- **ANSI-colored terminal UI** — highlights changed letters in each step

## How to Play

**The puzzle**: Turn the start word into the end word by changing exactly one letter at a time. Every word in between must be a real 4-letter word.

**Example**: `COLD` → `CORD` → `CARD` → `WARD` → `WARM`

### Usage

```bash
# Random puzzle
node word-ladder.js

# Custom challenge
node word-ladder.js cold warm
```

### Controls

| Command | Action |
|---------|--------|
| *word* | Enter a 4-letter word as your next step |
| `/hint` | Show the next optimal move |
| `/solve` | Reveal the full optimal solution |
| `/new` | Start a new random puzzle |
| `/quit` | Exit the game |

## Requirements

- [Node.js](https://nodejs.org/) v18 or later

No external dependencies — uses only built-in `readline` module.

## Word List

Includes 1000+ common 4-letter English words. The word graph is well-connected: ~90% of words belong to the largest connected component, ensuring most random pairs have a valid ladder.

## Author

DevCode01
