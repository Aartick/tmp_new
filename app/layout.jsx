import "./globals.css";
import ClientShell from "./ClientShell";
import { AuditProvider } from "./AuditContext";

export const metadata = {
  title: "The Marketplace Peeps | Not Just Management. Marketplace Domination.",
  description: "Where Marketplace Strategy Meets Performance. Scale your brand across Amazon, Flipkart, Myntra, Nykaa, Zepto, Blinkit, and Instamart with sustained ROAS.",
  keywords: ["The Marketplace Peeps", "TMP", "marketplace management", "brand scaling", "Amazon agency", "Flipkart agency", "ROAS improvement", "e-commerce optimization"],
  authors: [{ name: "The Marketplace Peeps" }],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "The Marketplace Peeps | Not Just Management. Marketplace Domination.",
    description: "Where Marketplace Strategy Meets Performance. Scale your brand across Amazon, Flipkart, Myntra, Nykaa, Zepto, Blinkit, and Instamart with sustained ROAS.",
    url: "https://themarketplacepeeps.com",
    siteName: "The Marketplace Peeps",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <AuditProvider>
          <ClientShell>
            {children}
          </ClientShell>
        </AuditProvider>
      </body>
    </html>
  );
}
