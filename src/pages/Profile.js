import { Box, Container, Grid, Typography } from "@mui/material";
import AccountProfile from "../components/account/account-profile";
import AccountProfileDetails from "../components/account/account-profile-detail";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axiosClient from "src/api/axiosClient";
import { setErrorMsg } from "src/redux/alert";

export default function Profile() {
  const { user } = useSelector((state) => state.user);
  const parsedUser = JSON.parse(user);
  const [userInfo, setUserInfo] = useState({
    address: "",
    email: "",
    fullName: "",
    id: "",
    phone: "",
  });
  const dispatch = useDispatch();

  async function fetchAPI() {
    try {
      const res = await axiosClient.get(`/api/admin/${parsedUser.id}`);

      setUserInfo({ ...res.data });
    } catch (error) {
      if (error.response.data) {
        dispatch(setErrorMsg(error.response.data.message));
      } else console.log(error);
    }
  }
  useEffect(() => {
    fetchAPI();
  }, []);
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ mb: 3 }} variant="h4">
            Account
          </Typography>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <AccountProfile
                userDetail={userInfo}
                image={"/static/mock-images/avatars/avatar_default.jpg"}
              />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AccountProfileDetails
                userDetail={userInfo}
                onChange={setUserInfo}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
