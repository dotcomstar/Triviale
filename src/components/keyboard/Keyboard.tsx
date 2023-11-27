import BackspaceIcon from "@mui/icons-material/Backspace";
import { Icon, Stack } from "@mui/material";
import { useEffect } from "react";
import { ENTER_KEY_ID, ENTER_TEXT } from "../../constants/strings";
import Key from "./Key";
import useGameStateStore from "../../stores/gameStateStore";
import useDailyIndex, { getPositiveIndex } from "../../hooks/useDailyIndex";
import useQuestionByID from "../../hooks/useQuestionByID";
import useOnscreenKeyboardOnlyStore from "../../stores/onscreenKeyboardOnlyStore";

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

// TODO: Speed up getting status
const getStatus = (val: string | undefined) => {
  const dailyIndex = useDailyIndex();
  const questionNumber = useGameStateStore((s) => s.questionNumber);
  const guessNumber = useGameStateStore((s) => s.guessNumber);
  const safeIndex = getPositiveIndex(dailyIndex + questionNumber);
  const answerWithSpaces =
    useQuestionByID(safeIndex)?.answer.toLocaleUpperCase()!;
  const answer = answerWithSpaces.replace(/\s+/g, "")!;
  const guesses = useGameStateStore((s) => s.guesses);

  // If the letter has been used thus far in a submitted guess
  if (
    val &&
    guesses[questionNumber].reduce(
      (accumulator, guess, i) =>
        accumulator || (guess.includes(val) && i < guessNumber[questionNumber]),
      false
    )
  ) {
    if (answer?.includes(val)) {
      if (
        guesses[questionNumber].reduce(
          (accumulator, guess, i) =>
            accumulator ||
            (i < guessNumber[questionNumber] &&
              guess.filter((c, i) => c === val && c === answer[i]).length !==
                0),
          false
        )
      ) {
        return "success";
      }
      return "warning";
    } else {
      return "error";
    }
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
  const onscreenKeyboardOnly = useOnscreenKeyboardOnlyStore(
    (s) => s.onscreenKeyboardOnly
  );

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
      if (e.key === "Backspace" && !onscreenKeyboardOnly) {
        document.getElementById(ENTER_KEY_ID)?.focus();
        onDelete();
      } else {
        const key = e.key.toLocaleUpperCase();
        // TODO: check this test if the range works with non-english letters
        if (
          key.length === 1 &&
          key >= "A" &&
          key <= "Z" &&
          !onscreenKeyboardOnly
        ) {
          document.getElementById(ENTER_KEY_ID)?.focus();
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
      <Stack direction="row" spacing={"6px"}>
        {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            width={topRowKeyWidth}
            status={getStatus(key)}
            isRevealing={isRevealing}
          />
        ))}
      </Stack>
      <Stack direction="row" spacing={"6px"}>
        {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            width={defaultKeyWidth}
            status={getStatus(key)}
            isRevealing={isRevealing}
          />
        ))}
      </Stack>
      <Stack direction="row" spacing="6px">
        <Key
          fontSize={12}
          width={enterDeleteWidth}
          value="ENTER"
          onClick={onClick}
          id={ENTER_KEY_ID}
          autoFocus
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
