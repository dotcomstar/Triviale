import { DialogProps, Stack, useMediaQuery } from "@mui/material";
import { LANDING_DIALOG_ARIA, LANDING_TITLE } from "../../constants/strings";
import CustomDialog from "../navbar/CustomDialog";
import LandingButtons from "./LandingButtons";
import LandingLogo from "./LandingLogo";
import LandingDateInfo from "./LandingDateInfo";
import LoginButton from "../auth/LoginButton";
import ProfileButton from "../auth/ProfileButton";
import { useDiscord } from "../../contexts/DiscordContext";
import LandingHelpText from "./LandingHelpText";
import { MOBILE_SCREEN_CUTOFF } from "../../constants/settings";
import NewFeaturesList from "./NewFeaturesList";

export interface LandingDialogProps {
  open: boolean;
  onClose: () => void;
  TransitionComponent: DialogProps["TransitionComponent"];
}

const LandingDialog = ({
  open,
  onClose,
  TransitionComponent,
}: LandingDialogProps) => {
  const handleClose = () => {
    onClose();
  };

  const isNotMobile = useMediaQuery(`(min-width:${MOBILE_SCREEN_CUTOFF})`);
  const { isAuthenticated } = useDiscord();
  const backgroundColor = "#E3E3E1";

  return (
    <CustomDialog
      onClose={handleClose}
      open={open}
      fullScreen
      TransitionComponent={TransitionComponent}
      ariaDescribedBy={LANDING_DIALOG_ARIA}
      ariaLabeledBy={LANDING_TITLE}
      zIndex={"2"}
      backgroundColor={backgroundColor}
    >
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        width={"100%"}
        height={"100%"}
        spacing={isNotMobile ? 2 : 0.5}
        sx={{
          pt: isNotMobile ? 8 : 2,
          pb: isNotMobile ? 4 : 2,
          px: isNotMobile ? 4 : 2,
          overflow: "auto"
        }}
      >
        <LandingLogo fontColor={backgroundColor} />
        <LandingHelpText />
        <NewFeaturesList />
        <LandingButtons onClose={handleClose} />
        <Stack direction="column" pt={isNotMobile ? 2 : 1} spacing={1}>
          <LandingDateInfo />
          {isAuthenticated ? (
            <ProfileButton />
          ) : (
            <LoginButton startEdge color="error" />
          )}
        </Stack>
      </Stack>
    </CustomDialog>
  );
};

export default LandingDialog;
