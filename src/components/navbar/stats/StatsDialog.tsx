import { ShareOutlined } from "@mui/icons-material";
import {
  Button,
  DialogProps,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import copy from "copy-to-clipboard";
import {
  GAME_TITLE,
  GUESS_DISTRIBUTION_TEXT,
  HELP_DIALOG_ARIA,
  SHARE_TEXT,
  STATISTICS_TITLE,
} from "../../../constants/strings";
import CustomDialog from "../CustomDialog";
import { useState } from "react";
import useHardModeStore from "../../../stores/hardModeStore";
import { useTheme } from "@mui/material";
import useHighContrastStore from "../../../stores/highContrastStore";
import useGameStateStore from "../../../stores/gameStateStore";
import useQuestionByID from "../../../hooks/useQuestionByID";

export interface HelpDialogProps {
  open: boolean;
  onClose: () => void;
  TransitionComponent: DialogProps["TransitionComponent"];
}

const HelpDialog = ({
  open,
  onClose,
  TransitionComponent,
}: HelpDialogProps) => {
  const isHardMode = useHardModeStore((s) => s.hardMode);
  const questionDetails = (id: number) => {
    const q = useQuestionByID(id);
    return [q?.category!, q?.answer.toLocaleUpperCase()!];
  };
  const guesses = useGameStateStore((s) => s.guesses);
  const date = new Date().toLocaleDateString();
  const questionState = useGameStateStore((s) => s.questionState);
  const solutionIndex = date;
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
      return (
        question.map((g) => {
          if (g.join("") === q[1] || prevCorrect) {
            prevCorrect = true;
            points += 1;
            return "✅";
          } else {
            return "❌";
          }
        }) +
        " in " +
        q[0] +
        " \n"
      );
    })
    .join(
      ""
    )}I got ${points} points in Triviale!\nSee how you compare: Trivialle.vercel.app`;
  const [showCopied, setShowCopied] = useState(false);

  const handleClose = () => {
    onClose();
  };
  const handleShare = () => {
    copy(textToShare, {
      debug: true,
    });
  };

  return (
    <CustomDialog
      onClose={handleClose}
      open={open}
      TransitionComponent={TransitionComponent}
      ariaDescribedBy={HELP_DIALOG_ARIA}
    >
      <DialogTitle sx={{ fontWeight: "bold", fontSize: "28px", pb: 0 }}>
        {STATISTICS_TITLE}
      </DialogTitle>
      <Typography sx={{ m: 3, my: 0, fontSize: "20px" }}>
        {GUESS_DISTRIBUTION_TEXT}
        {": TODO"}
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

export default HelpDialog;
