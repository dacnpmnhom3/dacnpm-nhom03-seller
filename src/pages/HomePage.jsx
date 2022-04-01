import { Container, Box, Item, Grid, Button, Avatar } from "@mui/material";
import Header from "../components/Header";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
function HomePage() {
  const navigate = useNavigate();
  return (
    <>
      <Box
        maxWidth="xl"
        sx={{
          backgroundImage:
            "url('https://salt.tikicdn.com/ts/sc/ca/4f/04/1ff24141e66468be95aa4cb917683497.png')",
          minHeight: "100vh",
          minWidth: "100vw",
        }}
        width="100%"
      >
        <Header />
        <Grid container sx={{ display: "flex", flexDirection: "row-reverse" }}>
          <Grid xl={6} lg={6} sm={12} xs={12}>
            <Box
              sx={{
                // backgroundColor: "rgba(0,0,0,0.5)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="home-page-box"
            >
              <h1>
                Điểm đến cho mọi <span className="blue">doanh nghiệp</span>
              </h1>
              <Box sx={{ display: "block" }}>
                <Button
                  variant="contained"
                  className="button"
                  onClick={() => {
                    navigate("/signin");
                  }}
                >
                  Đăng Nhập
                </Button>
              </Box>
              <Box sx={{ display: "block" }} marginTop={"10px"}>
                <Button
                  variant="outlined"
                  sx={{ backgroundColor: "white" }}
                  className="button"
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  Đăng ký bán hàng
                </Button>
              </Box>
            </Box>
          </Grid>

          <Grid xl={6} lg={6} sm={12} xs={12}>
            <Box
              sx={{
                // backgroundColor: "rgba(128,50,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexGrow: "1",
              }}
              className="home-page-box"
            >
              <Avatar
                src="https://citi-partners.com/wp-content/uploads/2020/09/san-giao-dich-dien-tu-tiki.png"
                className="home-page-avatar"
              />
            </Box>
          </Grid>
        </Grid>
        <Button
          variant="outlined"
          sx={{
            marginTop: "10px",
            zIndex: "tooltip",
            position: "sticky",
            bottom: "0%",
            left: "0%",
            backgroundColor: "#1e88e5",
            color: "white",
          }}
        >
          Support
        </Button>
      </Box>
    </>
  );
}

export default HomePage;
