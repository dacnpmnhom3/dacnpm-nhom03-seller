import * as Yup from "yup";

import { createProductFormModel } from "../createProductFormModel";

const {
  formField: { name, category, thumbnail },
} = createProductFormModel;

// eslint-disable-next-line import/prefer-default-export
export const generalInfoValidationSchema = Yup.object().shape({
  [name.name]: Yup.string().required(`${name.requiredErrorMsg}`),
  [category.name]: Yup.string().required(`${category.requiredErrorMsg}`),
  [thumbnail.name]: Yup.mixed().required(`${thumbnail.requiredErrorMsg}`),
});
