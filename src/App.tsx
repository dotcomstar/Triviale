import { Stack } from "@mui/material";
import ColorModeSwitch from "./components/ColorModeSwitch";

function App() {
  return (
    <>
      <p>Hello</p>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ pb: 3 }}
      >
        <p>Hello</p>
        <ColorModeSwitch />;
      </Stack>
    </>
  );
}

export default App;
