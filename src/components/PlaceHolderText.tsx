import { SxProps, Typography } from "@mui/material";
import { PLACEHOLDER_TEXT } from "../constants/strings";

interface PlaceHolderTextProps {
  sx?: SxProps;
}

const PlaceHolderText = ({ sx }: PlaceHolderTextProps) => {
  return (
    <Typography sx={{ ...sx }} fontStyle={"italic"}>
      {PLACEHOLDER_TEXT}
    </Typography>
  );
};

export default PlaceHolderText;
