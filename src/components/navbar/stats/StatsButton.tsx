import LeaderboardOutlined from "@mui/icons-material/LeaderboardOutlined";
import { IconButton } from "@mui/material";
import useDialogStore from "../../../stores/dialogStore";
import { STATS_BUTTON_ARIA } from "../../../constants/strings";

const StatsButton = ({ startEdge = false }: { startEdge?: boolean }) => {
  const setStatsOpen = useDialogStore((s) => s.setStatsOpen);

  return (
    <IconButton
      edge={startEdge ? "start" : "end"}
      color="inherit"
      aria-label={STATS_BUTTON_ARIA}
      onClick={() => setStatsOpen(true)}
    >
      <LeaderboardOutlined fontSize="large" />
    </IconButton>
  );
};

export default StatsButton;
