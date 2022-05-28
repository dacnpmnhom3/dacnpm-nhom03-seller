import React, { memo } from "react";
import { StepLabel, StepContent, Stack } from "@mui/material";
import FormikTextField from "components/button/FormikTextField";
import FormikSelectGroup from "components/select/FormikSelectGroup";
import { CATEGORIES } from "_mocks_/products";

const GeneralInfoStep = ({ nameField, categoryField, descField }) => {
  const formatCategories = (categories) => {
    return categories.map((category) => {
      if (category.sub_categories?.length > 0) {
        return {
          label: category.category_name,
          options: category.sub_categories.map((subCategory) => {
            return {
              label: subCategory.category_name,
              value: subCategory._id,
            };
          }),
        };
      } else {
        return {
          label: category.category_name,
          value: category._id,
        };
      }
    });
  };
  return (
    <>
      <StepLabel>General infomation</StepLabel>
      <StepContent>
        <Stack spacing={3}>
          <FormikTextField
            fullWidth
            label={nameField.label}
            name={nameField.name}
          />
          <FormikSelectGroup
            label={categoryField.label}
            name={categoryField.name}
            options={formatCategories(CATEGORIES)}
          />
          <FormikTextField
            fullWidth
            label={descField.label}
            name={descField.name}
          />

          {/* <TextField
              fullWidth
              type="text"
              label="Image Link"
              {...getFieldProps("img")}
              error={Boolean(touched.img && errors.img)}
              helperText={touched.img && errors.img}
            /> */}

          {/* <TextField
              fullWidth
              type="number"
              label="Price"
              {...getFieldProps("price")}
              error={Boolean(touched.price && errors.price)}
              helperText={touched.price && errors.price}
            /> */}

          {/* <TextField
              fullWidth
              type="number"
              label="Stock"
              {...getFieldProps("stock")}
              error={Boolean(touched.stock && errors.stock)}
              helperText={touched.stock && errors.stock}
            /> */}
        </Stack>
      </StepContent>
    </>
  );
};

export default memo(GeneralInfoStep);
