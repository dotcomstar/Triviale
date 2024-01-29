import { HELP_HOW_TO_PLAY } from "../../constants/strings";
import LandingButton from "./LandingButton";

interface HowToPlayLandingButtonProps {
  setHelpOpen: (flag: boolean) => void;
}

const HowToPlayLandingButton = ({
  setHelpOpen,
}: HowToPlayLandingButtonProps) => {
  return (
    <LandingButton
      color="trivialeBlack"
      variant="outlined"
      onClick={() => {
        setHelpOpen(true);
      }}
    >
      {HELP_HOW_TO_PLAY}
    </LandingButton>
  );
};

export default HowToPlayLandingButton;
