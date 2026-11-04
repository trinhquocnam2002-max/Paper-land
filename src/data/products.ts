import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'linen-journal-a5',
    name: 'Atelier No. 01 Linen Bound Journal',
    subtitle: 'Hardcover Archival Book with Lay-Flat Binding',
    category: 'notebooks',
    price: 36,
    material: 'Natural Belgian Linen, 120 gsm Acid-Free Japanese Paper',
    origin: 'Kyoto, Japan',
    dimensions: '148 × 210 mm (A5) · 192 Pages',
    description: 'Bound in natural, unbleached woven linen with smyth-sewn binding that opens completely flat at 180 degrees. Crafted specifically for fountain pens, technical drawing pens, and watercolor washes without feathering.',
    story: 'Created in collaboration with a century-old bookbinding workshop in Kyoto. The paper pulp is washed with mountain spring water to ensure zero acid content, guaranteeing archival preservation for decades.',
    features: [
      '180° true lay-flat smyth-sewn binding',
      'Dual woven cotton bookmark ribbons in charcoal and sand',
      'Expandable gusseted inner back pocket for loose sheets',
      'Micro-perforated final 16 sheets for clean notes removal'
    ],
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=1200&q=80'
    ],
    inStock: true,
    stockCount: 14,
    badge: 'Atelier Signature',
    rulingOptions: ['Dot Grid', 'French Ruled', 'Architect Grid', 'Plain Blank'],
    weightOptions: ['80 gsm', '100 gsm', '120 gsm']
  },
  {
    id: 'machined-brass-rollerball',
    name: 'Solid Machined Brass Rollerball Pen',
    subtitle: 'Uncoated Raw Brass with Balanced Hexagonal Body',
    category: 'pens',
    price: 68,
    material: 'Solid C3604 Architectural Brass, Schmidt Rollerball Core',
    origin: 'Schwarzwald, Germany',
    dimensions: '138 mm length · 11 mm diameter · 54g weight',
    description: 'Precision milled from a single rod of solid untreated brass. Unlacquered surface will develop a rich, personal antique patina over years of daily tactile handling.',
    story: 'Engineered with balanced low-center-of-gravity mass to prevent hand fatigue during long writing sessions. The screw-fastened cap posts securely to the barrel with satisfying resistance.',
    features: [
      'Milled hexagonal anti-roll profile',
      'Accepts standard G2 and Schmidt ceramic rollerball refills',
      'Air-tight silicone cap seal preventing ink dry-out',
      'Ages naturally to develop an individual golden-brown patina'
    ],
    images: [
      'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1585336261026-778848f3b25f?auto=format&fit=crop&w=1200&q=80'
    ],
    inStock: true,
    stockCount: 8,
    badge: 'Craft Edition'
  },
  {
    id: 'kuro-fountain-pen',
    name: 'Kuro Matte Monolith Fountain Pen',
    subtitle: 'Anodized Aircraft Aluminum with Stainless Steel Nib',
    category: 'pens',
    price: 84,
    material: 'Grade 6061 Aluminum, Japanese Ebonite Feed',
    origin: 'Nagoya, Japan',
    dimensions: '142 mm length · 12 mm diameter · 28g weight',
    description: 'A striking minimalist fountain pen finished with a micro-bead-blasted matte black anodized coat. Features a precision-tuned nib that delivers consistent, wet ink flow with subtle spring.',
    story: 'Designed under the principle of subtraction. There are no clips or ornamental rings—just pure cylindrical geometry balanced for effortless, gliding script across textured paper.',
    features: [
      'Japanese precision-tuned nib with iridium tip',
      'Includes piston ink converter and 2 black ink cartridges',
      'Magnetic slip-click cap closure mechanism',
      'Subtle machined knurling along grip section'
    ],
    images: [
      'https://images.unsplash.com/photo-1569683795645-b62e50fbf103?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&w=1200&q=80'
    ],
    inStock: true,
    stockCount: 19,
    badge: 'New Release',
    nibOptions: ['Fine (0.38mm)', 'Medium (0.5mm)', 'Broad (0.7mm)']
  },
  {
    id: 'cast-iron-tape-dispenser',
    name: 'Monolithic Cast Iron Tape Dispenser',
    subtitle: 'Heavyweight Studio Tool with Hand-Sharpened Blade',
    category: 'desk',
    price: 52,
    material: 'Sand-Cast Solid Iron, Powdercoat Matte Finish',
    origin: 'Iwate, Japan',
    dimensions: '155 × 48 × 82 mm · 1.4 kg solid mass',
    description: 'Cast using traditional Nambu ironware sand-casting techniques. Weighing 1.4 kilograms, it anchors firmly to your desk so you can pull and tear tape with a single effortless hand.',
    story: 'Constructed to outlast lifetimes. The textured cast surface absorbs desk reflections, and the heat-treated Japanese stainless steel cutter delivers crisp, clean cuts on washi and cellophane tape alike.',
    features: [
      'Heavy 1.4 kg counterweight for one-handed operation',
      'Non-slip cork-and-rubber base pad prevents desk scratches',
      'Compatible with standard 1" and 3" tape cores',
      'Hand-sharpened micro-serrated Japanese cutter blade'
    ],
    images: [
      'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&q=80'
    ],
    inStock: true,
    stockCount: 11
  },
  {
    id: 'architect-triangular-ruler',
    name: 'Architectural Matte Aluminum Scale Ruler',
    subtitle: 'Laser-Etched Metric Drafting Scale with 0.5mm Accuracy',
    category: 'desk',
    price: 28,
    material: 'Extruded Aluminum Alloy with Hard Matte Anodizing',
    origin: 'Zurich, Switzerland',
    dimensions: '300 mm length · Triangular cross section',
    description: 'A studio drafting classic re-engineered in dark charcoal anodized aluminum with laser-etched metric calibration that will never fade or scratch away.',
    story: 'Originally developed for architectural drafting tables, the concave triangular profile allows swift rotation between 6 standard drafting scales while offering an ergonomic finger grip.',
    features: [
      'Laser-etched high-contrast white calibration markings',
      'Six scales: 1:20, 1:25, 1:50, 1:75, 1:100, 1:125',
      'Concave tactile finger channels along each facet',
      'Includes protective felt sleeve for transport'
    ],
    images: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=80'
    ],
    inStock: true,
    stockCount: 22
  },
  {
    id: 'leather-pen-sleeve',
    name: 'Vegetable-Tanned Minimalist Pen Sleeve',
    subtitle: 'Full-Grain Italian Leather with Waxed Saddle Stitching',
    category: 'accessories',
    price: 32,
    material: 'Buttero Vegetable-Tanned Cowhide Leather',
    origin: 'Tuscany, Italy',
    dimensions: '160 × 38 mm · Fits pens up to 15mm diameter',
    description: 'Cut from full-grain Tuscan vegetable-tanned leather and hand-stitched with waxed Irish linen thread. Shields brass and lacquer pens from desk friction and pocket abrasions.',
    story: 'Tanned using natural chestnut and mimosa tannins over 40 days. The leather smells richly organic and softens rapidly to mold around your favored fountain or rollerball pen.',
    features: [
      'Raw beveled and burnished edges sealed with beeswax',
      'Hand saddle-stitched with durable waxed linen thread',
      'Zero metal hardware to eliminate pen scratch risks',
      'Supple interior grain creates gentle friction retention'
    ],
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1524316781249-c84074b16a4b?auto=format&fit=crop&w=1200&q=80'
    ],
    inStock: true,
    stockCount: 16
  },
  {
    id: 'sumi-ink-well',
    name: 'Ceramic Sumi Ink Well & Brass Rest',
    subtitle: 'Matte Stoneware Vessel with Solid Brass Pen Cradle',
    category: 'desk',
    price: 45,
    material: 'High-Fired Shigaraki Stoneware, Solid Machined Brass',
    origin: 'Shiga, Japan',
    dimensions: '65 mm diameter × 38 mm height · 220g weight',
    description: 'Wheel-thrown from iron-rich Shigaraki clay and fired with a tactile unglazed matte exterior. Paired with a detachable solid brass pen rest that fits fountain pens and dip pens.',
    story: 'Designed for ritualistic ink dipping and fountain pen filling. The weighted base prevents tipping accidents, while the angled interior reservoir lets you draw every drop of fountain pen ink.',
    features: [
      'Conical bottom well maximizes ink draw efficiency',
      'Detachable solid brass bar with dual pen rest grooves',
      'Glazed non-porous interior allows effortless color change rinses',
      'Soft silicone ring base prevents desktop ring marks'
    ],
    images: [
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=1200&q=80'
    ],
    inStock: true,
    stockCount: 6,
    badge: 'Limited Run'
  },
  {
    id: 'letterpress-cotton-stationery',
    name: 'Deckle-Edge Cotton Correspondence Set',
    subtitle: '100% Pure Rag Cotton Paper with Tissue-Lined Envelopes',
    category: 'notebooks',
    price: 34,
    material: '300 gsm Handmade Rag Cotton Paper, Japanese Tissue Lining',
    origin: 'Fabriano, Italy',
    dimensions: '10 Sheets (120 × 170 mm) · 10 Envelopes (125 × 175 mm)',
    description: 'Handmade on traditional cylinder moulds with authentic feathered deckle edges. The heavy 300 gsm paper accepts calligraphic nibs, fountain pens, and letterpress impressions with zero strike-through.',
    story: 'Made from recycled textile cotton remnants without cutting a single tree. Each sheet possesses its own unique subtle texture and natural deckled contour, making every letter a tactile heirloom.',
    features: [
      '10 sheets with authentic four-sided feather deckle edges',
      '10 custom envelopes lined with translucent Japanese tissue',
      'Packaged in a rigid unbleached kraft presentation box',
      'Sized specifically for high-wetness fountain pen inks'
    ],
    images: [
      'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80'
    ],
    inStock: true,
    stockCount: 15,
    badge: 'Artisanal'
  },
  {
    id: 'hinoki-desk-catchall',
    name: 'Solid Hinoki Cypress Desk Catchall',
    subtitle: 'Aromatic Japanese Cypress with Soft Chamfered Channels',
    category: 'desk',
    price: 42,
    material: 'Sustainably Harvested Kiso Hinoki Cypress',
    origin: 'Nagano, Japan',
    dimensions: '220 × 95 × 20 mm · 140g weight',
    description: 'Carved from single planks of aged Japanese Hinoki cypress renowned for its soothing natural cedar-like aroma and warm, velvet-smooth grain. Houses pens, brass rulers, and small desk artifacts.',
    story: 'Kiso Hinoki has been used in Japanese shrine architecture for over a millennium. Untreated with synthetic polyurethanes, the wood breathes naturally and emits a gentle, calming scent that sharpens concentration.',
    features: [
      'Twin precision-routed grooves for pens and small desk tools',
      'Naturally antibacterial and aromatic timber',
      'Hand-finished with natural walnut oil',
      'Subtle 45-degree architectural underside bevel'
    ],
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80'
    ],
    inStock: true,
    stockCount: 9
  }
];
