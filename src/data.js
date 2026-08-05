// Centralized site data — TMP
export const SITE = {
  name: "The Marketplace Peeps",
  shortName: "TMP",
  tagline: "Not Just Management. Marketplace Domination.",
  subTagline: "Where Marketplace Strategy Meets Performance.",
  email: "admin@themarketplacepeeps.com",
  phone: "+91-XXXXXXXXXX",
  socials: {
    instagram: "https://www.instagram.com/themarketplacepeeps/",
    threads: "https://www.threads.com/@themarketplacepeeps",
    youtube: "https://www.youtube.com/@TheMarketplacePeeps",
    facebook: "https://www.facebook.com/profile.php?id=61562813067812",
  },
  logoUrl: "https://customer-assets.emergentagent.com/job_8e7aafda-606c-40a0-bfd6-6e1d65c637dd/artifacts/t79bqqsv_TMP%20Logo%20Black.png",
};

export const MARKETPLACES = [
  { name: "Flipkart", logo: "/logos/flipkart.svg" },
  { name: "Amazon", logo: "/logos/amazon.svg" },
  { name: "Myntra", logo: "/logos/myntra.svg" },
  { name: "Nykaa", logo: "/logos/nykaa.svg" },
  { name: "Instamart", logo: "/logos/instamart.svg" },
  { name: "Zepto", logo: "/logos/zepto.svg" },
  { name: "Blinkit", logo: "/logos/blinkit.svg" },
];

export const METRICS = [
  { value: "10+", label: "Years marketplace experience" },
  { value: "80+", label: "Brands scaled" },
  { value: "₹200Cr+", label: "Marketplace GMV driven" },
  { value: "6–11.5×", label: "Sustained ROAS range" },
];

export const FRAMEWORK = [
  {
    step: "01",
    title: "Audit Your Account",
    desc: "Identify revenue leaks and hidden growth opportunities across listings, ads and operations.",
  },
  {
    step: "02",
    title: "Map The Strategy",
    desc: "Build a strategy mapped to your actual growth targets — not vanity benchmarks.",
  },
  {
    step: "03",
    title: "Scope & Onboard",
    desc: "Get a clear roadmap with timelines, deliverables and an execution plan. Start in days, not weeks.",
  },
];

