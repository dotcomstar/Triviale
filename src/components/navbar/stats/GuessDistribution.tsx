import { Box, Stack, SxProps, Typography, useMediaQuery } from "@mui/material";
import { MAX_CHALLENGES } from "../../../constants/settings";
import useStatsStore from "../../../stores/statsStore";

// We want to store total # questions correct, total # questions attempted,
//      # questions in category correct, # questions in category attempted
// Eg. Get from localStorage or account:
//     {Guessed in 1: 2, Guessed in 2: 10, Guessed in 3: 40,
//      Guessed in 4: 26, Guessed in 5: 16}
//      {Today's guesses: (Q1, HIS = 4), (Q2, POP = 3), (Q3, SCI = 2)}
// Then add today's guesses to total # of questions guessed in that many attempts
// And also keep track of a similar running total for each category.
// We only show the sum of all categories by default because it looks cleaner.
// But, we will allow users to see graphs for each category,
// along with an average guess length for that category, under 'Advanced Stats'

interface GuessDistributionProps {
  sx: SxProps;
}

const GuessDistribution = ({ sx }: GuessDistributionProps) => {
  const { questionsGuessedIn, changedToday } = useStatsStore();
  const maxCorrectGuess = questionsGuessedIn.reduce(
    (acc, numCorrect) => Math.max(acc, numCorrect),
    1
  );
  const matches = useMediaQuery("(min-width:400px)");
  const baseLength = matches ? 7 : 15;

  return (
    <Stack sx={{ ...sx }}>
      {Array(MAX_CHALLENGES)
        .fill("")
        .map((_, i) => (
          <Stack
            direction={"row"}
            sx={{ pb: 1 }}
            display={"flex"}
            justifyContent={"space-between"}
          >
            <Stack
              direction={"row"}
              justifyContent={"left"}
              sx={{ width: "100%" }}
            >
              <Box width={"60px"}>
                <Typography sx={{ mx: 2 }}>{i + 1}</Typography>
              </Box>
              <Box
                boxSizing={"border-box"}
                bgcolor={changedToday[i] ? "success.main" : "primary.light"}
                // A width between 10% and 70% looks good.
                width={`${
                  baseLength +
                  (questionsGuessedIn[i] / maxCorrectGuess) * (70 - baseLength)
                }%`}
                justifyContent={"end"}
                display={"flex"}
              >
                <Typography sx={{ mr: 1.5 }} color={"#FFFFFF"}>
                  {questionsGuessedIn[i]}
                </Typography>
              </Box>
            </Stack>
          </Stack>
        ))}
    </Stack>
  );
};

export default GuessDistribution;
