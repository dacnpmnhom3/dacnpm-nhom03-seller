import {
  Box, Container, Grid, Typography, Button,
} from "@mui/material";
import { useParams, Link as RouterLink } from "react-router-dom";
import AdminProfileDetails from "components/_dashboard/admin/AdminDetail";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { axiosClient } from "api/axiosClient";
import { setErrorMsg } from "redux/alert";
import AccountProfile from "../components/account/account-profile";

export default function AdminDetail() {
  const { adminId } = useParams();
  const [adminInfo, setAdminInfo] = useState({
    address: "",
    createdAt: "",
    email: "",
    fullName: "",
    id: "",
    phone: "",
  });
  const dispatch = useDispatch();

  async function fetchAPI() {
    try {
      const res = await axiosClient.get(`/api/admin/${adminId}`);
      setAdminInfo({ ...res.data });
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
          Admin Detail
        </Typography>
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <AccountProfile
              userDetail={adminInfo}
              image="/static/mock-images/avatars/avatar_1.jpg"
            />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <AdminProfileDetails adminDetail={adminInfo} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
