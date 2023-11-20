import { Box, DialogProps, Snackbar, Stack, Typography } from "@mui/material";
import copy from "copy-to-clipboard";
import { useState } from "react";
import { ALERT_TIME_MS, QUESTIONS_PER_DAY } from "../../../constants/settings";
import {
  GAME_COPIED_MESSAGE,
  GAME_TITLE,
  GUESS_DISTRIBUTION_TEXT,
  IN_TEXT,
  SHARE_LINK,
  SHARE_POINTS,
  SKIP_LETTER,
  STATISTICS_TITLE,
  STATS_DIALOG_ARIA,
} from "../../../constants/strings";
import { ALL_CATEGORIES } from "../../../data/questions";
import useDailyIndex, { getPositiveIndex } from "../../../hooks/useDailyIndex";
import useQuestionByID from "../../../hooks/useQuestionByID";
import useGameStateStore from "../../../stores/gameStateStore";
import useHardModeStore from "../../../stores/hardModeStore";
import CustomDialog from "../CustomDialog";
import ShareButton from "./ShareButton";

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
    return [q?.category!, q?.answer.toLocaleUpperCase()!.replace(/\s+/g, "")];
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

  const shareButton = document.getElementById("StatsDialogID");
  shareButton?.addEventListener("click", (_) => {
    if (navigator.share) {
      navigator
        .share({
          title: `${GAME_TITLE} ${solutionIndex} ${questionState.reduce(
            (acc, guess) => acc + (guess === "won" ? 1 : 0),
            0
          )}/${QUESTIONS_PER_DAY}`,
          text: textToShare,
          // url: "https://trivialle.vercel.app/",
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      handleShare();
    }
  });

  return (
    <CustomDialog
      onClose={handleClose}
      open={open}
      TransitionComponent={TransitionComponent}
      ariaDescribedBy={STATS_DIALOG_ARIA}
      ariaLabeledBy={STATISTICS_TITLE}
      dialogTitle={STATISTICS_TITLE}
      id={"StatsDialogID"}
    >
      <Typography
        sx={{ m: 3, my: 0, mb: 1, fontSize: "20px", fontWeight: "bold" }}
      >
        {GUESS_DISTRIBUTION_TEXT}
      </Typography>
      {ALL_CATEGORIES.map((c) => (
        <Stack
          direction={"row"}
          sx={{ pb: 1 }}
          display={"flex"}
          justifyContent={"space-between"}
        >
          <Stack direction={"row"} justifyContent={"left"}>
            <Box width={"60px"}>
              <Typography sx={{ mx: 2 }}>{c}</Typography>
            </Box>
            <Box
              bgcolor={"success.main"}
              width={c === "HIS" || c === "GEO" ? "100px" : "150px"}
              justifyContent={"end"}
              display={"flex"}
            >
              <Typography sx={{ mr: 1 }} color={"#FFFFFF"}>
                {c === "HIS" || c === "GEO" ? 2 : 3}
              </Typography>
            </Box>
          </Stack>
          <Typography sx={{ mr: 1 }}>3.4</Typography>
        </Stack>
      ))}

      <ShareButton onShare={() => null} />
      <Snackbar // Alert message when stats are copied
        open={showCopied}
        onClose={() => setShowCopied(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={ALERT_TIME_MS}
        message={GAME_COPIED_MESSAGE}
      />
    </CustomDialog>
  );
};

export default StatsDialog;
