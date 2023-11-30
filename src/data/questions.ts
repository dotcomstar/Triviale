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
];

export default questions;
