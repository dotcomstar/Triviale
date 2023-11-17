const SCIENCE = "SCI";
const HISTORY = "HIS";
const ART_AND_LITERATURE = "ART/LIT";
// const MATH = "MATH";
const RELIGION = "REL";
const GEOGRAPHY = "GEO";
const POP_CULTURE = "POP";
const COMPUTER_SCIENCE = "CS";
const SPORTS = "SPO";

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
  // {
  //   question: `Only this figure's head and neck appear in the Athenaeum Portrait, the best known work of Gilbert Stuart.  Grant Wood painted this figure holding an ax in Parson Weems' Fable, which depicts a myth in which he cuts a cherry tree. This man titles Emmanuel Leutze's most famous painting, in which James Monroe holds an American flag in a boat floating on an icy river. Name this man depicted "crossing the Delaware" in one painting, the first U. S. President`,
  //   answer: "Washington",
  //   fullAnswer: "George Washington",
  //   url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2002N.pdf",
  //   category: ART_AND_LITERATURE,
  // },
  // {
  //   question: `In one film, one of these characters is given the stolen Zodiac Stone for safekeeping. The PX-21 mutagen makes these characters turn into their purple "evil" form. The refrain "I got money" features in a song by Yeat titled "Rich [one of these characters]." Many movie theaters kicked out people who wore suits as part of a trend called "gentle [these characters]." Name these yellow creatures, who title a movie subtitled "The Rise of Gru."`,
  //   answer: "minions",
  //   url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2002N.pdf",
  //   category: POP_CULTURE,
  // },
  // {
  //   question: `This location lies south of the Kaibab Plateau, and is home to a group of basement rocks named for Vishnu. This landmark is home to a "house" named for the Hopi people, whose myths described its creation.  The Hualapai tribe operates a glass "skywalk" above this location, which formed due to erosion from the Colorado River. Many tourists drive to this location from cities like Flagstaff and Phoenix. For 10 points, name this large gorge in Arizona.`,
  //   answer: "Grand Canyon",
  //   url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2004N.pdf",
  //   category: GEOGRAPHY,
  // },
  // {
  //   question: `Followers of this religion in the Banu Qurayza tribe were defeated at the Battle of the Trench. The "Beta" community of this religious group in Ethiopia were airlifted to an Asian country in Operation Solomon.  Members of this religion descended from Middle Eastern groups are known as Mizrahi. Aliyah is the primary tenet of a movement involving this religious group, Zionism. Name this target of antiSemitism that populates much of Israel.`,
  //   answer: "Judaism",
  //   url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2002N.pdf",
  //   category: RELIGION,
  // },
  // {
  //   question: `The Paschen series for hydrogen lies entirely in this part of the electromagnetic spectrum, unlike the shorterwavelength emissions in the Balmer series. One form of spectroscopy uses light in this part of the spectrum to induce bond vibrations. William Herschel discovered this part of the spectrum by putting a thermometer next to a prism.  Night vision goggles and temperature guns both operate by detecting this type of light. Name this type of light, with wavelengths just longer than visible light.`,
  //   answer: "infrared",
  //   url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2004N.pdf",
  //   category: SCIENCE,
  // },
  // {
  //   question: `Timberline Lodge, located on this state's highest point, was the filming site for much of The Shining. Nike is headquartered in Beaverton, a southern suburb of this state's largest city. It's not Maine, but this state's Mount Hood overlooks its largest city, Portland. Name this Pacific Northwest state that lies south of Washington and north of California.`,
  //   answer: "Oregon",
  //   url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2002N.pdf",
  //   category: GEOGRAPHY,
  // },
  // {
  //   question: `This quantity equals the square root of the product two, times mass, times kinetic energy. It's not force, but according to Newton's Second Law, the rate of change of this quantity equals mass times acceleration.  Rockets generate thrust after ejecting mass, since this quantity is conserved. Impulse equals the change in this quantity. Name this quantity equal to mass times velocity`,
  //   answer: "momentum",
  //   fullAnswer: "Linear Momentum",
  //   url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2002N.pdf",
  //   category: SCIENCE,
  // },
  // {
  //   question: `A scientist from this country was the first to estimate the extent an increase in atmospheric carbon dioxide would increase Earth's temperature. That scientist from this country names an equation that has a preexponential factor and is useful for calculating activation energies. Another scientist from this country used nitroglycerin to invent an explosive. This country contains the city of Ytterby. Name this home country of Svante Arrhenius and Alfred Nobel, who was born in Stockholm.`,
  //   answer: "Sweden",
  //   url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2002N.pdf",
  //   category: SCIENCE,
  // },
  // {
  //   question: `A depiction of this figure's head in Ayutthaya is almost completely surrounded by the roots of a banyan tree. The misleadingly named "Emerald" statue of this figure is currently located in Bangkok. Some statues of this figure carved out of cliffs can be found at Leshan and another site destroyed by the Taliban in 2001, Bamiyan. Name this religious figure, sometimes called Siddhartha Gautama.`,
  //   answer: "Buddha",
  //   url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2002N.pdf",
  //   category: RELIGION,
  // },
  // {
  //   question: `One performer in this ballet stands en pointe while performing 32 fouettés in a pas de deux. It's not by Mozart, but this ballet's score was edited by Riccardo Drigo for its revival by Lev Ivanov and Marius Petipa.  Lead ballerinas playing the role of this ballet's heroine often wear a black dress to also perform Odile, the daughter of the evil sorcerer von Rothbart. Name this Tchaikovsky ballet, in which Odette is cursed to turn into the title bird.`,
  //   answer: "Swan Lake",
  //   url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2003N.pdf",
  //   category: ART_AND_LITERATURE,
  // },
  // {
  //   question: `This civilization celebrated the husband of Ops in a festival which is preceded by "Io" [Yo] in a common greeting. A festival from this civilization involved the election of a mock king and the reversal of master and slave roles. That festival from this civilization celebrated a deity who carried a sickle and was frequently associated with the Greek Cronus. Name this civilization, which celebrated Saturnalia in the Forum`,
  //   answer: "Roman",
  //   fullAnswer: "Roman Civilization",
  //   url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2003N.pdf",
  //   category: RELIGION,
  // },
  // {
  //   question: `Pink banana flesh appears under a yellow peel in this artist's design for the cover of the Velvet Underground's debut album. This artist used mesh to transfer ink onto a canvas to create portraits of an actress in his Marilyn Diptych, which was made using silk-screening. This artist, who worked at the Factory, created thirty-two paintings that only differ in the labels of varieties like "split pea" and "tomato." Name this Pop artist, who painted Campbell's soup cans.`,
  //   answer: "Warhol",
  //   fullAnswer: "Andy Warhol",
  //   url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2003N.pdf",
  //   category: ART_AND_LITERATURE,
  // },
  // {
  //   question: `In this kingdom, Lorrin Thurston's Bayonet Constitution effectively repealed a law which protected travelers, the Law of the Splintered Paddle. The Newlands Resolution authorized William McKinley to send troops to annex this kingdom. Sanford Dole overthrew this kingdom's final monarch, Queen Liliuokalani. Name this kingdom once led by Kamehameha, an island chain that became the 50th state.`,
  //   answer: "Hawaii",
  //   url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2003N.pdf",
  //   category: HISTORY,
  // },
  // {
  //   question: `KHP is typically used to "standardize" a solution that is to be used in this technique. Quantities in this technique are tracked on a type of graph that approximates a sigmoid curve and plots volume against pH. To begin this technique, one must add an indicator, such as phenolphthalein, which will eventually cause the analyte to change color, indicating this technique's endpoint. Name this analytical technique used to determine an analyte's concentration`,
  //   answer: "Titration",
  //   url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2003N.pdf",
  //   category: SCIENCE,
  // },
  // {
  //   question: `Aristaeus's pursuit of this man's wife leads to her death from a snakebite. As an Argonaut, this man saved his crew by drowning out the Sirens' songs. After giving up the love for women for young boys, the Maenads killed this man and floated his head down a river. This son of the Muse Calliope ignores Hades' instructions and looks at his wife before leaving the underworld. Name this husband of Eurydice, a mythical lyre player.`,
  //   answer: "Orpheus",
  //   url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2003N.pdf",
  //   category: RELIGION,
  // },
  // {
  //   question: `One reaction in this organelle is driven by the cyclic interconversion of Coenzyme Q10 between ubiquinol and ubiquinone. Reducing equivalents, like FADH2 and NADH, serve as the inputs in a pathway in this organelle. In this organelle, a series of protein complexes named I through IV create a chemiosmotic potential that allows ATP synthase to produce ATP. This organelle contains the Krebs cycle and electron transport chain. Name this organelle, the powerhouse of the cell.`,
  //   answer: "Mitochondria",
  //   url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2003N.pdf",
  //   category: SCIENCE,
  // },
  // {
  //   question: `It's not Japan, but the term rangaku refers to technology acquired from this country through the port of Dejima. Charles Mackay described a "mania" in this country where the price of tulips spiked, then plunged.  This non-British country founded Batavia in its "East Indies," which consisted of colonies in what is now modern-day Indonesia. Name this country ruled by the House of Orange, which is the namesake of Dutch disease.`,
  //   answer: "Netherlands",
  //   url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2003N.pdf",
  //   category: HISTORY,
  // },
  // {
  //   question: `A PC game in this genre was inspired by the DS game Ouendan and includes "mania" and "taiko" modes.  Players slice moving red and blue cubes in a virtual reality game in this genre, Beat Saber. In a game in this genre, players touch buttons with their feet as arrows fly upwards on a screen. Players click circles in osu!, a game in this genre that also includes Dance Dance Revolution. What games test a player's sense of music and time?`,
  //   answer: "rhythm",
  //   url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2003N.pdf",
  //   category: POP_CULTURE,
  // },
  // {
  //   question: `Files for these things begin with a DOCTYPE declaration and use angle brackets to denote keywords like "head" and "body." Cascading Style Sheets are most commonly used to modify the visual elements, like color and font, of these things. The "h-ref" keyword is used to embed hyperlinks in these things, which can be accessed using URLs. Name these things that are accessed using browsers like Google Chrome.`,
  //   answer: "website",
  //   url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2003N.pdf",
  //   category: COMPUTER_SCIENCE,
  // },
  // {
  //   question: `The power of this institution in one country was mitigated by Plutarco Elías Calles, leading to the Cristero War. This institution was stripped of property by the Lerdo Law, which sparked the Reform War in Mexico. Several Latin American revolutions were guided by a philosophy combining this institution's beliefs with Marxism, liberation theology. Name this religious institution that sponsored Jesuit missions in the Americas, led by the Pope from Vatican City.`,
  //   answer: "Catholicic Church",
  //   url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2003N.pdf",
  //   category: RELIGION,
  // },
  // {
  //   question: `The trade of this commodity was opposed by King James I, who wrote a "Counterblaste" against it. Many of the hogsheads used to transport this commodity were destroyed by Cornwallis in its namesake "war" during the American Revolution. As part of the Third Supply, John Rolfe brought this crop to Jamestown.  Walter Raleigh popularized this crop in England. Name this crop, whose leaves are used in cigarettes.`,
  //   answer: "tobacco",
  //   url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2004N.pdf",
  //   category: HISTORY,
  // },
  // {
  //   question: `Samuel Wragg exchanged medical supplies for prisoners with this man after he set up a blockade around Charles Town in South Carolina. Despite parting ways with Stede Bonnet, this man returned to his old life with the Adventure, the successor to the Queen Anne's Revenge. Though his actual name is unknown, this man's name was often given as Edward Teach. Name this pirate, who was nicknamed for his dark facial hair.`,
  //   answer: "Blackbeard",
  //   url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2002N.pdf",
  //   category: HISTORY,
  // },
  // {
  //   question: `One work by this composer features a bass echo a B-flat major melody played by the trombone in the "Tuba Mirum" section. This composer's requiem in D minor was commissioned by Count von Walsegg and completed by Franz Süssmayr after his death in 1791. The only two symphonies in a minor key by this composer are the "Little" and "Great" G minor symphonies. Name this Austrian composer of the "Jupiter" Symphony, The Magic Flute, and  Turkish March.`,
  //   answer: "Mozart",
  //   fullAnswer: "Wolfgang Amadeus Mozart",
  //   url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2002N.pdf",
  //   category: ART_AND_LITERATURE,
  // },
  // {
  //   question: `In this tissue, calsequestrin binds to calcium ions in the sarcoplasmic reticulum, which, when released, binds to troponin. The functional unit of this tissue is the sarcomere. This tissue contains the proteins actin and myosin. Types of this tissue include smooth and striated. Name this tissue attached to bone that is responsible for contraction, examples of which include the bicep.`,
  //   answer: "muscle",
  //   url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2002N.pdf",
  //   category: SCIENCE,
  // },
  // {
  //   question: `John Keats wrote a poem titled "On Sitting Down to Read [this play] Once Again." In this play, a character declares "as flies to wanton boys are we to the gods; they kill us for their sport." A character disguised as Tom O'Bedlam leads Gloucester off an imaginary cliff in this play. This play opens with the flattering of the title character by his daughters Regan and Goneril. Name this Shakespearean tragedy about the title monarch, who exiles his daughter Cordelia.`,
  //   answer: "King Lear",
  //   url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2002N.pdf",
  //   category: ART_AND_LITERATURE,
  // },
  // {
  //   question: `The motion of two parts of these entities can be considered separately, according to the Born-Oppenheimer approximation. Arnold Sommerfeld introduced the azimuthal quantum number and elliptical paths to a model of these entities created by Ernest Rutherford. Niels Bohr formulated the planetary model of these entities, which can undergo alpha and beta decay. Name these entities that consist of electrons that follow clearly defined circular shells, which surround a central nucleus`,
  //   answer: "atoms",
  //   url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2003N.pdf",
  //   category: SCIENCE,
  // },
  // {
  //   question: `A treaty involving these animals was negotiated by Megasthenes with Seleucus I, who was paid 500 of them to go away. Pyrrhus of Epirus was the first to try invading Rome using these animals, which were present in most ancient Indian armies. Use of these animals failed at Zama when Scipio Africanus defeated the army of Carthage. Name these large animals that Hannibal brought across the Alps.`,
  //   answer: "elephants",
  //   url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2003N.pdf",
  //   category: HISTORY,
  // },
  // {
  //   question: `In 1994, thieves stealing this painting left a note reading "Thanks for the poor security." This painting, the most famous of its painter's series The Frieze of Life, sees two men walking on a bridge behind the central figure. The eruption of Krakatoa may have inspired the red sky in this painting, set on a fjord overlooking Oslo. Name this painting by Edvard Munch, in which a figure holds his face while doing the title action.`,
  //   answer: "The Scream",
  //   url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2005N.pdf",
  //   category: ART_AND_LITERATURE,
  // },
  // {
  //   question: `This Senator wrote the 7th of March speech, and later declared "Liberty and Union, now and forever, one and inseparable" in a rebuttal to Senator Robert K. Hayne. With John C. Calhoun and Henry Clay, this senator formed the "Great Triumvirate." This man negotiated a border treaty with Lord Ashburton in 1842.  Name this Senator from Massachusetts, who shares his name with a famous English language `,
  //   answer: "Webster",
  //   fullAnswer: "Daniel Webster",
  //   url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2005N.pdf",
  //   category: HISTORY,
  // },
  // {
  //   question: `This country's residents used the hashtag #thisismydam to support the construction of its Grand Renaissance Dam. This country contains Lake Tana, which is the source of the Blue Nile. This country lost its Red Sea coastline after neighboring Eritrea became independent from it, and it comprises the Horn of Africa, along with Djibouti and Somalia. Name this country, home to the capital Addis Ababa.`,
  //   answer: "Ethiopia",
  //   url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2005N.pdf",
  //   category: GEOGRAPHY,
  // },
  // {
  //   question: `This thinker blamed social issues on not calling things by their proper names, a problem he resolved with his "rectification of names." This mentor of Mencius advocated for archery and calligraphy in his "Six Arts," which are essential to becoming a perfect gentleman. This thinker developed five kinds of relationships, which are subject to filial piety. Name this Ancient Chinese philosopher, whose thoughts are collected in the Analects.`,
  //   answer: "Confucius",
  //   url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2005N.pdf",
  //   category: HISTORY,
  // },
  // {
  //   question: `Proponents of this religion from Iona lost a debate at Whitby, as chronicled in a history of this religion by Bede. Asser wrote a biography of a ruler of this religion, who created the Doom Book. Hundreds of adherents of this religion were killed by Norsemen during the Raid on Lindisfarne. One adherent of this religion apocryphally drove every snake in Ireland into the sea. Name this general religion of Alfred the Great and Saint Patrick.`,
  //   answer: "Christianity",
  //   url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2005N.pdf",
  //   category: RELIGION,
  // },
  // {
  //   question: `This author of True Allegiance became the youngest nationally syndicated columnist in the United States at age 17. This author interviewed Benjamin Netanyahu after a much-publicized trip to Israel. In 2010, this author controversially tweeted "Israelis like to build. Arabs like to bomb crap and live in open sewage." This author popularized the phrase "facts don't care about your feelings." Name this conservative commentator, who co-founded The Daily Wire.`,
  //   answer: "Shapiro",
  //   fullAnswer: "Ben Shapiro",
  //   url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2005N.pdf",
  //   category: POP_CULTURE,
  // },
  // {
  //   question: `The arrest of John Lawrence Jr. for being one of these people led to a Texas law being ruled unconstitutional in Lawrence v. Texas. Omar Manteen shot 49 of these people at the Pulse nightclub. These people could not openly serve in the military under the "Don't Ask, Don't Tell" policy. Obergefell v Hodges granted these people a right that was previously restricted under the Defense of Marriage Act. Name these people, who are represented by the rainbow pride flag.`,
  //   answer: "LGBTQ",
  //   url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2007N.pdf",
  //   category: HISTORY,
  // },
  // {
  //   question: `In contrast to their flocculent type, the "grand design" type of these objects has a well-defined structure.  These objects, which include M87, occupy parts of the Hubble tuning fork diagram. The Magellanic clouds are "dwarf" types of these objects. The central bulge of one type of these objects contains a supermassive black hole. Name these astronomical objects, which include the Milky Way.`,
  //   answer: "galaxy",
  //   url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2007N.pdf",
  //   category: SCIENCE,
  // },
  // // {
  // //   question: `A song by this composer features a chord progression used in Dizzy Gillespie's "Salt Peanuts." A bluesinspired aria about when "the livin' is easy" was created by this composer of "I Got Rhythm" for an opera set
  // // in Charleston's Catfish Row. A train ride to Boston inspired this composer of "Summertime" to write a
  // // piece which begins with Ross Gorman's improvised clarinet glissando. Name this composer of Porgy
  // // and Bess and Rhapsody in Blue.`,
  // //   answer: "Gershwin",
  // //   fullAnswer: "George Gershwin",
  // //   url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2007N.pdf",
  // //   category: ART_AND_LITERATURE,
  // // },
  // {
  //   question: `A letter in this novel that mentions a "country of eternal light" is written by an explorer to his sister. A character from this novel wonders why he does not have an Eve after reading Paradise Lost at Safie's cottage.  Margaret Saville is sent letters by Robert Walton in the frame story of this novel. The protagonist of this novel is friends with Henry Clerval, who is murdered by the invention of the protagonist. Name this novel about the scientist Victor and the monster he creates, by Mary Shelley.`,
  //   answer: "Frankenstein",
  //   url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2007N.pdf",
  //   category: ART_AND_LITERATURE,
  // },
  // {
  //   question: `In 2019, this man released the heavily auto-tuned rap single "RIP Harambe." This man intends to build a network of tunnels for transportation in Los Angeles with his Boring Company. This man launched his sports car into space, along with a "Falcon Heavy" rocket. This richest South African in history attempted to back out of, but later completed, a proposed $44 billion deal to buy Twitter in July 2022. Name this founder of SpaceX and CEO of Tesla.`,
  //   answer: "Elon Musk",
  //   url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2007N.pdf",
  //   category: POP_CULTURE,
  // },
  // {
  //   question: `These items were found at a site called the "Big Hole" in Kimberley. The Kollur mine produced several of these items, such as the Koh-i-Noor and one named "Hope." Cecil Rhodes made his fortune by founding a group that mined these items, De Beers. A 1930s Hollywood ad campaign inaugurated these items' use in wedding rings. Identify these precious stones, the hardest mineral on Earth.`,
  //   answer: "Diamonds",
  //   url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2007N.pdf",
  //   category: HISTORY,
  // },
  // {
  //   question: `In The Lucifer Effect, this experiment was compared to the atrocities at Abu Ghraib. This experiment ended after six days due to the objections of Christina Maslach. One participant in this event gained the nickname "John Wayne" for his cruelty. Phillip Zimbardo conducted what 1971 experiment, in which subjects were divided into "guards" and "inmates," conducted at a California university?`,
  //   answer: "Stanford Prison",
  //   url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2007N.pdf",
  //   category: SCIENCE,
  // },
  // {
  //   question: `Many retailers in this city accept the Octopus cards needed to access its Mass Transit Railway. The densest housing settlement ever constructed was a now-destroyed "walled city" on this city's Kowloon Peninsula. This city on the Pearl River forms a megalopolis with Guangzhou and Macau. Name this Special Administrative Region, which Great Britain ceded to China in 1997.`,
  //   answer: "Hong Kong",
  //   url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2007N.pdf",
  //   category: GEOGRAPHY,
  // },
  // {
  //   question: `This man was the first beneficiary of Operation Rebirth, which was led by Abraham Erskine. This man returned to life after Namor the Sub-Mariner accidentally broke the ice he had been encased in since the end of World War II. This enemy of Red Skull befriended Bucky Barnes shortly after being injected with supersoldier serum. Name this hero, also known as Steve Rogers, who carries a trademark red, white, and blue shield.`,
  //   answer: "Captain America",
  //   url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2007N.pdf",
  //   category: POP_CULTURE,
  // },
  // {
  //   question: `This event's denial at the Council of Salamanca was described in a mythologized Washington Irving biography of its leader. Alfred Crosby coined the name for a process began by this event, in which European syphilis rates increased. This event started an "exchange" which saw potatoes enter Europe for the first time. The Niña, Pinta, and Santa Maria were used in what 1492 event, in which a certain explorer landed in the Americas?`,
  //   answer: "Voyage of Columbus",
  //   url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2007N.pdf",
  //   category: HISTORY,
  // },
  // {
  //   question: `Lindlar's catalyst may be used to react this molecule with an alkyne. This molecule is produced, along with carbon dioxide, in the water-gas shift reaction. By definition, this molecule is assigned a reduction potential of zero. This molecule is combined with oxygen in fuel cells that power cars. This gas reacts with nitrogen in the Haber process to form ammonia. Name this diatomic gas of the element with atomic number one.`,
  //   answer: "Hydrogen",
  //   url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2007N.pdf",
  //   category: SCIENCE,
  // },
  // {
  //   question: `A kind of this material similar to milk, called lattimo, was made by producers on the Venetian island of Murano. Dale Chihuly is an artist best known for working with this material, which makes up the shade of Tiffany lamps. This material can be shaped by blowing into a hollow clay rod. This material is used in circular "rose" apertures on the walls of many Gothic cathedrals. Name this material, which is "stained" in many church windows.`,
  //   answer: "glass",
  //   url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2007N.pdf",
  //   category: ART_AND_LITERATURE,
  // },
  // {
  //   question: `In one song, this artist referenced his extended stay at Mercedes-Benz Stadium with the line "they playin' soccer in my backyard." The name of this artist's mother is chanted to her heartbeat's rhythm to begin an album by him, featuring the song "Jail." This artist, who released a 2022 album on his "stem player," called a comedian dating his ex-wife "Skete" in a feud with Pete Davidson. Name this rapper behind Donda and ex-husband of Kim Kardashian.`,
  //   answer: "Kanye West",
  //   url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2007N.pdf",
  //   category: POP_CULTURE,
  // },
  {
    question: `The separation of these peoples' children from their families was detailed in the Bringing them Home Report. National Sorry Day commemorates the mistreatment of these people's "Stolen Generations." These peoples' myths feature a sandstone rock formation once named for Henry Ayers, Uluru. Name these people British explorers met in the Outback, the indigenous peoples of Australia.`,
    answer: "Aboriginals",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2005N.pdf",
    category: HISTORY,
  },
  {
    question: `Jean-Jacques Rousseau arranged this work for solo flute, and its last movement utilizes pizzicato strings to depict rain. This work is performed alongside sonnet texts such as "the drunkards have fallen asleep," and includes a viola playing "always forte" to depict a barking dog. This work was included in the composer's Contest Between Invention and Harmony. Name this set of four violin concertos composed by Antonio Vivaldi.`,
    answer: "Four Seasons",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2005N.pdf",
    category: ART_AND_LITERATURE,
  },
  {
    question: `This team was called "Baseball's Great Experiment" in a 2014 Sports Illustrated cover that predicted a future World Series win. While pitching for this team, Framber Valdez gave up the first ever World Series leadoff home run to Jorge Soler. A 2019 investigation revealed that banging on garbage cans signaled opponents' signs that this team "stole." Jose Altuve plays for this team, which lost the 2021 World Series. Name this team that plays in Texas' largest city.`,
    answer: "Astros",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2005N.pdf",
    category: SPORTS,
  },
  {
    question: `In Bahai, the Nineteen Day Fast ends on one of these holidays, called Nowruz. On one of these holidays,
    which occurs fifteen days before the Lantern Festival, children are given red envelopes filled with money. A
    Jewish one of these holidays is the first of the High Holy Days and takes place nine days before Yom Kippur.
    Rosh Hashanah is what type of holiday, which falls on January 1st in the Gregorian Calendar?`,
    answer: "New Years",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2010N.pdf",
    category: RELIGION,
  },
  {
    question: `This practice was controlled by wealthy Basque merchants at Grand Banks in Newfoundland. The Magna
  Carta outlawed the use of weirs in this practice in England. One war over this practice ended after the
  UNCLOS defined Exclusive Economic Zones as within a range of 200 nautical miles. Iceland and England
  fought a series of late 20th century “wars” over this practice in the North Sea. Name this practice,
  which often yields animals like cod.`,
    answer: "fishing",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2010N.pdf",
    category: HISTORY,
  },
  {
    question: `A stream of electrons moving by a series of cavity resonators generates this kind of radiation in a cavity
    magnetron. This radiation is commonly used to induce dielectric heating in substances with high water
    content. Metals with fine points produce sparks when exposed to this kind of radiation. This radiation lies
    between radio and infrared waves. Name this radiation, which is used by a kitchen appliance of the
    same name to quickly heat food.`,
    answer: "microwave",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2010N.pdf",
    category: SCIENCE,
  },
  {
    question: `Richard E. Grant plays this character in a scene where he tricks the monster Alioth with a hologram of
  his home. A “Kid” version of this character was sent to the Void after killing his brother. This character’s
  variants, such as Sylvie, appear in a TV series centered around the TVA. This character tells a Titan that he
  will “never be a God” before being murdered by Thanos. Name this character primarily played by
  Tom Hiddleston, a trickster god from Asgard who names a 2021 Marvel TV series.`,
    answer: "Loki",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2010N.pdf",
    category: POP_CULTURE,
  },
  {
    question: `DNA testing of this man’s mother, “The Younger Lady,” in KV35 proved this man was born from an
    incestous marriage. Arthur Conan Doyle suggested Lord Carnavon’s death was caused by “elementals”
    produced by this man’s priests. Howard Carter discovered this man and his gold death mask in the Valley
    of the Kings in Thebes. Name this pharaoh who died young, and whose tomb was discovered remarkably intact.`,
    answer: "King Tut",
    fullAnswer: "King Tutankhamun",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2010N.pdf",
    category: HISTORY,
  },
  {
    question: `The quantity named after this man times elementary charge gives Faraday’s constant. This man's number equals the universal gas constant,
  divided by Boltzmann’s constant. The quantity named after this man multiplies atomic mass units to yield molar mass, since this is the
  number of atoms in 12 grams of carbon-12. The quantity named after this man is defined as 6.022 times 10-to-the-23rd. 
  Identify this man's constant, which is equal to the number of molecules in one mole.`,
    answer: "Avogadro",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2010N.pdf",
    category: SCIENCE,
  },
  {
    question: `This empire, whose history is recorded in the Mendoza Codex, built artificial islands called chinampas for
agriculture. This empire waged ritual Flower Wars against neighbors, such as Cholula and Tlaxcala. This
Nahuatl-speaking empire had success against invaders on La Noche Triste, but their capital was captured by
Hernan Cortes in 1521. Name this Mexican empire ruled by Montezuma, which was centered on
Tenochtitlan.`,
    answer: "Aztec",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2010N.pdf",
    category: HISTORY,
  },
  {
    question: `These locations are the home of a group of organisms whose species include the “staghorn” and
  “elkhorn." The Great Blue Hole can be found within one of these locations, named after the country of Belize.
  The largest of the “barrier” type of these locations is located off the coast of Queensland, Australia. Name these complex marine ecosystems, which primarily consist of the namesake cnidarians.`,
    answer: "Coral Reefs",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2010N.pdf",
    category: SCIENCE,
  },
  {
    question: `A similar-looking sibling of this creature guarded the cattle of Geryon and was named Orthus. In the
  Aeneid, the Cumaean Sibyl laces a honey cake with drugs to put this creature to sleep. Heracles wrestled and
  defeated this creature in his twelfth and final labor. Name this three-headed dog from Greek
  mythology, the guardian of the underworld.`,
    answer: "Cerberus",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2010N.pdf",
    category: RELIGION,
  },
  {
    question: `This figure prophesied that a tower collapsing was due to a pair of red and white dragons after he was
  brought to King Vortigern. This mythological character was trapped by his student Viviane, and built the
  burial place of Aurelius Ambrosius, Stonehenge. This man sealed the sword in the stone to determine the next
  king of Britain. Name this wizard, who advised King Arthur.`,
    answer: "Merlin",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2011N.pdf",
    category: RELIGION,
  },
  {
    question: `A political cartoon depicts an act signed by this President as a turtle who bites a man shouting at the
  “cursed Ograbme.” During this man’s presidency, James Monroe negotiated with French diplomats over the
  sale of land that he later sent the Lewis and Clark Expedition to explore. Slaves like Sally Hemmings lived at
  this man’s estate, Monticello. The Declaration of Independence was drafted by what third U. S.
  President?`,
    answer: "Jefferson",
    fullAnswer: "Thomas Jefferson",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2011N.pdf",
    category: HISTORY,
  },
  {
    question: `Two of these animals with crescent moons on their foreheads advise the Sailor Guardians in the Sailor
  Moon series. One of these animals has twelve legs and takes the form of a “bus” in My Neighbor Totoro. A
  character that is one of these animals is a member of a group that includes Wobbuffet. That character, who
  is one of these animals, evolves into Persian and is part of a trio with Jesse and James. Name these
  animals that anime characters often have “ears” of, and include Meowth in Pokémon.`,
    answer: "Cats",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2011N.pdf",
    category: POP_CULTURE,
  },
  {
    question: `This force is described by a gauge theory with symmetry group SU(3). Asymptotic freedom and color
  confinement are properties of this force, which is described by quantum chromodynamics. This fundamental
  force is mediated by the gluon, and holds together protons and neutrons in a nucleus. As its name suggests, this
  force has a higher strength than the gravitational, electromagnetic, and weak forces. For 10 points, name this most
  powerful fundamental force.`,
    answer: "Strong force",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2011N.pdf",
    category: SCIENCE,
  },
  {
    question: `In this country, Myles and Damien Sanderson were suspected of carrying out an attack in 13 separate
  locations. This country’s leader declared a state of emergency after truckers protesting Covid regulations
  shut down roads in one region. In September of 2022, this country experienced its worst mass stabbing in history in
  Saskatchewan. Name this country led by Justin Trudeau from Ottawa.`,
    answer: "Canada",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2011N.pdf",
    category: HISTORY,
  },
  {
    question: `The Busy Beaver function is computed using a construct named for this man. The halting problem is
  undecidable on a class of “machines” named for this man, which consists of an infinite tape of symbols. The
  imitation game developed by this man is typically framed in terms of a human trying to determine whether
  he is speaking to a computer. Name this “father of computer science,” who names a “test” for AI.`,
    answer: "Turing",
    fullAnswer: "Alan Turing",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2012N.pdf",
    category: COMPUTER_SCIENCE,
  },
  {
    question: `One saint associated with this holiday slapped the heretic Arius in the face at the First Council of Nicaea.
  This day takes place twelve days before the Epiphany and one day after the end of Advent. This day begins
  with a Midnight Mass and celebrants singing “carols,” such as “Silent Night.” Name this holiday,
  during which Santa Claus brings children gifts, celebrated on December 25th.`,
    answer: "Christmas",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2012N.pdf",
    category: RELIGION,
  },
  {
    question: `A part-Pakistani character on this show initially died by being crushed under her sister Kamilah’s statue.
  Mindy St. Clair inhabits a “medium” location in this show that is later joined by Derek, a boyfriend Janet
  creates. In this show’s first season, the dim-witted Jason Mendoza pretends to be a monk while working with
  Chidi and Eleanor to uncover why they are in an idyllic afterlife, despite the less than stellar lives they led. Name this NBC show, whose title location is contrasted with the Bad Place.`,
    answer: "The Good Place",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2012N.pdf",
    category: POP_CULTURE,
  },
  {
    question: `A planar ring is aromatic if it has 2 plus a multiple of this number of pi electrons, according to Hückel's
  rule. White phosphorus molecules have this many atoms each. This is the oxidation state of carbon in carbon
  dioxide. The central atom has this many bonds in a molecule with seesaw geometry and tetrahedral
  geometry. This is the number of electrons in a double bond. Name this number of hydrogens in
  methane and the atomic number of beryllium.`,
    answer: "Four",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2012N.pdf",
    category: SCIENCE,
  },
  {
    question: `This country’s national dish is a notoriously pungent shark meat food, called hakarl. This country has the
  world’s oldest parliament, the Althing. Tourists to this country’s Golden Circle can see the geysers Strokkur
  and Geysir and the waterfall Gullfoss. This European country has the (*) northernmost capital city in the world
  and, along with Greenland, was misleadingly named by the Vikings that first inhabited it. For 10 points, name this
  island country, whose capital is Reykjavik.`,
    answer: "Iceland",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2012N.pdf",
    category: GEOGRAPHY,
  },
  {
    question: `At the 1904 Summer Olympics, this event was won by Thomas Hicks, who was given brandy mixed with
  rat poison during it. The company Ineos sponsonsored a race where an athlete from Kenya who competes in
  this event, Eliud Kipchoge, unofficially broke the two hour barrier for completing it. Boston hosts a race of
  this type, which was the site of a 2013 bombing. An ancient battle is the namesake of what longdistance race that lasts 26.2 miles?`,
    answer: "Marathon",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2012N.pdf",
    category: POP_CULTURE,
  },
  {
    question: `The sum of this quantity around a closed loop equals zero, according to Kirchhoff's second law. For a
  parallel-plate capacitor, this quantity equals its electric field times plate separation. Power is equal to (*)
  current times this quantity. This quantity is equal to current times resistance, according to Ohm’s Law. Batteries
  generate a difference in, for 10 points, what quantity, which is symbolized V?`,
    answer: "Voltage",
    url: "https://files.quizbowlpackets.com/2806/KICKOFF%20Novice%20Packet%2012N.pdf",
    category: SCIENCE,
  },
];

export default questions;
