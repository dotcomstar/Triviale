import { DialogProps, Stack, useMediaQuery } from "@mui/material";
import { LANDING_DIALOG_ARIA, LANDING_TITLE } from "../../constants/strings";
import CustomDialog from "../navbar/CustomDialog";
import LandingButtons from "./LandingButtons";
import LandingLogo from "./LandingLogo";
import NewFeaturesList from "./NewFeaturesList";
import LandingDateInfo from "./LandingDateInfo";
import LoginButton from "../auth/LoginButton";
import ProfileButton from "../auth/ProfileButton";
import { useAuth0 } from "@auth0/auth0-react";

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

  const matches = useMediaQuery("(min-width:600px)");
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
        height={"100dvh"}
        sx={{ mt: matches ? 20 : 8, mb: 8 }}
      >
        <Stack direction="column">
          <LandingLogo fontColor={backgroundColor} />
          <NewFeaturesList />
          <LandingButtons onClose={handleClose} />
        </Stack>
        <Stack direction="column" mt={"20px"}>
          <LandingDateInfo />
          {isAuthenticated ? (
            <ProfileButton />
          ) : (
            <LoginButton startEdge color="error" />
          )}
        </Stack>
        <LandingDateInfo />
      </Stack>
    </CustomDialog>
  );
};

export default LandingDialog;
