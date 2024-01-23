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
    question: `A portion of this process is catalyzed by the enzyme RuBisCo. During this process, ATP and NADPH convert carbon dioxide into glucose as part of the Calvin cycle. This process takes place inside thylakoids, a membrane-bound component of chloroplasts. Chlorophyll is vital to, for the point, what process in which plants transform light into energy?`,
    answer: "photosynthesis",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round6.pdf",
    category: SCIENCE,
  },
  {
    question: `Sky-clad Jain monks are required to remove this physical feature by hand. Two of the Five Ks of Sikhism are kanga, an object used to clean this body part, and kesh, which indicates that this body part should remain uncut; as a result, Sikhs often wear this body part coiled under a dastar turban. For the point, name this human body part that may be worn in dreadlocks by Rastas`,
    answer: "hair",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round7.pdf",
    category: RELIGION,
  },
  {
    question: `A Tatar assassin tried to kill this leader’s youngest son, but was stopped by Altani, a woman whom this man honored as a bataar. This man’s original successor, Jochi, led the Golden Horde before he was possibly poisoned, and his son Ogedei defeated the Jin Dynasty. This man’s grandson founded the Yuan Dynasty, which expanded his empire south into China. For the point, name this founder of the Mongol Empire and ancestor of Kublai Khan`,
    answer: "Genghis Khan",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round7.pdf",
    category: HISTORY,
  },
  {
    question: `In early Christian teachings, this man was the first to plant a vineyard. This son of Lamech cursed his grandson Canaan for the sins of Ham, and repeatedly released a dove to determine whether there was dry land nearby. A covenant from God in the form of a rainbow was received by, for the point, what prophet who built an ark to save his family from a great flood?`,
    answer: "Noah",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round6.pdf",
    category: RELIGION,
  },
  {
    question: `This man agreed to a 1931 pact with Lord Irwin in advance of the Second Round Table Conference.  This political figure was assassinated by Nathuram Godse, who believed this man had given too much power to Muslims during the partition of the British Raj. A nonviolent 1930 salt march was led by, for the point, what independence leader who advocated for civil disobedience in India?`,
    answer: "Gandhi",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round6.pdf",
    category: HISTORY,
  },
  {
    question: `A boy in this novel shrieks about an “old hell-devil” after receiving a camellia flower, and is defended by Heck Tate, who insists that Bob Ewell killed himself. In this novel, Dill Harris visits a pair of children in Maycomb, Alabama, and Tom Robinson is defended at a racist rape trial by Atticus Finch. For the point, name this novel about Jem and Scout, written by Harper Lee.`,
    answer: "To Kill a Mockingbird",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round6.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `In uniform circular motion, a centripetal force creates this quantity, which points radially inward and is equal to velocity squared divided by radius. This quantity, the derivative of velocity, is multiplied by mass to give force in Newton’s Second Law. For the point, name this quantity that is non-zero if an object is changing direction, slowing down, or speeding up.`,
    answer: "acceleration",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round6.pdf",
    category: SCIENCE,
  },
  {
    question: `During this war, opposing generals James Wolfe and Louis-Joseph de Montcalm were each killed at the Battle of the Plains of Abraham in Quebec. Fort Necessity was led, and lost, by George Washington at the outset of this war. The 1763 Treaty of Paris gave Canada to the British and ended, for the point, what war that pitted the British and their American colonies against two namesake allies?`,
    answer: "French and Indian War",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round6.pdf",
    category: HISTORY,
  },
  {
    question: `After Brazilian President Jair Bolsanaro called this woman a brat, she changed her Twitter biography accordingly. In August 2019, a solar-powered yacht brought this woman to New York City for a UN summit.  “Unite behind the science” is part of the message delivered to politicians during this woman’s strike from school. The 2019 TIME Person of the Year is, for the point, what then-teenaged Swedish climate change activist?`,
    answer: "Greta Thunberg",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round6.pdf",
    category: POP_CULTURE,
  },
  {
    question: `This country’s 2004 Orange Revolution occurred after Viktor Yanukovych was accused of voter fraud.  Most countries do not recognize the controversial annexation of this country’s Crimean Peninsula. The Chernobyl disaster took place in, for the point, what Eastern European country where the Euromaidan protests against Russia took place in the capital, Kiev?`,
    answer: "Ukraine",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round6.pdf",
    category: HISTORY,
  },
  {
    question: `Thanks largely to this substance, World War II was the first conflict in which more American soldiers died in combat than from disease. Despite being Gram-positive, the Staphylococcus “superbug” MRSA has evolved to survive many derivates of this substance. For the point, name this early antibiotic that was discovered accidentally by Alexander Fleming in a Petri dish. This medicine is still used to treat syphilis, strep throat, and other infections.`,
    answer: "penicillin",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round5.pdf",
    category: SCIENCE,
  },
  {
    question: `Richie Havens gave several encores at this event as a stalling tactic while waiting for other performers to arrive. Max Yasgur’s dairy farm near White Lake was the site of this event, whose performers included Jefferson Airplane and Jimi Hendrix. Over four hundred thousand people attended, for the point, what 1969 music festival in upstate New York, often hailed as the high point of the hippie movement?`,
    answer: "Woodstock",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round6.pdf",
    category: ART_AND_LITERATURE,
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
    question: `This city hosted a 1409 Catholic council that elected Alexander V as a third Pope in a failed attempt to end the Western Schism. This city near the mouth of the Arno River was briefly the home of Galileo, who performed a cannonball drop experiment from a structure that was stabilized with lead counterweights in 2008.  For the point, name this Italian city whose cathedral’s bell tower has a world-famous four degree lean.`,
    answer: "Pisa",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round7.pdf",
    category: HISTORY,
  },
  {
    question: `Using these numbers as the side lengths of squares can produce an approximation of the golden spiral.  The ratio between one of these numbers and the next one approaches the golden ratio. Pine cone scales and flower petals often appear in patterns of these numbers. An Italian mathematician names, for the point, what sequence of numbers that starts one, one, two, three, five, and is built by adding the two previous terms?`,
    answer: "Fibonacci",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round7.pdf",
    category: SCIENCE,
  },
  {
    question: `The ancient Dionysia festival included a competition at which playwrights would submit three plays in this genre and one satyr play. A play in this genre was set near Colonus by Sophocles, who also wrote the plays Antigone and Oedipus, whose title characters’ stubbornness and hubris are the fatal flaws that lead to their downfalls. For the point, name this genre of ancient drama, contrasted with comedy.`,
    answer: "tragedy",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round7.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `This figure was given a crown and necklaces by the Horae and the Graces for her wedding. Zeus ordered Hephaestus to make this woman as a gift for Epimetheus to punish mankind for accepting the gift of fire from this woman’s brother-in-law, Prometheus. For the point, all of the evils in the world were released when what mythological woman opened her namesake “box?”`,
    answer: "Pandora",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round7.pdf",
    category: RELIGION,
  },
  {
    question: `This phenomenon obeys Amontons’ laws, which include the rule that it is independent of the contact area. This phenomenon, which comes in static and kinetic types, has a force equal to mu [mew], its namesake coefficient, times the normal force. Oil and other lubricants can reduce, for the point, what force that opposes motion between two solids moving against each other?`,
    answer: "friction",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round7.pdf",
    category: SCIENCE,
  },
  {
    question: `A virtuoso player of this instrument, Art Tatum, was a master of its stride style. A quartet led by a musician who played this instrument used unorthodox time signatures in songs like “Take Five” on the album Time Out. Jazz musicians like Thelonious Monk and Dave Brubeck played, for the point, what musical instrument whose standard form has eighty-eight black and white keys?`,
    answer: "piano",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round7.pdf",
    category: ART_AND_LITERATURE,
  },
];

export default questions;
