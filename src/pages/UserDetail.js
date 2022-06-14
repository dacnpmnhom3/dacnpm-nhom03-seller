import {
  Box, Container, Grid, Typography, Button,
} from "@mui/material";
import { useParams, Link as RouterLink } from "react-router-dom";
import UserProfileDetail from "components/_dashboard/user/UserProfileDetail";
import UserProfile from "components/_dashboard/user/UserProfile";

import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axiosClient from "api/axiosClient";
import { setErrorMsg } from "redux/alert";

export default function UserDetail() {
  const { userId } = useParams();

  const [userDetail, setUserDetail] = useState({
    image: "",
    name: "",
    email: "",
    phone: "",
    student_id: "",
    isLock: false,
    isVerify: "",
    mailSecretCode: "",
    registerType: "",
    createdAt: "",
    updatedAt: "",
  });
  const dispatch = useDispatch();

  async function fetchAPI() {
    try {
      const res = await axiosClient.get(`/api/admin/users/${userId}`);
      setUserDetail({ ...res.data });
    } catch (error) {
      if (error.response.data && error.response.data.message) {
        dispatch(setErrorMsg(error.response.data.message));
      } else console.log(error);
    }
  }
  useEffect(() => {
    fetchAPI();
  }, []);
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 2,
      }}
    >
      <Container maxWidth="lg">
        <Button
          to="./../"
          size="large"
          variant="contained"
          component={RouterLink}
        >
          Back
        </Button>
        <Typography sx={{ my: 3 }} variant="h4">
          User Detail
        </Typography>
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <UserProfile userDetail={userDetail} />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <UserProfileDetail userDetail={userDetail} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
