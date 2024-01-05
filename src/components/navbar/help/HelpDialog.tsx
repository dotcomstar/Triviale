import {
  DialogProps,
  List,
  ListItem,
  Typography,
  useMediaQuery,
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
import SampleGame from "./SampleGame";

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
  const matches = useMediaQuery("(min-width:600px)");

  return (
    <CustomDialog
      onClose={handleClose}
      open={open}
      TransitionComponent={TransitionComponent}
      ariaDescribedBy={HELP_DIALOG_ARIA}
      ariaLabeledBy={HELP_TITLE}
      dialogTitle={HELP_HOW_TO_PLAY}
      fullScreen={!matches}
    >
      <Typography sx={{ m: 3, my: 0, fontSize: "20px" }}>
        {HELP_NUM_TRIES}
      </Typography>
      <List sx={{ listStyleType: "disc", mx: 6, mt: 0 }}>
        <ListItem sx={{ display: "list-item" }}>{HELP_NUM_QUESTIONS}</ListItem>
        <ListItem sx={{ display: "list-item" }}>
          {HELP_HOW_TILE_COLORS_CHANGE}
        </ListItem>
      </List>
      <SampleGame />
    </CustomDialog>
  );
};

export default HelpDialog;
