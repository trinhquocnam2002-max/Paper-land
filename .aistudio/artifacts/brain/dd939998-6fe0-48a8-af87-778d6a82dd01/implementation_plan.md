# Minimalist Stationery & Goods — Digital Storefront & Tactile Studio

A refined editorial e-commerce storefront crafted for discerning writers, architects, and designers, featuring a curated catalog of Japanese and European paper goods, brass writing instruments, and desk objects with sharp 0px architectural geometry, an interactive tactile paper-ruling simulator, quick-view inspection, and a seamless slide-out cart and checkout flow.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The following product requirements and visual decisions were clarified and confirmed in Phase 1:

- **Product Catalog Focus (Confirmed)**: Curated stationery, notebooks, brass & fountain writing tools, and artisanal desk objects.
- **Primary Screens & Browsing Flows (Confirmed)**: Minimalist Catalog with Top Bar navigation, category filter bar, edge-to-edge product grid, interactive Quick View modal, slide-out Cart drawer, and seamless 2-step Checkout flow with order confirmation.
- **Interactive Tactile Experience (Confirmed)**: Tactile Paper Spec & Ruling Simulator allowing users to switch paper weights (80 gsm, 100 gsm, 120 gsm archival) and rulings (5mm Dot Grid, 7mm French Ruled, 5mm Architectural Grid, Plain Blank) with real-time ink stroke test canvas and tactile paper texture visualization.
- **Design System Fidelity (Confirmed from Attachment)**: Strict adherence to the `Minimalist Stationery & Goods` design specifications — `#f9f9f9` canvas, `#0b0c0c` deep charcoal, `#5e5e5e` muted taupe, `#f4f2ee` warm stone containers, Inter typography with uppercase tracking for labels, 0px corner radii throughout all components, and 1px hairline ghost borders.

---

## 1. Overview & Core Concept

- **What It Does**: Minimalist Stationery & Goods is an editorial e-commerce application that presents physical writing instruments and notebook collections through tactile precision, minimal clutter, and rich product storytelling. Users can browse by category, filter by material or ruling, inspect detailed specs in a Quick View overlay, customize notebook paper specs with a live ruling and ink interaction sheet, add items to a slide-over bag, and execute a streamlined checkout.
- **Target Audience / Persona**: Designers, architects, essayists, typographers, and creators who prioritize intentional craftsmanship, archival paper quality, tactile desk tools, and understated elegance.
- **Key Value**: Replaces the noisy, banner-heavy clutter of conventional e-commerce with a calm, tactile experience that mirrors stepping into a high-end Tokyo or Kyoto stationery atelier.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Catalog Browsing & Category Filtering**:
   - Clean 3-zone Top Bar with brand mark, category jump links (`All Items`, `Notebooks`, `Writing Instruments`, `Desk Objects`, `Tactile Studio`), search bar toggle, and persistent bag indicator with real item count.
   - Quiet horizontal filter row with category pills replaced by clean segmented text selectors, sorting (Curated, Price Low-to-High, Price High-to-Low, Material), and in-stock toggles.
2. **Tactile Paper Studio (Interactive Feature)**:
   - Dedicated tactile preview module embedded in the catalog and notebook detail view.
   - Users interactively select ruling types (Dot Grid, Lined Ruled, Graph Grid, Blank) and paper weights (80 gsm featherweight, 100 gsm smooth bond, 120 gsm archival fountain-pen grade).
   - Interactive SVG/Canvas sheet preview where users can draw test ink strokes to see bleeding/opacity resistance across paper grades.
3. **Product Inspection & Quick View**:
   - Hovering over product cards exposes subtle secondary photography or quiet "Quick View" action.
   - Clean, full-bleed Quick View modal with multi-angle imagery, tactile dimensions, paper grade specs, and direct "Add to Cart" with custom configuration.
4. **Cart Drawer & Checkout Modal**:
   - Smooth slide-out cart drawer with itemized list, quantity adjustment, subtotal, shipping calculation, and note field.
   - Dedicated 2-step checkout view with shipping address entry, payment method summary (mock credit card & direct bank transfer), and instant receipt confirmation with printable invoice modal.

### Visual Identity & Theme
- **Color Palette**:
  - Canvas: `#f9f9f9` (Neutral Off-White)
  - Surface Containers: `#f4f2ee` (Warm Stone) & `#ffffff` (Elevated White)
  - Text & Accents: `#0b0c0c` / `#222222` (Deep Charcoal for high-contrast legibility)
  - Secondary Text: `#5e5e5e` / `#888888` (Muted Taupe for metadata and ghost dividers)
  - Borders: `1px solid rgba(26, 28, 28, 0.12)` (Delicate hairline ghost borders)
