import { Grid } from "@mui/material";
import ThemedLayout from "./components/ThemedLayout";
import NavBar from "./components/navbar/NavBar";
import ExpandableText from "./components/question/ExpandableText";
import useQuestions from "./hooks/useQuestions";
import Keyboard from "./components/keyboard/Keyboard";
import GameGrid from "./components/grid/GameGrid";
import useCurrGuessStore from "./stores/currGuessStore";
import useGameStateStore from "./stores/gameStateStore";
import { MAX_CHALLENGES, QUESTIONS_PER_DAY } from "./constants/settings";

function App() {
  const { data } = useQuestions();
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
    resetQuestion,
  } = useGameStateStore();
  const question = data[questionNumber].question;
  const answer = data[questionNumber].answer.toLocaleUpperCase();
  return (
    <ThemedLayout>
      <Grid container>
        <Grid item xs={12}>
          <NavBar />
        </Grid>
        <Grid item xs={12} sx={{ mx: 3, pt: 2 }}>
          <ExpandableText>{question}</ExpandableText>
        </Grid>
        <Grid item xs={12} sx={{ px: 1, mb: 1 }}>
          <GameGrid />
        </Grid>
        <Grid item xs={12} sx={{ px: 0 }} overflow={"scroll"}>
          <Keyboard
            onChar={(c) => {
              console.log(c);
              if (index < answer.length && questionState === "inProgress") {
                addChar(c);
              }
            }}
            onDelete={() => {
              console.log("delete");
              deleteChar();
            }}
            onEnter={() => {
              console.log("enter");
              console.log(questionState);
              if (index === answer.length) {
                if (guess.join("") === answer) {
                  console.log("Correct!");
                  winQuestion();
                  if (questionNumber >= QUESTIONS_PER_DAY - 1) {
                    console.log("Won the game");
                    winGame();
                  }
                } else if (guessNumber >= MAX_CHALLENGES - 1) {
                  loseQuestion();
                  console.log("Lost the question :(");
                  if (questionNumber >= QUESTIONS_PER_DAY - 1) {
                    console.log("Lost the game");
                    loseGame();
                  }
                } else {
                  console.log("Incorrect :(");
                }
                makeGuess(guess);
                resetGuess();
              }
              if (
                questionState !== "inProgress" &&
                gameState === "inProgress"
              ) {
                resetQuestion();
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
