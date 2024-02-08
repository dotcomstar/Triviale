type Category = "SCI" | "HIS" | "ART" | "REL" | "GEO" | "POP" | string;

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
    question: `Edward Elgar’s last notable work is a concerto for this instrument, which was played by Jacqueline du Pre and Mstislav Rostropovich. Bach composed six solo suites for this instrument, the first of which is a signature piece for Yo-Yo Ma. For the point, name this large string instrument that is smaller than a bass and much larger than a viola`,
    answer: "Cello",
    altAnswer: ["violoncello"],
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round9.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `Thinkers in this field of study were discouraged from using “infinitesimals,” quantities too small to be measured, until Gottfried Leibniz and Isaac Newton independently developed it in the 17th century.  Integrals and derivatives are taught in, for the point, what branch of math that is often taught as an advanced class in high schools?`,
    answer: "calculus",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round9.pdf",
    category: SCIENCE,
  },
  {
    question: `This philosophy, which teaches that true happiness comes from virtue, was promoted in the Meditations of Marcus Aurelius. Zeno of Citium founded this school of philosophy, whose core idea is that people should not be swayed by desire or fear. For the point, name this ancient philosophy whose name is, today, associated with being calm and unemotional.`,
    answer: "Stoicism",
    altAnswer: ["stoic"],
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round9.pdf",
    category: RELIGION,
  },
  {
    question: `Congressman Charles Wilson pushed to covertly supply this country with Stinger missiles in Operation Cyclone. An ill-fated 1979 Soviet invasion of this country was countered by its mujahideen. In the wake of the September 11th attacks, a US-led NATO coalition invaded, for the points, what country that was liberated by the 2001 ousting of the Taliban from its capital, Kabul?`,
    answer: "Afghanistan",
    altAnswer: ["Islamic Republic of Afghanistan"],
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round9.pdf",
    category: HISTORY,
  },
  {
    question: `The first of this type of material used by humans was meteoric iron, predating the invention of smelting. These materials commonly exhibit better strength than their components. Adding chromium to iron makes one of these materials called stainless steel, and examples of these made with copper include bronze and brass. For the point, give this term for a mixture of two or more metals.`,
    answer: "Alloy",
    altAnswer: ["alloys"],
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round9.pdf",
    category: SCIENCE,
  },
  {
    question: `This novel’s epilogue speculates that this book’s narrator may have made use of Mayday’s Underground Femaleroad. This novel’s protagonist butts heads with Serena Joy, the wife of a Commander who plays Scrabble with a woman despite the laws of the Republic of Gilead. For the point, name this novel by Margaret Atwood about Offred, a woman who has been forced to be the title child-bearing slave, which was later adapted to a 2017 drama starring Elisabeth Moss.`,
    answer: "The Handmaids Tale",
    altAnswer: ["Handmaids Tale"],
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round9.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `These objects collect and deposit debris in masses called moraines. These objects can move via basal sliding, which occurs when meltwater reduces ground friction. The Great Lakes were formed from the retreat of these objects. About seventy percent of Earth’s freshwater is stored in, for the point, what large sheets of land-based ice?`,
    answer: "glaciers",
    altAnswer: ["glacier", "alpine glaciers"],
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round9.pdf",
    category: SCIENCE,
  },
  {
    question: `One of these mythical figures was rescued from a ring of fire by Siegfried, who cut off her armor.  Brunhilde was one of these daughters of Odin, who were often described as “shield-maidens.” For the point, name these divine women who, in Germanic mythology, carried the souls of dead warriors to the god Odin's hall Valhalla.`,
    answer: "Valkyries",
    altAnswer: ["Valkyrie"],
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round9.pdf",
    category: RELIGION,
  },
  {
    question: `In 1968, this country seized the American research ship Pueblo. This country advocates a state policy of self-reliance called Juche and has clashed with its neighbor in a buffer zone running along the thirty-eighth parallel called the DMZ. For the point, name this Asian country that has been ruled under dictators from the Kim family from its capital of Pyongyang.`,
    answer: "North Korea",
    altAnswer: ["DPRK", "Democratic Peoples Republic of Korea"],
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round8.pdf",
    category: HISTORY,
  },
  {
    question: `The sarcoplasmic reticulum stores ions of this mineral, which is needed for muscle contraction. Vitamin D assists the absorption of both phosphate and this element in the gut. Seniors may take a supplement of this element to prevent osteoporosis, and children often get their intake by drinking milk. For the point, name this element needed to build strong bones and teeth.`,
    answer: "Calcium",
    altAnswer: ["Ca"],
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round8.pdf",
    category: SCIENCE,
  },
  {
    question: `Nearly sixty people were killed in this country’s city of Kerman in a stampede during a January 2020 funeral procession. Canada claimed that this country’s military shot down Ukraine International Flight 752.  This country’s Quds Force was led by Qasem Soleimani until he was killed in a drone strike in January 2020.  President Trump has threatened war with, for the point, what country whose capital is Tehran?`,
    answer: "Iran",
    altAnswer: ["Islamic Republic of Iran", "Persia"],
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round8.pdf",
    category: HISTORY,
  },
  {
    question: `In a tone poem by Modest Mussorgsky, evil spirits celebrate during one of these periods of time on Bald Mountain. This time period appears in the English title of Mozart’s Serenade Number Thirteen that is called a “little” piece of music for this time period. In Saint-Saens’ Danse macabre, a rooster crow representing sunrise ends, for the point, what time period that is depicted in a nocturne?`,
    answer: "night",
    altAnswer: [
      "nights",
      "Night on Bald Mountain",
      "noch",
      "Noch ny lysoy gore",
      "A Little Night Music",
      "Eine Kleine Nachtmusik",
      "Nacht",
    ],
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round8.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `A commercial for a documentary about this politician was the subject of the 2010 Citizens United case, which reformed campaign finance law. John Podesta chaired this politician’s most recent campaign, which included Tim Kaine as running mate. This politician wrote the book What Happened about her campaign for President in 2016. For the point, name this former First Lady who ran for President against Donald Trump.`,
    answer: "Hillary Clinton",
    altAnswer: ["Hillary Rodham", "Hillary Rodham Clinton", "Clinton"],
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round8.pdf",
    category: POP_CULTURE,
  },
  {
    question: `This man wrote the hymn “A Mighty Fortress is Our God.” This man was the subject of the Exsurge Domine bull when his refusal to recant at the Diet of Worms led to his excommunication from the Catholic church. Criticisms of the sale of indulgences in the Ninety-Five Theses were written by, for the point, what German monk-turned-reformer who started the Protestant Reformation and is the basis for MLK's name?`,
    answer: "Martin Luther",
    altAnswer: ["Luther"],
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round8.pdf",
    category: RELIGION,
  },
  {
    question: `One of these events, KSN 2011b, was observed giving off a flash of ultraviolet radiation in what is believed to have been caused by the collision of two white dwarves. These events may leave behind a neutron star and create a massive shockwave. Our sun is not large enough to undergo, for the point, what type of incredibly bright and powerful stellar explosion?`,
    answer: "supernova",
    altAnswer: [
      "supernovae",
      "supernovas",
      "Type 1a supernova",
      "Type 1a supernovae",
      "Type 1a supernovas",
    ],
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round8.pdf",
    category: SCIENCE,
  },
  {
    question: `In 2018, this state’s Democratic candidate for governor, Andrew Gillum, lost by fewer than thirty-five thousand votes after a machine recount. The Supreme Court awarded this state’s twenty-five electoral votes to George W. Bush in 2000 after stopping a recount in counties like Broward and Palm Beach. For the point, name this southern US state where governor Ron DeSantis leads from Tallahassee.`,
    answer: "Florida",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round9.pdf",
    category: HISTORY,
  },
  {
    question: `This game’s 1972 World Championship was lost by Boris Spassky. In 1999, a team of fifty thousand people voted to use the Sicilian Defense in this game’s “Kasparov versus the World” match. Bobby Fischer was a Grandmaster in this game, whose current world champion is Magnus Carlsen. For the point, name this board game in which players must protect their king from pieces like knights, rooks, and pawns.`,
    answer: "chess",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round9.pdf",
    category: POP_CULTURE,
  },
  {
    question: `According to legend, this man filled a room with fake flowers in order to confuse the Queen of Sheba. In another story, this son of Bathsheba threatened to cut a baby in half to determine which of two women was the child’s mother. Because this man’s father had “shed blood,” this king built the first Temple in Jerusalem. For the point, name this wise biblical king, the son of David.`,
    answer: "Solomon",
    addOns: ["King"],
    altAnswer: ["Schlomo", "Suleiman"],
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round9.pdf",
    category: RELIGION,
  },
  {
    question: `This man lamented “It is well that war is so terrible, or we should grow too fond of it” during his victory over Ambrose Burnside at the Battle of Fredericksburg. This man, who led the militia that ended John Brown’s raid, was victorious at the Second Battle of Bull Run. For the point, name this general who, on April 9th, 1865, surrendered his Confederate army at Appomattox to Ulysses S. Grant.`,
    answer: "Lee",
    altAnswer: ["Robert E Lee", "Robert Edward Lee", "Robert Lee"],
    fullAnswer: "Robert E. Lee",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round9.pdf",
    category: HISTORY,
  },
  {
    question: `This architect created two studios named Taliesin, and his Robie House exemplifies the Prairie School of architecture founded by this man. This architect created the New York Guggenheim Museum, and used cantilevers to support the concrete terraces of a house in Pennsylvania over a waterfall. For the point, name this American architect of Fallingwater.`,
    answer: "Wright",
    altAnswer: ["Frank Lloyd Wright", "Frank Wright"],
    fullAnswer: "Frank Lloyd Wright",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round9.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `This organ contains masses of lymphatic tissue known as Peyer’s patches. This organ’s surface area is increased by fingerlike villi that can be blunted by celiac disease. This organ, which receives chyme through the pyloric sphincter, consists of the ileum, jejunum, and duodenum. For the point, name this digestive organ that is found between the stomach and a related, larger organ.`,
    answer: "Small intestine",
    altAnswer: ["Small intestines", "Small bowel"],
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round9.pdf",
    category: SCIENCE,
  },
];
export default questions;
