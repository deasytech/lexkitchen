import Customer from "@/lib/models/Customer";
import Order from "@/lib/models/Order";
import { connectToDB } from "@/lib/mongoDB";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getMenus = async () => {
  const menus = await fetch(`${API_URL}/menus`);
  return await menus.json();
}

export const getMenuDetails = async (menuId: string) => {
  const menu = await fetch(`${API_URL}/menus/${menuId}`)
  return await menu.json()
}

export const getLastestDishes = async (limit: number) => {
  const dishes = await fetch(`${API_URL}/dishes?limit=${limit}`);
  return await dishes.json();
}

export const getDishes = async () => {
  const dishes = await fetch(`${API_URL}/dishes`);
  return await dishes.json();
}

export const getDishDetails = async (dishId: string) => {
  const dish = await fetch(`${API_URL}/dishes/${dishId}`);
  return await dish.json();
}

export const getSearchedDishes = async (query: string) => {
  const searchedDishes = await fetch(`${API_URL}/search/${query}`)
  return await searchedDishes.json()
}

export const getOrders = async (customerId: string) => {
  const orders = await fetch(`${API_URL}/orders/customers/${customerId}`)
  return await orders.json()
}

export const getRelatedDishes = async (dishId: string) => {
  const relatedDishes = await fetch(`${API_URL}/dishes/${dishId}/related`)
  return await relatedDishes.json()
}

export const getTotalSales = async () => {
  await connectToDB();
  const orders = await Order.find()
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0)
  return { totalOrders, totalRevenue }
}

export const getTotalCustomers = async () => {
  await connectToDB();
  const customers = await Customer.find()
  const totalCustomers = customers.length
  return totalCustomers
}

export const getSalesPerMonth = async () => {
  await connectToDB()
  const orders = await Order.find()

  const salesPerMonth = orders.reduce((acc, order) => {
    const monthIndex = new Date(order.createdAt).getMonth(); // 0 for Janruary --> 11 for December
    acc[monthIndex] = (acc[monthIndex] || 0) + order.totalAmount;
    // For June
    // acc[5] = (acc[5] || 0) + order.totalAmount (orders have monthIndex 5)
    return acc
  }, {})

  const graphData = Array.from({ length: 12}, (_, i) => {
    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(0, i))
    // if i === 5 => month = "Jun"
    return { name: month, sales: salesPerMonth[i] || 0 }
  })

  return graphData
}