// 6 services — updated taxonomy
export const SERVICES = [
  {
    slug: "marketplace-launch-setup",
    pillar: "ACQUIRE",
    iconName: "Rocket",
    name: "Marketplace Launch & Setup",
    short: "Launch your brand the right way with optimized listings, catalog setup, and marketplace-ready foundations.",
    long: "We architect launch-ready marketplace foundations — seller central setup, brand registry, catalog hierarchy, FBA enrolment and category-specific listing templates. Done once, done right.",
    deliverables: [
      "Seller account setup (Amazon, Flipkart, Meesho)",
      "Brand Registry & IP protection",
      "Catalog architecture & SKU hierarchy",
      "Hero listing templates per category",
      "FBA / warehouse onboarding",
    ],
  },
  {
    slug: "marketplace-advertising",
    pillar: "ACQUIRE",
    iconName: "Megaphone",
    name: "Marketplace Advertising",
    short: "Drive targeted traffic and profitable growth with high-performing Amazon & marketplace ad campaigns.",
    long: "We architect ad campaigns the way category leaders do: keyword harvesting, bid discipline by funnel stage, and portfolio-level budget allocation. The result is ROAS that compounds — not spikes.",
    deliverables: [
      "Account architecture rebuild",
      "Keyword research & negative match discipline",
      "Bid strategy per funnel stage",
      "Portfolio-level budget allocation",
      "Weekly performance dashboards",
    ],
  },
  {
    slug: "listing-optimization",
    pillar: "CONVERT",
    iconName: "Search",
    name: "Listing Optimization",
    short: "Improve conversions with SEO-focused titles, A+ content, creatives, and conversion-driven product pages.",
    long: "Listings convert before ads do. We rebuild titles, bullets, backend search terms, A+ modules and infographics into a conversion machine — every element earning its place.",
    deliverables: [
      "Title + bullet SEO rewrite",
      "Backend search-term build",
      "A+ Content modules (all 7)",
      "Conversion-led infographic set",
      "Pre/post conversion-rate benchmarks",
    ],
  },
  {
    slug: "ratings-reviews-growth",
    pillar: "CONVERT",
    iconName: "Star",
    name: "Ratings & Reviews Growth",
    short: "Build customer trust and improve product performance with strategies that increase positive reviews organically.",
    long: "A rating below 4.2 stars silently burns your ad spend. We deploy compliant review-velocity systems, intercept negative reviews early and rebuild rating floors organically.",
    deliverables: [
      "Compliant review velocity systems",
      "Negative review interception",
      "Vine & Early Reviewer programs",
      "Rating floor recovery playbook",
      "Q&A optimization",
    ],
  },
  {
    slug: "marketplace-operations",
    pillar: "SCALE",
    iconName: "LayoutDashboard",
    name: "Marketplace Operations",
    short: "Streamline inventory, pricing, compliance, and account management for smooth marketplace operations.",
    long: "Account health, FBA forecasting, compliance, brand registry, case management — the operational layer that decides whether you scale or stall.",
    deliverables: [
      "Daily account health monitoring",
      "FBA inventory forecasting",
      "Compliance & brand registry",
      "Seller central case management",
      "Multi-marketplace SOPs",
    ],
  },
  {
    slug: "brand-store-creative-assets",
    pillar: "SCALE",
    iconName: "Palette",
    name: "Brand Store & Creative Assets",
    short: "Strengthen your marketplace presence with premium brand stores, product photography, and branded creatives.",
    long: "We shoot products like the category leaders do — and translate that imagery into A+ modules and brand stores that hold attention and close the sale.",
    deliverables: [
      "In-studio product photography",
      "Lifestyle & flatlay sets",
      "Premium brand store architecture",
      "A+ Content modules",
      "Branded ad creatives & UGC",
    ],
  },
];

// Section II — Ecosystem (3 columns × 3 sub-items) — separate from the 6-service grid
export const ECOSYSTEM = [
  {
    pillar: "ACQUIRE",
    subtitle: "Traffic & Visibility",
    items: [
      { name: "Marketplace Management", desc: "Optimize listings, SEO & growth." },
      { name: "Performance Marketing", desc: "Scale sales with profitable ads." },
      { name: "Social Media", desc: "Build visibility & audience trust." },
    ],
  },
  {
    pillar: "CONVERT",
    subtitle: "Sales & Trust",
    items: [
      { name: "Design & Asset Creation", desc: "Create high-converting brand assets." },
      { name: "Influencer Marketing & UGC", desc: "Drive trust with authentic content." },
      { name: "Ratings & Reviews", desc: "Boost reviews, trust & conversions." },
    ],
  },
  {
    pillar: "SCALE",
    subtitle: "Operations & Growth",
    items: [
      { name: "Marketplace Operations", desc: "Manage backend & account health." },
      { name: "Brand Expansion", desc: "Expand across categories & platforms." },
      { name: "Analytics & Reporting", desc: "Track growth with actionable insights." },
    ],
  },
];

