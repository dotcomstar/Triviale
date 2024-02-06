import {
  Stack,
  TextField,
  Button,
  useMediaQuery,
  Autocomplete,
} from "@mui/material";
import { MOBILE_SCREEN_CUTOFF } from "../../constants/settings";
import useGameStateStore from "../../stores/gameStateStore";
import { ALL_CATEGORIES } from "../../data/questions";

const CustomizableText = () => {
  const matches = useMediaQuery(`(min-width:${MOBILE_SCREEN_CUTOFF})`);
  const questionNumber = useGameStateStore((s) => s.questionNumber);

  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      display={"flex"}
      sx={{
        py: 3,
        px: matches ? "25%" : 3,
      }}
      spacing={1}
    >
      <TextField
        multiline
        margin="normal"
        minRows={3}
        fullWidth
        variant="filled"
        label={`Question ${questionNumber + 1}`}
        placeholder="Put your question here"
      />
      <TextField
        fullWidth
        margin="normal"
        variant="filled"
        label="Answer"
        placeholder="Put your answer here"
      />
      <Autocomplete
        options={[]}
        fullWidth
        freeSolo
        multiple
        renderInput={(params) => (
          <TextField
            {...params}
            label="Alt Answers (optional)"
            placeholder="Press enter to add a new answer"
          />
        )}
      />
      <Autocomplete
        options={ALL_CATEGORIES}
        fullWidth
        freeSolo
        renderInput={(params) => <TextField {...params} label="Category" />}
      />
      <Button variant="contained" fullWidth color="secondary">
        Save
      </Button>
    </Stack>
  );
};

export default CustomizableText;
