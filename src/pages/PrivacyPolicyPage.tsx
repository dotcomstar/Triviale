import { Box, Container, Stack, Typography } from "@mui/material";
import { useEffect } from "react";

const PrivacyPolicyPage = () => {
  useEffect(() => {
    // Redirect to the static HTML privacy policy
    window.location.href = "/PrivacyPolicy.html";
  }, []);

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Stack spacing={3}>
          <Typography variant="h3" component="h1" gutterBottom>
            Privacy Policy
          </Typography>
          <Typography variant="body1">
            Redirecting to privacy policy...
          </Typography>
        </Stack>
      </Box>
    </Container>
  );
};

export default PrivacyPolicyPage;
