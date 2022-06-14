import React from "react";
import { Select } from "antd";
import { useField } from "formik";
import { FormControl, FormHelperText, FormLabel } from "@mui/material";

const { Option } = Select;
const children = [];

for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

const FormikMultiSelect = (props) => {
  const { label, options, defaultValue, ...rest } = props;
  const [, meta, helpers] = useField(props);

  return (
    <FormControl error={Boolean(meta.touched && meta.error)}>
      <FormLabel sx={{ textTransform: "capitalize" }}>{label}</FormLabel>
      <Select
        mode="tags"
        allowClear
        style={{
          width: "100%",
        }}
        size="large"
        placeholder="Please select"
        defaultValue={defaultValue || []}
        onChange={(value) => {
          helpers.setValue({
            name: label,
            values: value,
          });
        }}
        fieldNames={{ ...rest }}
      >
        {options.map((option, index) => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
      {meta.touched && meta.error && (
        <FormHelperText>{meta.error}</FormHelperText>
      )}
    </FormControl>
  );
};

export default FormikMultiSelect;
