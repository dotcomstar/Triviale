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
    question: `This man lamented a “total and unmitigated defeat” in the House of Commons shortly before a vote to approve the Munich Agreement. This man rued that Soviet influence extended to a line “from Stettin in the Baltic to Trieste in the Adriatic,” which he called the “iron curtain.” The “Finest Hour” and “Blood, Toil, Tears, and Sweat” speeches were also delivered by what Prime Minister of the UK during World War II?`,
    answer: "Churchill",
    fullAnswer: "Winston Churchill",
    url: "https://files.quizbowlpackets.com/2852/Round1.pdf",
    category: HISTORY,
  },
  {
    question: `A parody of this painting is titled L.H.O.O.Q., which is a pun in French, and was created by Marcel Duchamp by adding a moustache to this painting. A French nickname for this painting refers to its subject, who may be the wife of Francesco del Giocondo, and to her smile. Some analysts think this painting once had fine eyebrows, which have worn away over time. Name this painting held in the Louvre art museum, a portrait of a woman made by Leonardo Da Vinci.`,
    answer: "Mona Lisa",
    url: "https://files.quizbowlpackets.com/2852/Round1.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `These organisms are conventionally classified as being spherical, comma-shaped, rod-shaped, or spiral-shaped. These organisms are also classified by how they react with crystal violet, a dye that binds tightly to their peptidoglycan cell walls in a Gram stain. These organisms and Archaea make up the two prokaryotic domains of life. Antibiotics target what single-celled organisms, examples of which include Salmonella and E. coli?`,
    answer: "bacteria",
    url: "https://files.quizbowlpackets.com/2852/Round1.pdf",
    category: SCIENCE,
  },
  {
    question: `Owen Roberts chaired the commission that investigated this event, finding that Husband Kimmel was derelict in his duty. Because translation of the Fourteen-Part Message was slow, this event officially took place without a formal declaration of war, against the wishes of Admiral Yamamoto. The “day of infamy” speech to Congress followed what December 7th, 1941 sneak attack by Japan against a naval base in Hawaii?`,
    answer: "Pearl Harbor",
    url: "https://files.quizbowlpackets.com/2852/Round1.pdf",
    category: HISTORY,
  },
  {
    question: `Literature in this genre can be cataloged in the Perry Index and was collected by Jean de La Fontaine.  One of these works contrasts the simplicity of the country with the dangers of the city in the lives of two mice, and is often collected with two of these works commonly called “The Ant and the Grasshopper” and “The Tortoise and the Hare.” Name these short stories, many of which are credited to Aesop, that tell a simple story and try to teach a moral.`,
    answer: "fables",
    url: "https://files.quizbowlpackets.com/2852/Round1.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `To memorialize his lover Leuce, this deity either turned her into a poplar tree or created the Elysian Fields. This deity’s affair with Minthe angered his wife, who turned her into a mint plant. This god this first-born son of Cronus and Rhea, and after the Titanomachy, he divided the world with his two brothers. This god uses Cerberus to protect his realm, where he sometimes keeps his wife, Persephone. Name this Greek god of the underworld.`,
    answer: "Hades",
    url: "https://files.quizbowlpackets.com/2852/Round1.pdf",
    category: RELIGION,
  },
];

export default questions;
