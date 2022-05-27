import * as Yup from "yup";
import { useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";
// material
import { Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { setErrorMsg, setSuccessMsg } from "src/redux/alert";
import { useDispatch } from "react-redux";
import axiosClient from "src/api/axiosClient";
// ----------------------------------------------------------------------

export default function CreateProductForm() {
  const dispatch = useDispatch();
  const RegisterSchema = Yup.object().shape({
    title: Yup.string()
      .min(10, "Too Short!")
      .max(50, "Too Long!")
      .required("title is required"),
    desc: Yup.string().optional(),
    img: Yup.string().required("image is required"),
    category: Yup.string().required("category is required"),
    price: Yup.number().required(),
    stock: Yup.number().required(),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      desc: "",
      img: "",
      category: "",
      price: 0,
      stock: 0,
    },
    validationSchema: RegisterSchema,
    onSubmit: async () => {
      try {
        const res = await axiosClient.post("/api/products/", {
          title: values.title,
          desc: values.desc,
          img: values.img,
          category: values.category,
          price: values.price,
          stock: values.stock,
        });
        dispatch(setSuccessMsg("Add New Product Successfully!"));
      } catch (error) {
        if (error.response.data && error.response.data.message) {
          dispatch(setErrorMsg(error.response.data.message));
        } else console.log(error);
      }
    },
  });

  const { errors, touched, values, handleSubmit, isSubmitting, getFieldProps } =
    formik;
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="category"
            type="text"
            label="Product Category"
            {...getFieldProps("category")}
            error={Boolean(touched.category && errors.category)}
            helperText={touched.category && errors.category}
          />

          <TextField
            fullWidth
            type="text"
            label="Product Title"
            {...getFieldProps("title")}
            error={Boolean(touched.title && errors.title)}
            helperText={touched.title && errors.title}
          />

          <TextField
            fullWidth
            type="text"
            label="Description"
            {...getFieldProps("desc")}
            error={Boolean(touched.desc && errors.desc)}
            helperText={touched.desc && errors.desc}
          />

          <TextField
            fullWidth
            type="text"
            label="Image Link"
            {...getFieldProps("img")}
            error={Boolean(touched.img && errors.img)}
            helperText={touched.img && errors.img}
          />

          <TextField
            fullWidth
            type="number"
            label="Price"
            {...getFieldProps("price")}
            error={Boolean(touched.price && errors.price)}
            helperText={touched.price && errors.price}
          />

          <TextField
            fullWidth
            type="number"
            label="Stock"
            {...getFieldProps("stock")}
            error={Boolean(touched.stock && errors.stock)}
            helperText={touched.stock && errors.stock}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Add Product
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
