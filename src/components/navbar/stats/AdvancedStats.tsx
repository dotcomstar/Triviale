import { Grid, SxProps, Typography } from "@mui/material";
import { ALL_CATEGORIES } from "../../../data/questions";
import useStatsStore from "../../../stores/statsStore";

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
      {["Cat.", "Played", "Avg Guess"].map((s) => (
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
                    advancedStats[c].questionsGuessedIn.reduce(
                      (acc, v, i) => acc + v * (i + 1),
                      0
                    ) / Math.max(advancedStats[c].numQuestionsAttempted, 1)
                  ).toFixed(2)
                : 0}
            </Typography>
          </Grid>
        </>
      ))}
    </Grid>
  );
};

export default AdvancedStats;
