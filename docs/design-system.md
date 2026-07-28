# Calcutta Kitchen Design System

## Purpose

This document defines the visual language of the Calcutta Kitchen website.

Every page, component, and interaction should follow this design system to ensure a consistent experience.

The design system prioritizes readability, usability, accessibility, and premium visual quality.

---

# Design Principles

The website should feel:

- Warm
- Premium
- Editorial
- Minimal
- Timeless
- Authentic
- Comfortable
- Photography-first

The website should NOT feel:

- Corporate
- Generic
- Template-based
- Over-designed
- Cluttered
- Flashy
- Trendy for the sake of trends

---

# Brand Colors

## Primary Orange

Purpose

Primary actions

Buttons

Links

Highlights

```
#F24E07
```

---

## Cream

Purpose

Primary page background

Cards

Content areas

```
#F8F5E6
```

---

## Maroon

Purpose

Headings

Footer

Navigation

Dark sections

```
#700D1D
```

---

# Supporting Colors

Use neutral grays only for UI elements.

Examples:

- Borders
- Dividers
- Disabled states
- Metadata

Avoid colorful UI unless required.

---

# Typography

Use the following font contract throughout the site:

- Headings: Playfair Display, with `Noto Serif Bengali` as the Bengali fallback.
- Body and interface text: DM Sans, with the system sans-serif stack as fallback.

Only the required weights should be loaded. Font loading must not block rendering.

## Headings

Elegant serif font.

Examples:

- Playfair Display
- Cormorant Garamond
- Lora

Characteristics:

- Premium
- Editorial
- Large
- Comfortable line height

---

## Body Text

Modern sans-serif.

Examples:

- Inter
- Manrope
- Source Sans
- DM Sans

Characteristics:

- Highly readable
- Neutral
- Clean

---

# Type Scale

H1

Homepage Hero

48–64px

---

H2

Section Titles

36–40px

---

H3

Cards

24–28px

---

Body

18px

---

Small Text

14–16px

---

# Layout

Maximum content width:

1280px

Wide sections:

1440px

Content centered.

Generous whitespace.

Responsive gutters:

- Mobile: 16px
- Tablet: 24px
- Desktop and larger: 32px

Breakpoints:

- Mobile: 0–639px
- Tablet: 640–1023px
- Desktop: 1024–1279px
- Large desktop: 1280px and above

---

# Grid

Desktop

12-column grid

Tablet

8-column grid

Mobile

4-column grid

---

# Spacing

Use an 8px spacing system.

Examples:

8

16

24

32

48

64

96

Never use arbitrary spacing.

---

# Semantic Tokens

Use semantic token names in components rather than raw color values.

- Page background: `#F8F5E6`
- Surface: `#FFF8EC`
- Primary text, navigation, and dark sections: `#700D1D`
- Primary action and focus: `#F24E07`
- Border: `#E8DFC9`
- Muted text: `#6B625C`

Text and interactive states must maintain WCAG AA contrast. Focus indicators use
the primary action color with a visible two-pixel outline and offset.

---

# Border Radius

Small

8px

Medium

16px

Large

24px

Buttons

9999px (pill)

---

# Shadows

Very subtle.

Avoid heavy floating cards.

Cards should feel grounded.

---

# Buttons

## Primary

Orange background

White text

Rounded pill

Hover:

Slightly darker orange

Small lift animation

---

## Secondary

Cream background

Maroon border

Maroon text

Hover:

Orange border

---

## Text Button

Underline on hover.

No filled background.

---

# Cards

Recipe cards

Collection cards

Equipment cards

Video cards

All cards share:

- Rounded corners
- Consistent spacing
- Image-first layout
- Soft shadow
- Hover elevation

---

# Images

Photography is the hero.

Use:

- Bright
- Natural lighting
- Authentic home cooking
- Minimal props
- Warm tones

Avoid:

- Artificial stock photos
- Over-saturated edits
- Busy compositions

---

# Icons

Simple outline icons.

Consistent stroke width.

Avoid colorful icon packs.

---

# Navigation

Height:

72px

Sticky

Transparent over hero

Solid background after scrolling

---

# Forms

Rounded inputs

Large touch targets

Clear labels

Accessible focus states

---

# Search

Large search field.

Centered on homepage.

Autocomplete ready.

Keyboard accessible.

---

# Animations

Use only subtle motion.

Examples:

- Fade
- Small lift
- Gentle scaling

Duration:

150–250ms

Avoid:

- Bounce
- Spin
- Flash
- Parallax
- Excessive motion

---

# Accessibility

Meet WCAG AA.

Minimum contrast ratio.

Keyboard navigation.

Visible focus states.

Screen reader support.

---

# Mobile

Design mobile first.

Minimum touch target:

44×44px

No horizontal scrolling.

Fast loading.

---

# Performance

Prioritize:

- Image optimization
- Lazy loading
- Minimal JavaScript
- CSS-first solutions
- Core Web Vitals

---

# Component Philosophy

Every UI element should be reusable.

No duplicated components.

No page-specific styling unless absolutely necessary.

Every component should accept props instead of requiring code duplication.

---

# Design Inspiration

The overall visual direction should resemble the quality and restraint of:

- Apple
- NYT Cooking
- Bon Appétit
- Half Baked Harvest
- Minimal Scandinavian editorial websites

Do not copy these websites directly. Use them only as references for spacing, typography, photography emphasis, and simplicity.
