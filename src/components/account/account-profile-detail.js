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
import axiosClient from "src/api/axiosClient";
import { setErrorMsg, setSuccessMsg } from "src/redux/alert";
import { useDispatch } from "react-redux";
import { setUser } from "src/redux/user";

export default function AccountProfileDetails({ userDetail, onChange }) {
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
      const res = await axiosClient.put(`/api/admin/${values.id}`, {
        fullName: values.fullName,
        phone: values.phone ? values.phone : null,
        address: values.address,
      });
      onChange({ ...values });

      localStorage.setItem("user", JSON.stringify(values));
      dispatch(setUser(JSON.stringify(values)));
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
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Full name"
                name="fullName"
                onChange={handleChange}
                required
                value={values.fullName ? values.fullName : ""}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                onChange={handleChange}
                required
                disabled
                value={values.email ? values.email : ""}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone ? values.phone : ""}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                onChange={handleChange}
                value={values.address ? values.address : ""}
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
