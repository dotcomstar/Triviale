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

interface MondoDBQuestion {
  _id: { $numberInt: string };
  questions: Question[];
}

export const mongoDBQuestions: MondoDBQuestion[] = [
  {
    _id: { $numberInt: "20231215" },
    questions: [
      {
        category: "SCI",
        answer: "tongue",
        question:
          "A “geographic” pattern of patches can appear on this organ due to leukoplakia. This organ’s frenulum is tied to another body part in ankylo-glossia, and a protruding one is symptomatic of Down syndrome. It is not a tail, but chameleons possess a prehensile one of these organs that is covered in spiny papillae to assist cats with grooming. Sublingual salivary glands and taste buds are associated with, for fice points, which muscular organ inside the mouth?",
        url: "https://files.quizbowlpackets.com/2701/Replacements.pdf",
      },
      {
        category: "GEO",
        question:
          "Oxfam was founded to alleviate a famine in this country. This country celebrates “No Day,” a holiday that commemorates a refusal to cooperate with Benito Mussolini, given by Prime Minister Ioannis Metaxas.  The Earl of Elgin looted marble sculptures from this country, and the British Museum refuses to repatriate them. Since 2007, a debt crisis has plagued, for five points, what country where the Parthenon stands in Athens?",
        answer: "Greece",
        url: "https://files.quizbowlpackets.com/2701/Replacements.pdf",
      },
      {
        question:
          'Formed in Liverpool in 1960, this legendary British rock band is widely regarded as one of the most influential in the history of popular music. Hits like "Hey Jude," "Let It Be," and "A Hard Day\'s Night" are just a glimpse of their extensive discography. With members like John Lennon, Paul McCartney, George Harrison, and Ringo Starr, they achieved global fame and success. What is the name of this iconic group that played a pivotal role in shaping the landscape of rock and roll, and whose name sounds like an insect?',
        answer: "The Beatles",
        category: "POP",
      },
    ],
  },
];

