import { Grid } from "@mui/material";
import ThemedLayout from "./components/ThemedLayout";
import NavBar from "./components/navbar/NavBar";
import ExpandableText from "./components/question/ExpandableText";
import useQuestions from "./hooks/useQuestions";
import Keyboard from "./components/keyboard/Keyboard";
import useQuestionExpansionStore from "./stores/questionExpansionStore";
import GameGrid from "./components/grid/GameGrid";
import useCurrGuessStore from "./stores/currGuessStore";
import useGameStateStore from "./stores/gameStateStore";
import { MAX_CHALLENGES } from "./constants/settings";

function App() {
  const { data } = useQuestions();
  const { expandQuestion, resetQuestionExpansion } =
    useQuestionExpansionStore();
  const { addChar, deleteChar, index, guess, resetGuess } = useCurrGuessStore();
  const { questionNumber, makeGuess, guessNumber, moveToNextQuestion } =
    useGameStateStore();
  return (
    <ThemedLayout>
      <Grid container>
        <Grid item xs={12}>
          <NavBar />
        </Grid>
        <Grid item xs={12} sx={{ mx: 3, pt: 2 }}>
          <ExpandableText>{data[questionNumber].question}</ExpandableText>
        </Grid>
        <Grid item xs={12} sx={{ px: 1, mb: 1 }}>
          <GameGrid />
        </Grid>
        <Grid item xs={12} sx={{ px: 0 }} overflow={"scroll"}>
          <Keyboard
            onChar={(c) => {
              console.log(c);
              if (index < data[questionNumber].answer.length) {
                addChar(c);
              }
            }}
            onDelete={() => {
              console.log("delete");
              deleteChar();
            }}
            onEnter={() => {
              console.log("enter");
              expandQuestion();
              makeGuess(guess);
              resetGuess();
              if (guessNumber >= MAX_CHALLENGES) {
                moveToNextQuestion();
                resetQuestionExpansion();
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
