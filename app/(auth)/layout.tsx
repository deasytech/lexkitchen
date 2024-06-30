import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lexi Kitchen AUthentication",
  description:
    "To gain access into the admin area, you must have an account to do so.",
  icons: {
    icon: "/images/logo.png",
  },
};

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full items-center justify-center">
      {children}
    </div>
  );
}

export default Layout;