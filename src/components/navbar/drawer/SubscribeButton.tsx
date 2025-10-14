import { Box } from "@mui/material";
import CardMembershipIcon from "@mui/icons-material/CardMembership";

interface SubscribeButtonProps {
  startEdge?: boolean;
}

const SubscribeButton = ({ startEdge }: SubscribeButtonProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: startEdge ? "12px 12px 12px 0" : "12px 0 12px 12px",
        color: "inherit",
      }}
    >
      <CardMembershipIcon fontSize="large" />
    </Box>
  );
};

export default SubscribeButton;