export const FOUNDERS = [
  {
    name: "Himanshu Singh Bhandari",
    shortName: "Himanshu",
    role: "Co-Founder",
    bio: "Marketplace Growth Strategist with expertise in scaling revenue-driven brands across Amazon, Flipkart & quick-commerce platforms. Specialized in PPC, profitability optimization, revenue growth metrics, and performance-led marketplace scaling.",
    quote: "We don't sell campaigns. We sell systems that compound.",
    expertise: [
      "Marketplace Growth",
      "PPC & Advertising",
      "Profitability Optimization",
      "Catalog and Listing Optimisation",
      "Ecommerce Operations",
    ],
    linkedin: "https://www.linkedin.com/in/himanshu-singh-bhandari-728397238/",
    image: "/founder-images/himanshu.png",
  },
  {
    name: "Divya Chaturvedi",
    shortName: "Divya",
    role: "Co-Founder",
    bio: "Marketplace Operations Strategist with a strong problem-solving mindset and deep understanding of marketplace ecosystems. Skilled in identifying revenue bottlenecks, optimizing backend operations, tracking emerging trends, and driving operational excellence across digital commerce platforms.",
    quote: "Execution is the only real moat — and we obsess over it.",
    expertise: [
      "Marketplace Operations",
      "Revenue Optimization",
      "Ecommerce Operations",
      "Trend Analysis",
      "Catalog and Listing Optimisation",
    ],
    linkedin: "https://www.linkedin.com/in/divya-chaturvedi-ecommerce/",
    image: "/founder-images/divya.png",
  },
];

export const FOUNDER_MESSAGE = {
  body: "We started The Marketplace Peeps because we saw too many great products fail due to poor execution on marketplaces. Our goal is simple — build systems that drive consistent, scalable growth.",
  emphasis: "Every brand we take on, we treat like our own.",
};

export const WHY_US = [
  {
    title: "We focus on revenue, not vanity metrics",
    desc: "Our clients see ROI tracked monthly, not impressions. Real money moved, not slides.",
  },
  {
    title: "We build systems, not one-off campaigns",
    desc: "Every engagement comes with a documented growth playbook your team owns.",
  },
  {
    title: "We work as partners, not vendors",
    desc: "We invest in the long arc — your brand, your P&L, your category position.",
  },
];

export const TESTIMONIALS = [
  {
    brand: "Naturaltein",
    person: "Sarab",
    title: "Chief Business Officer, Naturaltein LNG Pvt. Ltd.",
    quote: "In just two years, Naturaltein scaled from under ₹80 lakhs/month to ₹3 crores+/month on Amazon India with highly efficient execution and minimal ad spend. TMP played a key role in strengthening our marketplace operations, catalogue quality, and sustainable growth strategy across channels.",
    metric: "₹80L → ₹3+ Cr / month",
  },
  {
    brand: "HealthAid",
    person: "Leadership Team",
    title: "HealthAid · UK Supplement Brand (Amazon, Flipkart, Tata 1mg)",
    quote: "Managing a global supplement brand across Amazon, Flipkart, and Tata 1mg required consistent execution and marketplace expertise across a large product catalog. TMP helped streamline marketplace operations, build structured PPC campaigns across multiple SKUs, optimize listings, and improve overall platform performance with a scalable growth-focused approach.",
    metric: "HealthAid · 3 marketplaces, 1 system",
  },
  {
    brand: "Phitku",
    person: "Priyank Saini",
    title: "CBO, Namastu Enterprises Pvt. Ltd.",
    quote: "TMP helped us scale Phitku from an early-stage marketplace brand to achieving ₹1.5 crore+ in sales with structured marketplace execution and performance-focused growth strategies. Their understanding of the personal care category and brand-building knowledge helped us grow exponentially.",
    metric: "₹0 → ₹1.5Cr+",
  },
  {
    brand: "Nutrabud",
    person: "Vedin Adya & Viksit",
    title: "Founders, Nutrabud",
    quote: "Working with TMP helped us build a more scalable and organized marketplace presence for Nutrabud. From improving product visibility to refining platform performance, their team contributed significantly toward accelerating our growth in the nutraceutical space.",
    metric: "Scalable infrastructure",
  },
  {
    brand: "Nutrispray",
    person: "Arpit Save",
    title: "CEO & Founder, Avangli Labs Pvt. Ltd.",
    quote: "TMP helped us focus not just on scaling revenue, but on building a more profitable marketplace business. Their data-driven execution across campaigns, listings, and platform operations contributed to significant growth while improving overall performance efficiency.",
    metric: "~28x growth, profit-led",
  },
  {
    brand: "Woolah Tea",
    person: "Vishal",
    title: "E-Commerce Head, Woolah Tea",
    quote: "TMP helped strengthen Woolah Tea's marketplace growth with sharper execution and improved online visibility across platforms. With a focused e-commerce strategy, we scaled from nearly ₹5 lakhs to ₹18 lakhs while achieving consistent month-on-month growth.",
    metric: "₹5L → ₹18L (260%)",
  },
];

