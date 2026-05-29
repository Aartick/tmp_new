"use client";
import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, CartesianGrid } from "recharts";
import { NATURALTEIN_DATA } from "../data";

export default function NaturalteinChart() {
  const peak = Math.max(...NATURALTEIN_DATA.map(d => d.revenue));
  
  return (
    <div>
      <div className="h-[420px] bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={NATURALTEIN_DATA}>
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF5A1F" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#FF5A1F" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#1a1a1a" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" stroke="#71717a" fontSize={11} />
            <YAxis stroke="#71717a" fontSize={11} tickFormatter={(v) => `₹${v}L`} />
            <Tooltip contentStyle={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 8, color: "white" }} formatter={(v) => [`₹${v}L`, "Revenue"]} />
            <ReferenceLine y={200} stroke="#52525b" strokeDasharray="3 3" label={{ value: "₹2Cr threshold", fill: "#71717a", fontSize: 10, position: "right" }} />
            <Area type="monotone" dataKey="revenue" stroke="#FF5A1F" strokeWidth={2.5} fill="url(#grad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-4 mono text-[11px] tracking-[0.18em] uppercase text-zinc-500">
        Peak: ₹{peak.toFixed(0)}L · March 2026 · 3.8× engagement-start baseline
      </p>
    </div>
  );
}
