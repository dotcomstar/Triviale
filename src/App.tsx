import { Alert, Grid } from "@mui/material";
import ThemedLayout from "./components/ThemedLayout";
import GameGrid from "./components/grid/GameGrid";
import Keyboard from "./components/keyboard/Keyboard";
import NavBar from "./components/navbar/NavBar";
import ProgressBar from "./components/progressBar/ProgressBar";
import ExpandableText from "./components/question/ExpandableText";
import { MAX_CHALLENGES } from "./constants/settings";
import useQuestions from "./hooks/useQuestions";
import useCurrGuessStore from "./stores/currGuessStore";
import useGameStateStore from "./stores/gameStateStore";
import useDailyIndex, { getPositiveIndex } from "./hooks/useDailyIndex";
import useHardModeStore from "./stores/hardModeStore";
import useDialogStore from "./stores/dialogStore";

function App() {
  const { data } = useQuestions();
  const hardMode = useHardModeStore((s) => s.hardMode);
  const { addChar, deleteChar, index, guess, resetGuess } = useCurrGuessStore();
  const {
    questionNumber,
    makeGuess,
    guessNumber,
    moveToNextQuestion,
    gameState,
    questionState,
    winGame,
    loseGame,
    winQuestion,
    loseQuestion,
  } = useGameStateStore();
  const dailyIndex = useDailyIndex();
  const safeIndex = getPositiveIndex(dailyIndex + questionNumber);
  const question = data[safeIndex].question;
  const answer = data[safeIndex].answer.toLocaleUpperCase();
  const fullAnswer = data[safeIndex].fullAnswer;
  const openStats = useDialogStore((s) => s.setStatsOpen);

  return (
    <ThemedLayout>
      <Grid container paddingY={1}>
        <Grid item xs={12}>
          <NavBar />
        </Grid>
        <Grid item xs={12}>
          <ProgressBar />
        </Grid>
        <Grid item xs={12} sx={{ mx: 3, pt: 1 }}>
          <ExpandableText>{question}</ExpandableText>
        </Grid>
        <Grid item xs={12} sx={{ px: 1, mb: 1 }}>
          {questionState[questionNumber] === "lost" && (
            <Alert severity="info">
              Answer was {answer}
              {fullAnswer ? `, as in ${fullAnswer}` : ""}
            </Alert>
          )}
          <GameGrid />
        </Grid>
        <Grid item xs={12} sx={{ px: 0 }} overflow={"scroll"}>
          <Keyboard
            onChar={(c) => {
              console.log(c);
              if (
                index < answer.length &&
                questionState[questionNumber] === "inProgress"
              ) {
                addChar(c);
              }
            }}
            onDelete={() => {
              console.log("delete");
              deleteChar();
            }}
            onEnter={() => {
              console.log("enter");
              let finalGuess = false;
              let won = false;
              let hasOneMoreGuess =
                questionState.filter((state) => state === "inProgress")
                  .length === 1;
              if (index === answer.length) {
                if (guess.join("") === answer) {
                  winQuestion(questionNumber);
                  document.getElementById("ExpandableButton")?.focus();
                  finalGuess = true;
                  won = true;
                } else if (guessNumber >= MAX_CHALLENGES - 1 || hardMode) {
                  loseQuestion(questionNumber);
                  document.getElementById("ExpandableButton")?.focus();
                  finalGuess = true;
                } else {
                  console.log("Incorrect :(");
                }
                makeGuess(guess);
                resetGuess();
              }
              if (
                !questionState.includes("inProgress") ||
                (hasOneMoreGuess && finalGuess)
              ) {
                if (
                  questionState.reduce(
                    (acc, state) => acc && state === "won",
                    true
                  ) ||
                  (hasOneMoreGuess && won)
                ) {
                  winGame();
                } else {
                  loseGame();
                }
                openStats(true);
                return;
              }
              if (
                questionState[questionNumber] !== "inProgress" &&
                gameState === "inProgress"
              ) {
                resetGuess();
                moveToNextQuestion();
              }
            }}
            isRevealing={false}
          />
        </Grid>
      </Grid>
    </ThemedLayout>
  );
}

export default App;
