import { IconButton } from "@mui/material";
import CardMembershipIcon from "@mui/icons-material/CardMembership";

interface SubscribeButtonProps {
  startEdge?: boolean;
}

const SubscribeButton = ({ startEdge }: SubscribeButtonProps) => {
  return (
    <IconButton
      edge={startEdge ? "start" : "end"}
      color="inherit"
      aria-label={"Subscribe button"}
      onClick={() => console.log("Subscribe")}
    >
      <CardMembershipIcon fontSize="large" />
    </IconButton>
  );
};

export default SubscribeButton;