export const FAQS = [
  {
    q: "How quickly can brands expect growth?",
    a: "Most brands see measurable lift within the first 30–45 days — usually from listing fixes and ad restructuring. Sustainable scale typically kicks in by month 3–4.",
  },
  {
    q: "What marketplaces do you manage?",
    a: "Amazon, Flipkart, Meesho, Nykaa, Myntra, Blinkit, Zepto, Instamart — and the long tail. We pick the right ones for your category, not all of them.",
  },
  {
    q: "Do you offer support for international expansion?",
    a: "Yes. We help Indian brands launch on Amazon US, UAE and UK with localised listings, compliance, and ads.",
  },
  {
    q: "Can you handle creative content in-house?",
    a: "Yes. Photography, video, A+ content, brand stores and ad creatives are all in-house teams.",
  },
  {
    q: "Is your approach suitable for my product/category?",
    a: "We work best with brands doing ₹50L+ annual revenue across consumer categories — beauty, health, home, food, baby, lifestyle, electronics. Book a call and we'll tell you honestly if you're a fit.",
  },
  {
    q: "Are there long-term contracts?",
    a: "No. We work month-to-month after a 90-day onboarding sprint. The work compounds and clients stay — but never because they're locked in.",
  },
];

export const BRANDS = [
  { name: "Alpha Ayurvedic", logo: "https://customer-assets.emergentagent.com/job_growth-engine-255/artifacts/ovsrmyw2_Brand%20Logos-01.png" },
  { name: "Angel Lungies", logo: "https://customer-assets.emergentagent.com/job_growth-engine-255/artifacts/r3hzs85m_Brand%20Logos-02.png" },
  { name: "Arohul", logo: "https://customer-assets.emergentagent.com/job_growth-engine-255/artifacts/bz2n1r0f_Brand%20Logos-03.png" },
  { name: "BioticsLife", logo: "https://customer-assets.emergentagent.com/job_growth-engine-255/artifacts/uyi1r33s_Brand%20Logos-04.png" },
  { name: "Bipha Ayurveda", logo: "https://customer-assets.emergentagent.com/job_growth-engine-255/artifacts/2jt9ttdi_Brand%20Logos-05.png" },
  { name: "Columbus Sports" },
  { name: "HealthAid" },
  { name: "Indodent" },
  { name: "Mitchell USA" },
  { name: "Moe Puppy" },
  { name: "Naturaltein" },
  { name: "Perfora" },
  { name: "PureHeart" },
  { name: "Truhabit" },
  { name: "Palm East" },
  { name: "Boon Herbs" },
  { name: "CoolBaby" },
  { name: "Designe Galleria" },
  { name: "Factor Notes" },
  { name: "Frido" },
  { name: "LR" },
  { name: "Nutrispray" },
  { name: "Phitku" },
  { name: "PNG Essentials" },
  { name: "Pomelo" },
  { name: "Solimo" },
  { name: "Tint Cosmetics" },
  { name: "ReActive Organics" },
  { name: "Undry Clinic" },
];

