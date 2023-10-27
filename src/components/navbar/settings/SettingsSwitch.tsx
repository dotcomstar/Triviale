import { FormControl, Stack, Typography } from "@mui/material";
import IOSSwitch from "./IOSSwitch";

interface SettingsSwitchProps {
  label: string;
  caption?: string;
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}

const SettingsSwitch = ({
  label,
  caption,
  checked,
  onChange,
  disabled = false,
}: SettingsSwitchProps) => {
  return (
    <FormControl fullWidth={true}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="column">
          <Typography>{label}</Typography>
          {caption && <Typography variant="caption">{caption}</Typography>}
        </Stack>
        <IOSSwitch checked={checked && !disabled} onChange={onChange} />
      </Stack>
    </FormControl>
  );
};

export default SettingsSwitch;
