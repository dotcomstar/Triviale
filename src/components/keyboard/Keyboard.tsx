import BackspaceIcon from "@mui/icons-material/Backspace";
import { Icon, Stack } from "@mui/material";
import { useEffect } from "react";
import { ENTER_TEXT } from "../../constants/strings";
import Key from "./Key";
import useQuestions from "../../hooks/useQuestions";
import useGameStateStore from "../../stores/gameStateStore";
import useCurrGuessStore from "../../stores/currGuessStore";

type KeyboardProps = {
  onChar: (value: string) => void;
  onDelete: () => void;
  onEnter: () => void;
  isRevealing?: boolean;
};

const getKeyWidth = (numKeys: number, multiplier: number) => {
  return `min(((100vw - 16px) - (${
    numKeys - 1
  } * 6px)) / 10 * ${multiplier}, ((500px - 16px) - (${
    numKeys - 1
  } * 6px)) / 10 * ${multiplier})`;
};

export const getStatus = (val: string | undefined) => {
  const { data } = useQuestions();
  const questionNumber = useGameStateStore((s) => s.questionNumber);
  const answer = data[questionNumber].answer;
  const guess = useCurrGuessStore((s) => s.guess);

  if (
    val &&
    answer.toLocaleUpperCase().includes(val) &&
    guess.includes(val) &&
    answer.indexOf(val) === guess.indexOf(val)
  ) {
    return "success";
  }
  return undefined;
};

const Keyboard = ({
  onChar,
  onDelete,
  onEnter,
  isRevealing,
}: KeyboardProps) => {
  const numTopRowKeys = 10;
  const numDefaultRowKeys = 9;
  const topRowKeyWidth = getKeyWidth(numTopRowKeys, 1);
  const defaultKeyWidth = getKeyWidth(numDefaultRowKeys, 1);
  const enterDeleteWidth = getKeyWidth(numDefaultRowKeys, 1.5);

  const onClick = (value: string) => {
    if (value === "ENTER") {
      onEnter();
    } else if (value === "DELETE") {
      onDelete();
    } else {
      onChar(value);
    }
  };

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        onEnter();
      } else if (e.key === "Backspace") {
        onDelete();
      } else {
        const key = e.key.toLocaleUpperCase();
        // TODO: check this test if the range works with non-english letters
        if (key.length === 1 && key >= "A" && key <= "Z") {
          onChar(key);
        }
      }
    };
    window.addEventListener("keyup", listener);
    return () => {
      window.removeEventListener("keyup", listener);
    };
  }, [onEnter, onDelete, onChar]);

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing="8px"
      sx={{ m: "8px" }}
    >
      <Stack direction="row">
        {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((key, i) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            width={topRowKeyWidth}
            isRevealing={isRevealing}
            status={getStatus(key)}
            hasNext={i !== 9}
          />
        ))}
      </Stack>
      <Stack direction="row">
        {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((key, i) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            width={defaultKeyWidth}
            status={getStatus(key)}
            isRevealing={isRevealing}
            hasNext={i !== 8}
          />
        ))}
      </Stack>
      <Stack direction="row">
        <Key
          fontSize={12}
          width={enterDeleteWidth}
          value="ENTER"
          onClick={onClick}
          hasNext
        >
          {ENTER_TEXT}
        </Key>
        {["Z", "X", "C", "V", "B", "N", "M"].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            width={defaultKeyWidth}
            status={getStatus(key)}
            isRevealing={isRevealing}
            hasNext
          />
        ))}
        <Key
          fontSize={12}
          width={enterDeleteWidth}
          value="DELETE"
          onClick={onClick}
        >
          <Icon>
            <BackspaceIcon />
          </Icon>
        </Key>
      </Stack>
    </Stack>
  );
};

export default Keyboard;
