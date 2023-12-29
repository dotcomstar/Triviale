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
    question: `This man disclosed loans from his parents in a speech that became nicknamed for a cocker spaniel. In
    1973, this man spoke at Disney World, declaring “I’m not a crook;” a year later, after a “smoking gun” tape
    was released, he wrote a letter to Henry Kissinger resigning his office. Gerald Ford succeeded and pardoned, for the
    point, what US President who was embroiled in the Watergate scandal?`,
    answer: "Nixon",
    fullAnswer: "Richard Milhous Nixon",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round2.pdf",
    category: HISTORY,
  },
  {
    question: `This orchestral instrument plays the opening “Promenade” theme of Mussorgsky’s Pictures at an
    Exhibition, and several of them play the rising notes C-G-C to open Strauss’s Also Sprach Zarathustra. This valved instrument is commonly used to play “Taps.” The cornet and bugle are relatives of, for the point, what
    highest-pitched brass instrument?`,
    answer: "trumpet",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round2.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `The Power of a Point theorem concerns the distance of a point from one of these figures. The equation x
    squared plus y squared equals r squared, where r is a real number, will graph one of these shapes, which are
    defined as all points that are the same distance from one point. For the point, name this shape whose area formula
    is pi times the square of its radius.`,
    answer: "circle",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round2.pdf",
    category: SCIENCE,
  },
  {
    question: `This natural phenomenon can be graphed by sinusoidal [sye-nuh-soy-dull] functions. This phenomenon’s standing type has minimal displacement at its nodes. Compton scattering demonstrates that light behaves like a particle, and not just as this phenomenon. For the point, name this physical phenomenon that can carry energy without transferring mass, as seen on the moving surface of the ocean.`,
    answer: "waves",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round1.pdf",
    category: SCIENCE,
  },
  {
    question: `This agreement was negotiated by ambassadors James Monroe and Robert Livingston, who included a fifteen million collar payment that was to be used to invade England. After this agreement, Thomas Jefferson launched the Lewis and Clark Expedition. For the point, name this agreement that nearly doubled the size of the United States by buying, among other territory, New Orleans.`,
    answer: "Louisiana Purchase",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round1.pdf",
    category: HISTORY,
  },
  {
    question: `A poem by William Blake asks one of these animals, “did he who made the Lamb make thee?” and describes this animal “burning bright / in the forests of the night.” Another of these animals discovers he doesn’t like honey, thistles, or acorns shortly after moving to the Hundred Acre Woods. For the point, name this big cat, a stuffed one of which has a misspelled name and loves bouncing in A.A. Milne’s Winnie-the-Pooh.`,
    answer: "tiger",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round2.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `The Blue and Green demes were fans of this sport who clashed in the Nika Riots, which began in the Hippodrome of Constantinople. Gaius Appuleius Diocles became the wealthiest athlete in history by operating a quadriga in this sport. Ancient Olympic prizes for this sport were given to the owner, not the driver. Rome’s Circus Maximus held competitions of, for the point, what sporting event involving horse-drawn vehicles?`,
    answer: "chariot races",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round1.pdf",
    category: HISTORY,
  },
  {
    question: `An early version of this story concerns the Greek slave girl Rhodopis. In the Grimm Brothers version of this story, Aschenputtel’s sisters cut off their toes to trick a prince. Charles Perrault may have mistranslated a word meaning “fur” as “glass” when describing a pair of slippers in this story. For the point, name this fairy tale in which a servant girl’s fairy godmother helps her go to a ball and marry a prince.`,
    answer: "Cinderella",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round1.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `In the Iliad, this figure goes to her mother Dione after being wounded by Diomedes. This goddess gave Hippomenes golden apples to woo Atalanta. This mother of Phobos and Deimos sparked the Trojan War when she promised Helen to Paris, and she was captured in a net with Ares by her husband Hephaestus. For the point, name this Greek goddess of love and beauty`,
    answer: "Aphrodite",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round1.pdf",
    category: RELIGION,
  },
  {
    question: `Foods rich in this substance are called antiscorbutics [anti-skor-byoo-tiks]. Nobel laureate Linus Pauling advocated taking mega-doses of this compound to prevent the common cold. This compound is needed by the body to build collagen, so its deficiency will result in scurvy. For the point, name this vitamin concentrated in citrus fruits like limes and oranges.`,
    answer: "Vitamin C",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round1.pdf",
    category: SCIENCE,
  },
  {
    question: `Three windows in this work’s background align with a real-life doorway in the Santa Maria dele Grazie that cuts off the feet of this painting’s central figure. A man in this work knocks over a salt cellar and clutches a bag of silver while the men around him argue about the revelation that their leader will be betrayed. For the point, name this painting by Leonardo da Vinci that shows Jesus’s final meal with his disciples.`,
    answer: "The Last Supper",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round1.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `In the Collatz conjecture, this type of number is tripled, then has one added to it. Polynomials with this type of degree always have a real root. Adding two of these numbers together always gives you a number (*) without this property. All prime numbers except two are, for the point, what type of number that has reminder 1 when divided by two and is thus contrasted with even?`,
    answer: "odd numbers",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round1.pdf",
    category: SCIENCE,
  },
  {
    question: `This author’s translation of the Red Book of Westmarch changes the names Kalimac and Banazˆır into Meriadoc and Samwise. In one of this author’s novels, the Rohirrim join in a battle against thousands of orcs. In another novel by this man, Bilbo Baggins is sent on a journey with thirteen dwarves by the wizard Gandalf.  For the point, name this linguist and author of The Hobbit and The Lord of the Rings.`,
    answer: "Tolkien",
    fullAnswer: "John Ronald Reuel Tolkein",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round1.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `In July 1994, scientists studying this object made the first observance of an extraterrestrial collision when fragments of the Shoemaker-Levy 9 comet crashed into this planet. This planet’s gravitational pull creates the Kirkwood gaps, which are empty regions within the nearby asteroid belt. The Great Red Spot is found on, for the point, what gas giant, the largest planet in our solar system?`,
    answer: "Jupiter",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round1.pdf",
    category: SCIENCE,
  },
  {
    question: `This country’s throne was contested in the War of the Three Henrys. Catherine de’ Medici incited the 1572 St Bartholomew’s Day Massacre in this country. The Edict of Nantes gave religious protection to this country’s Protestant Huguenots. For the point, name this country where Henry IV justified converting to Catholicism by saying, “Paris is worth a mass.”`,
    answer: "France",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round1.pdf",
    category: HISTORY,
  },
  {
    question: `A religious figure often depicted performing this action in padma-sana, named Gautama, achieved enlightenment by performing this action under the Bodhi tree. Some modern forms of this practice use mantras, repeated patterns of speech or thought, to promote sati, or “mindfulness.” For the point, name this common practice in Buddhism and Hinduism, the act of engaging in deep reflection.`,
    answer: "meditation",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round1.pdf",
    category: RELIGION,
  },
  {
    question: `Justice Ward Hunt decided this woman’s guilt before her trial began and told the jury to declare her guilty. In post-trial remarks, this woman argued that she had the “right to a voice” in government and threatened that she would never pay a one hundred dollar fine that was levied in June 1873. For the point, name this American suffragist who was convicted of illegally voting, and who is honored on a one-dollar coin.`,
    answer: "Anthony",
    fullAnswer: "Susan B. Anthony",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round1.pdf",
    category: HISTORY,
  },
  {
    question: `This character stars in a 2010 game in which he must repair a world created by Yen Sid with a magic paintbrush. In Kingdom Hearts II, this character meets Sora in a world based on the 1928 film Steamboat Willie. Hundreds of silhouettes of this character’s head can be found scattered around a massive amusement park near Orlando, Florida. For the point, name this rodent mascot created by Walt Disney.`,
    answer: "Mickey",
    fullAnswer: "Mickey Mouse",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round1.pdf",
    category: POP_CULTURE,
  },
  {
    question: ` These structures can undergo events classified as Plinian or Strombolian. These structures can cause
    lahars, which are very quick, wet mudslides, and can release pahoehoe. These natural
    structures can launch tephra and superheated gas in a pyroclastic flow down their sides. For the point, name
    these geologic features that, when pressures rise in underground magma chambers, may explosively erupt.`,
    answer: "volcanoes",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round2.pdf",
    category: SCIENCE,
  },
  {
    question: `This soldier was declared a martyr by Pope Callixtus III. Saint Michael is a patron saint of France in
    part because this soldier had visions of Saints Michael, Margaret, and Catherine telling her to escort the
    Dauphin to Reims, which required her to lift the English siege of Orleans. French
    armies in the Hundred Years’ War rallied behind, for the point, what peasant girl who was burned at the stake?`,
    answer: "Joan of Arc",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round2.pdf",
    category: HISTORY,
  },
  {
    question: `This man Drafted a charter of peace between the Peoples of the Book during the Hijra. in the Cave of
    Hira, this Seal of the Prophets was told to “Recite!” by the angel Jibreel. To escape persecution, this man led
    his followers to Medina from Mecca after he received the revelation of the Quran. For the point, name this Final
    Prophet, the founder of Islam.`,
    answer: "Muhammad",
    url: "https://files.quizbowlpackets.com/2364/SCOP10%20MS%20Round2.pdf",
    category: RELIGION,
  },
];

export default questions;
