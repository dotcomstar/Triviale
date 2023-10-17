import useHighContrastStore from "../stores/highContrastStore";
import SettingsSwitch from "./SettingsSwitch";

const HighContrastSwitch = () => {
  const { highContrast, toggleHighContrast } = useHighContrastStore();
  return (
    <SettingsSwitch
      label="High Contrast Mode"
      caption="For improved color vision"
      checked={highContrast}
      onChange={toggleHighContrast}
    />
  );
};

export default HighContrastSwitch;
