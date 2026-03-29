import { CartProvider } from "@/context/CartContext";
import "./globals.css";

export const metadata = {
  title: "Flipkart Clone — Shop Online",
  description: "Demo e-commerce storefront — Electronics, Fashion, Home, Books, Sports",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen overflow-x-hidden font-sans">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}