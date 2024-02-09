import { DialogProps, Snackbar, Typography } from "@mui/material";
import copy from "copy-to-clipboard";
import { useState } from "react";
import { ALERT_TIME_MS } from "../../../constants/settings";
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
import useDailyIndex, {
  getPositiveIndex,
  oneDay,
} from "../../../hooks/useDailyIndex";
import useQuestionByID from "../../../hooks/useQuestionByID";
import useGameStateStore from "../../../stores/gameStateStore";
import useHardModeStore from "../../../stores/hardModeStore";
import CustomDialog from "../CustomDialog";
import AdvancedStats from "./AdvancedStats";
import AdvancedStatsButton from "./AdvancedStatsButton";
import GuessDistribution from "./GuessDistribution";
import PastGamesStats from "./PastGamesStats";
import ShareButton from "./ShareButton";
import useRetrievedStore from "../../../stores/retrievedStore";

export interface StatsDialogProps {
  open: boolean;
  onClose: () => void;
  TransitionComponent: DialogProps["TransitionComponent"];
}

declare const window: any;

const StatsDialog = ({
  open,
  onClose,
  TransitionComponent,
}: StatsDialogProps) => {
  const isHardMode = useHardModeStore((s) => s.hardMode);
  const guesses = useGameStateStore((s) => s.guesses);
  const dailyIndex = useDailyIndex();
  const date = new Date(new Date().getTime() + oneDay).toLocaleDateString(); // Temp offset so new questions come the second day and not the first
  const questionState = useGameStateStore((s) => s.questionState);
  const solutionIndex = date;
  const retrieved = useRetrievedStore((s) => s.retrieved);
  const offset = retrieved ? 0 : dailyIndex;
  const questionDetails = (id: number) => {
    const safeIndex = getPositiveIndex(id + offset);
    const q = useQuestionByID(safeIndex);
    // Calculate all permutations with addOns and answers.
    const answerWithSpaces = q?.answer.toLocaleUpperCase()!;
    const answer = answerWithSpaces.replace(/\s+/g, "")!;
    const permutationsWithAddons =
      [[], ...(q?.addOns || []), []].flatMap(
        (d) => q?.addOns?.map((v) => d + answer + v) || []
      ) || [];
    // An array of all accepted answers in  uppercase with no spaces
    const allAcceptableAnswers = [
      q?.answer,
      ...(q?.altAnswer || []),
      ...(permutationsWithAddons || []),
    ].map((v) => v?.toLocaleUpperCase().replace(/\s+/g, ""));
    return [q?.category!, answer, allAcceptableAnswers];
  };

  const [advancedStatsOpen, setAdvancedStatsOpen] = useState(false);

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
            if (
              g.join("") === q[1] ||
              prevCorrect ||
              (isHardMode && q[2].includes(g.join("")))
            ) {
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

  const handleCopy = () => {
    setShowCopied(true);
    copy(textToShare, {
      debug: true,
    });
  };

  const handleShare = () => {
    let userAgent = window.navigator.userAgent.toLowerCase(),
      macosPlatforms = /(macintosh|macintel|macppc|mac68k|macos)/i,
      windowsPlatforms = /(win32|win64|windows|wince)/i,
      iosPlatforms = /(iphone|ipad|ipod)/i,
      os = null;

    if (macosPlatforms.test(userAgent)) {
      os = "macos";
    } else if (iosPlatforms.test(userAgent)) {
      os = "ios";
    } else if (windowsPlatforms.test(userAgent)) {
      os = "windows";
    } else if (/android/.test(userAgent)) {
      os = "android";
    } else if (!os && /linux/.test(userAgent)) {
      os = "linux";
    }

    if (navigator.share && os !== "windows") {
      // The browser has a native share button.
      navigator
        .share({
          text: textToShare,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => {
          console.log("Error sharing", error);
        });
    } else {
      // The browser does not have a native share button.
      handleCopy();
    }
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
      <PastGamesStats sx={{ mb: 1 }} />
      <Typography
        sx={{ m: 3, my: 0, mb: 1, fontSize: "20px", fontWeight: "bold" }}
      >
        {GUESS_DISTRIBUTION_TEXT}
      </Typography>
      <GuessDistribution sx={{ m: 3, my: 0, fontSize: "20px" }} />
      <ShareButton onShare={handleShare} />
      <AdvancedStatsButton
        onClick={() => setAdvancedStatsOpen(!advancedStatsOpen)}
      />
      {advancedStatsOpen && <AdvancedStats />}
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
