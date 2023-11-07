import { ShareOutlined } from "@mui/icons-material";
import {
  Button,
  DialogProps,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import copy from "copy-to-clipboard";
import { useState } from "react";
import {
  GAME_COPIED_MESSAGE,
  GAME_TITLE,
  GUESS_DISTRIBUTION_TEXT,
  IN_TEXT,
  PLACEHOLDER_TEXT,
  SHARE_LINK,
  SHARE_POINTS,
  SHARE_TEXT,
  SKIP_LETTER,
  STATISTICS_TITLE,
  STATS_DIALOG_ARIA,
} from "../../../constants/strings";
import useQuestionByID from "../../../hooks/useQuestionByID";
import useGameStateStore from "../../../stores/gameStateStore";
import useHardModeStore from "../../../stores/hardModeStore";
import CustomDialog from "../CustomDialog";
import useDailyIndex, { getPositiveIndex } from "../../../hooks/useDailyIndex";
import { ALERT_TIME_MS } from "../../../constants/settings";

export interface StatsDialogProps {
  open: boolean;
  onClose: () => void;
  TransitionComponent: DialogProps["TransitionComponent"];
}

const StatsDialog = ({
  open,
  onClose,
  TransitionComponent,
}: StatsDialogProps) => {
  const isHardMode = useHardModeStore((s) => s.hardMode);
  const guesses = useGameStateStore((s) => s.guesses);
  const dailyIndex = useDailyIndex();
  const date = new Date().toLocaleDateString();
  const questionState = useGameStateStore((s) => s.questionState);
  const solutionIndex = date;
  const questionDetails = (id: number) => {
    const safeIndex = getPositiveIndex(dailyIndex + id);
    const q = useQuestionByID(safeIndex);
    return [q?.category!, q?.answer.toLocaleUpperCase()!];
  };

  let points = questionState.reduce(
    (acc, val) => acc + (val === "won" ? 5 : 0),
    0
  );

  const textToShare = `${GAME_TITLE} ${solutionIndex} ${
    isHardMode ? "*" : ""
  }\n${guesses
    .map((question, i) => {
      let prevCorrect = false;
      let q = questionDetails(i);
      let numSkipped = 0;
      let countedSkipped = false;
      return (
        question
          .map((g) => {
            if (g.join("") === q[1] || prevCorrect) {
              prevCorrect = true;
              if (!countedSkipped) {
                countedSkipped = true;
                points += numSkipped * 0.5;
              }
              points += 1;
              return "✅";
            } else if (g.includes(SKIP_LETTER)) {
              numSkipped += 1;
              return "⏭️";
            } else {
              return "❌";
            }
          })
          .join("") +
        ` ${IN_TEXT} ` +
        q[0] +
        " \n"
      );
    })
    .join("")}${SHARE_POINTS(points)}\n${SHARE_LINK}`;
  const [showCopied, setShowCopied] = useState(false);

  const handleClose = () => {
    onClose();
  };
  const handleShare = () => {
    setShowCopied(true);
    copy(textToShare, {
      debug: true,
    });
  };

  return (
    <CustomDialog
      onClose={handleClose}
      open={open}
      TransitionComponent={TransitionComponent}
      ariaDescribedBy={STATS_DIALOG_ARIA}
      ariaLabeledBy={STATISTICS_TITLE}
      dialogTitle={STATISTICS_TITLE}
    >
      <Snackbar
        open={showCopied}
        onClose={() => setShowCopied(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={ALERT_TIME_MS}
        message={GAME_COPIED_MESSAGE}
      />
      <Typography sx={{ m: 3, my: 0, fontSize: "20px" }}>
        {GUESS_DISTRIBUTION_TEXT}
      </Typography>
      <Typography sx={{ m: 3, my: 0, fontSize: "20px" }} fontStyle={"italic"}>
        {PLACEHOLDER_TEXT}
      </Typography>
      <Stack justifyContent={"center"} alignItems={"center"} sx={{ p: 2 }}>
        <Button
          variant="contained"
          color="success"
          disableElevation
          sx={{ borderRadius: 10, width: "50%" }}
          endIcon={<ShareOutlined />}
          onClick={handleShare}
        >
          {SHARE_TEXT}
        </Button>
      </Stack>
    </CustomDialog>
  );
};

export default StatsDialog;
