import { LayoutDashboard, ShoppingBag, Tag, UserRound, Utensils } from "lucide-react";

export const navLinks = [
  {
    url: "/dashboard",
    icon: <LayoutDashboard />,
    label: "Dashboard",
  },
  {
    url: "/dashboard/menus",
    icon: <Tag />,
    label: "Menus",
  },
  {
    url: "/dashboard/dishes",
    icon: <Utensils />,
    label: "Dishes",
  },
  {
    url: "/dashboard/orders",
    icon: <ShoppingBag />,
    label: "Orders",
  },
  {
    url: "/dashboard/customers",
    icon: <UserRound />,
    label: "Customers",
  },
];