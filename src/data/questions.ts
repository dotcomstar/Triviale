import { Category } from "@mui/icons-material";

type Category = "SCI" | "HIS" | "ART" | "REL" | "GEO" | "POP";

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
    question: `A figure on the left of this painting wears a cameo brooch that may depict Persephone over a polkadotted brown apron, and looks uneasily toward another figure. A strangely ornate window in the Dibble House in Iowa inspired the background of this painting, for which the artist’s dentist modeled as a man wearing denim overalls and holding a pitchfork. For the point, name this painting of a stern-looking couple, created by Grant Wood.`,
    answer: "American Gothic",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round5.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `Tennessee politician Harry Burn cast the deciding vote for this number amendment. The Silent Sentinels, including Lucy Burns and Alice Paul, protested in favor of this number amendment in front of the White House and were tortured by police in 1917. Carrie Chapman Catt led the National American Woman Suffrage Association, which advocated for, for the point, what number Constitutional amendment that guaranteed women the right to vote?`,
    answer: "Nineteen",
    fullAnswer: "Nineteenth Amendment to the US Constitution",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round5.pdf",
    category: HISTORY,
  },
  {
    question: `Elementary operations can be used to convert this mathematical object into reduced row echelon form, helpful in solving systems of equations. The commutative property does not necessarily apply to multiplication of an object of this type. The determinant can be found by calculations on the entries in, for the point, what mathematical object that is an array of numbers organized into rows and columns, and which has a movie sharing its name starring Keanu Reeves?`,
    answer: "Matrix",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round5.pdf",
    category: SCIENCE,
  },
  {
    question: `This is the largest of the countries that won the War of the Triple Alliance. This country was led by two emperors named Pedro, the second of whom abolished slavery with the Golden Law. The Cry of Ipiranga declared this country’s independence from Portugal, and in 1960 it moved its capital from Rio de Janeiro. For the point, name this country whose modern capital is Brasilia.`,
    answer: "Brazil",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round5.pdf",
    category: HISTORY,
  },
  {
    question: `When preceded by the German root “zwitter”, this term names molecules that are simultaneously dipolar. Bases are classified as strong or weak by their ability to completely dissociate into these things; for example, lye breaks apart into hydroxide molecules and sodium atoms. For the point, give this term for chemicals that have lost or gained electrons and thus have a positive or negative electric charge.`,
    answer: "ions",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round5.pdf",
    category: SCIENCE,
  },
  {
    question: `This character is told the story of “The Walrus and the Carpenter” and is asked “Why is a raven like a writing desk?” at a “mad” tea party she is sent to by a grinning cat that vanishes from her sight.  Tweedle-Dee, Tweedle-Dum, and the Cheshire Cat are encountered by for the point, what Lewis Carroll character who travels through a looking glass to have adventures in Wonderland?`,
    answer: "Alice",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round5.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `Satellites in geostationary orbit are placed directly above this feature and, as a result, don’t appear to move in the sky when viewed from the ground. An African country with capital Malabo and a South American country with capital Quito are named for their location on or near this geographical feature. Zero degrees latitude is defined at, for the point, what imaginary line that separates the Earth into northern and southern hemispheres?`,
    answer: "equator",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round5.pdf",
    category: SCIENCE,
  },
  {
    question: `Tunnels under Yucca Mountain were to be built to store waste products from this type of energy, which usually includes concrete casks and large pools to store its spent fuel rods. Large cooling towers are a common feature of, for the point, what type of power plant, such as the one at Three Mile Island that suffered a 1979 meltdown?`,
    answer: "nuclear",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round5.pdf",
    category: GEOGRAPHY,
  },
  {
    question: `King Laomedon tricked Apollo and this god into building the walls of Troy. This god cursed Pasiphae after her husband, Minos, failed to sacrifice the Cretan Bull to this god.  Horses were sacred to this god, who lost a competition to Athena’s olive tree when he gave a salt spring to Athens.  For the point, name this brother of Zeus and Hades, the Greek god of the sea.`,
    answer: "Poseidon",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round5.pdf",
    category: RELIGION,
  },
  {
    question: `The attempted sale of this man’s vacated Senate seat led to the resignation of governor Rod Blagojevich. This president, who nominated Merrick Garland, Elena Kagan, and Sonia Sotomayor to the Supreme Court, ended Operation Enduring Freedom in Afghanistan in 2014. For the point, name this U.S.  President, the namesake of the Affordable Care Act`,
    answer: "Obama",
    fullAnswer: "Barack Obama",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round4.pdf",
    category: HISTORY,
  },
  {
    question: `Dorothy Hodgkin used this type of radiation, as diffracted by crystal lattices, to determine the structure of insulin. Wilhelm Rontgen discovered this radiation, whose energy is between that of ultraviolet and gamma rays. For the point, name this type of radiation, named for its originally “unknown” nature, that is used in imaging of teeth and bones.`,
    answer: "xray",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round3.pdf",
    category: SCIENCE,
  },
  {
    question: `This character took the name Vers after having her memories hidden by Yon-Rogg. This character and her best friend, Maria Rambeau, worked with Dr Wendy Lawson on an experimental light-speed engine. This character was teased at the end of Avengers: Infinity War when Nick Fury pulled out a pager to contact her. Carol Danvers is the real name of, for the point, what heroine who was portrayed by Brie Larson in a 2018 film?`,
    answer: "Captain Marvel",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round4.pdf",
    category: POP_CULTURE,
  },
  {
    question: `The United Kingdom uses the TORRO scale to measure the intensity of these events. In the US, the damage caused by these events is used to rank them on an “Enhanced” scale, named for Ted Fujita, that tops out at F5. A “freight train” noise commonly accompanies, for the point, what natural disasters that can include three hundred mile-per-hour winds and a rotating funnel cloud of debris?`,
    answer: "tornadoes",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round6.pdf",
    category: SCIENCE,
  },
  {
    question: `This composer transcribed Allegri’s Miserere after listening to it just twice, thus ending a ban on that piece’s copying, during his tour of Europe as a teenager. This composer, who left his Requiem unfinished at his death, composed forty-one symphonies, ending with one named Jupiter. For the point, name this Austrian composer of operas like The Magic Flute and The Marriage of Figaro.`,
    answer: "Mozart",
    fullAnswer: "Wolfgang Amadeus Mozart",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round6.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `This country’s seventeenth century pirate colony of Libertatia used a language derived from Malagasy, a native language of this country. The French overseas region of Mayotte and the island country of Comoros are found in the Mozambique Channel, which separates this country from the mainland. Antananarivo is the capital of, for the point, what large island country off the southeast coast of Africa?`,
    answer: "Madagascar",
    fullAnswer: "Republic of Madagascar",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round6.pdf",
    category: GEOGRAPHY,
  },
  {
    question: `In a novel by this author, Arronax, Conseil, and Ned Land flee the Maelstrom, which threatens to sink a strange vessel. In another of this man’s novels, Passepartout and his employer use the international dateline to win a bet. Phileas Fogg and Captain Nemo’s submarine, the Nautilus, appear in, for the point, what French author’s novels Around the World in Eighty Days and Twenty Thousand Leagues Under the Sea?`,
    answer: "Verne",
    fullAnswer: "Jules Gabriel Verne",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round6.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `Only this type of number is of interest as the solution to a Diophantine equation. A boldface letter Z stands for the set of these numbers, which includes the natural numbers and zero. For the point, negative two is, but three-fourths is not, what type of number that has no fractional part?`,
    answer: "Integer",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round6.pdf",
    category: SCIENCE,
  },
  {
    question: `Like Anubis, this god was syncretized with the Foremost of the Westerners and the Opener of the Ways, who was usually described as the son of this god’s sister Nephthys. The djed column was the symbolic backbone of this god, who was cut into fourteen pieces by Set, this god’s brother. This god appears with green skin as a result of his death and resurrection. For the point, name this Egyptian god of the dead, the father of Horus and husband of Isis.`,
    answer: "Osiris",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round6.pdf",
    category: RELIGION,
  },
  {
    question: `A character with this first name gets engaged to Frank Churchill despite the worries of the meddling Miss Woodhouse. Another woman with this first name gets engaged to Mr Bingley while her younger sister Elizabeth marries Mr Darcy. For the point, what first name is shared by these characters and the woman who created them, the author of Emma, Sense and Sensibility, and Pride and Prejudice?`,
    answer: "Jane",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round6.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `Joseph Priestly liberated this element by heating the compound red mercury. This element’s namesake reaction involves loss of electrons. The triatomic form of this element is called ozone, and its more common diatomic gas is needed to generate a candle flame. For the point, name this element, a vital gas that is inhaled during respiration.`,
    answer: "Oxygen",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round6.pdf",
    category: SCIENCE,
  },
  {
    question: `After this disaster, Louis Sullivan designed the Auditorium Building in the affected city. The Palmer House was destroyed in this event, but the Water Tower was spared. This disaster, which was less deadly than a simultaneous event in Peshtigo, Wisconsin, began on De Koven Street after Catherine O’Leary’s cow supposedly kicked over a lantern. For the point, name this 1871 disaster that devastated a mostly-wooden Illinois city.`,
    answer: "Chicago Fire",
    fullAnswer: "Great Chicago Fire of 1871",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round6.pdf",
    category: HISTORY,
  },
];

// {
//   question: `Thanks largely to this substance, World War II was the first conflict in which more American soldiers died in
//   combat than from disease. Despite being Gram-positive, the Staphylococcus “superbug” MRSA has evolved to survive many derivates of this substance. For the point, name this early antibiotic that was discovered accidentally by Alexander Fleming in a Petri dish. This medicine is
//   still used to treat syphilis, strep throat, and other infections.`,
//   answer: "penicillin",
//   url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round5.pdf",
//   category: SCIENCE,
// },
export default questions;
