import { IconButton } from "@mui/material";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import { SUBSCRIBE_BUTTON_ARIA } from "../../../constants/strings";

interface SubscribeButtonProps {
  startEdge?: boolean;
}

const SubscribeButton = ({ startEdge }: SubscribeButtonProps) => {
  return (
    <IconButton
      edge={startEdge ? "start" : "end"}
      color="inherit"
      aria-label={SUBSCRIBE_BUTTON_ARIA}
      href="https://www.buymeacoffee.com/jetrlee"
    >
      <CardMembershipIcon fontSize="large" />
    </IconButton>
  );
};

export default SubscribeButton;
