/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  StepLabel, StepContent, Stack, Skeleton,
} from "@mui/material";

// Mocks
// import { CATEGORIES } from "_mocks_/products";
// Components
import FormikCascader from "components/form/formField/FormikCascader";
import FormikTextField from "components/form/formField/FormikTextField";
import DragDropImageInput from "components/form/formField/DragDropImageInput";
import { productAxios } from "api/axiosClient";
import { setErrorMsg, setSuccessMsg } from "redux/alert";

function GeneralInfoStep({
  nameField,
  descField,
  categoryField,
  thumbnailField,
  thumbnail,
}) {
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const res = await productAxios.get("/api/category");

      if (res.data.data.isSuccess) {
        dispatch(setSuccessMsg(res.data.data.message));
        setCategories(res.data.data.categories);
        setLoadingCategories(false);
      } else {
        dispatch(setErrorMsg("Something was wrong!"));
        setLoadingCategories(false);
      }
    } catch (error) {
      setLoadingCategories(false);
      if (error.response.data && error.response.data.message) {
        dispatch(setErrorMsg(error.response.data.message));
      } else console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // eslint-disable-next-line no-shadow
  const formatCategories = (categories) => categories?.map((category) => {
    if (category.sub_categories?.length > 0) {
      return {
        label: category.category_name,
        value: category._id,
        children: formatCategories(category.sub_categories),
      };
    }
    return {
      label: category.category_name,
      value: category._id,
      product_variations: category.product_variations,
      properties: category.properties,
    };
  });

  return (
    <>
      <StepLabel>General infomation:</StepLabel>
      <StepContent>
        <Stack spacing={3}>
          <FormikTextField
            fullWidth
            label={nameField.label}
            name={nameField.name}
          />
          {loadingCategories ? <Skeleton height={56} /> : (
            <FormikCascader
              name={categoryField.name}
              label={categoryField.label}
              options={formatCategories(categories)}
            />
          )}

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
        </Stack>
      </StepContent>
    </>
  );
}

export default memo(GeneralInfoStep);
