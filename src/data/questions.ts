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
    question: `The title phenomenon of this artwork frames a background mountain whose name titles the thirty-sixpainting series this work belongs to. This work’s title phenomenon has claw-like edges that threaten three boats in this example of ukiyo-e art. For ten points, name this Japanese woodblock print, part of a series of Views of Mount Fuji created by Hokusai, which shows a tsunami.`,
    answer: "The Great Wave",
    fullAnswer: "The Great Wave Off Kanagawa",
    altAnswer: [
      "The Great Wave Off Kanagawa",
      "Great Wave",
      "The Wave",
      "Wave",
      "nami",
      "Kanagawa oki nami ura",
    ],
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round9.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `The aurora borealis is in this phase, in which balanced amounts of electrons and ions create a highly conductive, but electrically neutral, state. This phase of matter is believed to be the most common in the universe, since it is found in stars. For the points, name this “fourth” phase of matter that possesses much more energy than solids, liquids, or gases.`,
    answer: "Plasma",
    altAnswer: ["Plasmas"],
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round10.pdf",
    category: SCIENCE,
  },
  {
    question: `This nation’s Booker Prize winning authors include Thomas Keneally and Peter Carey; one of Carey’s wins was for a novel about Ned Kelly, a bushranger from this nation who committed a train robbery in the state of Victoria. For the points, name this southern hemisphere nation where Oscar moves the glass church from Sydney through the outback.`,
    answer: "Australia",
    altAnswer: ["Commonwealth of Australia", "The Commonwealth of Australia"],
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round10.pdf",
    category: GEOGRAPHY,
  },
  {
    question: `In a play by this author, Miss Prism accidentally leaves a baby in a handbag at a train station, and finally reveals her mistake to Jack Worthing and Algernon Moncrief. This author of Lady Windermere’s Fan wrote the poem The Ballad of Reading Gaol [redding jail] after he was imprisoned for homosexuality. For the points, name this English playwright of satirical plays like The Importance of Being Earnest, whose name sounds like the description of an untamed animal.`,
    answer: "Wilde",
    altAnswer: ["Oscar Wilde", "Oscar Fingal OFlahertie Wills Wilde"],
    fullAnswer: "Oscar Wilde",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round10.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `This landmass is hypothesized to be the fourth of its kind, following Columbia, Rodinia, and Pannotia.  Alfred Wegener named this landmass, which surrounded the Tethys Sea. Mesosaurus fossils on the coasts of Brazil and Namibia provide evidence for this landmass, which included regions that became Laurasia and Gondwana at the end of Mesozoic Era. For the points, name this supercontinent that broke apart tens of millions of years ago and whose name means “all Earth.”`,
    answer: "Pangea",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round10.pdf",
    category: SCIENCE,
  },
  {
    question: `After a 1895 Supreme Court case briefly struck down this policy, a 1913 Constitutional amendment made it legal. Florida and Nevada are two of seven states that don’t use this policy, whose introduction reduced the importance of tariffs for federal government revenue. The Sixteenth Amendment authorized, for the points, what type of tax that is reported on IRS Form 1040 and which taxes money made by the taxpayer?`,
    answer: "income tax",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round10.pdf",
    category: HISTORY,
  },
  {
    question: `Several diseases of this organelle present with “ragged red” fibers in muscle tissue. This organelle’s inner membrane increases the surface area available for chemical reactions to occur by folding over itself. The electron transport chain synthesizes ATP in, for the point, what cell organelle that is commonly referred to as the powerhouse of the cell?`,
    answer: "mitochondria",
    altAnswer: [
      "mitochondrion",
      "powerhouse of the cell",
      "the powerhouse of the cell",
    ],
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round10.pdf",
    category: SCIENCE,
  },
  {
    question: `In 2014, the NBA forced the sale of a team in this city when owner Donald Sterling was recorded making racist remarks. Prior to playing in Houston and Oklahoma City, Chris Paul played in this city. Players who have recently moved to this city include Paul George, Kawhi Leonard, Anthony Davis, and LeBron James. For the points, name this city where the Staples Center is shared by the Clippers and Lakers.`,
    answer: "Los Angeles",
    altAnswer: ["LA"],
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round10.pdf",
    category: POP_CULTURE,
  },
  {
    question: `Lai Zhide simplified this symbol from the taijitu. The elements of this symbol appear in ba gua trigrams in Taoism, and represent opposing forces like fire and water or masculinity and femininity, to demonstrate that they are ultimately complementary. For the points, name this symbol in Chinese philosophy that represents the balance of light and dark with white and black teardrop shapes curled around each other.`,
    answer: "yin yang",
    altAnswer: ["yang", "yin"],
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round10.pdf",
    category: RELIGION,
  },
  {
    question: `This queen’s marriage was confirmed with the equality motto “Tanto monta, monta tanto.” This ruler of Castile persecuted Jews with the Alhambra decree and defeated the Muslim kingdom of Granada to end the Reconquista; those actions earned this queen and her husband the titles of Catholic Monarchs. For the points, name this Spanish queen who jointly ruled with Ferdinand of Aragon and sponsored Columbus’ first voyage`,
    answer: "Isabella",
    altAnswer: [
      "Isabella I",
      "Isabella of Castile",
      "Isabella de Castile",
      "Isabella the Catholic",
      "Isabela",
    ],
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round10.pdf",
    category: HISTORY,
  },
  {
    question: `This author created One Eye, who dies defending his family from a lynx, leaving Kiche alone with her last living child in wild Yukon Territory. In another novel by this author, Buck is kidnapped and sent to Alaska, where he becomes known as a “Ghost Dog” after joining a wolf pack. For the points, name this author of White Fang and The Call of the Wild.`,
    answer: "London",
    fullAnswer: "Jack London",
    altAnswer: ["Jack London", "John Griffith Chaney London", "John London"],
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round10.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `In 1942, this country raised war funds by carrying out “If Day,” a simulated Nazi occupation. This country’s four divisions of troops were supported by the British at the Battle of Vimy Ridge in World War I.  An eastern city in this country was obliterated by the 1917 explosion of the SS Mont Blanc. The Halifax explosion killed roughly two thousand people in, for the points, what country’s province of Nova Scotia?`,
    answer: "Canada",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round10.pdf",
    category: GEOGRAPHY,
  },
  {
    question: `This force’s namesake constant is approximately 6.67 times ten to the negative eleventh meters cubed over kilograms times seconds squared. During free-fall, this is the only force acting on an object, causing it to accelerate at 9.8 meters per second squared. For the points, name this force of attraction between any two masses, commonly seen pulling objects to Earth’s surface.`,
    answer: "Gravity",
    altAnswer: ["gravitational", "gravitational constant", "gravitation"],
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round9.pdf",
    category: SCIENCE,
  },
  {
    question: `This city is home to a massive collection of Auguste Rodin’s works and Robert Indiana’s LOVE sculpture on Benjamin Franklin Parkway. This is the largest city downriver from Trenton on the Delaware River, which separates this city from Camden, New Jersey. This city’s Rittenhouse Square was designed by William Penn. The Liberty Bell is displayed in, for the points, what largest city in Pennsylvania?`,
    answer: "Philadelphia",
    altAnswer: ["Philly"],
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round9.pdf",
    category: GEOGRAPHY,
  },
  {
    question: `After this man made his brother Joseph an unpopular King of Spain, he had to fight the Peninsular War. This man forced the Treaty of Pressburg, which gave this man large amounts of land from the Austrian Empire. This man beat the Third Coalition at the Battle of Austerlitz in 1805, two months after his navy lost at Trafalgar. For the points, name this emperor whose French army was defeated at Waterloo.`,
    answer: "Napoleon",
    altAnswer: ["Bonaparte", "Napoleon Bonaparte", "Napoleon I"],
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round9.pdf",
    category: HISTORY,
  },
  {
    question: `One example of these objects is an equilateral triangle whose center is removed to create three new equilateral triangles, each of whose centers is similarly removed, and so on. The Sierpinski triangle is one of these images, as is the Mandelbrot set. For the points, name these mathematical images that resemble themselves at intense zooming levels.`,
    answer: "Fractals",
    altAnswer: ["Fractal", "Sierpinski triangle"],
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round10.pdf",
    category: SCIENCE,
  },
  {
    question: `In one myth, this figure’s grandson becomes the first horse in North America. This mythic figure vows to spread mischief in the world after he helps the Earth Maker sing it into existence, likely in reference to his namesake animal’s howl. Stories in the American southwest describe, for the points, what Native American trickster god who took the shape of a common wild canine?`,
    answer: "Coyote",
    altAnswer: ["Coyotl", "Skelep", "Sk elep"],
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round10.pdf",
    category: RELIGION,
  },
  {
    question: `In this man’s highest post, he wrote a Report on Manufactures and four Reports on Public Credit. This man worked with John Jay and James Madison on the Federalist Papers, and he died after an early morning incident near Weehawken, New Jersey. For the points, name this American founding father and first Treasury Secretary who was killed in an 1804 duel with Aaron Burr.`,
    answer: "Hamilton",
    addOns: ["Alexander"],
    fullAnswer: "Alexander Hamilton",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round10.pdf",
    category: HISTORY,
  },
  {
    question: `This philosophical concept is defined by the stronger party, according to Thrasymachus in Plato’s Republic. John Rawls argued that a “veil of ignorance” required to make sure that this concept is applied fairly. A blindfolded woman holding balancing scales often represents, for the points, what moral and ethical concept related to equality and the law?`,
    answer: "justice",
    altAnswer: ["just"],
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round10.pdf",
    category: RELIGION,
  },
  {
    question: `A composer from this country wrote a Fantasia on a theme by a much earlier composer from this country, Thomas Tallis. This is the home country of Ralph Vaughan Williams and the composer of the Enigma Variations, who had one of his Pomp and Circumstance Marches modified for a 1902 coronation. For the points, name this home country of Sir Edward Elgar, who was knighted by King Edward VII`,
    answer: "United Kingdom",
    altAnswer: ["Britain", "England", "UK", "Great Britain"],
    fullAnswer: "United Kingdom of Great Britain and (Northern) Ireland",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round10.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `In the 1830s, the US and UK fought over this state’s border in the bloodless Aroostook War. Bowdoin College was founded in this state in 1794 in Brunswick. Despite sharing no border, this state was part of Massachusetts until 1820. The Webster-Ashburton Treaty decided the border between Canada’s New Brunswick and, for ten points, what northernmost state in New England whose capital is Augusta?`,
    answer: "Maine",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round10.pdf",
    category: HISTORY,
  },
];
export default questions;
