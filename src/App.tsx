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

function App() {
  const { data } = useQuestions();
  const { addChar, deleteChar, index, guess, resetGuess } = useCurrGuessStore();
  const { questionNumber, makeGuess, guessNumber, moveToNextQuestion } =
    useGameStateStore();
  const question = data[questionNumber].question;
  const answer = data[questionNumber].answer;
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
              if (index < answer.length) {
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
                if (guess.join("") === answer.toLocaleUpperCase()) {
                  console.log("Correct!");
                } else {
                  console.log("Incorrect :(");
                }
                makeGuess(guess);
                resetGuess();
              }
              if (guessNumber >= MAX_CHALLENGES) {
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
