import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axiosClient from "api/axiosClient";
import { setErrorMsg, setSuccessMsg } from "redux/alert";

import { styled } from "@mui/material/styles";
import {
  Box,
  Table,
  Stack,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer,
  Container,
  Grid,
  Button,
  Card,
  CardHeader,
  CardContent,
  TextField,
} from "@mui/material";
// utils
import { fCurrency } from "utils/formatNumber";

export default function ClassDetail() {
  const { orderId } = useParams();
  const [orderDetail, setOrderDetail] = useState({
    ancestor_order: {
      receiver_name: "",
      receiver_address: "",
      receiver_phone: "",
      ship_date: "",
    },
    items: [],
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function fetchAPI() {
    try {
      const res = await axiosClient.get(`/api/order/store-order/${orderId}`);
      setOrderDetail({ ...res.data.data });
      console.log(res.data.data);
    } catch (error) {
      if (error.response.data && error.response.data.message) {
        dispatch(setErrorMsg(error.response.data.message));
      } else console.log(error);
    }
  }
  useEffect(() => {
    fetchAPI();
  }, []);

  const handleSubmit = async (event) => {
    try {
      const res = await axiosClient.put(`/api/order/store-order/${orderId}`, {
        status: "verified",
      });

      dispatch(setSuccessMsg(res.data.data.message));
      navigate(-1);
    } catch (error) {
      if (error.response.data && error.response.data.message) {
        dispatch(setErrorMsg(error.response.data.message));
      } else console.log(error);
    }
  };

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
          <Card sx={{ mt: 2 }}>
            <CardHeader title="Order Detail" />
            <CardContent>
              <Divider />
              <ProductList products={orderDetail.items} />
              <Grid container spacing={3} mt={2}>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Receiver Name"
                    name="receiverName"
                    disabled
                    value={orderDetail.ancestor_order.receiver_name}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Receiver Address"
                    name="receiverAddress"
                    disabled
                    value={orderDetail.ancestor_order.receiver_address}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Receiver Phone"
                    name="receiverPhone"
                    disabled
                    value={orderDetail.ancestor_order.receiver_phone}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Receiver Date"
                    name="receiverDate"
                    disabled
                    value={new Date(
                      orderDetail.ancestor_order.ship_date
                    ).toLocaleString()}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  p: 2,
                  mt: 2,
                }}
              >
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Verify Order
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
}

// ----------------------------------------------------------------------

const ThumbImgStyle = styled("img")(({ theme }) => ({
  width: 64,
  height: 64,
  objectFit: "cover",
  marginRight: theme.spacing(2),
  borderRadius: theme.shape.borderRadiusSm,
}));

// ----------------------------------------------------------------------
function ProductList({ products }) {
  return (
    <TableContainer sx={{ minWidth: 720, my: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">Quantity</TableCell>
            <TableCell align="right">Total Price</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>

        <TableBody>
          {products
            ? products.map((product) => {
                const {
                  _id,
                  product_id,
                  quantity,
                  total,
                  price,
                  product_variation_id,
                } = product;
                return (
                  <TableRow key={_id}>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <ThumbImgStyle
                          alt="product image"
                          src={product_id.thumbnails}
                        />
                        <Box>
                          <Typography
                            noWrap
                            variant="subtitle2"
                            sx={{ maxWidth: 240, mb: 0.5 }}
                          >
                            {product_id.name}
                          </Typography>

                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                            divider={
                              <Divider
                                orientation="vertical"
                                sx={{ height: 14, alignSelf: "center" }}
                              />
                            }
                          >
                            {product_id.variations
                              .find(
                                (variation) =>
                                  variation._id === product_variation_id
                              )
                              .variation_attributes?.map((attribute, index) => (
                                <Typography key={index} variant="body2">
                                  {attribute.variation_name}: {attribute.value}
                                </Typography>
                              ))}
                          </Stack>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell align="left">
                      <Stack>
                        <div> {fCurrency(price)}</div>
                        <div
                          style={{
                            textDecoration: "line-through",
                          }}
                        >
                          {fCurrency(price)}
                        </div>
                      </Stack>
                    </TableCell>

                    <TableCell align="left">{quantity}</TableCell>

                    <TableCell align="right">{fCurrency(total)}</TableCell>
                  </TableRow>
                );
              })
            : null}
          <TableRow key={10}>
            <TableCell></TableCell>

            <TableCell align="left"></TableCell>

            <TableCell align="right">Total: </TableCell>

            <TableCell align="right">
              {fCurrency(
                products.reduce((accum, product) => accum + product.total, 0)
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
