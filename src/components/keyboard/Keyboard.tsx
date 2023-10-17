import { Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import Key from "./Key";
// import { DELETE_TEXT, ENTER_TEXT } from '../../constants/strings';
// import { getStatuses } from '../../lib/statuses';
// import { localeAwareUpperCase } from '../../lib/words';

type KeyboardProps = {
  onChar: (value: string) => void;
  onDelete: () => void;
  onEnter: () => void;
  isRevealing?: boolean;
};

const Keyboard = ({
  onChar,
  onDelete,
  onEnter,
  isRevealing,
}: KeyboardProps) => {
  const DELETE_TEXT = "Delete";
  const ENTER_TEXT = "Enter";

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
      paddingX="10px"
      justifyContent="center"
      alignItems="center"
      px={2}
    >
      <Stack direction="row">
        {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            isRevealing={isRevealing}
          />
        ))}
      </Stack>
      <Stack direction="row">
        {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            isRevealing={isRevealing}
          />
        ))}
      </Stack>
      <Stack direction="row">
        <Key width={65.4} value="ENTER" onClick={onClick}>
          {ENTER_TEXT}
        </Key>
        {["Z", "X", "C", "V", "B", "N", "M"].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            isRevealing={isRevealing}
          />
        ))}
        <Key width={65.4} value="DELETE" onClick={onClick}>
          {DELETE_TEXT}
        </Key>
      </Stack>
    </Stack>
  );
};

export default Keyboard;
