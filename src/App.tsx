import { Alert, Grid, Paper, useMediaQuery } from "@mui/material";
import { useEffect } from "react";
import ThemedLayout from "./components/ThemedLayout";
import GameGrid from "./components/grid/GameGrid";
import Keyboard from "./components/keyboard/Keyboard";
import NavBar from "./components/navbar/NavBar";
import ProgressBar from "./components/progressBar/ProgressBar";
import ExpandableText from "./components/question/ExpandableText";
import { MAX_CHALLENGES } from "./constants/settings";
import useDailyIndex, { getPositiveIndex } from "./hooks/useDailyIndex";
import useQuestions from "./hooks/useQuestions";
import useCurrGuessStore from "./stores/currGuessStore";
import useDialogStore from "./stores/dialogStore";
import useGameStateStore from "./stores/gameStateStore";
import useHardModeStore from "./stores/hardModeStore";

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
    guesses,
    importGame,
  } = useGameStateStore();
  const dailyIndex = useDailyIndex();
  const safeIndex = getPositiveIndex(dailyIndex + questionNumber);
  const question = data[safeIndex].question;
  const answer = data[safeIndex].answer.toLocaleUpperCase();
  const fullAnswer = data[safeIndex].fullAnswer;
  const { setStatsOpen } = useDialogStore();
  const matches = useMediaQuery("(min-width:600px)");

  // Running on unload or beforeunload is unreliable according to https://developer.chrome.com/articles/page-lifecycle-api/#legacy-lifecycle-apis-to-avoid
  useEffect(() => {
    window.addEventListener("visibilitychange", handleTabClosing);
    return () => {
      window.removeEventListener("visibilitychange", handleTabClosing);
    };
  });

  // Save game state to local storage.
  const handleTabClosing = () => {
    localStorage.setItem(
      "prevGame",
      JSON.stringify({
        pastOffset: dailyIndex,
        gameState: gameState,
        questionState: questionState,
        questionNumber: questionNumber,
        guessNumber: guessNumber,
        guesses: guesses,
      })
    );
  };

  useEffect(() => {
    // Check if the user has already made guesses today.
    const existingGuesses = localStorage.getItem("prevGame") || "{}";
    console.log(existingGuesses);
    const pastGuesses = JSON.parse(existingGuesses);
    if (pastGuesses["pastOffset"] === dailyIndex) {
      console.log("Importing past guesses");
      const pastGame = {
        gameState: pastGuesses["gameState"],
        questionState: pastGuesses["questionState"],
        questionNumber: pastGuesses["questionNumber"],
        guessNumber: pastGuesses["guessNumber"],
        guesses: pastGuesses["guesses"],
      };
      importGame(pastGame);
    } else {
      // No previous guesses
      console.log("No previous guesses");
    }
  }, []);

  return (
    <ThemedLayout>
      <Grid container paddingY={matches ? 1 : 0}>
        <Grid item xs={12}>
          <NavBar />
        </Grid>
        <Grid item xs={12}>
          <ProgressBar />
        </Grid>
        <Paper
          elevation={0}
          sx={{
            maxHeight: matches ? "100vh" : "calc(100vh - 290px)",
            overflow: "auto",
          }}
        >
          <Grid item xs={12} sx={{ mx: 0, pt: 1 }}>
            <ExpandableText>{question}</ExpandableText>
          </Grid>
          <Grid item xs={12} sx={{ px: 1, mb: 1 }}>
            {questionState[questionNumber] === "lost" && (
              <Alert severity="info" sx={{ mb: 1, mx: 2 }}>
                Answer was {answer}
                {fullAnswer ? `, as in ${fullAnswer}` : ""}
              </Alert>
            )}
            <GameGrid />
          </Grid>
        </Paper>

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
                setStatsOpen(true);
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
