import Footer from "@/components/frontend/layout/footer";
import Navbar from "@/components/frontend/layout/navbar";
import { ToasterProvider } from "@/providers/ToasterProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lexi Kitchen - Authentic African and International Cuisine",
  description:
    "Discover the rich and diverse flavors of Africa and beyond with Lexi Kitchen. Enjoy our delicious and authentic dishes made from the freshest ingredients.",
  keywords: "Lexi Kitchen, African Cuisine, International Cuisine, Authentic Dishes, Fresh Ingredients, Delicious Food, Jollof Rice, Plantain, Goat Meat",
  authors: [ { name: "Deasytech Solutions", url: "https://deasytechsolutions.com" } ],
  twitter: {
    title: "Lexi Kitchen - Authentic African and International Cuisine",
    description: "Discover the rich and diverse flavors of Africa and beyond with Lexi Kitchen. Enjoy our delicious and authentic dishes made from the freshest ingredients.",
    siteId: "https://www.lexkitchen.com",
    card: "summary_large_image",
    site: "@site",
    creator: "@creator",
  },
  openGraph: {
    type: "website",
    url: "https://lexkitchen.com",
    title: "Lexi Kitchen - Authentic African and International Cuisine",
    description: "Discover the rich and diverse flavors of Africa and beyond with Lexi Kitchen. Enjoy our delicious and authentic dishes made from the freshest ingredients.",
    siteName: "Lexi Kitchen",
    images: [ {
      url: "/images/logo.png",
    } ],
  },
  icons: {
    icon: "/images/logo.png",
  },
};

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToasterProvider />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default Layout;