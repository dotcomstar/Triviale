import { Question } from "../data/questions";

// Builds every guess that should count as correct for a question: the
// answer itself, any altAnswers, and (hard mode) every addOn glued onto the
// answer as a prefix, a suffix, or both. `answer` is the caller's own
// already-normalized (uppercase, no spaces) answer string, since every
// caller also needs that value on its own for exact-match comparisons.
//
// TODO: also generate permutations combining addOns with altAnswers.
export const getAcceptableAnswers = (
  question: Pick<Question, "answer" | "altAnswer" | "addOns"> | undefined,
  answer: string
): string[] => {
  const addOns = question?.addOns ?? [];
  const permutationsWithAddons = addOns.flatMap((addOn) => [
    `${addOn}${answer}`,
    `${answer}${addOn}`,
    ...addOns.map((suffix) => `${addOn}${answer}${suffix}`),
  ]);

  return [question?.answer, ...(question?.altAnswer ?? []), ...permutationsWithAddons]
    .filter((v): v is string => v !== undefined)
    .map((v) => v.toLocaleUpperCase().replace(/\s+/g, ""));
};
