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
  url?: string;
  category: string;
}

const questions: Question[] = [
  {
    question: `A god in this culture, Ometeotl split into two gods to create the world. A heroic god in this culture used the bones of previous humans and his own blood to create the Fifth Sun after journeying through Mictlan. This culture venerated a “Left-Handed Hummingbird” and a “Feathered Serpent” named Huitzilopochtli and Quetzalcoatl. For five points, name this culture whose myths included the story of the founding of Tenochtitlan in modern Mexico City.`,
    answer: "Aztec",
    url: "https://files.quizbowlpackets.com/2852/Round11.pdf",
    category: HISTORY,
  },
  {
    question: `In this city, Sir Edwin Lutyens developed a Bungalow Zone for the British in the early 20th century.  After the Battle of Karnal, the looting of this nearby city included the capture of the Koh-i-Noor diamond and the Peacock Throne. The Lahori Gate is the main entrance to this city’s Red Fort, which became the imperial residence of the Mughals under Shah Jahan. Prior to 1911, Calcutta held this city’s primary status.  For five points, name this city whose “New” district is the capital of India.`,
    answer: "Delhi",
    url: "https://files.quizbowlpackets.com/2852/Round11.pdf",
    category: HISTORY,
  },
  {
    question: `Velocimetry of blood-flow works because of this effect. which predicts a “shift” that depends on the ratio in two differences in speed. The relativistic form of this effect causes a redshift due to the expansion of the universe. This effect occurs when wavefronts appear closer together for an observer if they are moving towards a source. For five points, name this effect that explains why an ambulance siren seems to change pitch.`,
    answer: "Doppler",
    fullAnswer: "Doppler Effect",
    url: "https://files.quizbowlpackets.com/2852/Round11.pdf",
    category: SCIENCE,
  },
  {
    question: `In this novel, John Seward receives letters describing Renfield’s madness and begging him to help Arthur Holmwood’s sick fiancee. A professor in this novel packs a paste of communion wafers around the door of Lucy Westenra’s tomb and in the boxes of earth that the title character transports to England from Transylvania.  Abraham Van Helsing, Mina Murray, and Jonathan Harker hunt the title Count in, for five points, what Bram Stoker novel about an archetypical vampire?`,
    answer: "Dracula",
    url: "https://files.quizbowlpackets.com/2701/Replacements.pdf",
    category: ART_AND_LITERATURE,
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
    question: `The end of this man’s rule included the Night of the Murdered Poets, and he invented the fictitious Doctor’s Plot. His policies caused the holodomor famine in the Ukraine, and this liquidator of the kulaks was denounced in a “Secret Speech” by Khruschev. This developer of Five-Year Plans and “socialism in one country” drove out Leon Trotsky. For 10 points, name this Soviet leader who instigated the Great Purge and fought Hitler in World War II after succeeding Lenin.`,
    answer: "Stalin",
    fullAnswer: "Joseph Stalin",
    url: "https://www.norcalquizbowl.org/?page_id=25",
    category: HISTORY,
  },
  {
    question: `One of the leagues in this sport faced a 2017 boycott led by Nicky Spiva and Hannah Leathers over unequal gender representation. Henry Callahan, who was killed in 1982, is the namesake of both an award given to college players in this sport and a move in which a defender scores a point. The two main positions in this sport are handler and cutter; handlers make the important throws. Types of throws in this sport are called the “scoober” and the “high release flick”. Like football, the goal of this sport is to advance over the goal line into the end zone. Name this sport overseen by the World Flying Disc Federation that is played with a frisbee.`,
    answer: "ultimate",
    fullAnswer: "Ultimate Frisbee",
    url: "https://files.quizbowlpackets.com/2324/01.pdf",
    category: POP_CULTURE,
  },
  {
    question: `This painting was once vandalized with the words “Kill all lies.” This painting was made for the 1937 World’s Fair in Paris and was based on an article by George Steer. Nazi Germany referred to this painting as “a hodgepodge of body parts that any four-year-old could have painted”. When asked to describe this painting’s symbolism, the artist stated “This bull is a bull and this horse is a horse.” The horse in this painting is screaming above a person on the ground holding a broken sword. Name this painting based on a Spanish Civil War bombing, made by Pablo Picasso.`,
    answer: "Guernica",
    url: "https://files.quizbowlpackets.com/2324/01.pdf",
    category: ART_AND_LITERATURE,
  },
];

export default questions;
