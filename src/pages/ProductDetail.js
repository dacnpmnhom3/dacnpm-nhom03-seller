import {
  Box, Container, Grid, Typography, Button,
} from "@mui/material";
import { useParams, Link as RouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { productAxios } from "api/axiosClient";
import { setErrorMsg } from "redux/alert";
import ProductSummary from "components/_dashboard/products/ProductSummary";
import ProductProfileDetail from "components/_dashboard/products/ProductDetail";

export default function ProductDetail() {
  const { productId } = useParams();
  const [productInfo, setProductInfo] = useState({
    category: "",
    stock: "",
    id: "",
    desc: "",
    img: "",
    price: "",
    title: "",
  });
  const dispatch = useDispatch();

  async function fetchAPI() {
    try {
      const res = await productAxios.get(`/api/product/${productId}`);
      setProductInfo({ ...res.data.data });
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
          Product Detail
        </Typography>
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <ProductSummary productDetail={productInfo} />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <ProductProfileDetail productDetail={productInfo} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
