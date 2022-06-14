import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import axiosClient from "api/axiosClient";
import { useDispatch } from "react-redux";
import { setErrorMsg, setSuccessMsg } from "redux/alert";

// eslint-disable-next-line react/prop-types
export default function ProductProfileDetail({ productDetail }) {
  const [values, setValues] = useState(productDetail);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setValues({ ...productDetail });
  }, [productDetail]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    try {
      const obj = event.target.id === "accept"
        ? { isVerified: "true", isPublished: "true" }
        : { isVerified: "true" };
      const res = await axiosClient.put(`/api/products/${values.id}`, obj);

      navigate(-1);
      dispatch(setSuccessMsg(res.data.message));
    } catch (error) {
      if (error.response.data && error.response.data.message) {
        dispatch(setErrorMsg(error.response.data.message));
      } else console.log(error);
    }
  };

  return (
    <form autoComplete="off">
      <Card>
        <CardHeader title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="ID"
                name="id"
                onChange={handleChange}
                disabled
                value={values.id}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Category"
                name="category"
                disabled
                onChange={handleChange}
                value={values.category}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Product name"
                name="productName"
                onChange={handleChange}
                disabled
                value={values.title}
                variant="outlined"
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                disabled
                onChange={handleChange}
                value={values.price}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Stock"
                name="stock"
                disabled
                onChange={handleChange}
                value={values.stock}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                type="text"
                label="Description"
                name="description"
                disabled
                onChange={handleChange}
                value={values.desc}
                variant="outlined"
                multiline
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
          <Button
            color="primary"
            variant="contained"
            id="accept"
            onClick={handleSubmit}
            sx={{ mr: 5 }}
          >
            Save
          </Button>
        </Box>
      </Card>
    </form>
  );
}
