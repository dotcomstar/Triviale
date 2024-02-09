import { Button, Stack, useMediaQuery } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  MAX_CATEGORY_STRING_LENGTH,
  MOBILE_SCREEN_CUTOFF,
} from "../../../constants/settings";
import { ALL_CATEGORIES, Question } from "../../../data/questions";
import useCustomQuestionsStore from "../../../stores/customQuestionsStore";
import useGameStateStore from "../../../stores/gameStateStore";
import QuestionInputForm from "./QuestionInputForm";
import QuestionInputFormMulti from "./QuestionInputFormMulti";

const CustomizableText = () => {
  const matches = useMediaQuery(`(min-width:${MOBILE_SCREEN_CUTOFF})`);
  const questionNumber = useGameStateStore((s) => s.questionNumber);
  const { setQuestion } = useCustomQuestionsStore();

  const { customQuestions } = useCustomQuestionsStore();
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<Question>({
    defaultValues: customQuestions[questionNumber], // These can come from an async function call as well
    criteriaMode: "all", // show all errors at once
    resetOptions: {
      keepDirtyValues: false, // user-interacted input will not be retained
      keepErrors: false, // input errors will not be retained with value update
    },
  });

  const onSubmit: SubmitHandler<Question> = (data: Question) => {
    setQuestion(data, questionNumber);
    console.log("data: ", data, " questionIndex: ", questionNumber);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onChange={(e) => {
        e.persist(); // REFACTOR: hacky solution allows last letter changed to be submitted
      }}
    >
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
          label={`Question ${questionNumber + 1}`}
          placeholder="Put your question here"
          control={control}
          register={register}
          minRows={3}
          multiline
          errors={errors}
          options={[]} // An autocomplete with no options is used to leverage multiple inputs from cards
        />
        <QuestionInputForm
          name={"answer"}
          label="Answer"
          placeholder="Put your answer here"
          control={control}
          register={register}
          onlyLetters
          errors={errors}
          options={[]} // An autocomplete with no options is used to leverage multiple inputs from cards
        />
        <QuestionInputFormMulti
          name={"altAnswer"}
          label="Alt Answers"
          placeholder="Press enter to add a new answer"
          control={control}
          register={register}
          onlyLetters
          errors={errors}
          options={[]} // An autocomplete with no options is used to leverage multiple inputs from cards
        />
        <QuestionInputForm
          name={"category"}
          label="Category"
          control={control}
          register={register}
          maxLength={MAX_CATEGORY_STRING_LENGTH}
          errors={errors}
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
