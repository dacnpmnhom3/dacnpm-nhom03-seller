// export default HomePage;
import { Link as RouterLink } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import {
  Card,
  Stack,
  Link,
  Container,
  Typography,
  Box,
  Button,
} from "@mui/material";
// components
import Page from "../components/Page";
import { MHidden } from "../components/@material-extend";

import { useNavigate } from "react-router-dom";
import { useDocumentTitle } from "../hooks/custom";
// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
  const navigate = useNavigate();
  useDocumentTitle("Home Page");
  return (
    <RootStyle title="Login">
      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Hi, Welcome Back
          </Typography>
          <img
            src="/static/illustrations/illustration_register.png"
            alt="register"
          />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h1" gutterBottom>
              Welcome to Seller page!
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              The destination for all sellers!
            </Typography>
          </Stack>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Box>
              <Button
                variant="contained"
                size="large"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Đăng Nhập
              </Button>
            </Box>
            <Box>
              <Button
                sx={{ ml: 4 }}
                variant="outlined"
                size="large"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Đăng ký bán hàng
              </Button>
            </Box>
          </Box>

          <MHidden width="smUp">
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Don’t have an account?&nbsp;
              <Link variant="subtitle2" component={RouterLink} to="register">
                Get started
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
