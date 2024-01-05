import {
  Button,
  Dialog,
  DialogProps,
  DialogTitle,
  Link,
  List,
  ListItem,
  Snackbar,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CustomDialog from "../navbar/CustomDialog";
import {
  HELP_DIALOG_ARIA,
  HELP_TITLE,
  HELP_HOW_TO_PLAY,
  HELP_NUM_TRIES,
  HELP_NUM_QUESTIONS,
  HELP_HOW_TILE_COLORS_CHANGE,
  ABOUT_AUTHOR_TITLE,
  ABOUT_AUTHOR_URL,
  HARD_MODE_ALERT_MESSAGE,
} from "../../constants/strings";
import SampleGame from "../navbar/help/SampleGame";
import LandingButton from "./LandingButton";
import useGameStateStore from "../../stores/gameStateStore";
import { useState } from "react";
import { ALERT_TIME_MS } from "../../constants/settings";
import useHardModeStore from "../../stores/hardModeStore";

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

  const { enableHardMode } = useHardModeStore();
  const matches = useMediaQuery("(min-width:600px)");
  const guesses = useGameStateStore((s) => s.guesses);
  const [invalidToggle, setInvalidToggle] = useState(false);
  const canToggleHardMode = guesses.reduce(
    (acc, question) =>
      acc && question.reduce((qAcc, guess) => qAcc && guess.length === 0, true),
    true
  );

  return (
    <CustomDialog
      onClose={handleClose}
      open={open}
      fullScreen
      TransitionComponent={TransitionComponent}
      ariaDescribedBy={HELP_DIALOG_ARIA}
      ariaLabeledBy={HELP_TITLE}
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
        <Typography
          translate="no"
          variant="h3"
          sx={{ fontSize: "20vw", pb: 1, mt: 10 }}
          justifyContent={"center"}
          display={"flex"}
        >
          Triviale
        </Typography>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          width={"100%"}
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
          <LandingButton color="warning" onClick={() => onClose()}>
            Play Classic
          </LandingButton>
          <LandingButton
            color="secondary"
            onClick={() => console.log("How to")}
          >
            How to Play
          </LandingButton>{" "}
          <LandingButton
            color="warning"
            onClick={() => {
              if (canToggleHardMode) {
                enableHardMode();
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
