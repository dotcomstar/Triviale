import { DialogProps, Stack, useMediaQuery } from "@mui/material";
import { LANDING_DIALOG_ARIA, LANDING_TITLE } from "../../constants/strings";
import CustomDialog from "../navbar/CustomDialog";
import LandingButtons from "./LandingButtons";
import LandingLogo from "./LandingLogo";
import LandingDateInfo from "./LandingDateInfo";
import LoginButton from "../auth/LoginButton";
import ProfileButton from "../auth/ProfileButton";
import { useAuth0 } from "@auth0/auth0-react";
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
  const { isAuthenticated } = useAuth0();
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
        justifyContent="space-between"
        alignItems="center"
        width={"100%"}
        height={"100%"}
        spacing={isNotMobile ? undefined : "4%"}
        sx={{ pt: isNotMobile ? 12 : 8, pb: isNotMobile ? 8 : 2, px: 4 }}
      >
        <LandingLogo fontColor={backgroundColor} />
        <LandingHelpText />
        <NewFeaturesList />
        <LandingButtons onClose={handleClose} />
        <Stack direction="column" pt={"20px"}>
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
