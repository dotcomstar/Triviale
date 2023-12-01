import { Button, Stack } from "@mui/material";
import {
  ADVANCED_STATS_ARIA_LABEL,
  ADVANCED_STATS_LABEL,
} from "../../../constants/strings";

interface AdvancedStatsButtonProps {
  onClick: () => void;
}

const AdvancedStatsButton = ({ onClick }: AdvancedStatsButtonProps) => {
  return (
    <Stack justifyContent={"center"} alignItems={"center"} sx={{ pb: 2 }}>
      <Button
        disableElevation
        sx={{
          width: "70%",
          color: "secondary.main",
        }}
        onClick={onClick}
        aria-label={ADVANCED_STATS_ARIA_LABEL}
      >
        {ADVANCED_STATS_LABEL}
      </Button>
    </Stack>
  );
};

export default AdvancedStatsButton;
