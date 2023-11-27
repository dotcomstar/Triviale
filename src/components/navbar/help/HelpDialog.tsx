import {
  DialogProps,
  List,
  ListItem,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import {
  HELP_DIALOG_ARIA,
  HELP_HOW_TILE_COLORS_CHANGE,
  HELP_HOW_TO_PLAY,
  HELP_NUM_QUESTIONS,
  HELP_NUM_TRIES,
  HELP_TITLE,
} from "../../../constants/strings";
import CustomDialog from "../CustomDialog";
import GameRow from "../../grid/GameRow";

export interface HelpDialogProps {
  open: boolean;
  onClose: () => void;
  TransitionComponent: DialogProps["TransitionComponent"];
}

const HelpDialog = ({
  open,
  onClose,
  TransitionComponent,
}: HelpDialogProps) => {
  const handleClose = () => {
    onClose();
  };
  const theme = useTheme();

  return (
    <CustomDialog
      onClose={handleClose}
      open={open}
      TransitionComponent={TransitionComponent}
      ariaDescribedBy={HELP_DIALOG_ARIA}
      ariaLabeledBy={HELP_TITLE}
      dialogTitle={HELP_HOW_TO_PLAY}
    >
      <Typography sx={{ m: 3, my: 0, fontSize: "20px" }}>
        {HELP_NUM_TRIES}
      </Typography>
      <List sx={{ listStyleType: "disc", mx: 6, mt: 0, pb: 3 }}>
        <ListItem sx={{ display: "list-item" }}>{HELP_NUM_QUESTIONS}</ListItem>
        <ListItem sx={{ display: "list-item" }}>
          {HELP_HOW_TILE_COLORS_CHANGE}
        </ListItem>
      </List>
      <Stack direction={"column"} sx={{ m: 3 }}>
        <Typography fontWeight={"bold"}>Examples</Typography>
        <GameRow
          guess={["B", "U", "R", "R"]}
          statuses={[
            theme.palette.success,
            theme.palette.primary,
            theme.palette.primary,
            theme.palette.primary,
          ]}
          answerOverride="BRAD"
        ></GameRow>
        <GameRow
          guess={["C", "R", "A", "B"]}
          statuses={[
            theme.palette.primary,
            theme.palette.warning,
            theme.palette.primary,
            theme.palette.primary,
          ]}
          answerOverride="BRAD"
        ></GameRow>
        <GameRow
          guess={["E", "N", "T", "S"]}
          statuses={[
            theme.palette.primary,
            theme.palette.primary,
            theme.palette.error,
            theme.palette.primary,
          ]}
          answerOverride="BRAD"
        ></GameRow>
      </Stack>
    </CustomDialog>
  );
};

export default HelpDialog;
