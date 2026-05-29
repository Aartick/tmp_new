import React from "react";
import { getDb } from "@/lib/mongodb";
import { CASE_STUDIES } from "../../../src/data";
import { notFound } from "next/navigation";
import { NaturalteinCase, GenericCase } from "../page";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  // Try dynamic database first
  try {
    const db = await getDb();
    const study = await db.collection("case_studies").findOne(
      { slug: slug, published: true },
      { projection: { brand: 1, headline: 1, sub: 1, cover_image: 1 } }
    );
    
    if (study) {
      return {
        title: `${study.brand} Case Study: ${study.headline} | The Marketplace Peeps`,
        description: study.sub || `Learn how we scaled ${study.brand} through disciplined performance marketing.`,
        openGraph: {
          title: study.brand,
          description: study.sub,
          images: study.cover_image ? [{ url: study.cover_image }] : [],
        }
      };
    }
  } catch (err) {
    console.error("Error generating case study metadata:", err);
  }

  // Fallback to static
  const staticStudy = CASE_STUDIES.find(x => x.slug === slug);
  if (staticStudy) {
    return {
      title: `${staticStudy.brand} Case Study: ${staticStudy.headline} | The Marketplace Peeps`,
      description: staticStudy.sub,
      openGraph: {
        title: staticStudy.brand,
        description: staticStudy.sub,
        images: staticStudy.cover ? [{ url: staticStudy.cover }] : [],
      }
    };
  }

  return { title: "Case Study | The Marketplace Peeps" };
}

export default async function CaseStudyDetail({ params }) {
  const { slug } = await params;
  
  // Try dynamic database fetch first
  let study = null;
  try {
    const db = await getDb();
    study = await db.collection("case_studies").findOne(
      { slug: slug, published: true },
      { projection: { _id: 0 } }
    );
  } catch (err) {
    console.error("Failed to query case study detail in SSR:", err);
  }

  if (study) {
    if (slug === "naturaltein") return <NaturalteinCase />;
    return (
      <GenericCase
        slug={slug}
        brand={study.brand}
        category={study.category}
        headline={study.headline}
        sub={study.sub}
        cover_image={study.cover_image}
        content={study.content}
      />
    );
  }

  // Fallback to static
  const staticStudy = CASE_STUDIES.find(x => x.slug === slug);
  if (staticStudy) {
    if (slug === "naturaltein") return <NaturalteinCase />;
    return <GenericCase slug={slug} />;
  }

  notFound();
}
