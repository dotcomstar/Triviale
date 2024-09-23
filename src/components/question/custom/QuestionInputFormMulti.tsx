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
import { useState } from "react";
import { ErrorMessage } from "@hookform/error-message";

type QuestionKeyTypes = keyof Question;

interface QuestionInputFormProps {
  name: QuestionKeyTypes;
  control: Control<Question, unknown>;
  register: UseFormRegister<Question>;
  label: string;
  placeholder?: string;
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
  minRows,
  options,
  multiline,
  errors,
  onlyLetters,
}: QuestionInputFormProps) => {
  const customQuestions = useCustomQuestionsStore((s) => s.customQuestions);
  const questionNumber = useGameStateStore((s) => s.questionNumber);
  const defaultValue = customQuestions[questionNumber][name];

  const [value, setValue] = useState(defaultValue as string[]);
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
            multiple
            options={options || ([] as readonly string[])}
            isOptionEqualToValue={(option, value) => option === value}
            getOptionLabel={(option) => {
              return option[0];
            }}
            onChange={(_, v) => {
              setValue(v);
            }}
            value={value || []}
            renderInput={(textFieldProps: TextFieldProps) => (
              <TextField
                {...textFieldProps}
                fullWidth
                label={label}
                aria-invalid={errors && errors[name] ? true : false}
                error={errors && errors[name] ? true : false}
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
                {...register(name, {
                  setValueAs: () => value,
                  pattern: onlyLetters
                    ? {
                        value: /^[a-zA-Z ]*$/g,
                        message: "Only letters A-z accepted",
                      }
                    : undefined,
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
