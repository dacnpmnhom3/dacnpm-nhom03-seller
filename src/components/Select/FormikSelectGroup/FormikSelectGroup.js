import React, { memo } from "react";
import {
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  FormHelperText,
} from "@mui/material";
import { useField, Field } from "formik";
import SelectGroup from "../SelectGroup";
import Select from "react-select";

const FormikSelectGroup = ({ ...props }) => {
  const { label, options, ...rest } = props;
  const [field, meta, helpers] = useField(props);

  console.log();

  return (
    <FormControl fullWidth {...field} {...rest}>
      <Field name={rest.name}>
        {() => (
          <>
            <SelectGroup
              options={options}
              placeholder={label}
              selectedValue={meta.value}
              error={Boolean(meta.touched && meta.error)}
              onChange={(selectedOption) =>
                helpers.setValue(selectedOption.value)
              }
              onBlur={helpers.setTouched}
            />
            {meta.touched && meta.error && (
              <FormHelperText>{meta.error}</FormHelperText>
            )}
          </>
        )}
      </Field>
    </FormControl>
  );
};

export default memo(FormikSelectGroup);
