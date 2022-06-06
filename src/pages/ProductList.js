import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { useTheme, styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Table,
  Button,
  TableRow,
  Checkbox,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';
// redux
import { useDispatch, useSelector } from '../redux/store';
import { getProducts, deleteProduct } from '../redux/slices/product';
// utils
import { fDate } from '../utils/formatTime';
import { fCurrency } from '../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../routes/paths';
// hooks
// import useSettings from '../../hooks/useSettings';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
// import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import {
  ProductListHead,
  ProductListToolbar,
  ProductMoreMenu
} from '../components/_dashboard/products/product-list';

// ----------------------------------------------------------------------

// const TABLE_HEAD = [
//   { id: 'name', label: 'Product', alignRight: false },
//   { id: 'createdAt', label: 'Create at', alignRight: false },
//   { id: 'inventoryType', label: 'Status', alignRight: false },
//   { id: 'price', label: 'Price', alignRight: true },
//   { id: '' }
// ];
// const ThumbImgStyle = styled('img')(({ theme }) => ({
//   width: 64,
//   height: 64,
//   objectFit: 'cover',
//   margin: theme.spacing(0, 2),
//   borderRadius: theme.shape.borderRadiusSm
// }));

const TABLE_HEAD = [
  { id: 'name', label: 'Product', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },
  { id: 'properties', label: 'Properties', alignRight: false },
  { id: 'variations', label: 'Variations', alignRight: false },
  // { id: 'price', label: 'Price', alignRight: true },
  { id: 'createdAt', label: 'Create at', alignRight: false },
  { id: '' }
];

const ThumbImgStyle = styled('img')(({ theme }) => ({
  width: 64,
  height: 64,
  objectFit: 'thumbnails',
  margin: theme.spacing(0, 2),
  // borderRadius: theme.shape.borderRadiusSm
}));

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  if (query) {
    return filter(array, (_product) => _product.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }

  return stabilizedThis.map((el) => el[0]);
}

// ----------------------------------------------------------------------

