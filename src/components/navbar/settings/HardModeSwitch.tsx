import {
  HARD_MODE_DESCRIPTION,
  HARD_MODE_LABEL,
} from "../../../constants/strings";
import useHardModeStore from "../../../stores/hardModeStore";
import SettingsSwitch from "./SettingsSwitch";

const HardModeSwitch = () => {
  const { hardMode, toggleHardMode } = useHardModeStore();

  return (
    <SettingsSwitch
      label={HARD_MODE_LABEL}
      caption={HARD_MODE_DESCRIPTION}
      checked={hardMode}
      onChange={toggleHardMode}
    />
  );
};

export default HardModeSwitch;
