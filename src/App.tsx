import { Grid } from "@mui/material";
import ThemedLayout from "./components/ThemedLayout";

function App() {
  return (
    <ThemedLayout>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <p>NavBar </p>
        </Grid>
        <Grid item xs={12}>
          <p>Main content</p>
        </Grid>
      </Grid>
    </ThemedLayout>
  );
}

export default App;
