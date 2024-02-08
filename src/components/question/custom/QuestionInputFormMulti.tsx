import { Autocomplete, TextField, TextFieldProps } from "@mui/material";
import { Control, Controller, UseFormRegister } from "react-hook-form";
import { Question } from "../../../data/questions";
import useCustomQuestionsStore from "../../../stores/customQuestionsStore";
import useGameStateStore from "../../../stores/gameStateStore";
import { useState } from "react";

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
}

const QuestionInputForm = ({
  name,
  label,
  placeholder,
  control,
  register,
  //   maxLength,
  minRows,
  options,
  multiline,
}: //   onlyLetters,
QuestionInputFormProps) => {
  const customQuestions = useCustomQuestionsStore((s) => s.customQuestions);
  const questionNumber = useGameStateStore((s) => s.questionNumber);
  const defaultValue = customQuestions[questionNumber][name];

  const [value, setValue] = useState(defaultValue as string[]);
  const borderRadius = 3;

  return (
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
            return option;
          }}
          onChange={(_e, v) => {
            setValue(v);
          }}
          value={value || []}
          renderInput={(textFieldProps: TextFieldProps) => (
            <TextField
              {...textFieldProps}
              fullWidth
              label={label}
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
              //   inputProps={{
              //     ...textFieldProps.inputProps,
              //     maxLength: maxLength,
              //   }}
              {...register(name, {
                setValueAs: () => value,
                // pattern: {
                //   value: /^[a-zA-Z ]*$/,
                //   message: "Please Enter Only Letters",
                // },
              })}
            />
          )}
        />
      )}
    />
  );
};

export default QuestionInputForm;
