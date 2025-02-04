// material
import { styled } from "@mui/material/styles";
import { Container } from "@mui/material";
// components
import CreateProductForm from "components/_dashboard/products/CreateProductForm/CreateProductForm";
import Page from "../components/Page";
// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

// const SectionStyle = styled(Card)(({ theme }) => ({
//   width: "100%",
//   maxWidth: 464,
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "center",
//   margin: theme.spacing(2, 0, 2, 2),
// }));

const ContentStyle = styled("div")(({ theme }) => ({
  // maxWidth: 480,
  margin: "auto",
  display: "flex",
  // minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function CreateProduct() {
  return (
    <RootStyle title="Create product">
      {/* <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Add new product
          </Typography>
          <img
            alt="register"
            src="/static/illustrations/illustration_register.png"
          />
        </SectionStyle>
      </MHidden> */}

      <Container>
        <ContentStyle>
          <CreateProductForm />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
