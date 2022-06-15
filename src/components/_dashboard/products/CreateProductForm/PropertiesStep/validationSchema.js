import * as Yup from "yup";

import { createProductFormModel } from "../createProductFormModel";

const {
  formField: { properties },
} = createProductFormModel;

export const propertiesValidationSchema = Yup.object().shape({
  // eslint-disable-next-line react/forbid-prop-types
  [properties.name]: Yup.object(),
});
