#!/usr/bin/env node
/**
 * word-ladder — A Word Ladder (Doublets) puzzle game
 *
 * Transform one word into another by changing one letter at a time,
 * with each intermediate step being a valid word.
 */

const WORDS = ["also","able","acid","aged","aide","ante","arch","area","arms"];

const WORD_SET = new Set(WORDS);

function oneLetterApart(a, b) {
  let diff = 0;
  for (let i = 0; i < 4; i++) {
    if (a[i] !== b[i]) diff++;
    if (diff > 1) return false;
  }
  return diff === 1;
}

console.log('Word Ladder — coming soon!');
