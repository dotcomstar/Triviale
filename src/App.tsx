import { Grid } from "@mui/material";
import ThemedLayout from "./components/ThemedLayout";
import NavBar from "./components/navbar/NavBar";
import ExpandableText from "./components/question/ExpandableText";
import useQuestions from "./hooks/useQuestions";

function App() {
  const { data } = useQuestions();

  return (
    <ThemedLayout>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <NavBar />
        </Grid>
        <Grid item xs={12} sx={{ mx: 3 }}>
          <ExpandableText>{data[0].question}</ExpandableText>
        </Grid>
      </Grid>
    </ThemedLayout>
  );
}

export default App;
