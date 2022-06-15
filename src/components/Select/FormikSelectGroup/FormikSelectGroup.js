import React, { memo } from "react";
import {
  FormControl,
  FormHelperText,
} from "@mui/material";
import { useField, Field } from "formik";
import SelectGroup from "../SelectGroup";

function FormikSelectGroup({ ...props }) {
  // eslint-disable-next-line react/prop-types
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
              onChange={(selectedOption) => helpers.setValue(selectedOption.value)}
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
}

export default memo(FormikSelectGroup);
