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
    question: `A presidential candidate from this state was criticized for his consulting work with McKinsey for health insurers in Michigan. This state’s politicians include current Democratic presidential candidate Pete Buttigieg, the former mayor of South Bend. Eric Holcomb succeeded Vice President Mike Pence as the governor of, for the point, what Midwestern state west of Ohio?`,
    answer: "Indiana",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round3.pdf",
    category: POP_CULTURE,
  },
  {
    question: `In a story by this author, the title character refuses to do work with the reply “I would prefer not to.” This author of “Bartleby, the Scrivener” wrote about Captain Vere executing the title character for killing John Claggart in Billy Budd. In another novel by this author, Ishmael survives the sinking of the Pequod after Queequeg, Starbuck, and Captain Ahab are killed by a white whale. For the point, name this author of Moby Dick.`,
    answer: "Melville",
    fullAnswer: "Herman Melville",
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
    question: `The members of this mythical group resided on Mount Helicon, and the Hippocrene spring was sacred to them. Orpheus was the son of one of these figures, who were the children of the Titan Mnemosyne and Zeus. Calliope and Thalia represent epic poetry and comedy in, for the point, what group of nine goddesses of the arts?`,
    answer: "muses",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round3.pdf",
    category: POP_CULTURE,
  },
  {
    question: `During this event, a series of “executive overflow” alarms were correctly ignored, as planned by software engineer Margaret Hamilton. The success of this event was met with the reply “Tranquility, we copy you on the ground” from  Houston’s Mission Control. For the point, name this 1969 event in which the Eagle was piloted by Buzz Aldrin and commanded by Neil Armstrong, winning the “Space Race.”`,
    answer: "Apollo Eleven",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round3.pdf",
    category: SCIENCE,
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
    question: `This type of instrument is used in Japan to perform taiko music. A goblet-shaped one of these instruments from West Africa is the djembe, and a pair of these instruments used in namesake Cuban music are congas. The “kettle” types of these instruments can be tuned and are also known as timpani. Bass and snare are common varieties of, for the point, what percussion instruments that are typically played by hitting a surface with sticks?`,
    answer: "drums",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round3.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `This country and Germany signed the 1922 Treaty of Rapallo, which undid much of their earlier Treaty of Brest-Litovsk. This country signed a 1939 pact named for von Ribbentrop and this country’s foreign minister, Molotov, which was broken after Operation Barbarossa, the massive 1941 Nazi invasion of this country. For the point, name this communist country led during World War II by Joseph Stalin.`,
    answer: "Soviet Union",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round3.pdf",
    category: HISTORY,
  },
  {
    question: `This thinker wrote “Hypotheses non fingo” to counter accusations that supernatural forces were required to explain the theories in his Principia Mathematica. Bodies have inertia - that is, a body at rest will stay at rest unless acted on by a force - according to this thinker. For the point, name this 17th century English physicist who described three laws of motion.`,
    answer: "Newton",
    fullAnswer: "Sir Isaac Newton",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round3.pdf",
    category: SCIENCE,
  },
  {
    question: `This man stole a large cash prize from Rodrigo de Triana, who was actually the first crew member to see Guanahani. This man, who enslaved hundreds of Taino and Arawak people on Hispaniola and other islands, is celebrated on a holiday replaced in many communities by Indigenous Peoples’ Day in October. For the point, name this explorer whose three ships, the Nina˜ , Pinta, and Santa Maria, sailed to the Americas in 1492.`,
    answer: "Columbus",
    fullAnswer: "Christopher Columbus",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round3.pdf",
    category: HISTORY,
  },
  {
    question: `In a novel by this author, James Laurence receives a pair of slippers from his young neighbor and, in return, gives her a piano belonging to his deceased daughter. This author wrote a novel in which Professor Bhaer and Laurie marry two of the title girls, and Beth dies of scarlet fever while her sisters, Meg, Jo, and Amy March, come of age. Jo’s Boys and Little Men are by, for the point, what author of Little Women?`,
    answer: "Alcott",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round3.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `In 2018, John Allen Chau was killed on an island in this ocean while trying to serve as a missionary to the Sentinelese. This ocean includes the Gulf of Khambhat and the Meghna River delta which are, respectively, part of the Arabian Sea and Bay of Bengal, found on opposite sides of the country that shares its name with this ocean. For the point, name this ocean between Africa and Australia.`,
    answer: "Indian",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round3.pdf",
    category: GEOGRAPHY,
  },
  {
    question: `During a failed one of these events in Pennsylvania, “Fort Frick” was reinforced by three hundred armed Pinkerton agents in 1892. In 1894, Grover Cleveland ended one of these events that began in Pullman, a company town where Eugene V. Debs helped organize a boycott against the Pullman company’s train cars. Labor unions seeking better conditions may organize, for the point, what type of protest in which employees refuse to work?`,
    answer: "labor strike",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round3.pdf",
    category: HISTORY,
  },
  {
    question: `A short story collection written in this language describes a man who cooks his prized bird to court a widow in “Federigo’s Falcon,” one of a hundred stories told by a group of young nobles fleeing the Plague.  Sonnets written in this language are divided into an octet and a sestet in a style named for Petrarch. For the point, name this language of the Decameron by Boccaccio, a writer from Florence.`,
    answer: "Italian",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round3.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `This ritual is forbidden to Zoroastrians because this action fills Atar with the impurities of a human body.  In Hinduism, less than a day should elapse between death and this action, after which relatives may take their loved one’s remains to the river Ganges to scatter them. For the point, name this action, in which a person’s body is reduced to ashes.`,
    answer: "cremation",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round3.pdf",
    category: RELIGION,
  },
];
export default questions;
