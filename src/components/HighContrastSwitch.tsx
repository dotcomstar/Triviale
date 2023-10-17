import useHighContrastStore from "../stores/highContrastStore";
import SettingsSwitch from "./SettingsSwitch";

const HighContrastSwitch = () => {
  const { highContrast, toggleHighContrast } = useHighContrastStore();
  // const highContrast = useHighContrastStore((state) => state.highContrast); // Only update when this value is changed.
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
