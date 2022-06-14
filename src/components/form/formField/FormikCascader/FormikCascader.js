import React from "react";
import { Cascader } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useField, Field, useFormikContext } from "formik";
import { FormControl, FormHelperText } from "@mui/material";

// Redux
import { setSelectedCategory } from "redux/product";

import "./styles.css";

const FormikCascader = ({ ...props }) => {
  const dispatch = useDispatch();
  const { values } = useFormikContext();
  const [, meta, helpers] = useField(props);
  const { selectedCategory } = useSelector((state) => state.product);
  const { label, options, ...rest } = props;

  return (
    <section className="formik-cascader">
      <FormControl error={Boolean(meta.touched && meta.error)} fullWidth>
        <Field name={rest.name}>
          {() => (
            <>
              <Cascader
                size="large"
                options={options}
                onChange={(value, data) => {
                  helpers.setValue(value[value?.length - 1]);
                  dispatch(setSelectedCategory(data[data.length - 1]));
                }}
                placeholder={label}
                defaultValue={
                  (values.category && selectedCategory.label) || null
                }
                {...rest}
              />
            </>
          )}
        </Field>
        {meta.touched && meta.error && (
          <FormHelperText>{meta.error}</FormHelperText>
        )}
      </FormControl>
    </section>
  );
};

export default FormikCascader;
