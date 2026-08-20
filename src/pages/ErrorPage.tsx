import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";
import { Button, Grid } from "@mui/material";
import NavBar from "../components/navbar/NavBar";
import useDialogStore from "../stores/dialogStore";
import ThemedLayout from "../components/ThemedLayout";

const ErrorPage = () => {
  // Deliberately called here in the render body, not useEffect/useLayoutEffect
  // -- see the 08-14 code review doc's Revisions section for why. Short
  // version: NavBar renders LandingDialog open={isLandingOpen}, which
  // defaults true, and ANY effect-based close (including useLayoutEffect)
  // lets it render open on the first commit before closing a tick later --
  // verified live to leave a stuck aria-hidden on the whole page in tests,
  // hiding this page's own content from the accessibility tree. Calling it
  // here means NavBar's very first render already sees the closed value, no
  // open-then-close transition ever happens, matching real user expectation.
  const closeAllDialogs = useDialogStore((s) => s.closeAllDialogs);
  closeAllDialogs();

  const navigate = useNavigate();
  const error = useRouteError();
  let errorMessage: string;
  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorMessage = error.data || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = "Unknown error";
  }

  return (
    <ThemedLayout>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <NavBar hasBottomBorder />
        </Grid>
        <Grid item xs={12} marginLeft={2}>
          <h1>Oops!</h1>
          <p>{errorMessage}</p>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/")}
          >
            Return home
          </Button>
        </Grid>
      </Grid>
    </ThemedLayout>
  );
};

export default ErrorPage;
