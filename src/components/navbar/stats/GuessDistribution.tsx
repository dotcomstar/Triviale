import { MAX_CHALLENGES } from "../../../constants/settings";
import { ALL_CATEGORIES } from "../../../data/questions";
import { Box, Stack, SxProps, Typography } from "@mui/material";

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
