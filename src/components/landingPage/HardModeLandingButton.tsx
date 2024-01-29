import { HARD_MODE_LABEL } from "../../constants/strings";
import LandingButton from "./LandingButton";

interface HardModeLandingButtonProps {
  setHardMode: (flag: boolean) => void;
  onClose: () => void;
}

const HardModeLandingButton = ({
  setHardMode,
  onClose,
}: HardModeLandingButtonProps) => {
  return (
    <LandingButton
      color="trivialeBlack"
      onClick={() => {
        setHardMode(true);
        onClose();
      }}
    >
      {HARD_MODE_LABEL}
    </LandingButton>
  );
};

export default HardModeLandingButton;
