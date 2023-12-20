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
    question: `In this author’s story “A Lamb to Slaughter,” Mary kills her husband with a leg of lamb and then feeds it to policemen. Formula 86 transforms children into mice in this author’s novel The Witches. This author also wrote about a telepathic, book-loving girl who confronts Miss Trunchbull, and about five children, including Augustus Gloop, who find golden tickets in chocolate bars. For the point, name this author of Matilda and Charlie and the Chocolate Factory who shares his last name with a popular Indian lentil dish.`,
    answer: "Dahl",
    fullAnswer: "Roald Dahl",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Replacements.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `This city launched an anti-aircraft barrage against nothing in February 1942, the day after a Japanese sub attacked Ellwood to the west. In this city in 1947, Elizabeth Short was found murdered; her unsolved investigation became known as the “Black Dahlia” case. The 1965 Watts Riots took place in this city, which hosted a surprisingly profitable Summer Olympics in 1984. Eric Garcetti is the mayor of, for the point, what largest city in California and home of Hollywood?`,
    answer: "Los Angeles",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Replacements.pdf",
    category: HISTORY,
  },
  {
    question: `One of these events may have been predicted in 1975 in Haicheng, China. These events create a “shadow zone,” indicating that the Earth has a liquid outer core; the secondary waves created by these events do not reach the shadow zone, while their P-waves do. These events are focused at a hypocenter, an underground point that usually lies on a tectonic fault. Seismologists study, for the point, what events that cause severe shaking on the ground?`,
    answer: "earthquakes",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Replacements.pdf",
    category: SCIENCE,
  },
  {
    question: `This country’s city of Kirkuk is one of several cities that claims to hold the tomb of the prophet Daniel.  The cities of Baqubah, Ramadi, and Tikri form this country’s “Sunni triangle.” This country’s city of Qurna sits at the confluence of two rivers that then form the Shatt al-Arab, which flows southeast past Basra to the Persian Gulf. The Tigris and Euphrates Rivers irrigate the Fertile Crescent in, for the point, what country whose capital is Baghdad?`,
    answer: "Iraq",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Replacements.pdf",
    category: GEOGRAPHY,
  },
  {
    question: `If folic acid is deficient during pregnancy, this anatomical structure may not fully close in the child. Parts of this structure fuse to form the human sacrum. Extensions of this structure supported the dimetrodon’s sail. A sideways curve of this structure is called scoliosis, and CSF is extracted by a “tap” of this body part.  Thoracic, cervical, and lumbar segments make up, for the point, what structure that invertebrates do not possess?`,
    answer: "spine",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Replacements.pdf",
    category: SCIENCE,
  },
  {
    question: `Raphael Lemkin coined this term and pushed for a 1948 convention defining it. One of these events is euphemistically called the “Events of 1915” by the Turkish government, which resists international pressure to acknowledge that it occurred to the Armenian population of the Ottoman Empire. In 1994, Rwanda suffered hundreds of thousands of deaths in, for the point, what type of heinous, mass-scale killing of a group of people?`,
    answer: "genocide",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Replacements.pdf",
    category: HISTORY,
  },
  {
    question: `Ethyne contains two hydrogen atoms and two atoms of this element. In a 2004 experiment, Scotch tape was used to create monolayers of this element. Allotropes of this element include materials like graphene and diamond, and a radioactive isotope of this element with a half-life of 5,730 years is used in archaeological dating. Organic chemistry is the study of molecules with, for the point, what element with atomic number six and chemical symbol C?`,
    answer: "carbon",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Replacements.pdf",
    category: SCIENCE,
  },
  {
    question: `Missionaries agreed to aid children during this event if they agreed to receive Protestant teachings, an act known as “souperism.” Sir Robert Peel repealed the Corn Laws in response to this event, in which thousands died while fleeing to North America in “coffin ships.” This event was caused by a strain of the water mold Phytophthora [fye-tohf-thoh-rah] infestans. For the point, name this 1845-1849 disaster, a blight of the staple crop of Ireland`,
    answer: "Potato Famine",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Replacements.pdf",
    category: HISTORY,
  },
  {
    question: `In a book about this character, he shouts “David and Goliath!” when asked who the first two disciples of Jesus were. Sequels to that novel describe this character Abroad and as a Detective. This character finds Injun Joe while lost in McDougal’s cave with Becky Thatcher, and he persuades a group of boys to whitewash a fence for him. For the point, name this character created by Mark Twain, a friend of Huckleberry Finn.`,
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Replacements.pdf",
    answer: "Tom Sawyer",
    category: ART_AND_LITERATURE,
  },
  {
    question: `This term describes the mass of the hypothetical “dark fluid.” The Hammett function of a super-acid has this property. In a galvanic cell, oxidation occurs at the electrode with this property. A spontaneous reaction has this kind of change in Gibbs free energy, and a standard enthalpy change of this type makes a reaction exothermic. Anions possess, for five points, what kind of charge bestowed by a net gain of electrons?`,
    answer: "Negative",
    url: "https://files.quizbowlpackets.com/2701/Replacements.pdf",
    category: SCIENCE,
  },
  {
    question: `Thomas Edison built the first American power plant, the Pearl Street Station, to light streetlamps in this place. In 1920, Italian anarchists set off a bomb in this place that killed forty people; the bomb was carried in a wagon that stopped in front of the headquarters of J.P. Morgan. The eight blocks of this place stretch from the East River to Broadway and include the NYSE building. For five points, name this street in downtown Manhattan, the heart of New York’s Financial District.`,
    answer: "Wall Street",
    url: "https://files.quizbowlpackets.com/2701/Replacements.pdf",
    category: HISTORY,
  },
  {
    question: `Native to sub-Saharan Africa, this mammal is known for its massive size and herbivorous diet. With a barrel-shaped body, short legs, and a large mouth, it spends much of its time in water. Despite its seemingly docile appearance, it is considered one of the most dangerous animals in Africa. What is the name of this formidable creature, often associated with rivers and lakes on the African continent?`,
    answer: "Hippopotamus",
    category: SCIENCE,
  },
  {
    question: `Their lead guitarist is known for his distinctive guitar solos, and they performed during the iconic Live 8 charity concert in 2005. Formed in 1965 in London, this band is often associated with progressive rock and psychedelic music. This band’s founding members include Syd Barrett, Nick Mason, Roger Waters, and Richard Wright. For five points, name the legendary rock band is known for their concept album "The Dark Side of the Moon" and hits like "Wish You Were Here"?`,
    answer: "Pink Floyd",
    category: POP_CULTURE,
  },
  {
    question: `Tishaura Jones assumed mayorship of this city in April 20, 2021. This city was founded on February 14, 1764, by French fur traders Gilbert Antoine de St. Maxent, Pierre Laclède and Auguste Chouteau. In 1904, the city hosted the World's Fair and the Olympics, becoming the first non-European city to host the games. This city features a 630-foot-tall monument which was designed by the Finnish-American architect Eero Saarinen in 1947. The NFL Rams controversially returned to Los Angeles from this city in 2016. For the point, name this city, the largest metropolitan area in Missouri and the second largest in Illinois. `,
    answer: "Saint Louis",
    category: GEOGRAPHY,
  },
  {
    question: `This monarch was the elder daughter of Prince Albert, duke of York, and his wife, Lady Elizabeth Bowes-Lyon. She was queen regnant of 32 sovereign states over the course of her lifetime and remained the monarch of 15 realms by the time of her death. This woman had four children: Charles, Anne, Andrew, and Edward. From the House of Windsor, this woman was born April 21, 1926, London, England and died September 8, 2022. Who is this longest reigning British Monarch, former Queen of England?    `,
    answer: "Elizabeth",
    fullAnswer: "Queen Elizabeth II",
    category: HISTORY,
  },
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
  {
    question: `This famous video-game character was stabbed during reveal trailers for Sephiroth and Ridley in the game Super Smash Bros Ultimate. In his eponymous movie, produced by Universal Pictures and featuring Anya Taylor-Joy, this character was voiced by Chris Pratt. For five points, name this Italian plumber whose brother is Luigi.`,
    answer: "Mario",
    category: POP_CULTURE,
  },
  {
    question: `This man authored books such as “A Promised Land,” “The Audacity of Hope,” and “Dreams From My Father.” Born in Honolulu on August 4th, 1961, this man was registered as “Barry” in school from ages six to ten. In 1992, he married Michelle Robinson. Name this 44th US president, for five points, who was elected in 2008 and served as the nation’s first African American president.`,
    answer: "Obama",
    fullAnswer: "Barack Obama",
    category: HISTORY,
  },
  {
    question: `Names the same: Find the name common to all of these people or characters. Richard created the game Magic: The Gathering. James was the 20th president of United States and assassinated after less than 200 days in office. Andrew is a British-American actor who played major roles in Hacksaw Ridge and The Amazing Spider-Man. The fictional lasagna-loving orange cat with human owner Jon Arbuckle.`,
    answer: "Garfield",
    category: POP_CULTURE,
  },
];

export default questions;
