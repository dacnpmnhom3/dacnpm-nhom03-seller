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
    thumbnail: {
      name: "thumbnail",
      label: "Thumbnail",
      requiredErrorMsg: "Thumbnail is required",
    },
    type: {
      name: "type",
      label: "Type of product",
      options: [
        {
          label: "No option",
          value: "0",
        },
        {
          label: "Have many options",
          value: "1",
        },
      ],
      requiredErrorMsg: "Type is required",
    },
    properties: {
      name: "properties",
      label: "Properties",
    },
    variationAttr: {
      name: "variationAttr",
      label: "Variation atributes",
    },
    attributes: {
      name: "attributes",
      label: "Atributes",
    },
    variantion: {
      name: "variations",
      label: "Variations",
    },
  },
};

const { formField } = createProductFormModel;

export const initialValues = {
  [formField.name.name]: "",
  [formField.category.name]: "",
  [formField.desc.name]: "",
  [formField.thumbnail.name]: undefined,
  [formField.type.name]: "0",
  [formField.properties.name]: {},
  [formField.variationAttr.name]: [],
  [formField.variantion.name]: [
    {
      variation_attributes: [],
      sku: "",
      price: 0,
      stock: 1,
      images: [],
    },
  ],
  [formField.attributes.name]: [],
};
