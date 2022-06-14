import React from "react";
import {
  Radio,
  FormLabel,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import { useField } from "formik";

function FormikRadioBtn({ ...props }) {
  const { label, options, ...rest } = props;
  const [field, meta] = useField(props);

  return (
    <FormControl {...rest} error={Boolean(meta.touched && meta.error)}>
      <FormLabel>{label}</FormLabel>
      <RadioGroup row {...field}>
        {options?.map((option) => (
          <FormControlLabel
            key={option.label}
            control={<Radio />}
            value={option.value}
            label={option.label}
          />
        ))}
      </RadioGroup>
      {meta.touched && meta.error && (
        <FormHelperText>{meta.error}</FormHelperText>
      )}
    </FormControl>
  );
}

export default FormikRadioBtn;
