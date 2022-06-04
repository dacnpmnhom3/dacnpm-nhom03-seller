import React, { memo } from "react";
import { StepLabel, StepContent, Stack } from "@mui/material";

// Mocks
import { CATEGORIES } from "_mocks_/products";
// Components
import FormikCascader from "components/select/FormikCascader";
import FormikTextField from "components/input/FormikTextField";
import DragDropImageInput from "components/input/DragDropImageInput";

const GeneralInfoStep = ({
  nameField,
  descField,
  categoryField,
  thumbnailField,
  thumbnail,
}) => {
  const formatCategories = (categories) => {
    return categories.map((category) => {
      if (category.sub_categories?.length > 0) {
        return {
          label: category.category_name,
          value: category._id,
          children: formatCategories(category.sub_categories),
        };
      } else {
        return {
          label: category.category_name,
          value: category._id,
          product_variations: category.product_variations,
          properties: category.properties,
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
          <FormikCascader
            name={categoryField.name}
            label={categoryField.label}
            options={formatCategories(CATEGORIES)}
          />
          <FormikTextField
            fullWidth
            label={descField.label}
            name={descField.name}
          />
          <DragDropImageInput
            maxFiles={1}
            images={thumbnail}
            label={thumbnailField.label}
            name={thumbnailField.name}
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
