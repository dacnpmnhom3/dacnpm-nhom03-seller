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
  MenuItem,
} from "@mui/material";
import axiosClient from "src/api/axiosClient";
import { setErrorMsg, setSuccessMsg } from "src/redux/alert";
import { useDispatch } from "react-redux";

export default function UserProfileDetail({ userDetail }) {
  const [values, setValues] = useState(userDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    setValues({ ...userDetail });
  }, [userDetail]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axiosClient.put(`/api/admin/users/${values.id}`, {
        studentId: values.student_id ? values.student_id : null,
        isLock: values.isLock,
      });
      dispatch(setSuccessMsg(res.data.message));
    } catch (error) {
      if (error.response.data && error.response.data.message) {
        dispatch(setErrorMsg(error.response.data.message));
      } else console.log(error);
    }
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
                label="Student Id"
                name="student_id"
                type="number"
                onChange={handleChange}
                value={values.student_id ? values.student_id : ""}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                onChange={handleChange}
                value={values.name ? values.name : ""}
                variant="outlined"
                disabled
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                onChange={handleChange}
                value={values.email ? values.email : ""}
                variant="outlined"
                disabled
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                value={values.phone ? values.phone : ""}
                variant="outlined"
                disabled
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Mail secret code"
                name="mailSecretCode"
                onChange={handleChange}
                value={values.mailSecretCode ? values.mailSecretCode : ""}
                variant="outlined"
                disabled
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Register Type"
                name="registerType"
                onChange={handleChange}
                value={values.registerType ? values.registerType : ""}
                variant="outlined"
                disabled
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                select
                name="isLock"
                label="Is lock"
                value={values.isLock}
                onChange={handleChange}
              >
                <MenuItem value={false}>False</MenuItem>
                <MenuItem value={true}>True</MenuItem>
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Is verified"
                name="isVerify"
                onChange={handleChange}
                value={values.isVerify}
                variant="outlined"
                disabled
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Created at"
                name="createdAt"
                onChange={handleChange}
                value={new Date(values.createdAt).toLocaleString()}
                variant="outlined"
                disabled
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Updated at"
                name="updatedAt"
                onChange={handleChange}
                value={new Date(values.updatedAt).toLocaleString()}
                variant="outlined"
                disabled
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
