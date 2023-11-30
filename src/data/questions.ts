const SCIENCE = "SCI";
const HISTORY = "HIS";
const ART_AND_LITERATURE = "ART";
const RELIGION = "REL";
const GEOGRAPHY = "GEO";
const POP_CULTURE = "POP";

export const ALL_CATEGORIES = [
  ART_AND_LITERATURE,
  HISTORY,
  SCIENCE,
  RELIGION,
  GEOGRAPHY,
  POP_CULTURE,
];

export interface Question {
  question: string;
  answer: string;
  fullAnswer?: string;
  url?: string;
  category: string;
}

const questions: Question[] = [
  {
    question: `Born in 1955, this computer programmer and business magnate co-founded a technology company with Paul Allen in 1975. He played a pivotal role in the personal computer revolution and is known for his philanthropic work in global health and education. What is the name of this co-founder of Microsoft?`,
    answer: "Bill Gates",
    category: POP_CULTURE,
  },
  {
    question: `This American author, born in 1809, is celebrated for his gothic tales and mystery stories. His notable works include "The Tell-Tale Heart" and "The Fall of the House of Usher." Known for his macabre style, he is considered a master of the short story and a pioneer of the detective fiction genre. Who is this literary figure associated with dark and eerie tales?`,
    answer: "Poe",
    fullAnswer: "Edgar Allen Poe",
    category: ART_AND_LITERATURE,
  },
  {
    question: `This acclaimed film director, born in 1970, gained recognition for his distinctive visual style and thought-provoking narratives. His films often explore themes of identity, reality, and the human condition. Some of his notable works include "Inception," "The Dark Knight," and "Oppenheimer." Who is this visionary filmmaker known for his mind-bending storytelling?`,
    answer: "Nolan",
    category: POP_CULTURE,
  },
  {
    question: `An American singer-songwriter born in 1941, this influential artist's career spans several decades, and his poetic lyrics have left an indelible mark on the music industry. Some of his classic songs include "Blowin' in the Wind" and "Like a Rolling Stone." Who is this Nobel Prize-winning musician often referred to as the "voice of a generation"?`,
    answer: "Dylan",
    category: ART_AND_LITERATURE,
  },
  {
    question: `This groundbreaking scientist, born in 1564, made significant contributions to the fields of physics, astronomy, and mathematics. His observations with a telescope supported the heliocentric model of the solar system. Who is this Italian polymath, whose discoveries revolutionized our understanding of the cosmos?`,
    answer: "Galileo",
    category: SCIENCE,
  },
  {
    question: `This Japanese filmmaker, born in 1941, is renowned for his visually stunning and emotionally resonant films. His works often explore themes of human nature, environmentalism, and the consequences of modernity. Some of his notable films include "My Neighbor Totoro" and "Spirited Away." Who is this animation maestro and co-founder of Studio Ghibli?`,
    answer: "Miyazaki",
    category: ART_AND_LITERATURE,
  },
  {
    question: `A British scientist born in 1912, this physicist made significant contributions to our understanding of the universe's structure and evolution. His work on black holes and the singularity theorems had a profound impact on theoretical physics. Who is this cosmologist, author of "A Brief History of Time"?`,
    answer: "Hawking",
    category: SCIENCE,
  },
  {
    question: `This American author, born in 1835 under the name Samuel Clemens, is best known for his novels exploring the American South during the 19th century. His works include "The Adventures of Tom Sawyer" and "Adventures of Huckleberry Finn." Who is this literary giant often referred to as the "father of American literature"?`,
    answer: "Twain",
    category: ART_AND_LITERATURE,
  },
  {
    question: `Born in 1743, this Founding Father and polymath played a key role in drafting the United States Bill of Rights and the Declaration of Independence. He also served as the third President of the United States. Who is this American statesman, author, and inventor?`,
    answer: "Jefferson",
    category: HISTORY,
  },
  {
    question: `This Polish scientist, born in 1867, is celebrated for her discovery of radium and polonium, as well as her pioneering research in radioactivity. The first woman to win a Nobel Prize, she remains an inspirational figure in the fields of physics and chemistry. Who is this trailblazing physicist and chemist?`,
    answer: "Curie",
    category: SCIENCE,
  },
  {
    question: `This ancient wonder, located in Greece, was a giant statue representing the Greek god Helios, standing over 30 meters tall. Erected on the island of Rhodes around 280 BCE, it was considered one of the Seven Wonders of the Ancient World. What is the name of this monumental bronze statue?`,
    answer: "Colossus",
    category: HISTORY,
  },
  {
    question: `This influential composer, born in 1770, was a key figure in the transition between the Classical and Romantic eras of music. His compositions, including "Symphony No. 9," "Moonlight Sonata," and "Ode to Joy" have had a lasting impact on classical music. Who is this German composer and pianist?`,
    answer: "Beethoven",
    category: ART_AND_LITERATURE,
  },
];

export default questions;
