import { OPEN_STATS_TEXT } from "../../constants/strings";
import LandingButton from "./LandingButton";

interface OpenStatsLandingButtonProps {
  onClose: () => void;
  setStatsOpen: (flag: boolean) => void;
}

const OpenStatsLandingButton = ({
  onClose,
  setStatsOpen,
}: OpenStatsLandingButtonProps) => {
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

export default OpenStatsLandingButton;
