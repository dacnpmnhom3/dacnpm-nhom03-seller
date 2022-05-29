import * as Yup from "yup";

import { createProductFormModel } from "../createProductFormModel";

const {
  formField: { properties },
} = createProductFormModel;

export const propertiesValidationSchema = Yup.object().shape({
  [properties.name]: Yup.object(),
});
