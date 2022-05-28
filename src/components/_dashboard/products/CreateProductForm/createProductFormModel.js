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
    state: {
      name: "state",
      label: "State/Province/Region",
    },
    zipcode: {
      name: "zipcode",
      label: "Zipcode*",
      requiredErrorMsg: "Zipcode is required",
      invalidErrorMsg: "Zipcode is not valid (e.g. 70000)",
    },
    country: {
      name: "country",
      label: "Country*",
      requiredErrorMsg: "Country is required",
    },
    useAddressForPaymentDetails: {
      name: "useAddressForPaymentDetails",
      label: "Use this address for payment details",
    },
    nameOnCard: {
      name: "nameOnCard",
      label: "Name on card*",
      requiredErrorMsg: "Name on card is required",
    },
    cardNumber: {
      name: "cardNumber",
      label: "Card number*",
      requiredErrorMsg: "Card number is required",
      invalidErrorMsg: "Card number is not valid (e.g. 4111111111111)",
    },
    expiryDate: {
      name: "expiryDate",
      label: "Expiry date*",
      requiredErrorMsg: "Expiry date is required",
      invalidErrorMsg: "Expiry date is not valid",
    },
    cvv: {
      name: "cvv",
      label: "CVV*",
      requiredErrorMsg: "CVV is required",
      invalidErrorMsg: "CVV is invalid (e.g. 357)",
    },
  },
};

const { formField } = createProductFormModel;

export const initialValues = {
  [formField.name.name]: "",
  [formField.category.name]: "",
  [formField.desc.name]: "",
  [formField.type.name]: "",
  // [formField.zipcode.name]: "",
  // [formField.country.name]: "",
  // [formField.useAddressForPaymentDetails.name]: false,
  // [formField.nameOnCard.name]: "",
  // [formField.cardNumber.name]: "",
  // [formField.expiryDate.name]: "",
  // [formField.cvv.name]: "",
};
