const praises = [
  "Wow",
  "Awesome",
  "Beautiful",
  "Unstoppable",
  "Yay",
  "Killing it",
  "There you go",
  "Bravo",
  "Terrific",
  "Exceptional",
  "Breathtaking",
  "Wonderful",
  "You Son/Daughter of a gun",
  "Excellent",
  "Superb",
  "Dynamite",
  "How clever",
  "You are phenomenal",
  "What a gem you are",
  "You deserve a star",
  "You deserve a kiss",
];

const motivational = [
  "Hang in there",
  "Don't give up",
  "Keep pushing",
  "Stay strong",
  "Keep fighting",
  "Never say 'die'",
  "Remain focused",
  "Be relentless",
  "Dust yourself and continue",
  "That, my friend is the walk of life"

]

function getPraisePhrase() {
    const phraseIndex = Math.floor(Math.random() * praises.length);
    return praises[phraseIndex];
}
function getMotivationalPhrase() {
    const phraseIndex = Math.floor(Math.random() * motivational.length);
    return motivational[phraseIndex];
}


export { getPraisePhrase, getMotivationalPhrase };
