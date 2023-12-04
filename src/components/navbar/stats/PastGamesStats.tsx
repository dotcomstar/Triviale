import { Grid, SxProps, Typography } from "@mui/material";
import useStatsStore from "../../../stores/statsStore";
import {
  SUCCESS_RATE_TEXT,
  TOTAL_TRIES_TEXT,
} from "../../../constants/strings";

interface PastGamesStatsProps {
  sx?: SxProps;
}

const PastGamesStats = ({ sx }: PastGamesStatsProps) => {
  const { totalCorrect, totalGuesses } = useStatsStore();
  const sumTotalCorrect = totalCorrect.reduce(
    (acc, numCorrect) => acc + numCorrect,
    0
  );
  const sumTotalGuesses = totalGuesses.reduce(
    (acc, numGuesses) => acc + numGuesses,
    0
  );
  const nonZeroSumTotalGuesses = Math.max(sumTotalGuesses, 1);

  return (
    <Grid container sx={sx}>
      {[
        sumTotalGuesses,
        Math.round((sumTotalCorrect / nonZeroSumTotalGuesses) * 100),
      ].map((s) => (
        <Grid item xs={6}>
          <Typography
            sx={{
              m: 3,
              my: 0,
              fontSize: "30px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {s}
          </Typography>
        </Grid>
      ))}
      {[TOTAL_TRIES_TEXT, SUCCESS_RATE_TEXT].map((s) => (
        <Grid item xs={6}>
          <Typography sx={{ m: 3, my: 0, fontSize: "12px" }} align="center">
            {s}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
};

export default PastGamesStats;
