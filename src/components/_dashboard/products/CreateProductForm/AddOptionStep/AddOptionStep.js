import React, { useState, useEffect, memo } from "react";
import { useFormikContext } from "formik";
import { useSelector } from "react-redux";
import { difference, remove } from "lodash";
import {
  Stack,
  Table,
  TableRow,
  StepLabel,
  TableCell,
  TableBody,
  TableHead,
  Typography,
  StepContent,
  TableContainer,
} from "@mui/material";

// Constants
import { productDetail } from "constants/steps";
// Mocks
import { COLORS, CAPACITY } from "_mocks_/products";
// Component
import FormikRadioBtn from "components/button/FormikRadioBtn";
import FormikTextField from "components/input/FormikTextField";
import FormikMultiSelect from "components/select/FormikMultiSelect";
import FormikDefaultCheckbox from "components/form/FormikDefaultCheckbox";

import "./styles.css";

const AddOptionStep = ({
  typeField,
  haveManyOptions,
  attributesField,
  variationAttrField,
}) => {
  const { values, setFieldValue } = useFormikContext();
  const [variationAttr, setVariationAttr] = useState([]);
  const { selectedCategory } = useSelector((state) => state.product);

  useEffect(() => {
    if (haveManyOptions === "1") {
      // Call API to get variation attributes
      const unselectedAttr = difference(
        values.attributes.map((attr) => attr.name),
        values.variationAttr
      );

      setFieldValue(
        "attributes",
        remove(values.attributes, (attr) => {
          return !unselectedAttr.includes(attr.name);
        })
      );
      if (values.variationAttr.length === 0) {
        setFieldValue("attributes", []);
        setVariationAttr([]);
      } else {
        setVariationAttr([]);
        if (values.variationAttr.length === 2) {
          if (values.variationAttr[0] === "color") {
            setVariationAttr([COLORS, CAPACITY]);
          } else {
            setVariationAttr([CAPACITY, COLORS]);
          }
        } else if (values.variationAttr[0] === "color") {
          setVariationAttr([COLORS]);
        } else if (values.variationAttr[0] === "capacity") {
          setVariationAttr([CAPACITY]);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [haveManyOptions, values.variationAttr]);

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
              <>
                {values.variationAttr.length > 0 && (
                  <>
                    <Typography variant="h6" component="div">
                      List option
                    </Typography>
                    <TableContainer>
                      <Table
                        sx={{ minWidth: 650 }}
                        aria-label="variation table"
                      >
                        <TableHead>
                          <TableRow>
                            {values?.attributes?.map(
                              (attribute) =>
                                attribute.values?.length > 0 && (
                                  <TableCell
                                    key={attribute.name}
                                    style={{ textTransform: "capitalize" }}
                                  >
                                    {attribute.name}
                                  </TableCell>
                                )
                            )}
                            {productDetail.map((detail) => (
                              <TableCell
                                width="30%"
                                scope="row"
                                component="th"
                                key={detail.label}
                              >
                                {detail.label}{" "}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {values.variationAttr.length === 2 &&
                            values.attributes.length === 2 &&
                            values?.attributes?.[0].values?.map((attrName) =>
                              values?.attributes?.[1].values?.map(
                                (otherAttrName) => (
                                  <TableRow
                                    key={`${attrName}-${otherAttrName}`}
                                  >
                                    <TableCell>{attrName}</TableCell>
                                    <TableCell>{otherAttrName}</TableCell>
                                    {productDetail.map((detail) => (
                                      <TableCell
                                        key={detail.name}
                                        align="right"
                                      >
                                        <FormikTextField
                                          fullWidth
                                          variant="standard"
                                          name={`variations[0].${detail.name}`}
                                        />
                                      </TableCell>
                                    ))}
                                  </TableRow>
                                )
                              )
                            )}
                          {values.variationAttr.length === 1 &&
                            values.attributes.map(
                              (element) =>
                                element.name === values.variationAttr[0] &&
                                element.values.map((attrName) => (
                                  <TableRow key={attrName}>
                                    <TableCell>{attrName}</TableCell>
                                    {productDetail.map((detail) => (
                                      <TableCell
                                        key={detail.name}
                                        align="right"
                                      >
                                        <FormikTextField
                                          fullWidth
                                          variant="standard"
                                          name={`variations[0].${detail.name}`}
                                        />
                                      </TableCell>
                                    ))}
                                  </TableRow>
                                ))
                            )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </>
                )}
              </>
            </>
          ) : (
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="variation table">
                <TableBody>
                  {productDetail.map((detail) => (
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
                        <FormikTextField
                          fullWidth
                          variant="standard"
                          name={`variations[0].${detail.name}`}
                        />
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
};

export default memo(AddOptionStep);
