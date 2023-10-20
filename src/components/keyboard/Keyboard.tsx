import BackspaceIcon from "@mui/icons-material/Backspace";
import { Icon, Stack } from "@mui/material";
import { useEffect } from "react";
import Key from "./Key";
// import { DELETE_TEXT, ENTER_TEXT } from '../../constants/strings';
// import { getStatuses } from '../../lib/statuses';

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
  const ENTER_TEXT = "Enter";

  // TODO: Refactor into variables
  const topRowWidth =
    "min(((100vw - 16px) - (9 * 6px)) / 10, ((500px - 16px) - (9 * 6px)) / 10)";
  const defaultRowWidth =
    "min(((100vw - 16px) - (8 * 6px)) / 10, ((500px - 16px) - (8 * 6px)) / 10)";
  const enterDeleteWidth =
    "min(((100vw - 16px) - (8 * 6px)) / 10 * 1.5, ((500px - 16px) - (8 * 6px)) / 10 * 1.5)";

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
      sx={{ mx: "8px" }}
    >
      <Stack direction="row">
        {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            width={topRowWidth}
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
            width={defaultRowWidth}
            isRevealing={isRevealing}
          />
        ))}
      </Stack>
      <Stack direction="row">
        <Key
          fontSize={12}
          width={enterDeleteWidth}
          value="ENTER"
          onClick={onClick}
        >
          {ENTER_TEXT}
        </Key>
        {["Z", "X", "C", "V", "B", "N", "M"].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            width={defaultRowWidth}
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