const questions: Question[] = [
  {
    question: `This fictional creature was played in various renditions by actors such as Boris Karloff, David Howard Thornton, Matthew Morrison, Jim Carrey, and Benedict Cumberbatch. According to a song by Tyler, The Creator, “He’s a mean one.” Others describe this character as being as “cuddly as a cactus" and speculated him to be born with a heart "two sizes too small." For five points, name this green Dr. Seuss character who begins his eponymous book attempting to ruin Christmas in Whoville.`,
    answer: "The Grinch",
    category: ART_AND_LITERATURE,
  },
  {
    question: `This person was the last Britsh monarch of the House of Hanover. During her reign, Great Britain celebrated her Golden and Diamond Jubilees. Born the daughter of Prince Edward and Queen Charlotte, this woman married her first cousin, Prince Albert of Saxe-Coburg and Gotha, in 1840. Their nine children married into royal and noble families across the continent, earning this woman the sobriquet "grandmother of Europe". For five points, name Britain’s second-longest reigning monarch, who lends her name to the largest waterfall in the world and an era characterized by evolutionary breakthroughs in the arts and sciences.`,
    answer: "Victoria",
    fullAnswer: "Queen Victoria",
    category: HISTORY,
  },
  {
    question: `This self-regulating biological process was first described by French physiologist Claude Bernard in 1849. In 1932, Joseph Barcroft a British physiologist, was the first to say that higher brain function required this biological process. The name for this process stems from the Neo Latin and Greek words meaning “similar” and “standing still.” For five points, name this process which maintains the state of variables such as body temperature, blood glucose, and blood oxygen content.`,
    answer: "Homeostasis",
    category: SCIENCE,
  },
  {
    question: `While serving the 54th Massachusetts Regiment, this figure is said to have served Robert Gould Shaw his last meal before Gould died assaulting Fort Wagner. A month earlier, almost 800 people were freed in raids along the Combahee River co-planned by this woman, who led numerous groups across the Ohio River.  “Moses” was the nickname of, for five points, what escaped slave who proclaimed she never lost a soul while conducting others along the Underground Railroad?`,
    answer: "Tubman",
    fullAnswer: "Harriet Tubman",
    category: HISTORY,
  },
  {
    question: `Brumbies are a feral type of these animals that roam Australia. Although the Hall of the Bulls is the most famous section of the Lascaux caves, these animals are the most common to be painted on its walls. The rise of the Proto-Indo-Europeans is tied to their domestication of these animals on the Russian steppe. Parthian archers mastered the ability to turn around and shoot arrows while riding, for five points, what animals that can be used to pull chariots and plows?`,
    answer: "Horses",
    url: "https://files.quizbowlpackets.com/2701/Replacements.pdf",
    category: SCIENCE,
  },
  {
    question: `One of these poems warns “die single and thine image dies with thee,” and urges “now is the time that face should form another” while addressing a subject known as the Fair Youth. Another of these poems addresses a Dark Lady whose lips are less red than coral and whose “breasts are dun,” and begins “My Mistress’ Eyes are Nothing Like the Sun.” Rhyming couplets typically end, for five points, what fourteen-line poems frequently written by William Shakespeare?`,
    answer: "sonnets",
    url: "https://files.quizbowlpackets.com/2701/Replacements.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `A “geographic” pattern of patches can appear on this organ due to leukoplakia. This organ’s frenulum is tied to another body part in ankylo-glossia, and a protruding one is symptomatic of Down syndrome. It is not a tail, but chameleons possess a prehensile one of these organs that is covered in spiny papillae to assist cats with grooming. Sublingual salivary glands and taste buds are associated with, for fice points, which muscular organ inside the mouth?`,
    answer: "Tongue",
    url: "https://files.quizbowlpackets.com/2701/Replacements.pdf",
    category: SCIENCE,
  },
  {
    question: `Oxfam was founded to alleviate a famine in this country. This country celebrates “No Day,” a holiday that commemorates a refusal to cooperate with Benito Mussolini, given by Prime Minister Ioannis Metaxas.  The Earl of Elgin looted marble sculptures from this country, and the British Museum refuses to repatriate them. Since 2007, a debt crisis has plagued, for five points, what country where the Parthenon stands in Athens?`,
    answer: "Greece",
    url: "https://files.quizbowlpackets.com/2701/Replacements.pdf",
    category: GEOGRAPHY,
  },
  {
    question: `Formed in Liverpool in 1960, this legendary British rock band is widely regarded as one of the most influential in the history of popular music. Hits like "Hey Jude," "Let It Be," and "A Hard Day's Night" are just a glimpse of their extensive discography. With members like John Lennon, Paul McCartney, George Harrison, and Ringo Starr, they achieved global fame and success. What is the name of this iconic group that played a pivotal role in shaping the landscape of rock and roll, and whose name sounds like an insect?`,
    answer: "The Beatles",
    category: POP_CULTURE,
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
    question: `This leader had an affair with Margherita Sarfatti, who wrote a biography about him, but she left his country around the time his government published the Manifesto of Race and passed racial laws. When King Zog refused to renew the Treaty of Tirana, this person made Albania a protectorate. During the Abyssinia Crisis, this leader ignored the League of Nations and invaded Ethiopia. This person often used bound wood as a symbol for his political movement. Name this leader of Italy who led the Fascist Parties and was killed by Italians near the end of World War II.`,
    answer: "Mussolini",
    url: "https://files.quizbowlpackets.com/2324/01.pdf",
    category: HISTORY,
  },

  {
    question: `This quantity is proportional to current times magnetic field and can be measured when a charge-carrying object is subject to a magnetic field. This quantity can also be determined experimentally in a redox reaction using the Nernst equation. Kirchoff’s second law states that this quantity is net zero within a loop. This quantity in a capacitor is equal to the charge divided by the capacitance. For 5 points, name this quantity that is the difference of electrical potential between two points and can be found by multiplying current and resistance in a circuit.`,
    answer: "Voltage",
    url: "https://files.quizbowlpackets.com/2571/Packet%205.pdf",
    category: SCIENCE,
  },
  {
    question: `Back when radium paint was used to make luminous watches, the sulfide of this element was typically used with the paint. An ion of this element is central to both carbonic anhydrase and alcohol dehydrogenase. This metal is in the calamine mineral, which contains both its carbonate and its silicate.  The pyrithione of this element is used to treat skin conditions, including dandruff.  To prevent the rusting of steel or iron, a coating of this element is applied, which is called galvanization.  This element usually makes up about one-third of brass, with most of the rest being copper. Name this metal whose atomic symbol is “Zn”.`,
    answer: "Zinc",
    url: "https://files.quizbowlpackets.com/2797/2023-state-round-1.pdf",
    category: SCIENCE,
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
