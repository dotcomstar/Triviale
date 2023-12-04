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
  {
    question: `Moseley’s law disproved a theory arguing that these things have randomly distributed corpuscles.  John Dalton coined the name of these things and used them to explain his law of definite proportions. The Greek philosopher Democritus is credited as the inventor of the “theory” of these things, whose name means “indivisible” in Greek. Niels Bohr and Ernest Rutherford theorized that a nucleus is at the center of what small building blocks of matter?`,
    answer: "atoms",
    url: "https://files.quizbowlpackets.com/2852/Round1.pdf",
    category: SCIENCE,
  },
  {
    question: `This religion’s central philosophy includes reciting the Shahada, a statement of faith, and performing prompt and sincere alms-giving called Zakat. The Hadith of Jibreel summarizes this religion’s Five Pillars, which include fasting that is performed during this religion’s holy month of Ramadan and five daily prayers. Name this Abrahamic religion whose founding prophet is Muhammad.`,
    answer: "Islam",
    url: "https://files.quizbowlpackets.com/2852/Round1.pdf",
    category: RELIGION,
  },
  {
    question: `These machines were involved in a miraculous accident in Vaughan, Mississippi that killed only Casey Jones. In 1918 at Dutchman’s Curve, one hundred one people died when two of these vehicles collided because one failed to pull onto a side track. John Henry legendarily beat a steel drill in a race to build a tunnel for these vehicles. Union Pacific and Central Pacific operated what vehicles that used the transcontinental railroad?`,
    answer: "trains",
    url: "https://files.quizbowlpackets.com/2852/Round1.pdf",
    category: HISTORY,
  },
  {
    question: `This region’s rule by Empress Min in the late 19th century led a Western scholar to call it a “hermit kingdom.” In 1598, the Ming Dynasty helped defend this region against an invading fleet at the Battle of Noryang. In the thirteenth century, this region’s Goryeo Dynasty fell to Kublai Khan, and its Joseon dynasty ended in 1897 with its invasion by Japan. Name this East Asian peninsula that is, today, split into two countries.`,
    answer: "Korea",
    url: "https://files.quizbowlpackets.com/2852/Round1.pdf",
    category: HISTORY,
  },
  {
    question: `In 1980, a law named CERCLA tasked this agency with projects at the Valley of the Drums and Love Canal. Michael Regan currently leads this agency, which was created by a Richard Nixon executive order.  This agency manages various cap-and-trade markets as well as the Energy Star efficiency program. Superfund sites are managed by, for five points, what US governmental agency that enforces regulations like the Clear Air Act and Clean Water Act?`,
    answer: "EPA",
    fullAnswer: "U.S. Environmental Protection Agency",
    url: "https://files.quizbowlpackets.com/2852/Round10.pdf",
    category: POP_CULTURE,
  },
  {
    question: `Alexandros of Antioch used this substance to depict a half-nude goddess who may have been handspinning or holding an apple, although his work was originally attributed to Praxiteles, who was a master of this material. This material was used to create "Hermes and the Infant Dionysus" and a sculpture of Aphrodite whose arms have broken off, called the "Venus de Milo". For five points, name this material used to create Michelangelo’s "David", a type of white stone.`,
    answer: "marble",
    url: "https://files.quizbowlpackets.com/2852/Round10.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `This country’s fraudlent financial reporting was announced by incoming Prime Minister George Papandreou in 2009. In summer 2015, this country failed to make an IMF loan payment on time, as the Syriza party under Alexis Tsipras launched a referendum about bailout conditions imposed on this country by the Eurozone. Strict austerity has mostly failed to solve a debt crisis in, for five points, what country where protesters have marched in Athens?`,
    answer: "greece",
    url: "https://files.quizbowlpackets.com/2852/Round10.pdf",
    category: POP_CULTURE,
  },
  {
    question: `Ethers are isomers of these compounds, which are only found in the side chains of three amino acids: serine, threonine, and tyrosine. The active ingredients of antifreeze and hand sanitizer are this type of organic molecule, in which an oxygen atom is single bonded to a hydrogen. Examples of these compounds with one and three carbons are known as “wood” and “rubbing,” respectively. For five points, name this type of compound whose simplest examples are methanol and ethanol.`,
    answer: "alcohols",
    url: "https://files.quizbowlpackets.com/2852/Round11.pdf",
    category: SCIENCE,
  },
  {
    question: `On the right of this painting, two figures lean toward Simon the Zealot, gesturing wildly. Because this mural is not a fresco, it requires frequent maintenance to preserve it on the wall of the Stanza Maria delle Grazie. This painting’s figures are arranged in groups of three, with Peter and John sitting next to Judas. For five points, name this painting by Leonardo da Vinci in which the disciples react in shock as Jesus spreads his arms over their final meal together.`,
    answer: "The Last Supper",
    url: "https://files.quizbowlpackets.com/2852/Round11.pdf",
    category: ART_AND_LITERATURE,
  },
];

export default questions;
