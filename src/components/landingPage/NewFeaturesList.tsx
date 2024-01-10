import { Stack, Typography, List, ListItem } from "@mui/material";
import { NEW_FEATURES_LABEL, NEW_FEATURES_LIST } from "../../constants/strings";

const NewFeaturesList = () => {
  if (NEW_FEATURES_LIST.length === 0) {
    // Render an empty space if no new features so the title and buttons render correctly
    return "";
  }
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      width={"100%"}
      pb={3}
      pt={4}
    >
      <Typography>{NEW_FEATURES_LABEL}</Typography>
      <List sx={{ listStyleType: "disc" }}>
        {NEW_FEATURES_LIST.map((v) => (
          <ListItem sx={{ display: "list-item" }}>{v}</ListItem>
        ))}
      </List>
    </Stack>
  );
};

export default NewFeaturesList;
