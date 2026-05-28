"use client";
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowUpRight, TrendingUp, Target, Award, Clock } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, CartesianGrid } from "recharts";
import { CASE_STUDIES, NATURALTEIN_DATA, TESTIMONIALS } from "../../../src/data";

export default function CaseStudyDetail() {
  const { slug } = useParams();
  if (slug === "naturaltein") return <NaturalteinCase />;
  return <GenericCase slug={slug} />;
}
