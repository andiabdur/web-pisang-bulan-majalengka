# Pisang Goreng Bulan Majalengka — Style Reference
> Heritage Crimson & Warm Cream — an authentic culinary tribute to Majalengka's iconic "Kota Angin" fried banana delicacy, framed in vintage Indonesian bakery aesthetics and modern editorial restraint.

**Theme:** light

Pisang Goreng Bulan blends traditional Indonesian culinary heritage with modern editorial craftsmanship. The interface takes its primary cues from the signature physical gift box: a rich **Deep Heritage Maroon / Crimson (`#7A1C1C`)** paired with a gentle **Vintage Warm Cream (`#FAF5EC`)** canvas, grounded by **Deep Espresso/Charcoal (`#231815`)** ink, and highlighted with **Golden Ochre (`#D99B26`)** accents reflecting golden fried bananas.

---

## 1. Tokens — Colors

| Name | Value | Token | Role |
| :--- | :--- | :--- | :--- |
| **Heritage Maroon** | `#7A1C1C` | `--color-heritage-maroon` | Primary brand color, header banners, hero moments, signature box surface |
| **Deep Crimson Velvet** | `#5E1215` | `--color-crimson-velvet` | Deepest dark red for overlays, footer surface, and high-contrast badges |
| **Warm Ivory Cream** | `#FAF5EC` | `--color-cream-canvas` | Primary page background and card canvas (clean paper tone) |
| **Linen Cream** | `#F0E7D8` | `--color-linen-cream` | Secondary surface tone for elevated cards, process strips, and interactive inputs |
| **Warm Stone Border** | `#D5C8B5` | `--color-warm-stone` | 1px hairline dividers and editorial column rules |
| **Espresso Ink** | `#231815` | `--color-espresso-ink` | Primary body copy, headings on cream canvas, and dark text |
| **Muted Walnut** | `#7D6F64` | `--color-muted-walnut` | Subtitles, helper text, and secondary metadata |
| **Golden Crisp Ochre** | `#D99B26` | `--color-golden-ochre` | Warm fried golden accent for rating stars, badges (*Best Seller*), and active states |

---

## 2. Tokens — Typography

### Primary Display / Headings: Serif Display (TT Ramillas / Cormorant Garamond / Playfair Display)
* **Weights:** 300 (Light/Whisper), 600 (Semi-bold)
* **Sizes:** 24px, 32px, 48px, 64px, 96px
* **Letter Spacing:** `-0.03em` to `-0.02em`
* **Role:** Editorial headlines, signature brand quotes, and section titles in uppercase.

### Body & Navigation: Geometric Sans (Satoshi / Plus Jakarta Sans / Inter)
* **Weights:** 400 (Regular), 500 (Medium), 700 (Bold)
* **Sizes:** 12px, 13px, 14px, 16px, 18px
* **Letter Spacing:** `-0.01em` (Body), `0.05em` (Uppercase UI tags)
* **Role:** Body copy, badges, buttons, metadata, and navigation.

---

## 3. Brand Identity & Typography Assets
* **Tagline Resmi:** *"Kudapan Istimewa Kecintaan Warga Kota Angin Majalengka"*
* **Badge / Seal:** Double-lined heritage frame, arched *"PISANG GORENG"*, bold centered *"BULAN"*, rounded vintage container.
* **Cultural Touchpoint:** *"Jangan Lupa Membaca Do'a & Makan dengan Tangan Kanan"*.

---

## 4. Tokens — Spacing & Shapes

* **Border Radius:**
  * Cards & Containers: `0px` (Flat, clean, editorial)
  * Buttons & Tags: `3px` or `4px`
  * Badge Badges / Pills: `4px` with 1px border
* **Hairline Rules:** `1px solid var(--color-warm-stone)` (#D5C8B5)
* **Elevation:** Flat (0 drop-shadow), utilizing tonal contrast and 1px hairlines.

---

## 5. CSS Custom Properties

```css
:root {
  /* Colors */
  --color-heritage-maroon: #7A1C1C;
  --color-crimson-velvet: #5E1215;
  --color-cream-canvas: #FAF5EC;
  --color-linen-cream: #F0E7D8;
  --color-warm-stone: #D5C8B5;
  --color-espresso-ink: #231815;
  --color-muted-walnut: #7D6F64;
  --color-golden-ochre: #D99B26;

  /* Typography */
  --font-serif: 'Playfair Display', 'Cormorant Garamond', serif;
  --font-sans: 'Plus Jakarta Sans', 'Satoshi', sans-serif;

  /* Spacing & Radii */
  --radius-cards: 0px;
  --radius-buttons: 3px;
  --border-hairline: 1px solid #D5C8B5;
}
```

---

## 6. Tailwind v4 Theme Configuration

```css
@theme {
  --color-heritage-maroon: #7A1C1C;
  --color-crimson-velvet: #5E1215;
  --color-cream-canvas: #FAF5EC;
  --color-linen-cream: #F0E7D8;
  --color-warm-stone: #D5C8B5;
  --color-espresso-ink: #231815;
  --color-muted-walnut: #7D6F64;
  --color-golden-ochre: #D99B26;

  --font-serif: 'Playfair Display', serif;
  --font-sans: 'Plus Jakarta Sans', sans-serif;

  --radius-cards: 0px;
  --radius-buttons: 3px;
}
```
