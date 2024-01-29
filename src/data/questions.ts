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
    question: `Settlers in this state were led by William B. Ide during a revolt commemorated by its state flag, which
    features a grizzly bear. In the 1840s, John Fremont explored much of this state, including the San Joaquin Valley. For the point, name this western US state whose population boomed from “Forty-Niners”
    seeking gold near Sacramento.`,
    answer: "California",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round8.pdf",
    category: HISTORY,
  },
  {
    question: `In a novel titled for this medical condition, the doctor’s wife is the only character not affected by this
    condition, which is compared to “falling into a milky sea.” The sonnet “When I Consider How My Light
    is Spent” describes a poet with this medical condition, which may have been caused by a detached retina. For the
    point, John Milton was affected by what condition that titles a Jose Saramago novel about people losing their ´
    eyesight?`,
    answer: "blindness",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round8.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `Litharge, an oxide of this element, is a component of fine crystal. This final element in the uranium decay
    chain was once used as an antiknock agent added to gasoline. Patients undergoing an x-ray wear an apron
    with this element as shielding. This element’s high toxicity prevents its modern use in paint and water pipes. For the
    point, name this metallic element used in bullets, but not pencils, whose symbol is Pb.`,
    answer: "Lead",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round8.pdf",
    category: SCIENCE,
  },
  {
    question: `While helping lead this event, Cotton Mather defended the use of “spectral evidence” based on visions.
    Giles Corey was killed in this event by having heavy stones piled on him because he refused to plead either
    guilty or innocent. Nineteen people were hanged during, for the point, what 1690s hysteria in Massachusetts in
    which people were accused of sorcery?`,
    answer: "Salem witch trials",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round7.pdf",
    category: HISTORY,
  },
  {
    question: `In this story, a princess complains when her grandmother decorates her with eight oysters. This story’s
    protagonist transforms into sea foam because she is unable to gain a human soul. After rescuing a handsome
    prince, this story’s title character sells her voice to a sea-witch for a pair of legs, but fails to get a prince to fall in
    love with her. For the point, name this classic Hans Christian Anderson fable about a title ocean-dwelling girl.`,
    answer: "The Little Mermaid",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round7.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `In 1846, this country’s city of Angostura changed its name to Ciudad Bolivar. The ABC islands of Aruba,
    Bonaire, and Curac¸ao are just north of this mainland country, a little east of the opening
    to Lake Maracaibo. The Orinoco River flows through this country into the Atlantic Ocean just northwest of
    Guyana. For the point, name this South American country, found east of Colombia, whose capital city is Caracas.`,
    answer: "Venezuela",
    fullAnswer: "Bolivarian Republic of Venezuela",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round7.pdf",
    category: GEOGRAPHY,
  },
  {
    question: `This state’s city of Beaumont near Port Arthur is home to Spindletop, the site of a 1901 discovery that
    triggered an economic boom. Geologists in this state have a hard time studying its Barnett Shale, a formation
    with massive natural gas reserves, because it lies underneath a sprawling metroplex that includes Plano and
    Fort Worth. For the point, name this southern US state where the oil industry grew the cities of Dallas and Houston.`,
    answer: "Texas",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round7.pdf",
    category: GEOGRAPHY,
  },
  {
    question: `A fifteenth-century statue of this religious figure wears sandals with ornate, knee-length leg guards,
    and twines his left toes into the beard of a defeated enemy. A bronze sculpture of this young man wears a
    wide-brimmed hat topped with laurels to represent his victory over a giant from Gath. For ten points, name this
    biblical king who, in a sculpture by Donatello, stands over the disembodied head of Goliath.`,
    answer: "David",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round7.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `Gallium’s sudden tendency to perform this action inspired the title of Sam Kean’s book The Disappearing
    Spoon. Heat of fusion refers to the energy needed to achieve this process. Spreading rock salt on ice lowers
    the point at which this process takes place. For the point, name this phase change, the opposite of freezing, in
    which a solid becomes a liquid.`,
    answer: "Melting",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round7.pdf",
    category: SCIENCE,
  },
  {
    question: `This literary character is found dead in his laboratory by his servant, Poole, and his friend, J.G.
    Utterson, to whom this man shows a letter of apology supposedly written by the murderer of Sir Danvers
    Carrew. Another of this man’s friends, Dr Lanyon, dies of shock after seeing this man reveal the “evil side” of his
    nature by consuming a potion. For the point, name this fictional doctor who transforms himself into Edward Hyde.`,
    answer: "Jekyll",
    fullAnswer: "Doctor Henry “Harry” Jekyll ",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round7.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `The family of Dick Grayson, the original Robin, worked in this type of place. The song “Entry of
    the Gladiators” is commonly played at this type of place, one of which was operated until 2017 by Ringling
    Brothers and Barnum and Bailey. For the point, name this type of traveling performance that commonly involves
    lion tamers, ring masters, and clowns.`,
    answer: "circus",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round7.pdf",
    category: POP_CULTURE,
  },
  {
    question: `The man who discovered this object’s orbit died in 1742, sixteen years before he could prove that it is
    periodic. The European Space Agency’s Giotto was one of five spacecraft that studied this object in 1986,
    the last time it was visible to the naked eye. For the point, name this object that approaches Earth every seventy-six
    years and is probably the most famous comet.`,
    answer: "Halleys Comet",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round7.pdf",
    category: SCIENCE,
  },
  {
    question: `The Rothschild subspecies of these animals have five ossicones, although most of these animals only
    have two, as do these animals’ relatives, okapis. Darwin described these animals as “beautifully adapted for
    browsing on the higher branches of trees.” For the point, name these mammals whose long necks make them the
    tallest land animals in the world.`,
    answer: "giraffes",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round7.pdf",
    category: SCIENCE,
  },
  {
    question: `This poem’s speaker asks if in “the distant Aidenn” he could “clasp a sainted maiden” after he responds
    to a strange tapping at his window. An animal in this poem perches on a “pallid bust of Pallas” and seems
    to taunt the speaker over the death of Lenore by repeating the word “nevermore.” For the point, name this poem
    about a man driven to despair by a black bird, written by Edgar Allan Poe.`,
    answer: "The Raven",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round7.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `Decreases in this phenomenon and the LFPR indicates a rise in discouragement. This economic
    phenomenon can be structural, when it is caused by technological changes, or frictional, which reflects the
    time spent trying to end this phenomenon. Retired people are not counted by, for the point, what negative
    economic rate that describes the number of people who aren’t working?`,
    answer: "unemployment rate",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round7.pdf",
    category: POP_CULTURE,
  },
  {
    question: `This quantity can be defined as momentum squared divided by two times the mass. This quantity is
    conserved during elastic collisions but not inelastic collisions, and it is calculated by the formula one-half
    times mass times velocity squared. A roller coaster maximizes this energy at the bottom of a hill. For the
    point, name this type of energy that is possessed by all moving objects, often contrasted with potential energy`,
    answer: "Kinetic energy",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round8.pdf",
    category: SCIENCE,
  },
  {
    question: `This goddess’s tears turn into red gold when she misses her husband Odr. Half of those killed in battle go
    to this goddess’s hall, Folkvangr. Loki turned into a fly in an attempt to steal Brisingamen, this goddess’s
    necklace, and she rides a chariot pulled by cats. Thor dressed like this goddess in order to retrieve his stolen hammer.
    For the point, name this Norse goddess of love and beauty.`,
    answer: "Freyja",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round8.pdf",
    category: RELIGION,
  },
  {
    question: `A poem by this writer promises “I will come again, my love / though ‘twere ten thousand mile” and
    compares love to a “red, red rose.” This poet says “we’ll tak’ a cup o’ kindness yet” and asks “should auld
    acquaintance be forgot” in his local dialect, which he also used for a poem in which “the best laid schemes o’ Mice
    an’ Men / gang aft agley.” For the point, name this Scottish poet of “Auld Lang Syne” and “To a Mouse” whose name describes what you would get if you touched a fire.`,
    answer: "Burns",
    fullAnswer: "Robert Burns",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round8.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `This artist created a Lobster Telephone and painted a Disintegration of one of his paintings, in which a
    bare tree trunk separates into segments. Ants crawl on the surface of a red object in a painting by this artist
    set on a Catalonian beach, in which a distorted face with long eyelashes is draped with a soft-textured clock. For the
    point, name this Spanish Surrealist artist of The Persistence of Memory`,
    answer: "Dali",
    fullAnswer:
      "Salvador Domingo Felipe Jacinto Dali i Domenech, Marquis de Pubol",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round8.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `This ruler legendarily dissolved the world’s largest pearl in vinegar, then drank it to win a bet. A carpet
    was used to sneak this ruler into the headquarters of Julius Caesar. After losing the Battle of Actium, this
    ruler supposedly asked for and received a basket of figs, which hid an asp that she then used to commit
    suicide. For the point, name this Egyptian pharaoh, the lover of Julius Caesar and Marc Antony`,
    answer: "Cleopatra",
    fullAnswer: "Cleopatra VII Philopator",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round8.pdf",
    category: HISTORY,
  },
  {
    question: `In a song by this band, Halsey sings “I want something stronger / Than a moment, than a moment, luv”
    and repeats the phrase “oh, my, my, my.” The albums Wings and 2 Cool 4 Skool are by this group, which
    became the first K-Pop group to win a Billboard Music Award. “Blood, Sweat, and Tears” and “Boy With
    Luv” are by, for the point, what seven-member Korean boy band?`,
    answer: "BTS",
    fullAnswer: "Bangtan Sonyeondan",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round8.pdf",
    category: POP_CULTURE,
  },
];

export default questions;
