import faker from "faker";
import { sample } from "lodash";
// utils
import { mockImgProduct } from "../utils/mockImages";

// ----------------------------------------------------------------------

const PRODUCT_NAME = [
  "Nike Air Force 1 NDESTRUKT",
  "Nike Space Hippie 04",
  "Nike Air Zoom Pegasus 37 A.I.R. Chaz Bear",
  "Nike Blazer Low 77 Vintage",
  "Nike ZoomX SuperRep Surge",
  "Zoom Freak 2",
  "Nike Air Max Zephyr",
  "Jordan Delta",
  "Air Jordan XXXV PF",
  "Nike Waffle Racer Crater",
  "Kyrie 7 EP Sisterhood",
  "Nike Air Zoom BB NXT",
  "Nike Air Force 1 07 LX",
  "Nike Air Force 1 Shadow SE",
  "Nike Air Zoom Tempo NEXT%",
  "Nike DBreak-Type",
  "Nike Air Max Up",
  "Nike Air Max 270 React ENG",
  "NikeCourt Royale",
  "Nike Air Zoom Pegasus 37 Premium",
  "Nike Air Zoom SuperRep",
  "NikeCourt Royale",
  "Nike React Art3mis",
  "Nike React Infinity Run Flyknit A.I.R. Chaz Bear",
];
const PRODUCT_COLOR = [
  "#00AB55",
  "#000000",
  "#FFFFFF",
  "#FFC0CB",
  "#FF4842",
  "#1890FF",
  "#94D82D",
  "#FFC107",
];

const a = {
  _id: { $oid: "62837fbee3a57b4ebaa3886b" },
  category_name: "Phone",
  icon: "https://cdn.tgdd.vn//content/icon-phone-96x96-2.png",
  ancestor_category: null,
  properties: [
    {
      name: "Model",
      sub_properties: ["Brand", "Series", "Model"],
      _id: { $oid: "62837fbee3a57b4ebaa3886c" },
    },
    {
      name: "Network",
      sub_properties: ["Technology", "Bands & Frequencies"],
      _id: { $oid: "62837fbee3a57b4ebaa3886d" },
    },
    {
      name: "Design",
      sub_properties: [
        "Form Factor",
        "Color",
        "SIM Card Type",
        "Sensors",
        "Audio Connectors",
      ],
      _id: { $oid: "62837fbee3a57b4ebaa3886e" },
    },
  ],
  product_variations: ["color", "capacity"],
  createdAt: { $date: { $numberLong: "1652785086705" } },
  updatedAt: { $date: { $numberLong: "1652785086705" } },
  __v: 0,
};

const CATEGORIES = [
  {
    _id: "62837fbee3a57b4ebaa3886b",
    category_name: "Phone",
    icon: "https://cdn.tgdd.vn//content/icon-phone-96x96-2.png",
    ancestor_category: null,
    properties: [
      {
        name: "Model",
        sub_properties: ["Brand", "Series", "Model"],
        _id: "62837fbee3a57b4ebaa3886c",
      },
      {
        name: "Network",
        sub_properties: ["Technology", "Bands & Frequencies"],
        _id: "62837fbee3a57b4ebaa3886d",
      },
      {
        name: "Design",
        sub_properties: [
          "Form Factor",
          "Color",
          "SIM Card Type",
          "Sensors",
          "Audio Connectors",
        ],
        _id: "62837fbee3a57b4ebaa3886e",
      },
    ],
    product_variations: ["color", "capacity"],
  },
  {
    _id: "62838314e3a57b4ebaa38875",
    category_name: "Accessories",
    icon: "",
    ancestor_category: null,
    properties: [],
    product_variations: [],
    sub_categories: [
      {
        _id: "6283840ae3a57b4ebaa38878",
        category_name: "Sound device",
        icon: "",
        ancestor_category: "6283840ae3a57b4ebaa38878",
        sub_categories: [
          {
            _id: "6283875ee3a57b4ebaa3887d",
            category_name: "Head Phone",
            icon: "",
            ancestor_category: "6283840ae3a57b4ebaa38878",
          },
          {
            _id: "62838ae7e3a57b4ebaa38880",
            category_name: "Speaker",
            icon: "",
            ancestor_category: "6283840ae3a57b4ebaa38878",
          },
        ],
      },
    ],
  },
];

// ----------------------------------------------------------------------

const products = [...Array(24)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id: faker.datatype.uuid(),
    cover: mockImgProduct(setIndex),
    name: PRODUCT_NAME[index],
    price: faker.datatype.number({ min: 4, max: 99, precision: 0.01 }),
    priceSale:
      setIndex % 3
        ? null
        : faker.datatype.number({ min: 19, max: 29, precision: 0.01 }),
    colors:
      (setIndex === 1 && PRODUCT_COLOR.slice(0, 2)) ||
      (setIndex === 2 && PRODUCT_COLOR.slice(1, 3)) ||
      (setIndex === 3 && PRODUCT_COLOR.slice(2, 4)) ||
      (setIndex === 4 && PRODUCT_COLOR.slice(3, 6)) ||
      (setIndex === 23 && PRODUCT_COLOR.slice(4, 6)) ||
      (setIndex === 24 && PRODUCT_COLOR.slice(5, 6)) ||
      PRODUCT_COLOR,
    status: sample(["sale", "new", "", ""]),
  };
});

export default products;
export { CATEGORIES };
