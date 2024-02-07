import {
  Stack,
  TextField,
  Button,
  useMediaQuery,
  Autocomplete,
} from "@mui/material";
import {
  MAX_CATEGORY_STRING_LENGTH,
  MOBILE_SCREEN_CUTOFF,
} from "../../constants/settings";
import useGameStateStore from "../../stores/gameStateStore";
import { ALL_CATEGORIES } from "../../data/questions";
import { Control, Controller, UseFormRegister } from "react-hook-form";

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
        label={`Question ${questionNumber + 1}`}
        placeholder="Put your question here"
        InputProps={{ sx: { borderRadius: 3 } }}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Answer"
        placeholder="Put your answer here"
        InputProps={{ sx: { borderRadius: 3 } }}
      />
      <Autocomplete
        options={[]}
        fullWidth
        freeSolo
        multiple
        renderInput={(params) => (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              sx: { borderRadius: 3 },
            }}
            label="Alt Answers (optional)"
            placeholder="Press enter to add a new answer"
          />
        )}
      />
      <Autocomplete
        options={ALL_CATEGORIES}
        fullWidth
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              sx: { borderRadius: 3 },
            }}
            inputProps={{
              ...params.inputProps,
              maxLength: MAX_CATEGORY_STRING_LENGTH,
            }}
            label="Category"
          />
        )}
      />
      <Button variant="contained" fullWidth color="secondary">
        Save
      </Button>
    </Stack>
  );
};

export default CustomizableText;
