const SCIENCE = "SCI";
const HISTORY = "HIS";
const ART_AND_LITERATURE = "ART/LIT";
const MATH = "MATH";
const RELIGION = "RELIG";
const GEOGRAPHY = "GEOG";
const POP_CULTURE = "POP";

export interface Question {
  question: string;
  answer: string;
  fullAnswer?: string;
  url: string;
  category: string;
}

const questions: Question[] = [
  {
    question:
      "Although this man received 73 electoral votes, he would not become president; a situation which most directly led to the introduction of the 12th amendment. As vice president, he presided over the impeachment trail of Samuel P. Chase. Later in his political career, he was accused of treason for supposedly wanting to set up a monarchy in western North America. This man may be better known, though, for an incident that occured when he was running for governor of New York in 1804, where a federalist political opponent sullied his name with many slanders and eventually made him lose the election. This is what man who challenged Alexander Hamilton to a duel and killed him?",
    answer: "Burr",
    fullAnswer: "Aaron Burr",
    url: "https://quizbowlpackets.com/1460/2009%20Yale%20Bulldog%20(High%20School).pdf",
    category: HISTORY,
  },
  {
    question:
      "Author Nathanael West died in a car accident the day after this author died, possibly due to his grief at his friend‘s passing. That death left his final novel based on the life of Irving Thalberg unfinished, though it was printed posthumously under the title The Last Tycoon. The relationship between psychologist Dick Diver and his patient and wife Nicole in one novel is based on this author‘s actual problems with his mentally unstable wife, Zelda. In another novel, the title character becomes a millionaire by bootlegging in order to win the love of a girl he met during World War I, Daisy Buchanan. Who is this author of Tender is the Night and The Great Gatsby?",
    answer: "Fitzgerald",
    fullAnswer: "F. Scott Fitzgerald",
    url: "https://quizbowlpackets.com/1460/2009%20Yale%20Bulldog%20(High%20School).pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question:
      "After serving in the Social war under his father Strabo he was sent to clear Sicily and Africa of opposition in the ensuing Civil War. He then subdued more enemies of Sulla when he was sent to Spain, after which he returned to Rome and took much credit for putting down Spartacus' rebellion. After he was made consul, he was given the extraordinary command of clearing the Mediteranean of pirates, which he did sucessfully. He success would soon come to an end, however, at the hands of one of his fellow triumvirs. Losing the battle of Pharsalus, this is what member of the first triumvirate who fought against Caesar for control of the Roman Empire?",
    answer: "Pompey",
    url: "https://quizbowlpackets.com/1460/2009%20Yale%20Bulldog%20(High%20School).pdf",
    category: HISTORY,
  },
  {
    question:
      "After Trotsky announced his response to this, the Germans began advancing toward Petrograd once again, and Lenin threatened to resign over this measure. Largely because of this measure, Russia was excluded from the peace negotiations at Versailles. Ultimately, Russia had to give up one third of its railway network, 73% of its iron ore production, and 780,000 square kilometers of territory. Resulting in the cession of territory already occupied by the German army, including Poland, Lithuania, and Latvia, this was what treaty signed by the Bolshevik revolutionaries with Germany that took Russia out of World War I?",
    answer: "BrestLitovsk",
    fullAnswer: "Treaty of Brest-Litovsk",
    url: "https://quizbowlpackets.com/1460/2009%20Yale%20Bulldog%20(High%20School).pdf",
    category: HISTORY,
  },
  {
    question:
      "The most successful animal species, by this measure, is probably the Antarctic Krill, which accounts for 0.7% of the Earth's total for this measure. That estimate places them at five times the total for human beings, but only about a quarter that of crops. In aquatic systems, primary consumers often have more of this quantity than primary producers, because of the rapid turnover of phytoplankton. However, on land, the slower life cycles of plants mean that pyramids organized around this quantity are always widest at the base. Name this measure from ecology, whose units are typically given in mass per unit area.",
    answer: "biomass",
    url: "https://quizbowlpackets.com/1460/2009%20Yale%20Bulldog%20(High%20School).pdf",
    category: SCIENCE,
  },
  {
    question:
      'As a theorist, his concept of the "objective correlative" influenced New Criticism; as a playwright, his works include The Burial of the Dead and Murder in the Cathedral; but he is best known as a poet. An early precocious work includes references to Donne and Hamlet, as well as an epigraph from Dante, while later poems like "Journey of the Magi" and "Ash Wednesday" reflect a turn towards religion. His most famous reference however, was to The Canterbury Tales, in the famous opening line "April is the cruelest month". Name this Nobel Prize-winning poet of "The Love Song of J. Alfred Prufrock" and "The Waste-Land".',
    answer: "Eliot",
    fullAnswer: "T. S. Eliot",
    url: "https://quizbowlpackets.com/1460/2009%20Yale%20Bulldog%20(High%20School).pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question:
      'It was first proposed in an 1824 work titled "Reflections on the Motive Power of Fire", and operates on a thermodynamically reversible cycle consisting of 4 steps: isothermal expansion, isentropic expansion, isothermal compression, and isentropic compression. This hypothetical device ideally transfers energy from a hot resevoir to a cold resevoir, producing mechanical work. Name this namesake engine proposed by a French physicist, whose efficiency is always greater than that of any real heat engine.',
    answer: "Carnot",
    fullAnswer: "Carnot Engine",
    url: "https://quizbowlpackets.com/1460/2009%20Yale%20Bulldog%20(High%20School).pdf",
    category: SCIENCE,
  },
  {
    question:
      'Authentic translations of this poem were attempted by A.J. Arberry, and Robert Graves, working with Omar Ali-Shah, but the manuscripts they worked from turned out to be forgeries. Its popularity in English-speaking countries is largely due to the translation by Edward Fitzgerald, and the rhyme scheme of AABA he employed for its quatrains is now named after the poem. His translation contains the lines "The Moving Finger writes: and, having writ, / Moves on", and its twelfth quatrain reads: "A Book of Verses underneath the Bough, / A Jug of Wine, a Loaf of Bread—and thou". This is what 12th century Persian poem by Omar Khayyam?',
    answer: "Rubaiyat",
    fullAnswer: "The Rubaiyat of Omar Khayyam",
    url: "https://quizbowlpackets.com/1460/2009%20Yale%20Bulldog%20(High%20School).pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question:
      "The present international airport of this city is located at Chep Lak Kok on Lantau Island, but previously airlines had to make a harrowing descent through skyscrapers to reach Kai Tak Airport. The total population is estimated at over 7 million, but vast parts of the New Territories in the North are uninhabited. Walt Disney opened an edition of Disneyland here in 2005 and the equestrian events at the 2008 Olympics were staged here. Name this Chinese Special Administrative Region, located east of Macau, which was handed back to China by the British in 1997",
    answer: "Hongkong",
    fullAnswer: "Hong Kong, China",
    url: "https://quizbowlpackets.com/1460/2009%20Yale%20Bulldog%20(High%20School).pdf",
    category: HISTORY,
  },
  {
    question:
      "This artist captured the attention of Georges Braque with a painting of five angular figures inspired by women in a brothel and by African masks, Les Demoiselles d'Avignon.  This artist created a black-and-white painting of the bombing of a Basque city during the Spanish Civil War, and during his Blue Period, he painted The Old Guitarist. Name this Spanish painter who painted Guernica and co-founded Cubism.",
    answer: "Picasso",
    fullAnswer: "Pablo Picasso",
    url: "https://files.quizbowlpackets.com/2852/Round2.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question:
      "Palisade cells are located on these structures, which in arid climates are often covered by wax to preserve water loss through transpiration. The stomata on these structures exchange oxygen for carbon dioxide.  These structures are called fronds on ferns, and they are needly for conifer plants. Name these structures that are rich in chlorophyll, bud off from stems, and are the site of photosynthesis in plants.",
    answer: "leaves",
    fullAnswer: "Leaves on trees",
    url: "https://files.quizbowlpackets.com/2852/Round2.pdf",
    category: SCIENCE,
  },
  {
    question: `The Intermediate Value Theorem requires one of these objects to be continuous on a closed interval, or else the result isn't guaranteed. The term "codomain" is often used interchangeably with "range" to describe the set of output values of these objects. "G of x" or "F of x" are often used to indicate what mathematical objects that can be thought of as machines that, for an input value, return exactly one result?`,
    answer: "function",
    url: "https://files.quizbowlpackets.com/2852/Round2.pdf",
    category: MATH,
  },
  {
    question: `The hierarchy problem asks why this force is so much weaker than the weak force. General relativity explains this force through the curvature of spacetime. On Earth's surface, the acceleration due to this force is about 9.8 meters per second squared. Tides are caused by this force, which acts between any two objects with mass. "Big G" is a constant named for what force that attracts objects on Earth toward the ground?`,
    answer: "gravity",
    fullAnswer: "Gravitational Force",
    url: "https://files.quizbowlpackets.com/2852/Round2.pdf",
    category: SCIENCE,
  },
  {
    question: `This country is the home of Michael Ondaatje, the author of The English Patient, which won the Man Booker Prize. A short story writer from this country won the 2013 Nobel in Literature for works like Lives of Girls and Women. Alice Munro is from this country, where L.M.  Montgomery wrote a novel about a red-headed orphan who lives on Prince Edward Island. Name this home country of Anne of Green Gables, which is north of the United States.`,
    answer: "Canada",
    url: "https://files.quizbowlpackets.com/2852/Round2.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `The release of energy in these events is described by elastic-rebound theory. These events are detected by triangulation of P and S waves. The modified Mercalli scale measures the intensity of these events, unlike a logarithmic scale for their magnitude, which is named for Charles Richter. These events begin at an epicenter and can cause tsunamis. Name these natural disasters that are caused by rupturing faults in the crust.`,
    answer: "earthquakes",
    url: "https://files.quizbowlpackets.com/2852/Round2.pdf",
    category: SCIENCE,
  },
  {
    question: `Chaplain and photographer Francis Browne documented this ship's stops at Cherbourg and Queenstown after it initially departed from Southampton. Architect Thomas Andrews diagnosed the "mathematical certainty" that awaited this ship on the morning of April 15th once six of its compartments had flooded. Edward Smith died while captaining what "unsinkable" ocean liner that, in 1912, sank after striking an iceberg?`,
    answer: "Titanic",
    fullAnswer: "RMS Titanic",
    url: "https://files.quizbowlpackets.com/2852/Round7.pdf",
    category: HISTORY,
  },
  {
    question: `A character in this novel has her glove stolen by John Brooke, who later becomes her husband. Another character visits the Hummels, and contracts scarlet fever from them after three of their children die. At the end of this novel, Professor Bhaer and his wife turn Plumfield into a school for boys. Amy accompanies Aunt Carrol to Europe during this novel. Name this Louisa May Alcott novel about the March family.`,
    answer: "LittleWomen",
    fullAnswer: "Little Women",
    url: "https://files.quizbowlpackets.com/2852/Round6.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `A 2021 Maisie Peters song with this title says it's "crazy to think that you still call me" this word, and insists that the singer is "playing a perfect Patrick Bateman." A Talking Heads song asks "qu'est-ce que c'est" [kess-kah-say] about a "Killer" of this type. A Post Malone song describes his "A.P." with this word, which partially titles an Ava Max song about a girl who is "Sweet but" this adjective. Give this word that describes the madness of a knife murderer in an Alfred Hitchcock film.`,
    answer: "Psycho",
    fullAnswer: "Psycho Killer or Sweet but Psycho",
    url: "https://files.quizbowlpackets.com/2852/Round6.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `The A and B coefficients of stimulated emission are named for this scientist, who first figured out the operating principle of a laser. This scientist's objection to quantum mechanics is often misinterpreted by the quote, "God does not play dice." In 1905, a year called this man's Annus mirabilis, this scientist published papers on the photoelectric effect and special relativity. Name this German physicist who derived the formula "E equals M C squared."`,
    answer: "Einstein",
    fullAnswer: "Albert Einstein",
    url: "https://files.quizbowlpackets.com/2852/Round6.pdf",
    category: SCIENCE,
  },
  {
    question: `This religious movement's Doctrine and Covenants was controversially edited in 1876. A set of six lessons called "Missionary Discussions" are used by some of this church's missionaries. In 1978, this church ended its ban on having Black priests, and in the nineteenth century, this church was criticized both for its support of slavery as for its support of polygamy. Joseph Smith and Brigham Young were early leaders of what Christian church based in Utah?`,
    answer: "Mormon",
    fullAnswer: "Church of Jesus Christ of Latter-day Saints",
    url: "https://files.quizbowlpackets.com/2852/Round6.pdf",
    category: RELIGION,
  },
  {
    question: `An island in this body of water is home to the Troodos mountain range, and is named for its extensive copper resources. The Strait of Bonifacio separates two other islands in this body of water, one of which was the birthplace of Napoleon. This sea's largest island contains the cities of Palermo and Syracuse. The arms of this sea include the Tyrrhenian, Ionian, and Aegean Seas. Cyprus, Corsica, Sardinia, and Sicily are the largest islands in what sea that separates Africa and Europe?`,
    answer: "Mediterranean",
    fullAnswer: "Mediterranean Sea",
    url: "https://files.quizbowlpackets.com/2852/Round6.pdf",
    category: GEOGRAPHY,
  },
  {
    question: `A deity with the head of this creature was called Ailuros in Greece, and was worshipped at Bubastis. One of these creatures, named Ta-Miu, was entombed with Prince Thutmose. A fierce counterpart for a goddess with the head of this creature was Sekhmet, who had the head of a lion. Bastet had the head of what felines that were domesticated to control populations of mice in grain stores?`,
    answer: "kitty",
    fullAnswer: "Kitty Cat",
    url: "https://files.quizbowlpackets.com/2852/Round6.pdf",
    category: RELIGION,
  },
  {
    question: `Ted Sorensen's work for this man included writing a speech that asks why Rice University plays against Texas. Sorensen also probably ghostwrote a book that won this man the Pulitzer Prize while he served as a Senator from Massachusetts, Profiles in Courage. Sorensen helped with this President's inaugural address, which includes the command "Ask not what your country can do for you." Name this US President who was inaugurated in 1961 and assassinated in 1963 by Lee Harvey Oswald.`,
    answer: "JFKennedy",
    fullAnswer: "John Fitzgerald Kennedy",
    url: "https://files.quizbowlpackets.com/2852/Round6.pdf",
    category: HISTORY,
  },
  {
    question: `The idea that these people should study calligraphy or other artforms is promoted by The Book of Five Rings, which also advocates for training with two longswords. During the Sengoku period, people in this profession followed the bushido moral code, which is often compared to a knight's sense of chivalry. Name this warrior class that served the daimyo from the medieval era until the nineteenth century in Japan`,
    answer: "Samurai",
    url: "https://files.quizbowlpackets.com/2852/Round6.pdf",
    category: HISTORY,
  },
  {
    question: `Only this figure's head and neck appear in the Athenaeum Portrait, the best known work of Gilbert Stuart.  Grant Wood painted this figure holding an ax in Parson Weems' Fable, which depicts a myth in which he cuts a cherry tree. This man titles Emmanuel Leutze's most famous painting, in which James Monroe holds an American flag in a boat floating on an icy river. Name this man depicted "crossing the Delaware" in one painting, the first U. S. President`,
    answer: "Washington",
    fullAnswer: "George Washington",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2002N.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `Followers of this religion in the Banu Qurayza tribe were defeated at the Battle of the Trench. The "Beta" community of this religious group in Ethiopia were airlifted to an Asian country in Operation Solomon.  Members of this religion descended from Middle Eastern groups are known as Mizrahi. Aliyah is the primary tenet of a movement involving this religious group, Zionism. Name this target of antiSemitism that populates much of Israel.`,
    answer: "Judaism",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2002N.pdf",
    category: RELIGION,
  },
  {
    question: `In one film, one of these characters is given the stolen Zodiac Stone for safekeeping. The PX-21 mutagen makes these characters turn into their purple "evil" form. The refrain "I got money" features in a song by Yeat titled "Rich [one of these characters]." Many movie theaters kicked out people who wore suits as part of a trend called "gentle [these characters]." Name these yellow creatures, who title a movie subtitled "The Rise of Gru."`,
    answer: "minions",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2002N.pdf",
    category: POP_CULTURE,
  },
  {
    question: `Timberline Lodge, located on this state's highest point, was the filming site for much of The Shining. Nike is headquartered in Beaverton, a southern suburb of this state's largest city. It's not Maine, but this state's Mount Hood overlooks its largest city, Portland. Name this Pacific Northwest state that lies south of Washington and north of California.`,
    answer: "Oregon",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2002N.pdf",
    category: GEOGRAPHY,
  },
  {
    question: `This quantity equals the square root of the product two, times mass, times kinetic energy. It's not force, but according to Newton's Second Law, the rate of change of this quantity equals mass times acceleration.  Rockets generate thrust after ejecting mass, since this quantity is conserved. Impulse equals the change in this quantity. Name this quantity equal to mass times velocity`,
    answer: "momentum",
    fullAnswer: "Linear Momentum",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2002N.pdf",
    category: SCIENCE,
  },
  {
    question: `A scientist from this country was the first to estimate the extent an increase in atmospheric carbon dioxide would increase Earth's temperature. That scientist from this country names an equation that has a preexponential factor and is useful for calculating activation energies. Another scientist from this country used nitroglycerin to invent an explosive. This country contains the city of Ytterby. Name this home country of Svante Arrhenius and Alfred Nobel, who was born in Stockholm.`,
    answer: "Sweden",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2002N.pdf",
    category: SCIENCE,
  },
  {
    question: `A depiction of this figure's head in Ayutthaya is almost completely surrounded by the roots of a banyan tree. The misleadingly named "Emerald" statue of this figure is currently located in Bangkok. Some statues of this figure carved out of cliffs can be found at Leshan and another site destroyed by the Taliban in 2001, Bamiyan. Name this religious figure, sometimes called Siddhartha Gautama.`,
    answer: "Buddha",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2002N.pdf",
    category: RELIGION,
  },
  {
    question: `Samuel Wragg exchanged medical supplies for prisoners with this man after he set up a blockade around Charles Town in South Carolina. Despite parting ways with Stede Bonnet, this man returned to his old life with the Adventure, the successor to the Queen Anne's Revenge. Though his actual name is unknown, this man's name was often given as Edward Teach. Name this pirate, who was nicknamed for his dark facial hair.`,
    answer: "Blackbeard",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2002N.pdf",
    category: HISTORY,
  },
];

export default questions;
