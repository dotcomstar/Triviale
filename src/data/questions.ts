const SCIENCE = "SCI";
const HISTORY = "HIS";
const ART_AND_LITERATURE = "ART/LIT";
// const MATH = "MATH";
const RELIGION = "RELIG";
const GEOGRAPHY = "GEOG";
const POP_CULTURE = "POP";
const COMPUTER_SCIENCE = "CS";

export interface Question {
  question: string;
  answer: string;
  fullAnswer?: string;
  url: string;
  category: string;
}

const questions: Question[] = [
  // {
  //   question:
  //     "Although this man received 73 electoral votes, he would not become president; a situation which most directly led to the introduction of the 12th amendment. As vice president, he presided over the impeachment trail of Samuel P. Chase. Later in his political career, he was accused of treason for supposedly wanting to set up a monarchy in western North America. This man may be better known, though, for an incident that occured when he was running for governor of New York in 1804, where a federalist political opponent sullied his name with many slanders and eventually made him lose the election. This is what man who challenged Alexander Hamilton to a duel and killed him?",
  //   answer: "Burr",
  //   fullAnswer: "Aaron Burr",
  //   url: "https://quizbowlpackets.com/1460/2009%20Yale%20Bulldog%20(High%20School).pdf",
  //   category: HISTORY,
  // },
  // {
  //   question:
  //     "Author Nathanael West died in a car accident the day after this author died, possibly due to his grief at his friend‘s passing. That death left his final novel based on the life of Irving Thalberg unfinished, though it was printed posthumously under the title The Last Tycoon. The relationship between psychologist Dick Diver and his patient and wife Nicole in one novel is based on this author‘s actual problems with his mentally unstable wife, Zelda. In another novel, the title character becomes a millionaire by bootlegging in order to win the love of a girl he met during World War I, Daisy Buchanan. Who is this author of Tender is the Night and The Great Gatsby?",
  //   answer: "Fitzgerald",
  //   fullAnswer: "F. Scott Fitzgerald",
  //   url: "https://quizbowlpackets.com/1460/2009%20Yale%20Bulldog%20(High%20School).pdf",
  //   category: ART_AND_LITERATURE,
  // },
  // {
  //   question:
  //     "After serving in the Social war under his father Strabo he was sent to clear Sicily and Africa of opposition in the ensuing Civil War. He then subdued more enemies of Sulla when he was sent to Spain, after which he returned to Rome and took much credit for putting down Spartacus' rebellion. After he was made consul, he was given the extraordinary command of clearing the Mediteranean of pirates, which he did sucessfully. He success would soon come to an end, however, at the hands of one of his fellow triumvirs. Losing the battle of Pharsalus, this is what member of the first triumvirate who fought against Caesar for control of the Roman Empire?",
  //   answer: "Pompey",
  //   url: "https://quizbowlpackets.com/1460/2009%20Yale%20Bulldog%20(High%20School).pdf",
  //   category: HISTORY,
  // },
  // {
  //   question:
  //     "After Trotsky announced his response to this, the Germans began advancing toward Petrograd once again, and Lenin threatened to resign over this measure. Largely because of this measure, Russia was excluded from the peace negotiations at Versailles. Ultimately, Russia had to give up one third of its railway network, 73% of its iron ore production, and 780,000 square kilometers of territory. Resulting in the cession of territory already occupied by the German army, including Poland, Lithuania, and Latvia, this was what treaty signed by the Bolshevik revolutionaries with Germany that took Russia out of World War I?",
  //   answer: "BrestLitovsk",
  //   fullAnswer: "Treaty of Brest-Litovsk",
  //   url: "https://quizbowlpackets.com/1460/2009%20Yale%20Bulldog%20(High%20School).pdf",
  //   category: HISTORY,
  // },
  // {
  //   question:
  //     "The most successful animal species, by this measure, is probably the Antarctic Krill, which accounts for 0.7% of the Earth's total for this measure. That estimate places them at five times the total for human beings, but only about a quarter that of crops. In aquatic systems, primary consumers often have more of this quantity than primary producers, because of the rapid turnover of phytoplankton. However, on land, the slower life cycles of plants mean that pyramids organized around this quantity are always widest at the base. Name this measure from ecology, whose units are typically given in mass per unit area.",
  //   answer: "biomass",
  //   url: "https://quizbowlpackets.com/1460/2009%20Yale%20Bulldog%20(High%20School).pdf",
  //   category: SCIENCE,
  // },
  // {
  //   question:
  //     'As a theorist, his concept of the "objective correlative" influenced New Criticism; as a playwright, his works include The Burial of the Dead and Murder in the Cathedral; but he is best known as a poet. An early precocious work includes references to Donne and Hamlet, as well as an epigraph from Dante, while later poems like "Journey of the Magi" and "Ash Wednesday" reflect a turn towards religion. His most famous reference however, was to The Canterbury Tales, in the famous opening line "April is the cruelest month". Name this Nobel Prize-winning poet of "The Love Song of J. Alfred Prufrock" and "The Waste-Land".',
  //   answer: "Eliot",
  //   fullAnswer: "T. S. Eliot",
  //   url: "https://quizbowlpackets.com/1460/2009%20Yale%20Bulldog%20(High%20School).pdf",
  //   category: ART_AND_LITERATURE,
  // },
  // {
  //   question:
  //     'It was first proposed in an 1824 work titled "Reflections on the Motive Power of Fire", and operates on a thermodynamically reversible cycle consisting of 4 steps: isothermal expansion, isentropic expansion, isothermal compression, and isentropic compression. This hypothetical device ideally transfers energy from a hot resevoir to a cold resevoir, producing mechanical work. Name this namesake engine proposed by a French physicist, whose efficiency is always greater than that of any real heat engine.',
  //   answer: "Carnot",
  //   fullAnswer: "Carnot Engine",
  //   url: "https://quizbowlpackets.com/1460/2009%20Yale%20Bulldog%20(High%20School).pdf",
  //   category: SCIENCE,
  // },
  // {
  //   question:
  //     'Authentic translations of this poem were attempted by A.J. Arberry, and Robert Graves, working with Omar Ali-Shah, but the manuscripts they worked from turned out to be forgeries. Its popularity in English-speaking countries is largely due to the translation by Edward Fitzgerald, and the rhyme scheme of AABA he employed for its quatrains is now named after the poem. His translation contains the lines "The Moving Finger writes: and, having writ, / Moves on", and its twelfth quatrain reads: "A Book of Verses underneath the Bough, / A Jug of Wine, a Loaf of Bread—and thou". This is what 12th century Persian poem by Omar Khayyam?',
  //   answer: "Rubaiyat",
  //   fullAnswer: "The Rubaiyat of Omar Khayyam",
  //   url: "https://quizbowlpackets.com/1460/2009%20Yale%20Bulldog%20(High%20School).pdf",
  //   category: ART_AND_LITERATURE,
  // },
  // {
  //   question:
  //     "The present international airport of this city is located at Chep Lak Kok on Lantau Island, but previously airlines had to make a harrowing descent through skyscrapers to reach Kai Tak Airport. The total population is estimated at over 7 million, but vast parts of the New Territories in the North are uninhabited. Walt Disney opened an edition of Disneyland here in 2005 and the equestrian events at the 2008 Olympics were staged here. Name this Chinese Special Administrative Region, located east of Macau, which was handed back to China by the British in 1997",
  //   answer: "Hongkong",
  //   fullAnswer: "Hong Kong, China",
  //   url: "https://quizbowlpackets.com/1460/2009%20Yale%20Bulldog%20(High%20School).pdf",
  //   category: HISTORY,
  // },
  // {
  //   question:
  //     "This artist captured the attention of Georges Braque with a painting of five angular figures inspired by women in a brothel and by African masks, Les Demoiselles d'Avignon.  This artist created a black-and-white painting of the bombing of a Basque city during the Spanish Civil War, and during his Blue Period, he painted The Old Guitarist. Name this Spanish painter who painted Guernica and co-founded Cubism.",
  //   answer: "Picasso",
  //   fullAnswer: "Pablo Picasso",
  //   url: "https://files.quizbowlpackets.com/2852/Round2.pdf",
  //   category: ART_AND_LITERATURE,
  // },
  // {
  //   question:
  //     "Palisade cells are located on these structures, which in arid climates are often covered by wax to preserve water loss through transpiration. The stomata on these structures exchange oxygen for carbon dioxide.  These structures are called fronds on ferns, and they are needly for conifer plants. Name these structures that are rich in chlorophyll, bud off from stems, and are the site of photosynthesis in plants.",
  //   answer: "leaves",
  //   fullAnswer: "Leaves on trees",
  //   url: "https://files.quizbowlpackets.com/2852/Round2.pdf",
  //   category: SCIENCE,
  // },
  // {
  //   question: `The Intermediate Value Theorem requires one of these objects to be continuous on a closed interval, or else the result isn't guaranteed. The term "codomain" is often used interchangeably with "range" to describe the set of output values of these objects. "G of x" or "F of x" are often used to indicate what mathematical objects that can be thought of as machines that, for an input value, return exactly one result?`,
  //   answer: "function",
  //   url: "https://files.quizbowlpackets.com/2852/Round2.pdf",
  //   category: MATH,
  // },
  // {
  //   question: `The hierarchy problem asks why this force is so much weaker than the weak force. General relativity explains this force through the curvature of spacetime. On Earth's surface, the acceleration due to this force is about 9.8 meters per second squared. Tides are caused by this force, which acts between any two objects with mass. "Big G" is a constant named for what force that attracts objects on Earth toward the ground?`,
  //   answer: "gravity",
  //   fullAnswer: "Gravitational Force",
  //   url: "https://files.quizbowlpackets.com/2852/Round2.pdf",
  //   category: SCIENCE,
  // },
  // {
  //   question: `This country is the home of Michael Ondaatje, the author of The English Patient, which won the Man Booker Prize. A short story writer from this country won the 2013 Nobel in Literature for works like Lives of Girls and Women. Alice Munro is from this country, where L.M.  Montgomery wrote a novel about a red-headed orphan who lives on Prince Edward Island. Name this home country of Anne of Green Gables, which is north of the United States.`,
  //   answer: "Canada",
  //   url: "https://files.quizbowlpackets.com/2852/Round2.pdf",
  //   category: ART_AND_LITERATURE,
  // },
  // {
  //   question: `The release of energy in these events is described by elastic-rebound theory. These events are detected by triangulation of P and S waves. The modified Mercalli scale measures the intensity of these events, unlike a logarithmic scale for their magnitude, which is named for Charles Richter. These events begin at an epicenter and can cause tsunamis. Name these natural disasters that are caused by rupturing faults in the crust.`,
  //   answer: "earthquakes",
  //   url: "https://files.quizbowlpackets.com/2852/Round2.pdf",
  //   category: SCIENCE,
  // },
  // {
  //   question: `Chaplain and photographer Francis Browne documented this ship's stops at Cherbourg and Queenstown after it initially departed from Southampton. Architect Thomas Andrews diagnosed the "mathematical certainty" that awaited this ship on the morning of April 15th once six of its compartments had flooded. Edward Smith died while captaining what "unsinkable" ocean liner that, in 1912, sank after striking an iceberg?`,
  //   answer: "Titanic",
  //   fullAnswer: "RMS Titanic",
  //   url: "https://files.quizbowlpackets.com/2852/Round7.pdf",
  //   category: HISTORY,
  // },
  // {
  //   question: `A character in this novel has her glove stolen by John Brooke, who later becomes her husband. Another character visits the Hummels, and contracts scarlet fever from them after three of their children die. At the end of this novel, Professor Bhaer and his wife turn Plumfield into a school for boys. Amy accompanies Aunt Carrol to Europe during this novel. Name this Louisa May Alcott novel about the March family.`,
  //   answer: "LittleWomen",
  //   fullAnswer: "Little Women",
  //   url: "https://files.quizbowlpackets.com/2852/Round6.pdf",
  //   category: ART_AND_LITERATURE,
  // },
  // {
  //   question: `A 2021 Maisie Peters song with this title says it's "crazy to think that you still call me" this word, and insists that the singer is "playing a perfect Patrick Bateman." A Talking Heads song asks "qu'est-ce que c'est" [kess-kah-say] about a "Killer" of this type. A Post Malone song describes his "A.P." with this word, which partially titles an Ava Max song about a girl who is "Sweet but" this adjective. Give this word that describes the madness of a knife murderer in an Alfred Hitchcock film.`,
  //   answer: "Psycho",
  //   fullAnswer: "Psycho Killer or Sweet but Psycho",
  //   url: "https://files.quizbowlpackets.com/2852/Round6.pdf",
  //   category: ART_AND_LITERATURE,
  // },
  // {
  //   question: `The A and B coefficients of stimulated emission are named for this scientist, who first figured out the operating principle of a laser. This scientist's objection to quantum mechanics is often misinterpreted by the quote, "God does not play dice." In 1905, a year called this man's Annus mirabilis, this scientist published papers on the photoelectric effect and special relativity. Name this German physicist who derived the formula "E equals M C squared."`,
  //   answer: "Einstein",
  //   fullAnswer: "Albert Einstein",
  //   url: "https://files.quizbowlpackets.com/2852/Round6.pdf",
  //   category: SCIENCE,
  // },
  // {
  //   question: `This religious movement's Doctrine and Covenants was controversially edited in 1876. A set of six lessons called "Missionary Discussions" are used by some of this church's missionaries. In 1978, this church ended its ban on having Black priests, and in the nineteenth century, this church was criticized both for its support of slavery as for its support of polygamy. Joseph Smith and Brigham Young were early leaders of what Christian church based in Utah?`,
  //   answer: "Mormon",
  //   fullAnswer: "Church of Jesus Christ of Latter-day Saints",
  //   url: "https://files.quizbowlpackets.com/2852/Round6.pdf",
  //   category: RELIGION,
  // },
  // {
  //   question: `An island in this body of water is home to the Troodos mountain range, and is named for its extensive copper resources. The Strait of Bonifacio separates two other islands in this body of water, one of which was the birthplace of Napoleon. This sea's largest island contains the cities of Palermo and Syracuse. The arms of this sea include the Tyrrhenian, Ionian, and Aegean Seas. Cyprus, Corsica, Sardinia, and Sicily are the largest islands in what sea that separates Africa and Europe?`,
  //   answer: "Mediterranean",
  //   fullAnswer: "Mediterranean Sea",
  //   url: "https://files.quizbowlpackets.com/2852/Round6.pdf",
  //   category: GEOGRAPHY,
  // },
  // {
  //   question: `A deity with the head of this creature was called Ailuros in Greece, and was worshipped at Bubastis. One of these creatures, named Ta-Miu, was entombed with Prince Thutmose. A fierce counterpart for a goddess with the head of this creature was Sekhmet, who had the head of a lion. Bastet had the head of what felines that were domesticated to control populations of mice in grain stores?`,
  //   answer: "kitty",
  //   fullAnswer: "Kitty Cat",
  //   url: "https://files.quizbowlpackets.com/2852/Round6.pdf",
  //   category: RELIGION,
  // },
  // {
  //   question: `Ted Sorensen's work for this man included writing a speech that asks why Rice University plays against Texas. Sorensen also probably ghostwrote a book that won this man the Pulitzer Prize while he served as a Senator from Massachusetts, Profiles in Courage. Sorensen helped with this President's inaugural address, which includes the command "Ask not what your country can do for you." Name this US President who was inaugurated in 1961 and assassinated in 1963 by Lee Harvey Oswald.`,
  //   answer: "JFKennedy",
  //   fullAnswer: "John Fitzgerald Kennedy",
  //   url: "https://files.quizbowlpackets.com/2852/Round6.pdf",
  //   category: HISTORY,
  // },
  // {
  //   question: `The idea that these people should study calligraphy or other artforms is promoted by The Book of Five Rings, which also advocates for training with two longswords. During the Sengoku period, people in this profession followed the bushido moral code, which is often compared to a knight's sense of chivalry. Name this warrior class that served the daimyo from the medieval era until the nineteenth century in Japan`,
  //   answer: "Samurai",
  //   url: "https://files.quizbowlpackets.com/2852/Round6.pdf",
  //   category: HISTORY,
  // },
  {
    question: `Only this figure's head and neck appear in the Athenaeum Portrait, the best known work of Gilbert Stuart.  Grant Wood painted this figure holding an ax in Parson Weems' Fable, which depicts a myth in which he cuts a cherry tree. This man titles Emmanuel Leutze's most famous painting, in which James Monroe holds an American flag in a boat floating on an icy river. Name this man depicted "crossing the Delaware" in one painting, the first U. S. President`,
    answer: "Washington",
    fullAnswer: "George Washington",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2002N.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `In one film, one of these characters is given the stolen Zodiac Stone for safekeeping. The PX-21 mutagen makes these characters turn into their purple "evil" form. The refrain "I got money" features in a song by Yeat titled "Rich [one of these characters]." Many movie theaters kicked out people who wore suits as part of a trend called "gentle [these characters]." Name these yellow creatures, who title a movie subtitled "The Rise of Gru."`,
    answer: "minions",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2002N.pdf",
    category: POP_CULTURE,
  },
  {
    question: `This location lies south of the Kaibab Plateau, and is home to a group of basement rocks named for Vishnu. This landmark is home to a "house" named for the Hopi people, whose myths described its creation.  The Hualapai tribe operates a glass "skywalk" above this location, which formed due to erosion from the Colorado River. Many tourists drive to this location from cities like Flagstaff and Phoenix. For 10 points, name this large gorge in Arizona.`,
    answer: "GrandCanyon",
    fullAnswer: "The Grand Canyon",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2004N.pdf",
    category: GEOGRAPHY,
  },
  {
    question: `Followers of this religion in the Banu Qurayza tribe were defeated at the Battle of the Trench. The "Beta" community of this religious group in Ethiopia were airlifted to an Asian country in Operation Solomon.  Members of this religion descended from Middle Eastern groups are known as Mizrahi. Aliyah is the primary tenet of a movement involving this religious group, Zionism. Name this target of antiSemitism that populates much of Israel.`,
    answer: "Judaism",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2002N.pdf",
    category: RELIGION,
  },
  {
    question: `The Paschen series for hydrogen lies entirely in this part of the electromagnetic spectrum, unlike the shorterwavelength emissions in the Balmer series. One form of spectroscopy uses light in this part of the spectrum to induce bond vibrations. William Herschel discovered this part of the spectrum by putting a thermometer next to a prism.  Night vision goggles and temperature guns both operate by detecting this type of light. Name this type of light, with wavelengths just longer than visible light.`,
    answer: "infrared",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2004N.pdf",
    category: SCIENCE,
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
  {
    question: `One work by this composer features a bass echo a B-flat major melody played by the trombone in the "Tuba Mirum" section. This composer's requiem in D minor was commissioned by Count von Walsegg and completed by Franz Süssmayr after his death in 1791. The only two symphonies in a minor key by this composer are the "Little" and "Great" G minor symphonies. Name this Austrian composer of the "Jupiter" Symphony, The Magic Flute, and  Turkish March.`,
    answer: "Mozart",
    fullAnswer: "Wolfgang Amadeus Mozart",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2002N.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `In this tissue, calsequestrin binds to calcium ions in the sarcoplasmic reticulum, which, when released, binds to troponin. The functional unit of this tissue is the sarcomere. This tissue contains the proteins actin and myosin. Types of this tissue include smooth and striated. Name this tissue attached to bone that is responsible for contraction, examples of which include the bicep.`,
    answer: "muscle",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2002N.pdf",
    category: SCIENCE,
  },
  {
    question: `John Keats wrote a poem titled "On Sitting Down to Read [this play] Once Again." In this play, a character declares "as flies to wanton boys are we to the gods; they kill us for their sport." A character disguised as Tom O'Bedlam leads Gloucester off an imaginary cliff in this play. This play opens with the flattering of the title character by his daughters Regan and Goneril. Name this Shakespearean tragedy about the title monarch, who exiles his daughter Cordelia.`,
    answer: "KingLear",
    fullAnswer: "King Lear",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2002N.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `The motion of two parts of these entities can be considered separately, according to the Born-Oppenheimer approximation. Arnold Sommerfeld introduced the azimuthal quantum number and elliptical paths to a model of these entities created by Ernest Rutherford. Niels Bohr formulated the planetary model of these entities, which can undergo alpha and beta decay. Name these entities that consist of electrons that follow clearly defined circular shells, which surround a central nucleus`,
    answer: "atoms",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2003N.pdf",
    category: SCIENCE,
  },
  {
    question: `A treaty involving these animals was negotiated by Megasthenes with Seleucus I, who was paid 500 of them to go away. Pyrrhus of Epirus was the first to try invading Rome using these animals, which were present in most ancient Indian armies. Use of these animals failed at Zama when Scipio Africanus defeated the army of Carthage. Name these large animals that Hannibal brought across the Alps.`,
    answer: "elephants",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2003N.pdf",
    category: HISTORY,
  },
  {
    question: `One performer in this ballet stands en pointe while performing 32 fouettés in a pas de deux. It's not by Mozart, but this ballet's score was edited by Riccardo Drigo for its revival by Lev Ivanov and Marius Petipa.  Lead ballerinas playing the role of this ballet's heroine often wear a black dress to also perform Odile, the daughter of the evil sorcerer von Rothbart. Name this Tchaikovsky ballet, in which Odette is cursed to turn into the title bird.`,
    answer: "SwanLake",
    fullAnswer: "Swan Lake",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2003N.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `This civilization celebrated the husband of Ops in a festival which is preceded by "Io" [Yo] in a common greeting. A festival from this civilization involved the election of a mock king and the reversal of master and slave roles. That festival from this civilization celebrated a deity who carried a sickle and was frequently associated with the Greek Cronus. Name this civilization, which celebrated Saturnalia in the Forum`,
    answer: "Roman",
    fullAnswer: "Roman Civilization",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2003N.pdf",
    category: RELIGION,
  },
  {
    question: `Pink banana flesh appears under a yellow peel in this artist's design for the cover of the Velvet Underground's debut album. This artist used mesh to transfer ink onto a canvas to create portraits of an actress in his Marilyn Diptych, which was made using silk-screening. This artist, who worked at the Factory, created thirty-two paintings that only differ in the labels of varieties like "split pea" and "tomato." Name this Pop artist, who painted Campbell's soup cans.`,
    answer: "Warhol",
    fullAnswer: "Andy Warhol",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2003N.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `In this kingdom, Lorrin Thurston's Bayonet Constitution effectively repealed a law which protected travelers, the Law of the Splintered Paddle. The Newlands Resolution authorized William McKinley to send troops to annex this kingdom. Sanford Dole overthrew this kingdom's final monarch, Queen Liliuokalani. Name this kingdom once led by Kamehameha, an island chain that became the 50th state.`,
    answer: "Hawaii",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2003N.pdf",
    category: HISTORY,
  },
  {
    question: `KHP is typically used to "standardize" a solution that is to be used in this technique. Quantities in this technique are tracked on a type of graph that approximates a sigmoid curve and plots volume against pH. To begin this technique, one must add an indicator, such as phenolphthalein, which will eventually cause the analyte to change color, indicating this technique's endpoint. Name this analytical technique used to determine an analyte's concentration`,
    answer: "Titration",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2003N.pdf",
    category: SCIENCE,
  },
  {
    question: `Aristaeus's pursuit of this man's wife leads to her death from a snakebite. As an Argonaut, this man saved his crew by drowning out the Sirens' songs. After giving up the love for women for young boys, the Maenads killed this man and floated his head down a river. This son of the Muse Calliope ignores Hades' instructions and looks at his wife before leaving the underworld. Name this husband of Eurydice, a mythical lyre player.`,
    answer: "Orpheus",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2003N.pdf",
    category: RELIGION,
  },
  {
    question: `One reaction in this organelle is driven by the cyclic interconversion of Coenzyme Q10 between ubiquinol and ubiquinone. Reducing equivalents, like FADH2 and NADH, serve as the inputs in a pathway in this organelle. In this organelle, a series of protein complexes named I through IV create a chemiosmotic potential that allows ATP synthase to produce ATP. This organelle contains the Krebs cycle and electron transport chain. Name this organelle, the powerhouse of the cell.`,
    answer: "Mitochondria",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2003N.pdf",
    category: SCIENCE,
  },
  {
    question: `It's not Japan, but the term rangaku refers to technology acquired from this country through the port of Dejima. Charles Mackay described a "mania" in this country where the price of tulips spiked, then plunged.  This non-British country founded Batavia in its "East Indies," which consisted of colonies in what is now modern-day Indonesia. Name this country ruled by the House of Orange, which is the namesake of Dutch disease.`,
    answer: "Netherlands",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2003N.pdf",
    category: HISTORY,
  },
  {
    question: `A PC game in this genre was inspired by the DS game Ouendan and includes "mania" and "taiko" modes.  Players slice moving red and blue cubes in a virtual reality game in this genre, Beat Saber. In a game in this genre, players touch buttons with their feet as arrows fly upwards on a screen. Players click circles in osu!, a game in this genre that also includes Dance Dance Revolution. What games test a player's sense of music and time?`,
    answer: "rhythm",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2003N.pdf",
    category: POP_CULTURE,
  },
  {
    question: `Files for these things begin with a DOCTYPE declaration and use angle brackets to denote keywords like "head" and "body." Cascading Style Sheets are most commonly used to modify the visual elements, like color and font, of these things. The "h-ref" keyword is used to embed hyperlinks in these things, which can be accessed using URLs. Name these things that are accessed using browsers like Google Chrome.`,
    answer: "website",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2003N.pdf",
    category: COMPUTER_SCIENCE,
  },
  {
    question: `The power of this institution in one country was mitigated by Plutarco Elías Calles, leading to the Cristero War. This institution was stripped of property by the Lerdo Law, which sparked the Reform War in Mexico. Several Latin American revolutions were guided by a philosophy combining this institution's beliefs with Marxism, liberation theology. Name this religious institution that sponsored Jesuit missions in the Americas, led by the Pope from Vatican City.`,
    answer: "Catholicism",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2003N.pdf",
    category: RELIGION,
  },
  {
    question: `The trade of this commodity was opposed by King James I, who wrote a "Counterblaste" against it. Many of the hogsheads used to transport this commodity were destroyed by Cornwallis in its namesake "war" during the American Revolution. As part of the Third Supply, John Rolfe brought this crop to Jamestown.  Walter Raleigh popularized this crop in England. Name this crop, whose leaves are used in cigarettes.`,
    answer: "tobacco",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2004N.pdf",
    category: HISTORY,
  },
];

export default questions;
