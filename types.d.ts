type TMenu = {
  _id: string;
  title: string;
  description: string;
  image: string;
  dishes: TDish[];
  createdAt: Date;
}

type TDish = {
  _id: string;
  title: string;
  description: string;
  media: [string];
  category: string;
  menus: [TMenu];
  tags: [string];
  sizes: [string];
  price: number;
  createdAt: Date;
}

type TCustomerOrder = {
  shippingAddress: Object;
  _id: string;
  customerClerkId: string;
  dishes: [TOrder]
  shippingRate: string;
  totalAmount: number
}

type TUser = {
  clerkId: string;
  wishList: [string];
  createdAt: string;
}

type TOrderColumn = {
  _id: string;
  customer: string;
  dishes: number;
  totalAmount: number;
  createdAt: string;
}

type TOrder = {
  dish: TDish
  size: string;
  quantity: number;
}

type TCustomer = {
  clerkId: string;
  name: string;
  email: string;
}