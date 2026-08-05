import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { hashPassword } from "@/lib/auth";

export async function GET() {
  try {
    const db = await getDb();
    
    // Create Indexes
    await db.collection("users").createIndex({ email: 1 }, { unique: true });
    await db.collection("leads").createIndex({ email: 1 });
    await db.collection("blog").createIndex({ slug: 1 }, { unique: true });

    const adminEmail = (process.env.ADMIN_EMAIL || "admin@themarketplacepeeps.com").toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD || "TMP@dmin2026!";
    const hashed = await hashPassword(adminPassword);

    const existingUser = await db.collection("users").findOne({ email: adminEmail });
    if (!existingUser) {
      await db.collection("users").insertOne({
        id: crypto.randomUUID(),
        email: adminEmail,
        password_hash: hashed,
        name: "TMP Admin",
        role: "admin",
        created_at: new Date().toISOString()
      });
      console.log(`Seeded admin: ${adminEmail}`);
    } else {
      // Just update password to ensure it matches .env
      await db.collection("users").updateOne(
        { email: adminEmail },
        { $set: { password_hash: hashed } }
      );
      console.log("Admin password updated from .env");
    }

    const starters = [
      {
        title: "How To Audit Your Amazon Listings Before You Spend ₹1 More On Ads",
        slug: "amazon-listing-audit-before-spending-on-ads",
        excerpt: "If your listings aren't converting, ad spend is just an expensive way to find that out. Here's the 7-point audit we run before every campaign.",
        content: "## The Hidden Tax On Every Bad Listing\n\nMost brands lose 30-40% of their potential revenue not because their ads are bad — but because their listings can't convert the traffic those ads generate.\n\n### The 7-Point Pre-Spend Audit\n\n1. **Title architecture** — Primary keyword in the first 80 characters?\n2. **Hero image** — Is the product alone, on white, occupying 85% of the frame?\n3. **A+ Content** — Are you using all 7 modules? Comparison chart present?\n4. **Bullet points** — Do they sell *benefits* or just list features?\n5. **Backend search terms** — All 250 characters used? No repetition with the title?\n6. **Review velocity** — Are you below 4.2 stars? You'll burn ad budget.\n7. **Pricing position** — Where are you vs. the category median?\n\n### What \"Good\" Looks Like\n\nAt TMP, before we let a client spend a single rupee on ads, we run this exact audit. The result: clients see ROAS in the 6-11.5x range — not because we're magicians, but because we refuse to run ads against listings that can't convert.\n\n*Want this audit run on your account? [Book a free 30-minute audit →](/contact)*",
        cover_image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
        author: "Himanshu Singh Bhandari",
        tags: ["Amazon", "Listings", "Audit"],
        published: true,
      },
      {
        title: "ROAS Isn't A Metric. It's A Symptom.",
        slug: "roas-is-a-symptom-not-a-metric",
        excerpt: "Stop chasing ROAS targets. Start fixing the system that produces them.",
        content: "## The ROAS Trap\n\nEvery agency promises a ROAS number. 5x. 7x. 10x.\n\nHere's the truth: **ROAS is not a goal. It's a consequence.**\n\nYou get great ROAS when:\n- Your listings convert above category average\n- Your keywords match real buyer intent\n- Your reviews build trust at first glance\n- Your operations don't run out of stock during peak campaigns\n\nFix the system. ROAS follows.\n\n### The TMP Framework\n\nWe don't optimize for ROAS. We optimize for the *inputs* that produce it:\n- Listing conversion rate\n- Keyword-to-product relevance score\n- Review velocity & rating floor\n- Inventory days-of-cover\n\nDo that, and ROAS becomes boringly predictable.",
        cover_image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
        author: "Divya Chaturvedi",
        tags: ["Strategy", "Ads", "ROAS"],
        published: true,
      },
      {
        title: "Why Most D2C Brands Plateau at ₹50L/Month On Amazon",
        slug: "why-d2c-brands-plateau-on-amazon",
        excerpt: "The ceiling isn't your category. It's your operational maturity. Here's how to break through.",
        content: "## The ₹50L Ceiling Is Real\n\nWe've seen it dozens of times: a brand crosses ₹30L/month, climbs to ₹50L, and then... stalls. Forever.\n\n### Why It Happens\n\n1. **Catalog debt** — Listings created for launch, never reoptimized\n2. **Single-SKU dependency** — 70%+ of revenue from one hero product\n3. **Reactive operations** — Stockouts during scale moments\n4. **Ad spend ceiling** — Same campaigns, same budgets, hit diminishing returns\n\n### How To Break Through\n\nNaturaltein went from ₹80L to ₹3+ Cr/month in 14 months. Not because they spent more — but because they fixed the system. [Read the full case study →](/case-studies/naturaltein)",
        cover_image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
        author: "TMP Team",
        tags: ["D2C", "Growth", "Marketplace"],
        published: true,
      },
    ];

    for (const p of starters) {
      await db.collection("blog").updateOne(
        { slug: p.slug },
        { 
          $set: { ...p, updated_at: new Date().toISOString() },
          $setOnInsert: { id: crypto.randomUUID(), created_at: new Date().toISOString() }
        },
        { upsert: true }
      );
    }
    console.log("Upserted starter blog posts");

    return NextResponse.json({ ok: true, message: "Setup completed successfully!" });
  } catch (error) {
    console.error("Setup error:", error);
    return NextResponse.json({ detail: "Internal Server Error" }, { status: 500 });
  }
}
