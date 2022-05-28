import React from "react";
import { TextField } from "@mui/material";
import { useField } from "formik";

const FormikTextField = ({ ...props }) => {
  const { ...rest } = props;
  const [field, meta] = useField(props);
  // console.log(meta);

  return (
    <TextField
      type="text"
      {...field}
      {...rest}
      helperText={meta.touched && meta.error}
      error={Boolean(meta.touched && meta.error)}
    />
  );
};

export default FormikTextField;