import "./globals.css";
import ClientShell from "./ClientShell";
import { AuditProvider } from "./AuditContext";

export const metadata = {
  title: "Aartick Frontend",
  description: "Aartick Frontend App",
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
