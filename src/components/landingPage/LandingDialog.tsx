import {
  Box,
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
  HARD_MODE_LABEL,
  HELP_HOW_TO_PLAY,
  LANDING_DIALOG_ARIA,
  LANDING_TITLE,
  NEW_FEATURES_LABEL,
  NEW_FEATURES_LIST,
  PLAY_CLASSIC_MODE_LABEL,
} from "../../constants/strings";
import useDialogStore from "../../stores/dialogStore";
import useGameStateStore from "../../stores/gameStateStore";
import useHardModeStore from "../../stores/hardModeStore";
import Cell from "../grid/Cell";
import CustomDialog from "../navbar/CustomDialog";
import LandingButton from "./LandingButton";

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
      ariaDescribedBy={LANDING_DIALOG_ARIA}
      ariaLabeledBy={LANDING_TITLE}
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
          sx={{ mt: matches ? 10 : 4 }}
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
          pb={3}
          pt={4}
        >
          <Typography>{NEW_FEATURES_LABEL}</Typography>
          <List sx={{ listStyleType: "disc" }}>
            {NEW_FEATURES_LIST.map((v) => (
              <ListItem sx={{ display: "list-item" }}>{v}</ListItem>
            ))}
          </List>
        </Stack>

        <Stack
          direction={matches ? "row" : "column"}
          justifyContent="space-between"
          alignItems="center"
          width={matches ? "70%" : "100%"}
          spacing={"5%"}
          sx={{ mb: 10, mx: 2 }}
        >
          <LandingButton
            color="success"
            onClick={() => {
              if (canToggleHardMode || !hardMode) {
                setHardMode(false);
                onClose();
              } else {
                setInvalidToggle(true);
              }
            }}
          >
            {PLAY_CLASSIC_MODE_LABEL}
          </LandingButton>
          <Box
            sx={{
              width: "calc(5%)",
              borderBottom: 2,
              borderColor: "primary.darker",
            }}
          />
          <LandingButton
            color="secondary"
            onClick={() => {
              setHelpOpen(true);
            }}
          >
            {HELP_HOW_TO_PLAY}
          </LandingButton>
          <Box
            sx={{
              width: "calc(5%)",
              borderBottom: 2,
              borderColor: "primary.darker",
            }}
          />
          <LandingButton
            color="success"
            onClick={() => {
              if (canToggleHardMode || hardMode) {
                setHardMode(true);
                onClose();
              } else {
                setInvalidToggle(true);
              }
            }}
          >
            {HARD_MODE_LABEL}
          </LandingButton>
        </Stack>
      </Stack>
    </CustomDialog>
  );
};

export default LandingDialog;
