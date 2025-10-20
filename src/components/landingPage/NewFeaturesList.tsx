import { Stack, Typography, List, ListItem } from "@mui/material";
import { NEW_FEATURES_LABEL, NEW_FEATURES_LIST } from "../../constants/strings";

const NewFeaturesList = () => {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      width={"80%"}
      pb={1}
      pt={1}
    >
      {NEW_FEATURES_LIST.length !== 0 && (
        //   // Render an empty space if no new features so the title and buttons render correctly
        <>
          <Typography
            color={"black"}
            variant="h6"
            sx={{ fontSize: 1 }}
            letterSpacing={"-1px"}
            whiteSpace={"break-spaces"}
          >
            {NEW_FEATURES_LABEL}
          </Typography>
          <List sx={{ listStyleType: "disc", color: "black" }}>
            {NEW_FEATURES_LIST.map((feature) => (
              <ListItem key={feature} sx={{ display: "list-item" }}>
                <Typography
                  variant="h6"
                  letterSpacing={"-1px"}
                  whiteSpace={"break-spaces"}
                >
                  {feature}
                </Typography>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Stack>
  );
};

export default NewFeaturesList;