- **Typography**:
  - Pure Inter typography scale:
    - Display / Section Headings: Inter Medium (24px–36px) with balanced line heights
    - Category & Spec Labels: Inter 11px/12px Uppercase with wide letter-spacing (`tracking-[0.15em]`)
    - Body Text: Inter Regular 14px–16px (1.6 line height)
    - Numerals & Pricing: Tabular figures (`tabular-nums font-mono` or cleanly formatted `Inter`)
- **Shapes & Elevation**:
  - Strict 0px radius (`rounded-none`) on all cards, buttons, dialogs, inputs, and drawers.
  - Tonal contrast and hairline borders instead of drop shadows.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Sharp 0px Architectural Aesthetic**:
  - *Chosen Approach*: Enforce `rounded-none` across all components (buttons, cards, inputs, drawers, dialogs) as required by the design system.
  - *Why*: Reflects the precision of bookbinding, bone folders, and architect rulers, avoiding the generic rounded-pill look.
- **Decision 2: Interactive Tactile Paper Studio as Embedded Simulator**:
  - *Chosen Approach*: Build a dedicated tactile paper sheet viewer that renders real SVG dot grids, lines, and an interactive stylus/brush canvas to simulate paper feel and ruling selection.
  - *Why*: Directly fulfills the user's selected feature for "Paper ruling and weight selector with tactile sheet preview", elevating the store from static images to an authentic tactile product demo.
- **Decision 3: Client-Side State Persistence via LocalStorage**:
  - *Chosen Approach*: Synchronize cart items, user preferences, and order history into `localStorage`.
  - *Why*: Ensures zero setup barrier, instant reactivity, and seamless preservation of the user's bag and order state across refreshes without requiring external database provisioning.

---

## 4. Technical Architecture & Data Strategy

### System & Component Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                       Top Navigation                        │
│  [ Brand: STUDIO KANJI ] ─── [ Nav Categories ] ─── [ Bag ] │
└──────────────────────────────┬──────────────────────────────┘
                               │
       ┌───────────────────────┴───────────────────────┐
       ▼                                               ▼
┌──────────────────────────────┐        ┌──────────────────────────────┐
│       Editorial Hero         │        │    Tactile Paper Studio      │
│  Minimalist manifesto & hero │        │  Ruling & weight simulator   │
│  focal stationery piece      │        │  Interactive ink test canvas │
└──────────────┬───────────────┘        └──────────────┬───────────────┘
               │                                       │
               └───────────────────────┬───────────────┘
                                       ▼
┌─────────────────────────────────────────────────────────────┐
│                 Filter & Sort Control Bar                   │
│   [Category: All / Notebooks / Pens / Desk] ── [Sort by]   │
└──────────────────────────────┬──────────────────────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    Product Catalog Grid                     │
│  ┌──────────────────┐ ┌──────────────────┐ ┌──────────────┐ │
│  │ Japanese Journal │ │ Brass Fountain   │ │ Stone Stand  │ │
│  │ Spec & Ruling    │ │ Pen & Nib Size   │ │ Heavy Brass  │ │
│  │ [Quick View]     │ │ [Quick View]     │ │ [Quick View] │ │
│  └──────────────────┘ └──────────────────┘ └──────────────┘ │
└──────────────────────────────┬──────────────────────────────┘
                               │
         ┌─────────────────────┼─────────────────────┐
         ▼                     ▼                     ▼
┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
│ Quick View Modal│   │ Slide-Out Cart  │   │ Checkout Modal  │
│ Specs, Ruling,  │   │ Quantity, notes,│   │ Shipping, Pay,  │
│ Variant Choice  │   │ Tax & subtotal  │   │ Order Receipt   │
└─────────────────┘   └─────────────────┘   └─────────────────┘
```

### Data Model & State
- **Product Entity**:
  - `id`: Unique identifier
  - `name`: Product title (e.g., "Sora Linen Hardcover Notebook")
  - `category`: `'notebooks' | 'pens' | 'desk' | 'accessories'`
  - `price`: Number in USD
  - `material`: String (e.g., "120 gsm Tomoe River Paper", "Solid Machined Brass")
  - `origin`: Country/region of craft (e.g., "Kyoto, Japan", "Schwarzwald, Germany")
  - `rulingOptions`: Available ruling types for paper goods (`'Dot Grid' | 'Ruled' | 'Graph' | 'Blank'`)
  - `weightOptions`: Paper weight specs (`'80 gsm' | '100 gsm' | '120 gsm'`)
  - `images`: Array of product photography URLs
  - `description`: Refined editorial description and craftsmanship note
  - `dimensions`: Physical measurements (e.g., "148 × 210 mm (A5)")
  - `inStock`: Boolean
- **Cart State**:
  - Items array with product ID, selected ruling, selected weight or nib size, quantity, and unit price.
  - Derived subtotal, estimated shipping, and coupon/promo calculation.
- **Checkout State**:
  - Shipping address, billing preferences, payment selection, and generated confirmation receipt with order ID.
