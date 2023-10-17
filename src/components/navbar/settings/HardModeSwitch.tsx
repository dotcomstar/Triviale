import useHardModeStore from "../../../stores/hardModeStore";
import SettingsSwitch from "./SettingsSwitch";

const HardModeSwitch = () => {
  const { hardMode, toggleHardMode } = useHardModeStore();

  return (
    <SettingsSwitch
      label="Hard Mode"
      caption="Only one answer per question"
      checked={hardMode}
      onChange={toggleHardMode}
    />
  );
};

export default HardModeSwitch;
