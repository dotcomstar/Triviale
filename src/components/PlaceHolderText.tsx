import { Typography } from "@mui/material";
import { PLACEHOLDER_TEXT } from "../constants/strings";

interface PlaceHolderTextProps {
  size?: string;
}

const PlaceHolderText = ({ size = "20px" }: PlaceHolderTextProps) => {
  return (
    <Typography sx={{ m: 3, my: 0, fontSize: size }} fontStyle={"italic"}>
      {PLACEHOLDER_TEXT}
    </Typography>
  );
};

export default PlaceHolderText;
