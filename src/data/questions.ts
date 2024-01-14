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
    question: `The efficiency of refrigerators was once rated in frigories, a unit equivalent to one of this unit per hour.  It is not a unit of mass or temperature, but one of this unit defines the specific heat of water. There are 4.184 joules in the small version of this unit, and there are nine of their large kind in each gram of fat. For the point, name this non-SI unit that is listed on packages to show the energy content of food.`,
    answer: "calorie",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round4.pdf",
    category: SCIENCE,
  },
  {
    question: `Despite the fact that this good is not edible, the British lamented a “famine” of it caused by a Union Navy blockade. Boll weevils ruin harvests of this good. Eli Whitney designed a “gin” to separate the seeds and fibers of, for the point, what textile cash crop that was overwhelmingly grown by slaves in the American South?`,
    answer: "cotton",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round4.pdf",
    category: HISTORY,
  },
  {
    question: `An example of this system runs eight hundred miles from Prudhoe Bay to the port town of Valdez, and its revenue is used in a Permanent Fund that pays the residents of Alaska. President Trump put down the Standing Rock protest this kind of system, Dakota Access, that threatened sacred land and drinking water.  Keystone XL is, for the point, one of what type of construction that transports crude oil over land?`,
    answer: "oil pipeline",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round4.pdf",
    category: POP_CULTURE,
  },
  {
    question: `A test named for these objects will tell whether a relation is a function by checking if one of these objects intersects the graph more than once. These lines do not have slope and are parallel to the y-axis, which is itself one of these lines. For the point, name this type of line that creates a right angle when it meets a horizontal line`,
    answer: "vertical lines",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round3.pdf",
    category: SCIENCE,
  },
  {
    question: `One of these objects in Norse myth is the home of Nidhogg, a dragon who gnaws on its base and exchanges ¨ insults with an eagle with the help of Ratatoskr, a squirrel. One of these objects connects the Nine Worlds in Norse myth. Odin learned knowledge of the runes by tying himself to Yggdrasil, one of, for the point, what kind of large, branching plant?`,
    answer: "trees",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round3.pdf",
    category: RELIGION,
  },
  {
    question: `On a collaboration with Khalid, this artist sings “Oh, I hope some day I’ll make it out of here.” This artist uses a soundbite from The Office in a song on her 2019 album When We All Fall Asleep, Where Do We Go? This artist frequently wears baggy clothes to avoid criticism about her body. For the point, name this teenage singer of “Bury a Friend” and “Bad Guy.”`,
    answer: "Billie Eilish",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round3.pdf",
    category: POP_CULTURE,
  },
  {
    question: `The smallest type of this value is represented by aleph null. In a thought experiment, David Hilbert’s “Grand Hotel” features this many rooms, all occupied, and is still able to accommodate more guests. The set of whole numbers has a “countable” type of this size. For the point, give this value, the number of digits in the decimal expansion of pi, that is represented by a sideways eight.`,
    answer: "infinity",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round3.pdf",
    category: SCIENCE,
  },
  {
    question: `The coastal resort of Provincetown lies on the tip of this state’s eastern region, and cities like New Bedford lie on Buzzards Bay in this state’s south. Myles Standish State Forest is found in a coastal region of this state, which includes the islands of Chappaquiddick, Martha’s Vineyard, and Nantucket. Plymouth Colony was established in what is now, for the point, what New England state that borders both Connecticut and Rhode Island?`,
    answer: "Massachusetts",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round3.pdf",
    category: GEOGRAPHY,
  },
  {
    question: `A deadly biochemical attack in this country occurred when Aum Shinrikyo, a doomsday cult, released sarin gas in this country’s capital’s subway system. This country, which committed war crimes during its control of Manchukuo, controversially issued textbooks ignoring those crimes and others in China and Korea during World War II. For the point, name this country currently led by Shinzo Abe.`,
    answer: "Japan",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round3.pdf",
    category: HISTORY,
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
    question: `This poet wrote about a man who insists that “good fences make good neighbors.” This man ended a poem in which “two roads diverged in a yellow wood” by saying he would pretend that it has “made all the difference” that he “took the one less traveled by.” For the point, name this American poet of “Mending Wall” and “The Road Not Taken” with a chilly last name synonymous with a deposit of small white ice crystals formed on the ground or other surfaces below freezing.`,
    answer: "Frost",
    fullAnswer: "Robert Frost",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round4.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `This modern organization was preceded by a Coal and Steel Community. This organization’s Single Market allows the free movement of capital and persons, allowing citizens to work and live in any member country. The United Kingdom voted to leave this organization in 2016, a decision known as Brexit. For the point, name this organization of countries whose primary currency is the Euro.`,
    answer: "European Union",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round4.pdf",
    category: HISTORY,
  },
  {
    question: `These organs secrete vasopressin and renin, and they includes capillary networks surrounded by a Bowman’s capsule in their nephrons. Ureters bring urine from this organ to the bladder. Renal replacement therapies like dialysis are used when these organs fail. Blood is filtered by, for the point, what pair of bean-shaped organs?`,
    answer: "kidneys",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round4.pdf",
    category: SCIENCE,
  },
  {
    question: `In the fifth century, the Forty Days’ Fast of Saint Martin was established as the lead-up to this holiday.  The Sun of Righteousness in Malachi helped establish this holiday on a Roman solstice day in Catholicism.  This modern holiday often includes representations of shepherds and Magi visiting a stable in Bethlehem. For the point, name this Christian holiday celebrating the birth of Jesus.`,
    answer: "Christmas",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round4.pdf",
    category: RELIGION,
  },
  {
    question: `A resident of this literary town vanishes after stopping near Wiley’s Swamp on his way home from a nearby farm. A man from this town claims he was chased by the Galloping Hessian. Brom Bones marries Katrina in this town shortly after the disappearance of the schoolteacher, Ichabod Crane. For the point, name this New England town that, in a short story by Washington Irving, is haunted by the Headless Horseman.`,
    answer: "Sleepy Hollow",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round4.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `This plant is the habitat for cochineals, insects that are harvested to produce a deep red dye. This succulent plant has areoles, small, spiny bumps that defend the plant’s stem. The saguaro is a giant example of this plant found in Sonora and Arizona. For the point, name this plant that typically has excellent water storage abilities to survive in the desert.`,
    answer: "Cactus",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round4.pdf",
    category: SCIENCE,
  },
  {
    question: `A group of these people defeated Gaius Claudius Glaber after rappelling down Mount Vesuvius on vines. The annual declaration of war on a group of these people allowed kryptes to freely kill them in order to complete the agoge. Helots were classified as these people in Sparta, and thousands of these people were crucified along the Appian Way after Spartacus’s revolt failed. The Roman libertini were formerly, for the point, what class of un-free people?`,
    answer: "slaves",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round4.pdf",
    category: HISTORY,
  },
  {
    question: `On the right side of this painting, a woman holds out a pink cloak to cover this painting’s title figure. On the left side of this painting, Zephyrus, the god of wind, blows the title figure of this painting to shore. This painting’s central figure stands on a floating seashell after rising from the sea. For the point, name this painting depicting the origin of the Roman goddess of beauty, painted by Sandro Botticelli.`,
    answer: "The Birth of Venus",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round4.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `Fluids for which this property remains constant are called incompressible. The specific gravity is the ratio of this property for a substance and for water. Water has a value of roughly one gram per cubic centimeter for this quantity. For the point, name this physical property, calculated by dividing an object’s mass by its volume.`,
    answer: "density",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round4.pdf",
    category: SCIENCE,
  },
];
export default questions;
