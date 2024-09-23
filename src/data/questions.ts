export type Category = "SCI" | "HIS" | "ART" | "REL" | "GEO" | "POP" | string;

const SCIENCE = "SCI";
const HISTORY = "HIS";
const ART_AND_LITERATURE = "ART";
const RELIGION = "REL";
const GEOGRAPHY = "GEO";
const POP_CULTURE = "POP";

export const ALL_CATEGORIES: Category[] = [
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
  altAnswer?: string[];
  addOns?: string[];
  url?: string;
  category: Category;
}

export interface MondoDBQuestion {
  _id: { $numberInt: string };
  questions: Question[];
}

export const mongoDBQuestions: MondoDBQuestion[] = [
  {
    _id: { $numberInt: "20231217" },
    questions: [
      {
        question: `This country celebrates its Independence Day annually on August 15. In 2023, this country had an estimated GDP (PPP) of $13 trillion. The national flower for this country is the lotus and the national fruit is the mango. Occupying approximately 1.3mil sq mi, this country located in South Asia has an estimated population of around 1.4 billion. For five points, name this country with where the Ganges river flows and the capital is New Delhi.`,
        answer: "India",
        category: GEOGRAPHY,
      },
      {
        question: `This American singer, songwriter, and actress married and then divorced Dalton Gomez. According to the RIAA, all of this woman’s studio albums are certified platinum or higher. She rose to fame for playing Cat Valentine in the Nickelodeon television series Victorious and has released popular albums such as “Thank U, Next.” For five points, name this woman whose last name is a Starbucks drink size.`,
        answer: "Ariana Grande",
        category: POP_CULTURE,
      },
      {
        question: `This statesman succeeded Benjamin Franklin in 1785 as Minister to France. This prominent Founding Father is featured on the $2 bill and died on July 4th, 1826 at his home in Monticello. As a Democratic-Republican politician, this man served as Secretary of State under Washington and Vice President under John Adams. For five points, name this third US President who authored the Declaration of Independence.`,
        answer: "Jefferson",
        fullAnswer: "Thomas Jefferson",
        category: HISTORY,
      },
    ],
  },
];

// console.log(JSON.stringify(mongoDBQuestions));

const questions: Question[] = [
  {
    question: `In a novel by this author, the title character takes over Merlin's position by predicting an eclipse. Hank Morgan is a creation of this man, who wrote about the deceitful Duke and Dauphin and a boy who tricks children in St Petersburg, Missouri into whitewashing a fence. A Connecticut Yankee in King Arthur's Court and a novel about a boy who rafts down the Mississippi River are by, for the point, what creator of Huck Finn and Tom Sawyer?`,
    answer: "Mark Twain",
    altAnswer: ["Twain", "Clemens", "Sam Clemens", "Samuel Clemens"],
    url: "https://files.quizbowlpackets.com/1823/Round%201.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `This force is related to an accelerating observer by the Equivalence Principle of general relativity. Its fields can be visualized as wells, which spacecraft can use to speed up using this force as a "slingshot." Galileo demonstrated that the effects of this force are constant using two balls of different masses. For the point, tenname this force that accelerates objects at 9.81 meters per second squared toward the Earth.`,
    answer: "gravity",
    url: "https://files.quizbowlpackets.com/1823/Round%201.pdf",
    category: SCIENCE,
  },
  {
    question: `This political party's primary office was organized by Martin Bormann, the private secretary of its leader. Kurt Georg Kiesinger led the Christian Democrats and served as Chancellor in the 1960s despite his former membership in this political party. The SS and SA were paramilitary wings of this party, whose propaganda was organized by Joseph Goebbels. For the point, name this socialist political party that ruled the Third Reich of Germany under Adolf Hitler.`,
    answer: "Nazi",
    altAnswer: [
      "Nazi Party",
      "Nazi Germany",
      "Nazis",
      "The Nazis",
      "National Socialist German Workers",
      "National Socialist German Workers Party",
      "National Socialist",
      "National Socialist Party",
      "NSDAP",
    ],
    url: "https://files.quizbowlpackets.com/1823/Round%201.pdf",
    category: HISTORY,
  },
  {
    question: `For one work in this genre, Michel Fokine planned for three puppets on a wall to come to life. Prince Ivan spares a magical bird in another of these works that was produced by Sergei Diaghilev.  Igor Stravinsky's Petrushka and The Firebird are examples of, for the point, what genre of artistic dance that combines classical music with challenging choreography, often incorporating moves like jet´es [zheh-tays] and pli´es [plee-ays]?`,
    answer: "ballet",
    altAnswer: ["ballets"],
    url: "https://files.quizbowlpackets.com/1823/Round%201.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `A group of texts found in these buildings at Saqqara describe a king hunting and eating the gods.  Graduating sizes of mastabas were used by Imhotep to create Djoser's "stepped" one of these buildings, and three of these structures belonging to Menkaure, Khafre, and Khufu were built near Giza. For the point, name these enormous structures used to bury Egyptian Pharaohs.`,
    answer: "pyramids",
    altAnswer: ["pyramid", "Egyptian pyramid", "Egyptian pyramids"],
    url: "https://files.quizbowlpackets.com/1823/Round%201.pdf",
    category: HISTORY,
  },
];
export default questions;
