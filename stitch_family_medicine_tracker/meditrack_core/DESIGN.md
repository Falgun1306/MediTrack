---
name: MediTrack Core
colors:
  surface: '#f9f9ff'
  surface-dim: '#cfdaf2'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee8ff'
  surface-container-highest: '#d8e3fb'
  on-surface: '#111c2d'
  on-surface-variant: '#3f484d'
  inverse-surface: '#263143'
  inverse-on-surface: '#ecf1ff'
  outline: '#6f787e'
  outline-variant: '#bec8ce'
  surface-tint: '#006686'
  primary: '#00607e'
  on-primary: '#ffffff'
  primary-container: '#0d7a9e'
  on-primary-container: '#eef8ff'
  inverse-primary: '#7dd1f8'
  secondary: '#006e1c'
  on-secondary: '#ffffff'
  secondary-container: '#98f994'
  on-secondary-container: '#0c7521'
  tertiary: '#7d4e00'
  on-tertiary: '#ffffff'
  tertiary-container: '#9f6400'
  on-tertiary-container: '#fff5ed'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#bfe8ff'
  primary-fixed-dim: '#7dd1f8'
  on-primary-fixed: '#001f2b'
  on-primary-fixed-variant: '#004d65'
  secondary-fixed: '#98f994'
  secondary-fixed-dim: '#7ddc7a'
  on-secondary-fixed: '#002204'
  on-secondary-fixed-variant: '#005313'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#f9f9ff'
  on-background: '#111c2d'
  surface-variant: '#d8e3fb'
typography:
  display-lg:
    fontFamily: Rubik
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Rubik
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Rubik
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Rubik
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 40px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 32px
  max-width: 1200px
---

## Brand & Style
The design system is built on a foundation of **Modern Corporate** aesthetics with a focus on **Supportive Minimalism**. The goal is to reduce the cognitive load associated with health management by providing a UI that feels organized, calm, and highly legible. 

The brand personality is professional yet empathetic—avoiding the coldness of clinical software in favor of a warm, family-oriented atmosphere. High whitespace ratios and a structured information hierarchy ensure that users of all technical abilities can navigate complex medical schedules with confidence. The visual language utilizes soft transitions and clear visual cues to evoke a sense of reliability and wellness.

## Colors
The palette is anchored by **Medical Blue** (#0D7A9E), chosen for its association with trust and professional healthcare. This primary color is used for key actions and navigational elements. **Wellness Green** (#43A047) serves as the secondary color, reserved for success states, health progress indicators, and "medication taken" confirmations.

A **Warning Amber** (#F59E0B) is introduced as a tertiary color for missed doses or low-stock alerts. The neutral palette relies on **Deep Slate** (#1E293B) for high-contrast typography and a series of cool grays for surfaces and borders, ensuring the interface feels clean and sterile without being harsh.

## Typography
This design system employs a dual-font strategy. **Rubik** is used for headlines to provide a friendly, rounded character that softens the medical context. **Inter** is utilized for all body text, data points, and labels due to its exceptional legibility and systematic appearance.

Priority is given to hierarchical clarity. Large, bold headers define sections, while labels use medium weights and slightly increased letter spacing to ensure technical terms and dosages are unmistakable. On mobile devices, headline sizes scale down to prevent excessive wrapping while maintaining their relative visual weight.

## Layout & Spacing
The layout follows a **Fluid Grid** model with a soft 8px rhythm. For desktop views, a 12-column grid is used with a maximum content width of 1200px. For mobile, a 4-column grid is standard.

Generous internal padding within cards (min 24px) is required to prevent "data claustrophobia." Use the `xl` (40px) spacing token to separate major functional sections (e.g., separating the "Daily Schedule" from "Family Profiles"). Interaction targets must maintain at least a 12px margin from adjacent elements to ensure accessibility for users with limited motor precision.

## Elevation & Depth
Depth is communicated through **Tonal Layering** and **Ambient Shadows**. The base background is the secondary neutral, with primary content areas living on pure white surfaces.

- **Level 1 (Cards/Inputs):** Use a very soft, diffused shadow (0px 2px 8px rgba(30, 41, 59, 0.05)) to lift them slightly from the background.
- **Level 2 (Modals/Overlays):** Use a more pronounced shadow with a wider blur (0px 10px 25px rgba(30, 41, 59, 0.1)) to focus user attention.
- **Surface Borders:** Use a 1px solid border in a light gray (#E2E8F0) for all cards to maintain structural integrity even when shadows are subtle.

## Shapes
The shape language is consistently **Rounded**, reflecting the approachable and safe nature of the brand. 

- Standard components (buttons, input fields, chips) use a **0.5rem (8px)** corner radius.
- Larger containers and cards use **1rem (16px)** to create a soft, contained look.
- Interactive status indicators (like "Active" or "Completed") should use **Pill-shaped** geometry to differentiate them from functional buttons.

## Components
### Buttons
Primary buttons use the Medical Blue background with white text. Secondary buttons use a transparent background with a Medical Blue border. Success actions (e.g., "Log Dose") may use a Wellness Green fill. All buttons require a minimum height of 48px for touch accessibility.

### Cards
Cards are the primary container for medical records. They must include a clear header area, 24px internal padding, and use Level 1 elevation. 

### Input Fields
Inputs feature a subtle light-gray border that thickens and changes to Medical Blue on focus. Error states must use a dedicated high-contrast red (#DC2626) for both the border and supportive helper text.

### Medication Chips
Used for listing active medications or tags. These are small, pill-shaped elements with light-tinted backgrounds (10% opacity of the primary or secondary color) and dark-colored text to maintain readability.

### Progress Indicators
Health goals or prescription refills remaining should be visualized using thick, rounded progress bars in Wellness Green, contrasted against a light-gray track.