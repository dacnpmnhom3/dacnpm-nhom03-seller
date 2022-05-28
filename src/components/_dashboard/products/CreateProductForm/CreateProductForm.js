import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Form, Formik } from "formik";

// material
import { Stack, Step, Stepper, Button } from "@mui/material";
import { setErrorMsg } from "redux/alert";
import { CATEGORIES } from "_mocks_/products";
import GeneralInfoStep from "./GeneralInfoStep";
import {
  createProductFormModel,
  initialValues,
} from "./createProductFormModel";
import { generalInfoValidationSchema } from "./GeneralInfoStep/validationSchema";
import AddOptionStep from "./AddOptionStep";
import { addOptionValidationSchema } from "./AddOptionStep/validationSchema";
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
  const validation = [generalInfoValidationSchema, addOptionValidationSchema];
  const [activeStep, setActiveStep] = useState(0);
  const isLastStep = activeStep === 3 - 1;

  useEffect(() => {
    getCategories();
  }, []);

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
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validation[activeStep]}
      onSubmit={handleSubmit}
    >
      {/* <Form autoComplete="off" noValidate onSubmit={handleSubmit}> */}
      {({ isSubmitting }) => (
        <Stack spacing={3}>
          <Form id={formId}>
            <Stepper activeStep={activeStep} orientation="vertical">
              <Step>
                <GeneralInfoStep
                  activeStep={activeStep}
                  nameField={formField.name}
                  descField={formField.desc}
                  categoryField={formField.category}
                />
              </Step>
              <Step>
                <AddOptionStep typeField={formField.type} />
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
