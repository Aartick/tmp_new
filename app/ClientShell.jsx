"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "../src/components/Navbar";
import Footer from "../src/components/Footer";
import AuditModal from "../src/components/AuditModal";
import StickyCTABar from "../src/components/StickyCTABar";
import { useAudit } from "./AuditContext";

export default function ClientShell({ children }) {
  const { auditOpen, openAudit, closeAudit } = useAudit();
  const pathname = usePathname() || "";
  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  return (
    <>
      {!isAdmin && <Navbar onAuditClick={openAudit} />}
      <main>
        {children}
      </main>
      {!isAdmin && <Footer />}
      <AuditModal open={auditOpen} onClose={closeAudit} />
      {!isAdmin && !auditOpen && <StickyCTABar onClick={openAudit} />}
    </>
  );
}
