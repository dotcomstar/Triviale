import useGameStateStore from "../stores/gameStateStore";
import useRetrievedStore from "../stores/retrievedStore";
import useDailyIndex, { getPositiveIndex } from "./useDailyIndex";

// The local `questions` array holds every question ever written, not just
// today's — `dailyIndex` offsets `questionNumber` (0, 1, 2, ... for today's
// Nth question) to the right slot in that array. `retrieved` marks whether
// `data` instead came pre-scoped to today's window from the MongoDB-backed
// fetch path (see useQuestions.ts), in which case `questionNumber` is
// already the correct index and no offset is needed. That fetch path is
// currently disabled, so `retrieved` is always false in production; tests
// flip it on via `useRetrievedStore.getState().setRetrieved(true)` as a
// shortcut to a deterministic index without mocking the clock.
const useSafeQuestionIndex = (): number => {
  const dailyIndex = useDailyIndex();
  const retrieved = useRetrievedStore((s) => s.retrieved);
  const questionNumber = useGameStateStore((s) => s.questionNumber);
  return getPositiveIndex(questionNumber + (retrieved ? 0 : dailyIndex));
};

export default useSafeQuestionIndex;
