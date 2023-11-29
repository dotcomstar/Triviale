import { MAX_CHALLENGES } from "../../../constants/settings";
import { Box, Stack, SxProps, Typography } from "@mui/material";

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
  return (
    <>
      {Array(MAX_CHALLENGES)
        .fill("")
        .map((c, i) => (
          <Stack
            direction={"row"}
            sx={{ pb: 1, ...sx }}
            display={"flex"}
            justifyContent={"space-between"}
          >
            <Stack direction={"row"} justifyContent={"left"}>
              <Box width={"60px"}>
                <Typography sx={{ mx: 2 }}>{i + 1}</Typography>
              </Box>
              <Box
                bgcolor={i === 1 || i === 3 ? "success.main" : "primary.light"}
                width={i === 1 || i === 3 ? "150px" : "100px"}
                justifyContent={"end"}
                display={"flex"}
              >
                <Typography sx={{ mr: 1 }} color={"#FFFFFF"}>
                  {i === 1 || i === 3 ? 3 : 2}
                </Typography>
              </Box>
            </Stack>
          </Stack>
        ))}
    </>
  );
};

export default GuessDistribution;
