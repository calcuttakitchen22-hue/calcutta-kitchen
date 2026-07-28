# CODEX.md

# Calcutta Kitchen AI Development Guide

## Purpose

This document defines how AI coding assistants (Codex) should work on the Calcutta Kitchen project.

It is the primary engineering guideline.

Before making any code changes, always read:

1. vision.md
2. sitemap.md
3. homepage.md
4. recipe-page.md
5. design-system.md
6. tech-architecture.md

Never make assumptions that contradict these documents.

---

# Project Overview

Calcutta Kitchen is a premium recipe discovery website built with Astro.

It is NOT:

- a blog
- a magazine
- an ecommerce website

The website exists to help users discover recipes as quickly as possible.

Recipe discovery is the highest priority.

---

# Core Principles

Every decision should optimize for:

- Simplicity
- Performance
- SEO
- Accessibility
- Reusability
- Maintainability

Never sacrifice these principles for visual effects.

---

# Before Every Task

Before modifying any code:

Understand the task.

Identify affected components.

Identify dependencies.

Look for existing reusable components.

Avoid duplication.

Only then begin implementation.

---

# Workflow

For every request:

Step 1

Understand the problem.

Step 2

Create a short implementation plan.

Step 3

Identify reusable components.

Step 4

Implement.

Step 5

Review.

Step 6

Check for regressions.

Step 7

Ensure the build succeeds.

Never skip planning.

---

# Scope Control

Implement only what is requested.

Do NOT:

Refactor unrelated files.

Rename components unnecessarily.

Change folder structures.

Modify content.

Rewrite working code.

Introduce new dependencies unless requested.

---

# Component Philosophy

Prefer reusable components.

Bad

RecipeCardHome

RecipeCardHomepage

RecipeCardLarge

RecipeCardSmall

Good

RecipeCard

with props

variant="featured"

variant="compact"

variant="related"

---

# Layout Philosophy

Never duplicate layouts.

Create reusable layouts.

Examples

BaseLayout

RecipeLayout

CollectionLayout

CategoryLayout

StaticLayout

---

# Styling Rules

Use Tailwind.

Do not use inline styles.

Avoid custom CSS unless necessary.

Follow design-system.md.

Spacing must use the spacing scale.

Do not invent colors.

Do not invent typography.

---

# Accessibility

Every component must support:

Keyboard navigation

Screen readers

Visible focus states

Alt text

Semantic HTML

Proper headings

WCAG AA compliance

Accessibility is mandatory.

---

# Performance

Default to Astro server rendering.

Hydrate only when necessary.

Avoid unnecessary JavaScript.

Lazy-load large images.

Optimize image sizes.

Avoid layout shifts.

Target:

Performance 95+

---

# SEO

Every page must support:

Title

Description

Canonical

Open Graph

Twitter Card

Schema

Breadcrumbs

Internal linking

Never remove existing SEO features.

---

# Images

Always use Astro image optimization.

Use WebP or AVIF where possible.

Never use oversized images.

Always include alt text.

---

# Content

Recipes come from Astro Content Collections.

Never hardcode recipe content inside components.

Components receive data through props.

---

# Data Flow

Pages

↓

Layouts

↓

Components

↓

Props

Avoid deep prop drilling.

Keep data flow predictable.

---

# Error Handling

Handle gracefully:

Missing image

Missing author

Missing YouTube video

Missing category

Missing metadata

Empty collections

No search results

Components should never crash because optional data is missing.

---

# Code Quality

Prefer readable code over clever code.

Keep functions small.

Keep components focused.

Avoid deeply nested logic.

Extract reusable logic into utilities.

Document non-obvious code.

---

# Naming Conventions

Components

PascalCase

RecipeCard.astro

Layouts

PascalCase

RecipeLayout.astro

Utilities

camelCase

slugify.ts

Content

kebab-case

chicken-kosha.md

Variables

camelCase

Constants

UPPER_SNAKE_CASE

---

# File Organization

Create new files only when they improve clarity.

Avoid dozens of tiny files.

Avoid giant files.

Prefer logical grouping.

---

# Design Decisions

When uncertain:

Choose the simpler solution.

Choose the more reusable solution.

Choose the faster solution.

Choose the more accessible solution.

---

# Responsive Design

Design mobile first.

Support:

Mobile

Tablet

Desktop

Large Desktop

No horizontal scrolling.

Touch targets:

Minimum 44px.

---

# Animations

Use subtle animations only.

Prefer CSS transitions.

150–250ms.

Avoid:

Bounce

Flash

Spin

Parallax

Heavy motion

---

# Dependencies

Do not install new packages unless required.

Always prefer existing Astro capabilities first.

---

# Git

Keep commits focused.

One feature per commit.

Do not mix unrelated changes.

Suggested format:

feat: add homepage hero

fix: improve recipe card spacing

refactor: simplify search component

---

# Pull Requests

Before completing work:

Verify build succeeds.

Verify no TypeScript errors.

Verify no lint errors.

Verify responsive layout.

Verify accessibility.

Verify performance impact.

---

# When Requirements Are Ambiguous

Never guess.

Instead:

Explain the ambiguity.

Present available options.

Recommend the best option.

Wait for confirmation before making assumptions.

---

# When Existing Code Can Be Reused

Always reuse before creating new components.

Duplication is the last option.

---

# Long-Term Goal

Build a fast, scalable, maintainable recipe platform capable of supporting:

- 1,000+ recipes
- Hundreds of collections
- Multiple authors
- Multiple languages
- AI-powered recipe discovery
- Future CMS integrations

Every architectural decision should support this long-term vision.

---

# Definition of Done

A task is complete only if:

✓ Requirements are fully implemented

✓ Code is reusable

✓ Responsive on all devices

✓ Accessible

✓ Performance optimized

✓ SEO preserved

✓ Build succeeds

✓ No console errors

✓ No TypeScript errors

✓ Consistent with the Design System

✓ Consistent with the Vision

If any item is missing, the task is not complete.