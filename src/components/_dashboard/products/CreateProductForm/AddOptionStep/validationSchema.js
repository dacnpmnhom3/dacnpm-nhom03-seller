import * as Yup from "yup";
import { createProductFormModel } from "../createProductFormModel";

const {
  formField: { type },
} = createProductFormModel;

// eslint-disable-next-line import/prefer-default-export
export const addOptionValidationSchema = Yup.object().shape({
  [type.name]: Yup.string().required(`${type.requiredErrorMsg}`),
});
