import { Icon } from "@iconify/react";
import pieChart2Fill from "@iconify/icons-eva/pie-chart-2-fill";
import peopleFill from "@iconify/icons-eva/people-fill";

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: "dashboard",
    path: "/dashboard/app",
    icon: getIcon(pieChart2Fill),
  },
  {
    title: "products",
    path: "/dashboard/products",
    icon: getIcon("ic:round-dashboard-customize"),
  },
  {
    title: "orders",
    path: "/dashboard/orders",
    icon: getIcon("icon-park-solid:transaction-order"),
  },
  {
    title: "customers",
    path: "/dashboard/users",
    icon: getIcon(peopleFill),
  },
  {
    title: "analytics",
    path: "/dashboard/analytics",
    icon: getIcon("clarity:analytics-solid"),
  },
];

export default sidebarConfig;
// {
//   title: 'login',
//   path: '/login',
//   icon: getIcon(lockFill)
// },
// {
//   title: 'register',
//   path: '/register',
//   icon: getIcon('')
// },
// {
//   title: 'Not found',
//   path: '/404',
//   icon: getIcon(alertTriangleFill)
// }
