"use client";
import { createContext, useContext, useState } from "react";

const AuditContext = createContext();

export function AuditProvider({ children }) {
  const [auditOpen, setAuditOpen] = useState(false);
  const openAudit = () => setAuditOpen(true);
  const closeAudit = () => setAuditOpen(false);

  return (
    <AuditContext.Provider value={{ auditOpen, openAudit, closeAudit }}>
      {children}
    </AuditContext.Provider>
  );
}

export function useAudit() {
  return useContext(AuditContext);
}
