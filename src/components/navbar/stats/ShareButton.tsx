import { ShareOutlined } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import { SHARE_TEXT } from "../../../constants/strings";

interface ShareButtonProps {
  onShare: () => void;
}

const ShareButton = ({ onShare }: ShareButtonProps) => {
  return (
    <Stack justifyContent={"center"} alignItems={"center"} sx={{ p: 2 }}>
      <Button
        variant="contained"
        color="success"
        disableElevation
        sx={{ borderRadius: 10, width: "50%" }}
        endIcon={<ShareOutlined />}
        onClick={onShare}
      >
        {SHARE_TEXT}
      </Button>
    </Stack>
  );
};

export default ShareButton;
