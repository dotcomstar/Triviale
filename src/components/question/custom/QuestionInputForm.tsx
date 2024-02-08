import { useState } from "react";
import { Autocomplete, TextField, TextFieldProps } from "@mui/material";
import { Control, Controller, UseFormRegister, set } from "react-hook-form";
import { Question } from "../../../data/questions";
import useCustomQuestionsStore from "../../../stores/customQuestionsStore";
import useGameStateStore from "../../../stores/gameStateStore";

type QuestionKeyTypes = keyof Question;
type QuestionValueTypes = Question[QuestionKeyTypes];

interface QuestionInputFormProps {
  name: QuestionKeyTypes;
  control: Control<Question, any>;
  register: UseFormRegister<Question>;
  label: string;
  placeholder?: string;
  maxLength?: number;
  minRows?: number;
  options?: readonly string[];
  multiline?: boolean;
  onlyLetters?: boolean;
  multipleAnswers?: boolean;
}

const QuestionInputForm = ({
  name,
  label,
  placeholder,
  control,
  register,
  maxLength,
  minRows,
  options,
  multiline,
  onlyLetters,
  multipleAnswers,
}: QuestionInputFormProps) => {
  const customQuestions = useCustomQuestionsStore((s) => s.customQuestions);
  const questionNumber = useGameStateStore((s) => s.questionNumber);

  if (multipleAnswers) {
  }
  const [value, setValue] = useState<QuestionValueTypes>(
    customQuestions[questionNumber][name]
  );
  const borderRadius = 3;

  return (
    <Controller
      control={control}
      name={name}
      render={() => (
        <Autocomplete
          options={options || []}
          fullWidth
          freeSolo
          multiple={multipleAnswers}
          onInputChange={(_, v) => {
            setValue(multipleAnswers ? [...value, v] : v);
          }}
          onChange={(_, value) => {
            setValue(value || multipleAnswers ? [""] : "");
          }}
          value={value}
          renderInput={(textFieldProps: TextFieldProps) => (
            <TextField
              multiline={multiline}
              minRows={minRows}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                },
              }}
              label={label}
              placeholder={placeholder}
              InputProps={{
                ...textFieldProps.InputProps,
                sx: { borderRadius: borderRadius },
              }}
              inputProps={{
                ...textFieldProps.inputProps,
                maxLength: maxLength,
              }}
              {...textFieldProps}
              type="text"
              {...register(name, {
                setValueAs: () => value,
                pattern: {
                  value: /^[a-zA-Z ]*$/,
                  message: "Please Enter Only Letters",
                },
              })}
            />
          )}
        />
      )}
    />
  );
};

export default QuestionInputForm;
