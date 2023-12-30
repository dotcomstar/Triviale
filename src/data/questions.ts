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
    question: `In a story by this author, the title character refuses to do work with the reply “I would prefer not to.” This author of “Bartleby, the Scrivener” wrote about Captain Vere executing the title character for killing John Claggart in Billy Budd. In another novel by this author, Ishmael survives the sinking of the Pequod after Queequeg, Starbuck, and Captain Ahab are killed by a white whale. For the point, name this author of Moby Dick.`,
    answer: "Melville",
    fullAnswer: "Herman Melville",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round3.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `This artist impressed Georges Braque with a painting of five nude women with geometric faces reminiscent of African masks. This man painted an old man playing an instrument during his Blue Period. This creator of The Old Guitarist and Les Demoiselles D’Avignon was inspired by a bombing in the Spanish Civil War to create an enormous black and white painting of destruction. For the point, name this painter of Guernica and co-founder of Cubism.`,
    answer: "Picasso",
    fullAnswer:
      "Pablo Diego Jose Francisco de Paula Juan Nepomuceno Mar´ıa de los Remedios Cipriano de la Sant´ısima Trinidad Ruiz y Picasso",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round3.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `In a voltaic cell, a bridge named for this type of substance is responsible for maintaining charge balance. One of these substances can form the mineral halite. Water that has a high concentration of these compounds is called brine and has high salinity. For the point, name this type of solid compound formed by a cation and anion, a common example of which is sodium chloride, NaCl, used in cooking.`,
    answer: "salt",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round3.pdf",
    category: SCIENCE,
  },
  {
    question: `Varroa mites feed on these animals and can spread deformed wing virus to them, and can undergo colony collapse disorder. Karl von Frisch determined that these animals communicate food locations via dancing.  Male ones of these animals are only used for mating and do not assist female workers with gathering nectar or pollen. Habitat loss and the use of pesticides threaten, for the point, what insects that produce honey?`,
    answer: "bees",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round3.pdf",
    category: SCIENCE,
  },
  {
    question: `One of these construction projects required moving the temples of Abu Simbel. In 2017, the spillways at a 770-foot-tall one of these projects named Oroville nearly failed. The baiji dolphin went extinct in Hubei province after one of these projects, named Three Gorges, was built. For the point, name this type of structure that generates hydroelectric power and holds back immense amounts of water.`,
    answer: "dams",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round3.pdf",
    category: HISTORY,
  },
  {
    question: `In this country, Elizabeth McGovern portrayed Cora Crawley, who nearly dies of Spanish flu. In 2017, Jodie Whittaker became the first woman in this country’s history to play a previously male role after succeeding Peter Capaldi in a “regeneration.” One of this country’s classic blue police boxes is used as a prop for the TARDIS, a time machine. Downton Abbey is set in, for the point, what country where Doctor Who airs on the BBC?`,
    answer: "United Kingdom",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round3.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `Guttation is caused by the movement of this substance at night. The cohesion-tension model explains the movement of this substance through tracheids and vessel elements. Stomata are closed to prevent the loss of this substance by transpiration, and a central vacuole stores most of this substance in a plant cell. The xylem transports, for the point, what liquid that enters plants through the roots?`,
    answer: "water",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round2.pdf",
    category: SCIENCE,
  },
  {
    question: `This speech resolves that “these dead here shall not have died in vain.” This short speech ends by describing a “government of the people, by the people, for the people,” and it was given to commemorate a Pennsylvania battle. For the point, name this November 1863 speech by Abraham Lincoln that begins, “Four score and seven years ago.”`,
    answer: "Gettysburg Address",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round2.pdf",
    category: HISTORY,
  },
  {
    question: `The narrator of this work loses her roommate Margot when Dr Dussel moves into the Annex. This work’s narrator writes that “in spite of everything, I believe [...] people are truly good at heart” only days before its author was taken to Bergen-Belsen, where she died at the age of fifteen. Entries addressed to “Kitty” comprise, for the point, what journal written by a Jewish girl hiding in Amsterdam from Nazis?`,
    answer: "Diary of Anne Frank",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round2.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `This city’s NFL team wasted a 2014 first round pick on Johnny Manziel. In a 2017 trade, this city’s NBA team received Isaiah Thomas from Boston in exchange for Kyrie Irving, who helped this city come back from being down three-to-one against Golden State in the 2016 NBA Finals. LeBron James played eleven seasons in, for the point, what city where the NFL’s Browns and NBA’s Cavaliers play in northern Ohio?`,
    answer: "Cleveland",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round2.pdf",
    category: POP_CULTURE,
  },
  {
    question: `A gold and ivory sculpture of this god by Phidias holds Nike in his right hand and sits on a throne. A statue of this god in the Temple at Olympia was one of the Ancient Wonders of the World. A French artist added a raised arm holding a thunderbolt to a Smyrnan statue of, for the point, what sky god, the head of the Greco-Roman pantheon?`,
    answer: "Zeus",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round2.pdf",
    category: RELIGION,
  },
  {
    question: `The Paseo de la Reforma runs through this city, which sinks about a meter every year due to the drainage of the basin of Lake Texcoco. The ancient ruins of Tenochtitlan were replaced by the construction of, for the point, what largest North American city, the capital of the southern neighbor of the USA?`,
    answer: "Mexico City",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round2.pdf",
    category: GEOGRAPHY,
  },
  {
    question: `One of these animals, Tamiu, was entombed with Prince Djhutmose. The Book of the Dead describes Ra as one of these animals biting the serpent Apep, a tribute to these animals’ defense of Egyptian grain storage. Though she originally had the head of a lion, a goddess with the head of this animal guarded mothers and was called Bast. For the point, name these domestic animals revered by ancient Egyptians for their skill at hunting rats and mice.`,
    answer: "cats",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round2.pdf",
    category: HISTORY,
  },
  {
    question: `A novel from this modern country follows the adventures of one hundred and eight outlaws and is called Water Margin. In another novel from this home country of Dream of the Red Chamber, Buddha traps Sun Wukong under a mountain. Journey to the West is from this country, whose Romance of the Three Kingdoms focuses on the warring states of Wei, Shu, and Wu. The Four Classics are novels from, for the point, what large Asian country?`,
    answer: "china",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round2.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `In Ted Maiman’s first functional example of these devices, the gain medium, where population inversion was achieved, was a ruby crystal. These devices use stimulated emission to create a coherent beam of light at a single wavelength, allowing a tighter focus than a traditional lamp. Optical disk drives read data off DVDs by using, for the point, what type of device that emits a colored beam of light?`,
    answer: "lasers",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round2.pdf",
    category: SCIENCE,
  },
  {
    question: `A character in this novel who obsesses over the memory of Rosy Rosenthal’s shooting, Meyer Wolfsheim, refuses to attend the funeral of this novel’s title character. George Wilson shoots the title man in this novel after Tom pretends not to know that the yellow car that ran over Myrtle was driven by Daisy Buchanan. Nick Carraway narrates, for the point, what novel by F. Scott Fitzgerald?`,
    answer: "The Great Gatsby",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round2.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `A gradient of these particles powers the ATP synthase enzyme. By the Bronsted-Lowry definition, bases are acceptors of these particles, whose concentration is measured on the pH scale. A hydrogen ion is equivalent to, for the point, what particle that determines the atomic number of elements, a positively charged particle found in the nucleus of atoms?`,
    answer: "proton",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round2.pdf",
    category: SCIENCE,
  },
  {
    question: `A 1956 revolution in this country targeted Fulgencio Batista and was supported by Che Guevara. A leader of this country finally transferred power to his brother, Raul, in 2006. The U.S. strengthened an embargo against this country following a 1962 crisis over missiles placed here by the Soviets. For the point, name this country that was led by Fidel Castro from Havana.`,
    answer: "cuba",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round2.pdf",
    category: HISTORY,
  },
  {
    question: ` These structures can undergo events classified as Plinian or Strombolian. These structures can cause lahars, which are very quick, wet mudslides, and can release pahoehoe. These natural structures can launch tephra and superheated gas in a pyroclastic flow down their sides. For the point, name these geologic features that, when pressures rise in underground magma chambers, may explosively erupt.`,
    answer: "volcanoes",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round2.pdf",
    category: SCIENCE,
  },
  {
    question: `This soldier was declared a martyr by Pope Callixtus III. Saint Michael is a patron saint of France in part because this soldier had visions of Saints Michael, Margaret, and Catherine telling her to escort the Dauphin to Reims, which required her to lift the English siege of Orleans. French armies in the Hundred Years’ War rallied behind, for the point, what peasant girl who was burned at the stake?`,
    answer: "Joan of Arc",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round2.pdf",
    category: HISTORY,
  },
  {
    question: `This man Drafted a charter of peace between the Peoples of the Book during the Hijra. in the Cave of Hira, this Seal of the Prophets was told to “Recite!” by the angel Jibreel. To escape persecution, this man led his followers to Medina from Mecca after he received the revelation of the Quran. For the point, name this Final Prophet, the founder of Islam.`,
    answer: "Muhammad",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round2.pdf",
    category: RELIGION,
  },
];
export default questions;
