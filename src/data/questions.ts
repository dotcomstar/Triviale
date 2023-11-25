const SCIENCE = "SCI";
const HISTORY = "HIS";
const ART_AND_LITERATURE = "ART";
const RELIGION = "REL";
const GEOGRAPHY = "GEO";
const POP_CULTURE = "POP";

export const ALL_CATEGORIES = [
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
  url: string;
  category: string;
}

const questions: Question[] = [
  {
    question: `In Bahai, the Nineteen Day Fast ends on one of these holidays, called Nowruz. On one of these holidays, which occurs fifteen days before the Lantern Festival, children are given red envelopes filled with money. A Jewish one of these holidays is the first of the High Holy Days and takes place nine days before Yom Kippur.  Rosh Hashanah is what type of holiday, which falls on January 1st in the Gregorian Calendar?`,
    answer: "New Years",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2010N.pdf",
    category: RELIGION,
  },
  {
    question: `This practice was controlled by wealthy Basque merchants at Grand Banks in Newfoundland. The Magna Carta outlawed the use of weirs in this practice in England. One war over this practice ended after the UNCLOS defined Exclusive Economic Zones as within a range of 200 nautical miles. Iceland and England fought a series of late 20th century “wars” over this practice in the North Sea. Name this practice, which often yields animals like cod.`,
    answer: "fishing",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2010N.pdf",
    category: HISTORY,
  },
  {
    question: `A stream of electrons moving by a series of cavity resonators generates this kind of radiation in a cavity magnetron. This radiation is commonly used to induce dielectric heating in substances with high water content. Metals with fine points produce sparks when exposed to this kind of radiation. This radiation lies between radio and infrared waves. Name this radiation, which is used by a kitchen appliance of the same name to quickly heat food.`,
    answer: "microwave",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2010N.pdf",
    category: SCIENCE,
  },
  {
    question: `In this colony, John Peter Zenger was acquitted of libeling governor William Cosby, which helped establish freedom of the press. The Stamp Act Congress was held in this colony’s Federal Hall. John Burgoyne failed to establish control of this colony’s Hudson River Valley, and was defeated in this colony at the Battle of Saratoga. Name this home colony of Alexander Hamilton, where the British failed to capture the city of Albany.`,
    answer: "New York",
    url: "https://files.quizbowlpackets.com/2702/Round1.pdf",
    category: HISTORY,
  },
  {
    question: `In 2013, guard Brandon Jennings insisted that this team would win “in six,” even though they were swept in the first round of the playoffs. This team won their first championship in 1971, led by Kareem Abdul-Jabar, and took their second in when Brook Lopez and Khris Middleton did finally beat the Suns in six games. Giannis Antetokounmpo plays for what 2021 NBA Champions from eastern Wisconsin?`,
    answer: "Bucks",
    url: "https://files.quizbowlpackets.com/2702/Round2.pdf",
    category: POP_CULTURE,
  },
  {
    question: `The Lockheed WP-3D Orion is a nicknamed a “hunter” of these systems, which cannot form near the equator due to a weak Coriolis force. The Saffir-Simpson scale classifies these weather systems, which have an eyewall that drives a storm surge onto land in instances of these system classified as “Category 5.” Name these violent, tropical Atlantic cyclones exemplified by Ida and Katrina.`,
    answer: "hurricanes",
    url: "https://files.quizbowlpackets.com/2702/Round1.pdf",
    category: SCIENCE,
  },
  {
    question: `Securities backed by these products are created and sold by Fannie Mae and Freddie Mac, which were taken over by the federal government in 2008. In 2007, during the Great Recession, the “adjustable rate” type of this financial product rose too quickly for their borrowers to pay them off, leading to massive foreclosures. Give this term for a loan taken out for the purchase of a house.`,
    answer: "mortgages",
    url: "https://files.quizbowlpackets.com/2702/Round1.pdf",
    category: POP_CULTURE,
  },
  {
    question: `In the beliefs of the Latter Day Saints movement, this man was the mortal form of the angel Michael, and lived near Jackson County, Missouri. In Islam, Iblis was banished from Heaven for refusing to bow before this man. This man became the father of Seth after his eldest son committed the first murder. Cain and Abel were the sons of what husband of Lilith and Eve, the first man created by God?`,
    answer: "Adam",
    url: "https://files.quizbowlpackets.com/2702/Round1.pdf",
    category: RELIGION,
  },
  {
    question: `An unfinished work by this composer includes a “Lacrimosa” section that was completed by Franz Sussmayr after this man died at age thirty-five. This composer wrote an unfinished ¨ Requiem and forty-one symphonies, the last of which is nicknamed “Jupiter.” Name this prolific Austrian child prodigy who wrote the chamber piece Eine Kleine Nachtmusik [“EYE”-nah KLYE-nah NOKT-moo-zeek], which is sometimes nicknamed “A Little Night Music.”`,
    answer: "Mozart",
    url: "https://files.quizbowlpackets.com/2702/Round1.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `This artist painted Olive Trees in a Mountainous Landscape while staying in the village of Saint-Remy in an asylum. This artist left the Yellow House in Arles after having a falling out with his friend Paul Gauguin, and painted a series of Sunflowers after moving to France from the Netherlands. Name this artist who painted a looming cypress tree under a swirling sky in his Starry Night.`,
    answer: "van gogh",
    url: "https://files.quizbowlpackets.com/2702/Round1.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `According to Herodotus, the first female ruler of this civilization was the semi-mythical empress Nitocris, whom Herodotus associated with Menkaure. This civilization was ruled from Amarna by the husband of Nefertiti. Another female ruler of this civilization, Hat-shep-sut, wore masculine clothing to represent the sun god Ra. Name this ancient African civilization that ruled the area around the Nile river.`,
    answer: "Egypt",
    url: "https://files.quizbowlpackets.com/2702/Round1.pdf",
    category: HISTORY,
  },
  {
    question: `Larvae of the insect family Agro-myzi-dae are “miners” of these structures, where bundle-sheath cells are found. These structures can be “palmately compound,” and they have parallel veins in monocots.  Carotenoid pigments that are yellow and orange become more prominent in these structures before they are shed by deciduous trees. Name these green plant structures that are the primary site of photosynthesis.`,
    answer: "leaves",
    url: "https://files.quizbowlpackets.com/2702/Round1.pdf",
    category: SCIENCE,
  },
  {
    question: `A speech by this man reflects that, if an assassination against him had succeeded, he would have been unable support the Southern Christian Leadership Conference during the Birmingham Campaign. This man gave the “I’ve Been to the Mountaintop” speech, in Memphis in 1968, the night before he was successfully assassinated by James Earl Ray. Name this civil rights leader who also gave the “I Have a Dream” speech.`,
    answer: "King",
    url: "https://files.quizbowlpackets.com/2702/Round1.pdf",
    category: HISTORY,
  },
  {
    question: `Each of bromine and this element name a type of number used to characterize the unsaturation of fats.  A common clock reaction changes color when this element complexes with starch. Pills containing potassium and this element may be issued to victims of nuclear disasters. A product whose name combines this element and “beta” is a popular skin antiseptic. Name this purplish halogen that can be added to table salt for thyroid health, and that has atomic number 53 and symbol I [EYE].`,
    answer: "iodine",
    url: "https://files.quizbowlpackets.com/2702/Round2.pdf",
    category: SCIENCE,
  },
  {
    question: `The most expensive painting ever sold, Salvator Mundi, is by this artist and depicts Jesus holding a clear orb. In another painting by this artist, Judas clutches a bag on the table as Jesus announces that he has been betrayed. This artist’s most famous painting, which is the centerpiece of the Louvre museum, depicts a woman with an enigmatic smile. Name this artist of The Last Supper and the Mona Lisa.`,
    answer: "da vinci",
    url: "https://files.quizbowlpackets.com/2538/TAILS%20Packet%201.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `This man won the 1904 Nobel Prize in Physiology for using vivisection and fistulas to study the digestive system. The concept of “reflex at a distance” was expanded on by this man, with a test in which a buzzer being sounded at the same time as an assistant provided food; both the assistant and the buzzer sound triggered the salivation response. Name this Russian scientist who studied classical conditioning by feeding dogs.`,
    answer: "Pavlov",
    url: "https://files.quizbowlpackets.com/2702/Round4.pdf",
    category: SCIENCE,
  },
  {
    question: `This state is home to the Ten Thousand Islands, a collection of islets off the coast of this state's largest national park. Big Cypress National Reserve lies north of that national park in this state, which is named a “River of Grass” for being a giant swamp fed by Lake Okeechobee. Crocodiles, manatees, and mangrove trees are among the distinctive features of what state’s Everglades National Park?`,
    answer: "Florida",
    url: "https://files.quizbowlpackets.com/2538/TAILS%20Packet%201.pdf",
    category: GEOGRAPHY,
  },
  {
    question: `The Z-scheme is a part of this process in which the oxygen evolution reaction produces electrons that are donated to P680. The Calvin cycle in this process uses RuBP and RuBisCO to convert carbon dioxide and other compounds into glucose, and is called the light-independent phase of this process. Name this process which occurs in chloroplasts where light is converted into energy for plants.`,
    answer: "photosynthesis",
    url: "https://files.quizbowlpackets.com/2538/TAILS%20Packet%201.pdf",
    category: SCIENCE,
  },
];

export default questions;
