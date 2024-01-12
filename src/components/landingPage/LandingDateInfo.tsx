import { Stack, Typography } from "@mui/material";
import { EDITED_BY, LOCALE } from "../../constants/strings";

const LandingDateInfo = () => {
  const options: { month: "long" } = { month: "long" };
  const today = new Date();
  const date = today.getDate();
  const month = new Intl.DateTimeFormat(LOCALE, options).format(today);
  const year = today.getFullYear();

  return (
    <Stack direction={"column"}>
      <Typography fontWeight={"bold"} color={"black"}>
        {month} {date}, {year}
      </Typography>
      <Typography color={"black"}>{EDITED_BY}</Typography>
    </Stack>
  );
};

export default LandingDateInfo;
