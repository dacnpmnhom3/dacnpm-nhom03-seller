import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";

export default function ClassDetailForm({ classDetail }) {
  const [values, setValues] = useState(classDetail);

  useEffect(() => {
    setValues({ ...classDetail });
  }, [classDetail]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Card>
        <CardHeader title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Class name"
                name="className"
                onChange={handleChange}
                disabled
                value={values.className}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Class section"
                name="classSection"
                onChange={handleChange}
                disabled
                value={values.classSection ? values.classSection : ""}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Subject"
                name="subject"
                onChange={handleChange}
                disabled
                value={values.subject ? values.subject : ""}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Room"
                name="room"
                onChange={handleChange}
                disabled
                value={values.room ? values.room : ""}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Student join code"
                name="studentJoinCode"
                onChange={handleChange}
                disabled
                value={values.studentJoinCode ? values.studentJoinCode : ""}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Teacher join code"
                name="teacherJoinCode"
                onChange={handleChange}
                disabled
                value={values.teacherJoinCode ? values.teacherJoinCode : ""}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Created at"
                name="createdAt"
                onChange={handleChange}
                disabled
                value={new Date(values.createdAt).toLocaleString()}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Updated at"
                name="updatedAt"
                onChange={handleChange}
                disabled
                value={new Date(values.updatedAt).toLocaleString()}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary" variant="contained" type="submit">
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
}
