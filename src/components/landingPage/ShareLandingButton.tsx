import { OPEN_STATS_TEXT } from "../../constants/strings";
import LandingButton from "./LandingButton";

interface PlayLandingButtonProps {
  onClose: () => void;
  setStatsOpen: (flag: boolean) => void;
}

const PlayLandingButton = ({
  onClose,
  setStatsOpen,
}: PlayLandingButtonProps) => {
  return (
    <LandingButton
      color={"secondary"}
      onClick={() => {
        onClose();
        setStatsOpen(true);
      }}
    >
      {OPEN_STATS_TEXT}
    </LandingButton>
  );
};

export default PlayLandingButton;
