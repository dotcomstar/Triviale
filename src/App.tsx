import { Grid } from "@mui/material";
import ThemedLayout from "./components/ThemedLayout";
import NavBar from "./components/navbar/NavBar";
import ExpandableText from "./components/question/ExpandableText";
import useQuestions from "./hooks/useQuestions";
import Keyboard from "./components/keyboard/Keyboard";
import useQuestionExpansionStore from "./stores/questionExpansionStore";
import EmptyRow from "./components/grid/EmptyRow";
import GameGrid from "./components/grid/GameGrid";

function App() {
  const { data } = useQuestions();
  const { expandQuestion } = useQuestionExpansionStore();
  return (
    <ThemedLayout>
      <Grid container>
        <Grid item xs={12}>
          <NavBar />
        </Grid>
        <Grid item xs={12} sx={{ mx: 3, pt: 2 }}>
          <ExpandableText>{data[0].question}</ExpandableText>
        </Grid>
        <Grid item xs={12} sx={{ mx: 3 }}>
          <GameGrid />
        </Grid>
        <Grid item xs={12} sx={{ px: 0 }} overflow={"scroll"}>
          <Keyboard
            onChar={(c) => {
              console.log(c);
            }}
            onDelete={() => console.log("delete")}
            onEnter={() => {
              console.log("enter");
              expandQuestion();
            }}
            isRevealing={false}
          />
        </Grid>
      </Grid>
    </ThemedLayout>
  );
}

export default App;
