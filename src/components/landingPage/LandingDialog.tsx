import {
  DialogProps,
  List,
  ListItem,
  Snackbar,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { ALERT_TIME_MS } from "../../constants/settings";
import {
  GAME_TITLE,
  HARD_MODE_ALERT_MESSAGE,
  HELP_DIALOG_ARIA,
  HELP_TITLE,
} from "../../constants/strings";
import useGameStateStore from "../../stores/gameStateStore";
import useHardModeStore from "../../stores/hardModeStore";
import GameRow from "../grid/GameRow";
import CustomDialog from "../navbar/CustomDialog";
import LandingButton from "./LandingButton";
import Cell from "../grid/Cell";
import useDialogStore from "../../stores/dialogStore";
import zIndex from "@mui/material/styles/zIndex";

// TODO: Remove all instances of "HELP"

export interface LandingDialogProps {
  open: boolean;
  onClose: () => void;
  TransitionComponent: DialogProps["TransitionComponent"];
}

const LandingDialog = ({
  open,
  onClose,
  TransitionComponent,
}: LandingDialogProps) => {
  const handleClose = () => {
    onClose();
  };

  const setHelpOpen = useDialogStore((s) => s.setHelpOpen);
  const { setHardMode, hardMode } = useHardModeStore();
  const matches = useMediaQuery("(min-width:600px)");
  const guesses = useGameStateStore((s) => s.guesses);
  const [invalidToggle, setInvalidToggle] = useState(false);
  const canToggleHardMode = guesses.reduce(
    (acc, question) =>
      acc && question.reduce((qAcc, guess) => qAcc && guess.length === 0, true),
    true
  );
  const theme = useTheme();

  return (
    <CustomDialog
      onClose={handleClose}
      open={open}
      fullScreen
      TransitionComponent={TransitionComponent}
      ariaDescribedBy={HELP_DIALOG_ARIA}
      ariaLabeledBy={HELP_TITLE}
      zIndex={"2"}
    >
      <Snackbar
        open={invalidToggle}
        onClose={() => setInvalidToggle(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={ALERT_TIME_MS}
        message={HARD_MODE_ALERT_MESSAGE}
      />
      <Stack
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        width={"100%"}
        height={"100dvh"}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 10 }}
        >
          <Typography translate="no" variant="h3">
            <Cell
              value={GAME_TITLE.toLocaleUpperCase()[0]}
              status={theme.palette.success}
              nthLetter={1}
              fontSizeOverride="10vw"
              isH3
            />
          </Typography>
          <Typography
            translate="no"
            variant="h3"
            sx={{ fontSize: "12vw" }}
            justifyContent={"center"}
            display={"flex"}
          >
            {GAME_TITLE.slice(1)}
          </Typography>
        </Stack>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          width={"100%"}
          pb={6}
        >
          <Typography>New features:</Typography>
          <List>
            <ListItem>Reimagined Hard Mode</ListItem>
          </List>
        </Stack>

        <Stack
          direction={"row"}
          justifyContent="space-between"
          alignItems="center"
          width={matches ? "70%" : "100%"}
          spacing={"5%"}
          sx={{ mb: 10, mx: 2 }}
        >
          <LandingButton
            color="warning"
            onClick={() => {
              if (canToggleHardMode || !hardMode) {
                setHardMode(false);
                onClose();
              } else {
                setInvalidToggle(true);
              }
            }}
          >
            Play Classic
          </LandingButton>
          <LandingButton
            color="secondary"
            onClick={() => {
              setHelpOpen(true);
            }}
          >
            How to Play
          </LandingButton>{" "}
          <LandingButton
            color="warning"
            onClick={() => {
              if (canToggleHardMode || hardMode) {
                setHardMode(true);
                onClose();
              } else {
                setInvalidToggle(true);
              }
            }}
          >
            Hard Mode
          </LandingButton>
        </Stack>
      </Stack>
    </CustomDialog>
  );
};

export default LandingDialog;
