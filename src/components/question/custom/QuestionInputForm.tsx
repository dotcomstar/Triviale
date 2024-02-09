import { useState } from "react";
import {
  Autocomplete,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { Question } from "../../../data/questions";
import useCustomQuestionsStore from "../../../stores/customQuestionsStore";
import useGameStateStore from "../../../stores/gameStateStore";
import { ErrorMessage } from "@hookform/error-message";

type QuestionKeyTypes = keyof Question;

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
  errors?: FieldErrors<Question>;
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
  errors,
}: //   onlyLetters,
QuestionInputFormProps) => {
  const customQuestions = useCustomQuestionsStore((s) => s.customQuestions);
  const questionNumber = useGameStateStore((s) => s.questionNumber);
  const defaultValue = customQuestions[questionNumber][name];

  const [value, setValue] = useState(defaultValue as string);
  const borderRadius = 3;

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={() => (
          <Autocomplete
            freeSolo // Allows any string as input
            fullWidth
            autoSelect={true}
            autoHighlight={true}
            options={options || ([] as readonly string[])}
            isOptionEqualToValue={(option, value) => option === value}
            getOptionLabel={(option) => {
              return option;
            }}
            onInputChange={(_, v) => {
              setValue(v);
            }}
            onChange={(_, v) => {
              setValue(v || "");
            }}
            value={value}
            renderInput={(textFieldProps: TextFieldProps) => (
              <TextField
                {...textFieldProps}
                fullWidth
                label={label + "*"}
                placeholder={placeholder}
                multiline={multiline}
                minRows={minRows}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                  },
                }}
                InputProps={{
                  ...textFieldProps.InputProps,
                  sx: { borderRadius: borderRadius },
                }}
                inputProps={{
                  ...textFieldProps.inputProps,
                  maxLength: maxLength,
                }}
                {...register(name, {
                  setValueAs: () => value,
                  required: { value: true, message: `${label} is required` },
                  pattern: {
                    value: /^[a-zA-Z ]*$/,
                    message: "Only enter letters (A-Z)",
                  },
                })}
              />
            )}
          />
        )}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <Typography color={"info.main"}>{`Error: ${message}`}</Typography>
        )}
      />
    </>
  );
};

export default QuestionInputForm;
