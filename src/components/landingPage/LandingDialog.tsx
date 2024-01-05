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
  const theme = useTheme();

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
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ pb: 1, mt: 10 }}
        >
          <Typography translate="no" sx={{ fontSize: "2rem" }}>
            <GameRow
              guess={[GAME_TITLE.toLocaleUpperCase()[0]]}
              statuses={[theme.palette.success]}
              answerOverride={GAME_TITLE[0]}
            />
          </Typography>
          <Typography
            translate="no"
            variant="h3"
            sx={{ fontSize: "20vw" }}
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
