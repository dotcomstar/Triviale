import { Box, Container, Link, Stack, Typography } from "@mui/material";

const TermsOfServicePage = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Stack spacing={3}>
          <Typography variant="h3" component="h1" gutterBottom>
            Terms of Service
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ fontStyle: "italic" }}>
            Last Updated: October 24, 2025
          </Typography>

          <Box>
            <Typography variant="h5" component="h2" gutterBottom>
              1. Acceptance of Terms
            </Typography>
            <Typography variant="body1" paragraph>
              By accessing and using Triviale (the "Service"), a Discord Activity, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms of Service, please do not use the Service.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" component="h2" gutterBottom>
              2. Description of Service
            </Typography>
            <Typography variant="body1" paragraph>
              Triviale is a daily trivia puzzle game where users attempt to answer questions before they are fully revealed. The Service is provided as a Discord Activity and is accessible through the Discord platform.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" component="h2" gutterBottom>
              3. User Accounts and Authentication
            </Typography>
            <Typography variant="body1" paragraph>
              To use Triviale, you must have a valid Discord account. By using this Service, you agree to Discord's Terms of Service and Community Guidelines. We use Discord's authentication system to identify users and do not collect separate login credentials.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" component="h2" gutterBottom>
              4. User Conduct
            </Typography>
            <Typography variant="body1" paragraph>
              You agree to use the Service only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the Service. Prohibited behavior includes:
            </Typography>
            <Box component="ul" sx={{ pl: 4 }}>
              <Typography component="li" variant="body1">
                Attempting to exploit, hack, or manipulate the Service
              </Typography>
              <Typography component="li" variant="body1">
                Using automated tools or bots to interact with the Service
              </Typography>
              <Typography component="li" variant="body1">
                Sharing answers or spoiling questions for other users
              </Typography>
              <Typography component="li" variant="body1">
                Harassing, abusing, or threatening other users
              </Typography>
              <Typography component="li" variant="body1">
                Any activity that violates Discord's Terms of Service or Community Guidelines
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography variant="h5" component="h2" gutterBottom>
              5. Intellectual Property
            </Typography>
            <Typography variant="body1" paragraph>
              The Service, including all content, features, and functionality, is owned by Triviale and is protected by international copyright, trademark, and other intellectual property laws. All trivia questions, game mechanics, and design elements are the property of Triviale or its licensors.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" component="h2" gutterBottom>
              6. User Data and Privacy
            </Typography>
            <Typography variant="body1" paragraph>
              Your use of the Service is also governed by our{" "}
              <Link href="/privacy" color="primary">
                Privacy Policy
              </Link>
              . We collect minimal user data through Discord's authentication system and store game progress locally in your browser. Please review our Privacy Policy to understand our data practices.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" component="h2" gutterBottom>
              7. Game Rules and Mechanics
            </Typography>
            <Typography variant="body1" paragraph>
              Triviale provides daily trivia questions with a limited number of guesses. Game rules, scoring, and difficulty may change at our discretion. Statistics and progress are stored locally and may not sync across devices. We reserve the right to modify game mechanics, questions, or features at any time.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" component="h2" gutterBottom>
              8. Disclaimer of Warranties
            </Typography>
            <Typography variant="body1" paragraph>
              The Service is provided "as is" and "as available" without any warranties of any kind, either express or implied. We do not guarantee that:
            </Typography>
            <Box component="ul" sx={{ pl: 4 }}>
              <Typography component="li" variant="body1">
                The Service will be uninterrupted, timely, secure, or error-free
              </Typography>
              <Typography component="li" variant="body1">
                The results obtained from the use of the Service will be accurate or reliable
              </Typography>
              <Typography component="li" variant="body1">
                Any errors in the Service will be corrected
              </Typography>
              <Typography component="li" variant="body1">
                Game progress or statistics will be preserved indefinitely
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography variant="h5" component="h2" gutterBottom>
              9. Limitation of Liability
            </Typography>
            <Typography variant="body1" paragraph>
              In no event shall Triviale, its developers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
            </Typography>
            <Box component="ul" sx={{ pl: 4 }}>
              <Typography component="li" variant="body1">
                Your access to or use of or inability to access or use the Service
              </Typography>
              <Typography component="li" variant="body1">
                Any conduct or content of any third party on the Service
              </Typography>
              <Typography component="li" variant="body1">
                Any content obtained from the Service
              </Typography>
              <Typography component="li" variant="body1">
                Unauthorized access, use, or alteration of your data or content
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography variant="h5" component="h2" gutterBottom>
              10. Discord Platform
            </Typography>
            <Typography variant="body1" paragraph>
              This Service is built as a Discord Activity and is subject to Discord's platform policies. We are not affiliated with, endorsed by, or sponsored by Discord Inc. Discord is a trademark of Discord Inc.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" component="h2" gutterBottom>
              11. Modifications to Service
            </Typography>
            <Typography variant="body1" paragraph>
              We reserve the right to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice at any time. You agree that we shall not be liable to you or any third party for any modification, suspension, or discontinuance of the Service.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" component="h2" gutterBottom>
              12. Modifications to Terms
            </Typography>
            <Typography variant="body1" paragraph>
              We reserve the right to modify these Terms of Service at any time. We will notify users of any material changes by updating the "Last Updated" date at the top of this document. Your continued use of the Service after any such changes constitutes your acceptance of the new Terms of Service.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" component="h2" gutterBottom>
              13. Termination
            </Typography>
            <Typography variant="body1" paragraph>
              We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms of Service. Upon termination, your right to use the Service will immediately cease.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" component="h2" gutterBottom>
              14. Governing Law
            </Typography>
            <Typography variant="body1" paragraph>
              These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" component="h2" gutterBottom>
              15. Age Restrictions
            </Typography>
            <Typography variant="body1" paragraph>
              The Service is intended for users who meet Discord's minimum age requirements (13 years or older, or the digital age of consent in your country). By using this Service, you represent that you meet these age requirements.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" component="h2" gutterBottom>
              16. Contact Information
            </Typography>
            <Typography variant="body1" paragraph>
              If you have any questions about these Terms of Service, please contact us through our Discord support server or via the feedback options in the application.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" component="h2" gutterBottom>
              17. Severability
            </Typography>
            <Typography variant="body1" paragraph>
              If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.
            </Typography>
          </Box>

          <Box sx={{ pb: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              18. Entire Agreement
            </Typography>
            <Typography variant="body1" paragraph>
              These Terms of Service, together with our Privacy Policy, constitute the entire agreement between you and Triviale regarding the use of the Service, superseding any prior agreements between you and Triviale relating to your use of the Service.
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
};

export default TermsOfServicePage;
