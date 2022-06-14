import React from "react";
import {
  FormLabel,
  FormGroup,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import { Field } from "formik";

import "./styles.css";

const FormikDefaultCheckbox = ({ ...props }) => {
  const { label, options, ...rest } = props;

  return (
    <FormControl className="formik-default-checkbox">
      <FormLabel>{label}</FormLabel>
      <FormGroup>
        {options.map((option, index) => (
          <FormControlLabel
            key={option}
            label={option}
            control={<Field type="checkbox" name={rest.name} value={option} />}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default FormikDefaultCheckbox;
