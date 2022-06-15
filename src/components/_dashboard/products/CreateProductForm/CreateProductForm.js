/* eslint-disable no-underscore-dangle */
import { useState, useEffect, useCallback } from "react";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Stack, Step, Stepper, Button,
} from "@mui/material";

// Redux
import { setErrorMsg, setSuccessMsg } from "redux/alert";
// Mocks
import { CATEGORIES } from "_mocks_/products";

import { productAxios } from "api/axiosClient";
import {
  initialValues,
  createProductFormModel,
} from "./createProductFormModel";
import AddOptionStep from "./AddOptionStep";
import PropertiesStep from "./PropertiesStep";
import GeneralInfoStep from "./GeneralInfoStep";
import { addOptionValidationSchema } from "./AddOptionStep/validationSchema";
import { propertiesValidationSchema } from "./PropertiesStep/validationSchema";
import { generalInfoValidationSchema } from "./GeneralInfoStep/validationSchema";
// ----------------------------------------------------------------------

export default function CreateProductForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedCategory } = useSelector((state) => state.product);
  // eslint-disable-next-line no-unused-vars
  const [categories, setCategories] = useState([]);
  const { formId, formField } = createProductFormModel;
  const validation = [
    generalInfoValidationSchema,
    propertiesValidationSchema,
    addOptionValidationSchema,
  ];
  const [activeStep, setActiveStep] = useState(0);
  const isLastStep = activeStep === 3 - 1;

  const getCategories = async () => {
    try {
      // const res = await axiosClient.get("/api/products/categories");
      setCategories(CATEGORIES);
    } catch (error) {
      if (error.response.data && error.response.data.message) {
        dispatch(setErrorMsg(error.response.data.message));
      } else console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    selectedCategory?.properties?.map((property) => {
      const subProp = property.sub_properties.map((subPropName) => ({
        [subPropName]: "",
      }));
      // eslint-disable-next-line no-return-assign
      return (initialValues.properties[property._id] = subProp);
    });
  }, [selectedCategory.properties]);

  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }, []);

  const generateVariationField = (attributes) => {
    // eslint-disable-next-line no-empty
    if (attributes.length > 1) {
    } else if (attributes.length === 1) {
      initialValues.variations = attributes[0].map((attr) => ({
        variation_attributes: [attr],
        sku: "",
        price: 0,
        stock: 1,
        images: [],
      }));
    }
  };

  const submitForm = useCallback(
    async (values, actions) => {
      try {
        actions.setSubmitting(true);

        const res = await productAxios.post("/api/product", values, {
          header: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (res.data.data.isSuccess) {
          actions.setSubmitting(false);
          navigate("/dashboard/products");
          dispatch(setSuccessMsg("Add New Product Successfully!"));
        } else {
          actions.setSubmitting(false);
          throw new Error("Something was wrong...");
        }
      } catch (error) {
        if (error.response.data && error.response.data.message) {
          dispatch(setErrorMsg(error.response.data.message));
        } else console.log(error);
        actions.setSubmitting(false);
      }
    },
    [activeStep],
  );

  const handleSubmit = useCallback(
    (values, actions) => {
      if (isLastStep) {
        submitForm(values, actions);
      } else {
        generateVariationField(values.attributes);
        setActiveStep((prevState) => prevState + 1);
        actions.setTouched({});
        actions.setSubmitting(false);
      }
    },
    [isLastStep, submitForm],
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validation[activeStep]}
      onSubmit={handleSubmit}
      // enableReinitialize={true}
    >
      {({ isSubmitting, values }) => (
        <Stack spacing={3}>
          <Form id={formId}>
            <Stepper activeStep={activeStep} orientation="vertical">
              <Step>
                <GeneralInfoStep
                  activeStep={activeStep}
                  nameField={formField.name}
                  descField={formField.desc}
                  thumbnail={values.thumbnail}
                  categoryField={formField.category}
                  thumbnailField={formField.thumbnail}
                />
              </Step>
              <Step>
                <PropertiesStep initialValues={initialValues} />
              </Step>
              <Step>
                <AddOptionStep
                  typeField={formField.type}
                  haveManyOptions={values.type}
                  thumbnail={values.thumbnail}
                  variationsField={formField.variantion}
                  variationAttrField={formField.variationAttr}
                  attributesField={formField.attributes}
                />
              </Step>
            </Stepper>
            <div>
              <LoadingButton
                loading={isSubmitting}
                loadingIndicator="Submitting..."
                type="submit"
                variant="contained"
                sx={{ mt: 1, mr: 1 }}
              >
                {isLastStep ? "Add product" : "Continue"}
              </LoadingButton>
              <Button
                sx={{ mt: 1, mr: 1 }}
                disabled={activeStep === 0 || isSubmitting}
                onClick={handleBack}
              >
                Back
              </Button>
            </div>
          </Form>
        </Stack>
      )}
    </Formik>
  );
}
