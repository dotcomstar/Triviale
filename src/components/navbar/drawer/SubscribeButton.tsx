import { IconButton } from "@mui/material";
import CardMembershipIcon from "@mui/icons-material/CardMembership";

interface SubscribeButtonProps {
  startEdge?: boolean;
  onClick: () => void;
}

const SubscribeButton = ({ startEdge, onClick }: SubscribeButtonProps) => {
  return (
    <IconButton
      edge={startEdge ? "start" : "end"}
      color="inherit"
      aria-label={"Subscribe button"}
      onClick={onClick}
    >
      <CardMembershipIcon fontSize="large" />
    </IconButton>
  );
};

export default SubscribeButton;
