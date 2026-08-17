import { IconButton, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import useEditingStore from "../../stores/editingStore";
import {
  EDIT_BUTTON_ARIA,
  EDIT_BUTTON_TEXT,
  RETURN_FROM_EDIT_BUTTON_ARIA,
  RETURN_FROM_EDIT_BUTTON_TEXT,
} from "../../constants/strings";
import PublishIcon from "@mui/icons-material/Publish";

const EditingButton = ({ size = "large" }: { size?: "small" | "large" }) => {
  const { editing, setEditing } = useEditingStore();

  return (
    <Stack direction={"row"} alignItems={"center"} spacing={0.5}>
      <IconButton
        edge="end"
        color="inherit"
        aria-label={editing ? RETURN_FROM_EDIT_BUTTON_ARIA : EDIT_BUTTON_ARIA}
        onClick={() => setEditing(!editing)}
        sx={{ width: "max-content" }}
      >
        {editing ? (
          <PublishIcon fontSize={size} />
        ) : (
          <EditIcon fontSize={size} />
        )}
      </IconButton>
      <Typography>
        {editing ? RETURN_FROM_EDIT_BUTTON_TEXT : EDIT_BUTTON_TEXT}
      </Typography>
    </Stack>
  );
};

export default EditingButton;
