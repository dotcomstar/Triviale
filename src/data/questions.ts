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
    question: `In June 1976, thousands of high school students in Soweto, a township outside this city, protested the use of Afrikaans as the official teaching language, and over 100 protesters were killed by police. Soweto was officially incorporated into this city in 2002. This city also hosted the finals for the 2010 FIFA World Cup. For the point, name this city, the largest in its country.`,
    answer: "Johannesburg",
    url: "https://duckduckgo.com/?t=ffab&q=Johannesburg&atb=v319-1&ia=web",
    category: HISTORY,
  },
  {
    question: `This biome is home to most members of the genus Phyllobates, which includes batrachotoxin-generating frogs. This biome is home to the scarlet macaw, and although these biomes can be temperate, as in the Pacific Northwest, they are usually tropical. Numerous undiscovered species live 100 feet high in the canopy in, for the point, what biome where numerous species of tall trees thrive, thanks to abundant precipitation?`,
    answer: "Rainforest",
    altAnswer: ["Tropical Rainforest"],
    url: "https://files.quizbowlpackets.com/1823/Round%202.pdf",
    category: SCIENCE,
  },
  {
    question: `In a novel by this author, Rosemary Hoyt comes between the protagonist and his wife, Nicole Diver, who is based on this author’s wife, Zelda. In another novel by this author, the narrator breaks up with Jordan Baker after discovering that she cheated at golf, and the narrator’s West Egg neighbor has an affair with Daisy Buchanan. For the point, name this author of Tender is the Night and The Great Gatsby`,
    answer: "Fitzgerald",
    fullAnswer: "F Scott Fitzgerald",
    altAnswer: [
      "Francis Scott Fitzgerald",
      "Francis Scott Key Fitzgerald",
      "F Scott Fitzgerald",
      "F Scott Key Fitzgerald",
    ],
    url: "https://files.quizbowlpackets.com/1823/Round%202.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `A wagon train retreating from this battle was caught at Monterey Pass, though George Meade couldn’t catch up to inflict serious damage. On the last day of this battle, Lewis Armistead broke the enemy line at “the Angle,” a spot now commemorated as the “High Water Mark of the Confederacy,” and Pickett’s Charge failed to turn the tide of this July 1863 battle. For the point, name this battle of the Civil War, whose site was made a cemetery by President Lincoln in a famous address.`,
    answer: "Gettysburg",
    url: "https://files.quizbowlpackets.com/1823/Round%201.pdf",
    category: HISTORY,
  },
  {
    question: `In a short story written in this language, the book The Combed Thunderclap is kept in an infinite library of hexagonal rooms. A poet wrote in this language that “tonight I can write the saddest lines” as part of his Twenty Love Poems and a Song of Despair. The Garden of Forking Paths is a collection in, for the point, what language that was used by Jorge Luis Borges and Pablo Neruda, writers from Argentina and Chile?`,
    answer: "Spanish",
    altAnswer: ["Espanol"],
    url: "https://files.quizbowlpackets.com/1823/Round%201.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `These plastids contain translocons called Tic and Toc, and replicate independently in the mesophyll of leaves. Within these double-membraned organelles, a fluid called stroma surrounds grana, stacks of thylakoids that carry out light-dependent reactions. For the point, name these cell organelles that contain chlorophyll, a green pigment that helps conduct photosynthesis.`,
    answer: "Chloroplasts",
    altAnswer: ["Chloroplast"],
    url: "https://files.quizbowlpackets.com/1823/Round%201.pdf",
    category: SCIENCE,
  },
  {
    question: `A failure to complete this project was remedied by Scotland’s 1707 union with England, as Scottish financiers failed to complete it at the Gulf of Darien. When this project was completed in 1914, it incorporated a valley through the Gaillard Cut, the man-made Gatun Lake, and a series of three locks into a 48-mile long structure. For the point, name this engineering project that cut across Central America to connect the Atlantic and Pacific Oceans.`,
    answer: "Panama Canal",
    url: "ttps://files.quizbowlpackets.com/1823/Round%201.pdf",
    category: HISTORY,
  },
  {
    question: `One of these events radiates from Eltanin and Rastaban and is produced by Earth’s intersection with Giacobini-Zinner’s debris path. Another of these events appears to originate from the constellation Perseus, as seen from the ground, and occurs each year in August. The Draconids and Perseids are examples of, for the point, what brilliant celestial displays in which hundreds of “shooting stars” appear?`,
    answer: "Meteor Showers",
    altAnswer: ["Meteor Shower"],
    url: "https://files.quizbowlpackets.com/1823/Round%201.pdf",
    category: SCIENCE,
  },
  {
    question: `In a painting by this artist, five peasants gather around the title food under the light of a single lantern.  This man painted a yellow restaurant in Café Terrace at Night, and this artist of The Potato Eaters also painted a series of Sunflowers while living in Arles. This man painted the village of Saint-Rémy under a swirling sky while institutionalized for cutting off his own ear. For the point, name this Dutch painter of Starry Night.`,
    answer: "Van Gogh",
    altAnswer: ["Vincent Willem van Gogh", "Vincent van Gogh"],
    url: "https://files.quizbowlpackets.com/1823/Round%201.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `This country is home to the Turpan Water System, which collects runoff from the Flaming Mountains.  Monks in this country accidentally altered the dangerous confluence of three rivers when they created a giant stone statue to bless sailors traversing it. A tomb for one leader of this country contained a mercury river and an army of Terracotta soldiers. The Leshan Buddha is located in, for the point, what country, which was historically defended by its Great Wall?,`,
    answer: "China",
    altAnswer: ["Middle Kingdom", "Zhongguo"],
    url: "https://files.quizbowlpackets.com/1823/Round%201.pdf",
    category: HISTORY,
  },
  {
    question: `This author told a flower that “beauty is its own excuse for being” in “The Rhodora.” A “transparent eyeball” absorbs all the world has to offer in one of this man’s essays, and a speech he gave at Harvard was published as “The American Scholar.” This author wrote that “a foolish consistency is the hobgoblin of little minds” and rented the use of a pond to his friend, Henry David Thoreau. For the point, name this Transcendentalist author of the essays “Nature” and “Self-Reliance.”`,
    answer: "Emerson",
    fullAnswer: "Ralph Waldo Emerson",
    altAnswer: ["Ralph Emerson", "Ralph Waldo Emerson"],
    url: "https://files.quizbowlpackets.com/1823/Round%201.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `This biblical figure’s father described him as either a “fruitful vine” or a “wild donkey’s foal,” and he was thrown in jail for refusing the romantic advances of Potiphar’s wife. This man slipped a silver cup into a bag of grain belonging to his brother, Benjamin. This man’s brothers, including Gad and Judah, sold him into slavery out of jealousy, since he was the son of Rachel and the favorite of his father, Jacob. For the point, name this biblical man who owned a beautiful coat.`,
    answer: "Joseph",
    url: "https://files.quizbowlpackets.com/1823/Round%201.pdf",
    category: RELIGION,
  },
  {
    question: `Characters with this profession include Ornstein, the captain of Gwyn’s Four in Dark Souls. In a 2014 game partially titled for this profession, players fight the Order of No Quarter and use a shovel as a weapon.  In Hearthstone, taunt minions can be killed by the battlecry of a Black one of these warriors, who says “None shall pass” in reference to a skit from Monty Python and the Holy Grail. For the point, name this class of warriors that, in video games, often fight dragons with swords.`,
    answer: "Knight",
    altAnswer: ["Knights", "Dragon Slayer", "Dragon Slayers"],
    url: "https://files.quizbowlpackets.com/1823/Round%201.pdf",
    category: POP_CULTURE,
  },
  {
    question: `Three atoms of this element are present in acetone, the simplest ketone; one of those atoms is double bonded with oxygen. This element’s four valence electrons allow it to form four bonds with other elements.  This element’s allotropes include diamond, graphite, and stable nanotubes, and its 14-amu isotope is used in radiometric dating. For the point, name this element, the focus of organic chemistry, with atomic number 6 and atomic symbol C.`,
    answer: "carbon",
    url: "https://files.quizbowlpackets.com/1823/Round%201.pdf",
    category: SCIENCE,
  },
  {
    question: `After this event, critics complained that a two-year timeline has not yet begun because no “official notice” was given that Article 50 would be invoked. In its aftermath, Nigel Farage stepped down as a party leader and Theresa May replaced David Cameron as Prime Minister. Stock markets plunged after news broke of, for the poins, what June 2016 public referendum that decided to end a country’s participation in a European political community?`,
    answer: "Brexit",
    url: "http://localhost:5173/",
    category: HISTORY,
  },
  {
    question: `These mathematical objects are the solutions to ordinary differential equations, which relate them with their derivatives. Composition of these objects make the codomain of one of them the domain of the other.  The vertical line test can easily determine whether a given graph describes one of these objects. For the point, name this mathematical term for a relation in which every input has exactly one possible output, often written in “f of x” form.`,
    answer: "functions",
    altAnswer: ["function"],
    url: "https://files.quizbowlpackets.com/1823/Round%201.pdf",
    category: SCIENCE,
  },
  {
    question: `A character in this novel grows to over ten feet tall after being put on a stretching machine, since he had tried to appear on TV by using a shrink ray. The title character of this novel is deemed more virtuous than children like Mike Teavee and Augustus Gloop after he opens a Whipple-Scrumptious Fudgemallow Delight.  For the point, name this Roald Dahl novel in which Willy Wonka entrusts his Oompa-Loompas to the title boy after he finds a golden ticket.`,
    answer: "Charlie and the Chocolate Factory",
    url: "https://files.quizbowlpackets.com/1823/Round%201.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `On this date in 1929, Albert Kachelleck, the Gusenberg brothers, and four other members of Bugs Moran’s gang were killed, probably on the orders of Al Capone. This Christian feast day celebrates a saint who, according to legend, broke Roman law by performing weddings for soldiers. A Prohibition-era gangster massacre took place on, for the point, what holiday now often celebrated with flowers and written expressions of love?`,
    answer: "Valentines Day",
    altAnswer: [
      "Valentines",
      "St Valentines Day",
      "St Valentines",
      "Valentines Day Massacre",
      "Valentines Day Massacre",
    ],
    url: "https://files.quizbowlpackets.com/1823/Round%201.pdf",
    category: HISTORY,
  },
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
