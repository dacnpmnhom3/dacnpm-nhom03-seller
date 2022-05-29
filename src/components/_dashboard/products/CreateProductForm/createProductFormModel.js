export const createProductFormModel = {
  formId: "createProductForm",
  formField: {
    category: {
      name: "category",
      label: "Category",
      requiredErrorMsg: "Category is required",
    },
    name: {
      name: "name",
      label: "Product Name",
      requiredErrorMsg: "Product name is required",
    },
    desc: {
      name: "desc",
      label: "Description (optional)",
    },
    type: {
      name: "type",
      label: "Type of product",
      options: [
        {
          label: "No option",
          value: false,
        },
        {
          label: "Have many options",
          value: true,
        },
      ],
      requiredErrorMsg: "Type is required",
    },
    properties: {
      name: "properties",
      label: "Properties",
    },
    zipcode: {
      name: "zipcode",
      label: "Zipcode*",
      requiredErrorMsg: "Zipcode is required",
      invalidErrorMsg: "Zipcode is not valid (e.g. 70000)",
    },
  },
};

const { formField } = createProductFormModel;

export const initialValues = {
  [formField.name.name]: "",
  [formField.category.name]: "",
  [formField.desc.name]: "",
  [formField.type.name]: false,
  [formField.properties.name]: {},
  // [formField.country.name]: "",
  // [formField.useAddressForPaymentDetails.name]: false,
  // [formField.nameOnCard.name]: "",
  // [formField.cardNumber.name]: "",
  // [formField.expiryDate.name]: "",
  // [formField.cvv.name]: "",
};
