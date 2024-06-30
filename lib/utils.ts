import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const dollars = new Intl.NumberFormat("en-EN", {
  style: "currency",
  currency: "USD",
});

export const fancyDate = (rawDate: string | number | Date): string => {
  const date = new Date(rawDate);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthIndex = date.getMonth();
  const monthName = months[ monthIndex ];

  const day = date.getDate();
  const year = date.getFullYear();

  const formattedDay = day < 10 ? `0${day}` : day;

  return `${monthName} ${formattedDay}, ${year}`;
};