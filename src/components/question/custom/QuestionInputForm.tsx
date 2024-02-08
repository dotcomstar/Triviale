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
  const [inputValue, setInputValue] = useState<string>("");
  const borderRadius = 3;

  return (
    <Controller
      control={control}
      name={name}
      render={() => (
        <Autocomplete
          options={options || ([] as readonly string[])}
          getOptionLabel={(option) => {
            if (option instanceof Array) {
              return option[0];
            } else {
              return option;
            }
          }}
          fullWidth
          freeSolo
          multiple={multipleAnswers}
          onInputChange={(_, v) => {
            setInputValue(v);
          }}
          onChange={(_e, _v, reason) => {
            if (value instanceof Array) {
              if (reason === "clear") {
                setValue([]);
              } else if (reason === "createOption") {
                setValue([...value, inputValue]);
              } else if (reason === "removeOption") {
                console.log(_v);
                if (_v && _v instanceof Array) {
                  setValue(value.filter((v) => _v.includes(v)));
                }
              }
            } else {
              setValue(inputValue);
            }
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
