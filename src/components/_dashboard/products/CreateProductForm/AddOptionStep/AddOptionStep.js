/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import React, { useState, useEffect, memo } from "react";
import { useFormikContext } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { difference, remove } from "lodash";
import {
  Stack,
  Table,
  Paper,
  TableRow,
  StepLabel,
  TableCell,
  TableBody,
  TableHead,
  Typography,
  StepContent,
  TableContainer,
} from "@mui/material";

// Utils
import { combineValFrom2Arrs } from "utils/array";
// Constants
import { MAX_DETAIL_IMG_FILES, productDetail } from "constants/steps";
// Component
import FormikRadioBtn from "components/button/FormikRadioBtn";
import FormikTextField from "components/form/formField/FormikTextField";
import FormikMultiSelect from "components/form/formField/FormikMultiSelect";
import DragDropImageInput from "components/form/formField/DragDropImageInput";
import FormikDefaultCheckbox from "components/form/formField/FormikDefaultCheckbox";

import "./styles.css";
import axiosClient from "api/axiosClient";
import { setErrorMsg, setSuccessMsg } from "redux/alert";

function AddOptionStep({
  typeField,
  haveManyOptions,
  attributesField,
  variationAttrField,
}) {
  const { values, setFieldValue } = useFormikContext();
  const [variationAttr, setVariationAttr] = useState([]);
  const [recentVariations, setRecentVariations] = useState({});
  const { selectedCategory } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const fetchRecentVairations = async () => {
    try {
      const res = await axiosClient.get(
        `/api/product/recent-variations/${values.category}`,
      );

      if (res.data.data.isSuccess) {
        dispatch(setSuccessMsg(res.data.data.message));
        setRecentVariations(res.data.data.recentVariations);
      }
    } catch (error) {
      if (error.response.data && error.response.data.message) {
        dispatch(setErrorMsg(error.response.data.message));
      } else console.log(error);
    }
  };

  useEffect(() => {
    if (haveManyOptions === "1") {
      const unselectedAttr = difference(
        values.attributes.map((attr) => attr.name),
        values.variationAttr,
      );

      setFieldValue(
        "attributes",
        remove(values.attributes, (attr) => !unselectedAttr.includes(attr.name)),
      );
      if (values.variationAttr.length === 0) {
        setFieldValue("attributes", []);
        setVariationAttr([]);
      } else {
        const variations = values.variationAttr.map(
          (variation) => recentVariations[variation],
        );

        setVariationAttr(variations);
      }
    }
  }, [haveManyOptions, values.variationAttr]);

  useEffect(() => {
    if (haveManyOptions === "1") {
      fetchRecentVairations();
    }
  }, [haveManyOptions]);

  const generateVariationField = (attributes) => {
    if (attributes.length === 2) {
      setFieldValue(
        "variations",
        combineValFrom2Arrs(attributes[0], attributes[1], (attr1, attr2) => ({
          variation_attributes: [
            { variation_name: attributes[0].name, value: attr1 },
            { variation_name: attributes[1].name, value: attr2 },
          ],
          sku: "",
          price: 0,
          stock: 1,
          images: [],
        })),
      );
    } else if (attributes.length === 1) {
      setFieldValue(
        "variations",
        attributes[0].values.map((attr) => ({
          variation_attributes: [
            { variation_name: attributes[0].name, value: attr },
          ],
          sku: "",
          price: 0,
          stock: 1,
          images: [],
        })),
      );
    }
  };

  useEffect(() => {
    generateVariationField(values.attributes);
  }, [values.attributes]);

  return (
    <section className="add-opt-step">
      <StepLabel>Add option</StepLabel>
      <StepContent>
        <Stack spacing={3}>
          <FormikRadioBtn
            name={typeField.name}
            label={typeField.label}
            options={typeField.options}
            defaultValue={typeField.options[0].value}
          />
          {values.type === "1" ? (
            <>
              <FormikDefaultCheckbox
                type="checkbox"
                name={variationAttrField.name}
                label={variationAttrField.label}
                options={selectedCategory.product_variations}
              />
              {variationAttr.map((attr, index) => (
                <FormikMultiSelect
                  key={attr.variationName}
                  options={attr.options}
                  label={attr.variationName}
                  name={`${attributesField.name}[${[index]}]`}
                  defaultValue={values?.attributes[index]?.values}
                />
              ))}
              {values.variationAttr.length > 0 && (
              <>
                <Typography variant="h6" component="div">
                  List option
                </Typography>
                <TableContainer component={Paper}>
                  <Table
                    sx={{ minWidth: 1024 }}
                    aria-label="variation table"
                  >
                    <TableHead>
                      <TableRow>
                        {values?.attributes?.map(
                          (attribute) => attribute.values?.length > 0 && (
                          <TableCell
                            key={attribute.name}
                            style={{ textTransform: "capitalize" }}
                          >
                            {attribute.name}
                          </TableCell>
                          ),
                        )}
                        {productDetail.map((detail) => (
                          <TableCell
                            width="30%"
                            scope="row"
                            component="th"
                            key={detail.label}
                          >
                            {detail.label}
                            {" "}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {values.variationAttr.length === 2
                            && values.attributes.length === 2
                            && values?.attributes?.[0].values?.map(
                              (attrName, index) => values?.attributes?.[1].values?.map(
                                (otherAttrName, otherIndex) => (
                                  <TableRow
                                    key={`${attrName}-${otherAttrName}`}
                                  >
                                    <TableCell>{attrName}</TableCell>
                                    <TableCell>{otherAttrName}</TableCell>
                                    {productDetail.map((detail) => (
                                      <TableCell
                                        align="right"
                                        key={detail.name}
                                      >
                                        {detail.name === "images" ? (
                                          <DragDropImageInput
                                            maxFiles={MAX_DETAIL_IMG_FILES}
                                            images={
                                                values.variations?.[
                                                  index
                                                  * values?.attributes?.[1]
                                                    .values.length
                                                  + otherIndex
                                                ]?.images
                                              }
                                            name={`variations[${index
                                                * values?.attributes?.[1].values
                                                  .length
                                                + otherIndex
                                            }].${detail.name}`}
                                          />
                                        ) : (
                                          <FormikTextField
                                            fullWidth
                                            variant="standard"
                                            name={`variations[${index
                                                * values?.attributes?.[1].values
                                                  .length
                                                + otherIndex
                                            }].${detail.name}`}
                                          />
                                        )}
                                      </TableCell>
                                    ))}
                                  </TableRow>
                                ),
                              ),
                            )}
                      {values.variationAttr.length === 1
                            && values.attributes.map(
                              (element) => element.name === values.variationAttr[0]
                                && element.values.map((attrName, index) => (
                                  <TableRow key={attrName}>
                                    <TableCell>{attrName}</TableCell>
                                    {productDetail.map((detail) => (detail.name === "images" ? (
                                      <TableCell
                                        align="right"
                                        key={detail.name}
                                      >
                                        <DragDropImageInput
                                          maxFiles={MAX_DETAIL_IMG_FILES}
                                          images={
                                              values.variations[0]?.images
                                            }
                                          name={`variations[${index}].${detail.name}`}
                                        />
                                      </TableCell>
                                    ) : (
                                      <TableCell
                                        align="right"
                                        key={detail.name}
                                      >
                                        <FormikTextField
                                          fullWidth
                                          variant="standard"
                                          name={`variations[${index}].${detail.name}`}
                                        />
                                      </TableCell>
                                    )))}
                                  </TableRow>
                                )),
                            )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
              )}
            </>
          ) : (
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="variation table">
                <TableBody>
                  {productDetail?.map((detail) => (
                    <TableRow
                      key={detail.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        width="30%"
                        scope="row"
                        component="th"
                        key={detail.label}
                      >
                        {detail.label}
                      </TableCell>
                      <TableCell align="right">
                        {detail.name === "images" ? (
                          <DragDropImageInput
                            maxFiles={MAX_DETAIL_IMG_FILES}
                            images={values.variations[0]?.images}
                            // label={thumbnailField.label}
                            name={`variations[0].${detail.name}`}
                          />
                        ) : (
                          <FormikTextField
                            fullWidth
                            variant="standard"
                            name={`variations[0].${detail.name}`}
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Stack>
      </StepContent>
    </section>
  );
}

export default memo(AddOptionStep);
