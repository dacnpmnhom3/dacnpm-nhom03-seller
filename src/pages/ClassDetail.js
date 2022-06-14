import { Box, Container, Grid, Typography, Button } from "@mui/material";
import { useParams, Link as RouterLink } from "react-router-dom";
import ClassDetailForm from "components/_dashboard/class/ClassDetail";

import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axiosClient from "api/axiosClient";
import { setErrorMsg } from "redux/alert";

export default function ClassDetail() {
  const { classId } = useParams();
  const [classDetail, setClassDetail] = useState({
    className: "",
    classSection: "",
    subject: "",
    room: "",
    studentJoinCode: "",
    teacherJoinCode: "",
    createdAt: "",
    updatedAt: "",
  });

  const dispatch = useDispatch();

  async function fetchAPI() {
    try {
      const res = await axiosClient.get(`/api/admin/classes/${classId}`);

      setClassDetail({ ...res.data });
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
    <>
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
            Class Detail
          </Typography>
          <Grid container spacing={3}>
            <Grid item>
              <ClassDetailForm classDetail={classDetail} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
