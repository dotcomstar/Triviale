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
    question: `This man lamented a “total and unmitigated defeat” in the House of Commons shortly before a vote to approve the Munich Agreement. This man rued that Soviet influence extended to a line “from Stettin in the Baltic to Trieste in the Adriatic,” which he called the “iron curtain.” The “Finest Hour” and “Blood, Toil, Tears, and Sweat” speeches were also delivered by what Prime Minister of the UK during World War II?`,
    answer: "Churchill",
    fullAnswer: "Winston Churchill",
    url: "https://files.quizbowlpackets.com/2852/Round1.pdf",
    category: HISTORY,
  },
  {
    question: `A parody of this painting is titled L.H.O.O.Q., which is a pun in French, and was created by Marcel Duchamp by adding a moustache to this painting. A French nickname for this painting refers to its subject, who may be the wife of Francesco del Giocondo, and to her smile. Some analysts think this painting once had fine eyebrows, which have worn away over time. Name this painting held in the Louvre art museum, a portrait of a woman made by Leonardo Da Vinci.`,
    answer: "Mona Lisa",
    url: "https://files.quizbowlpackets.com/2852/Round1.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `These organisms are conventionally classified as being spherical, comma-shaped, rod-shaped, or spiral-shaped. These organisms are also classified by how they react with crystal violet, a dye that binds tightly to their peptidoglycan cell walls in a Gram stain. These organisms and Archaea make up the two prokaryotic domains of life. Antibiotics target what single-celled organisms, examples of which include Salmonella and E. coli?`,
    answer: "bacteria",
    url: "https://files.quizbowlpackets.com/2852/Round1.pdf",
    category: SCIENCE,
  },
  {
    question: `Owen Roberts chaired the commission that investigated this event, finding that Husband Kimmel was derelict in his duty. Because translation of the Fourteen-Part Message was slow, this event officially took place without a formal declaration of war, against the wishes of Admiral Yamamoto. The “day of infamy” speech to Congress followed what December 7th, 1941 sneak attack by Japan against a naval base in Hawaii?`,
    answer: "Pearl Harbor",
    url: "https://files.quizbowlpackets.com/2852/Round1.pdf",
    category: HISTORY,
  },
  {
    question: `Literature in this genre can be cataloged in the Perry Index and was collected by Jean de La Fontaine.  One of these works contrasts the simplicity of the country with the dangers of the city in the lives of two mice, and is often collected with two of these works commonly called “The Ant and the Grasshopper” and “The Tortoise and the Hare.” Name these short stories, many of which are credited to Aesop, that tell a simple story and try to teach a moral.`,
    answer: "fables",
    url: "https://files.quizbowlpackets.com/2852/Round1.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `To memorialize his lover Leuce, this deity either turned her into a poplar tree or created the Elysian Fields. This deity’s affair with Minthe angered his wife, who turned her into a mint plant. This god this first-born son of Cronus and Rhea, and after the Titanomachy, he divided the world with his two brothers. This god uses Cerberus to protect his realm, where he sometimes keeps his wife, Persephone. Name this Greek god of the underworld.`,
    answer: "Hades",
    url: "https://files.quizbowlpackets.com/2852/Round1.pdf",
    category: RELIGION,
  },
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
];

export default questions;
