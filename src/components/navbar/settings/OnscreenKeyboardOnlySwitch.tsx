import {
  ONSCREEN_KEYBOARD_ONLY_DESCRIPTION,
  ONSCREEN_KEYBOARD_ONLY_LABEL,
} from "../../../constants/strings";
import useOnscreenKeyboardOnlyStore from "../../../stores/onscreenKeyboardOnlyStore";
import SettingsSwitch from "./SettingsSwitch";

const OnscreenKeyboardOnlySwitch = () => {
  const { onscreenKeyboardOnly, toggleOnscreenKeyboardOnly } =
    useOnscreenKeyboardOnlyStore();

  return (
    <SettingsSwitch
      label={ONSCREEN_KEYBOARD_ONLY_LABEL}
      caption={ONSCREEN_KEYBOARD_ONLY_DESCRIPTION}
      checked={onscreenKeyboardOnly}
      onChange={toggleOnscreenKeyboardOnly}
    />
  );
};

export default OnscreenKeyboardOnlySwitch;
