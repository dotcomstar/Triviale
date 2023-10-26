import { Grid } from "@mui/material";
import ThemedLayout from "./components/ThemedLayout";
import NavBar from "./components/navbar/NavBar";
import ExpandableText from "./components/question/ExpandableText";
import useQuestions from "./hooks/useQuestions";
import Keyboard from "./components/keyboard/Keyboard";
import GameGrid from "./components/grid/GameGrid";
import useCurrGuessStore from "./stores/currGuessStore";
import useGameStateStore from "./stores/gameStateStore";
import { MAX_CHALLENGES } from "./constants/settings";
import ProgressBar from "./components/progressBar/ProgressBar";

function App() {
  const { data } = useQuestions();
  const { addChar, deleteChar, index, guess, resetGuess } = useCurrGuessStore();
  const {
    questionNumber,
    makeGuess,
    guessNumber,
    moveToQuestion,
    gameState,
    questionState,
    winGame,
    loseGame,
    winQuestion,
    loseQuestion,
  } = useGameStateStore();
  const question = data[questionNumber].question;
  const answer = data[questionNumber].answer.toLocaleUpperCase();

  return (
    <ThemedLayout>
      <Grid container>
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
              if (index === answer.length) {
                if (guess.join("") === answer) {
                  winQuestion(questionNumber);
                } else if (guessNumber >= MAX_CHALLENGES - 1) {
                  loseQuestion(questionNumber);
                } else {
                  console.log("Incorrect :(");
                }
                makeGuess(guess);
                resetGuess();
              }
              if (!questionState.includes("inProgress")) {
                if (
                  questionState.reduce(
                    (acc, state) => acc && state === "won",
                    true
                  )
                ) {
                  winGame();
                  return;
                } else {
                  loseGame();
                  return;
                }
              }
              if (
                questionState[questionNumber] !== "inProgress" &&
                gameState === "inProgress"
              ) {
                moveToQuestion(questionNumber + 1);
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
