import { Grid, SxProps, Typography } from "@mui/material";
import { ALL_CATEGORIES } from "../../../data/questions";
import useStatsStore from "../../../stores/statsStore";
import {
  ADV_STATS_AVG_GUESS_TEXT,
  ADV_STATS_CATEGORY_TEXT,
  ADV_STATS_TOTAL_TRIES_TEXT,
} from "../../../constants/strings";

interface TypographyProps {
  align: "left" | "right" | "center" | "inherit" | "justify" | undefined;
  sx: SxProps;
}

const AdvancedStats = () => {
  const { advancedStats } = useStatsStore();
  const TypProps: TypographyProps = {
    align: "center",
    sx: {
      m: 3,
      mx: 0,
      mt: 0,
      fontSize: "20px",
      textAlign: "center",
    },
  };

  return (
    <Grid container alignItems={"center"}>
      {[
        ADV_STATS_CATEGORY_TEXT,
        ADV_STATS_TOTAL_TRIES_TEXT,
        ADV_STATS_AVG_GUESS_TEXT,
      ].map((s) => (
        <Grid item xs={4}>
          <Typography {...TypProps}>{s}</Typography>
        </Grid>
      ))}
      {ALL_CATEGORIES.map((c) => (
        <>
          <Grid item xs={4}>
            <Typography {...TypProps}>{c}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography {...TypProps}>
              {advancedStats ? advancedStats[c].numQuestionsAttempted : 0}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography {...TypProps}>
              {advancedStats
                ? +(
                    // Get average of user guesses in one category. Calculate weighted values and divide by number of correct guesses. Don't include incorrect attempts in this
                    (
                      advancedStats[c].questionsGuessedIn.reduce(
                        (acc, v, i) => acc + v * (i + 1),
                        0
                      ) /
                      Math.max(
                        advancedStats[c].questionsGuessedIn.reduce(
                          (acc, v) => acc + v,
                          0
                        ),
                        1
                      )
                    ).toFixed(2)
                  ) // Round to 2 decimal places.
                : 0}
            </Typography>
          </Grid>
        </>
      ))}
    </Grid>
  );
};

export default AdvancedStats;
