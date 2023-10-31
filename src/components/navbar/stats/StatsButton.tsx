import { LeaderboardOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import useDialogStore from "../../../stores/dialogStore";

const StatsButton = () => {
  const setStatsOpen = useDialogStore((s) => s.setStatsOpen);

  return (
    <IconButton
      edge="start"
      color="inherit"
      aria-label="help"
      onClick={() => setStatsOpen(true)}
    >
      <LeaderboardOutlined fontSize="large" />
    </IconButton>
  );
};

export default StatsButton;
