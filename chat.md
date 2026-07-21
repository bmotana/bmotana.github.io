## Engineering Analysis

### 1. Problem Translation

**What needs to be built:**
Two distinct scroll-driven animations on an "About Me" section/page — a slide animation on a heading element, and a zoom animation on a text block positioned to the right of a header.

**Inputs:**
- User scroll position (via `ScrollTrigger` — implies GSAP is the intended library)
- DOM elements: the heading (`h1`/`h2`), and the right-side text block
- Scroll container: likely `window`, possibly a custom panel

**Outputs:**
- Heading: enters the viewport via a slide transition (direction unspecified — assumed slide-in from left or bottom)
- Right-side text: scales from some initial zoom state to its natural size as the user scrolls into that section

**Expected behaviour:**
- Animations are tied to scroll progress, not time
- They trigger when the About Me section enters the viewport
- Both animations should feel coordinated (same scroll range, or staggered — unspecified)

---

### 2. Requirements

**Functional**
- `ScrollTrigger` activates when the About Me section reaches a defined viewport threshold
- Heading slides in (translate on one axis) as scroll progresses through the trigger zone
- Right-side text zooms in (`scale` transform) independently, also scroll-driven
- Both animations should reach their final state (fully visible, scale 1, translate 0) before the section scrolls out
- Animations should be reversible on scroll-up (standard `ScrollTrigger` behaviour)

**Non-functional**
- Animations must run on the GPU — only `transform` and `opacity` properties, no layout-triggering props like `top`, `left`, `width`
- Must not cause layout shift (elements should be in their final document flow position; only visual transform changes)
- Must degrade gracefully if JS is disabled (content still readable)
- Should respect `prefers-reduced-motion` — animations disabled or reduced for users who opt out
- Performance target: 60fps on mid-range devices

---

### 3. Missing Details — Critical Clarifying Questions

1. **Slide direction for the heading** — slide in from the left, bottom, or top? And does it start off-screen or just offset slightly (e.g. `x: -100` vs `x: -1000`)?

2. **Zoom behaviour for the right text** — does it start zoomed *in* (scale > 1, shrinks to normal) or zoomed *out* (scale < 1, grows to normal)? And does opacity fade in simultaneously?

3. **Scroll trigger range** — should the animation complete over the full scroll distance of the section, or just on entry (i.e. a short burst when the element hits 80% of the viewport)?

4. **Existing stack** — is GSAP + ScrollTrigger already installed, or does this need to be set up from scratch? Is this in a React component with a `useEffect`, or vanilla JS?

5. **Pinning** — should the section *pin* (stick in place) while the animations play, or do the animations run while the page continues scrolling normally?

6. **Relationship between the two animations** — should they share one `ScrollTrigger` instance (same scroll range, triggered together) or each have their own independent trigger?

---

### 4. Implementation Plan + Pseudocode

**Step-by-step plan:**

```
Step 1 — Setup
  - Confirm GSAP + ScrollTrigger are imported and registered
  - Wrap animation logic in useEffect (React) or DOMContentLoaded (vanilla)
  - Grab refs/selectors: #about-heading, #about-right-text, #about-section

Step 2 — Set initial states (before scroll)
  - heading:   { x: -120, opacity: 0 }   ← offscreen left, invisible
  - right-text: { scale: 0.75, opacity: 0 } ← shrunk, invisible

Step 3 — Define ScrollTrigger for heading (slide)
  - trigger: #about-section
  - start: "top 80%"   ← fires when section top hits 80% down the viewport
  - end: "top 30%"     ← completes when section top reaches 30%
  - scrub: true        ← ties animation to scroll position (not time)
  - animate TO: { x: 0, opacity: 1 }

Step 4 — Define ScrollTrigger for right-text (zoom)
  - trigger: #about-section   ← same trigger element, or #about-right-text
  - start: "top 75%"
  - end: "top 25%"
  - scrub: true
  - animate TO: { scale: 1, opacity: 1 }

Step 5 — Cleanup
  - On component unmount (React): kill all ScrollTrigger instances
    to prevent memory leaks and ghost listeners

Step 6 — prefers-reduced-motion guard
  - Check window.matchMedia('(prefers-reduced-motion: reduce)')
  - If true: skip gsap.from() calls, set elements to final state immediately
```

**Pseudocode:**

```
REGISTER ScrollTrigger plugin with GSAP

ON mount:
  IF user prefers reduced motion:
    SET heading  → { x:0, opacity:1 }
    SET rightText → { scale:1, opacity:1 }
    RETURN early

  SET heading initial state  → { x: -120px, opacity: 0 }
  SET rightText initial state → { scale: 0.75, opacity: 0 }

  CREATE tween: heading
    FROM current state
    TO { x: 0, opacity: 1 }
    WITH scrollTrigger:
      trigger  = aboutSection
      start    = "top 80%"
      end      = "top 30%"
      scrub    = true

  CREATE tween: rightText
    FROM current state
    TO { scale: 1, opacity: 1 }
    WITH scrollTrigger:
      trigger  = aboutSection
      start    = "top 75%"
      end      = "top 25%"
      scrub    = true

ON unmount:
  KILL all ScrollTrigger instances scoped to this component
```

---

### 5. Risks

**Edge cases**

| Scenario                                        | Risk                                                          | Mitigation                                                           |
| ----------------------------------------------- | ------------------------------------------------------------- | -------------------------------------------------------------------- |
| Page loads mid-scroll (refresh)                 | Elements stuck in initial (hidden) state                      | Use `ScrollTrigger.refresh()` after mount                            |
| About section is very short                     | `start` and `end` markers overlap — animation never completes | Clamp section min-height or use pixel offsets instead of percentages |
| Right-side text wraps to below header on mobile | Layout shifts, "right of header" assumption breaks            | Conditionally disable or remap animation on small viewports          |
| Multiple About Me sections (SPA route reuse)    | Duplicate ScrollTrigger instances accumulate                  | Scope triggers and kill on unmount                                   |

**Failure points**
- GSAP ScrollTrigger not registered before use → silent failure, no animation
- Refs not yet attached when `useEffect` runs → `null` target, GSAP swallows error quietly
- `scrub: true` with very fast scroll → animation skips frames visually (use `scrub: 1` for a 1s lerp instead)

**External dependencies**
- `gsap` — version matters; ScrollTrigger API changed between v2 and v3
- `ScrollTrigger` plugin must be explicitly registered: `gsap.registerPlugin(ScrollTrigger)`
- If inside a smooth-scroll wrapper (Lenis, Locomotive), ScrollTrigger must be configured to use that scroller's proxy, not `window` — this is a common integration failure point
