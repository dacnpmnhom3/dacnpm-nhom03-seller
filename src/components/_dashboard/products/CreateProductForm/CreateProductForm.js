import { useState, useEffect, useCallback } from "react";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Stack, Step, Stepper, Button } from "@mui/material";

// Redux
import { setErrorMsg } from "redux/alert";
// Mocks
import { CATEGORIES } from "_mocks_/products";

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
  // const RegisterSchema = Yup.object().shape({
  //   name: Yup.string()
  //     .min(10, "Too Short!")
  //     .max(50, "Too Long!")
  //     .required("Name is required"),
  //   desc: Yup.string().optional(),
  //   img: Yup.string().required("Image is required"),
  //   category: Yup.string().required("Category is required"),
  //   price: Yup.number().required(),
  //   stock: Yup.number().required().min(1, "Must greater than or equal 1"),
  // });

  // const formik = useFormik({
  //   initialValues: {
  //     name: "",
  //     desc: "",
  //     img: "",
  //     category: "",
  //     price: 0,
  //     stock: 1,
  //   },
  //   validationSchema: RegisterSchema,
  //   onSubmit: async () => {
  //     try {
  //       console.log(values);
  //       const res = await axiosClient.post("/api/products/", values);
  //       dispatch(setSuccessMsg("Add New Product Successfully!"));
  //     } catch (error) {
  //       if (error.response.data && error.response.data.message) {
  //         dispatch(setErrorMsg(error.response.data.message));
  //       } else console.log(error);
  //     }
  //   },
  // });

  // const { errors, touched, values, handleSubmit, isSubmitting, getFieldProps } =
  //   formik;

  const [categories, setCategories] = useState([]);
  const { formId, formField } = createProductFormModel;
  const validation = [
    generalInfoValidationSchema,
    propertiesValidationSchema,
    addOptionValidationSchema,
  ];
  const [activeStep, setActiveStep] = useState(0);
  const isLastStep = activeStep === 4 - 1;
  const { selectedCategory } = useSelector((state) => state.product);

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    selectedCategory?.properties?.map((property) => {
      const subProp = property.sub_properties.map((subPropName) => ({
        [subPropName]: "",
      }));
      return (initialValues.properties[property._id] = subProp);
    });

    // initialValues.variationAttr = [];
    // selectedCategory?.product_variations?.map(
    //   (variation) => {
    //     return initialValues.variationAttr.push({
    //       name: variation,
    //       values: [],
    //     });
    //   }
    // );
  }, [selectedCategory.properties]);

  // useEffect(() => {
  //   selectedCategory?.properties?.map((property) => {
  //     const subProp = property.sub_properties.map((subPropName) => ({
  //       [subPropName]: "",
  //     }));
  //     return (initialValues.properties[property._id] = subProp);
  //   });

  //   initialValues.variationAttr = [];
  //   selectedCategory?.product_variations?.map(
  //     (variation) => {
  //       return initialValues.variationAttr.push({
  //         name: variation,
  //         values: [],
  //       });
  //     }
  //   );
  // }, []);

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

  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }, []);

  const _submitForm = useCallback(
    (values, actions) => {
      alert(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);

      setActiveStep(activeStep + 1);
    },
    [activeStep]
  );

  const handleSubmit = useCallback((values, actions) => {
    if (isLastStep) {
      _submitForm(values, actions);
    } else {
      console.log(values);
      setActiveStep((prevState) => prevState + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validation[activeStep]}
      onSubmit={handleSubmit}
      // enableReinitialize={true}
    >
      {/* <Form autoComplete="off" noValidate onSubmit={handleSubmit}> */}
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
              <Button type="submit" variant="contained" sx={{ mt: 1, mr: 1 }}>
                {isLastStep ? "Add product" : "Continue"}
              </Button>
              <Button
                sx={{ mt: 1, mr: 1 }}
                disabled={activeStep === 0}
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
