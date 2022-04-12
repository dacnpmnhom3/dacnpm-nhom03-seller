// material
import { Box, Grid, Container, Typography } from "@mui/material";
// components
import Page from "../components/Page";
import {
  UserCard,
  ClassCard,
  AdminCard,
  AppConversionRates,
} from "../components/_dashboard/app";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axiosClient from "src/api/axiosClient";
import { setErrorMsg } from "src/redux/alert";
// ----------------------------------------------------------------------

export default function DashboardApp() {
  const dispatch = useDispatch();
  const [report, setReport] = useState({ admin: 0, user: 0, class: 0 });

  async function fetchAPI() {
    try {
      const res = await axiosClient.get("/api/admin/total-report");
      setReport({ ...res.data });
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
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <AdminCard total={report.admin} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <UserCard total={report.user} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ClassCard total={report.class} />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <AppConversionRates
              chartData={[{ data: [report.admin, report.user, report.class] }]}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