export default function ProductList() {
  // const { themeStretch } = useSettings();
  const theme = useTheme();
  const dispatch = useDispatch();
  // const { products } = useSelector((state) => state.product);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('createdAt');


  const products = [
    {
      "_id": {
        "$oid": "62877c66e5fc83d4bb416dca"
      },
      "name": "Samsung Galaxy S22 Ultra 5G",
      "thumbnails": "https://cdn.tgdd.vn/Products/Images/42/235838/Galaxy-S22-Ultra-Burgundy-600x600.jpg",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque eleifend donec pretium vulputate sapien nec. Non curabitur gravida arcu ac tortor dignissim convallis aenean. Tristique nulla aliquet enim tortor at auctor. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus. Nascetur ridiculus mus mauris vitae ultricies leo integer malesuada nunc. Eros in cursus turpis massa tincidunt dui ut. Lorem sed risus ultricies tristique nulla. Ut faucibus pulvinar elementum integer enim. Adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce ut. Ac odio tempor orci dapibus ultrices in iaculis nunc sed. Egestas fringilla phasellus faucibus scelerisque eleifend donec. Mi eget mauris pharetra et ultrices neque ornare aenean. Ac turpis egestas maecenas pharetra convallis posuere morbi leo. Nunc vel risus commodo viverra maecenas accumsan lacus vel facilisis. Et malesuada fames ac turpis egestas maecenas. Malesuada bibendum arcu vitae elementum curabitur vitae. Ac feugiat sed lectus vestibulum mattis ullamcorper. Eu scelerisque felis imperdiet proin fermentum. Pharetra convallis posuere morbi leo. Nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate. Mattis vulputate enim nulla aliquet porttitor lacus luctus. Sed nisi lacus sed viverra tellus in hac habitasse platea. Eu turpis egestas pretium aenean pharetra magna ac. Dignissim enim sit amet venenatis urna cursus. Ullamcorper a lacus vestibulum sed arcu non odio euismod lacinia. Aliquet nibh praesent tristique magna sit amet. Arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque. Iaculis urna id volutpat lacus laoreet. Id ornare arcu odio ut sem nulla pharetra. Quisque egestas diam in arcu cursus. Tempor orci eu lobortis elementum nibh. Malesuada bibendum arcu vitae elementum curabitur vitae nunc sed. Sed risus ultricies tristique nulla aliquet enim. At erat pellentesque adipiscing commodo elit at imperdiet dui accumsan. Quis auctor elit sed vulputate mi sit amet mauris commodo. Quam vulputate dignissim suspendisse in est ante in nibh mauris.",
      "properties": [
        {
          "property_name": "Model",
          "property_value": [
            {
              "sub_property": "Brand",
              "value": "Samsung",
              "_id": {
                "$oid": "62877c66e5fc83d4bb416dcc"
              }
            },
            {
              "sub_property": "Series",
              "value": "Galaxy S22",
              "_id": {
                "$oid": "62877c66e5fc83d4bb416dcd"
              }
            },
            {
              "sub_property": "Model",
              "value": "SM-S901UZKAXAA",
              "_id": {
                "$oid": "62877c66e5fc83d4bb416dce"
              }
            }
          ],
          "_id": {
            "$oid": "62877c66e5fc83d4bb416dcb"
          }
        },
        {
          "property_name": "Network",
          "property_value": [
            {
              "sub_property": "Technology",
              "value": "5G",
              "_id": {
                "$oid": "62877c66e5fc83d4bb416dd0"
              }
            },
            {
              "sub_property": "Bands & Frequencies",
              "value": "2G GSM: GSM850, GSM900, DCS1800, PCS1900, 3G UMTS: B1(2100), B2(1900), B4(AWS), B5(850), B8(900), 4G FDD LTE: B1(2100), B2(1900), B3(1800), B4(AWS), B5(850), B7(2600), B8(900), B12(700), B13(700), B14(700), B18(800), B19(800), B20(800), B25(1900), B26(850), B28(700), B29(700), B30(2300), B66(AWS-3), B71(600) 4G TDD LTE: B38(2600), B39(1900), B40(2300), B41(2500), B46(5200), B48(3600) 5G FDD Sub6: N1(2100), N3(1800), N5(850), N7(2600), N8(900), N20(800), N28(700), N66(AWS-3), N71(600) 5G TDD Sub6: N260(39GHz), N261(28GHz) 5G TDD mmWave: N38(2600), N41(2500)",
              "_id": {
                "$oid": "62877c66e5fc83d4bb416dd1"
              }
            }
          ],
          "_id": {
            "$oid": "62877c66e5fc83d4bb416dcf"
          }
        },
        {
          "property_name": "Design",
          "property_value": [
            {
              "sub_property": "Form Factor",
              "value": "Smart Phones",
              "_id": {
                "$oid": "62877c66e5fc83d4bb416dd3"
              }
            },
            {
              "sub_property": "Color",
              "value": null,
              "_id": {
                "$oid": "62877c66e5fc83d4bb416dd4"
              }
            },
            {
              "sub_property": "SIM Card type",
              "value": "Nano SIM",
              "_id": {
                "$oid": "62877c66e5fc83d4bb416dd5"
              }
            },
            {
              "sub_property": "Sensors",
              "value": "Accelerometer, Barometer, Fingerprint Sensor, Gyro Sensor, Geomagnetic Sensor, Hall Sensor, Light Sensor, Proximity Sensor",
              "_id": {
                "$oid": "62877c66e5fc83d4bb416dd6"
              }
            },
            {
              "sub_property": "Audio Connectors",
              "value": "USB Type-C",
              "_id": {
                "$oid": "62877c66e5fc83d4bb416dd7"
              }
            }
          ],
          "_id": {
            "$oid": "62877c66e5fc83d4bb416dd2"
          }
        }
      ],
      "variations": [
        {
          "variation_attributes": [
            {
              "variation_name": "color",
              "value": "red",
              "_id": {
                "$oid": "62877c66e5fc83d4bb416dd9"
              }
            },
            {
              "variation_name": "capacity",
              "value": "128GB",
              "_id": {
                "$oid": "62877c66e5fc83d4bb416dda"
              }
            }
          ],
          "sku": "",
          "price": 30990000,
          "stock": 10,
          "images": [
            "https://cdn.tgdd.vn/Products/Images/42/235838/samsung-galaxy-s22-ultra-1-1.jpg",
            "https://cdn.tgdd.vn/Products/Images/42/235838/samsung-galaxy-s22-ultra-2-1.jpg",
            "https://cdn.tgdd.vn/Products/Images/42/235838/samsung-galaxy-s22-ultra-3-1.jpg",
            "https://cdn.tgdd.vn/Products/Images/42/235838/samsung-galaxy-s22-ultra-5-1.jpg"
          ],
          "_id": {
            "$oid": "62877c66e5fc83d4bb416dd8"
          }
        },
        {
          "variation_attributes": [
            {
              "variation_name": "color",
              "value": "red",
              "_id": {
                "$oid": "62877c66e5fc83d4bb416ddc"
              }
            },
            {
              "variation_name": "capacity",
              "value": "256GB",
              "_id": {
                "$oid": "62877c66e5fc83d4bb416ddd"
              }
            }
          ],
          "sku": "",
          "price": 33990000,
          "stock": 9,
          "images": [
            "https://cdn.tgdd.vn/Products/Images/42/235838/samsung-galaxy-s22-ultra-1-1.jpg",
            "https://cdn.tgdd.vn/Products/Images/42/235838/samsung-galaxy-s22-ultra-2-1.jpg",
            "https://cdn.tgdd.vn/Products/Images/42/235838/samsung-galaxy-s22-ultra-3-1.jpg",
            "https://cdn.tgdd.vn/Products/Images/42/235838/samsung-galaxy-s22-ultra-5-1.jpg"
          ],
          "_id": {
            "$oid": "62877c66e5fc83d4bb416ddb"
          }
        },
        {
          "variation_attributes": [
            {
              "variation_name": "color",
              "value": "red",
              "_id": {
                "$oid": "62877c66e5fc83d4bb416ddf"
              }
            },
            {
              "variation_name": "capacity",
              "value": "512GB",
              "_id": {
                "$oid": "62877c66e5fc83d4bb416de0"
              }
            }
          ],
          "sku": "",
          "price": 36990000,
          "stock": 8,
          "images": [
            "https://cdn.tgdd.vn/Products/Images/42/235838/samsung-galaxy-s22-ultra-1-1.jpg",
            "https://cdn.tgdd.vn/Products/Images/42/235838/samsung-galaxy-s22-ultra-2-1.jpg",
            "https://cdn.tgdd.vn/Products/Images/42/235838/samsung-galaxy-s22-ultra-3-1.jpg",
            "https://cdn.tgdd.vn/Products/Images/42/235838/samsung-galaxy-s22-ultra-5-1.jpg"
          ],
          "_id": {
            "$oid": "62877c66e5fc83d4bb416dde"
          }
        },
        {
          "variation_attributes": [
            {
              "variation_name": "color",
              "value": "white",
              "_id": {
                "$oid": "62877c66e5fc83d4bb416de2"
              }
            },
            {
              "variation_name": "capacity",
              "value": "128GB",
              "_id": {
                "$oid": "62877c66e5fc83d4bb416de3"
              }
            }
          ],
          "sku": "",
          "price": 30990000,
          "stock": 10,
          "images": [
            "https://cdn.tgdd.vn/Products/Images/42/235838/galaxy-s22-ultra-white-1.jpg",
            "https://cdn.tgdd.vn/Products/Images/42/235838/galaxy-s22-ultra-white-2.jpg",
            "https://cdn.tgdd.vn/Products/Images/42/235838/galaxy-s22-ultra-white-3.jpg",
            "https://cdn.tgdd.vn/Products/Images/42/235838/galaxy-s22-ultra-white-4.jpg"
          ],
          "_id": {
            "$oid": "62877c66e5fc83d4bb416de1"
          }
        },
        {
          "variation_attributes": [
            {
              "variation_name": "color",
              "value": "white",
              "_id": {
                "$oid": "62877c66e5fc83d4bb416de5"
              }
            },
            {
              "variation_name": "capacity",
              "value": "256GB",
              "_id": {
                "$oid": "62877c66e5fc83d4bb416de6"
              }
            }
          ],
          "sku": "",
          "price": 33990000,
          "stock": 9,
          "images": [
            "https://cdn.tgdd.vn/Products/Images/42/235838/galaxy-s22-ultra-white-1.jpg",
            "https://cdn.tgdd.vn/Products/Images/42/235838/galaxy-s22-ultra-white-2.jpg",
            "https://cdn.tgdd.vn/Products/Images/42/235838/galaxy-s22-ultra-white-3.jpg",
            "https://cdn.tgdd.vn/Products/Images/42/235838/galaxy-s22-ultra-white-4.jpg"
          ],
          "_id": {
            "$oid": "62877c66e5fc83d4bb416de4"
          }
        },
        {
          "variation_attributes": [
            {
              "variation_name": "color",
              "value": "white",
              "_id": {
                "$oid": "62877c66e5fc83d4bb416de8"
              }
            },
            {
              "variation_name": "capacity",
              "value": "512GB",
              "_id": {
                "$oid": "62877c66e5fc83d4bb416de9"
              }
            }
          ],
          "sku": "",
          "price": 36990000,
          "stock": 9,
          "images": [
            "https://cdn.tgdd.vn/Products/Images/42/235838/galaxy-s22-ultra-white-1.jpg",
            "https://cdn.tgdd.vn/Products/Images/42/235838/galaxy-s22-ultra-white-2.jpg",
            "https://cdn.tgdd.vn/Products/Images/42/235838/galaxy-s22-ultra-white-3.jpg",
            "https://cdn.tgdd.vn/Products/Images/42/235838/galaxy-s22-ultra-white-4.jpg"
          ],
          "_id": {
            "$oid": "62877c66e5fc83d4bb416de7"
          }
        },
        {
          "variation_attributes": [
            {
              "variation_name": "color",
              "value": "black",
              "_id": {
                "$oid": "62877c66e5fc83d4bb416deb"
              }
            },
            {
              "variation_name": "capacity",
              "value": "128GB",
              "_id": {
                "$oid": "62877c66e5fc83d4bb416dec"
              }
            }
          ],
          "sku": "",
          "price": 30990000,
          "stock": 5,
          "images": [
            "https://cdn.tgdd.vn/Products/Images/42/235838/galaxy-s22-ultra-black-1.jpg",
            "https://cdn.tgdd.vn/Products/Images/42/235838/galaxy-s22-ultra-black-2.jpg",
            "https://cdn.tgdd.vn/Products/Images/42/235838/galaxy-s22-ultra-black-3.jpg",
            "https://cdn.tgdd.vn/Products/Images/42/235838/galaxy-s22-ultra-black-4.jpg"
          ],
          "_id": {
            "$oid": "62877c66e5fc83d4bb416dea"
          }
        },
        {
          "variation_attributes": [
            {
              "variation_name": "color",
              "value": "black",
              "_id": {
                "$oid": "62877c66e5fc83d4bb416dee"
              }
            },
            {
              "variation_name": "capacity",
              "value": "256GB",
              "_id": {
                "$oid": "62877c66e5fc83d4bb416def"
              }
            }
          ],
          "sku": "",
          "price": 33990000,
          "stock": 6,
          "images": [
            "https://cdn.tgdd.vn/Products/Images/42/235838/galaxy-s22-ultra-black-1.jpg",
            "https://cdn.tgdd.vn/Products/Images/42/235838/galaxy-s22-ultra-black-2.jpg",
            "https://cdn.tgdd.vn/Products/Images/42/235838/galaxy-s22-ultra-black-3.jpg",
            "https://cdn.tgdd.vn/Products/Images/42/235838/galaxy-s22-ultra-black-4.jpg"
          ],
          "_id": {
            "$oid": "62877c66e5fc83d4bb416ded"
          }
        },
        {
          "variation_attributes": [
            {
              "variation_name": "color",
              "value": "black",
              "_id": {
                "$oid": "62877c66e5fc83d4bb416df1"
              }
            },
            {
              "variation_name": "capacity",
              "value": "512GB",
              "_id": {
                "$oid": "62877c66e5fc83d4bb416df2"
              }
            }
          ],
          "sku": "",
          "price": 36990000,
          "stock": 3,
          "images": [
            "https://cdn.tgdd.vn/Products/Images/42/235838/galaxy-s22-ultra-black-1.jpg",
            "https://cdn.tgdd.vn/Products/Images/42/235838/galaxy-s22-ultra-black-2.jpg",
            "https://cdn.tgdd.vn/Products/Images/42/235838/galaxy-s22-ultra-black-3.jpg",
            "https://cdn.tgdd.vn/Products/Images/42/235838/galaxy-s22-ultra-black-4.jpg"
          ],
          "_id": {
            "$oid": "62877c66e5fc83d4bb416df0"
          }
        }
      ],
      "category_id": {
        "$oid": "62837fbee3a57b4ebaa3886b"
      },
      "discount_id": {
        "$oid": "6283a996ee556881d3d58763"
      },
      "store_id": {
        "$oid": "6283b03d3fc679d539d9f3eb"
      },
      "status": "pending",
      "is_published": true,
      "createdAt": {
        "$date": "2022-05-20T11:32:54.872Z"
      },
      "updatedAt": {
        "$date": "2022-05-30T18:17:35.110Z"
      },
      "__v": 0
    },
    {
      "_id": {
        "$oid": "6287839be5fc83d4bb416e74"
      },
      "name": "iPad Pro M1 12.9 inch 5G",
      "thumbnails": "https://cdn.tgdd.vn/Products/Images/522/238649/ipad-pro-2021-129-inch-gray-600x600.jpg",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque eleifend donec pretium vulputate sapien nec. Non curabitur gravida arcu ac tortor dignissim convallis aenean. Tristique nulla aliquet enim tortor at auctor. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus. Nascetur ridiculus mus mauris vitae ultricies leo integer malesuada nunc. Eros in cursus turpis massa tincidunt dui ut. Lorem sed risus ultricies tristique nulla. Ut faucibus pulvinar elementum integer enim. Adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce ut. Ac odio tempor orci dapibus ultrices in iaculis nunc sed. Egestas fringilla phasellus faucibus scelerisque eleifend donec. Mi eget mauris pharetra et ultrices neque ornare aenean. Ac turpis egestas maecenas pharetra convallis posuere morbi leo. Nunc vel risus commodo viverra maecenas accumsan lacus vel facilisis. Et malesuada fames ac turpis egestas maecenas. Malesuada bibendum arcu vitae elementum curabitur vitae. Ac feugiat sed lectus vestibulum mattis ullamcorper. Eu scelerisque felis imperdiet proin fermentum. Pharetra convallis posuere morbi leo. Nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate. Mattis vulputate enim nulla aliquet porttitor lacus luctus. Sed nisi lacus sed viverra tellus in hac habitasse platea. Eu turpis egestas pretium aenean pharetra magna ac. Dignissim enim sit amet venenatis urna cursus. Ullamcorper a lacus vestibulum sed arcu non odio euismod lacinia. Aliquet nibh praesent tristique magna sit amet. Arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque. Iaculis urna id volutpat lacus laoreet. Id ornare arcu odio ut sem nulla pharetra. Quisque egestas diam in arcu cursus. Tempor orci eu lobortis elementum nibh. Malesuada bibendum arcu vitae elementum curabitur vitae nunc sed. Sed risus ultricies tristique nulla aliquet enim. At erat pellentesque adipiscing commodo elit at imperdiet dui accumsan. Quis auctor elit sed vulputate mi sit amet mauris commodo. Quam vulputate dignissim suspendisse in est ante in nibh mauris.",
      "properties": [
        {
          "property_name": "Màn hình",
          "property_value": [
            {
              "sub_property": "Công nghệ màn hình",
              "value": "Liquid Retina XDR mini-LED LCD",
              "_id": {
                "$oid": "6287839be5fc83d4bb416e76"
              }
            },
            {
              "sub_property": "Độ phân giải",
              "value": "2048 x 2732 Pixels",
              "_id": {
                "$oid": "6287839be5fc83d4bb416e77"
              }
            },
            {
              "sub_property": "Màn hình rộng",
              "value": "12.9' - Tần số quét 120 Hz",
              "_id": {
                "$oid": "6287839be5fc83d4bb416e78"
              }
            }
          ],
          "_id": {
            "$oid": "6287839be5fc83d4bb416e75"
          }
        },
        {
          "property_name": "Hệ điều hành & CPU",
          "property_value": [
            {
              "sub_property": "Hệ điều hành",
              "value": "iPadOS 15",
              "_id": {
                "$oid": "6287839be5fc83d4bb416e7a"
              }
            },
            {
              "sub_property": "Chip xử lý (CPU)",
              "value": "Apple M1 8 nhân",
              "_id": {
                "$oid": "6287839be5fc83d4bb416e7b"
              }
            },
            {
              "sub_property": "Tốc độ CPU",
              "value": "Hãng không công bố",
              "_id": {
                "$oid": "6287839be5fc83d4bb416e7c"
              }
            },
            {
              "sub_property": "Chip đồ họa (GPU)",
              "value": "Apple GPU 8 nhân",
              "_id": {
                "$oid": "6287839be5fc83d4bb416e7d"
              }
            }
          ],
          "_id": {
            "$oid": "6287839be5fc83d4bb416e79"
          }
        },
        {
          "property_name": "Bộ nhớ & Lưu trữ",
          "property_value": [
            {
              "sub_property": "RAM",
              "value": "8 GB",
              "_id": {
                "$oid": "6287839be5fc83d4bb416e7f"
              }
            },
            {
              "sub_property": "Bộ nhớ trong",
              "value": "256 GB",
              "_id": {
                "$oid": "6287839be5fc83d4bb416e80"
              }
            },
            {
              "sub_property": "Bộ nhớ khả dụng",
              "value": "241 GB",
              "_id": {
                "$oid": "6287839be5fc83d4bb416e81"
              }
            }
          ],
          "_id": {
            "$oid": "6287839be5fc83d4bb416e7e"
          }
        }
      ],
      "variations": [
        {
          "variation_attributes": [
            {
              "variation_name": "color",
              "value": "xám",
              "_id": {
                "$oid": "6287839be5fc83d4bb416e83"
              }
            },
            {
              "variation_name": "capacity",
              "value": "256GB",
              "_id": {
                "$oid": "6287839be5fc83d4bb416e84"
              }
            }
          ],
          "sku": "",
          "price": 34990000,
          "stock": 3,
          "images": [
            "https://cdn.tgdd.vn/Products/Images/522/238649/ipad-pro-m1-129-inch-wifi-cellular--1.jpg",
            "https://cdn.tgdd.vn/Products/Images/522/238649/ipad-pro-m1-129-inch-wifi-cellular--2.jpg",
            "https://cdn.tgdd.vn/Products/Images/522/238649/ipad-pro-m1-129-inch-wifi-cellular--3.jpg",
            "https://cdn.tgdd.vn/Products/Images/522/238649/ipad-pro-m1-129-inch-wifi-cellular--4.jpg"
          ],
          "_id": {
            "$oid": "6287839be5fc83d4bb416e82"
          }
        },
        {
          "variation_attributes": [
            {
              "variation_name": "color",
              "value": "xám",
              "_id": {
                "$oid": "6287839be5fc83d4bb416e86"
              }
            },
            {
              "variation_name": "capacity",
              "value": "512GB",
              "_id": {
                "$oid": "6287839be5fc83d4bb416e87"
              }
            }
          ],
          "sku": "",
          "price": 40190000,
          "stock": 2,
          "images": [
            "https://cdn.tgdd.vn/Products/Images/522/238649/ipad-pro-m1-129-inch-wifi-cellular--1.jpg",
            "https://cdn.tgdd.vn/Products/Images/522/238649/ipad-pro-m1-129-inch-wifi-cellular--2.jpg",
            "https://cdn.tgdd.vn/Products/Images/522/238649/ipad-pro-m1-129-inch-wifi-cellular--3.jpg",
            "https://cdn.tgdd.vn/Products/Images/522/238649/ipad-pro-m1-129-inch-wifi-cellular--4.jpg"
          ],
          "_id": {
            "$oid": "6287839be5fc83d4bb416e85"
          }
        },
        {
          "variation_attributes": [
            {
              "variation_name": "color",
              "value": "xám",
              "_id": {
                "$oid": "6287839be5fc83d4bb416e89"
              }
            },
            {
              "variation_name": "capacity",
              "value": "1TB",
              "_id": {
                "$oid": "6287839be5fc83d4bb416e8a"
              }
            }
          ],
          "sku": "",
          "price": 53990000,
          "stock": 3,
          "images": [
            "https://cdn.tgdd.vn/Products/Images/522/238649/ipad-pro-m1-129-inch-wifi-cellular--1.jpg",
            "https://cdn.tgdd.vn/Products/Images/522/238649/ipad-pro-m1-129-inch-wifi-cellular--2.jpg",
            "https://cdn.tgdd.vn/Products/Images/522/238649/ipad-pro-m1-129-inch-wifi-cellular--3.jpg",
            "https://cdn.tgdd.vn/Products/Images/522/238649/ipad-pro-m1-129-inch-wifi-cellular--4.jpg"
          ],
          "_id": {
            "$oid": "6287839be5fc83d4bb416e88"
          }
        },
        {
          "variation_attributes": [
            {
              "variation_name": "color",
              "value": "bạc",
              "_id": {
                "$oid": "6287839be5fc83d4bb416e8c"
              }
            },
            {
              "variation_name": "capacity",
              "value": "256GB",
              "_id": {
                "$oid": "6287839be5fc83d4bb416e8d"
              }
            }
          ],
          "sku": "",
          "price": 34990000,
          "stock": 3,
          "images": [
            "https://cdn.tgdd.vn/Products/Images/522/269333/ipad-pro-m1-129-inch-wifi-cellular-128gb-2021-1.jpg",
            "https://cdn.tgdd.vn/Products/Images/522/269333/ipad-pro-m1-129-inch-wifi-cellular-128gb-2021-2.jpg",
            "//cdn.tgdd.vn/Products/Images/522/269333/ipad-pro-m1-129-inch-wifi-cellular-128gb-2021-3.jpg",
            "https://cdn.tgdd.vn/Products/Images/522/269333/ipad-pro-m1-129-inch-wifi-cellular-128gb-2021-4.jpg"
          ],
          "_id": {
            "$oid": "6287839be5fc83d4bb416e8b"
          }
        },
        {
          "variation_attributes": [
            {
              "variation_name": "color",
              "value": "bạc",
              "_id": {
                "$oid": "6287839be5fc83d4bb416e8f"
              }
            },
            {
              "variation_name": "capacity",
              "value": "512GB",
              "_id": {
                "$oid": "6287839be5fc83d4bb416e90"
              }
            }
          ],
          "sku": "",
          "price": 40190000,
          "stock": 2,
          "images": [
            "https://cdn.tgdd.vn/Products/Images/522/269333/ipad-pro-m1-129-inch-wifi-cellular-128gb-2021-1.jpg",
            "https://cdn.tgdd.vn/Products/Images/522/269333/ipad-pro-m1-129-inch-wifi-cellular-128gb-2021-2.jpg",
            "//cdn.tgdd.vn/Products/Images/522/269333/ipad-pro-m1-129-inch-wifi-cellular-128gb-2021-3.jpg",
            "https://cdn.tgdd.vn/Products/Images/522/269333/ipad-pro-m1-129-inch-wifi-cellular-128gb-2021-4.jpg"
          ],
          "_id": {
            "$oid": "6287839be5fc83d4bb416e8e"
          }
        },
        {
          "variation_attributes": [
            {
              "variation_name": "color",
              "value": "bạc",
              "_id": {
                "$oid": "6287839be5fc83d4bb416e92"
              }
            },
            {
              "variation_name": "capacity",
              "value": "1TB",
              "_id": {
                "$oid": "6287839be5fc83d4bb416e93"
              }
            }
          ],
          "sku": "",
          "price": 53990000,
          "stock": 1,
          "images": [
            "https://cdn.tgdd.vn/Products/Images/522/269333/ipad-pro-m1-129-inch-wifi-cellular-128gb-2021-1.jpg",
            "https://cdn.tgdd.vn/Products/Images/522/269333/ipad-pro-m1-129-inch-wifi-cellular-128gb-2021-2.jpg",
            "//cdn.tgdd.vn/Products/Images/522/269333/ipad-pro-m1-129-inch-wifi-cellular-128gb-2021-3.jpg",
            "https://cdn.tgdd.vn/Products/Images/522/269333/ipad-pro-m1-129-inch-wifi-cellular-128gb-2021-4.jpg"
          ],
          "_id": {
            "$oid": "6287839be5fc83d4bb416e91"
          }
        }
      ],
      "category_id": {
        "$oid": "6283823fe3a57b4ebaa38870"
      },
      "discount_id": {
        "$oid": "6283aa10ee556881d3d58765"
      },
      "store_id": {
        "$oid": "6283af283fc679d539d9f3e6"
      },
      "status": "pending",
      "is_published": true,
      "createdAt": {
        "$date": "2022-05-20T12:03:39.348Z"
      },
      "updatedAt": {
        "$date": "2022-05-30T18:16:11.303Z"
      },
      "__v": 0
    },
    {
      "_id": {
        "$oid": "6287869fe5fc83d4bb416eaa"
      },
      "name": "Loa Bluetooth JBL Charge 5",
      "thumbnails": "https://cdn.tgdd.vn/Products/Images/2162/251230/bluetooth-jbl-charge-5-ava-600x600.jpg",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque eleifend donec pretium vulputate sapien nec. Non curabitur gravida arcu ac tortor dignissim convallis aenean. Tristique nulla aliquet enim tortor at auctor. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus. Nascetur ridiculus mus mauris vitae ultricies leo integer malesuada nunc. Eros in cursus turpis massa tincidunt dui ut. Lorem sed risus ultricies tristique nulla. Ut faucibus pulvinar elementum integer enim. Adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce ut. Ac odio tempor orci dapibus ultrices in iaculis nunc sed. Egestas fringilla phasellus faucibus scelerisque eleifend donec. Mi eget mauris pharetra et ultrices neque ornare aenean. Ac turpis egestas maecenas pharetra convallis posuere morbi leo. Nunc vel risus commodo viverra maecenas accumsan lacus vel facilisis. Et malesuada fames ac turpis egestas maecenas. Malesuada bibendum arcu vitae elementum curabitur vitae. Ac feugiat sed lectus vestibulum mattis ullamcorper. Eu scelerisque felis imperdiet proin fermentum. Pharetra convallis posuere morbi leo. Nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate. Mattis vulputate enim nulla aliquet porttitor lacus luctus. Sed nisi lacus sed viverra tellus in hac habitasse platea. Eu turpis egestas pretium aenean pharetra magna ac. Dignissim enim sit amet venenatis urna cursus. Ullamcorper a lacus vestibulum sed arcu non odio euismod lacinia. Aliquet nibh praesent tristique magna sit amet. Arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque. Iaculis urna id volutpat lacus laoreet. Id ornare arcu odio ut sem nulla pharetra. Quisque egestas diam in arcu cursus. Tempor orci eu lobortis elementum nibh. Malesuada bibendum arcu vitae elementum curabitur vitae nunc sed. Sed risus ultricies tristique nulla aliquet enim. At erat pellentesque adipiscing commodo elit at imperdiet dui accumsan. Quis auctor elit sed vulputate mi sit amet mauris commodo. Quam vulputate dignissim suspendisse in est ante in nibh mauris.",
      "properties": [
        {
          "property_name": "Thông tin chung",
          "property_value": [
            {
              "sub_property": "Loại sản phẩm",
              "value": "Loa bluetooth",
              "_id": {
                "$oid": "6287869fe5fc83d4bb416eac"
              }
            },
            {
              "sub_property": "Tổng công suất",
              "value": "40 W",
              "_id": {
                "$oid": "6287869fe5fc83d4bb416ead"
              }
            },
            {
              "sub_property": "Nguồn",
              "value": "Pin",
              "_id": {
                "$oid": "6287869fe5fc83d4bb416eae"
              }
            },
            {
              "sub_property": "Thời gian sử dụng",
              "value": "Dùng khoảng 20 tiếng",
              "_id": {
                "$oid": "6287869fe5fc83d4bb416eaf"
              }
            },
            {
              "sub_property": "Thời gian sạc",
              "value": "Sạc khoảng 4 tiếng",
              "_id": {
                "$oid": "6287869fe5fc83d4bb416eb0"
              }
            },
            {
              "sub_property": "Công nghệ âm thanh",
              "value": "1 Loa trầm -1 Loa tweeter",
              "_id": {
                "$oid": "6287869fe5fc83d4bb416eb1"
              }
            },
            {
              "sub_property": "Tiện ích",
              "value": "Chống nước, chống bụi IP67, Kết nối cùng lúc 2 loa, Sạc được cho thiết bị khác (cổng USB)",
              "_id": {
                "$oid": "6287869fe5fc83d4bb416eb2"
              }
            }
          ],
          "_id": {
            "$oid": "6287869fe5fc83d4bb416eab"
          }
        },
        {
          "property_name": "Kết nối",
          "property_value": [
            {
              "sub_property": "Kết nối không dây",
              "value": "Bluetooth 5.1",
              "_id": {
                "$oid": "6287869fe5fc83d4bb416eb4"
              }
            },
            {
              "sub_property": "Kết nối khác",
              "value": "USB",
              "_id": {
                "$oid": "6287869fe5fc83d4bb416eb5"
              }
            },
            {
              "sub_property": "Điều khiển bằng điện thoại",
              "value": "Có",
              "_id": {
                "$oid": "6287869fe5fc83d4bb416eb6"
              }
            },
            {
              "sub_property": "Khoảng cách kết nối tối đa",
              "value": "10 m",
              "_id": {
                "$oid": "6287869fe5fc83d4bb416eb7"
              }
            }
          ],
          "_id": {
            "$oid": "6287869fe5fc83d4bb416eb3"
          }
        },
        {
          "property_name": "Thông tin sản phẩm",
          "property_value": [
            {
              "sub_property": "Loa chính",
              "value": "Dài 22.3 cm - Rộng 9.4 cm - Cao 9.6 cm - Nặng 0.96 Kg",
              "_id": {
                "$oid": "6287869fe5fc83d4bb416eb9"
              }
            },
            {
              "sub_property": "Chất liệu",
              "value": "Chất liệu nhựa cao cấp và sợi tổng hợp dệt",
              "_id": {
                "$oid": "6287869fe5fc83d4bb416eba"
              }
            },
            {
              "sub_property": "Thương hiệu",
              "value": "Mỹ",
              "_id": {
                "$oid": "6287869fe5fc83d4bb416ebb"
              }
            },
            {
              "sub_property": "Sản xuất",
              "value": "Trung Quốc",
              "_id": {
                "$oid": "6287869fe5fc83d4bb416ebc"
              }
            },
            {
              "sub_property": "Hãng",
              "value": "JBL",
              "_id": {
                "$oid": "6287869fe5fc83d4bb416ebd"
              }
            }
          ],
          "_id": {
            "$oid": "6287869fe5fc83d4bb416eb8"
          }
        }
      ],
      "variations": [
        {
          "variation_attributes": [],
          "sku": "",
          "price": 3990000,
          "stock": 5,
          "images": [
            "https://cdn.tgdd.vn/Products/Images/2162/251230/bluetooth-jbl-charge-5-2.3-org.jpg",
            "https://cdn.tgdd.vn/Products/Images/2162/251230/bluetooth-jbl-charge-5-2.4-org.jpg",
            "https://cdn.tgdd.vn/Products/Images/2162/251230/bluetooth-jbl-charge-5-2.1-org.jpg",
            "https://cdn.tgdd.vn/Products/Images/2162/251230/bluetooth-jbl-charge-5-2.5-org.jpg"
          ],
          "_id": {
            "$oid": "6287869fe5fc83d4bb416ebe"
          }
        }
      ],
      "category_id": {
        "$oid": "62838ae7e3a57b4ebaa38880"
      },
      "discount_id": {
        "$oid": "6283aa5cee556881d3d58767"
      },
      "store_id": {
        "$oid": "6283b03d3fc679d539d9f3eb"
      },
      "status": "pending",
      "is_published": true,
      "createdAt": {
        "$date": "2022-05-20T12:16:31.977Z"
      },
      "updatedAt": {
        "$date": "2022-05-30T18:17:21.253Z"
      },
      "__v": 0
    },
    {
      "_id": {
        "$oid": "62879482e5fc83d4bb416ec0"
      },
      "name": "Tai nghe Bluetooth Chụp Tai Kanen K6",
      "thumbnails": "https://cdn.tgdd.vn/Products/Images/54/187374/tai-nghe-bluetooth-kanen-k6-thumb-600x600.jpeg",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque eleifend donec pretium vulputate sapien nec. Non curabitur gravida arcu ac tortor dignissim convallis aenean. Tristique nulla aliquet enim tortor at auctor. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus. Nascetur ridiculus mus mauris vitae ultricies leo integer malesuada nunc. Eros in cursus turpis massa tincidunt dui ut. Lorem sed risus ultricies tristique nulla. Ut faucibus pulvinar elementum integer enim. Adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce ut. Ac odio tempor orci dapibus ultrices in iaculis nunc sed. Egestas fringilla phasellus faucibus scelerisque eleifend donec. Mi eget mauris pharetra et ultrices neque ornare aenean. Ac turpis egestas maecenas pharetra convallis posuere morbi leo. Nunc vel risus commodo viverra maecenas accumsan lacus vel facilisis. Et malesuada fames ac turpis egestas maecenas. Malesuada bibendum arcu vitae elementum curabitur vitae. Ac feugiat sed lectus vestibulum mattis ullamcorper. Eu scelerisque felis imperdiet proin fermentum. Pharetra convallis posuere morbi leo. Nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate. Mattis vulputate enim nulla aliquet porttitor lacus luctus. Sed nisi lacus sed viverra tellus in hac habitasse platea. Eu turpis egestas pretium aenean pharetra magna ac. Dignissim enim sit amet venenatis urna cursus. Ullamcorper a lacus vestibulum sed arcu non odio euismod lacinia. Aliquet nibh praesent tristique magna sit amet. Arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque. Iaculis urna id volutpat lacus laoreet. Id ornare arcu odio ut sem nulla pharetra. Quisque egestas diam in arcu cursus. Tempor orci eu lobortis elementum nibh. Malesuada bibendum arcu vitae elementum curabitur vitae nunc sed. Sed risus ultricies tristique nulla aliquet enim. At erat pellentesque adipiscing commodo elit at imperdiet dui accumsan. Quis auctor elit sed vulputate mi sit amet mauris commodo. Quam vulputate dignissim suspendisse in est ante in nibh mauris.",
      "properties": [
        {
          "property_name": "Thông số",
          "property_value": [
            {
              "sub_property": "Thời gian sử dụng tai nghe",
              "value": "Dùng 18 giờ - Sạc 2 giờ",
              "_id": {
                "$oid": "62879482e5fc83d4bb416ec2"
              }
            },
            {
              "sub_property": "Cổng sạc",
              "value": "Micro USB",
              "_id": {
                "$oid": "62879482e5fc83d4bb416ec3"
              }
            },
            {
              "sub_property": "Công nghệ âm thanh",
              "value": "Không có",
              "_id": {
                "$oid": "62879482e5fc83d4bb416ec4"
              }
            },
            {
              "sub_property": "Tương thích",
              "value": "Android, iOS (iPhone), Windows, Windows Phone",
              "_id": {
                "$oid": "62879482e5fc83d4bb416ec5"
              }
            },
            {
              "sub_property": "Jack cắm",
              "value": "3.5 mm",
              "_id": {
                "$oid": "62879482e5fc83d4bb416ec6"
              }
            },
            {
              "sub_property": "Công nghệ kết nối",
              "value": "Bluetooth 4.1",
              "_id": {
                "$oid": "62879482e5fc83d4bb416ec7"
              }
            },
            {
              "sub_property": "Trọng lượng",
              "value": "100 g",
              "_id": {
                "$oid": "62879482e5fc83d4bb416ec8"
              }
            }
          ],
          "_id": {
            "$oid": "62879482e5fc83d4bb416ec1"
          }
        }
      ],
      "variations": [
        {
          "variation_attributes": [],
          "sku": "",
          "price": 480000,
          "stock": 10,
          "images": [
            "https://cdn.tgdd.vn/Products/Images/54/187374/tai-nghe-bluetooth-kanen-k6-den-2-org.jpg",
            "https://cdn.tgdd.vn/Products/Images/54/187374/tai-nghe-bluetooth-kanen-k6-den-3-org.jpg",
            "https://cdn.tgdd.vn/Products/Images/54/187374/tai-nghe-bluetooth-kanen-k6-den-4-org.jpg",
            "https://cdn.tgdd.vn/Products/Images/54/187374/tai-nghe-bluetooth-kanen-k6-den-5-org.jpg"
          ],
          "_id": {
            "$oid": "62879482e5fc83d4bb416ec9"
          }
        }
      ],
      "category_id": {
        "$oid": "6283875ee3a57b4ebaa3887d"
      },
      "discount_id": null,
      "store_id": {
        "$oid": "6283b28f3fc679d539d9f3f1"
      },
      "status": "pending",
      "is_published": true,
      "createdAt": {
        "$date": "2022-05-20T13:15:46.339Z"
      },
      "updatedAt": {
        "$date": "2022-05-30T18:17:28.135Z"
      },
      "__v": 0
    }
  ]


  // useEffect(() => {
  //   dispatch(getProducts());
  // }, [dispatch]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = products.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

  const filteredProducts = applySortFilter(products, getComparator(order, orderBy), filterName);

  const isProductNotFound = filteredProducts.length === 0;

  return (
    <Page title="Product List">
      {/* <Container maxWidth={themeStretch ? false : 'lg'}> */}
      <Container maxWidth={'lg'}>
        {/* <HeaderBreadcrumbs
          heading="Product List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'E-Commerce',
              href: PATH_DASHBOARD.eCommerce.root
            },
            { name: 'Product List' }
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.eCommerce.newProduct}
              startIcon={<Icon icon={plusFill} />}
            >
              New Product
            </Button>
          }
        /> */}

        <Card>
          <ProductListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ProductListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={products.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name, thumbnails, variations , description, properties, category_id, createdAt} = row;

                    const isItemSelected = selected.indexOf(name) !== -1;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, name)} />
                        </TableCell>
                        <TableCell style={{ minWidth: 300 }} component="th" scope="row" padding="none">
                          <Box
                            sx={{
                              py: 2,
                              display: 'flex',
                              alignItems: 'center'
                            }}
                          >
                            <ThumbImgStyle alt={name} src={thumbnails} />
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell style={{ minWidth: 400 }}>{description}</TableCell>
                        <TableCell style={{ minWidth: 300 }}>
                          {properties.map((item,i)=> {
                            return <ul key={i}><b>{item.property_name}</b>: {item.property_value.map(j=><li>{j.sub_property} - {j.value}</li>)} <br /></ul>
                            
                          })}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {variations.map((item,i)=> {
                            return (
                            <ul key={i}>
                              {item.variation_attributes.map(j=>
                              <b>
                                {j.variation_name.toUpperCase()} - {j.value.toUpperCase()}
                                <br />
                              </b>
                              )}
                              <li>
                              SKU: {item.sku} 
                              </li>
                              <li>
                              Stock: {item.stock} 
                              </li>
                              <li>
                              <b>Price:&nbsp;&nbsp;&nbsp;&nbsp;{fCurrency(item.price)}</b>
                              </li>

                              <br />
                              <hr></hr>
                              <br />
                            </ul>
                            )
                            
                          })}
                        </TableCell>
                        <TableCell style={{ minWidth: 160 }}>{fDate(createdAt.$date)}</TableCell>
                        
                        <TableCell align="right">
                          <ProductMoreMenu onDelete={() => handleDeleteProduct(id)} productName={name} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isProductNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6}>
                        <Box sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterName} />
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
