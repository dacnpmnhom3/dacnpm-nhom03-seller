import * as Yup from "yup";

import { createProductFormModel } from "../createProductFormModel";

const {
  formField: { name, category },
} = createProductFormModel;

export const generalInfoValidationSchema = Yup.object().shape({
  [name.name]: Yup.string().required(`${name.requiredErrorMsg}`),
  [category.name]: Yup.string().required(`${category.requiredErrorMsg}`),
});
