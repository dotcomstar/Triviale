import {
  HIGH_CONTRAST_MODE_DESCRIPTION,
  HIGH_CONTRAST_MODE_LABEL,
} from "../../../constants/strings";
import useHighContrastStore from "../../../stores/highContrastStore";
import SettingsSwitch from "./SettingsSwitch";

const HighContrastSwitch = () => {
  const { highContrast, toggleHighContrast } = useHighContrastStore();
  return (
    <SettingsSwitch
      label={HIGH_CONTRAST_MODE_LABEL}
      caption={HIGH_CONTRAST_MODE_DESCRIPTION}
      checked={highContrast}
      onChange={toggleHighContrast}
    />
  );
};

export default HighContrastSwitch;