export const NATURALTEIN_DATA = [
  { month: "Feb '25", revenue: 80, adSpend: 0.09, adSales: 0.82, roas: 8.7 },
  { month: "Mar '25", revenue: 117, adSpend: 1.43, adSales: 6.53, roas: 4.6 },
  { month: "Apr '25", revenue: 152, adSpend: 3.68, adSales: 21.4, roas: 5.8 },
  { month: "May '25", revenue: 198, adSpend: 5.77, adSales: 56.3, roas: 9.8 },
  { month: "Jun '25", revenue: 191, adSpend: 4.85, adSales: 55.7, roas: 11.5 },
  { month: "Jul '25", revenue: 237, adSpend: 4.66, adSales: 48.8, roas: 10.5 },
  { month: "Aug '25", revenue: 215, adSpend: 4.24, adSales: 38.0, roas: 9.0 },
  { month: "Sep '25", revenue: 243, adSpend: 4.79, adSales: 49.4, roas: 10.3 },
  { month: "Oct '25", revenue: 215, adSpend: 6.66, adSales: 53.3, roas: 8.0 },
  { month: "Nov '25", revenue: 232, adSpend: 8.34, adSales: 68.9, roas: 8.3 },
  { month: "Dec '25", revenue: 248, adSpend: 7.06, adSales: 43.7, roas: 6.2 },
  { month: "Jan '26", revenue: 262, adSpend: 6.62, adSales: 44.6, roas: 6.7 },
  { month: "Feb '26", revenue: 285, adSpend: 5.39, adSales: 37.6, roas: 7.0 },
  { month: "Mar '26", revenue: 308, adSpend: 10.37, adSales: 58.7, roas: 6.0 },
];

export const CASE_STUDIES = [
  {
    slug: "naturaltein",
    brand: "Naturaltein",
    category: "Protein & Supplements",
    headline: "₹80L → ₹3+ Cr / month on Amazon India",
    sub: "3.8× revenue growth in 14 months — without unbounded ad spend.",
    cover: "https://images.unsplash.com/photo-1579722821273-0f6c1b5d0b1e?auto=format&fit=crop&w=1200&q=80",
    flagship: true,
  },
  {
    slug: "healthaid",
    brand: "HealthAid",
    category: "UK Supplements",
    headline: "3 marketplaces. 1 unified system.",
    sub: "Amazon, Flipkart and Tata 1mg run as one operating engine for a global supplement brand.",
    cover: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "phitku",
    brand: "Phitku",
    category: "Personal Care",
    headline: "₹0 → ₹1.5 Cr+ from a cold start",
    sub: "Built a roll-on deodorant brand from launch to category contender in under 18 months.",
    cover: "https://images.unsplash.com/photo-1556228724-4d9bbd97b03b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "nutrispray",
    brand: "Nutrispray",
    category: "Nutraceuticals",
    headline: "~28× growth with profit discipline",
    sub: "A celebrity-backed brand scaled with margin-conscious execution, not vanity revenue.",
    cover: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "woolah-tea",
    brand: "Woolah Tea",
    category: "Specialty F&B",
    headline: "₹5L → ₹18L / month (260% lift)",
    sub: "Consistent month-on-month growth via sharper execution and visibility.",
    cover: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "nutrabud",
    brand: "Nutrabud",
    category: "Nutraceuticals",
    headline: "Scalable marketplace infrastructure, built right",
    sub: "Visibility, performance and platform operations — rebuilt for the next stage of growth.",
    cover: "https://images.unsplash.com/photo-1607619662634-3ac95d1c0d27?auto=format&fit=crop&w=1200&q=80",
  },
];

// Careers — on-site only (no remote/hybrid)
export const CAREERS = [
  {
    slug: "graphic-designer",
    title: "Graphic Designer",
    location: "On-site · India",
    type: "Full-time",
    desc: "You'll own the creative output that drives our clients' ad performance — listings, A+ Content, ads, social. We're looking for someone obsessed with conversion-first design.",
  },
  {
    slug: "operations",
    title: "Marketplace Operations Executive",
    location: "On-site · India",
    type: "Full-time",
    desc: "Run the operational backbone for a portfolio of D2C brands. Cataloging, case management, FBA logistics, account health. Detail-obsessed people thrive here.",
  },
];

export const CAREER_CULTURE = [
  { title: "Growth-focused culture", desc: "We promote on outcomes, not tenure. Move fast, own your numbers." },
  { title: "Marketplace-first learning", desc: "Weekly teardowns, in-house playbooks, direct mentorship from founders." },
  { title: "Fast-paced ecommerce environment", desc: "Real brands, real budgets, real impact — visible in dashboards every week." },
];
