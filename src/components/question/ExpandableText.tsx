import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";

interface Props {
  children: string;
}

const ExpandableText = ({ children }: Props) => {
  if (!children) return null;
  const [expanded, setExpanded] = useState(1);
  const length = children.length / 5;
  const summary =
    expanded < 5 ? children.substring(0, expanded * length) + "..." : children;

  return (
    <Stack>
      <Typography fontSize="large">{summary}</Typography>
      {expanded < 5 && (
        <Button onClick={() => setExpanded(expanded + 1)}>Show more</Button>
      )}
    </Stack>
  );
};

export default ExpandableText;
