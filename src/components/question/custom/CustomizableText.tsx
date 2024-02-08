import {
  Autocomplete,
  Button,
  Stack,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  MAX_CATEGORY_STRING_LENGTH,
  MOBILE_SCREEN_CUTOFF,
} from "../../../constants/settings";
import { ALL_CATEGORIES, Question } from "../../../data/questions";
import useGameStateStore from "../../../stores/gameStateStore";
import useCustomQuestionsStore from "../../../stores/customQuestionsStore";
import QuestionInputForm from "./QuestionInputForm";

const CustomizableText = () => {
  const matches = useMediaQuery(`(min-width:${MOBILE_SCREEN_CUTOFF})`);
  const questionNumber = useGameStateStore((s) => s.questionNumber);
  const { setQuestion } = useCustomQuestionsStore();

  const { customQuestions } = useCustomQuestionsStore();
  const { handleSubmit, control, register } = useForm<Question>({
    defaultValues: customQuestions[questionNumber],
  });

  const onSubmit: SubmitHandler<Question> = (data: Question) => {
    setQuestion(data, questionNumber);
    console.log("data: ", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <QuestionInputForm
          name={"question"}
          label={`Question ${questionNumber + 1}*`}
          placeholder="Put your question here"
          control={control}
          register={register}
          minRows={3}
        />
        <QuestionInputForm
          name={"answer"}
          label="Answer*"
          placeholder="Put your answer here"
          control={control}
          register={register}
        />
        <QuestionInputForm
          name={"altAnswer"}
          label="Alt Answers"
          placeholder="Press enter to add a new answer"
          control={control}
          register={register}
          useAutocomplete
          options={[]} // An autocomplete with no options is used to leverage multiple inputs from cards
        />

        <QuestionInputForm
          name={"category"}
          label="Category"
          control={control}
          register={register}
          maxLength={3}
          useAutocomplete
          options={ALL_CATEGORIES}
        />
        <Button variant="contained" fullWidth color="secondary" type="submit">
          Save
        </Button>
      </Stack>
    </form>
  );
};

export default CustomizableText;
