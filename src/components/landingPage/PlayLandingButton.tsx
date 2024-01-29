import LandingButton from "./LandingButton";
import {
  PLAY_CLASSIC_MODE_LABEL,
  RESUME_PLAY_LABEL,
} from "../../constants/strings";

interface PlayLandingButtonProps {
  hasNotStartedPlaying: boolean;
  onClose: () => void;
}

const PlayLandingButton = ({
  hasNotStartedPlaying,
  onClose,
}: PlayLandingButtonProps) => {
  return (
    <LandingButton
      color={hasNotStartedPlaying ? "success" : "warning"}
      onClick={() => {
        onClose();
      }}
    >
      {hasNotStartedPlaying ? PLAY_CLASSIC_MODE_LABEL : RESUME_PLAY_LABEL}
    </LandingButton>
  );
};

export default PlayLandingButton;
